import { useQuery } from "@tanstack/react-query";
import { KPICard } from "@/components/kpi-card";
import { ChartCard } from "@/components/chart-card";
import { InteractiveChart } from "@/components/interactive-chart";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";


export default function Cashflow() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["/api/metrics/cashflow"]
  });

  // Sample cash flow chart data
  const cashflowData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Cash Inflow',
        data: [847000, 920000, 780000, 890000, 950000, 1020000, 880000, 940000, 1050000, 980000, 1100000, 1200000],
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        fill: true
      },
      {
        label: 'Cash Outflow',
        data: [624000, 680000, 590000, 650000, 720000, 760000, 640000, 700000, 780000, 730000, 820000, 850000],
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        fill: true
      }
    ]
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
        <InteractiveChart
          type="line"
          data={cashflowData}
          testId="chart-cashflow"
        />
      </ChartCard>
    </div>
  );
}
