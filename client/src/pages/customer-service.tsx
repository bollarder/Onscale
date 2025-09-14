import { useQuery } from "@tanstack/react-query";
import { KPICard } from "@/components/kpi-card";
import { ChartCard } from "@/components/chart-card";
import { Smile, Clock, Ticket, CheckCircle } from "lucide-react";
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
    ctx.fillText('Service Chart', 20, 40);
  }
};

export default function CustomerService() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["/api/metrics/customer-service"]
  });

  const ticketVolumeChartRef = useRef<HTMLCanvasElement>(null);
  const issueCategoriesChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ticketVolumeChartRef.current) {
      createChart(ticketVolumeChartRef.current, {});
    }
  }, []);

  useEffect(() => {
    if (issueCategoriesChartRef.current) {
      createChart(issueCategoriesChartRef.current, {});
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

  const customerSatisfaction = getMetricValue("customerSatisfaction");
  const avgResponseTime = getMetricValue("avgResponseTime");
  const openTickets = getMetricValue("openTickets");
  const resolutionRate = getMetricValue("resolutionRate");

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <KPICard
          title="Customer Satisfaction"
          value={customerSatisfaction.value || "4.8/5"}
          change={customerSatisfaction.change}
          icon={<Smile className="w-5 h-5 text-green-500" />}
          iconBgColor="bg-green-500/10"
          testId="kpi-customer-satisfaction"
        />
        
        <KPICard
          title="Avg Response Time"
          value={avgResponseTime.value || "2.3h"}
          change={avgResponseTime.change}
          icon={<Clock className="w-5 h-5 text-blue-500" />}
          iconBgColor="bg-blue-500/10"
          testId="kpi-avg-response-time"
        />
        
        <KPICard
          title="Open Tickets"
          value={openTickets.value || "127"}
          change={openTickets.change}
          icon={<Ticket className="w-5 h-5 text-amber-500" />}
          iconBgColor="bg-amber-500/10"
          testId="kpi-open-tickets"
        />
        
        <KPICard
          title="Resolution Rate"
          value={resolutionRate.value || "94.2%"}
          change={resolutionRate.change}
          icon={<CheckCircle className="w-5 h-5 text-purple-500" />}
          iconBgColor="bg-purple-500/10"
          testId="kpi-resolution-rate"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Ticket Volume"
          hasFilter={true}
          testId="chart-ticket-volume"
        >
          <div className="h-80">
            <canvas ref={ticketVolumeChartRef} className="w-full h-full" data-testid="canvas-ticket-volume-chart" />
          </div>
        </ChartCard>
        
        <ChartCard
          title="Issue Categories"
          testId="chart-issue-categories"
        >
          <div className="h-80">
            <canvas ref={issueCategoriesChartRef} className="w-full h-full" data-testid="canvas-issue-categories-chart" />
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
