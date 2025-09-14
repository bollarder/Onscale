import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, BarChart3, Settings } from "lucide-react";

export default function AdvertisingChannels() {
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
            <h1 className="text-2xl font-bold text-foreground" data-testid="text-channels-page-title">
              Channel Analytics
            </h1>
            <p className="text-muted-foreground" data-testid="text-channels-description">
              Analyze performance across advertising channels
            </p>
          </div>
        </div>
        <Button data-testid="button-channel-settings">
          <Settings className="w-4 h-4 mr-2" />
          Channel Settings
        </Button>
      </div>

      {/* Placeholder Content */}
      <Card data-testid="card-channels-placeholder">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-placeholder-title">
            Channel Analytics Coming Soon
          </h3>
          <p className="text-muted-foreground mb-6" data-testid="text-placeholder-description">
            This section will provide detailed analytics for all your advertising channels including Google, Facebook, Naver, and more.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="text-center" data-testid="feature-cross-channel">
              <div className="font-medium">Cross-Channel Analysis</div>
              <div>Compare channel performance</div>
            </div>
            <div className="text-center" data-testid="feature-roas-tracking">
              <div className="font-medium">ROAS Tracking</div>
              <div>Monitor return on ad spend</div>
            </div>
            <div className="text-center" data-testid="feature-attribution">
              <div className="font-medium">Attribution Models</div>
              <div>Understand customer journey</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}