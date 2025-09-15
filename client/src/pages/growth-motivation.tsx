import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Star, Heart, Target, Zap } from "lucide-react";

export default function GrowthMotivation() {
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-full mb-4">
            <Star className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">응원 격려</h1>
          <p className="text-muted-foreground text-lg" data-testid="text-page-description">
            오늘의 운세, 올해 사주, 팀 격려 메시지
          </p>
        </div>

        {/* Motivation Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card data-testid="card-daily-fortune">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-blue-500" />
                <CardTitle className="text-sm">오늘의 운세</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 mb-1">⭐⭐⭐⭐</div>
              <p className="text-xs text-muted-foreground">좋은 하루가 될 것</p>
            </CardContent>
          </Card>

          <Card data-testid="card-lucky-color">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-green-500" />
                <CardTitle className="text-sm">행운의 색깔</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 mb-1">🟦 파랑</div>
              <p className="text-xs text-muted-foreground">안정과 신뢰의 색</p>
            </CardContent>
          </Card>

          <Card data-testid="card-team-energy">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-purple-500" />
                <CardTitle className="text-sm">팀 에너지</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600 mb-1">⚡ 92%</div>
              <p className="text-xs text-muted-foreground">높은 팀 활력도</p>
            </CardContent>
          </Card>

          <Card data-testid="card-success-rate">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-amber-500" />
                <CardTitle className="text-sm">성공 확률</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600 mb-1">🎯 85%</div>
              <p className="text-xs text-muted-foreground">목표 달성 가능성</p>
            </CardContent>
          </Card>
        </div>

        {/* Motivation Content */}
        <div className="space-y-6">
          <Card data-testid="card-daily-message">
            <CardHeader>
              <CardTitle>오늘의 격려 메시지</CardTitle>
              <CardDescription>
                하루를 시작하는 긍정적인 메시지
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="text-4xl mb-4">🌟</div>
                <blockquote className="text-lg font-semibold text-gray-800 mb-4">
                  "성공의 비밀은 시작하는 것이다. 시작하는 비밀은 복잡한 일을 작은 단위로 나누어 하나씩 시작하는 것이다."
                </blockquote>
                <p className="text-sm text-muted-foreground">- 마크 트웨인</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card data-testid="card-fortune-details">
              <CardHeader>
                <CardTitle>상세 운세</CardTitle>
                <CardDescription>
                  오늘의 세부 운세 및 조언
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">💼 사업운</h4>
                    <p className="text-sm text-blue-700">새로운 기회가 찾아올 징조가 있습니다. 적극적인 자세로 임하세요.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">💰 재물운</h4>
                    <p className="text-sm text-green-700">예상치 못한 수익이 생길 가능성이 높습니다. 신중한 투자를 고려해보세요.</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">🤝 인간관계</h4>
                    <p className="text-sm text-purple-700">동료와의 협력이 좋은 결과를 가져다줄 것입니다. 소통을 늘려보세요.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-yearly-fortune">
              <CardHeader>
                <CardTitle>2024년 사주</CardTitle>
                <CardDescription>
                  올해 전체 운세 및 주요 이벤트
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 mb-2">갑진년 청룡의 해</div>
                    <p className="text-sm text-orange-700">변화와 도전의 해, 새로운 시작에 적합한 한 해</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="font-semibold text-red-600">상반기</div>
                      <p className="text-xs text-red-700">기반 다지기</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-600">하반기</div>
                      <p className="text-xs text-blue-700">성과 수확</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card data-testid="card-team-messages">
              <CardHeader>
                <CardTitle>팀 격려 메시지</CardTitle>
                <CardDescription>동료들을 위한 응원</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-pink-50 rounded-lg">
                    <p className="text-sm font-semibold">🎉 김팀장님, 프로젝트 성공 축하드려요!</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-semibold">💪 이번 주도 모두 화이팅!</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-semibold">🌟 새로운 도전을 응원합니다!</p>
                  </div>
                </div>
                <Button className="w-full mt-3" variant="outline" data-testid="button-send-message">
                  격려 메시지 보내기
                </Button>
              </CardContent>
            </Card>

            <Card data-testid="card-goal-tracker">
              <CardHeader>
                <CardTitle>목표 추적</CardTitle>
                <CardDescription>개인 및 팀 목표 현황</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">월간 매출 목표</span>
                    <span className="text-green-600 font-semibold">87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '87%'}}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">개인 성장 목표</span>
                    <span className="text-blue-600 font-semibold">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '92%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-mood-tracker">
              <CardHeader>
                <CardTitle>기분 추적</CardTitle>
                <CardDescription>일일 기분 및 에너지 레벨</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-6xl mb-4">😊</div>
                  <div className="text-lg font-semibold mb-2">좋음</div>
                  <p className="text-sm text-muted-foreground mb-4">오늘 기분 점수: 8/10</p>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" data-testid="button-mood-happy">😊</Button>
                    <Button variant="outline" size="sm" data-testid="button-mood-neutral">😐</Button>
                    <Button variant="outline" size="sm" data-testid="button-mood-sad">😔</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}