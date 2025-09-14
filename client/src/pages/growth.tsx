import { useQuery } from "@tanstack/react-query";
import { KPICard } from "@/components/kpi-card";
import { ChartCard } from "@/components/chart-card";
import { InteractiveChart } from "@/components/interactive-chart";
import { TrendingUp, Globe, Rocket } from "lucide-react";

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