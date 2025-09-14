import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import DashboardLayout from "@/components/dashboard-layout";
import Dashboard from "@/pages/dashboard";
import Ecommerce from "@/pages/ecommerce";
import Advertising from "@/pages/advertising";
import Cashflow from "@/pages/cashflow";
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
        <Route path="/advertising" component={Advertising} />
        <Route path="/cashflow" component={Cashflow} />
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
