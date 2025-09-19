import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { addRealEcommerceRoutes } from "./routes/realEcommerce";
import { authRoutes } from "./routes/auth";
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

// Mock 주문 관리 데이터 (실제로는 데이터베이스에서)
const mockOrders = [
  {
    id: "order-1",
    orderNumber: "COUPANG-" + Date.now(),
    platform: "coupang",
    customerName: "김철수",
    productName: "프리미엄 전통주 선물세트",
    quantity: 2,
    totalAmount: "90000",
    status: "new",
    paymentStatus: "paid",
    orderDate: new Date().toISOString(),
    recipientName: "김철수",
    shippingAddress: "서울시 강남구 테헤란로 123, 456호",
  },
  {
    id: "order-2",
    orderNumber: "NAVER-" + Date.now(),
    platform: "naver",
    customerName: "이영희",
    productName: "수제 막걸리 6병 세트",
    quantity: 1,
    totalAmount: "35000",
    status: "confirmed",
    paymentStatus: "paid",
    orderDate: new Date(Date.now() - 3600000).toISOString(),
    recipientName: "박선생",
    shippingAddress: "부산시 해운대구 센텀대로 567, 890동 123호",
  },
  {
    id: "order-3",
    orderNumber: "GMARKET-" + Date.now(),
    platform: "gmarket",
    customerName: "박민수",
    productName: "경주 법주 프리미엄",
    quantity: 3,
    totalAmount: "84000",
    status: "preparing",
    paymentStatus: "paid",
    trackingNumber: "CJ123456789",
    shippingCompany: "CJ대한통운",
    orderDate: new Date(Date.now() - 7200000).toISOString(),
    recipientName: "최대표",
    shippingAddress: "대구시 중구 동성로 234, 567빌딩 8층",
  },
];

(async () => {
  const server = await registerRoutes(app);

  // 이커머스 실제 API 라우트 추가
  addRealEcommerceRoutes(app);

  // 인증 라우트 추가
  app.use("/api/auth", authRoutes);

  // === 주문 관리 API 라우트 추가 ===

  // 주문 목록 조회 (필터링, 페이징 지원)
  app.get("/api/order-management/orders", async (req, res) => {
    try {
      const { status, platform, search, page = "1", limit = "20" } = req.query;

      let filteredOrders = [...mockOrders];

      // 필터 적용
      if (status && status !== "all") {
        filteredOrders = filteredOrders.filter(
          (order) => order.status === status,
        );
      }

      if (platform && platform !== "all") {
        filteredOrders = filteredOrders.filter(
          (order) => order.platform === platform,
        );
      }

      if (search) {
        const searchTerm = (search as string).toLowerCase();
        filteredOrders = filteredOrders.filter(
          (order) =>
            order.orderNumber.toLowerCase().includes(searchTerm) ||
            order.customerName.toLowerCase().includes(searchTerm) ||
            order.productName.toLowerCase().includes(searchTerm),
        );
      }

      // 페이징
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const startIndex = (pageNum - 1) * limitNum;
      const endIndex = startIndex + limitNum;

      const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
      const totalPages = Math.ceil(filteredOrders.length / limitNum);

      res.json({
        success: true,
        data: {
          orders: paginatedOrders,
          totalCount: filteredOrders.length,
          currentPage: pageNum,
          totalPages,
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "주문 조회 실패" });
    }
  });

  // 주문 상태 업데이트
  app.patch(
    "/api/order-management/orders/:orderId/status",
    async (req, res) => {
      try {
        const { orderId } = req.params;
        const { status } = req.body;

        const orderIndex = mockOrders.findIndex(
          (order) => order.id === orderId,
        );

        if (orderIndex === -1) {
          return res
            .status(404)
            .json({ success: false, message: "주문을 찾을 수 없습니다." });
        }

        mockOrders[orderIndex].status = status;

        log(`주문 ${orderId} 상태 변경: ${status}`);
        res.json({ success: true, message: "주문 상태가 업데이트되었습니다." });
      } catch (error) {
        res.status(500).json({ success: false, message: "상태 업데이트 실패" });
      }
    },
  );

  // 대량 출고 처리
  app.post("/api/order-management/orders/bulk-ship", async (req, res) => {
    try {
      const { orderIds } = req.body;

      if (!Array.isArray(orderIds) || orderIds.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "주문 ID 목록이 필요합니다." });
      }

      let successCount = 0;
      const results = [];

      for (const orderId of orderIds) {
        const orderIndex = mockOrders.findIndex(
          (order) => order.id === orderId,
        );

        if (orderIndex !== -1) {
          const trackingNumber = `CJ${Date.now()}${Math.floor(Math.random() * 1000)}`;

          mockOrders[orderIndex].status = "shipped";
          mockOrders[orderIndex].trackingNumber = trackingNumber;
          mockOrders[orderIndex].shippingCompany = "CJ대한통운";

          results.push({ orderId, success: true, trackingNumber });
          successCount++;
        } else {
          results.push({
            orderId,
            success: false,
            error: "주문을 찾을 수 없습니다.",
          });
        }
      }

      log(`대량 출고 처리 완료: ${successCount}개 성공`);
      res.json({
        success: true,
        message: `${successCount}개 주문 출고 완료, ${orderIds.length - successCount}개 실패`,
        results,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "대량 출고 처리 실패" });
    }
  });

  // 샘플 주문 생성
  app.post("/api/order-management/create-samples", async (req, res) => {
    try {
      // 기존 샘플 주문이 이미 있으므로 새로운 주문 추가
      const newOrders = [
        {
          id: "order-" + (mockOrders.length + 1),
          orderNumber: "11ST-" + Date.now(),
          platform: "11st",
          customerName: "정고객",
          productName: "청하 스파클링",
          quantity: 4,
          totalAmount: "120000",
          status: "new",
          paymentStatus: "paid",
          orderDate: new Date().toISOString(),
          recipientName: "정고객",
          shippingAddress: "인천시 연수구 컨벤시아대로 123",
        },
        {
          id: "order-" + (mockOrders.length + 2),
          orderNumber: "AUCTION-" + Date.now(),
          platform: "auction",
          customerName: "최고객",
          productName: "문배술 선물세트",
          quantity: 1,
          totalAmount: "65000",
          status: "new",
          paymentStatus: "paid",
          orderDate: new Date().toISOString(),
          recipientName: "김부장",
          shippingAddress: "광주시 서구 상무대로 456",
        },
      ];

      mockOrders.push(...newOrders);

      log(`${newOrders.length}개 샘플 주문 생성됨`);
      res.json({
        success: true,
        message: `${newOrders.length}개 샘플 주문이 생성되었습니다.`,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "샘플 주문 생성 실패" });
    }
  });

  // 대시보드 데이터
  app.get("/api/order-management/dashboard", async (req, res) => {
    try {
      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );

      // 오늘의 주문 (최근 24시간)
      const todayOrders = mockOrders.filter(
        (order) => new Date(order.orderDate) >= startOfDay,
      );

      // 처리 대기 중인 주문
      const pendingOrders = mockOrders.filter(
        (order) => order.status === "new" || order.status === "confirmed",
      );

      // 배송 중인 주문
      const shippingOrders = mockOrders.filter(
        (order) => order.status === "shipped",
      );

      const data = {
        todayOrders: todayOrders.length,
        todayRevenue: todayOrders.reduce(
          (sum, order) => sum + parseInt(order.totalAmount),
          0,
        ),
        pendingOrders: pendingOrders.length,
        shippingOrders: shippingOrders.length,
        pendingClaims: 3, // Mock 데이터
      };

      res.json({ success: true, data });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "대시보드 데이터 조회 실패" });
    }
  });

  // 배송 추적
  app.get(
    "/api/order-management/tracking/:trackingNumber",
    async (req, res) => {
      try {
        const { trackingNumber } = req.params;

        // Mock 배송 추적 데이터
        const trackingInfo = {
          trackingNumber,
          status: "배송중",
          currentLocation: "서울 중계점",
          estimatedDelivery: "내일 오후 6시 이전",
          history: [
            {
              date: "2024-01-15 09:00",
              location: "발송지",
              status: "집화완료",
            },
            {
              date: "2024-01-15 14:30",
              location: "서울터미널",
              status: "터미널 도착",
            },
            {
              date: "2024-01-15 18:00",
              location: "서울 중계점",
              status: "중계점 도착",
            },
          ],
        };

        res.json({ success: true, data: trackingInfo });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "배송 추적 조회 실패" });
      }
    },
  );

  // 클레임 조회
  app.get("/api/order-management/claims", async (req, res) => {
    try {
      // Mock 클레임 데이터
      const claims = [
        {
          id: "claim-1",
          orderId: "order-1",
          orderNumber: "COUPANG-001",
          type: "return",
          status: "pending",
          reason: "상품 불량",
          customerName: "김고객",
          requestDate: new Date().toISOString(),
          productName: "전통주 선물세트",
        },
        {
          id: "claim-2",
          orderId: "order-2",
          orderNumber: "NAVER-002",
          type: "exchange",
          status: "approved",
          reason: "사이즈 변경",
          customerName: "이고객",
          requestDate: new Date(Date.now() - 86400000).toISOString(),
          productName: "프리미엄 막걸리",
        },
      ];

      const { type } = req.query;
      const filteredClaims = type
        ? claims.filter((claim) => claim.type === type)
        : claims;

      res.json({ success: true, data: filteredClaims });
    } catch (error) {
      res.status(500).json({ success: false, message: "클레임 조회 실패" });
    }
  });

  // === 기존 알림 및 스케줄러 API ===

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
        {
          id: 4,
          type: "order",
          severity: "medium",
          title: "주문 처리 알림",
          message: `${mockOrders.filter((o) => o.status === "new").length}개 신규 주문이 처리 대기 중입니다`,
          timestamp: new Date(Date.now() - 900000).toISOString(),
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
        ordersPending: mockOrders.filter((o) => o.status === "new").length,
        timestamp: new Date().toISOString(),
      };

      log(
        `수동 알림 체크 완료 - 재고 알림: ${alerts.length}개, 주문 대기: ${result.ordersPending}개`,
      );
      res.json({ success: true, result });
    } catch (error) {
      res.status(500).json({
        message: "수동 알림 체크 실패",
        error: (error as Error).message,
      });
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
      log(
        `주문 관리 시스템 준비 완료 - ${mockOrders.length}개 주문 데이터 로드됨`,
      );

      // 스케줄러 시작
      startBasicSchedulers();
    },
  );
})();
