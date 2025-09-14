import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, DollarSign } from "lucide-react";

export default function MarketingPricing() {
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
            <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground" data-testid="text-pricing-title">
                가격 전략 최적화
              </h1>
              <p className="text-muted-foreground" data-testid="text-pricing-subtitle">
                경쟁 분석 기반 가격 최적화 및 전략 제안
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder Content */}
      <Card data-testid="card-pricing-placeholder">
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <DollarSign className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-4" data-testid="text-placeholder-title">
            가격 전략 페이지 개발 중
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto" data-testid="text-placeholder-description">
            포지셔닝 기반 가격 최적화 제안 및 경쟁사 분석 기능이 곧 추가될 예정입니다.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground" data-testid="features-list">
            <p>• 경쟁사 가격 분석</p>
            <p>• 최적 가격대 제안</p>
            <p>• 수익성 시뮬레이션</p>
            <p>• 가격 탄력성 분석</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}