import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { KPICard } from "@/components/kpi-card";
import { ChartCard } from "@/components/chart-card";
import { DollarSign, Users, ShoppingBag, TrendingUp, ShoppingCart, UserPlus, AlertTriangle } from "lucide-react";
import { useEffect, useRef } from "react";

// Mock Chart.js implementation for demonstration
const createChart = (canvasRef: HTMLCanvasElement, config: any) => {
  if (!canvasRef) return;
  
  // This is a placeholder - in a real app, you'd use Chart.js
  const ctx = canvasRef.getContext('2d');
  if (ctx) {
    ctx.fillStyle = 'hsl(217 91% 60%)';
    ctx.fillRect(10, 10, 100, 50);
    ctx.fillStyle = 'hsl(210 40% 98%)';
    ctx.font = '12px Inter';
    ctx.fillText('Chart Placeholder', 20, 40);
  }
};

export default function Dashboard() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["/api/metrics/dashboard"]
  });

  const { data: chartData } = useQuery({
    queryKey: ["/api/charts/dashboard"]
  });

  const revenueChartRef = useRef<HTMLCanvasElement>(null);
  const performanceChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (revenueChartRef.current && chartData) {
      createChart(revenueChartRef.current, {});
    }
  }, [chartData]);

  useEffect(() => {
    if (performanceChartRef.current && chartData) {
      createChart(performanceChartRef.current, {});
    }
  }, [chartData]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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

  const totalRevenue = getMetricValue("totalRevenue");
  const activeCustomers = getMetricValue("activeCustomers");
  const totalOrders = getMetricValue("totalOrders");
  const conversionRate = getMetricValue("conversionRate");

  return (
    <div className="space-y-8">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value={totalRevenue.value || "$2.4M"}
          change={totalRevenue.change}
          icon={<DollarSign className="w-5 h-5 text-primary" />}
          iconBgColor="bg-primary/10"
          progress={75}
          progressColor="bg-primary"
          testId="kpi-total-revenue"
        />
        
        <KPICard
          title="Active Customers"
          value={activeCustomers.value || "45,231"}
          change={activeCustomers.change}
          icon={<Users className="w-5 h-5 text-green-500" />}
          iconBgColor="bg-green-500/10"
          progress={68}
          progressColor="bg-green-500"
          testId="kpi-active-customers"
        />
        
        <KPICard
          title="Total Orders"
          value={totalOrders.value || "12,847"}
          change={totalOrders.change}
          icon={<ShoppingBag className="w-5 h-5 text-amber-500" />}
          iconBgColor="bg-amber-500/10"
          progress={82}
          progressColor="bg-amber-500"
          testId="kpi-total-orders"
        />
        
        <KPICard
          title="Conversion Rate"
          value={conversionRate.value || "3.24%"}
          change={conversionRate.change}
          icon={<TrendingUp className="w-5 h-5 text-red-500" />}
          iconBgColor="bg-red-500/10"
          progress={32}
          progressColor="bg-red-500"
          testId="kpi-conversion-rate"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <ChartCard
          title="Revenue Trend"
          hasFilter={true}
          className="xl:col-span-2"
          testId="chart-revenue-trend"
        >
          <div className="h-80">
            <canvas ref={revenueChartRef} className="w-full h-full" data-testid="canvas-revenue-chart" />
          </div>
        </ChartCard>
        
        <Card data-testid="card-top-products">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6" data-testid="text-top-products-title">
              Top Products
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between" data-testid="item-product-1">
                <div className="flex items-center space-x-3">
                  <img 
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                    alt="Smart Watch Pro" 
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground" data-testid="text-product-name-1">Smart Watch Pro</p>
                    <p className="text-xs text-muted-foreground" data-testid="text-product-sales-1">2,847 sales</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground" data-testid="text-product-revenue-1">$284K</p>
              </div>
              
              <div className="flex items-center justify-between" data-testid="item-product-2">
                <div className="flex items-center space-x-3">
                  <img 
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                    alt="Wireless Headphones" 
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground" data-testid="text-product-name-2">Wireless Headphones</p>
                    <p className="text-xs text-muted-foreground" data-testid="text-product-sales-2">1,923 sales</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground" data-testid="text-product-revenue-2">$192K</p>
              </div>
              
              <div className="flex items-center justify-between" data-testid="item-product-3">
                <div className="flex items-center space-x-3">
                  <img 
                    src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                    alt="Gaming Laptop" 
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground" data-testid="text-product-name-3">Gaming Laptop</p>
                    <p className="text-xs text-muted-foreground" data-testid="text-product-sales-3">892 sales</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground" data-testid="text-product-revenue-3">$178K</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card data-testid="card-recent-activity">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6" data-testid="text-recent-activity-title">
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3" data-testid="activity-item-1">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <ShoppingCart className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground" data-testid="text-activity-description-1">New order #12847 received</p>
                  <p className="text-xs text-muted-foreground" data-testid="text-activity-time-1">2 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3" data-testid="activity-item-2">
                <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <UserPlus className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground" data-testid="text-activity-description-2">New customer registered</p>
                  <p className="text-xs text-muted-foreground" data-testid="text-activity-time-2">5 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3" data-testid="activity-item-3">
                <div className="w-8 h-8 bg-amber-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground" data-testid="text-activity-description-3">Low inventory alert for Smart Watch Pro</p>
                  <p className="text-xs text-muted-foreground" data-testid="text-activity-time-3">15 minutes ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <ChartCard
          title="Performance Metrics"
          testId="chart-performance-metrics"
        >
          <div className="h-64">
            <canvas ref={performanceChartRef} className="w-full h-full" data-testid="canvas-performance-chart" />
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
