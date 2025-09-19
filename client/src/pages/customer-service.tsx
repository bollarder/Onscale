// src/pages/customer-service.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Smile,
  Clock,
  Ticket,
  CheckCircle,
  Phone,
  Users,
  RotateCcw,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js에 필요한 부품들을 등록합니다.
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

// KPICard를 임시 Card로 대체합니다.
const KPICard = ({
  title,
  value,
  change,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}) => (
  <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-200">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-gray-600">
        {title}
      </CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <p className="text-xs text-gray-500">{change}</p>
    </CardContent>
  </Card>
);

export default function CustomerService() {
  // 샘플 고객 서비스 차트 데이터
  const ticketVolumeData = {
    labels: ["월", "화", "수", "목", "금", "토", "일"],
    datasets: [
      {
        label: "생성된 티켓",
        data: [65, 85, 92, 78, 95, 45, 32],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
      {
        label: "해결된 티켓",
        data: [58, 78, 88, 82, 89, 48, 35],
        backgroundColor: "rgba(16, 185, 129, 0.8)",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 1,
      },
    ],
  };
  const issueCategoriesData = {
    labels: ["기술", "결제", "계정", "제품", "일반"],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          "#ef4444",
          "#f59e0b",
          "#3b82f6",
          "#10b981",
          "#8b5cf6",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" as const, labels: { color: "#6b7280" } },
    },
    scales: {
      x: { ticks: { color: "#6b7280" }, grid: { color: "#f3f4f6" } },
      y: { ticks: { color: "#6b7280" }, grid: { color: "#e5e7eb" } },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">고객 인텔리전스</h1>

        {/* 고객 인텔리전스 허브 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/customer-service/performance">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-200 h-full group cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Phone className="w-5 h-5 text-blue-500" />
                  </div>
                  <CardTitle className="text-lg text-gray-800">
                    서비스 성과
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📞 4.2/5 만족도</p>
                  <p>⏱️ 4.2시간 평균 응답</p>
                  <p>✅ 78% 해결률</p>
                </div>
                <div className="w-full flex justify-between items-center text-sm mt-4 text-blue-600 group-hover:text-blue-700 font-medium">
                  <span>성과 보기</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/customer-service/behavior">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-200 h-full group cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="w-5 h-5 text-green-500" />
                  </div>
                  <CardTitle className="text-lg text-gray-800">
                    고객 행동
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>👥 인구통계별 분석</p>
                  <p>⏰ 시간별 문의 패턴</p>
                </div>
                <div className="w-full flex justify-between items-center text-sm mt-4 text-green-600 group-hover:text-green-700 font-medium">
                  <span>행동 분석</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/customer-service/lifecycle">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-200 h-full group cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <RotateCcw className="w-5 h-5 text-purple-500" />
                  </div>
                  <CardTitle className="text-lg text-gray-800">
                    고객 생애주기
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>🔄 신규 고객 분석</p>
                  <p>🔁 재구매자 패턴</p>
                </div>
                <div className="w-full flex justify-between items-center text-sm mt-4 text-purple-600 group-hover:text-purple-700 font-medium">
                  <span>생애주기 추적</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/customer-service/impact">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-200 h-full group cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-amber-500" />
                  </div>
                  <CardTitle className="text-lg text-gray-800">
                    비즈니스 임팩트
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>💰 평균 객단가 분석</p>
                  <p>📊 고객 생애가치</p>
                </div>
                <div className="w-full flex justify-between items-center text-sm mt-4 text-amber-600 group-hover:text-amber-700 font-medium">
                  <span>임팩트 보기</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* KPI 카드 */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <KPICard
            title="고객 만족도 (CSAT)"
            value="4.8/5"
            change="+0.1"
            icon={<Smile className="w-5 h-5 text-green-500" />}
          />
          <KPICard
            title="평균 응답 시간"
            value="2.3시간"
            change="-0.2h"
            icon={<Clock className="w-5 h-5 text-blue-500" />}
          />
          <KPICard
            title="미해결 티켓"
            value="127개"
            change="+5"
            icon={<Ticket className="w-5 h-5 text-amber-500" />}
          />
          <KPICard
            title="해결률"
            value="94.2%"
            change="+1.2%"
            icon={<CheckCircle className="w-5 h-5 text-purple-500" />}
          />
        </div>

        {/* 차트 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">
                주간 티켓 발생량
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <Bar data={ticketVolumeData} options={chartOptions} />
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">
                문의 유형
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <Pie
                data={issueCategoriesData}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    legend: { display: true },
                  },
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
