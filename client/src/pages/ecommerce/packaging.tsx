// src/pages/ecommerce/packaging-optimization.tsx

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";

// 페이지에 필요한 샘플 데이터
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

const boxConfigurations = [
    {
        boxType: "1호 (세화 1호)",
        maxCapacity: "소형",
        recommendedCombos: [
            "1L 2병 + 아이스팩 2개 + 보냉파우치 1개",
            "500ml 3병 + 아이스팩 1개",
            "240ml 10병 + 아이스팩 2개",
        ],
    },
    {
        boxType: "2호 (세화 2호)",
        maxCapacity: "소형+",
        recommendedCombos: [
            "1.5L 1병 + 1L 1병 + 아이스팩 2개",
            "500ml 4병 + 240ml 5병 + 보냉파우치 1개",
            "1L 3병 + 아이스팩 3개",
        ],
    },
    {
        boxType: "3호 (AP5)",
        maxCapacity: "중형",
        recommendedCombos: [
            "1.5L 2병 + 500ml 2병 + 아이스팩 4개",
            "1L 4병 + 240ml 8병 + 보냉파우치 2개",
        ],
    },
    {
        boxType: "4호 (AP13)",
        maxCapacity: "중형+",
        recommendedCombos: [
            "1.5L 3병 + 1L 2병 + 아이스팩 5개",
            "1L 6병 + 500ml 2병 + 보냉파우치 2개",
        ],
    },
    {
        boxType: "5호 (AP37)",
        maxCapacity: "대형",
        recommendedCombos: [
            "1.5L 4병 + 1L 3병 + 아이스팩 6개",
            "1L 8병 + 500ml 4병 + 보냉파우치 3개",
        ],
    },
    {
        boxType: "6호 (세화 5-2호)",
        maxCapacity: "대형+",
        recommendedCombos: [
            "1.5L 5병 + 1L 4병 + 아이스팩 8개",
            "1L 10병 + 500ml 6병 + 보냉파우치 4개",
        ],
    },
    {
        boxType: "7호 (AP20)",
        maxCapacity: "특대형",
        recommendedCombos: [
            "1.5L 6병 + 1L 6병 + 아이스팩 10개",
            "1L 12병 + 500ml 8병 + 보냉파우치 5개",
        ],
    },
    {
        boxType: "8호 (세화7호)",
        maxCapacity: "초대형",
        recommendedCombos: [
            "1.5L 8병 + 1L 8병 + 아이스팩 12개",
            "전 용량 대량 혼합 + 보냉파우치 6개",
        ],
    },
];

export default function PackagingOptimizationPage() {
    return (
        <div className="p-4 md:p-8">
            {/* 페이지 헤더 */}
            <div className="mb-6">
                <Link href="/ecommerce">
                    <a className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                        <span className="text-sm font-medium">
                            이커머스 관리
                        </span>
                    </a>
                </Link>
                <h1 className="text-3xl font-bold mt-2">포장 최적화</h1>
            </div>

            {/* 상단 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>주문 총 건수</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">
                            {packagingData.totalOrders}개
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>상품 총합</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">
                            {packagingData.totalProducts}개
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* 포장해야 할 박스 사이즈 수량 */}
                <div className="col-span-12 lg:col-span-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                📦 포장해야 할 박스 사이즈 수량
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {packagingData.boxRequirements.map((box, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-4"
                                >
                                    <div className="w-32 text-sm text-gray-700 font-medium">
                                        {box.name}
                                    </div>
                                    <div className="flex-1">
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
                        </CardContent>
                    </Card>
                </div>

                {/* AI 포장 추천 */}
                <div className="col-span-12 lg:col-span-4">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>💡 AI 포장 추천</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="font-medium text-blue-800">
                                    포장 효율성
                                </p>
                                <p className="text-blue-600">
                                    박스 내장공간 활용도 87%
                                </p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                                <p className="font-medium text-green-800">
                                    비용 절감 방안
                                </p>
                                <p className="text-green-600">
                                    가을철 진입으로 아이스팩 30% 절약
                                </p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-lg">
                                <p className="font-medium text-orange-800">
                                    특이사항
                                </p>
                                <p className="text-orange-600">
                                    추가 완충재 필요 주문 7건
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* 박스 사이즈별 조합 설정 */}
            <div className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>📦 박스 사이즈별 SKU 조합 설정</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {boxConfigurations.map((box, index) => (
                            <div
                                key={index}
                                className="border rounded-lg p-4 bg-gray-50"
                            >
                                <h4 className="font-semibold text-gray-800 mb-2">
                                    {box.boxType}
                                </h4>
                                <div className="text-sm text-gray-600 mb-3">
                                    최대 수용: {box.maxCapacity}
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-medium text-gray-700">
                                        추천 조합:
                                    </p>
                                    {box.recommendedCombos.map(
                                        (combo, comboIndex) => (
                                            <div
                                                key={comboIndex}
                                                className="p-2 bg-white rounded text-xs border"
                                            >
                                                <p className="font-medium text-gray-700">
                                                    {combo}
                                                </p>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
