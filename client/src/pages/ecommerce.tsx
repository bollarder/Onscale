import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import {
  Package,
  ShoppingCart,
  RefreshCw,
  ArrowLeftRight,
  XCircle,
  MessageCircle,
  Settings,
  Truck,
  CheckCircle,
  Clock,
  Box,
  Search,
  HelpCircle,
  Phone,
  ExternalLink,
  ChevronDown,
  BarChart3,
  DollarSign,
  Users,
  TrendingUp,
  User,
  Home,
  ChevronLeft,
  Target,
  Activity,
  AlertTriangle,
} from "lucide-react";

const EcommerceOrdersPage = () => {
  const [currentPage, setCurrentPage] = useState("overview");
  const [isCollecting, setIsCollecting] = useState(false);
  const [collectionResult, setCollectionResult] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // 실제 주문 수집 함수
  const handleCollectOrders = async () => {
    setIsCollecting(true);

    try {
      const response = await fetch("/api/ecommerce/collect-real-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      setCollectionResult(result);
      setLastUpdated(new Date());

      // 성공시 주문 데이터 새로고침
      if (result.success) {
        // 여기서 실제 주문 데이터를 다시 로드할 수 있습니다
        console.log("주문 수집 성공:", result);
      }

      console.log("주문 수집 결과:", result);
    } catch (error) {
      console.error("주문 수집 실패:", error);
      setCollectionResult({
        success: false,
        message: "주문 수집 중 오류가 발생했습니다",
        ordersCollected: 0,
        orders: [],
        errors: [{ platform: "system", error: error.message }],
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsCollecting(false);
    }
  };

  // 주문 현황 통계 (온라인 + 오프라인 합계)
  const orderStats = {
    online: { 신규: 30, 준비: 24, 배송중: 25, 완료: 156 },
    offline: { 신규: 5, 준비: 3, 배송중: 2, 완료: 12 },
  };

  const totalOrders = {
    신규: orderStats.online.신규 + orderStats.offline.신규,
    준비: orderStats.online.준비 + orderStats.offline.준비,
    배송중: orderStats.online.배송중 + orderStats.offline.배송중,
    완료: orderStats.online.완료 + orderStats.offline.완료,
  };

  // SKU 분석 데이터
  const skuData = [
    {
      name: "식혜",
      options: [
        { option: "1.5L", quantity: 85, color: "#8B4513" },
        { option: "1L", quantity: 67, color: "#CD853F" },
        { option: "240ml", quantity: 52, color: "#DEB887" },
      ],
      total: 204,
      percentage: 28.5,
      velocity: 18.2,
    },
    {
      name: "단호박식혜",
      options: [
        { option: "1.5L", quantity: 45, color: "#FF8C00" },
        { option: "1L", quantity: 38, color: "#FFA500" },
        { option: "240ml", quantity: 29, color: "#FFB347" },
      ],
      total: 112,
      percentage: 15.6,
      velocity: 9.3,
    },
    {
      name: "쌀요거트",
      options: [
        { option: "1L", quantity: 72, color: "#E6E6FA" },
        { option: "240ml", quantity: 58, color: "#DDA0DD" },
      ],
      total: 130,
      percentage: 18.1,
      velocity: 11.7,
    },
    {
      name: "수정과",
      options: [{ option: "500ml", quantity: 95, color: "#DC143C" }],
      total: 95,
      percentage: 13.3,
      velocity: 8.6,
    },
    {
      name: "쌀누룩",
      options: [{ option: "500g", quantity: 175, color: "#F5DEB3" }],
      total: 175,
      percentage: 24.4,
      velocity: 15.8,
    },
  ];

  // 클레임 관리 샘플 데이터
  const claimsData = [
    {
      memo: "고객 직접 연락",
      shoppingMall: "네이버 쇼핑",
      orderNumber: "ORD-2025-001234",
      claimNumber: "RET-2025-000123",
      requestDate: "2025-09-16 14:30",
      status: "요청",
      processDate: "",
      product: "식혜 1.5L",
      productOption: "1.5L",
      quantity: 2,
      reason: "제품 불량",
      pickupDelivery: "CJ대한통운",
      redeliveryInfo: "",
      recipientName: "김철수",
      recipientAddress: "서울시 강남구 테헤란로 123",
      recipientPhone1: "010-1234-5678",
      recipientPhone2: "02-123-4567",
    },
    {
      memo: "",
      shoppingMall: "쿠팡",
      orderNumber: "ORD-2025-001235",
      claimNumber: "EXC-2025-000045",
      requestDate: "2025-09-15 10:15",
      status: "진행중",
      processDate: "2025-09-15 15:20",
      product: "단호박식혜 1L",
      productOption: "1L",
      quantity: 1,
      reason: "다른 상품 요청",
      pickupDelivery: "한진택배",
      redeliveryInfo: "로젠택배",
      recipientName: "이영희",
      recipientAddress: "경기도 성남시 분당구 정자로 456",
      recipientPhone1: "010-9876-5432",
      recipientPhone2: "",
    },
  ];

  // 포장 최적화 데이터
  const packagingData = {
    totalOrders: 100,
    totalProducts: 8,
    boxRequirements: [
      { name: "1호 (세화 1호)", quantity: 25, color: "#3B82F6" },
      { name: "2호 (세화 2호)", quantity: 18, color: "#10B981" },
      { name: "3호 (AP5)", quantity: 32, color: "#F59E0B" },
      { name: "4호 (AP13)", quantity: 14, color: "#EF4444" },
      { name: "5호 (AP37)", quantity: 8, color: "#8B5CF6" },
      { name: "6호 (세화 5-2호)", quantity: 12, color: "#EC4899" },
      { name: "7호 (AP20)", quantity: 7, color: "#06B6D4" },
      { name: "8호 (세화7호)", quantity: 4, color: "#84CC16" },
    ],
    packagingSupplies: {
      icePacks: 89,
      coolingPouchA: 45,
      coolingPouchB: 23,
    },
  };

  const totalSkuQuantity = skuData.reduce((sum, item) => sum + item.total, 0);
  const totalSkuCount = 12;

  // 차트 데이터
  const chartData = [
    {
      date: "08-18",
      배송완료: 93,
      승차출력: 93,
      포장: 93,
      배송중: 0,
      지연: 0,
      미집하: 0,
      배송취소: 0,
    },
    {
      date: "08-20",
      배송완료: 53,
      승차출력: 53,
      포장: 19,
      배송중: 0,
      지연: 0,
      미집하: 0,
      배송취소: 0,
    },
    {
      date: "08-21",
      배송완료: 29,
      승차출력: 29,
      포장: 29,
      배송중: 0,
      지연: 0,
      미집하: 0,
      배송취소: 0,
    },
    {
      date: "09-15",
      배송완료: 46,
      승차출력: 46,
      포장: 46,
      배송중: 0,
      지연: 1,
      미집하: 0,
      배송취소: 0,
    },
    {
      date: "09-16",
      배송완료: 24,
      승차출력: 24,
      포장: 24,
      배송중: 0,
      지연: 0,
      미집하: 0,
      배송취소: 0,
    },
  ];

  // 일자별 상세 데이터
  const detailData = [
    {
      date: "09-16",
      주문: 30,
      포장: 24,
      승차출력: 24,
      택배: 24,
      미집하: 0,
      배송취소: 0,
      배송중: 24,
      배송지연: 0,
      배송완료: 0,
    },
    {
      date: "09-15",
      주문: 52,
      포장: 46,
      승차출력: 46,
      택배: 46,
      미집하: 0,
      배송취소: 0,
      배송중: 1,
      배송지연: 0,
      배송완료: 45,
    },
  ];

  const renderEcommerceOverview = () => {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* AI 추천 카드 */}
          <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 rounded-lg p-6">
            <div className="flex items-start space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">AI</span>
                </div>
                <span className="font-semibold text-gray-800">AI 추천</span>
              </div>

              {/* 왼쪽: AI 추천 텍스트 */}
              <div className="flex-1 text-base text-gray-700 space-y-1">
                <div>📈 오늘 매출이 전일 대비 15% 증가했습니다.</div>
                <div>💡 인기 상품의 재고 보충을 권장합니다.</div>
                <div>🎯 오프라인 주문 패턴 분석 완료</div>
              </div>

              {/* 오른쪽: 컴팩트한 주문 수집 섹션 */}
              <div className="flex-shrink-0 w-64">
                <div
                  className={`p-3 rounded-lg border h-20 ${
                    collectionResult?.success
                      ? "bg-green-50 border-green-200"
                      : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <RefreshCw
                        className={`w-3 h-3 ${
                          collectionResult?.success
                            ? "text-green-600"
                            : "text-blue-600"
                        } ${isCollecting ? "animate-spin" : ""}`}
                      />
                      <span
                        className={`text-xs font-semibold ${
                          collectionResult?.success
                            ? "text-green-800"
                            : "text-blue-800"
                        }`}
                      >
                        {collectionResult?.success
                          ? "수집 완료"
                          : "실시간 주문 수집"}
                      </span>
                    </div>
                    <button
                      onClick={handleCollectOrders}
                      disabled={isCollecting}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                        isCollecting
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : collectionResult?.success
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {isCollecting ? (
                        <div className="flex items-center space-x-1">
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          <span>수집중</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <Package className="w-3 h-3" />
                          <span>수집</span>
                        </div>
                      )}
                    </button>
                  </div>

                  <div
                    className={`text-xs ${
                      collectionResult?.success
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {collectionResult?.success
                      ? `2개 플랫폼 수집완료 - 업데이트: ${lastUpdated.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}`
                      : lastUpdated
                        ? `업데이트: ${lastUpdated.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}`
                        : "네이버, 쿠팡 등 연동 쇼핑몰"}
                  </div>

                  {/* 실패 시에만 에러 메시지 표시 */}
                  {collectionResult && !collectionResult.success && (
                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs">
                      <div className="flex items-center space-x-1">
                        <AlertTriangle className="w-3 h-3 text-red-600 flex-shrink-0" />
                        <span className="font-medium text-red-800 truncate">
                          {collectionResult.message}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 첫 번째 줄 - 주문관리, SKU분석, 포장 최적화 */}
          <div className="grid grid-cols-3 gap-6">
            {/* 주문 관리 카드 */}
            <div
              className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 rounded-lg p-6 cursor-pointer hover:border-blue-300 h-80"
              onClick={() => setCurrentPage("order-detail")}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  주문 관리
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="p-2 border border-blue-200 rounded-lg">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">신규 주문</span>
                  <span className="font-semibold text-orange-600 text-xl">
                    {totalOrders.신규}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">준비중</span>
                  <span className="font-semibold text-blue-600 text-xl">
                    {totalOrders.준비}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">배송중</span>
                  <span className="font-semibold text-purple-600 text-xl">
                    {totalOrders.배송중}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">배송완료</span>
                  <span className="font-semibold text-green-600 text-xl">
                    {totalOrders.완료}
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="text-xs text-blue-600 hover:text-blue-700">
                  주문 관리 →
                </div>
              </div>
            </div>

            {/* 개선된 SKU 분석 카드 */}
            <div
              className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 rounded-lg p-6 h-80 cursor-pointer hover:border-purple-300"
              onClick={() => setCurrentPage("sku-analysis")}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  SKU 분석
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="p-2 border border-purple-200 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* 기본 정보 */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">이 출고예정</span>
                  <span className="font-semibold text-blue-600 text-lg">
                    {totalSkuQuantity}개
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">평균 판매속도</span>
                  <span className="font-semibold text-green-600 text-lg">
                    12.7/일
                  </span>
                </div>
              </div>

              {/* TOP 3 SKU */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700">
                  TOP 3 SKU 개수
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">식혜</span>
                    <span className="text-xs font-semibold text-blue-600">
                      204개
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">쌀누룩</span>
                    <span className="text-xs font-semibold text-green-600">
                      175개
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">쌀요거트</span>
                    <span className="text-xs font-semibold text-purple-600">
                      130개
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="text-xs text-purple-600">SKU 분석 →</div>
              </div>
            </div>

            {/* 포장 최적화 카드 */}
            <div
              className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 rounded-lg p-6 h-80 cursor-pointer hover:border-orange-300"
              onClick={() => setCurrentPage("packaging-optimization")}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  포장 최적화
                </h3>
                <div className="p-2 border border-orange-200 rounded-lg">
                  <Box className="w-5 h-5 text-orange-600" />
                </div>
              </div>

              {/* 효율성 막대 바 */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">포장 효율성</span>
                  <span className="text-sm font-semibold text-orange-600">
                    87%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-orange-600 h-3 rounded-full"
                    style={{ width: "87%" }}
                  ></div>
                </div>
              </div>

              {/* Top 3 박스 사이즈 */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700">
                  필요 박스 사이즈 Top 3
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">
                      소형 (20x15x10)
                    </span>
                    <span className="text-xs font-semibold text-blue-600">
                      1,247개
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">
                      중형 (30x25x15)
                    </span>
                    <span className="text-xs font-semibold text-green-600">
                      856개
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">
                      대형 (40x35x20)
                    </span>
                    <span className="text-xs font-semibold text-orange-600">
                      423개
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="text-xs text-orange-600">포장 최적화 →</div>
              </div>
            </div>
          </div>

          {/* 두 번째 줄 - 재고 관리, 발주 관리, AI 프롬프트 입력 */}
          <div className="grid grid-cols-3 gap-6">
            {/* 재고 관리 카드 */}
            <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 rounded-lg p-6 h-80 hover:border-green-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  재고 관리
                </h3>
                <div className="p-2 border border-green-200 rounded-lg">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
              </div>

              {/* 전체 재고 보유율 막대 바 */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    전체 재고 보유율
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    94%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full"
                    style={{ width: "94%" }}
                  ></div>
                </div>
              </div>

              {/* 재고율 낮은 제품 Top 3 */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700">
                  재고율 낮은 제품 Top 3
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">무선 마우스</span>
                    <span className="text-xs font-semibold text-red-600">
                      12%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">USB 케이블</span>
                    <span className="text-xs font-semibold text-orange-600">
                      18%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">휴대폰 거치대</span>
                    <span className="text-xs font-semibold text-yellow-600">
                      23%
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="text-xs text-green-600">재고 관리 →</div>
              </div>
            </div>

            {/* 발주 관리 카드 */}
            <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 rounded-lg p-6 h-80 hover:border-indigo-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  발주 관리
                </h3>
                <div className="p-2 border border-indigo-200 rounded-lg">
                  <Truck className="w-5 h-5 text-indigo-600" />
                </div>
              </div>

              {/* 발주 상태 */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">5</div>
                  <div className="text-xs text-gray-600">발주서 생성</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-orange-600">3</div>
                  <div className="text-xs text-gray-600">발주 대기</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">2</div>
                  <div className="text-xs text-gray-600">발주 중</div>
                </div>
              </div>

              {/* 임계치 이하 원자재 Top 3 */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700">
                  임계치 이하 원자재 Top 3
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">플라스틱 소재</span>
                    <span className="text-xs font-semibold text-red-600">
                      8%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">포장지</span>
                    <span className="text-xs font-semibold text-orange-600">
                      15%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">라벨 스티커</span>
                    <span className="text-xs font-semibold text-yellow-600">
                      22%
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="text-xs text-indigo-600">발주 관리 →</div>
              </div>
            </div>

            {/* AI 프롬프트 입력 카드 */}
            <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 rounded-lg p-6 h-80">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  AI 프롬프트
                </h3>
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">AI</span>
                </div>
              </div>

              <div className="space-y-4">
                <textarea
                  placeholder="온스케일 AI에게 질문하거나 업무를 요청하세요..."
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={4}
                />

                <div className="flex items-center space-x-2">
                  <button className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-colors">
                    질문하기
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-600 rounded text-sm hover:bg-gray-50 transition-colors">
                    예시
                  </button>
                </div>

                <div className="text-xs text-gray-500">
                  💡 "재고가 부족한 상품 분석해줘", "이번 달 매출 예측해줘" 등
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOrderDetailPage = () => {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* 뒤로가기 버튼 */}
          <div className="mb-6">
            <button
              onClick={() => setCurrentPage("overview")}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">이커머스 관리</span>
            </button>
          </div>

          {/* AI 추천 섹션 */}
          <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 rounded-lg p-6">
            <div className="flex items-start space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">AI</span>
                </div>
                <span className="font-semibold text-gray-800">AI 추천</span>
              </div>

              {/* 왼쪽: AI 추천 텍스트 */}
              <div className="flex-1 text-base text-gray-700 space-y-1">
                <div>📈 오늘 매출이 전일 대비 15% 증가했습니다.</div>
                <div>💡 인기 상품의 재고 보충을 권장합니다.</div>
                <div>🎯 오프라인 주문 패턴 분석 완료</div>
              </div>

              {/* 오른쪽: 컴팩트한 주문 수집 섹션 */}
              <div className="flex-shrink-0 w-64">
                <div
                  className={`p-3 rounded-lg border h-20 ${
                    collectionResult?.success
                      ? "bg-green-50 border-green-200"
                      : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <RefreshCw
                        className={`w-3 h-3 ${
                          collectionResult?.success
                            ? "text-green-600"
                            : "text-blue-600"
                        } ${isCollecting ? "animate-spin" : ""}`}
                      />
                      <span
                        className={`text-xs font-semibold ${
                          collectionResult?.success
                            ? "text-green-800"
                            : "text-blue-800"
                        }`}
                      >
                        {collectionResult?.success
                          ? "수집 완료"
                          : "실시간 주문 수집"}
                      </span>
                    </div>
                    <button
                      onClick={handleCollectOrders}
                      disabled={isCollecting}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                        isCollecting
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : collectionResult?.success
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {isCollecting ? (
                        <div className="flex items-center space-x-1">
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          <span>수집중</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <Package className="w-3 h-3" />
                          <span>수집</span>
                        </div>
                      )}
                    </button>
                  </div>

                  <div
                    className={`text-xs ${
                      collectionResult?.success
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {collectionResult?.success
                      ? `2개 플랫폼 수집완료 - 업데이트: ${lastUpdated.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}`
                      : lastUpdated
                        ? `업데이트: ${lastUpdated.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}`
                        : "네이버, 쿠팡 등 연동 쇼핑몰"}
                  </div>

                  {/* 실패 시에만 에러 메시지 표시 */}
                  {collectionResult && !collectionResult.success && (
                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs">
                      <div className="flex items-center space-x-1">
                        <AlertTriangle className="w-3 h-3 text-red-600 flex-shrink-0" />
                        <span className="font-medium text-red-800 truncate">
                          {collectionResult.message}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 카드 섹션 */}
          <div className="space-y-6">
            {/* 첫 번째 행 - 온라인 주문현황 + 클레임들 */}
            <div className="grid grid-cols-12 gap-4">
              {/* 온라인 주문현황 카드 */}
              <div className="col-span-5 bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 rounded-lg p-6 h-64">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    온라인 주문현황
                  </h3>
                  <div className="p-2 border border-blue-200 rounded-lg">
                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-orange-500" />
                      신규 주문
                    </span>
                    <span className="font-semibold text-orange-600 text-xl">
                      30
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 flex items-center">
                      <Box className="w-4 h-4 mr-2 text-blue-500" />
                      상품 준비
                    </span>
                    <span className="font-semibold text-blue-600 text-xl">
                      24
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 flex items-center">
                      <Truck className="w-4 h-4 mr-2 text-purple-500" />
                      배송 중
                    </span>
                    <span className="font-semibold text-purple-600 text-xl">
                      25
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      배송완료
                    </span>
                    <span className="font-semibold text-green-600 text-xl">
                      156
                    </span>
                  </div>
                </div>
              </div>

              {/* 클레임 카드들 */}
              <div className="col-span-7 grid grid-cols-3 gap-4">
                {/* 취소 클레임 카드 */}
                <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 rounded-lg p-6 h-64">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-800">
                      취소 클레임
                    </h3>
                    <div className="p-1 border border-red-200 rounded">
                      <XCircle className="w-4 h-4 text-red-600" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">취소 요청</span>
                      <span className="font-semibold text-red-600 text-lg">
                        2
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">취소 완료</span>
                      <span className="font-semibold text-gray-600 text-lg">
                        8
                      </span>
                    </div>
                  </div>
                </div>

                {/* 반품 클레임 카드 */}
                <div
                  className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 rounded-lg p-6 h-64 cursor-pointer hover:border-yellow-300"
                  onClick={() => setCurrentPage("return-claims")}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-800">
                      반품 클레임
                    </h3>
                    <div className="p-1 border border-yellow-200 rounded">
                      <RefreshCw className="w-4 h-4 text-yellow-600" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">반품 요청</span>
                      <span className="font-semibold text-yellow-600 text-lg">
                        3
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">반품 진행중</span>
                      <span className="font-semibold text-orange-600 text-lg">
                        1
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">반품 완료</span>
                      <span className="font-semibold text-gray-600 text-lg">
                        5
                      </span>
                    </div>
                  </div>
                </div>

                {/* 교환 클레임 카드 */}
                <div
                  className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 rounded-lg p-6 h-64 cursor-pointer hover:border-indigo-300"
                  onClick={() => setCurrentPage("exchange-claims")}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-800">
                      교환 클레임
                    </h3>
                    <div className="p-1 border border-indigo-200 rounded">
                      <ArrowLeftRight className="w-4 h-4 text-indigo-600" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">교환 요청</span>
                      <span className="font-semibold text-indigo-600 text-lg">
                        1
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">교환 진행중</span>
                      <span className="font-semibold text-purple-600 text-lg">
                        2
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">교환 완료</span>
                      <span className="font-semibold text-gray-600 text-lg">
                        3
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 배송처리현황 차트 */}
            <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  배송 처리 현황
                </h3>
                <div className="flex items-center space-x-2">
                  <select className="px-3 py-1 border border-gray-300 rounded text-sm bg-white">
                    <option value="7일">7일</option>
                    <option value="30일">30일</option>
                    <option value="90일">90일</option>
                  </select>
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                    더보기 »
                  </button>
                </div>
              </div>

              {/* 차트 */}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis
                      dataKey="date"
                      fontSize={10}
                      tick={{ fill: "#6b7280" }}
                    />
                    <YAxis fontSize={10} tick={{ fill: "#6b7280" }} />
                    <Legend />
                    <Bar dataKey="배송완료" fill="#10B981" name="배송완료" />
                    <Bar dataKey="배송중" fill="#8B5CF6" name="배송중" />
                    <Bar dataKey="지연" fill="#F59E0B" name="지연" />
                    <Bar dataKey="미집하" fill="#EF4444" name="미집하" />
                    <Bar dataKey="배송취소" fill="#6B7280" name="배송취소" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 오늘의 핵심 지표 + 배송처리현황 표 */}
            <div className="grid grid-cols-12 gap-4">
              {/* 오늘의 핵심 지표 */}
              <div className="col-span-5 bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-4">
                  오늘의 핵심 지표
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600 mb-1">
                      35
                    </div>
                    <div className="text-xs text-gray-600">이 주문</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600 mb-1">
                      1,450,000
                    </div>
                    <div className="text-xs text-gray-600">이 매출액(원)</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-purple-600 mb-1">
                      98.7%
                    </div>
                    <div className="text-xs text-gray-600">배송완료율</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-indigo-600 mb-1">
                      8
                    </div>
                    <div className="text-xs text-gray-600">연동된 쇼핑몰</div>
                  </div>
                </div>
              </div>

              {/* 배송처리현황 상세 데이터 표 */}
              <div className="col-span-7 bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-4">
                  배송 처리 상세 데이터
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-2 py-2 text-left text-xs text-gray-600">
                          기준일
                        </th>
                        <th className="px-2 py-2 text-center text-xs text-gray-600">
                          주문
                        </th>
                        <th className="px-2 py-2 text-center text-xs text-gray-600">
                          포장
                        </th>
                        <th className="px-2 py-2 text-center text-xs text-gray-600">
                          택배
                        </th>
                        <th className="px-2 py-2 text-center text-xs text-gray-600">
                          배송중
                        </th>
                        <th className="px-2 py-2 text-center text-xs text-gray-600">
                          배송완료
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {detailData.map((row, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }
                        >
                          <td className="px-2 py-1 font-medium text-xs text-gray-700">
                            {row.date}
                          </td>
                          <td className="px-2 py-1 text-center text-xs text-gray-700">
                            {row.주문}
                          </td>
                          <td className="px-2 py-1 text-center text-xs text-gray-700">
                            {row.포장}
                          </td>
                          <td className="px-2 py-1 text-center text-xs text-gray-700">
                            {row.택배}
                          </td>
                          <td className="px-2 py-1 text-center text-xs text-gray-700">
                            {row.배송중}
                          </td>
                          <td className="px-2 py-1 text-center text-xs text-gray-700">
                            {row.배송완료}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderReturnClaimsPage = () => {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* 뒤로가기 버튼 */}
          <div className="mb-6">
            <button
              onClick={() => setCurrentPage("order-detail")}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">주문 관리</span>
            </button>
          </div>

          {/* 필터 섹션 */}
          <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6">
            <div className="grid grid-cols-12 gap-4 items-end">
              {/* 쇼핑몰 선택 */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  쇼핑몰 선택
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="">전체</option>
                  <option value="naver">네이버 쇼핑</option>
                  <option value="coupang">쿠팡</option>
                </select>
              </div>

              {/* 검색창 */}
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  검색
                </label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="주문번호, 클레임번호, 상품, 이름, 전화번호"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md text-sm font-medium hover:bg-blue-700">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 반품 클레임 테이블 */}
          <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      메모
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      쇼핑몰
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      주문번호
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      상태
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      액션
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {claimsData
                    .filter((claim) => claim.claimNumber.startsWith("RET"))
                    .map((claim, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-3 py-2 text-xs text-gray-700">
                          {claim.memo || "-"}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-700">
                          {claim.shoppingMall}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-700">
                          {claim.orderNumber}
                        </td>
                        <td className="px-3 py-2 text-xs">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              claim.status === "요청"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {claim.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-xs">
                          <button className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">
                            처리
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderExchangeClaimsPage = () => {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="mb-6">
            <button
              onClick={() => setCurrentPage("order-detail")}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">주문 관리</span>
            </button>
          </div>
          <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              교환 클레임 관리
            </h3>
            <p className="text-gray-600">
              교환 관련 클레임을 관리할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderSkuAnalysisPage = () => {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="mb-6">
            <button
              onClick={() => setCurrentPage("overview")}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">이커머스 관리</span>
            </button>
          </div>

          {/* 상단 통계 카드 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-sm text-gray-600 mb-2">💼 이 출고개수</div>
              <div className="text-3xl font-bold text-gray-800">
                {totalSkuQuantity}개
              </div>
            </div>
            <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-sm text-gray-600 mb-2">📦 이 SKU 개수</div>
              <div className="text-3xl font-bold text-gray-800">
                {totalSkuCount}개
              </div>
            </div>
            <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-sm text-gray-600 mb-2">⚡ 평균 판매속도</div>
              <div className="text-3xl font-bold text-gray-800">12.7/일</div>
            </div>
          </div>

          {/* SKU 분석 차트 및 리스트 */}
          <div className="grid grid-cols-12 gap-6">
            {/* 원형 다이어그램 */}
            <div className="col-span-5 bg-white shadow-md border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                상품별 출고량 비중
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={skuData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      dataKey="total"
                      label={({ name, percentage }) =>
                        `${name}: ${percentage}%`
                      }
                    >
                      {skuData.map((entry, index) => {
                        const colors = [
                          "#3B82F6",
                          "#10B981",
                          "#F59E0B",
                          "#EF4444",
                          "#8B5CF6",
                        ];
                        return (
                          <Cell key={`cell-${index}`} fill={colors[index]} />
                        );
                      })}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}개`, "출고량"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 상품별 상세 리스트 */}
            <div className="col-span-7 bg-white shadow-md border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                📋 상품별 출고 리스트
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {skuData.map((product, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-gray-800">
                        {product.name}
                      </h4>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                          판매속도: {product.velocity}/일
                        </span>
                        <span className="text-lg font-bold text-gray-800">
                          {product.total}개
                        </span>
                      </div>
                    </div>

                    {/* 옵션별 세부사항 */}
                    <div className="grid grid-cols-2 gap-2">
                      {product.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="flex items-center justify-between p-2 rounded bg-white border border-gray-200"
                        >
                          <span className="text-sm text-gray-700">
                            {option.option}
                          </span>
                          <span className="text-sm font-semibold text-gray-800">
                            {option.quantity}개
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* 진행률 바 */}
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-600">전체 비중</span>
                        <span className="text-xs font-semibold text-blue-600">
                          {product.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${product.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPackagingOptimizationPage = () => {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="mb-6">
            <button
              onClick={() => setCurrentPage("overview")}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">이커머스 관리</span>
            </button>
          </div>

          {/* 상단 통계 카드 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-sm text-gray-600 mb-2">📦 주문 이 건수</div>
              <div className="text-3xl font-bold text-gray-800">
                {packagingData.totalOrders}개
              </div>
            </div>
            <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-sm text-gray-600 mb-2">📋 상품 이합</div>
              <div className="text-3xl font-bold text-gray-800">
                {packagingData.totalProducts}개
              </div>
            </div>
          </div>

          {/* 포장해야 할 박스 사이즈 수량 */}
          <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              📦 포장해야 할 박스 사이즈 수량
            </h3>
            <div className="space-y-4">
              {packagingData.boxRequirements.map((box, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-32 text-sm text-gray-700 font-medium">
                    {box.name}
                  </div>
                  <div className="flex-1 relative">
                    <div className="w-full bg-gray-200 rounded-full h-6">
                      <div
                        className="h-6 rounded-full flex items-center justify-end pr-2 text-white text-xs font-semibold"
                        style={{
                          width: `${(box.quantity / Math.max(...packagingData.boxRequirements.map((b) => b.quantity))) * 100}%`,
                          backgroundColor: box.color,
                        }}
                      >
                        {box.quantity}건
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 페이지 라우팅
  if (currentPage === "order-detail") {
    return renderOrderDetailPage();
  } else if (currentPage === "sku-analysis") {
    return renderSkuAnalysisPage();
  } else if (currentPage === "packaging-optimization") {
    return renderPackagingOptimizationPage();
  } else if (currentPage === "return-claims") {
    return renderReturnClaimsPage();
  } else if (currentPage === "exchange-claims") {
    return renderExchangeClaimsPage();
  }

  return renderEcommerceOverview();
};

export default EcommerceOrdersPage;
