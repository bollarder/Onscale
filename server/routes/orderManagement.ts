import { Router } from "express";
import { OrderManagementService } from "../services/orderManagementService";

const router = Router();

// 주문 목록 조회 (필터링, 페이징 지원)
router.get("/orders", async (req, res) => {
  try {
    const companyId = (req.query.companyId as string) || "default-company";
    const filter = {
      status: req.query.status as string,
      platform: req.query.platform as string,
      startDate: req.query.startDate as string,
      endDate: req.query.endDate as string,
      searchTerm: req.query.search as string,
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 50,
    };

    const result = await OrderManagementService.getOrders(companyId, filter);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 개별 주문 상세 조회
router.get("/orders/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await OrderManagementService.getOrderById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "주문을 찾을 수 없습니다." });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 주문 상태 업데이트
router.patch("/orders/:orderId/status", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, trackingNumber, shippingCompany, reason } = req.body;
    const userId = req.body.userId || "system"; // 실제로는 JWT에서 가져와야 함

    const result = await OrderManagementService.updateOrderStatus(
      orderId,
      {
        status,
        trackingNumber,
        shippingCompany,
        metadata: reason ? { reason } : undefined,
      },
      userId,
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 대량 출고 처리
router.post("/orders/bulk-ship", async (req, res) => {
  try {
    const { orderIds, shippingCompanyId, userId = "system" } = req.body;

    if (!Array.isArray(orderIds) || orderIds.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "주문 ID 목록이 필요합니다." });
    }

    const results = await OrderManagementService.bulkShipOrders(
      orderIds,
      shippingCompanyId,
      userId,
    );

    const successCount = results.filter((r) => r.success).length;
    const failureCount = results.filter((r) => !r.success).length;

    res.json({
      success: true,
      message: `${successCount}개 주문 출고 완료, ${failureCount}개 실패`,
      results,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 주문 취소
router.post("/orders/:orderId/cancel", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { reason, userId = "system" } = req.body;

    if (!reason) {
      return res
        .status(400)
        .json({ success: false, message: "취소 사유가 필요합니다." });
    }

    const result = await OrderManagementService.cancelOrder(
      orderId,
      reason,
      userId,
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 배송 추적
router.get("/tracking/:trackingNumber", async (req, res) => {
  try {
    const { trackingNumber } = req.params;
    const { companyCode } = req.query;

    const trackingInfo = await OrderManagementService.getTrackingInfo(
      trackingNumber,
      companyCode as string,
    );
    res.json({ success: true, data: trackingInfo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 주문 통계
router.get("/stats", async (req, res) => {
  try {
    const companyId = (req.query.companyId as string) || "default-company";
    const period =
      (req.query.period as "daily" | "weekly" | "monthly") || "daily";

    const stats = await OrderManagementService.getOrderStats(companyId, period);
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 배송업체 목록
router.get("/shipping-companies", async (req, res) => {
  try {
    const companies = await OrderManagementService.getShippingCompanies();
    res.json({ success: true, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 운송장 출력
router.post("/orders/print-shipping-labels", async (req, res) => {
  try {
    const { orderIds } = req.body;

    if (!Array.isArray(orderIds) || orderIds.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "주문 ID 목록이 필요합니다." });
    }

    // 운송장 출력 데이터 생성
    const labelData =
      await OrderManagementService.generateShippingLabels(orderIds);

    res.json({
      success: true,
      message: `${orderIds.length}개 운송장 생성 완료`,
      data: labelData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 클레임 관리 (반품, 교환)
router.get("/claims", async (req, res) => {
  try {
    const companyId = (req.query.companyId as string) || "default-company";
    const claimType = req.query.type as string; // 'return', 'exchange'

    const claims = await OrderManagementService.getClaims(companyId, claimType);
    res.json({ success: true, data: claims });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 클레임 처리
router.post("/claims/:claimId/process", async (req, res) => {
  try {
    const { claimId } = req.params;
    const { action, reason, userId = "system" } = req.body; // 'approve', 'reject'

    const result = await OrderManagementService.processClaim(
      claimId,
      action,
      reason,
      userId,
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

// server/index.ts에 추가할 라우트 등록
export function addOrderManagementRoutes(app: Express) {
  app.use("/api/order-management", router);
}

// 확장된 주문 관리 서비스에 추가 메서드들
export class OrderManagementServiceExtended extends OrderManagementService {
  // 개별 주문 조회
  static async getOrderById(orderId: string) {
    const [order] = await db
      .select()
      .from(ordersExtended)
      .where(eq(ordersExtended.id, orderId));
    return order || null;
  }

  // 배송업체 목록 조회
  static async getShippingCompanies() {
    return await db
      .select()
      .from(shippingCompanies)
      .where(eq(shippingCompanies.isActive, true));
  }

  // 운송장 출력 데이터 생성
  static async generateShippingLabels(orderIds: string[]) {
    const orders = await db
      .select()
      .from(ordersExtended)
      .where(
        sql`${ordersExtended.id} IN (${orderIds.map((id) => `'${id}'`).join(",")})`,
      );

    return orders.map((order) => ({
      orderId: order.id,
      orderNumber: order.orderNumber,
      recipientName: order.recipientName,
      recipientPhone: order.recipientPhone,
      shippingAddress: order.shippingAddress,
      productName: order.productName,
      quantity: order.quantity,
      trackingNumber: order.trackingNumber || "TBD",
      printUrl: `/api/order-management/print-label/${order.id}`, // 실제 출력 URL
    }));
  }

  // 클레임 조회
  static async getClaims(companyId: string, claimType?: string) {
    // Mock 클레임 데이터 (실제로는 별도 테이블에서 조회)
    const mockClaims = [
      {
        id: "claim-1",
        orderId: "order-1",
        orderNumber: "ORD-001",
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
        orderNumber: "ORD-002",
        type: "exchange",
        status: "approved",
        reason: "사이즈 변경",
        customerName: "이고객",
        requestDate: new Date(Date.now() - 86400000).toISOString(),
        productName: "프리미엄 막걸리",
      },
    ];

    return claimType
      ? mockClaims.filter((claim) => claim.type === claimType)
      : mockClaims;
  }

  // 클레임 처리
  static async processClaim(
    claimId: string,
    action: string,
    reason: string,
    userId: string,
  ) {
    // 실제로는 클레임 테이블 업데이트 및 플랫폼 알림
    console.log(`클레임 ${claimId} ${action} 처리: ${reason} by ${userId}`);

    return {
      success: true,
      message: `클레임이 ${action === "approve" ? "승인" : "거절"}되었습니다.`,
    };
  }

  // Mock 데이터로 샘플 주문 생성 (테스트용)
  static async createSampleOrders(companyId: string) {
    const sampleOrders = [
      {
        companyId,
        orderNumber: "COUPANG-" + Date.now(),
        platform: "coupang",
        platformOrderId: "CP" + Date.now(),
        customerName: "김철수",
        customerPhone: "010-1234-5678",
        customerEmail: "kim@example.com",
        productName: "프리미엄 전통주 선물세트",
        sku: "GIFT-001",
        quantity: 2,
        unitPrice: "45000",
        totalAmount: "90000",
        recipientName: "김철수",
        recipientPhone: "010-1234-5678",
        shippingAddress: "서울시 강남구 테헤란로 123, 456호",
        shippingPostalCode: "06234",
        shippingMethod: "택배",
        status: "new",
        paymentStatus: "paid",
        orderDate: new Date(),
        metadata: { customerNotes: "배송 전 연락 부탁드립니다." },
      },
      {
        companyId,
        orderNumber: "NAVER-" + Date.now(),
        platform: "naver",
        platformOrderId: "NV" + Date.now(),
        customerName: "이영희",
        customerPhone: "010-9876-5432",
        customerEmail: "lee@example.com",
        productName: "수제 막걸리 6병 세트",
        sku: "MAKGEOLLI-006",
        quantity: 1,
        unitPrice: "35000",
        totalAmount: "35000",
        recipientName: "박선생",
        recipientPhone: "010-5555-1234",
        shippingAddress: "부산시 해운대구 센텀대로 567, 890동 123호",
        shippingPostalCode: "48058",
        shippingMethod: "택배",
        status: "confirmed",
        paymentStatus: "paid",
        orderDate: new Date(Date.now() - 3600000), // 1시간 전
        metadata: { customerNotes: "선물용 포장 부탁드립니다." },
      },
      {
        companyId,
        orderNumber: "GMARKET-" + Date.now(),
        platform: "gmarket",
        platformOrderId: "GM" + Date.now(),
        customerName: "박민수",
        customerPhone: "010-1111-2222",
        customerEmail: "park@example.com",
        productName: "경주 법주 프리미엄",
        sku: "BEOPJU-001",
        quantity: 3,
        unitPrice: "28000",
        totalAmount: "84000",
        recipientName: "최대표",
        recipientPhone: "010-3333-4444",
        shippingAddress: "대구시 중구 동성로 234, 567빌딩 8층",
        shippingPostalCode: "41911",
        shippingMethod: "택배",
        status: "preparing",
        paymentStatus: "paid",
        trackingNumber: "CJ123456789",
        shippingCompany: "CJ대한통운",
        orderDate: new Date(Date.now() - 7200000), // 2시간 전
        metadata: { internalNotes: "VIP 고객 - 신중히 포장" },
      },
    ];

    for (const order of sampleOrders) {
      await db.insert(ordersExtended).values(order);
    }

    return {
      success: true,
      message: `${sampleOrders.length}개 샘플 주문이 생성되었습니다.`,
    };
  }

  // 주문 현황 대시보드 데이터
  static async getDashboardData(companyId: string) {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    // 오늘의 주문 수
    const todayOrders = await db
      .select()
      .from(ordersExtended)
      .where(
        and(
          eq(ordersExtended.companyId, companyId),
          gte(ordersExtended.orderDate, startOfDay),
        ),
      );

    // 처리 대기 중인 주문
    const pendingOrders = await db
      .select()
      .from(ordersExtended)
      .where(
        and(
          eq(ordersExtended.companyId, companyId),
          sql`${ordersExtended.status} IN ('new', 'confirmed')`,
        ),
      );

    // 배송 중인 주문
    const shippingOrders = await db
      .select()
      .from(ordersExtended)
      .where(
        and(
          eq(ordersExtended.companyId, companyId),
          eq(ordersExtended.status, "shipped"),
        ),
      );

    // 클레임 대기 건수 (Mock)
    const pendingClaims = 3;

    return {
      todayOrders: todayOrders.length,
      todayRevenue: todayOrders.reduce(
        (sum, order) => sum + Number(order.totalAmount),
        0,
      ),
      pendingOrders: pendingOrders.length,
      shippingOrders: shippingOrders.length,
      pendingClaims,
      recentOrders: todayOrders.slice(0, 5), // 최근 5개 주문
    };
  }
}
