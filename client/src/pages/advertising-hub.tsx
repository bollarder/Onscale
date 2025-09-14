import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChartCard } from "@/components/chart-card";
import { InteractiveChart } from "@/components/interactive-chart";
import { ArrowRight, Target, BarChart3, Search, TrendingUp } from "lucide-react";

export default function AdvertisingHub() {
  // Sample ROAS trend data for overview
  const roasTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'ROAS',
      data: [3.2, 3.8, 4.1, 3.9, 4.2, 4.5],
      borderColor: 'rgba(16, 185, 129, 1)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.3
    }]
  };

  // Sample top campaigns data
  const topCampaigns = [
    { name: "Premium Watch Collection", roas: 580, spend: "₩2.1M", status: "above" },
    { name: "Summer Fashion Sale", roas: 420, spend: "₩1.8M", status: "above" },
    { name: "Tech Gadgets Promo", roas: 380, spend: "₩1.2M", status: "above" },
    { name: "Holiday Special", roas: 250, spend: "₩0.9M", status: "below" },
    { name: "New Arrivals", roas: 180, spend: "₩0.6M", status: "below" }
  ];

  return (
    <div className="space-y-8">
      {/* Hub Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Campaigns Card */}
        <Link href="/advertising/campaigns">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 group" data-testid="card-campaigns">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-red-500" />
                </div>
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-campaigns-title">
                Campaigns
              </h3>
              <div className="space-y-1 text-sm text-muted-foreground mb-4">
                <p data-testid="text-campaigns-stats">23 active, 18 above target</p>
                <p data-testid="text-campaigns-spend">₩8.4M spend</p>
              </div>
              <div className="w-full flex justify-between items-center text-sm group-hover:text-primary" data-testid="link-manage-campaigns">
                <span>Manage Campaigns</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Channels Card */}
        <Link href="/advertising/channels">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 group" data-testid="card-channels">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-500" />
                </div>
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-channels-title">
                Channels
              </h3>
              <div className="space-y-1 text-sm text-muted-foreground mb-4">
                <p data-testid="text-channels-stats">Google 420%, Facebook 180%</p>
                <p data-testid="text-channels-naver">Naver 280% ROAS</p>
              </div>
              <div className="w-full flex justify-between items-center text-sm group-hover:text-primary" data-testid="link-analyze-channels">
                <span>Analyze Channels</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Keywords Card */}
        <Link href="/advertising/keywords">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 group" data-testid="card-keywords">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Search className="w-6 h-6 text-green-500" />
                </div>
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-keywords-title">
                Keywords
              </h3>
              <div className="space-y-1 text-sm text-muted-foreground mb-4">
                <p data-testid="text-keywords-stats">2,847 active</p>
                <p data-testid="text-keywords-performers">156 top performers</p>
              </div>
              <div className="w-full flex justify-between items-center text-sm group-hover:text-primary" data-testid="link-optimize-keywords">
                <span>Optimize Keywords</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Reports Card */}
        <Link href="/advertising/reports">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 group" data-testid="card-reports">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-500" />
                </div>
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-reports-title">
                Reports
              </h3>
              <div className="space-y-1 text-sm text-muted-foreground mb-4">
                <p data-testid="text-reports-stats">+23% weekly ROI</p>
                <p data-testid="text-reports-custom">Custom reports</p>
              </div>
              <div className="w-full flex justify-between items-center text-sm group-hover:text-primary" data-testid="link-view-reports">
                <span>View Reports</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ROAS Trends */}
        <ChartCard
          title="ROAS Trends"
          className="lg:col-span-2"
          testId="chart-roas-trends"
        >
          <InteractiveChart
            type="line"
            data={roasTrendData}
            testId="chart-roas"
          />
        </ChartCard>

        {/* Budget Gauge */}
        <Card data-testid="card-budget-gauge">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6" data-testid="text-budget-title">
              Monthly Budget
            </h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground" data-testid="text-budget-used">₩8.4M</div>
                <div className="text-sm text-muted-foreground" data-testid="text-budget-total">of ₩12M used</div>
              </div>
              <Progress value={70} className="h-3" data-testid="progress-budget" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span data-testid="text-budget-remaining">₩3.6M remaining</span>
                <span data-testid="text-budget-percent">70%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Campaigns */}
      <Card data-testid="card-top-campaigns">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6" data-testid="text-top-campaigns-title">
            Top Campaigns
          </h3>
          <div className="space-y-4">
            {topCampaigns.map((campaign, index) => (
              <div key={index} className="flex items-center justify-between" data-testid={`campaign-item-${index}`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${campaign.status === 'above' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <div>
                    <p className="text-sm font-medium text-foreground" data-testid={`campaign-name-${index}`}>{campaign.name}</p>
                    <p className="text-xs text-muted-foreground" data-testid={`campaign-spend-${index}`}>{campaign.spend} spend</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${campaign.status === 'above' ? 'text-green-500' : 'text-red-500'}`} data-testid={`campaign-roas-${index}`}>
                    {campaign.roas}% ROAS
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}