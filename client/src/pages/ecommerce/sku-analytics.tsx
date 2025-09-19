// src/pages/ecommerce/sku-analytics.tsx

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// 페이지에 필요한 샘플 데이터
const skuData = [
    {
        name: "식혜",
        total: 204,
        percentage: 28.5,
        velocity: 18.2,
        options: [
            { option: "1.5L", quantity: 85, color: "#8B4513" },
            { option: "1L", quantity: 67, color: "#CD853F" },
            { option: "240ml", quantity: 52, color: "#DEB887" },
        ],
    },
    {
        name: "단호박식혜",
        total: 112,
        percentage: 15.6,
        velocity: 9.3,
        options: [
            { option: "1.5L", quantity: 45, color: "#FF8C00" },
            { option: "1L", quantity: 38, color: "#FFA500" },
            { option: "240ml", quantity: 29, color: "#FFB347" },
        ],
    },
    {
        name: "쌀요거트",
        total: 130,
        percentage: 18.1,
        velocity: 11.7,
        options: [
            { option: "1L", quantity: 72, color: "#E6E6FA" },
            { option: "240ml", quantity: 58, color: "#DDA0DD" },
        ],
    },
    {
        name: "수정과",
        total: 95,
        percentage: 13.3,
        velocity: 8.6,
        options: [{ option: "500ml", quantity: 95, color: "#DC143C" }],
    },
    {
        name: "쌀누룩",
        total: 175,
        percentage: 24.4,
        velocity: 15.8,
        options: [{ option: "500g", quantity: 175, color: "#F5DEB3" }],
    },
];
const totalSkuQuantity = skuData.reduce((sum, item) => sum + item.total, 0);
const totalSkuCount = 12;

export default function SkuAnalyticsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* 헤더 영역 */}
            <div className="bg-white border-b border-gray-200 px-4 py-3">
                <div className="flex items-center space-x-3">
                    <Link href="/ecommerce">
                        <a className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
                            <ChevronLeft className="w-5 h-5 mr-1" />
                            <span className="text-sm">이커머스 관리</span>
                        </a>
                    </Link>
                </div>
            </div>

            <div className="p-6">
                {/* 상단 통계 카드 */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-200">
                        <div className="text-sm text-gray-600 mb-2">
                            🏭 총 출고개수
                        </div>
                        <div className="text-3xl font-bold text-gray-900">
                            {totalSkuQuantity}개
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-200">
                        <div className="text-sm text-gray-600 mb-2">
                            📦 총 SKU 개수
                        </div>
                        <div className="text-3xl font-bold text-gray-900">
                            {totalSkuCount}개
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-200">
                        <div className="text-sm text-gray-600 mb-2">
                            ⚡ 평균 판매속도
                        </div>
                        <div className="text-3xl font-bold text-gray-900">
                            12.7/일
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6 mb-8">
                    {/* 원형 차트 */}
                    <div className="col-span-5">
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 h-full">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                상품별 출고량 비중
                            </h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={skuData}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius="75%"
                                            dataKey="total"
                                            label={({ name, percentage }) =>
                                                `${name}: ${percentage.toFixed(1)}%`
                                            }
                                            labelLine={false}
                                            fontSize={12}
                                        >
                                            {skuData.map((entry, index) => {
                                                const colors = [
                                                    "#3B82F6", // 파란색 - 식혜
                                                    "#F59E0B", // 주황색 - 단호박식혜
                                                    "#10B981", // 초록색 - 쌀요거트
                                                    "#EF4444", // 빨간색 - 수정과
                                                    "#8B5CF6", // 보라색 - 쌀누룩
                                                ];
                                                return (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={
                                                            colors[
                                                                index %
                                                                    colors.length
                                                            ]
                                                        }
                                                    />
                                                );
                                            })}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value) => [
                                                `${value}개`,
                                                "출고량",
                                            ]}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* 상품별 리스트 */}
                    <div className="col-span-7">
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 h-full">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                📋 상품별 출고 리스트
                            </h3>
                            <div className="space-y-4 max-h-80 overflow-y-auto">
                                {skuData.map((product, index) => (
                                    <div
                                        key={index}
                                        className="border border-gray-200 rounded-lg p-4"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-semibold text-gray-800">
                                                {product.name}
                                            </h4>
                                            <div className="flex items-center space-x-4">
                                                <span className="text-sm text-gray-500">
                                                    판매속도: {product.velocity}
                                                    /일
                                                </span>
                                                <span className="text-lg font-bold text-gray-900">
                                                    {product.total}개
                                                </span>
                                                <span className="text-sm text-blue-600 font-medium">
                                                    {product.percentage}%
                                                </span>
                                            </div>
                                        </div>

                                        {/* 진행률 바 */}
                                        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full"
                                                style={{
                                                    width: `${product.percentage}%`,
                                                }}
                                            ></div>
                                        </div>

                                        {/* 옵션별 세부사항 */}
                                        <div className="grid grid-cols-3 gap-2">
                                            {product.options.map(
                                                (option, optionIndex) => (
                                                    <div
                                                        key={optionIndex}
                                                        className="flex items-center justify-between p-2 rounded border-l-4"
                                                        style={{
                                                            backgroundColor:
                                                                option.color +
                                                                "20",
                                                            borderLeftColor:
                                                                option.color,
                                                        }}
                                                    >
                                                        <span className="text-sm text-gray-700">
                                                            {option.option}
                                                        </span>
                                                        <span className="text-sm font-semibold text-gray-900">
                                                            {option.quantity}개
                                                        </span>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 하단 인사이트 카드들 */}
                <div className="grid grid-cols-3 gap-6">
                    {/* 출고 우선순위 */}
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                            🚀 출고 우선순위
                        </h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">
                                    긴급
                                </span>
                                <span className="text-sm font-bold text-red-600">
                                    78개
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">
                                    보통
                                </span>
                                <span className="text-sm font-bold text-yellow-600">
                                    245개
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">
                                    여유
                                </span>
                                <span className="text-sm font-bold text-green-600">
                                    177개
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* SKU 인사이트 */}
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                            📊 SKU 인사이트
                        </h4>

                        {/* AI 인사이트 섹션 */}
                        <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-500">
                            <div className="text-xs font-semibold text-blue-800 mb-2">
                                🤖 AI 인사이트
                            </div>
                            <div className="space-y-2 text-xs text-gray-700">
                                <div className="flex items-start space-x-2">
                                    <span className="text-green-600 font-semibold">
                                        ↗
                                    </span>
                                    <span>
                                        '식혜 1.5L' 키워드 89개 주문 발생
                                    </span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <span className="text-orange-600 font-semibold">
                                        ⚡
                                    </span>
                                    <span>
                                        '쉬브 식혜' 연관검색 15개 틈새 주문
                                    </span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <span className="text-blue-600 font-semibold">
                                        📊
                                    </span>
                                    <span>
                                        '수정과 500ml' 신규 시장 진입 권고
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SKU 키워드 볼륨 */}
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                            🔍 SKU 키워드 볼륨
                        </h4>
                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">
                                    식혜
                                </span>
                                <span className="text-sm font-bold text-blue-600">
                                    24,300
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">
                                    단호박식혜
                                </span>
                                <span className="text-sm font-bold text-orange-600">
                                    8,750
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">
                                    쌀요거트
                                </span>
                                <span className="text-sm font-bold text-purple-600">
                                    15,200
                                </span>
                            </div>
                        </div>

                        <div className="p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                            <div className="text-xs text-blue-700">
                                트렌드 예측: 추석 명절 앞두고 검색량 300% 증가
                                예상
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
