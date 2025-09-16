// pages/ecommerce/orders.tsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  RefreshCw,
  Package,
  CheckCircle,
  Clock,
  AlertTriangle,
  Download,
  Filter,
} from "lucide-react";

interface Order {
  platform: string;
  status: string;
  sellerId?: string;
}

interface CollectionResult {
  success: boolean;
  message: string;
  ordersCollected: number;
  orders: Order[];
  errors: any[];
  timestamp: string;
}

export default function EcommerceOrders() {
  const [isCollecting, setIsCollecting] = useState(false);
  const [collectionResult, setCollectionResult] =
    useState<CollectionResult | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // 실제 주문 수집 함수
  const handleCollectOrders = async () => {
    setIsCollecting(true);

    try {
      const response = await fetch("/api/ecommerce/collect-real-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      setCollectionResult(result);
      setLastUpdated(new Date());

      console.log("주문 수집 결과:", result);
    } catch (error) {
      console.error("주문 수집 실패:", error);
      setCollectionResult({
        success: false,
        message: "주문 수집 중 오류가 발생했습니다",
        ordersCollected: 0,
        orders: [],
        errors: [{ platform: "system", error: error.message }],
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsCollecting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">주문 관리</h1>
          <p className="text-muted-foreground">
            모든 플랫폼의 주문을 통합 관리하세요
          </p>
        </div>

        {/* 주문 수집 버튼 */}
        <Button
          onClick={handleCollectOrders}
          disabled={isCollecting}
          className="gap-2"
          size="lg"
        >
          {isCollecting ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Package className="h-4 w-4" />
          )}
          {isCollecting ? "수집 중..." : "실시간 주문 수집"}
        </Button>
      </div>

      {/* 마지막 업데이트 시간 */}
      {lastUpdated && (
        <div className="text-sm text-muted-foreground">
          마지막 업데이트: {lastUpdated.toLocaleString("ko-KR")}
        </div>
      )}

      {/* 수집 결과 표시 */}
      {collectionResult && (
        <Alert variant={collectionResult.success ? "default" : "destructive"}>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">{collectionResult.message}</p>
              <p>수집된 플랫폼: {collectionResult.ordersCollected}개</p>
              {collectionResult.errors.length > 0 && (
                <p className="text-red-500">
                  오류 발생: {collectionResult.errors.length}개 플랫폼
                </p>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* 플랫폼별 연결 상태 */}
      {collectionResult && collectionResult.orders.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collectionResult.orders.map((order, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                  <span className="capitalize">{order.platform}</span>
                  <Badge variant="secondary">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    연결됨
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>상태:</strong> {order.status}
                  </p>
                  {order.sellerId && (
                    <p>
                      <strong>판매자 ID:</strong> {order.sellerId}
                    </p>
                  )}
                  <p className="text-green-600">실제 주문 데이터 준비 완료</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 오류 발생한 플랫폼 */}
      {collectionResult && collectionResult.errors.length > 0 && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              연결 오류
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {collectionResult.errors.map((error, index) => (
                <div key={index} className="p-3 bg-red-50 rounded-lg">
                  <p className="font-semibold text-red-700 capitalize">
                    {error.platform}
                  </p>
                  <p className="text-sm text-red-600">{error.error}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 주문 데이터 테이블 (향후 구현) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>주문 내역</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                필터
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                내보내기
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {collectionResult ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                주문 데이터 준비 완료
              </h3>
              <p className="text-muted-foreground">
                실제 주문 데이터 조회 기능을 곧 추가할 예정입니다.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                현재 {collectionResult.ordersCollected}개 플랫폼이
                연결되었습니다.
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                주문 데이터 대기 중
              </h3>
              <p className="text-muted-foreground">
                "실시간 주문 수집" 버튼을 클릭하여 주문 데이터를 가져오세요.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 수집 통계 */}
      {collectionResult && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {collectionResult.ordersCollected}
                </div>
                <div className="text-sm text-muted-foreground">
                  연결된 플랫폼
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {collectionResult.errors.length}
                </div>
                <div className="text-sm text-muted-foreground">연결 오류</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">0</div>
                <div className="text-sm text-muted-foreground">수집된 주문</div>
                <div className="text-xs text-muted-foreground mt-1">
                  (곧 구현 예정)
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// client/hooks/useOrderCollection.ts - 주문 수집 관련 커스텀 훅
export function useOrderCollection() {
  const [isCollecting, setIsCollecting] = useState(false);
  const [result, setResult] = useState<CollectionResult | null>(null);

  const collectOrders = async () => {
    setIsCollecting(true);

    try {
      const response = await fetch("/api/ecommerce/collect-real-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setResult(data);
      return data;
    } catch (error) {
      const errorResult = {
        success: false,
        message: "주문 수집 실패",
        ordersCollected: 0,
        orders: [],
        errors: [{ platform: "system", error: error.message }],
        timestamp: new Date().toISOString(),
      };
      setResult(errorResult);
      return errorResult;
    } finally {
      setIsCollecting(false);
    }
  };

  return {
    isCollecting,
    result,
    collectOrders,
  };
}
