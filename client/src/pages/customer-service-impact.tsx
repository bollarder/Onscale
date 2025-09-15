import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, DollarSign, TrendingUp, Users, ShoppingCart } from "lucide-react";

export default function CustomerServiceImpact() {
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-full mb-4">
            <DollarSign className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">비즈니스 임팩트</h1>
          <p className="text-muted-foreground text-lg" data-testid="text-page-description">
            AOV 트렌드, CLV 계산 및 비즈니스 지표 분석
          </p>
        </div>

        {/* Impact Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card data-testid="card-average-order-value">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5 text-blue-500" />
                <CardTitle className="text-sm">평균 객단가</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 mb-1">₩187,340</div>
              <p className="text-xs text-muted-foreground">전월 대비 +12.4%</p>
            </CardContent>
          </Card>

          <Card data-testid="card-customer-lifetime-value">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-green-500" />
                <CardTitle className="text-sm">고객 생애가치</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 mb-1">₩2,347,000</div>
              <p className="text-xs text-muted-foreground">평균 CLV</p>
            </CardContent>
          </Card>

          <Card data-testid="card-revenue-per-customer">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <CardTitle className="text-sm">고객당 매출</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600 mb-1">₩524,800</div>
              <p className="text-xs text-muted-foreground">연간 기준</p>
            </CardContent>
          </Card>

          <Card data-testid="card-profit-margin">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-amber-500" />
                <CardTitle className="text-sm">수익률</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600 mb-1">28.7%</div>
              <p className="text-xs text-muted-foreground">순수익률</p>
            </CardContent>
          </Card>
        </div>

        {/* Business Impact Analysis Charts */}
        <div className="space-y-6">
          <Card data-testid="card-aov-trends">
            <CardHeader>
              <CardTitle>객단가 트렌드</CardTitle>
              <CardDescription>
                월별, 분기별 평균 객단가 변화 분석
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">객단가 트렌드 차트</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card data-testid="card-clv-analysis">
              <CardHeader>
                <CardTitle>고객 생애가치 분석</CardTitle>
                <CardDescription>
                  세그먼트별 CLV 분포 및 예측
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">CLV 분석 차트</p>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-revenue-attribution">
              <CardHeader>
                <CardTitle>매출 기여도</CardTitle>
                <CardDescription>
                  채널별, 캠페인별 매출 기여 분석
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">매출 기여도 차트</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card data-testid="card-profit-analysis">
              <CardHeader>
                <CardTitle>수익성 분석</CardTitle>
                <CardDescription>
                  제품별, 고객 세그먼트별 수익성
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">수익성 분석 차트</p>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-roi-metrics">
              <CardHeader>
                <CardTitle>ROI 지표</CardTitle>
                <CardDescription>
                  마케팅 투자 대비 수익률 분석
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">ROI 지표 차트</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}