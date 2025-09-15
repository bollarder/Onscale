import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight, ShoppingCart, Construction } from "lucide-react";
import { Link } from "wouter";

export default function Procurement() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center text-sm text-muted-foreground mb-2" data-testid="breadcrumb-procurement">
            <Link href="/ecommerce" className="hover:text-foreground">이커머스 관리</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-foreground">발주 관리</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/ecommerce">
              <Button variant="ghost" size="icon" data-testid="button-back-to-hub">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground" data-testid="heading-procurement">
              발주 관리
            </h1>
          </div>
        </div>
      </div>

      {/* Placeholder Content */}
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md" data-testid="card-placeholder">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-xl" data-testid="heading-placeholder">발주 관리 시스템</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="flex items-center justify-center text-amber-500 mb-2">
              <Construction className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">준비 중</span>
            </div>
            <p className="text-muted-foreground" data-testid="text-placeholder-description">
              자동 발주, 공급업체 관리, 원가 최적화 기능을 준비하고 있습니다.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-primary/50 rounded-full mr-2"></div>
                8개 원자재 임계치 이하
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-primary/50 rounded-full mr-2"></div>
                3건 발주 승인 대기 중
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-primary/50 rounded-full mr-2"></div>
                스마트 발주 시스템 구축 중
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