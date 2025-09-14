import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { KPICard } from "@/components/kpi-card";
import { ChartCard } from "@/components/chart-card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
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
    ctx.fillText('E-commerce Chart', 20, 40);
  }
};

export default function Ecommerce() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["/api/metrics/ecommerce"]
  });

  const { data: chartData } = useQuery({
    queryKey: ["/api/charts/ecommerce"]
  });

  const salesChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (salesChartRef.current && chartData) {
      createChart(salesChartRef.current, {});
    }
  }, [chartData]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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

  const monthlySales = getMetricValue("monthlySales");
  const ordersProcessed = getMetricValue("ordersProcessed");
  const averageOrderValue = getMetricValue("averageOrderValue");

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <KPICard
          title="Monthly Sales"
          value={monthlySales.value || "$1.8M"}
          change={monthlySales.change}
          icon={<DollarSign className="w-5 h-5 text-primary" />}
          iconBgColor="bg-primary/10"
          progress={85}
          progressColor="bg-primary"
          testId="kpi-monthly-sales"
        />
        
        <KPICard
          title="Orders Processed"
          value={ordersProcessed.value || "8,942"}
          change={ordersProcessed.change}
          icon={<ShoppingCart className="w-5 h-5 text-green-500" />}
          iconBgColor="bg-green-500/10"
          progress={72}
          progressColor="bg-green-500"
          testId="kpi-orders-processed"
        />
        
        <KPICard
          title="Average Order Value"
          value={averageOrderValue.value || "$201.32"}
          change={averageOrderValue.change}
          icon={<TrendingUp className="w-5 h-5 text-amber-500" />}
          iconBgColor="bg-amber-500/10"
          progress={65}
          progressColor="bg-amber-500"
          testId="kpi-average-order-value"
        />
      </div>

      {/* Charts and Category Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard
          title="Sales Performance"
          hasFilter={true}
          className="lg:col-span-2"
          testId="chart-sales-performance"
        >
          <div className="h-80">
            <canvas ref={salesChartRef} className="w-full h-full" data-testid="canvas-sales-chart" />
          </div>
        </ChartCard>
        
        <Card data-testid="card-category-performance">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6" data-testid="text-category-performance-title">
              Category Performance
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground" data-testid="text-category-electronics">Electronics</span>
                  <span className="text-sm font-semibold text-foreground" data-testid="text-electronics-revenue">$1.2M</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground" data-testid="text-category-fashion">Fashion</span>
                  <span className="text-sm font-semibold text-foreground" data-testid="text-fashion-revenue">$800K</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground" data-testid="text-category-home-garden">Home & Garden</span>
                  <span className="text-sm font-semibold text-foreground" data-testid="text-home-garden-revenue">$400K</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card data-testid="card-recent-orders">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6" data-testid="text-recent-orders-title">
            Recent Orders
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="table-recent-orders">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Order ID</th>
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Customer</th>
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Product</th>
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Amount</th>
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border" data-testid="row-order-12847">
                  <td className="py-3 text-sm text-foreground" data-testid="text-order-id-12847">#12847</td>
                  <td className="py-3 text-sm text-foreground" data-testid="text-customer-john-smith">John Smith</td>
                  <td className="py-3 text-sm text-foreground" data-testid="text-product-smart-watch">Smart Watch Pro</td>
                  <td className="py-3 text-sm font-semibold text-foreground" data-testid="text-amount-299">$299.99</td>
                  <td className="py-3" data-testid="badge-delivered">
                    <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                      Delivered
                    </Badge>
                  </td>
                </tr>
                <tr className="border-b border-border" data-testid="row-order-12846">
                  <td className="py-3 text-sm text-foreground" data-testid="text-order-id-12846">#12846</td>
                  <td className="py-3 text-sm text-foreground" data-testid="text-customer-sarah-johnson">Sarah Johnson</td>
                  <td className="py-3 text-sm text-foreground" data-testid="text-product-headphones">Wireless Headphones</td>
                  <td className="py-3 text-sm font-semibold text-foreground" data-testid="text-amount-199">$199.99</td>
                  <td className="py-3" data-testid="badge-processing">
                    <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
                      Processing
                    </Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
