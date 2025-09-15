import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, RotateCcw, UserPlus, Repeat, TrendingUp } from "lucide-react";

export default function CustomerServiceLifecycle() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/customer-service">
          <Button variant="ghost" size="sm" data-testid="button-back-to-hub">
            <ArrowLeft className="w-4 h-4 mr-2" />
            고객 인텔리전스 허브로 돌아가기
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-full mb-4">
            <RotateCcw className="w-8 h-8 text-purple-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">고객 생애주기</h1>
          <p className="text-muted-foreground text-lg" data-testid="text-page-description">
            신규 vs 재방문 고객 분석 및 재구매 패턴
          </p>
        </div>

        {/* Lifecycle Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card data-testid="card-new-customers">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-blue-500" />
                <CardTitle className="text-sm">신규 고객</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 mb-1">1,247</div>
              <p className="text-xs text-muted-foreground">이번 달 신규 등록</p>
            </CardContent>
          </Card>

          <Card data-testid="card-returning-customers">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Repeat className="w-5 h-5 text-green-500" />
                <CardTitle className="text-sm">재방문 고객</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 mb-1">2,891</div>
              <p className="text-xs text-muted-foreground">이번 달 재방문</p>
            </CardContent>
          </Card>

          <Card data-testid="card-repurchase-rate">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <CardTitle className="text-sm">재구매율</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600 mb-1">68.3%</div>
              <p className="text-xs text-muted-foreground">지난 분기 기준</p>
            </CardContent>
          </Card>

          <Card data-testid="card-churn-rate">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-5 h-5 text-amber-500" />
                <CardTitle className="text-sm">이탈률</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600 mb-1">12.7%</div>
              <p className="text-xs text-muted-foreground">월간 이탈률</p>
            </CardContent>
          </Card>
        </div>

        {/* Lifecycle Analysis Charts */}
        <div className="space-y-6">
          <Card data-testid="card-lifecycle-funnel">
            <CardHeader>
              <CardTitle>고객 생애주기 퍼널</CardTitle>
              <CardDescription>
                신규 → 재구매 → 충성고객 전환 과정
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">생애주기 퍼널 차트</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card data-testid="card-cohort-analysis">
              <CardHeader>
                <CardTitle>코호트 분석</CardTitle>
                <CardDescription>
                  월별 신규 고객 그룹의 재구매 패턴
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">코호트 분석 차트</p>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-product-repurchase">
              <CardHeader>
                <CardTitle>제품별 재구매율</CardTitle>
                <CardDescription>
                  카테고리별, 제품별 재구매 패턴
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">제품별 재구매 차트</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card data-testid="card-customer-journey">
            <CardHeader>
              <CardTitle>고객 여정 분석</CardTitle>
              <CardDescription>
                터치포인트별 고객 이동 경로 및 이탈 지점
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">고객 여정 맵</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}