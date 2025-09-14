import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { ChartCard } from "@/components/chart-card";
import { InteractiveChart } from "@/components/interactive-chart";
import { ArrowRight, Target, DollarSign, Search, FileText } from "lucide-react";

export default function MarketingHub() {
  // 경쟁 포지셔닝 산점도 데이터 (가격 vs 리뷰 수)
  const positioningData = {
    datasets: [{
      label: '경쟁사',
      data: [
        { x: 25000, y: 4.8, name: '브랜드 A' },
        { x: 35000, y: 4.6, name: '브랜드 B' },
        { x: 15000, y: 4.2, name: '브랜드 C' },
        { x: 45000, y: 4.1, name: '브랜드 D' },
        { x: 20000, y: 3.9, name: '브랜드 E' },
        { x: 55000, y: 4.7, name: '브랜드 F' },
        { x: 12000, y: 3.5, name: '브랜드 G' },
        { x: 40000, y: 3.8, name: '브랜드 H' }
      ],
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 2,
      pointRadius: 6
    }, {
      label: '우리 제품',
      data: [
        { x: 28000, y: 4.3, name: '우리 제품' }
      ],
      backgroundColor: 'rgba(239, 68, 68, 0.8)',
      borderColor: 'rgba(239, 68, 68, 1)',
      borderWidth: 3,
      pointRadius: 10
    }]
  };

  // 시장 기회 분석 데이터
  const marketOpportunities = [
    { quadrant: "가성비 리더", count: 2, color: "bg-green-500", position: "높은 리뷰 + 낮은 가격" },
    { quadrant: "프리미엄 플레이어", count: 2, color: "bg-blue-500", position: "높은 리뷰 + 높은 가격" },
    { quadrant: "저가 옵션", count: 2, color: "bg-yellow-500", position: "낮은 리뷰 + 낮은 가격" },
    { quadrant: "취약한 포지션", count: 2, color: "bg-red-500", position: "낮은 리뷰 + 높은 가격" }
  ];

  return (
    <div className="space-y-8">
      {/* Hub Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 경쟁 포지셔닝 카드 */}
        <Link href="/marketing/positioning">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 group" data-testid="card-positioning">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-500" />
                </div>
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-positioning-title">
                경쟁 포지셔닝
              </h3>
              <div className="space-y-1 text-sm text-muted-foreground mb-4">
                <p data-testid="text-positioning-stats">리뷰수 vs 가격 포지셔닝 매트릭스</p>
                <p data-testid="text-positioning-analysis">4분면 분석 완료</p>
              </div>
              <div className="w-full flex justify-between items-center text-sm group-hover:text-primary" data-testid="link-positioning-map">
                <span>포지셔닝 맵 보기 →</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* 가격 전략 카드 */}
        <Link href="/marketing/pricing">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 group" data-testid="card-pricing">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-500" />
                </div>
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-pricing-title">
                가격 전략
              </h3>
              <div className="space-y-1 text-sm text-muted-foreground mb-4">
                <p data-testid="text-pricing-stats">포지셔닝 기반 가격 최적화 제안</p>
                <p data-testid="text-pricing-optimization">8개 전략 제안</p>
              </div>
              <div className="w-full flex justify-between items-center text-sm group-hover:text-primary" data-testid="link-pricing-optimization">
                <span>가격 최적화 →</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* 시장 인텔리전스 카드 */}
        <Link href="/marketing/intelligence">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 group" data-testid="card-intelligence">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Search className="w-6 h-6 text-purple-500" />
                </div>
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-intelligence-title">
                시장 인텔리전스
              </h3>
              <div className="space-y-1 text-sm text-muted-foreground mb-4">
                <p data-testid="text-intelligence-stats">경쟁사 분석 및 시장 트렌드 인사이트</p>
                <p data-testid="text-intelligence-competitors">12개 경쟁사 추적 중</p>
              </div>
              <div className="w-full flex justify-between items-center text-sm group-hover:text-primary" data-testid="link-market-analysis">
                <span>시장 분석 →</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* 전략 제안 카드 */}
        <Link href="/marketing/strategy">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 group" data-testid="card-strategy">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-orange-500" />
                </div>
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-strategy-title">
                전략 제안
              </h3>
              <div className="space-y-1 text-sm text-muted-foreground mb-4">
                <p data-testid="text-strategy-stats">제품, 프로모션, 리뷰 개선 전략</p>
                <p data-testid="text-strategy-recommendations">15개 권장 사항</p>
              </div>
              <div className="w-full flex justify-between items-center text-sm group-hover:text-primary" data-testid="link-strategy-view">
                <span>전략 보기 →</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 경쟁 포지셔닝 산점도 */}
        <ChartCard
          title="경쟁 포지셔닝 분석"
          className="lg:col-span-2"
          testId="chart-positioning-scatter"
        >
          <InteractiveChart
            type="scatter"
            data={positioningData}
            options={{
              scales: {
                x: {
                  title: {
                    display: true,
                    text: '가격 (원)'
                  },
                  ticks: {
                    callback: function(value: any) {
                      return '₩' + (value / 1000) + 'K';
                    }
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: '리뷰 평점'
                  },
                  min: 3,
                  max: 5,
                  ticks: {
                    stepSize: 0.2
                  }
                }
              },
              plugins: {
                legend: {
                  display: true,
                  position: 'top' as const
                },
                tooltip: {
                  callbacks: {
                    label: function(context: any) {
                      return `${context.raw.name}: ₩${context.raw.x.toLocaleString()}, ${context.raw.y}★`;
                    }
                  }
                }
              }
            }}
            testId="chart-positioning"
          />
        </ChartCard>

        {/* 시장 기회 분석 */}
        <Card data-testid="card-market-opportunities">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6" data-testid="text-opportunities-title">
              시장 기회 분석
            </h3>
            <div className="space-y-4">
              {marketOpportunities.map((opportunity, index) => (
                <div key={index} className="p-3 rounded-lg border" data-testid={`opportunity-item-${index}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${opportunity.color}`} />
                      <span className="text-sm font-medium text-foreground" data-testid={`opportunity-quadrant-${index}`}>
                        {opportunity.quadrant}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-foreground" data-testid={`opportunity-count-${index}`}>
                      {opportunity.count}개 업체
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground" data-testid={`opportunity-position-${index}`}>
                    {opportunity.position}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 경쟁 분석 요약 */}
      <Card data-testid="card-competitive-summary">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6" data-testid="text-competitive-title">
            경쟁 분석 요약
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center" data-testid="summary-position">
              <div className="text-2xl font-bold text-blue-600 mb-2">중간</div>
              <div className="text-sm text-muted-foreground">현재 포지션</div>
              <div className="text-xs text-muted-foreground mt-1">가격대비 적정한 품질</div>
            </div>
            <div className="text-center" data-testid="summary-opportunity">
              <div className="text-2xl font-bold text-green-600 mb-2">상승</div>
              <div className="text-sm text-muted-foreground">기회 방향</div>
              <div className="text-xs text-muted-foreground mt-1">프리미엄 시장 진입 가능</div>
            </div>
            <div className="text-center" data-testid="summary-recommendation">
              <div className="text-2xl font-bold text-purple-600 mb-2">품질</div>
              <div className="text-sm text-muted-foreground">핵심 전략</div>
              <div className="text-xs text-muted-foreground mt-1">리뷰 점수 향상 집중</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}