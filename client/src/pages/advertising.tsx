import { useQuery } from "@tanstack/react-query";
import { KPICard } from "@/components/kpi-card";
import { ChartCard } from "@/components/chart-card";
import { Eye, MousePointer, DollarSign, TrendingUp } from "lucide-react";
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
    ctx.fillText('Advertising Chart', 20, 40);
  }
};

export default function Advertising() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["/api/metrics/advertising"]
  });

  const adSpendChartRef = useRef<HTMLCanvasElement>(null);
  const campaignChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (adSpendChartRef.current) {
      createChart(adSpendChartRef.current, {});
    }
  }, []);

  useEffect(() => {
    if (campaignChartRef.current) {
      createChart(campaignChartRef.current, {});
    }
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-card rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const getMetricValue = (name: string) => {
    return Array.isArray(metrics) ? metrics.find((m: any) => m.metricName === name) || {} : {};
  };

  const totalImpressions = getMetricValue("totalImpressions");
  const clickThroughRate = getMetricValue("clickThroughRate");
  const costPerClick = getMetricValue("costPerClick");
  const roas = getMetricValue("roas");

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <KPICard
          title="Total Impressions"
          value={totalImpressions.value || "2.4M"}
          change={totalImpressions.change}
          icon={<Eye className="w-5 h-5 text-blue-500" />}
          iconBgColor="bg-blue-500/10"
          testId="kpi-total-impressions"
        />
        
        <KPICard
          title="Click-through Rate"
          value={clickThroughRate.value || "3.24%"}
          change={clickThroughRate.change}
          icon={<MousePointer className="w-5 h-5 text-green-500" />}
          iconBgColor="bg-green-500/10"
          testId="kpi-click-through-rate"
        />
        
        <KPICard
          title="Cost Per Click"
          value={costPerClick.value || "$0.82"}
          change={costPerClick.change}
          icon={<DollarSign className="w-5 h-5 text-amber-500" />}
          iconBgColor="bg-amber-500/10"
          testId="kpi-cost-per-click"
        />
        
        <KPICard
          title="ROAS"
          value={roas.value || "4.2x"}
          change={roas.change}
          icon={<TrendingUp className="w-5 h-5 text-purple-500" />}
          iconBgColor="bg-purple-500/10"
          testId="kpi-roas"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Ad Spend vs Revenue"
          hasFilter={true}
          testId="chart-ad-spend-revenue"
        >
          <div className="h-80">
            <canvas ref={adSpendChartRef} className="w-full h-full" data-testid="canvas-ad-spend-chart" />
          </div>
        </ChartCard>
        
        <ChartCard
          title="Campaign Performance"
          hasFilter={true}
          testId="chart-campaign-performance"
        >
          <div className="h-80">
            <canvas ref={campaignChartRef} className="w-full h-full" data-testid="canvas-campaign-chart" />
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
