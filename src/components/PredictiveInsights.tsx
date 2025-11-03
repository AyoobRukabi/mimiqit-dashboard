import { Sparkles, AlertTriangle, TrendingUp } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "motion/react";

interface InsightProps {
  icon: React.ReactNode;
  text: string;
  action?: string;
  type: 'forecast' | 'alert' | 'opportunity';
  index: number;
}

function InsightItem({ icon, text, action, type, index }: InsightProps) {
  const bgColors = {
    forecast: 'bg-[#003C78]/5',
    alert: 'bg-[#FF6B6B]/10',
    opportunity: 'bg-[#BFFF00]/20'
  };

  const iconColors = {
    forecast: 'text-[#003C78]',
    alert: 'text-[#FF6B6B]',
    opportunity: 'text-[#00A859]'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl ${bgColors[type]} hover:shadow-md transition-shadow`}
    >
      <div className={`mt-0.5 ${iconColors[type]}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm md:text-base text-gray-900">{text}</p>
        {action && (
          <Button variant="link" className="h-auto p-0 text-[#003C78] hover:text-[#003C78]/80 mt-1 text-sm">
            {action} →
          </Button>
        )}
      </div>
    </motion.div>
  );
}

export function PredictiveInsights() {
  const insights = [
    {
      icon: <Sparkles className="w-4 h-4 md:w-5 md:h-5" />,
      text: "Yoga class attendance expected +10% next week based on booking trends",
      action: "Add Extra Session",
      type: 'forecast' as const
    },
    {
      icon: <AlertTriangle className="w-4 h-4 md:w-5 md:h-5" />,
      text: "3 members inactive for 14 days – consider sending re-engagement offer",
      action: "View Members",
      type: 'alert' as const
    },
    {
      icon: <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />,
      text: "Morning classes show 25% higher retention – promote time slots",
      action: "Promote Instructor",
      type: 'opportunity' as const
    }
  ];

  return (
    <Card className="p-4 md:p-6 rounded-2xl border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-[#BFFF00]" />
        <h2 className="text-gray-900">Predictive Insights</h2>
      </div>
      
      <div className="space-y-3 overflow-x-auto md:overflow-visible">
        <div className="flex md:flex-col gap-3 md:space-y-0 pb-2 md:pb-0">
          {insights.map((insight, index) => (
            <div key={index} className="min-w-[280px] md:min-w-0 flex-shrink-0 md:flex-shrink">
              <InsightItem {...insight} index={index} />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
