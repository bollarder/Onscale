import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "./theme-provider";
import {
  Home,
  ShoppingCart,
  Megaphone,
  Headphones,
  Users,
  BarChart,
  Menu,
  X,
  Moon,
  Sun,
  Bell,
  Settings,
  MoreHorizontal,
  Wallet,
  Target,
} from "lucide-react";

const navigation = [
  { name: "CEO 대시보드", href: "/", icon: Home },
  { name: "이커머스 관리", href: "/ecommerce", icon: ShoppingCart },
  { name: "광고 퍼포먼스", href: "/advertising", icon: Megaphone },
  { name: "마케팅 허브", href: "/marketing", icon: Target },
  { name: "현금 흐름", href: "/cash-flow", icon: Wallet },
  { name: "고객 인텔리전스", href: "/customer-service", icon: Headphones },
  { name: "성장 리포트", href: "/growth", icon: BarChart },
];

const sectionTitles: Record<string, { title: string; subtitle: string }> = {
  "/": {
    title: "CEO 대시보드",
    subtitle: "실시간 비즈니스 인사이트 및 지표",
  },
  "/ecommerce": {
    title: "이커머스 관리",
    subtitle: "주문, SKU, 재고 및 발주 관리",
  },
  "/advertising": {
    title: "광고 퍼포먼스",
    subtitle: "캠페인 지표 및 ROI 분석",
  },
  "/marketing": {
    title: "마케팅 허브",
    subtitle: "경쟁 포지셔닝 및 시장 인텔리전스",
  },
  "/cash-flow": { title: "현금 흐름", subtitle: "현금 예측 및 거래 모니터링" },
  "/customer-service": {
    title: "고객 인텔리전스",
    subtitle:
      "CS 만족도 트렌드 및 응답 시간 지표, 고객 문의 히트맵, 생애주기 퍼널, 자동 응답 제안",
  },
  "/growth": {
    title: "성장 리포트",
    subtitle:
      "날씨 조정 예측, 이벤트 캘린더, 뉴스 피드, 일일 운세 및 예측 인텔리전스",
  },
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();

  // Close sidebar when window is resized to mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check initial size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentSection = sectionTitles[location] || sectionTitles["/"];

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border sidebar-transition md:relative md:translate-x-0 md:z-0 ${
          sidebarOpen ? "" : "sidebar-hidden"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and Company Name */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-sidebar-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <BarChart className="w-4 h-4 text-sidebar-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-sidebar-foreground">
                  ExecDash
                </h1>
                <p className="text-xs text-muted-foreground">Executive Suite</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
              data-testid="button-close-sidebar"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = location === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                  }`}
                  data-testid={`link-nav-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="px-4 py-4 border-t border-sidebar-border">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
                  alt="Executive Profile"
                />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p
                  className="text-sm font-medium text-sidebar-foreground"
                  data-testid="text-user-name"
                >
                  Sarah Johnson
                </p>
                <p
                  className="text-xs text-muted-foreground"
                  data-testid="text-user-role"
                >
                  Chief Executive Officer
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-sidebar-foreground"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSidebarOpen(true)}
                data-testid="button-toggle-sidebar"
              >
                <Menu className="h-4 w-4" />
              </Button>
              <div>
                <h2
                  className="text-xl font-semibold text-foreground"
                  data-testid="text-page-title"
                >
                  {currentSection.title}
                </h2>
                <p
                  className="text-sm text-muted-foreground"
                  data-testid="text-page-subtitle"
                >
                  {currentSection.subtitle}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                data-testid="button-theme-toggle"
              >
                {theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                data-testid="button-notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </Button>
              {/* Settings */}
              <Button variant="ghost" size="icon" data-testid="button-settings">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          data-testid="overlay-mobile-sidebar"
        />
      )}
    </div>
  );
}
