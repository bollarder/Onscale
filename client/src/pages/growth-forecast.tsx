import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, CloudRain, TrendingUp, Thermometer, Umbrella } from "lucide-react";

export default function GrowthForecast() {
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-4">
            <CloudRain className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">날씨 및 예측</h1>
          <p className="text-muted-foreground text-lg" data-testid="text-page-description">
            날씨 조정 예측 및 매출 영향 분석
          </p>
        </div>

        {/* Weather Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card data-testid="card-current-weather">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Thermometer className="w-5 h-5 text-blue-500" />
                <CardTitle className="text-sm">현재 날씨</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 mb-1">🌤️ 22°C</div>
              <p className="text-xs text-muted-foreground">구름 조금, 습도 65%</p>
            </CardContent>
          </Card>

          <Card data-testid="card-weekly-outlook">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <CloudRain className="w-5 h-5 text-green-500" />
                <CardTitle className="text-sm">주간 전망</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 mb-1">🌧️ 비 예상</div>
              <p className="text-xs text-muted-foreground">목-금 강우 확률 80%</p>
            </CardContent>
          </Card>

          <Card data-testid="card-sales-impact">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <CardTitle className="text-sm">매출 영향</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600 mb-1">-12%</div>
              <p className="text-xs text-muted-foreground">우천 시 예상 감소</p>
            </CardContent>
          </Card>

          <Card data-testid="card-recommendation">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Umbrella className="w-5 h-5 text-amber-500" />
                <CardTitle className="text-sm">추천 대응</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600 mb-1">📱 온라인</div>
              <p className="text-xs text-muted-foreground">디지털 마케팅 강화</p>
            </CardContent>
          </Card>
        </div>

        {/* Weather Analysis Charts */}
        <div className="space-y-6">
          <Card data-testid="card-weather-forecast">
            <CardHeader>
              <CardTitle>7일 날씨 예보</CardTitle>
              <CardDescription>
                일별 날씨 변화 및 매출 예측 조정
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">날씨 예보 차트</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card data-testid="card-weather-sales-correlation">
              <CardHeader>
                <CardTitle>날씨-매출 상관관계</CardTitle>
                <CardDescription>
                  날씨 변화에 따른 매출 패턴 분석
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">상관관계 분석 차트</p>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-seasonal-trends">
              <CardHeader>
                <CardTitle>계절별 트렌드</CardTitle>
                <CardDescription>
                  계절 변화에 따른 비즈니스 영향도
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">계절별 트렌드 차트</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card data-testid="card-predictive-model">
            <CardHeader>
              <CardTitle>예측 모델</CardTitle>
              <CardDescription>
                AI 기반 날씨-매출 예측 알고리즘
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">예측 모델 대시보드</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}