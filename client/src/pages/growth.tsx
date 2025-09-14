import { useQuery } from "@tanstack/react-query";
import { KPICard } from "@/components/kpi-card";
import { ChartCard } from "@/components/chart-card";
import { TrendingUp, Globe, Rocket } from "lucide-react";
import { useEffect, useRef } from "react";

// Mock Chart.js implementation
const createChart = (canvasRef: HTMLCanvasElement, config: any) => {
  if (!canvasRef) return;
  
  const ctx = canvasRef.getContext('2d');
  if (ctx) {
    ctx.fillStyle = 'hsl(217 91% 60%)';
    ctx.fillRect(10, 10, 100, 50);
    ctx.fillStyle = 'hsl(210 40% 98%)';
    ctx.font = '12px Inter';
    ctx.fillText('Growth Chart', 20, 40);
  }
};

export default function Growth() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["/api/metrics/growth"]
  });

  const growthChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (growthChartRef.current) {
      createChart(growthChartRef.current, {});
    }
  }, []);

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
        <div className="h-96">
          <canvas ref={growthChartRef} className="w-full h-full" data-testid="canvas-growth-chart" />
        </div>
      </ChartCard>
    </div>
  );
}
