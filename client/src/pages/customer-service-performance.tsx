import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Phone, TrendingUp, Clock, Target } from "lucide-react";

export default function CustomerServicePerformance() {
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-4">
            <Phone className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">서비스 성과</h1>
          <p className="text-muted-foreground text-lg" data-testid="text-page-description">
            CS 지표 및 응답 시간 분석
          </p>
        </div>

        {/* Performance Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card data-testid="card-satisfaction-score">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <CardTitle className="text-lg">고객 만족도</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">4.2/5</div>
              <p className="text-sm text-muted-foreground">지난 달 대비 +0.3 향상</p>
            </CardContent>
          </Card>

          <Card data-testid="card-response-time">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <CardTitle className="text-lg">평균 응답 시간</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">4.2시간</div>
              <p className="text-sm text-muted-foreground">목표: 2시간 이내</p>
            </CardContent>
          </Card>

          <Card data-testid="card-resolution-rate">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-500" />
                <CardTitle className="text-lg">해결률</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600 mb-2">78%</div>
              <p className="text-sm text-muted-foreground">1차 해결률 기준</p>
            </CardContent>
          </Card>
        </div>

        {/* Placeholder for Charts */}
        <div className="space-y-6">
          <Card data-testid="card-performance-trends">
            <CardHeader>
              <CardTitle>성과 트렌드 분석</CardTitle>
              <CardDescription>
                시간별, 일별, 월별 CS 성과 지표 분석
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">성과 트렌드 차트 영역</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card data-testid="card-response-time-analysis">
              <CardHeader>
                <CardTitle>응답 시간 분석</CardTitle>
                <CardDescription>
                  시간대별, 요일별 응답 시간 패턴
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">응답 시간 히트맵</p>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-agent-performance">
              <CardHeader>
                <CardTitle>상담원 성과</CardTitle>
                <CardDescription>
                  개별 상담원 성과 지표 및 순위
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">상담원 성과 랭킹</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}