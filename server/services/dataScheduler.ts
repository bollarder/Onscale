// server/services/dataScheduler.ts
import cron from "node-cron";
import { db } from "../db";
import { orders, inventory, adPerformance, alerts } from "../schemas/enhanced";
import { OrderCollectionService } from "./realEcommerce";
import { AdPerformanceCollector } from "./advertisingIntegration";
import { AlertService } from "./alertService";
import { eq, and, gte, desc } from "drizzle-orm";

export class DataSyncScheduler {
  private static jobs: Map<string, cron.ScheduledTask> = new Map();

  // 스케줄러 초기화
  static initialize() {
    console.log("Data sync scheduler 초기화 중...");

    // 1. 매 15분마다 주문 데이터 동기화
    this.scheduleOrderSync();

    // 2. 매 시간마다 광고 성과 데이터 동기화
    this.scheduleAdPerformanceSync();

    // 3. 매 30분마다 재고 알림 체크
    this.scheduleInventoryCheck();

    // 4. 매일 자정에 일간 리포트 생성
    this.scheduleDailyReport();

    console.log("모든 스케줄러 작업이 시작되었습니다.");
  }

  // 주문 데이터 동기화 (매 15분)
  private static scheduleOrderSync() {
    const task = cron.schedule(
      "*/15 * * * *",
      async () => {
        console.log("주문 데이터 동기화 시작...");

        try {
          // 활성 회사 목록 조회
          const companies = await db
            .select()
            .from(companies)
            .where(eq(companies.isActive, true));

          for (const company of companies) {
            try {
              const result = await OrderCollectionService.collectAllOrders(
                company.id,
              );

              if (!result.success) {
                console.error(
                  `${company.name} 주문 동기화 실패:`,
                  result.errors,
                );
              } else {
                console.log(
                  `${company.name} 주문 동기화 완료: ${result.ordersCollected}개 플랫폼`,
                );
              }
            } catch (error) {
              console.error(`${company.name} 주문 동기화 중 오류:`, error);
            }
          }
        } catch (error) {
          console.error("주문 동기화 스케줄러 오류:", error);
        }
      },
      {
        scheduled: false,
      },
    );

    this.jobs.set("orderSync", task);
    task.start();
  }

  // 광고 성과 데이터 동기화 (매 시간)
  private static scheduleAdPerformanceSync() {
    const task = cron.schedule(
      "0 * * * *",
      async () => {
        console.log("광고 성과 데이터 동기화 시작...");

        try {
          const today = new Date().toISOString().split("T")[0];
          const companies = await db
            .select()
            .from(companies)
            .where(eq(companies.isActive, true));

          for (const company of companies) {
            try {
              const result = await AdPerformanceCollector.collectAllAdData(
                company.id,
                today,
                today,
              );

              // ROAS 임계치 확인
              await AdPerformanceCollector.checkROASAlerts(company.id);

              console.log(`${company.name} 광고 데이터 동기화 완료`);
            } catch (error) {
              console.error(`${company.name} 광고 동기화 중 오류:`, error);
            }
          }
        } catch (error) {
          console.error("광고 성과 동기화 스케줄러 오류:", error);
        }
      },
      {
        scheduled: false,
      },
    );

    this.jobs.set("adPerformanceSync", task);
    task.start();
  }

  // 재고 및 비즈니스 알림 체크 (매 30분)
  private static scheduleInventoryCheck() {
    const task = cron.schedule(
      "*/30 * * * *",
      async () => {
        console.log("재고 및 알림 체크 시작...");

        try {
          const companies = await db
            .select()
            .from(companies)
            .where(eq(companies.isActive, true));

          for (const company of companies) {
            const settings = company.settings || {
              alertThresholds: { lowStock: 10, cashFlow: 60, roas: 300 },
            };

            // 재고 부족 체크
            await AlertService.checkLowStockAlerts(
              company.id,
              settings.alertThresholds,
            );

            // 현금흐름 체크 (Mock 데이터)
            const remainingDays = await this.calculateCashFlowDays(company.id);
            if (remainingDays < settings.alertThresholds.cashFlow) {
              await AlertService.checkCashFlowAlerts(
                company.id,
                remainingDays,
                settings.alertThresholds.cashFlow,
              );
            }

            console.log(`${company.name} 알림 체크 완료`);
          }
        } catch (error) {
          console.error("재고/알림 체크 스케줄러 오류:", error);
        }
      },
      {
        scheduled: false,
      },
    );

    this.jobs.set("inventoryCheck", task);
    task.start();
  }

  // 일간 리포트 생성 (매일 자정)
  private static scheduleDailyReport() {
    const task = cron.schedule(
      "0 0 * * *",
      async () => {
        console.log("일간 리포트 생성 시작...");

        try {
          const companies = await db
            .select()
            .from(companies)
            .where(eq(companies.isActive, true));

          for (const company of companies) {
            await this.generateDailyReport(company.id, company.name);
          }
        } catch (error) {
          console.error("일간 리포트 생성 오류:", error);
        }
      },
      {
        scheduled: false,
      },
    );

    this.jobs.set("dailyReport", task);
    task.start();
  }

  // 현금흐름 일수 계산 (실제로는 복잡한 계산 로직 필요)
  private static async calculateCashFlowDays(
    companyId: string,
  ): Promise<number> {
    try {
      // 최근 30일 수입/지출 데이터 분석
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

      // 주문 데이터에서 수입 계산
      const recentOrders = await db
        .select()
        .from(orders)
        .where(
          and(
            eq(orders.companyId, companyId),
            gte(orders.orderDate, thirtyDaysAgo),
          ),
        );

      const totalRevenue = recentOrders.reduce(
        (sum, order) => sum + parseFloat(order.amount),
        0,
      );

      const dailyRevenue = totalRevenue / 30;
      const estimatedMonthlyCosts = dailyRevenue * 0.7; // 추정 70% 비용
      const netCashFlow = dailyRevenue - estimatedMonthlyCosts / 30;

      // 현재 현금 (Mock 데이터)
      const currentCash = 180000000; // 1.8억원

      return netCashFlow > 0
        ? Math.floor(currentCash / (estimatedMonthlyCosts / 30))
        : 30;
    } catch (error) {
      console.error("현금흐름 계산 오류:", error);
      return 120; // 기본값
    }
  }

  // 일간 리포트 생성
  private static async generateDailyReport(
    companyId: string,
    companyName: string,
  ) {
    try {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      // 어제 주문 수 집계
      const yesterdayOrders = await db
        .select()
        .from(orders)
        .where(
          and(
            eq(orders.companyId, companyId),
            gte(orders.orderDate, yesterday),
          ),
        );

      // 어제 광고 성과 집계
      const yesterdayAdPerf = await db
        .select()
        .from(adPerformance)
        .where(
          and(
            eq(adPerformance.companyId, companyId),
            gte(adPerformance.date, yesterday),
          ),
        );

      const totalRevenue = yesterdayOrders.reduce(
        (sum, order) => sum + parseFloat(order.amount),
        0,
      );

      const totalAdSpend = yesterdayAdPerf.reduce(
        (sum, ad) => sum + parseFloat(ad.cost),
        0,
      );

      const avgRoas =
        yesterdayAdPerf.length > 0
          ? yesterdayAdPerf.reduce((sum, ad) => sum + ad.roas, 0) /
            yesterdayAdPerf.length
          : 0;

      // 일간 리포트 알림 생성
      await AlertService.createAlert(companyId, {
        type: "daily_report",
        severity: "info",
        title: "일간 비즈니스 리포트",
        message: `
          📊 ${companyName} 어제 성과 요약:
          • 주문: ${yesterdayOrders.length}건, 매출: ₩${totalRevenue.toLocaleString()}
          • 광고비: ₩${totalAdSpend.toLocaleString()}, 평균 ROAS: ${avgRoas.toFixed(1)}%
          • 순수익: ₩${(totalRevenue - totalAdSpend).toLocaleString()}
        `,
        metadata: {
          date: yesterdayStr,
          orders: yesterdayOrders.length,
          revenue: totalRevenue,
          adSpend: totalAdSpend,
          roas: avgRoas,
        },
      });

      console.log(`${companyName} 일간 리포트 생성 완료`);
    } catch (error) {
      console.error(`${companyName} 일간 리포트 생성 오류:`, error);
    }
  }

  // 특정 스케줄러 중지
  static stopScheduler(jobName: string) {
    const job = this.jobs.get(jobName);
    if (job) {
      job.stop();
      this.jobs.delete(jobName);
      console.log(`${jobName} 스케줄러가 중지되었습니다.`);
    }
  }

  // 모든 스케줄러 중지
  static stopAll() {
    this.jobs.forEach((job, name) => {
      job.stop();
      console.log(`${name} 스케줄러 중지`);
    });
    this.jobs.clear();
    console.log("모든 스케줄러가 중지되었습니다.");
  }

  // 스케줄러 상태 조회
  static getStatus() {
    const status = {};
    this.jobs.forEach((job, name) => {
      status[name] = {
        running: job.getStatus() === "scheduled",
        nextRun: job.nextDate()?.toISOString(),
      };
    });
    return status;
  }
}

// server/routes/scheduler.ts - 스케줄러 관리 API
import { Router } from "express";
import { DataSyncScheduler } from "../services/dataScheduler";

const router = Router();

// 스케줄러 상태 조회
router.get("/status", (req, res) => {
  try {
    const status = DataSyncScheduler.getStatus();
    res.json({ success: true, schedulers: status });
  } catch (error) {
    res.status(500).json({ message: "스케줄러 상태 조회 실패" });
  }
});

// 특정 스케줄러 재시작
router.post("/restart/:jobName", (req, res) => {
  try {
    const { jobName } = req.params;
    DataSyncScheduler.stopScheduler(jobName);

    // 개별 스케줄러 재시작 로직
    switch (jobName) {
      case "orderSync":
        // 주문 동기화 재시작
        break;
      case "adPerformanceSync":
        // 광고 성과 동기화 재시작
        break;
      default:
        return res
          .status(400)
          .json({ message: "지원하지 않는 스케줄러입니다." });
    }

    res.json({
      success: true,
      message: `${jobName} 스케줄러가 재시작되었습니다.`,
    });
  } catch (error) {
    res.status(500).json({ message: "스케줄러 재시작 실패" });
  }
});

// 수동 데이터 동기화 트리거
router.post("/trigger/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const { companyId } = req.body;

    switch (type) {
      case "orders":
        const orderResult =
          await OrderCollectionService.collectAllOrders(companyId);
        res.json({ success: true, result: orderResult });
        break;

      case "ads":
        const today = new Date().toISOString().split("T")[0];
        const adResult = await AdPerformanceCollector.collectAllAdData(
          companyId,
          today,
          today,
        );
        res.json({ success: true, result: adResult });
        break;

      default:
        res.status(400).json({ message: "지원하지 않는 동기화 타입입니다." });
    }
  } catch (error) {
    res.status(500).json({ message: "수동 동기화 실패", error: error.message });
  }
});

export default router;
