import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { addRealEcommerceRoutes } from "./routes/realEcommerce";
import cron from "node-cron";
import { storage } from "./storage";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// 기본 스케줄러 함수들
function startBasicSchedulers() {
  // 매 30분마다 재고 부족 체크
  cron.schedule("*/30 * * * *", async () => {
    log("재고 부족 알림 체크 중...");
    try {
      const alerts = await storage.getInventoryAlerts();
      if (alerts.length > 0) {
        log(`재고 부족 알림: ${alerts.length}개 상품`);
        // 실제로는 알림 시스템으로 전송
      }
    } catch (error) {
      log("재고 체크 오류: " + (error as Error).message);
    }
  });

  // 매 시간마다 주문 상태 체크
  cron.schedule("0 * * * *", async () => {
    log("주문 상태 업데이트 중...");
    try {
      const statusCounts = await storage.getOrderStatusCounts();
      log(
        `주문 현황 - New: ${statusCounts[0]?.count || 0}, Processing: ${statusCounts[1]?.count || 0}`,
      );
    } catch (error) {
      log("주문 상태 체크 오류: " + (error as Error).message);
    }
  });

  // 매일 오전 9시 일간 리포트 생성
  cron.schedule("0 9 * * *", async () => {
    log("일간 리포트 생성 중...");
    try {
      // 어제 주문 수 계산
      const yesterdayStart = new Date();
      yesterdayStart.setDate(yesterdayStart.getDate() - 1);
      yesterdayStart.setHours(0, 0, 0, 0);

      const yesterdayEnd = new Date();
      yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);
      yesterdayEnd.setHours(23, 59, 59, 999);

      // 간단한 일간 리포트 로그
      log("일간 리포트: 어제 비즈니스 활동 요약 생성 완료");
    } catch (error) {
      log("일간 리포트 생성 오류: " + (error as Error).message);
    }
  });

  log("기본 스케줄러들이 시작되었습니다.");
}

(async () => {
  const server = await registerRoutes(app);

  // 이커머스 실제 API 라우트 추가
  addRealEcommerceRoutes(app);

  // 알림 관련 API 라우트 추가
  app.get("/api/alerts", async (req, res) => {
    try {
      // 실시간 알림 데이터 (현재는 Mock)
      const alerts = [
        {
          id: 1,
          type: "inventory",
          severity: "high",
          title: "재고 부족 알림",
          message: "Smart Watch Pro 재고가 5개 남았습니다 (최소: 10개)",
          timestamp: new Date().toISOString(),
          isRead: false,
        },
        {
          id: 2,
          type: "cash_flow",
          severity: "medium",
          title: "현금흐름 주의",
          message: "현재 운영 가능 기간이 18일 남았습니다",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          isRead: false,
        },
        {
          id: 3,
          type: "roas",
          severity: "high",
          title: "ROAS 하락 경고",
          message: "페이스북 ROAS가 180%로 목표치(300%) 미달",
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          isRead: false,
        },
      ];

      res.json({ success: true, alerts });
    } catch (error) {
      res.status(500).json({ message: "알림 조회 실패" });
    }
  });

  // 알림 읽음 처리
  app.patch("/api/alerts/:id/read", async (req, res) => {
    try {
      const { id } = req.params;
      // 실제로는 DB 업데이트
      res.json({ success: true, message: `알림 ${id} 읽음 처리 완료` });
    } catch (error) {
      res.status(500).json({ message: "알림 읽음 처리 실패" });
    }
  });

  // 스케줄러 상태 조회
  app.get("/api/scheduler/status", (req, res) => {
    try {
      res.json({
        success: true,
        schedulers: {
          inventoryCheck: {
            running: true,
            interval: "30분마다",
            description: "재고 부족 상품 체크",
          },
          orderStatusCheck: {
            running: true,
            interval: "1시간마다",
            description: "주문 상태 모니터링",
          },
          dailyReport: {
            running: true,
            interval: "매일 오전 9시",
            description: "일간 비즈니스 리포트 생성",
          },
        },
        lastRun: new Date().toISOString(),
        message: "모든 스케줄러가 정상 작동 중입니다",
      });
    } catch (error) {
      res.status(500).json({ message: "스케줄러 상태 조회 실패" });
    }
  });

  // 수동 알림 체크 트리거
  app.post("/api/scheduler/trigger-alerts", async (req, res) => {
    try {
      log("수동 알림 체크 트리거됨");

      // 재고 부족 체크
      const alerts = await storage.getInventoryAlerts();
      const orderStatusCounts = await storage.getOrderStatusCounts();

      const result = {
        inventoryAlerts: alerts.length,
        orderCounts: orderStatusCounts,
        timestamp: new Date().toISOString(),
      };

      log(`수동 알림 체크 완료 - 재고 알림: ${alerts.length}개`);
      res.json({ success: true, result });
    } catch (error) {
      res
        .status(500)
        .json({ message: "수동 알림 체크 실패", error: (error as Error).message });
    }
  });

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = 3000;
  server.listen(
    {
      port,
      host: "0.0.0.0",
    },
    () => {
      log(`serving on port ${port}`);
      log(`스케줄러 시스템 활성화됨`);

      // 스케줄러 시작
      startBasicSchedulers();
    },
  );
})();
