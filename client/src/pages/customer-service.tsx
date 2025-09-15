import { useQuery } from "@tanstack/react-query";
import { KPICard } from "@/components/kpi-card";
import { ChartCard } from "@/components/chart-card";
import { InteractiveChart } from "@/components/interactive-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Smile, Clock, Ticket, CheckCircle, Phone, Users, RotateCcw, DollarSign, ArrowRight } from "lucide-react";

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
      {/* Customer Intelligence Hub Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer" data-testid="card-service-performance">
          <Link href="/customer-service/performance">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-500" />
                </div>
                <CardTitle className="text-lg">서비스 성과</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>📞 4.2/5 만족도</p>
                <p>⏱️ 4.2시간 평균 응답</p>
                <p>✅ 78% 해결률</p>
              </div>
              <Button variant="ghost" className="w-full mt-4 text-blue-600 hover:text-blue-700" data-testid="button-view-performance">
                성과 보기 <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer" data-testid="card-customer-behavior">
          <Link href="/customer-service/behavior">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Users className="w-5 h-5 text-green-500" />
                </div>
                <CardTitle className="text-lg">고객 행동</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>👥 인구통계별 분석</p>
                <p>⏰ 시간별 문의 패턴</p>
                <p>📊 주제별 분포</p>
              </div>
              <Button variant="ghost" className="w-full mt-4 text-green-600 hover:text-green-700" data-testid="button-view-behavior">
                행동 분석 <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer" data-testid="card-customer-lifecycle">
          <Link href="/customer-service/lifecycle">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <RotateCcw className="w-5 h-5 text-purple-500" />
                </div>
                <CardTitle className="text-lg">고객 생애주기</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>🔄 신규 고객 분석</p>
                <p>🔁 재구매자 패턴</p>
                <p>📈 제품별 재구매율</p>
              </div>
              <Button variant="ghost" className="w-full mt-4 text-purple-600 hover:text-purple-700" data-testid="button-view-lifecycle">
                생애주기 추적 <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer" data-testid="card-business-impact">
          <Link href="/customer-service/impact">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <DollarSign className="w-5 h-5 text-amber-500" />
                </div>
                <CardTitle className="text-lg">비즈니스 임팩트</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>💰 평균 객단가 분석</p>
                <p>📊 고객 생애가치</p>
                <p>📈 비즈니스 지표</p>
              </div>
              <Button variant="ghost" className="w-full mt-4 text-amber-600 hover:text-amber-700" data-testid="button-view-impact">
                임팩트 보기 <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Link>
        </Card>
      </div>

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