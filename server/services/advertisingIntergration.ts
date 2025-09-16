// server/services/advertisingIntegration.ts
import axios from "axios";
import { db } from "../db";
import { adCampaigns, adPerformance } from "../schemas/advertising";

interface AdMetrics {
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
  revenue: number;
  roas: number;
  ctr: number;
  cpc: number;
}

// Google Ads API 연동
class GoogleAdsAPI {
  private customerId: string;
  private developerToken: string;
  private refreshToken: string;
  private clientId: string;
  private clientSecret: string;

  constructor(credentials: any) {
    this.customerId = credentials.customerId;
    this.developerToken = credentials.developerToken;
    this.refreshToken = credentials.refreshToken;
    this.clientId = credentials.clientId;
    this.clientSecret = credentials.clientSecret;
  }

  async getAccessToken(): Promise<string> {
    try {
      const response = await axios.post("https://oauth2.googleapis.com/token", {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: this.refreshToken,
        grant_type: "refresh_token",
      });
      return response.data.access_token;
    } catch (error) {
      throw new Error("Google Ads 인증 실패");
    }
  }

  async getCampaignPerformance(
    startDate: string,
    endDate: string,
  ): Promise<AdMetrics[]> {
    const accessToken = await this.getAccessToken();

    try {
      const query = `
        SELECT 
          campaign.id,
          campaign.name,
          metrics.impressions,
          metrics.clicks,
          metrics.cost_micros,
          metrics.conversions,
          metrics.conversions_value
        FROM campaign 
        WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
      `;

      const response = await axios.post(
        `https://googleads.googleapis.com/v14/customers/${this.customerId}/googleAds:searchStream`,
        { query },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "developer-token": this.developerToken,
            "Content-Type": "application/json",
          },
        },
      );

      return this.processGoogleAdsData(response.data);
    } catch (error) {
      console.error("Google Ads API 오류:", error);
      throw new Error("Google Ads 데이터 조회 실패");
    }
  }

  private processGoogleAdsData(data: any): AdMetrics[] {
    // Google Ads 응답 데이터 처리
    return (
      data.results?.map((result: any) => {
        const metrics = result.metrics;
        const cost = metrics.cost_micros / 1000000; // 마이크로 단위를 원화로 변환
        const revenue = metrics.conversions_value || 0;

        return {
          impressions: metrics.impressions || 0,
          clicks: metrics.clicks || 0,
          cost,
          conversions: metrics.conversions || 0,
          revenue,
          roas: revenue > 0 ? (revenue / cost) * 100 : 0,
          ctr:
            metrics.impressions > 0
              ? (metrics.clicks / metrics.impressions) * 100
              : 0,
          cpc: metrics.clicks > 0 ? cost / metrics.clicks : 0,
        };
      }) || []
    );
  }
}

// Facebook Ads API 연동
class FacebookAdsAPI {
  private accessToken: string;
  private accountId: string;

  constructor(credentials: any) {
    this.accessToken = credentials.accessToken;
    this.accountId = credentials.accountId;
  }

  async getCampaignPerformance(
    startDate: string,
    endDate: string,
  ): Promise<AdMetrics[]> {
    try {
      const fields = [
        "campaign_name",
        "impressions",
        "clicks",
        "spend",
        "actions",
        "action_values",
      ];

      const response = await axios.get(
        `https://graph.facebook.com/v18.0/act_${this.accountId}/insights`,
        {
          params: {
            fields: fields.join(","),
            time_range: JSON.stringify({
              since: startDate,
              until: endDate,
            }),
            level: "campaign",
            access_token: this.accessToken,
          },
        },
      );

      return this.processFacebookAdsData(response.data.data);
    } catch (error) {
      console.error("Facebook Ads API 오류:", error);
      throw new Error("Facebook Ads 데이터 조회 실패");
    }
  }

  private processFacebookAdsData(data: any[]): AdMetrics[] {
    return data.map((campaign) => {
      const spend = parseFloat(campaign.spend || "0");
      const purchases =
        campaign.actions?.find(
          (action: any) => action.action_type === "purchase",
        )?.value || 0;
      const revenue =
        campaign.action_values?.find(
          (value: any) => value.action_type === "purchase",
        )?.value || 0;

      return {
        impressions: parseInt(campaign.impressions || "0"),
        clicks: parseInt(campaign.clicks || "0"),
        cost: spend,
        conversions: parseInt(purchases),
        revenue: parseFloat(revenue),
        roas: revenue > 0 ? (parseFloat(revenue) / spend) * 100 : 0,
        ctr:
          campaign.impressions > 0
            ? (parseInt(campaign.clicks) / parseInt(campaign.impressions)) * 100
            : 0,
        cpc: campaign.clicks > 0 ? spend / parseInt(campaign.clicks) : 0,
      };
    });
  }
}

// 네이버 파워링크 API 연동
class NaverPowerLinkAPI {
  private apiKey: string;
  private secretKey: string;
  private customerId: string;

  constructor(credentials: any) {
    this.apiKey = credentials.apiKey;
    this.secretKey = credentials.secretKey;
    this.customerId = credentials.customerId;
  }

  async getCampaignPerformance(
    startDate: string,
    endDate: string,
  ): Promise<AdMetrics[]> {
    try {
      const timestamp = Date.now().toString();
      const signature = this.generateSignature(timestamp);

      const response = await axios.post(
        "https://api.naver.com/keywordstool",
        {
          hintKeywords: [],
          showDetail: 1,
          startDate,
          endDate,
        },
        {
          headers: {
            "X-Timestamp": timestamp,
            "X-API-KEY": this.apiKey,
            "X-Customer": this.customerId,
            "X-Signature": signature,
            "Content-Type": "application/json",
          },
        },
      );

      return this.processNaverData(response.data);
    } catch (error) {
      console.error("네이버 파워링크 API 오류:", error);
      throw new Error("네이버 파워링크 데이터 조회 실패");
    }
  }

  private generateSignature(timestamp: string): string {
    // HMAC-SHA256 서명 생성 (실제 구현 필요)
    return "mock_signature";
  }

  private processNaverData(data: any): AdMetrics[] {
    // 네이버 파워링크 데이터 처리 로직
    return [];
  }
}

// 통합 광고 성과 수집 서비스
export class AdPerformanceCollector {
  static async collectAllAdData(
    companyId: string,
    startDate: string,
    endDate: string,
  ) {
    const results = {
      google: null,
      facebook: null,
      naver: null,
      errors: [],
    };

    // 각 플랫폼별 연동 정보 조회
    const integrations = await db
      .select()
      .from(platformIntegrations)
      .where(eq(platformIntegrations.companyId, companyId))
      .where(eq(platformIntegrations.isActive, true));

    for (const integration of integrations) {
      try {
        switch (integration.platform) {
          case "google_ads":
            const googleAPI = new GoogleAdsAPI(integration.credentials);
            results.google = await googleAPI.getCampaignPerformance(
              startDate,
              endDate,
            );
            break;

          case "facebook_ads":
            const facebookAPI = new FacebookAdsAPI(integration.credentials);
            results.facebook = await facebookAPI.getCampaignPerformance(
              startDate,
              endDate,
            );
            break;

          case "naver_powerlink":
            const naverAPI = new NaverPowerLinkAPI(integration.credentials);
            results.naver = await naverAPI.getCampaignPerformance(
              startDate,
              endDate,
            );
            break;
        }

        // 수집된 데이터 DB 저장
        await this.saveAdPerformanceData(
          companyId,
          integration.platform,
          results[integration.platform.split("_")[0]],
        );
      } catch (error) {
        results.errors.push({
          platform: integration.platform,
          error: error.message,
        });
      }
    }

    return results;
  }

  private static async saveAdPerformanceData(
    companyId: string,
    platform: string,
    metrics: AdMetrics[],
  ) {
    if (!metrics || metrics.length === 0) return;

    for (const metric of metrics) {
      await db.insert(adPerformance).values({
        companyId,
        platform,
        date: new Date(),
        impressions: metric.impressions,
        clicks: metric.clicks,
        cost: metric.cost.toString(),
        conversions: metric.conversions,
        revenue: metric.revenue.toString(),
        roas: metric.roas,
        ctr: metric.ctr,
        cpc: metric.cpc,
      });
    }
  }

  // ROAS 임계치 알림 체크
  static async checkROASAlerts(companyId: string) {
    const recentPerformance = await db
      .select()
      .from(adPerformance)
      .where(eq(adPerformance.companyId, companyId))
      .where(
        gte(adPerformance.date, new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
      ) // 최근 7일
      .orderBy(desc(adPerformance.date));

    const platformROAS = {};

    recentPerformance.forEach((perf) => {
      if (!platformROAS[perf.platform]) {
        platformROAS[perf.platform] = [];
      }
      platformROAS[perf.platform].push(perf.roas);
    });

    // 각 플랫폼별 평균 ROAS 계산 및 알림
    for (const [platform, roasValues] of Object.entries(platformROAS)) {
      const avgRoas = roasValues.reduce((a, b) => a + b, 0) / roasValues.length;

      if (avgRoas < 300) {
        // ROAS 300% 미만시 알림
        await AlertService.createAlert(companyId, {
          type: "roas_drop",
          severity: avgRoas < 200 ? "critical" : "high",
          title: `${platform} ROAS 하락 알림`,
          message: `${platform} 평균 ROAS가 ${avgRoas.toFixed(1)}%로 목표치를 하회하고 있습니다.`,
          metadata: {
            platform,
            currentRoas: avgRoas,
            threshold: 300,
          },
        });
      }
    }
  }
}
