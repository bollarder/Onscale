import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import DashboardLayout from "@/components/dashboard-layout";
import Dashboard from "@/pages/dashboard";
import Ecommerce from "@/pages/ecommerce";
import AdvertisingHub from "@/pages/advertising-hub";
import AdvertisingPerformance from "@/pages/advertising-performance";
import AdvertisingCampaigns from "@/pages/advertising-campaigns";
import AdvertisingChannels from "@/pages/advertising-channels";
import AdvertisingKeywords from "@/pages/advertising-keywords";
import AdvertisingReports from "@/pages/advertising-reports";
import MarketingHub from "@/pages/marketing-hub";
import MarketingPositioning from "@/pages/marketing-positioning";
import MarketingPricing from "@/pages/marketing-pricing";
import MarketingIntelligence from "@/pages/marketing-intelligence";
import MarketingStrategy from "@/pages/marketing-strategy";
import Cashflow from "@/pages/cashflow";
import CashFlow from "@/pages/cash-flow";
import CustomerService from "@/pages/customer-service";
import CustomerAnalytics from "@/pages/customer-analytics";
import Growth from "@/pages/growth";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <DashboardLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/ecommerce" component={Ecommerce} />
        <Route path="/advertising" component={AdvertisingHub} />
        <Route path="/advertising/performance" component={AdvertisingPerformance} />
        <Route path="/advertising/campaigns" component={AdvertisingCampaigns} />
        <Route path="/advertising/channels" component={AdvertisingChannels} />
        <Route path="/advertising/keywords" component={AdvertisingKeywords} />
        <Route path="/advertising/reports" component={AdvertisingReports} />
        <Route path="/marketing" component={MarketingHub} />
        <Route path="/marketing/positioning" component={MarketingPositioning} />
        <Route path="/marketing/pricing" component={MarketingPricing} />
        <Route path="/marketing/intelligence" component={MarketingIntelligence} />
        <Route path="/marketing/strategy" component={MarketingStrategy} />
        <Route path="/cashflow" component={Cashflow} />
        <Route path="/cash-flow" component={CashFlow} />
        <Route path="/customer-service" component={CustomerService} />
        <Route path="/customer-analytics" component={CustomerAnalytics} />
        <Route path="/growth" component={Growth} />
        <Route component={NotFound} />
      </Switch>
    </DashboardLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
