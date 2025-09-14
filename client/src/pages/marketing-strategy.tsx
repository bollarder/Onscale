import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, FileText } from "lucide-react";

export default function MarketingStrategy() {
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
            <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground" data-testid="text-strategy-title">
                마케팅 전략 제안
              </h1>
              <p className="text-muted-foreground" data-testid="text-strategy-subtitle">
                제품, 프로모션, 리뷰 개선 전략
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder Content */}
      <Card data-testid="card-strategy-placeholder">
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-orange-500" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-4" data-testid="text-placeholder-title">
            전략 제안 페이지 개발 중
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto" data-testid="text-placeholder-description">
            제품, 프로모션, 리뷰 개선 전략 제안 기능이 곧 추가될 예정입니다.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground" data-testid="features-list">
            <p>• 리뷰 캠페인 전략</p>
            <p>• 제품 컨셉 개선</p>
            <p>• 프로모션 이벤트 기획</p>
            <p>• 마케팅 메시지 최적화</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}