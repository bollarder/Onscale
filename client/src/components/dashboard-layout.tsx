// client/src/components/dashboard-layout.tsx

import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import {
    Home,
    ShoppingCart,
    BarChart3,
    TrendingUp,
    DollarSign,
    Users,
    User,
    LogIn,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { AuthModal } from "@/components/auth/auth-modal";
import { UserMenu } from "@/components/auth/user-menu";
import { Button } from "@/components/ui/button";

// 네비게이션 메뉴 데이터
const navigationMenu = [
    { name: "CEO 대시보드", icon: Home, href: "/" },
    { name: "이커머스 관리", icon: ShoppingCart, href: "/ecommerce" },
    { name: "광고 퍼포먼스", icon: BarChart3, href: "/advertising" },
    { name: "마케팅 허브", icon: TrendingUp, href: "/marketing" },
    { name: "현금 흐름", icon: DollarSign, href: "/cash-flow" },
    { name: "고객 인텔리전스", icon: Users, href: "/customer-service" },
    { name: "성장 리포트", icon: TrendingUp, href: "/growth" },
];

// '액자' 컴포넌트
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // children은 '그림'이 들어올 공간입니다.
    const [location] = useLocation();
    const { user, isLoading } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    return (
        <div className="h-screen bg-gray-50 flex text-gray-800">
            {/* 왼쪽 사이드바 - 고정 */}
            <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10">
                {/* 상단 로고 영역 */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                                O
                            </span>
                        </div>
                        <div>
                            <div className="font-bold text-gray-900">
                                온스케일
                            </div>
                            <div className="text-xs text-gray-500">
                                Executive Suite
                            </div>
                        </div>
                    </div>
                </div>

                {/* 네비게이션 메뉴 */}
                <nav className="flex-1 p-4">
                    <div className="space-y-2">
                        {navigationMenu.map((item) => {
                            const IconComponent = item.icon;
                            // 현재 URL이 메뉴의 href로 시작하는지 확인하여 활성화 상태를 결정합니다.
                            const isActive =
                                location.startsWith(item.href) &&
                                (item.href !== "/" || location === "/");
                            return (
                                <Link href={item.href} key={item.name}>
                                    <a
                                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${isActive ? "bg-blue-50 text-blue-700 border border-blue-200" : "text-gray-700 hover:bg-gray-50"}`}
                                    >
                                        <IconComponent
                                            className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-500"}`}
                                        />
                                        <span className="text-sm font-medium">
                                            {item.name}
                                        </span>
                                    </a>
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* 하단 프로필 영역 */}
                <div className="p-4 border-t border-gray-200">
                    {isLoading ? (
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                            <div className="flex-1">
                                <div className="h-4 bg-gray-200 rounded animate-pulse mb-1" />
                                <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
                            </div>
                        </div>
                    ) : user ? (
                        <div className="flex items-center space-x-3">
                            <UserMenu />
                            <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900">
                                    {user.firstName && user.lastName 
                                        ? `${user.firstName} ${user.lastName}`
                                        : user.username
                                    }
                                </div>
                                <div className="text-xs text-gray-500">
                                    {user.role === 'admin' ? '관리자' : '사용자'}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Button
                            onClick={() => setIsAuthModalOpen(true)}
                            className="w-full flex items-center space-x-2"
                            variant="outline"
                        >
                            <LogIn className="w-4 h-4" />
                            <span>로그인</span>
                        </Button>
                    )}
                </div>
            </div>

            {/* 메인 콘텐츠 영역 - '그림'이 들어오는 곳 */}
            <main className="ml-64 flex-1 flex flex-col h-screen">
                <div className="flex-1 overflow-auto">
                    {children}{" "}
                    {/* ⬅️ 이 곳에 각 페이지의 실제 내용이 채워집니다. */}
                </div>
            </main>

            {/* 인증 모달 */}
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onSuccess={(user) => {
                    console.log("User logged in:", user);
                }}
            />
        </div>
    );
}
