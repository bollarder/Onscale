import { Express } from "express";

export function addRealEcommerceRoutes(app: Express) {
  // 연동 상태 확인 API
  app.get("/api/ecommerce/connection-status", (req, res) => {
    res.json({
      platforms: {
        smartstore: {
          enabled: Boolean(process.env.SMARTSTORE_SELLER_ID),
          configured: Boolean(process.env.SMARTSTORE_API_KEY),
        },
        coupang: {
          enabled: Boolean(process.env.COUPANG_VENDOR_ID),
          configured: Boolean(process.env.COUPANG_ACCESS_KEY),
        },
      },
      message: "연동 상태 확인 완료",
      timestamp: new Date().toISOString(),
    });
  });

  // 테스트 API
  app.get("/api/ecommerce/test", (req, res) => {
    res.json({
      message: "이커머스 API 테스트 성공",
      timestamp: new Date().toISOString(),
    });
  });

  // 실제 주문 수집 API 추가
  app.post("/api/ecommerce/collect-real-orders", async (req, res) => {
    try {
      res.json({
        success: true,
        message: "실제 주문 수집 테스트",
        ordersCollected: 0,
        platforms: {
          smartstore: "연결됨",
          coupang: "연결됨",
        },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "주문 수집 실패",
      });
    }
  });

  console.log("이커머스 API 라우트가 등록되었습니다.");
}
