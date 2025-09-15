import { useQuery } from "@tanstack/react-query";
import { KPICard } from "@/components/kpi-card";
import { ChartCard } from "@/components/chart-card";
import { InteractiveChart } from "@/components/interactive-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { TrendingUp, Globe, Rocket, CloudRain, Calendar, Newspaper, Star, ArrowRight } from "lucide-react";

export default function Growth() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["/api/metrics/growth"]
  });

  // Sample growth chart data
  const growthData = {
    labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024'],
    datasets: [{
      label: 'Revenue Growth (%)',
      data: [15.2, 18.7, 22.1, 28.4, 32.6, 35.9],
      borderColor: 'rgba(16, 185, 129, 1)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4
    }, {
      label: 'User Growth (%)',
      data: [12.8, 16.3, 19.9, 25.1, 29.7, 33.2],
      borderColor: 'rgba(59, 130, 246, 1)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4
    }, {
      label: 'Market Share (%)',
      data: [18.5, 19.2, 20.8, 22.3, 23.1, 23.7],
      borderColor: 'rgba(245, 158, 11, 1)',
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-card rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const getMetricValue = (name: string) => {
    return Array.isArray(metrics) ? metrics.find((m: any) => m.metricName === name) || {} : {};
  };

  const monthlyGrowthRate = getMetricValue("monthlyGrowthRate");
  const marketShare = getMetricValue("marketShare");
  const revenueGrowth = getMetricValue("revenueGrowth");

  return (
    <div className="space-y-8">
      {/* Growth Intelligence Hub Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer" data-testid="card-weather-forecast">
          <Link href="/growth/forecast">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <CloudRain className="w-5 h-5 text-blue-500" />
                </div>
                <CardTitle className="text-lg">날씨 및 예측</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>🌦️ 차주 날씨 영향</p>
                <p>📈 매출 예측 조정</p>
                <p>🎯 날씨 기반 분석</p>
              </div>
              <Button variant="ghost" className="w-full mt-4 text-blue-600 hover:text-blue-700" data-testid="button-view-forecast">
                예측 보기 <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer" data-testid="card-market-events">
          <Link href="/growth/events">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-500" />
                </div>
                <CardTitle className="text-lg">시장 이벤트</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>📅 박람회 일정</p>
                <p>🏪 팝업 이벤트</p>
                <p>🎪 오프라인 캘린더</p>
              </div>
              <Button variant="ghost" className="w-full mt-4 text-green-600 hover:text-green-700" data-testid="button-view-events">
                이벤트 관리 <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer" data-testid="card-industry-intelligence">
          <Link href="/growth/intelligence">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Newspaper className="w-5 h-5 text-purple-500" />
                </div>
                <CardTitle className="text-lg">산업 인텔리전스</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>📰 업계 업데이트</p>
                <p>🏢 경쟁사 뉴스</p>
                <p>📊 시장 트렌드</p>
              </div>
              <Button variant="ghost" className="w-full mt-4 text-purple-600 hover:text-purple-700" data-testid="button-view-intelligence">
                인텔리전스 보기 <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer" data-testid="card-motivation">
          <Link href="/growth/motivation">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <Star className="w-5 h-5 text-amber-500" />
                </div>
                <CardTitle className="text-lg">응원 격려</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>⭐ 오늘의 운세</p>
                <p>🔮 올해 사주</p>
                <p>💪 팀 격려 메시지</p>
              </div>
              <Button variant="ghost" className="w-full mt-4 text-amber-600 hover:text-amber-700" data-testid="button-view-motivation">
                응원 보기 <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <KPICard
          title="Monthly Growth Rate"
          value={monthlyGrowthRate.value || "12.3%"}
          change={monthlyGrowthRate.change}
          icon={<TrendingUp className="w-5 h-5 text-green-500" />}
          iconBgColor="bg-green-500/10"
          testId="kpi-monthly-growth-rate"
        />
        
        <KPICard
          title="Market Share"
          value={marketShare.value || "23.7%"}
          change={marketShare.change}
          icon={<Globe className="w-5 h-5 text-blue-500" />}
          iconBgColor="bg-blue-500/10"
          testId="kpi-market-share"
        />
        
        <KPICard
          title="Revenue Growth"
          value={revenueGrowth.value || "28.4%"}
          change={revenueGrowth.change}
          icon={<Rocket className="w-5 h-5 text-purple-500" />}
          iconBgColor="bg-purple-500/10"
          testId="kpi-revenue-growth"
        />
      </div>

      {/* Growth Chart */}
      <ChartCard
        title="Growth Metrics Overview"
        hasFilter={true}
        filterOptions={["Last 6 months", "Last year", "Last 2 years"]}
        testId="chart-growth-metrics-overview"
      >
        <InteractiveChart
          type="line"
          data={growthData}
          testId="chart-growth-interactive"
        />
      </ChartCard>
    </div>
  );
}