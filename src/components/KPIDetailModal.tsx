import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { TrendingUp, TrendingDown, Lightbulb } from "lucide-react";

interface KPIDetailData {
  title: string;
  value: string;
  change: string;
  details: { label: string; value: string }[];
  insights: string[];
}

interface KPIDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: KPIDetailData | null;
  isPositive: boolean;
}

export function KPIDetailModal({ open, onOpenChange, data, isPositive }: KPIDetailModalProps) {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{data.title}</DialogTitle>
          <DialogDescription>
            Detailed metrics and insights for {data.title.toLowerCase()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Value */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl text-gray-900 mb-2">{data.value}</p>
              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${
                isPositive ? 'bg-[#00A859]/10 text-[#00A859]' : 'bg-[#FF6B6B]/10 text-[#FF6B6B]'
              }`}>
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{data.change}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Details Grid */}
          <div>
            <h4 className="text-sm text-gray-500 mb-3">Detailed Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              {data.details.map((detail, index) => (
                <div 
                  key={index}
                  className="p-3 rounded-lg bg-gray-50 border border-gray-100"
                >
                  <p className="text-sm text-gray-500 mb-1">{detail.label}</p>
                  <p className="text-gray-900">{detail.value}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Insights */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-[#BFFF00]" />
              <h4 className="text-sm text-gray-500">Key Insights</h4>
            </div>
            <div className="space-y-2">
              {data.insights.map((insight, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-2 p-3 rounded-lg bg-[#003C78]/5"
                >
                  <Badge 
                    variant="outline" 
                    className="mt-0.5 h-5 w-5 p-0 flex items-center justify-center rounded-full border-[#003C78]/20"
                  >
                    {index + 1}
                  </Badge>
                  <p className="text-sm text-gray-700 flex-1">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
