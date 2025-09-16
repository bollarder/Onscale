import { Express } from 'express';

// 환경변수에서 실제 설정 로드
const realConfigs = [
  {
    platform: 'smartstore' as const,
    enabled: Boolean(process.env.SMARTSTORE_SELLER_ID),
    credentials: {
      sellerId: process.env.SMARTSTORE_SELLER_ID,
      apiKey: process.env.SMARTSTORE_API_KEY,
      secretKey: process.env.SMARTSTORE_SECRET_KEY
    }
  },
  {
    platform: 'coupang' as const,
    enabled: Boolean(process.env.COUPANG_VENDOR_ID),
    credentials: {
      vendorId: process.env.COUPANG_VENDOR_ID,
      accessKey: process.env.COUPANG_ACCESS_KEY,
      secretKey: process.env.COUPANG_SECRET_KEY
    }
  }
];

export function addRealEcommerceRoutes(app: Express) {

  // 연동 상태 확인
  app.get("/api/ecommerce/connection-status", async (req, res) => {
    res.json({
      platforms: {
        smartstore: {
          enabled: Boolean(process.env.SMARTSTORE_SELLER_ID),
          configured: Boolean(process.env.SMARTSTORE_API_KEY)
        },
        coupang: {
          enabled: Boolean(process.env.COUPANG_VENDOR_ID),
          configured: Boolean(process.env.COUPANG_ACCESS_KEY)
        }
      },
      message: "연동 상태 확인 완료"
    });
  });

  // 테스트용 간단한 라우트
  app.get("/api/ecommerce/test", (req, res) => {
    res.json({
      message: "이커머스 API 테스트 성공",
      timestamp: new Date().toISOString(),
      configs: realConfigs
    });
  });

  console.log("이커머스 라우트가 성공적으로 추가되었습니다.");
}