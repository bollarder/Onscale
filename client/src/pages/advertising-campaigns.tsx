import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Target, Plus } from "lucide-react";

export default function AdvertisingCampaigns() {
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
            <h1 className="text-2xl font-bold text-foreground" data-testid="text-campaigns-page-title">
              Campaign Management
            </h1>
            <p className="text-muted-foreground" data-testid="text-campaigns-description">
              Manage and optimize your advertising campaigns
            </p>
          </div>
        </div>
        <Button data-testid="button-create-campaign">
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Placeholder Content */}
      <Card data-testid="card-campaigns-placeholder">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-placeholder-title">
            Campaign Management Coming Soon
          </h3>
          <p className="text-muted-foreground mb-6" data-testid="text-placeholder-description">
            This section will provide comprehensive campaign management tools including creation, editing, performance tracking, and optimization features.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="text-center" data-testid="feature-campaign-creation">
              <div className="font-medium">Campaign Creation</div>
              <div>Build targeted campaigns</div>
            </div>
            <div className="text-center" data-testid="feature-performance-tracking">
              <div className="font-medium">Performance Tracking</div>
              <div>Monitor campaign metrics</div>
            </div>
            <div className="text-center" data-testid="feature-optimization">
              <div className="font-medium">Optimization</div>
              <div>AI-powered suggestions</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}