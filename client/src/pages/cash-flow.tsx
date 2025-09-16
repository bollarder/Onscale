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
        fill: false,
        tension: 0.3,
      },
      {
        label: "지출",
        data: [3800, 4100, 3900, 4300, 4200, 4400],
        borderColor: "rgba(239, 68, 68, 1)",
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
      description: "트레핏 슬롯",
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
  }: {
    title: string;
    value: string;
    change: string;
    icon: React.ReactNode;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8 p-4 md:p-8">
      <h1 className="text-3xl font-bold">현금흐름 관리</h1>

      {/* 긴급 재무 알림 */}
      <div className="space-y-2">
        {criticalAlerts
          .filter((alert) => alert.visible)
          .map((alert, index) => (
            <Alert
              key={index}
              variant={alert.severity === "high" ? "destructive" : "default"}
            >
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="font-medium">
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
        />
        <KPICard
          title="가용 현금"
          value="₩165M"
          change="+3.8%"
          icon={<TrendingUp className="w-5 h-5 text-green-500" />}
        />
        <KPICard
          title="런웨이"
          value="4.0 개월"
          change="-0.2 개월"
          icon={<Clock className="w-5 h-5 text-amber-500" />}
        />
      </div>

      {/* 메인 차트와 사이드 차트 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 6개월 현금흐름 예측 */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>6개월 현금흐름 예측</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <Line
                data={forecastData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      ticks: {
                        callback: (value) => `₩${Number(value) / 1000}K`,
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
        {/* 수입원 */}
        <Card>
          <CardHeader>
            <CardTitle>수입원</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <Doughnut
                data={incomeSourcesData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 비용 카테고리 및 알림 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 비용 카테고리 */}
        <Card>
          <CardHeader>
            <CardTitle>비용 카테고리</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <Doughnut
                data={expenseCategoriesData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </CardContent>
        </Card>
        {/* 알림 */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>알림</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start space-x-3 p-3 bg-background rounded-lg border"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">
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
                        <span className="text-xs text-muted-foreground">
                          {alert.timestamp}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
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
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>설비 투자 내역</CardTitle>
            <div className="flex items-center space-x-2">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-32">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">이번 주</SelectItem>
                  <SelectItem value="month">이번 달</SelectItem>
                  <SelectItem value="quarter">이번 분기</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={transactionFilter}
                onValueChange={setTransactionFilter}
              >
                <SelectTrigger className="w-32">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
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
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-muted-foreground">
                    날짜
                  </th>
                  <th className="text-left p-3 font-medium text-muted-foreground">
                    종류
                  </th>
                  <th className="text-left p-3 font-medium text-muted-foreground">
                    내용
                  </th>
                  <th className="text-left p-3 font-medium text-muted-foreground">
                    카테고리
                  </th>
                  <th className="text-right p-3 font-medium text-muted-foreground">
                    금액
                  </th>
                  <th className="text-center p-3 font-medium text-muted-foreground">
                    상태
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b hover:bg-muted/50"
                  >
                    <td className="p-3 text-sm">{transaction.date}</td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        {transaction.type === "income" ? (
                          <ArrowUpRight className="w-4 h-4 text-green-500" />
                        ) : (
                          <ArrowDownLeft className="w-4 h-4 text-red-500" />
                        )}
                        <span
                          className={`text-sm capitalize ${
                            transaction.type === "income"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {transaction.type === "income" ? "수입" : "지출"}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-sm">{transaction.description}</td>
                    <td className="p-3 text-sm text-muted-foreground">
                      {transaction.category}
                    </td>
                    <td
                      className={`p-3 text-sm text-right font-medium ${
                        transaction.amount > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {formatCurrency(Math.abs(transaction.amount))}
                    </td>
                    <td className="p-3 text-center">
                      <Badge
                        variant={
                          transaction.status === "completed"
                            ? "secondary"
                            : "outline"
                        }
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
  );
}
