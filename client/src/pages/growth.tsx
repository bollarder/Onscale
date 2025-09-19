// src/pages/growth.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
    TrendingUp,
    Globe,
    Rocket,
    CloudRain,
    Calendar,
    Newspaper,
    Star,
    ArrowRight,
} from "lucide-react";
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

export default function Growth() {
    // 샘플 성장 차트 데이터
    const growthData = {
        labels: [
            "Q1 2024",
            "Q2 2024",
            "Q3 2024",
            "Q4 2024",
            "Q1 2025",
            "Q2 2025",
        ],
        datasets: [
            {
                label: "매출 성장률 (%)",
                data: [15.2, 18.7, 22.1, 28.4, 32.6, 35.9],
                borderColor: "rgba(16, 185, 129, 1)",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                fill: true,
                tension: 0.4,
            },
            {
                label: "사용자 성장률 (%)",
                data: [12.8, 16.3, 19.9, 25.1, 29.7, 33.2],
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
        plugins: {
            legend: {
                position: "bottom" as const,
                labels: { color: "#6b7280" },
            },
        },
        scales: {
            x: { ticks: { color: "#6b7280" }, grid: { color: "#f3f4f6" } },
            y: { ticks: { color: "#6b7280" }, grid: { color: "#e5e7eb" } },
        },
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    성장 리포트
                </h1>

                {/* 성장 허브 카드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link href="/growth/forecast">
                        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-200 h-full group cursor-pointer">
                            <CardHeader className="pb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <CloudRain className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <CardTitle className="text-lg text-gray-800">
                                        날씨 및 예측
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <p>🌦️ 차주 날씨 영향</p>
                                    <p>📈 매출 예측 조정</p>
                                </div>
                                <div className="w-full flex justify-between items-center text-sm mt-4 text-blue-600 group-hover:text-blue-700 font-medium">
                                    <span>예측 보기</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/growth/events">
                        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-200 h-full group cursor-pointer">
                            <CardHeader className="pb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <Calendar className="w-5 h-5 text-green-500" />
                                    </div>
                                    <CardTitle className="text-lg text-gray-800">
                                        시장 이벤트
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <p>📅 박람회 일정</p>
                                    <p>🏪 팝업 이벤트</p>
                                </div>
                                <div className="w-full flex justify-between items-center text-sm mt-4 text-green-600 group-hover:text-green-700 font-medium">
                                    <span>이벤트 관리</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/growth/intelligence">
                        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-200 h-full group cursor-pointer">
                            <CardHeader className="pb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <Newspaper className="w-5 h-5 text-purple-500" />
                                    </div>
                                    <CardTitle className="text-lg text-gray-800">
                                        산업 인텔리전스
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <p>📰 업계 업데이트</p>
                                    <p>📊 시장 트렌드</p>
                                </div>
                                <div className="w-full flex justify-between items-center text-sm mt-4 text-purple-600 group-hover:text-purple-700 font-medium">
                                    <span>인텔리전스 보기</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/growth/motivation">
                        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-200 h-full group cursor-pointer">
                            <CardHeader className="pb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-amber-100 rounded-lg">
                                        <Star className="w-5 h-5 text-amber-500" />
                                    </div>
                                    <CardTitle className="text-lg text-gray-800">
                                        응원 격려
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <p>⭐ 오늘의 운세</p>
                                    <p>💪 팀 격려 메시지</p>
                                </div>
                                <div className="w-full flex justify-between items-center text-sm mt-4 text-amber-600 group-hover:text-amber-700 font-medium">
                                    <span>응원 보기</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* KPI 카드 */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <KPICard
                        title="월간 성장률"
                        value="12.3%"
                        change="+1.2% p"
                        icon={<TrendingUp className="w-5 h-5 text-green-500" />}
                    />
                    <KPICard
                        title="시장 점유율"
                        value="23.7%"
                        change="+0.6% p"
                        icon={<Globe className="w-5 h-5 text-blue-500" />}
                    />
                    <KPICard
                        title="매출 성장률"
                        value="28.4%"
                        change="+3.1% p"
                        icon={<Rocket className="w-5 h-5 text-purple-500" />}
                    />
                </div>

                {/* 성장 차트 */}
                <Card className="bg-white shadow-sm border border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-800">
                            성장 지표 개요
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-96">
                        <Line data={growthData} options={chartOptions} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
