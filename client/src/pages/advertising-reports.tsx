import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, TrendingUp, Download } from "lucide-react";

export default function AdvertisingReports() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/advertising">
            <Button variant="ghost" size="icon" data-testid="button-back-to-hub">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground" data-testid="text-reports-page-title">
              Advertising Reports
            </h1>
            <p className="text-muted-foreground" data-testid="text-reports-description">
              Generate and view custom advertising reports
            </p>
          </div>
        </div>
        <Button data-testid="button-download-report">
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
      </div>

      {/* Placeholder Content */}
      <Card data-testid="card-reports-placeholder">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-placeholder-title">
            Advanced Reports Coming Soon
          </h3>
          <p className="text-muted-foreground mb-6" data-testid="text-placeholder-description">
            This section will provide comprehensive reporting tools with custom dashboards, scheduled reports, and advanced analytics.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="text-center" data-testid="feature-custom-reports">
              <div className="font-medium">Custom Reports</div>
              <div>Build personalized reports</div>
            </div>
            <div className="text-center" data-testid="feature-scheduled-reports">
              <div className="font-medium">Scheduled Reports</div>
              <div>Automated report delivery</div>
            </div>
            <div className="text-center" data-testid="feature-data-visualization">
              <div className="font-medium">Data Visualization</div>
              <div>Interactive charts & graphs</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}