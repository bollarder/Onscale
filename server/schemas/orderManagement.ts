import {
  pgTable,
  text,
  integer,
  decimal,
  timestamp,
  boolean,
  json,
  varchar,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

// 확장된 주문 테이블
export const ordersExtended = pgTable("orders_extended", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  companyId: text("company_id")
    .references(() => companies.id)
    .notNull(),

  // 기본 주문 정보
  orderNumber: varchar("order_number", { length: 100 }).notNull(),
  platform: varchar("platform", { length: 50 }).notNull(), // 'coupang', 'naver', 'gmarket' 등
  platformOrderId: varchar("platform_order_id", { length: 100 }).notNull(),

  // 고객 정보
  customerName: varchar("customer_name", { length: 255 }),
  customerPhone: varchar("customer_phone", { length: 50 }),
  customerEmail: varchar("customer_email", { length: 255 }),

  // 상품 정보
  productName: varchar("product_name", { length: 500 }).notNull(),
  sku: varchar("sku", { length: 100 }),
  quantity: integer("quantity").notNull(),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),

  // 배송 정보
  recipientName: varchar("recipient_name", { length: 255 }),
  recipientPhone: varchar("recipient_phone", { length: 50 }),
  shippingAddress: text("shipping_address"),
  shippingPostalCode: varchar("shipping_postal_code", { length: 20 }),
  shippingMethod: varchar("shipping_method", { length: 100 }), // '택배', '퀵서비스', '직배송' 등

  // 주문 상태 관리
  status: varchar("status", { length: 50 }).notNull(), // 'new', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled', 'returned'
  paymentStatus: varchar("payment_status", { length: 50 }), // 'paid', 'pending', 'cancelled', 'refunded'

  // 배송 추적
  trackingNumber: varchar("tracking_number", { length: 100 }),
  shippingCompany: varchar("shipping_company", { length: 100 }), // 'CJ대한통운', '로젠택배' 등
  shippedAt: timestamp("shipped_at"),
  deliveredAt: timestamp("delivered_at"),

  // 주문 일시
  orderDate: timestamp("order_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  // 메타데이터
  metadata: json("metadata").$type<{
    platformSpecific?: any;
    customerNotes?: string;
    internalNotes?: string;
    cancelReason?: string;
    returnReason?: string;
  }>(),
});

// 배송 회사 정보
export const shippingCompanies = pgTable("shipping_companies", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar("name", { length: 100 }).notNull(),
  code: varchar("code", { length: 20 }).notNull(),
  trackingUrl: varchar("tracking_url", { length: 500 }),
  apiEndpoint: varchar("api_endpoint", { length: 500 }),
  isActive: boolean("is_active").default(true),
  credentials: json("credentials").$type<{
    apiKey?: string;
    userId?: string;
    password?: string;
  }>(),
});

// 주문 상태 변경 히스토리
export const orderStatusHistory = pgTable("order_status_history", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  orderId: text("order_id")
    .references(() => ordersExtended.id)
    .notNull(),
  fromStatus: varchar("from_status", { length: 50 }),
  toStatus: varchar("to_status", { length: 50 }).notNull(),
  reason: text("reason"),
  changedBy: varchar("changed_by", { length: 100 }),
  changedAt: timestamp("changed_at").defaultNow().notNull(),
});

// server/services/orderManagementService.ts - 주문 관리 서비스
import { db } from "../db";
import {
  ordersExtended,
  shippingCompanies,
  orderStatusHistory,
} from "../schemas/orderManagement";
import { eq, and, gte, desc, like, sql } from "drizzle-orm";
import axios from "axios";

export interface OrderFilter {
  status?: string;
  platform?: string;
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
}

export interface OrderUpdateData {
  status?: string;
  trackingNumber?: string;
  shippingCompany?: string;
  metadata?: any;
}

export class OrderManagementService {
  // 주문 목록 조회 (필터링, 페이징 지원)
  static async getOrders(companyId: string, filter: OrderFilter = {}) {
    let query = db
      .select()
      .from(ordersExtended)
      .where(eq(ordersExtended.companyId, companyId));

    // 필터 적용
    if (filter.status) {
      query = query.where(
        and(
          eq(ordersExtended.companyId, companyId),
          eq(ordersExtended.status, filter.status),
        ),
      );
    }

    if (filter.platform) {
      query = query.where(
        and(
          eq(ordersExtended.companyId, companyId),
          eq(ordersExtended.platform, filter.platform),
        ),
      );
    }

    if (filter.startDate && filter.endDate) {
      query = query.where(
        and(
          eq(ordersExtended.companyId, companyId),
          gte(ordersExtended.orderDate, new Date(filter.startDate)),
          gte(new Date(filter.endDate), ordersExtended.orderDate),
        ),
      );
    }

    if (filter.searchTerm) {
      const searchPattern = `%${filter.searchTerm}%`;
      query = query.where(
        and(
          eq(ordersExtended.companyId, companyId),
          sql`(${like(ordersExtended.orderNumber, searchPattern)} OR ${like(ordersExtended.customerName, searchPattern)} OR ${like(ordersExtended.productName, searchPattern)})`,
        ),
      );
    }

    // 페이징
    const limit = filter.limit || 50;
    const offset = ((filter.page || 1) - 1) * limit;

    const orders = await query
      .orderBy(desc(ordersExtended.orderDate))
      .limit(limit)
      .offset(offset);

    // 전체 카운트
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(ordersExtended)
      .where(eq(ordersExtended.companyId, companyId));

    return {
      orders,
      totalCount: Number(count),
      currentPage: filter.page || 1,
      totalPages: Math.ceil(Number(count) / limit),
    };
  }

  // 주문 상태 업데이트
  static async updateOrderStatus(
    orderId: string,
    updateData: OrderUpdateData,
    changedBy: string,
  ) {
    const currentOrder = await db
      .select()
      .from(ordersExtended)
      .where(eq(ordersExtended.id, orderId))
      .limit(1);

    if (currentOrder.length === 0) {
      throw new Error("주문을 찾을 수 없습니다.");
    }

    const oldStatus = currentOrder[0].status;

    // 주문 정보 업데이트
    await db
      .update(ordersExtended)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(ordersExtended.id, orderId));

    // 상태 변경 히스토리 기록
    if (updateData.status && updateData.status !== oldStatus) {
      await db.insert(orderStatusHistory).values({
        orderId,
        fromStatus: oldStatus,
        toStatus: updateData.status,
        changedBy,
      });
    }

    return { success: true, message: "주문 상태가 업데이트되었습니다." };
  }

  // 대량 출고 처리 (운송장 번호 할당)
  static async bulkShipOrders(
    orderIds: string[],
    shippingCompanyId: string,
    userId: string,
  ) {
    const results = [];

    for (const orderId of orderIds) {
      try {
        // 운송장 번호 생성 (택배사 API 연동)
        const trackingNumber = await this.generateTrackingNumber(
          shippingCompanyId,
          orderId,
        );

        // 주문 상태 업데이트
        await this.updateOrderStatus(
          orderId,
          {
            status: "shipped",
            trackingNumber,
            shippingCompany: shippingCompanyId,
          },
          userId,
        );

        // 플랫폼에 배송 시작 알림
        await this.notifyPlatformShipped(orderId, trackingNumber);

        results.push({ orderId, success: true, trackingNumber });
      } catch (error) {
        results.push({ orderId, success: false, error: error.message });
      }
    }

    return results;
  }

  // 운송장 번호 생성 (택배사 API)
  private static async generateTrackingNumber(
    shippingCompanyId: string,
    orderId: string,
  ): Promise<string> {
    const [company] = await db
      .select()
      .from(shippingCompanies)
      .where(eq(shippingCompanies.id, shippingCompanyId));

    if (!company) {
      throw new Error("배송업체 정보를 찾을 수 없습니다.");
    }

    // 실제로는 각 택배사 API 호출
    // 현재는 Mock 데이터
    const trackingNumber = `${company.code}${Date.now()}${Math.floor(Math.random() * 1000)}`;

    return trackingNumber;
  }

  // 플랫폼에 배송 시작 알림
  private static async notifyPlatformShipped(
    orderId: string,
    trackingNumber: string,
  ) {
    const [order] = await db
      .select()
      .from(ordersExtended)
      .where(eq(ordersExtended.id, orderId));

    if (!order) return;

    switch (order.platform) {
      case "coupang":
        await this.notifyCoupangShipped(order.platformOrderId, trackingNumber);
        break;
      case "naver":
        await this.notifyNaverShipped(order.platformOrderId, trackingNumber);
        break;
      // 다른 플랫폼들...
    }
  }

  // 쿠팡 배송 알림
  private static async notifyCoupangShipped(
    platformOrderId: string,
    trackingNumber: string,
  ) {
    try {
      // 쿠팡 API 호출하여 배송 상태 업데이트
      console.log(
        `쿠팡 주문 ${platformOrderId}에 운송장 ${trackingNumber} 등록`,
      );
    } catch (error) {
      console.error("쿠팡 배송 알림 실패:", error);
    }
  }

  // 네이버 배송 알림
  private static async notifyNaverShipped(
    platformOrderId: string,
    trackingNumber: string,
  ) {
    try {
      // 네이버 커머스 API 호출
      console.log(
        `네이버 주문 ${platformOrderId}에 운송장 ${trackingNumber} 등록`,
      );
    } catch (error) {
      console.error("네이버 배송 알림 실패:", error);
    }
  }

  // 배송 추적 정보 조회
  static async getTrackingInfo(
    trackingNumber: string,
    shippingCompanyCode: string,
  ) {
    try {
      // 각 택배사 API 호출하여 배송 추적 정보 조회
      const trackingInfo = {
        trackingNumber,
        status: "배송중",
        currentLocation: "서울 중계점",
        estimatedDelivery: "내일 오후 6시 이전",
        history: [
          { date: "2024-01-15 09:00", location: "발송지", status: "집화완료" },
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

      return trackingInfo;
    } catch (error) {
      throw new Error("배송 추적 정보를 가져올 수 없습니다.");
    }
  }

  // 주문 취소 처리
  static async cancelOrder(orderId: string, reason: string, userId: string) {
    const [order] = await db
      .select()
      .from(ordersExtended)
      .where(eq(ordersExtended.id, orderId));

    if (!order) {
      throw new Error("주문을 찾을 수 없습니다.");
    }

    if (order.status === "shipped" || order.status === "delivered") {
      throw new Error("이미 배송된 주문은 취소할 수 없습니다.");
    }

    // 플랫폼에 취소 요청
    await this.notifyPlatformCancelled(
      order.platformOrderId,
      order.platform,
      reason,
    );

    // 주문 상태 업데이트
    await this.updateOrderStatus(
      orderId,
      {
        status: "cancelled",
        metadata: { ...order.metadata, cancelReason: reason },
      },
      userId,
    );

    return { success: true, message: "주문이 취소되었습니다." };
  }

  // 플랫폼 취소 알림
  private static async notifyPlatformCancelled(
    platformOrderId: string,
    platform: string,
    reason: string,
  ) {
    // 각 플랫폼별 취소 API 호출
    console.log(`${platform} 주문 ${platformOrderId} 취소: ${reason}`);
  }

  // 주문 통계 조회
  static async getOrderStats(
    companyId: string,
    period: "daily" | "weekly" | "monthly" = "daily",
  ) {
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case "daily":
        startDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 30,
        );
        break;
      case "weekly":
        startDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 7 * 12,
        );
        break;
      case "monthly":
        startDate = new Date(now.getFullYear(), now.getMonth() - 12, 1);
        break;
    }

    const orders = await db
      .select()
      .from(ordersExtended)
      .where(
        and(
          eq(ordersExtended.companyId, companyId),
          gte(ordersExtended.orderDate, startDate),
        ),
      );

    // 통계 계산
    const stats = {
      totalOrders: orders.length,
      totalRevenue: orders.reduce(
        (sum, order) => sum + Number(order.totalAmount),
        0,
      ),
      averageOrderValue:
        orders.length > 0
          ? orders.reduce((sum, order) => sum + Number(order.totalAmount), 0) /
            orders.length
          : 0,
      statusBreakdown: this.calculateStatusBreakdown(orders),
      platformBreakdown: this.calculatePlatformBreakdown(orders),
      shippingPerformance: this.calculateShippingPerformance(orders),
    };

    return stats;
  }

  private static calculateStatusBreakdown(orders: any[]) {
    const breakdown = {};
    orders.forEach((order) => {
      breakdown[order.status] = (breakdown[order.status] || 0) + 1;
    });
    return breakdown;
  }

  private static calculatePlatformBreakdown(orders: any[]) {
    const breakdown = {};
    orders.forEach((order) => {
      breakdown[order.platform] = (breakdown[order.platform] || 0) + 1;
    });
    return breakdown;
  }

  private static calculateShippingPerformance(orders: any[]) {
    const shippedOrders = orders.filter(
      (order) => order.status === "shipped" || order.status === "delivered",
    );
    const avgShippingTime =
      shippedOrders.length > 0
        ? shippedOrders.reduce((sum, order) => {
            if (order.shippedAt) {
              const shippingTime =
                new Date(order.shippedAt).getTime() -
                new Date(order.orderDate).getTime();
              return sum + shippingTime;
            }
            return sum;
          }, 0) /
          shippedOrders.length /
          (1000 * 60 * 60 * 24)
        : 0; // 일 단위

    return {
      totalShipped: shippedOrders.length,
      averageShippingDays: Math.round(avgShippingTime * 10) / 10,
      onTimeDeliveryRate: 0.95, // Mock 데이터
    };
  }
}
