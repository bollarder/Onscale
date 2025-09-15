import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Newspaper, TrendingUp, Building2, Globe } from "lucide-react";

export default function GrowthIntelligence() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/growth">
          <Button variant="ghost" size="sm" data-testid="button-back-to-hub">
            <ArrowLeft className="w-4 h-4 mr-2" />
            성장 리포트로 돌아가기
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-full mb-4">
            <Newspaper className="w-8 h-8 text-purple-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">산업 인텔리전스</h1>
          <p className="text-muted-foreground text-lg" data-testid="text-page-description">
            업계 업데이트, 경쟁사 뉴스, 시장 트렌드 분석
          </p>
        </div>

        {/* Intelligence Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card data-testid="card-daily-news">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Newspaper className="w-5 h-5 text-blue-500" />
                <CardTitle className="text-sm">오늘의 뉴스</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 mb-1">24</div>
              <p className="text-xs text-muted-foreground">새로운 업계 뉴스</p>
            </CardContent>
          </Card>

          <Card data-testid="card-competitor-updates">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-green-500" />
                <CardTitle className="text-sm">경쟁사 동향</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 mb-1">8</div>
              <p className="text-xs text-muted-foreground">주요 업데이트</p>
            </CardContent>
          </Card>

          <Card data-testid="card-market-trends">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <CardTitle className="text-sm">시장 트렌드</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600 mb-1">↗️ 12%</div>
              <p className="text-xs text-muted-foreground">산업 성장률</p>
            </CardContent>
          </Card>

          <Card data-testid="card-global-impact">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-amber-500" />
                <CardTitle className="text-sm">글로벌 영향</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600 mb-1">🌐 High</div>
              <p className="text-xs text-muted-foreground">국제 시장 연동성</p>
            </CardContent>
          </Card>
        </div>

        {/* Intelligence Dashboard */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card data-testid="card-news-feed">
              <CardHeader>
                <CardTitle>실시간 뉴스 피드</CardTitle>
                <CardDescription>
                  업계 주요 뉴스 및 이슈 모니터링
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <h4 className="font-semibold text-sm">AI 기술 혁신, 업계 판도 변화 예고</h4>
                    <p className="text-xs text-muted-foreground">TechNews • 2시간 전</p>
                  </div>
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <h4 className="font-semibold text-sm">글로벌 공급망 재편, 새로운 기회 창출</h4>
                    <p className="text-xs text-muted-foreground">Business Today • 4시간 전</p>
                  </div>
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <h4 className="font-semibold text-sm">ESG 경영 강화, 지속가능 성장 화두</h4>
                    <p className="text-xs text-muted-foreground">Green Business • 6시간 전</p>
                  </div>
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <h4 className="font-semibold text-sm">디지털 전환 가속화, 새로운 비즈니스 모델</h4>
                    <p className="text-xs text-muted-foreground">Digital Weekly • 8시간 전</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-competitor-analysis">
              <CardHeader>
                <CardTitle>경쟁사 분석</CardTitle>
                <CardDescription>
                  주요 경쟁사 동향 및 전략 분석
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">Company A</h4>
                      <span className="text-green-600 text-sm">+5.2%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">신제품 출시로 시장 점유율 상승</p>
                  </div>
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">Company B</h4>
                      <span className="text-red-600 text-sm">-2.1%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">공급망 이슈로 매출 감소</p>
                  </div>
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">Company C</h4>
                      <span className="text-blue-600 text-sm">+8.7%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">M&A를 통한 사업 확장</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card data-testid="card-market-intelligence">
            <CardHeader>
              <CardTitle>시장 인텔리전스</CardTitle>
              <CardDescription>
                산업 트렌드 및 시장 기회 분석
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">시장 트렌드 분석 차트</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card data-testid="card-trend-alerts">
              <CardHeader>
                <CardTitle>트렌드 알림</CardTitle>
                <CardDescription>키워드 기반 트렌드 모니터링</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI & 머신러닝</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">🔥 HOT</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">지속가능성</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">📈 UP</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">디지털 전환</span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">⚡ FAST</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-industry-reports">
              <CardHeader>
                <CardTitle>산업 리포트</CardTitle>
                <CardDescription>전문 분석 리포트 요약</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start" data-testid="button-quarterly-report">
                    분기별 산업 동향
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" data-testid="button-tech-forecast">
                    기술 발전 전망
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" data-testid="button-market-analysis">
                    시장 분석 보고서
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-sentiment-analysis">
              <CardHeader>
                <CardTitle>감성 분석</CardTitle>
                <CardDescription>시장 심리 및 감성 지표</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl mb-2">😊</div>
                  <div className="text-lg font-semibold text-green-600">긍정적</div>
                  <p className="text-xs text-muted-foreground">전체 시장 심리 지수: 72/100</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}