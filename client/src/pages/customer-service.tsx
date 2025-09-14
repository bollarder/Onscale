import { useQuery } from "@tanstack/react-query";
import { KPICard } from "@/components/kpi-card";
import { ChartCard } from "@/components/chart-card";
import { InteractiveChart } from "@/components/interactive-chart";
import { Smile, Clock, Ticket, CheckCircle } from "lucide-react";

export default function CustomerService() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["/api/metrics/customer-service"]
  });

  // Sample customer service chart data
  const ticketVolumeData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Tickets Created',
      data: [65, 85, 92, 78, 95, 45, 32],
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 2
    }, {
      label: 'Tickets Resolved',
      data: [58, 78, 88, 82, 89, 48, 35],
      backgroundColor: 'rgba(16, 185, 129, 0.8)',
      borderColor: 'rgba(16, 185, 129, 1)',
      borderWidth: 2
    }]
  };

  const issueCategoriesData = {
    labels: ['Technical', 'Billing', 'Account', 'Product', 'General'],
    datasets: [{
      data: [35, 25, 20, 15, 5],
      backgroundColor: [
        'rgba(239, 68, 68, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(139, 92, 246, 0.8)'
      ]
    }]
  };

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
          <InteractiveChart
            type="bar"
            data={ticketVolumeData}
            testId="chart-ticket-volume"
          />
        </ChartCard>
        
        <ChartCard
          title="Issue Categories"
          testId="chart-issue-categories"
        >
          <InteractiveChart
            type="pie"
            data={issueCategoriesData}
            testId="chart-issue-categories"
          />
        </ChartCard>
      </div>
    </div>
  );
}