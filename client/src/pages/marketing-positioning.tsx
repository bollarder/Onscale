import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Target } from "lucide-react";

export default function MarketingPositioning() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/marketing">
            <Button variant="outline" size="sm" data-testid="button-back-marketing">
              <ArrowLeft className="w-4 h-4 mr-2" />
              마케팅 허브로 돌아가기
            </Button>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground" data-testid="text-positioning-title">
                경쟁 포지셔닝 분석
              </h1>
              <p className="text-muted-foreground" data-testid="text-positioning-subtitle">
                시장 내 경쟁 위치 및 포지셔닝 전략 분석
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder Content */}
      <Card data-testid="card-positioning-placeholder">
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-4" data-testid="text-placeholder-title">
            경쟁 포지셔닝 페이지 개발 중
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto" data-testid="text-placeholder-description">
            리뷰수 vs 가격 포지셔닝 매트릭스와 4분면 분석 기능이 곧 추가될 예정입니다.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground" data-testid="features-list">
            <p>• 경쟁사 포지셔닝 맵</p>
            <p>• 4분면 시장 분석</p>
            <p>• 포지셔닝 개선 제안</p>
            <p>• 경쟁 우위 분석</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}