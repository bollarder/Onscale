import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Users, Clock, MessageSquare, BarChart3 } from "lucide-react";

export default function CustomerServiceBehavior() {
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4">
            <Users className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">고객 행동 분석</h1>
          <p className="text-muted-foreground text-lg" data-testid="text-page-description">
            요일/시간대/성별/연령별 문의량 및 주제별 분포 분석
          </p>
        </div>

        {/* Behavior Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card data-testid="card-peak-hours">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <CardTitle className="text-sm">피크 시간대</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 mb-1">14:00-16:00</div>
              <p className="text-xs text-muted-foreground">가장 바쁜 시간</p>
            </CardContent>
          </Card>

          <Card data-testid="card-busiest-day">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-green-500" />
                <CardTitle className="text-sm">최고 문의일</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 mb-1">월요일</div>
              <p className="text-xs text-muted-foreground">주간 문의량 32%</p>
            </CardContent>
          </Card>

          <Card data-testid="card-top-age-group">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-500" />
                <CardTitle className="text-sm">주요 연령층</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600 mb-1">30-40대</div>
              <p className="text-xs text-muted-foreground">전체 문의의 45%</p>
            </CardContent>
          </Card>

          <Card data-testid="card-top-topic">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-amber-500" />
                <CardTitle className="text-sm">주요 문의 주제</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600 mb-1">기술 지원</div>
              <p className="text-xs text-muted-foreground">전체 문의의 38%</p>
            </CardContent>
          </Card>
        </div>

        {/* Behavior Analysis Charts */}
        <div className="space-y-6">
          <Card data-testid="card-inquiry-heatmap">
            <CardHeader>
              <CardTitle>문의량 히트맵</CardTitle>
              <CardDescription>
                시간대별, 요일별 문의량 분포
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">문의량 히트맵 차트</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card data-testid="card-demographic-analysis">
              <CardHeader>
                <CardTitle>인구통계별 분석</CardTitle>
                <CardDescription>
                  연령, 성별, 지역별 문의 패턴
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">인구통계 차트</p>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-topic-distribution">
              <CardHeader>
                <CardTitle>주제별 분포</CardTitle>
                <CardDescription>
                  문의 주제 카테고리별 비율 및 트렌드
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">주제별 분포 차트</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card data-testid="card-channel-preferences">
            <CardHeader>
              <CardTitle>채널 선호도</CardTitle>
              <CardDescription>
                연령대별, 문의 유형별 선호 채널 분석
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">채널 선호도 분석</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}