// src/pages/advertising-hub.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, BarChart3, Search, TrendingUp, LineChart } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Chart.js에 필요한 부품들을 등록합니다.
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

// 1. 상단 4개 요약 카드
const AdSummaryCards = () => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
    {/* 캠페인 카드 */}
    <Card className="cursor-pointer hover:border-primary">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">캠페인</CardTitle>
        <Target className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">23개 활성</div>
        <p className="text-xs text-muted-foreground">
          18개 목표 이상, ₩8.4M 지출
        </p>
        <p className="text-xs text-primary mt-2">캠페인 관리 →</p>
      </CardContent>
    </Card>

    {/* 채널 카드 */}
    <Card className="cursor-pointer hover:border-primary">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">채널</CardTitle>
        <BarChart3 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">전체 ROAS 340%</div>
        <p className="text-xs text-muted-foreground">
          구글 420%, 페이스북 180%, 네이버 280%
        </p>
        <p className="text-xs text-primary mt-2">채널 분석 →</p>
      </CardContent>
    </Card>

    {/* 키워드 카드 */}
    <Card className="cursor-pointer hover:border-primary">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">키워드</CardTitle>
        <Search className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">2,847개 활성</div>
        <p className="text-xs text-muted-foreground">156개 상위 성과</p>
        <p className="text-xs text-primary mt-2">키워드 최적화 →</p>
      </CardContent>
    </Card>

    {/* 리포트 카드 */}
    <Card className="cursor-pointer hover:border-primary">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">리포트</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+23% 주간 ROI</div>
        <p className="text-xs text-muted-foreground">커스텀 리포트</p>
        <p className="text-xs text-primary mt-2">리포트 보기 →</p>
      </CardContent>
    </Card>
  </div>
);

// 2. 차트 및 상세 정보 구역
const AdOverview = () => {
  const roasTrendData = {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
    datasets: [
      {
        label: "ROAS",
        data: [3.2, 3.8, 4.2, 3.8, 4.1, 4.8],
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#888" } },
      y: {
        beginAtZero: true,
        ticks: { color: "#888" },
        grid: { color: "#444" },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      {/* ROAS 트렌드 차트 */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>ROAS 추세</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <Line data={roasTrendData} options={chartOptions} />
        </CardContent>
      </Card>

      {/* 월 예산 */}
      <Card>
        <CardHeader>
          <CardTitle>월 예산</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">₩8.4M</div>
          <p className="text-xs text-muted-foreground mb-4">₩10M 중 사용</p>
          <div className="w-full bg-gray-600 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: "84%" }}
            ></div>
          </div>
          <p className="text-right text-sm mt-2">84%</p>
        </CardContent>
      </Card>

      {/* 상위 캠페인 */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>상위 캠페인</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <div>
                <p className="font-medium">프리미엄 전통주 컬렉션</p>
                <p className="text-xs text-muted-foreground">₩1.8M 지출</p>
              </div>
              <p className="font-bold text-green-500">580% ROAS</p>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div>
                <p className="font-medium">여름맞이 과실주 세일</p>
                <p className="text-xs text-muted-foreground">₩1.2M 지출</p>
              </div>
              <p className="font-bold text-green-500">420% ROAS</p>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div>
                <p className="font-medium">명절 선물세트 프로모션</p>
                <p className="text-xs text-muted-foreground">₩2.2M 지출</p>
              </div>
              <p className="font-bold text-green-500">360% ROAS</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// 최종 광고 허브 화면 조립
function AdvertisingHub() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">광고 퍼포먼스</h1>
        <p className="text-sm text-muted-foreground">전체 채널 및 ROI 요약</p>
      </div>

      {/* 상단 4개 카드 */}
      <AdSummaryCards />

      {/* 개요: ROAS 추세, 예산, 상위 캠페인 */}
      <AdOverview />
    </div>
  );
}

export default AdvertisingHub;
