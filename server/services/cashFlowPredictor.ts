// server/services/cashFlowPredictor.ts
import { db } from '../db';
import { orders, inventory, adPerformance, cashFlowPredictions } from '../schemas/enhanced';
import { eq, gte, between, desc, and } from 'drizzle-orm';

interface CashFlowData {
  date: string;
  revenue: number;
  adSpend: number;
  operatingCosts: number;
  netCashFlow: number;
  cumulativeCash: number;
}

interface PredictionResult {
  currentCash: number;
  monthlyBurnRate: number;
  runwayDays: number;
  projectedCashFlow: CashFlowData[];
  recommendations: string[];
  alerts: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    message: string;
    threshold?: number;
  }>;
}

export class CashFlowPredictor {
  // 메인 현금흐름 예측 함수
  static async predictCashFlow(companyId: string, months: number = 6): Promise<PredictionResult> {
    try {
      // 1. 과거 데이터 수집 (최근 3개월)
      const historicalData = await this.collectHistoricalData(companyId, 90);

      // 2. 패턴 분석
      const patterns = this.analyzePatterns(historicalData);

      // 3. 미래 예측 (6개월)
      const predictions = this.generatePredictions(patterns, months);

      // 4. 현금 상태 계산
      const currentCash = await this.getCurrentCashPosition(companyId);
      const runwayAnalysis = this.calculateRunway(currentCash, predictions);

      // 5. 권장사항 생성
      const recommendations = this.generateRecommendations(patterns, runwayAnalysis);

      // 6. 알림 생성
      const alerts = this.generateAlerts(runwayAnalysis, patterns);

      // 7. 예측 결과 DB 저장
      await this.savePredictions(companyId, predictions);

      return {
        currentCash,
        month