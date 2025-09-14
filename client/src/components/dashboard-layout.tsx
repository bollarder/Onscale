import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "./theme-provider";
import {
  Home,
  ShoppingCart,
  Megaphone,
  DollarSign,
  Headphones,
  Users,
  BarChart,
  Menu,
  X,
  Moon,
  Sun,
  Bell,
  Settings,
  MoreHorizontal
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "E-commerce Management", href: "/ecommerce", icon: ShoppingCart },
  { name: "Advertising Performance", href: "/advertising", icon: Megaphone },
  { name: "Cash Flow Management", href: "/cashflow", icon: DollarSign },
  { name: "Customer Service Analytics", href: "/customer-service", icon: Headphones },
  { name: "Customer Analytics", href: "/customer-analytics", icon: Users },
  { name: "Growth Reports", href: "/growth", icon: BarChart },
];

const sectionTitles: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'Dashboard Overview', subtitle: 'Real-time business insights and metrics' },
  '/ecommerce': { title: 'E-commerce Management', subtitle: 'Sales performance and order management' },
  '/advertising': { title: 'Advertising Performance', subtitle: 'Campaign metrics and ROI analysis' },
  '/cashflow': { title: 'Cash Flow Management', subtitle: 'Financial inflows and outflows tracking' },
  '/customer-service': { title: 'Customer Service Analytics', subtitle: 'Support metrics and satisfaction scores' },
  '/customer-analytics': { title: 'Customer Analytics', subtitle: 'Customer behavior and lifetime value' },
  '/growth': { title: 'Growth Reports', subtitle: 'Business growth metrics and trends' }
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();

  const currentSection = sectionTitles[location] || sectionTitles['/'];

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border sidebar-transition md:relative md:translate-x-0 md:z-0 ${
          sidebarOpen ? "" : "sidebar-hidden"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and Company Name */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-sidebar-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <BarChart className="w-4 h-4 text-sidebar-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-sidebar-foreground">ExecDash</h1>
                <p className="text-xs text-muted-foreground">Executive Suite</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
              data-testid="button-close-sidebar"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = location === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                  }`}
                  data-testid={`link-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="px-4 py-4 border-t border-sidebar-border">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" alt="Executive Profile" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium text-sidebar-foreground" data-testid="text-user-name">Sarah Johnson</p>
                <p className="text-xs text-muted-foreground" data-testid="text-user-role">Chief Executive Officer</p>
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-sidebar-foreground">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSidebarOpen(true)}
                data-testid="button-toggle-sidebar"
              >
                <Menu className="h-4 w-4" />
              </Button>
              <div>
                <h2 className="text-xl font-semibold text-foreground" data-testid="text-page-title">
                  {currentSection.title}
                </h2>
                <p className="text-sm text-muted-foreground" data-testid="text-page-subtitle">
                  {currentSection.subtitle}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                data-testid="button-theme-toggle"
              >
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative" data-testid="button-notifications">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </Button>
              {/* Settings */}
              <Button variant="ghost" size="icon" data-testid="button-settings">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
