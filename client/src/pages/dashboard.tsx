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
  <div className="bg-yellow-900/30 border-l-4 border-yellow-500 text-yellow-200 p-4 rounded-md mb-8">
    <div className="flex items-center mb-2">
      <AlertCircle className="h-5 w-5 mr-3" />
      <h3 className="font-bold">🔥 긴급 알림 (Urgent Alerts)</h3>
    </div>
    <ul className="list-disc list-inside text-sm space-y-1">
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">이커머스 개요</CardTitle>
        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="text-xs space-y-1">
        <p>주문: 47개 신규, 234개 배송중 | 94% 처리율</p>
        <p>포장: 87% 효율성, 234개 박스 필요</p>
        <p className="text-red-500 font-bold">발주: 8개 원자재 재주문 필요</p>
      </CardContent>
    </Card>

    {/* 광고 성과 */}
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">광고 성과</CardTitle>
        <Megaphone className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="text-xs space-y-1">
        <p>총 지출: 이번 달 ₩8.4M | 예산의 85%</p>
        <p>전체 ROAS: 340% | 구글 420%</p>
        <p className="text-red-500 font-bold">페이스북 ROAS 180% (목표 미달)</p>
      </CardContent>
    </Card>

    {/* 마케팅 인텔리전스 */}
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">마케팅 인텔리전스</CardTitle>
        <Target className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="text-xs space-y-1">
        <p>포지셔닝: 프리미엄 플레이어</p>
        <p>시장 점유율: 8.2% (+0.4%)</p>
        <p>경쟁사 활동: 3개 신제품 출시 감지</p>
      </CardContent>
    </Card>

    {/* 현금흐름 상태 */}
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">현금흐름 상태</CardTitle>
        <Banknote className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="text-xs space-y-1">
        <p>현재 잔액: ₩180M | 가용: ₩165M</p>
        <p>월 소진율: ₩45M | 4.0개월 런웨이</p>
        <p>예측: 다음 달 ₩45M 예상</p>
      </CardContent>
    </Card>

    {/* 고객 인텔리전스 */}
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">고객 인텔리전스</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="text-xs space-y-1">
        <p>신규 고객: 이번 달 1,247명 | 73% 재구매율</p>
        <p>서비스 성과: 4.2/5 만족도, 78% 해결률</p>
        <p>AOV ₩87.5k, CLV ₩340k</p>
      </CardContent>
    </Card>

    {/* 성장 전망 */}
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">성장 전망</CardTitle>
        <Sun className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="text-xs space-y-1">
        <p>날씨 영향: 내일 비 → -15% 주문 예측</p>
        <p>시장 이벤트: 이번 달 2개 박람회</p>
        <p className="text-yellow-400">오늘의 운세: 큰 기회가 기다립니다! 🌟</p>
      </CardContent>
    </Card>
  </div>
);

// 3. 경영진 액션 센터 (Action Center)
const ActionCenter = () => (
  <div className="mt-8">
    <h3 className="text-lg font-bold mb-4">
      ⚡ 경영진 액션 센터 (Decision Required)
    </h3>
    <div className="space-y-3">
      <div className="bg-red-900/30 p-3 rounded-md flex justify-between items-center">
        <p className="text-sm">🔴 높음: ₩15M 재고 + ₩7.8M 발주 주문 승인</p>
        <button className="bg-red-500 text-white text-xs px-3 py-1 rounded">
          검토
        </button>
      </div>
      <div className="bg-yellow-900/30 p-3 rounded-md flex justify-between items-center">
        <p className="text-sm">🟡 보통: 페이스북 캠페인 최적화 제안 검토</p>
        <button className="bg-yellow-500 text-black text-xs px-3 py-1 rounded">
          보기
        </button>
      </div>
      <div className="bg-yellow-900/30 p-3 rounded-md flex justify-between items-center">
        <p className="text-sm">🟡 보통: 연말 성수기 CS 인력 충원 대응</p>
        <button className="bg-yellow-500 text-black text-xs px-3 py-1 rounded">
          계획
        </button>
      </div>
      <div className="bg-gray-700 p-3 rounded-md">
        <p className="text-sm">📊 주간 목표: ₩12M 매출 목표 (₩8.4M 달성)</p>
        <div className="w-full bg-gray-600 rounded-full h-2.5 mt-2">
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
    <div className="space-y-8">
      {/* 긴급 알림 */}
      <EmergencyAlerts />

      {/* 허브 요약 */}
      <h3 className="text-lg font-bold">📊 허브 요약 (Hub Summary)</h3>
      <HubSummaryCards />

      {/* 통합 분석 차트 (지금은 간단한 Placeholder로 대체합니다) */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">
          📈 통합 분석 (Integrated Analysis)
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                매출 vs 마케팅 ROI
              </CardTitle>
            </CardHeader>
            <CardContent className="h-48 flex items-center justify-center text-sm text-gray-500">
              차트 준비 중
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                현금흐름 vs 발주 필요량
              </CardTitle>
            </CardHeader>
            <CardContent className="h-48 flex items-center justify-center text-sm text-gray-500">
              차트 준비 중
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
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
  );
}

export default Dashboard;
