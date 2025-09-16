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

  console.log("이커머스 API 라우트가 등록되었습니다.");
}
