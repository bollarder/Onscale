import { useQuery } from "@tanstack/react-query";
import { KPICard } from "@/components/kpi-card";
import { ChartCard } from "@/components/chart-card";
import { UserPlus, RotateCcw, PieChart, Heart } from "lucide-react";
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
    ctx.fillText('Customer Chart', 20, 40);
  }
};

export default function CustomerAnalytics() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["/api/metrics/customer-analytics"]
  });

  const acquisitionChartRef = useRef<HTMLCanvasElement>(null);
  const segmentsChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (acquisitionChartRef.current) {
      createChart(acquisitionChartRef.current, {});
    }
  }, []);

  useEffect(() => {
    if (segmentsChartRef.current) {
      createChart(segmentsChartRef.current, {});
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

  const newCustomers = getMetricValue("newCustomers");
  const customerRetention = getMetricValue("customerRetention");
  const avgOrderValue = getMetricValue("avgOrderValue");
  const customerLifetimeValue = getMetricValue("customerLifetimeValue");

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <KPICard
          title="New Customers"
          value={newCustomers.value || "1,247"}
          change={newCustomers.change}
          icon={<UserPlus className="w-5 h-5 text-blue-500" />}
          iconBgColor="bg-blue-500/10"
          testId="kpi-new-customers"
        />
        
        <KPICard
          title="Customer Retention"
          value={customerRetention.value || "87.3%"}
          change={customerRetention.change}
          icon={<RotateCcw className="w-5 h-5 text-green-500" />}
          iconBgColor="bg-green-500/10"
          testId="kpi-customer-retention"
        />
        
        <KPICard
          title="Avg Order Value"
          value={avgOrderValue.value || "$187"}
          change={avgOrderValue.change}
          icon={<PieChart className="w-5 h-5 text-amber-500" />}
          iconBgColor="bg-amber-500/10"
          testId="kpi-avg-order-value"
        />
        
        <KPICard
          title="Customer Lifetime Value"
          value={customerLifetimeValue.value || "$2,347"}
          change={customerLifetimeValue.change}
          icon={<Heart className="w-5 h-5 text-purple-500" />}
          iconBgColor="bg-purple-500/10"
          testId="kpi-customer-lifetime-value"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Customer Acquisition"
          hasFilter={true}
          testId="chart-customer-acquisition"
        >
          <div className="h-80">
            <canvas ref={acquisitionChartRef} className="w-full h-full" data-testid="canvas-customer-acquisition-chart" />
          </div>
        </ChartCard>
        
        <ChartCard
          title="Customer Segments"
          testId="chart-customer-segments"
        >
          <div className="h-80">
            <canvas ref={segmentsChartRef} className="w-full h-full" data-testid="canvas-customer-segments-chart" />
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
