import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Calendar, MapPin, Users, TrendingUp } from "lucide-react";

export default function GrowthEvents() {
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">시장 이벤트</h1>
          <p className="text-muted-foreground text-lg" data-testid="text-page-description">
            박람회, 팝업, 오프라인 이벤트 캘린더 관리
          </p>
        </div>

        {/* Events Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card data-testid="card-upcoming-events">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                <CardTitle className="text-sm">예정 이벤트</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 mb-1">12</div>
              <p className="text-xs text-muted-foreground">이번 달 예정</p>
            </CardContent>
          </Card>

          <Card data-testid="card-trade-shows">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-green-500" />
                <CardTitle className="text-sm">박람회</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 mb-1">5</div>
              <p className="text-xs text-muted-foreground">참가 예정</p>
            </CardContent>
          </Card>

          <Card data-testid="card-popup-stores">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-500" />
                <CardTitle className="text-sm">팝업 스토어</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600 mb-1">8</div>
              <p className="text-xs text-muted-foreground">운영 중</p>
            </CardContent>
          </Card>

          <Card data-testid="card-event-roi">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-amber-500" />
                <CardTitle className="text-sm">이벤트 ROI</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600 mb-1">340%</div>
              <p className="text-xs text-muted-foreground">평균 투자 수익률</p>
            </CardContent>
          </Card>
        </div>

        {/* Event Management */}
        <div className="space-y-6">
          <Card data-testid="card-event-calendar">
            <CardHeader>
              <CardTitle>이벤트 캘린더</CardTitle>
              <CardDescription>
                월별 이벤트 일정 및 운영 계획
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">이벤트 캘린더</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card data-testid="card-event-performance">
              <CardHeader>
                <CardTitle>이벤트 성과</CardTitle>
                <CardDescription>
                  이벤트별 방문자 수, 매출, 리드 생성
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">성과 분석 차트</p>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-location-analysis">
              <CardHeader>
                <CardTitle>지역별 분석</CardTitle>
                <CardDescription>
                  지역별 이벤트 효과 및 최적 위치
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">지역별 히트맵</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card data-testid="card-upcoming-tradeshows">
              <CardHeader>
                <CardTitle>예정 박람회</CardTitle>
                <CardDescription>참가 예정 박람회 리스트</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <h4 className="font-semibold">서울 국제 전시회</h4>
                    <p className="text-sm text-muted-foreground">12월 15-18일 • COEX</p>
                  </div>
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <h4 className="font-semibold">부산 테크 박람회</h4>
                    <p className="text-sm text-muted-foreground">1월 20-22일 • BEXCO</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-popup-management">
              <CardHeader>
                <CardTitle>팝업 관리</CardTitle>
                <CardDescription>현재 운영 중인 팝업</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <h4 className="font-semibold">강남 팝업</h4>
                    <p className="text-sm text-muted-foreground">12월 1-31일 • 일 평균 120명</p>
                  </div>
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <h4 className="font-semibold">홍대 팝업</h4>
                    <p className="text-sm text-muted-foreground">11월 15-12월 15일 • 일 평균 98명</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-event-planning">
              <CardHeader>
                <CardTitle>이벤트 기획</CardTitle>
                <CardDescription>신규 이벤트 계획</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full" variant="outline" data-testid="button-new-event">
                    새 이벤트 등록
                  </Button>
                  <Button className="w-full" variant="outline" data-testid="button-schedule-popup">
                    팝업 일정 계획
                  </Button>
                  <Button className="w-full" variant="outline" data-testid="button-venue-analysis">
                    장소 분석 요청
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}