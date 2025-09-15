import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight, Tag, Construction } from "lucide-react";
import { Link } from "wouter";

export default function SkuAnalytics() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center text-sm text-muted-foreground mb-2" data-testid="breadcrumb-sku-analytics">
            <Link href="/ecommerce" className="hover:text-foreground">이커머스 관리</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-foreground">SKU 분석</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/ecommerce">
              <Button variant="ghost" size="icon" data-testid="button-back-to-hub">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground" data-testid="heading-sku-analytics">
              SKU 분석
            </h1>
          </div>
        </div>
      </div>

      {/* Placeholder Content */}
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md" data-testid="card-placeholder">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-xl" data-testid="heading-placeholder">SKU 분석 시스템</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="flex items-center justify-center text-amber-500 mb-2">
              <Construction className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">준비 중</span>
            </div>
            <p className="text-muted-foreground" data-testid="text-placeholder-description">
              SKU 성과 분석, 재고 회전율, 수익성 분석 기능을 준비하고 있습니다.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-primary/50 rounded-full mr-2"></div>
                156개 SKU 데이터 수집 완료
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-primary/50 rounded-full mr-2"></div>
                오늘 2,847개 유닛 판매
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-primary/50 rounded-full mr-2"></div>
                실시간 분석 대시보드 구축 중
              </div>
            </div>
            <Link href="/ecommerce">
              <Button className="mt-4" data-testid="button-back-to-hub-main">
                허브로 돌아가기
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}