import { useQuery } from "@tanstack/react-query";
import { KPICard } from "@/components/kpi-card";
import { ChartCard } from "@/components/chart-card";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
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
    ctx.fillText('Cash Flow Chart', 20, 40);
  }
};

export default function Cashflow() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["/api/metrics/cashflow"]
  });

  const cashflowChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (cashflowChartRef.current) {
      createChart(cashflowChartRef.current, {});
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

  const cashInflow = getMetricValue("cashInflow");
  const cashOutflow = getMetricValue("cashOutflow");
  const netCashFlow = getMetricValue("netCashFlow");

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <KPICard
          title="Cash Inflow"
          value={cashInflow.value || "$847K"}
          change={cashInflow.change}
          icon={<TrendingDown className="w-5 h-5 text-green-500" />}
          iconBgColor="bg-green-500/10"
          testId="kpi-cash-inflow"
        />
        
        <KPICard
          title="Cash Outflow"
          value={cashOutflow.value || "$624K"}
          change={cashOutflow.change}
          icon={<TrendingUp className="w-5 h-5 text-red-500" />}
          iconBgColor="bg-red-500/10"
          testId="kpi-cash-outflow"
        />
        
        <KPICard
          title="Net Cash Flow"
          value={netCashFlow.value || "$223K"}
          change={netCashFlow.change}
          icon={<Wallet className="w-5 h-5 text-blue-500" />}
          iconBgColor="bg-blue-500/10"
          testId="kpi-net-cash-flow"
        />
      </div>

      {/* Cash Flow Chart */}
      <ChartCard
        title="Cash Flow Trend"
        hasFilter={true}
        filterOptions={["Last 30 days", "Last 90 days", "Last 6 months", "Last year"]}
        testId="chart-cash-flow-trend"
      >
        <div className="h-96">
          <canvas ref={cashflowChartRef} className="w-full h-full" data-testid="canvas-cashflow-chart" />
        </div>
      </ChartCard>
    </div>
  );
}
