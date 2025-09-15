import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Tag, Ruler, BarChart3, ShoppingCart, Clock, AlertTriangle, TrendingUp } from "lucide-react";
import { Link } from "wouter";

export default function Ecommerce() {
  const hubCards = [
    {
      title: "주문 관리",
      href: "/ecommerce/orders",
      icon: Package,
      emoji: "📦",
      stats: ["47개 신규", "156개 준비중", "234개 배송중"],
      actionText: "주문 보기"
    },
    {
      title: "SKU 분석",
      href: "/ecommerce/sku-analytics",
      icon: Tag,
      emoji: "🏷️",
      stats: ["156개 SKU", "오늘 2,847개 유닛"],
      actionText: "SKU 분석"
    },
    {
      title: "포장 최적화",
      href: "/ecommerce/packaging",
      icon: Ruler,
      emoji: "📏",
      stats: ["87% 효율성", "234개 박스 필요"],
      actionText: "포장 최적화"
    },
    {
      title: "재고 관리",
      href: "/ecommerce/inventory",
      icon: BarChart3,
      emoji: "📊",
      stats: ["12개 낮은 재고 알림", "94% 재고 보유"],
      actionText: "재고 관리"
    },
    {
      title: "발주 관리",
      href: "/ecommerce/procurement",
      icon: ShoppingCart,
      emoji: "🛒",
      stats: ["8개 원자재 임계치 이하", "3건 발주 대기"],
      actionText: "발주 관리"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hub Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {hubCards.map((card, index) => (
          <Link key={index} href={card.href}>
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 group hover:scale-[1.02]" data-testid={`card-${card.title.replace(/\s+/g, '-').toLowerCase()}`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">{card.emoji}</span>
                    </div>
                    <span className="text-lg font-semibold text-foreground">{card.title}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {card.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary/50 rounded-full mr-2"></div>
                      {stat}
                    </div>
                  ))}
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full mt-4 text-primary hover:text-primary justify-start pl-0"
                  data-testid={`button-${card.actionText.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  {card.actionText} →
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Overview Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Daily Orders */}
        <Card data-testid="chart-daily-orders">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center">
              <Package className="w-4 h-4 mr-2 text-blue-500" />
              일일 주문
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-foreground">437</div>
              <div className="text-sm text-green-500 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% vs 어제
              </div>
              <div className="h-16 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg flex items-end p-2">
                <div className="flex items-end space-x-1 w-full">
                  {[40, 65, 55, 80, 70, 90, 100].map((height, i) => (
                    <div
                      key={i}
                      className="bg-blue-500 rounded-sm flex-1"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top SKU */}
        <Card data-testid="chart-top-sku">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center">
              <Tag className="w-4 h-4 mr-2 text-purple-500" />
              상위 SKU
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">SKU-001</span>
                <span className="text-sm font-semibold text-foreground">2,847</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">SKU-024</span>
                <span className="text-sm font-semibold text-foreground">1,923</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">SKU-016</span>
                <span className="text-sm font-semibold text-foreground">1,456</span>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                총 156개 SKU 활성
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Packaging Gauge */}
        <Card data-testid="chart-packaging-gauge">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center">
              <Ruler className="w-4 h-4 mr-2 text-orange-500" />
              포장 효율성
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-foreground">87%</div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
              <div className="text-sm text-muted-foreground">
                234개 박스 필요
              </div>
              <div className="text-xs text-green-500">
                +3% vs 지난주
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Procurement Alerts */}
        <Card data-testid="chart-procurement-alerts">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center">
              <ShoppingCart className="w-4 h-4 mr-2 text-red-500" />
              발주 알림
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                  <span className="text-sm text-foreground">임계치 이하</span>
                </div>
                <span className="text-sm font-semibold text-red-500">8개</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-yellow-500" />
                  <span className="text-sm text-foreground">발주 대기</span>
                </div>
                <span className="text-sm font-semibold text-yellow-500">3건</span>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                총 47개 원자재 추적 중
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card data-testid="stat-total-orders">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">1,437</div>
              <div className="text-sm text-muted-foreground">총 주문</div>
            </div>
          </CardContent>
        </Card>
        <Card data-testid="stat-revenue">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">₩4.2M</div>
              <div className="text-sm text-muted-foreground">이번 달 매출</div>
            </div>
          </CardContent>
        </Card>
        <Card data-testid="stat-avg-processing">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">2.3h</div>
              <div className="text-sm text-muted-foreground">평균 처리시간</div>
            </div>
          </CardContent>
        </Card>
        <Card data-testid="stat-fulfillment-rate">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">94%</div>
              <div className="text-sm text-muted-foreground">배송 성공률</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}