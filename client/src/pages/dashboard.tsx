// src/pages/dashboard.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertCircle,
  Banknote,
  ShoppingCart,
  Megaphone,
  Target,
  Users,
  Sun,
} from "lucide-react";

// 1. 긴급 알림 구역 (Emergency Alerts)
const EmergencyAlerts = () => (
  <div className="bg-white border-l-4 border-blue-400 p-6 rounded-lg mb-8 shadow-md">
    <div className="flex items-center mb-3">
      <AlertCircle className="h-5 w-5 mr-3 text-yellow-600" />
      <h3 className="font-bold text-gray-800">🔥 긴급 알림 (Urgent Alerts)</h3>
    </div>
    <ul className="list-disc list-inside text-sm space-y-2 text-gray-700">
      <li>이커머스: 8개 원자재가 발주 임계치 이하</li>
      <li>광고: 페이스북 ROAS 180%로 하락 (목표: 300%+)</li>
      <li>현금흐름: 경고 - 운영비 18일분만 남음</li>
      <li>고객 인텔리전스: CS 응답시간: 28시간 (SLA: 24시간)</li>
    </ul>
  </div>
);

// 2. 허브 요약 카드 (Hub Summary)
const HubSummaryCards = () => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {/* 이커머스 개요 */}
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-semibold text-gray-800">
          이커머스 개요
        </CardTitle>
        <div className="p-2 border border-blue-200 rounded-lg">
          <ShoppingCart className="h-4 w-4 text-blue-600" />
        </div>
      </CardHeader>
      <CardContent className="text-xs space-y-2 p-4">
        <p className="text-gray-700">
          주문: 47개 신규, 234개 배송중 | 94% 처리율
        </p>
        <p className="text-gray-700">포장: 87% 효율성, 234개 박스 필요</p>
        <p className="text-red-600 font-semibold border border-red-200 p-2 rounded">
          발주: 8개 원자재 재주문 필요
        </p>
      </CardContent>
    </Card>

    {/* 광고 성과 */}
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-semibold text-gray-800">
          광고 성과
        </CardTitle>
        <div className="p-2 border border-green-200 rounded-lg">
          <Megaphone className="h-4 w-4 text-green-600" />
        </div>
      </CardHeader>
      <CardContent className="text-xs space-y-2 p-4">
        <p className="text-gray-700">총 지출: 이번 달 ₩8.4M | 예산의 85%</p>
        <p className="text-gray-700">전체 ROAS: 340% | 구글 420%</p>
        <p className="text-red-600 font-semibold border border-red-200 p-2 rounded">
          페이스북 ROAS 180% (목표 미달)
        </p>
      </CardContent>
    </Card>

    {/* 마케팅 인텔리전스 */}
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-semibold text-gray-800">
          마케팅 인텔리전스
        </CardTitle>
        <div className="p-2 border border-purple-200 rounded-lg">
          <Target className="h-4 w-4 text-purple-600" />
        </div>
      </CardHeader>
      <CardContent className="text-xs space-y-2 p-4">
        <p className="text-gray-700">포지셔닝: 프리미엄 플레이어</p>
        <p className="text-gray-700">시장 점유율: 8.2% (+0.4%)</p>
        <p className="text-gray-700">경쟁사 활동: 3개 신제품 출시 감지</p>
      </CardContent>
    </Card>

    {/* 현금흐름 상태 */}
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-semibold text-gray-800">
          현금흐름 상태
        </CardTitle>
        <div className="p-2 border border-emerald-200 rounded-lg">
          <Banknote className="h-4 w-4 text-emerald-600" />
        </div>
      </CardHeader>
      <CardContent className="text-xs space-y-2 p-4">
        <p className="text-gray-700">현재 잔액: ₩180M | 가용: ₩165M</p>
        <p className="text-gray-700">월 소진율: ₩45M | 4.0개월 런웨이</p>
        <p className="text-gray-700">예측: 다음 달 ₩45M 예상</p>
      </CardContent>
    </Card>

    {/* 고객 인텔리전스 */}
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-semibold text-gray-800">
          고객 인텔리전스
        </CardTitle>
        <div className="p-2 border border-indigo-200 rounded-lg">
          <Users className="h-4 w-4 text-indigo-600" />
        </div>
      </CardHeader>
      <CardContent className="text-xs space-y-2 p-4">
        <p className="text-gray-700">
          신규 고객: 이번 달 1,247명 | 73% 재구매율
        </p>
        <p className="text-gray-700">서비스 성과: 4.2/5 만족도, 78% 해결률</p>
        <p className="text-gray-700">AOV ₩87.5k, CLV ₩340k</p>
      </CardContent>
    </Card>

    {/* 성장 전망 */}
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-semibold text-gray-800">
          성장 전망
        </CardTitle>
        <div className="p-2 border border-orange-200 rounded-lg">
          <Sun className="h-4 w-4 text-orange-600" />
        </div>
      </CardHeader>
      <CardContent className="text-xs space-y-2 p-4">
        <p className="text-gray-700">날씨 영향: 내일 비 → -15% 주문 예측</p>
        <p className="text-gray-700">시장 이벤트: 이번 달 2개 박람회</p>
        <p className="text-amber-600 font-medium border border-amber-200 p-2 rounded">
          오늘의 운세: 큰 기회가 기다립니다! 🌟
        </p>
      </CardContent>
    </Card>
  </div>
);

// 3. 경영진 액션 센터 (Action Center)
const ActionCenter = () => (
  <div className="mt-8">
    <h3 className="text-lg font-bold mb-6 text-gray-800">
      ⚡ 경영진 액션 센터 (Decision Required)
    </h3>
    <div className="space-y-4">
      <div className="bg-white border border-red-200 p-4 rounded-lg flex justify-between items-center shadow-sm">
        <p className="text-sm text-red-700 font-medium">
          🔴 높음: ₩15M 재고 + ₩7.8M 발주 주문 승인
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-2 rounded-md font-medium transition-colors">
          검토
        </button>
      </div>
      <div className="bg-white border border-yellow-200 p-4 rounded-lg flex justify-between items-center shadow-sm">
        <p className="text-sm text-yellow-700 font-medium">
          🟡 보통: 페이스북 캠페인 최적화 제안 검토
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-4 py-2 rounded-md font-medium transition-colors">
          보기
        </button>
      </div>
      <div className="bg-white border border-yellow-200 p-4 rounded-lg flex justify-between items-center shadow-sm">
        <p className="text-sm text-yellow-700 font-medium">
          🟡 보통: 연말 성수기 CS 인력 충원 대응
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-4 py-2 rounded-md font-medium transition-colors">
          계획
        </button>
      </div>
      <div className="bg-white border border-blue-200 p-4 rounded-lg shadow-sm">
        <p className="text-sm text-blue-700 font-medium mb-3">
          📊 주간 목표: ₩12M 매출 목표 (₩8.4M 달성)
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div
            className="bg-blue-500 h-2.5 rounded-full"
            style={{ width: "70%" }}
          ></div>
        </div>
      </div>
    </div>
  </div>
);

// 최종 대시보드 화면 조립
function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 긴급 알림 */}
        <EmergencyAlerts />

        {/* 허브 요약 */}
        <div>
          <h3 className="text-lg font-bold mb-6 text-gray-800">
            📊 허브 요약 (Hub Summary)
          </h3>
          <HubSummaryCards />
        </div>

        {/* 통합 분석 차트 */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-6 text-gray-800">
            📈 통합 분석 (Integrated Analysis)
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-gray-800">
                  매출 vs 마케팅 ROI
                </CardTitle>
              </CardHeader>
              <CardContent className="h-48 flex items-center justify-center text-sm text-gray-500">
                차트 준비 중
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-gray-800">
                  현금흐름 vs 발주 필요량
                </CardTitle>
              </CardHeader>
              <CardContent className="h-48 flex items-center justify-center text-sm text-gray-500">
                차트 준비 중
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-gray-800">
                  고객 만족도 vs 성장
                </CardTitle>
              </CardHeader>
              <CardContent className="h-48 flex items-center justify-center text-sm text-gray-500">
                차트 준비 중
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 액션 센터 */}
        <ActionCenter />
      </div>
    </div>
  );
}

export default Dashboard;
