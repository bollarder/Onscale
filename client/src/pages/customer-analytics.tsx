import { useQuery } from "@tanstack/react-query";
import { KPICard } from "@/components/kpi-card";
import { ChartCard } from "@/components/chart-card";
import { InteractiveChart } from "@/components/interactive-chart";
import { UserPlus, RotateCcw, PieChart, Heart } from "lucide-react";


export default function CustomerAnalytics() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["/api/metrics/customer-analytics"]
  });

  // Sample customer analytics chart data
  const acquisitionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'New Customers',
      data: [1247, 1580, 1320, 1890, 2100, 1950],
      borderColor: 'rgba(59, 130, 246, 1)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true
    }]
  };

  const segmentsData = {
    labels: ['Premium', 'Standard', 'Basic', 'Trial'],
    datasets: [{
      data: [35, 45, 15, 5],
      backgroundColor: [
        'rgba(245, 158, 11, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(156, 163, 175, 0.8)'
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
          <InteractiveChart
            type="line"
            data={acquisitionData}
            testId="chart-customer-acquisition"
          />
        </ChartCard>
        
        <ChartCard
          title="Customer Segments"
          testId="chart-customer-segments"
        >
          <InteractiveChart
            type="doughnut"
            data={segmentsData}
            testId="chart-customer-segments"
          />
        </ChartCard>
      </div>
    </div>
  );
}
