// src/pages/cash-flow.tsx

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Wallet,
  TrendingUp,
  AlertTriangle,
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  DollarSign,
  Target,
  Settings,
  Download,
  Zap,
} from "lucide-react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
);

export default function CashFlow() {
  const [transactionFilter, setTransactionFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("week");

  // 샘플 데이터 (한글화)
  const criticalAlerts = [
    {
      type: "runway",
      severity: "medium",
      message: "현금 활주로가 4.2개월로 감소 - 비용 최적화를 고려하세요",
      visible: true,
    },
    {
      type: "spending",
      severity: "high",
      message: "마케팅 비용이 3개월 평균 대비 34% 증가했습니다",
      visible: true,
    },
  ];

  const forecastData = {
    labels: ["1개월", "2개월", "3개월", "4개월", "5개월", "6개월"],
    datasets: [
      {
        label: "수입",
        data: [4500, 4800, 4600, 5200, 4900, 5100],
        borderColor: "rgba(16, 185, 129, 1)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: false,
        tension: 0.3,
      },
      {
        label: "지출",
        data: [3800, 4100, 3900, 4300, 4200, 4400],
        borderColor: "rgba(239, 68, 68, 1)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const incomeSourcesData = {
    labels: ["제품 판매", "구독", "파트너십", "투자", "기타"],
    datasets: [
      {
        data: [65, 20, 8, 5, 2],
        backgroundColor: [
          "#10b981",
          "#3b82f6",
          "#f59e0b",
          "#8b5cf6",
          "#9ca3af",
        ],
      },
    ],
  };

  const expenseCategoriesData = {
    labels: ["운영", "마케팅", "인건비", "기술", "법률", "기타"],
    datasets: [
      {
        data: [35, 25, 20, 12, 5, 3],
        backgroundColor: [
          "#ef4444",
          "#f59e0b",
          "#3b82f6",
          "#8b5cf6",
          "#ec4899",
          "#9ca3af",
        ],
      },
    ],
  };

  const transactions = [
    {
      id: 1,
      date: "2025-09-14",
      type: "expense",
      amount: -2500000,
      description: "원료 충진기",
      category: "포장 라인",
      status: "완료",
    },
    {
      id: 2,
      date: "2025-09-13",
      type: "expense",
      amount: -850000,
      description: "트레할 슬롯",
      category: "마케팅",
      status: "완료",
    },
    {
      id: 3,
      date: "2025-09-13",
      type: "expense",
      amount: -1200000,
      description: "원심 펌프",
      category: "포장 라인",
      status: "완료",
    },
    {
      id: 4,
      date: "2025-09-12",
      type: "expense",
      amount: -3200000,
      description: "3톤 교반 스테인리스 솥",
      category: "제조 설비",
      status: "완료",
    },
  ];

  const alerts = [
    {
      id: 1,
      type: "warning",
      title: "현금 부족 알림",
      message: "가용 현금이 6개월 임계치 이하입니다",
      severity: "보통",
      timestamp: "2 시간 전",
    },
    {
      id: 2,
      type: "info",
      title: "비정상 지출 패턴",
      message: "마케팅 비용이 지난달 대비 40% 높습니다",
      severity: "낮음",
      timestamp: "1 일 전",
    },
    {
      id: 3,
      type: "success",
      title: "매출 목표 달성",
      message: "월 매출 목표를 5일 일찍 달성했습니다",
      severity: "낮음",
      timestamp: "3 일 전",
    },
  ];

  const formatCurrency = (amount: number) =>
    `₩${new Intl.NumberFormat().format(amount)}`;

  const getAlertIcon = (type: string) =>
    ({
      warning: <AlertTriangle className="w-4 h-4 text-amber-500" />,
      info: <TrendingUp className="w-4 h-4 text-blue-500" />,
      success: <ArrowUpRight className="w-4 h-4 text-green-500" />,
    })[type] || <AlertTriangle className="w-4 h-4 text-gray-500" />;

  // KPICard를 임시 Card로 대체합니다.
  const KPICard = ({
    title,
    value,
    change,
    icon,
    hoverColor,
    iconBorderColor,
  }: {
    title: string;
    value: string;
    change: string;
    icon: React.ReactNode;
    hoverColor: string;
    iconBorderColor: string;
  }) => (
    <Card
      className={`bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 cursor-pointer ${hoverColor}`}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-semibold text-gray-800">
          {title}
        </CardTitle>
        <div className={`p-2 border ${iconBorderColor} rounded-lg`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-800">{value}</div>
        <p className="text-xs text-gray-600">{change}</p>
      </CardContent>
    </Card>
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#6b7280",
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#374151",
        bodyColor: "#374151",
        borderColor: "#e5e7eb",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: "#6b7280" },
        grid: { color: "#f3f4f6" },
      },
      y: {
        ticks: {
          color: "#6b7280",
          callback: (value: any) => `₩${Number(value) / 1000}K`,
        },
        grid: { color: "#f3f4f6" },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#6b7280",
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#374151",
        bodyColor: "#374151",
        borderColor: "#e5e7eb",
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">현금흐름 관리</h1>

        {/* 긴급 재무 알림 */}
        <div className="space-y-3">
          {criticalAlerts
            .filter((alert) => alert.visible)
            .map((alert, index) => (
              <Alert
                key={index}
                variant={alert.severity === "high" ? "destructive" : "default"}
                className="bg-white border border-yellow-200"
              >
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="font-medium text-gray-700">
                  {alert.message}
                </AlertDescription>
              </Alert>
            ))}
        </div>

        {/* 상단 KPI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard
            title="현재 보유 현금"
            value="₩180M"
            change="+5.2%"
            icon={<Wallet className="w-5 h-5 text-blue-500" />}
            hoverColor="hover:border-blue-300"
            iconBorderColor="border-blue-200"
          />
          <KPICard
            title="가용 현금"
            value="₩165M"
            change="+3.8%"
            icon={<TrendingUp className="w-5 h-5 text-green-500" />}
            hoverColor="hover:border-green-300"
            iconBorderColor="border-green-200"
          />
          <KPICard
            title="런웨이"
            value="4.0 개월"
            change="-0.2 개월"
            icon={<Clock className="w-5 h-5 text-amber-500" />}
            hoverColor="hover:border-amber-300"
            iconBorderColor="border-amber-200"
          />
        </div>

        {/* 메인 차트와 사이드 차트 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 6개월 현금흐름 예측 */}
          <Card className="lg:col-span-2 bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-800 font-semibold">
                6개월 현금흐름 예측
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <Line data={forecastData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>

          {/* 수입원 */}
          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-800 font-semibold">
                수입원
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <Doughnut data={incomeSourcesData} options={doughnutOptions} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 비용 카테고리 및 알림 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 비용 카테고리 */}
          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-800 font-semibold">
                비용 카테고리
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <Doughnut
                  data={expenseCategoriesData}
                  options={doughnutOptions}
                />
              </div>
            </CardContent>
          </Card>

          {/* 알림 */}
          <Card className="lg:col-span-2 bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-800 font-semibold">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span>알림</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-800">
                          {alert.title}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              alert.severity === "medium"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {alert.severity}
                          </Badge>
                          <span className="text-xs text-gray-600">
                            {alert.timestamp}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 거래 내역 테이블 */}
        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-800 font-semibold">
                설비 투자 내역
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-32 bg-white border-gray-200">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200">
                    <SelectItem value="week">이번 주</SelectItem>
                    <SelectItem value="month">이번 달</SelectItem>
                    <SelectItem value="quarter">이번 분기</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={transactionFilter}
                  onValueChange={setTransactionFilter}
                >
                  <SelectTrigger className="w-32 bg-white border-gray-200">
                    <Filter className="w-4 h-4 mr-2 text-gray-500" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200">
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="income">수입</SelectItem>
                    <SelectItem value="expense">지출</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 font-medium text-gray-600">
                      날짜
                    </th>
                    <th className="text-left p-3 font-medium text-gray-600">
                      종류
                    </th>
                    <th className="text-left p-3 font-medium text-gray-600">
                      내용
                    </th>
                    <th className="text-left p-3 font-medium text-gray-600">
                      카테고리
                    </th>
                    <th className="text-right p-3 font-medium text-gray-600">
                      금액
                    </th>
                    <th className="text-center p-3 font-medium text-gray-600">
                      상태
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-3 text-sm text-gray-700">
                        {transaction.date}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          {transaction.type === "income" ? (
                            <ArrowUpRight className="w-4 h-4 text-green-500" />
                          ) : (
                            <ArrowDownLeft className="w-4 h-4 text-red-500" />
                          )}
                          <span
                            className={`text-sm ${
                              transaction.type === "income"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.type === "income" ? "수입" : "지출"}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-sm text-gray-700">
                        {transaction.description}
                      </td>
                      <td className="p-3 text-sm text-gray-600">
                        {transaction.category}
                      </td>
                      <td
                        className={`p-3 text-sm text-right font-medium ${
                          transaction.amount > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {formatCurrency(Math.abs(transaction.amount))}
                      </td>
                      <td className="p-3 text-center">
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-700"
                        >
                          {transaction.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
