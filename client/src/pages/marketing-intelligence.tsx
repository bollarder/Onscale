import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Search } from "lucide-react";

export default function MarketingIntelligence() {
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
            <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground" data-testid="text-intelligence-title">
                시장 인텔리전스
              </h1>
              <p className="text-muted-foreground" data-testid="text-intelligence-subtitle">
                경쟁사 분석 및 시장 트렌드 인사이트
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder Content */}
      <Card data-testid="card-intelligence-placeholder">
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-purple-500" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-4" data-testid="text-placeholder-title">
            시장 인텔리전스 페이지 개발 중
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto" data-testid="text-placeholder-description">
            경쟁사 분석 및 시장 트렌드 인사이트 기능이 곧 추가될 예정입니다.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground" data-testid="features-list">
            <p>• 실시간 경쟁사 모니터링</p>
            <p>• 시장 트렌드 분석</p>
            <p>• 소비자 행동 인사이트</p>
            <p>• 기회 영역 식별</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}