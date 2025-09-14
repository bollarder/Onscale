import { useQuery } from "@tanstack/react-query";
import { KPICard } from "@/components/kpi-card";
import { ChartCard } from "@/components/chart-card";
import { InteractiveChart } from "@/components/interactive-chart";
import { Eye, MousePointer, DollarSign, TrendingUp } from "lucide-react";


export default function Advertising() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["/api/metrics/advertising"]
  });

  // Sample chart data for advertising metrics
  const adSpendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Ad Spend',
        data: [12000, 15000, 18000, 16000, 20000, 24000],
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        yAxisID: 'y'
      },
      {
        label: 'Revenue',
        data: [48000, 75000, 90000, 80000, 100000, 120000],
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        yAxisID: 'y1'
      }
    ]
  };

  const campaignData = {
    labels: ['Google Ads', 'Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'YouTube'],
    datasets: [{
      label: 'Campaign Performance',
      data: [2400000, 1800000, 1200000, 800000, 600000, 900000],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)'
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
          <InteractiveChart
            type="line"
            data={adSpendData}
            options={{
              scales: {
                y: {
                  type: 'linear',
                  display: true,
                  position: 'left',
                },
                y1: {
                  type: 'linear',
                  display: true,
                  position: 'right',
                  grid: {
                    drawOnChartArea: false,
                  },
                },
              }
            }}
            testId="chart-ad-spend"
          />
        </ChartCard>
        
        <ChartCard
          title="Campaign Performance"
          hasFilter={true}
          testId="chart-campaign-performance"
        >
          <InteractiveChart
            type="doughnut"
            data={campaignData}
            testId="chart-campaign"
          />
        </ChartCard>
      </div>
    </div>
  );
}
