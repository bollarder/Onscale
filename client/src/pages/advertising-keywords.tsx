import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Search, Upload } from "lucide-react";

export default function AdvertisingKeywords() {
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
            <h1 className="text-2xl font-bold text-foreground" data-testid="text-keywords-page-title">
              Keyword Optimization
            </h1>
            <p className="text-muted-foreground" data-testid="text-keywords-description">
              Optimize keywords for better performance
            </p>
          </div>
        </div>
        <Button data-testid="button-import-keywords">
          <Upload className="w-4 h-4 mr-2" />
          Import Keywords
        </Button>
      </div>

      {/* Placeholder Content */}
      <Card data-testid="card-keywords-placeholder">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-placeholder-title">
            Keyword Optimization Coming Soon
          </h3>
          <p className="text-muted-foreground mb-6" data-testid="text-placeholder-description">
            This section will provide powerful keyword management and optimization tools to improve your campaign performance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="text-center" data-testid="feature-keyword-research">
              <div className="font-medium">Keyword Research</div>
              <div>Discover new opportunities</div>
            </div>
            <div className="text-center" data-testid="feature-bid-optimization">
              <div className="font-medium">Bid Optimization</div>
              <div>Automated bid management</div>
            </div>
            <div className="text-center" data-testid="feature-negative-keywords">
              <div className="font-medium">Negative Keywords</div>
              <div>Filter unwanted traffic</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}