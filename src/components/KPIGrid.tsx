import { TrendingUp, TrendingDown, Users, Euro, XCircle, RotateCcw, UserPlus, Award } from "lucide-react";
import { Card } from "./ui/card";
import { motion } from "motion/react";
import { useState } from "react";
import { KPIDetailModal } from "./KPIDetailModal";
import { getKPIDetails, generateKPIData } from "../lib/mockData";
import { useFilters } from "../lib/FilterContext";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  isNegativeGood?: boolean;
  icon: React.ReactNode;
  index: number;
  kpiType: string;
}

function KPICard({ title, value, change, isPositive, isNegativeGood = false, icon, index, kpiType }: KPICardProps) {
  const [detailOpen, setDetailOpen] = useState(false);
  const { filters } = useFilters();
  
  const showPositive = isNegativeGood ? !isPositive : isPositive;
  const detailData = getKPIDetails(kpiType, filters);
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        onClick={() => setDetailOpen(true)}
        className="cursor-pointer"
      >
        <Card className="p-4 md:p-6 rounded-2xl border-gray-100 hover:shadow-lg transition-all hover:scale-105">
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div className="p-2 md:p-3 rounded-xl bg-[#003C78]/5">
              {icon}
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs md:text-sm ${
              showPositive ? 'bg-[#00A859]/10 text-[#00A859]' : 'bg-[#FF6B6B]/10 text-[#FF6B6B]'
            }`}>
              {showPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{change}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-2xl md:text-3xl text-gray-900">{value}</p>
            <p className="text-sm md:text-base text-gray-500">{title}</p>
          </div>
        </Card>
      </motion.div>

      <KPIDetailModal
        open={detailOpen}
        onOpenChange={setDetailOpen}
        data={detailData}
        isPositive={showPositive}
      />
    </>
  );
}

export function KPIGrid() {
  const { filters } = useFilters();
  const data = generateKPIData(filters);

  const kpis = [
    {
      title: "Revenue Today",
      value: `€${data.revenue.toLocaleString()}`,
      change: `↑ ${data.revenueChange}%`,
      isPositive: true,
      icon: <Euro className="w-5 h-5 text-[#003C78]" />,
      kpiType: "revenue"
    },
    {
      title: "Attendance Rate",
      value: `${data.attendance}%`,
      change: `↑ ${data.attendanceChange}%`,
      isPositive: true,
      icon: <Users className="w-5 h-5 text-[#003C78]" />,
      kpiType: "attendance"
    },
    {
      title: "Cancellations",
      value: `${data.cancellations}`,
      change: `↓ ${data.cancellationsChange}%`,
      isPositive: false,
      isNegativeGood: true,
      icon: <XCircle className="w-5 h-5 text-[#003C78]" />,
      kpiType: "cancellations"
    },
    {
      title: "Returning Users",
      value: `${data.returningUsers}%`,
      change: `↑ ${data.returningChange}%`,
      isPositive: true,
      icon: <RotateCcw className="w-5 h-5 text-[#003C78]" />,
      kpiType: "returning"
    },
    {
      title: "New Clients",
      value: `${data.newClients}`,
      change: `↑ ${data.newClientsChange}%`,
      isPositive: true,
      icon: <UserPlus className="w-5 h-5 text-[#003C78]" />,
      kpiType: "newclients"
    },
    {
      title: "Top Instructor",
      value: data.topInstructor,
      change: `${data.fillRate}% fill`,
      isPositive: true,
      icon: <Award className="w-5 h-5 text-[#003C78]" />,
      kpiType: "instructor"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {kpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} index={index} />
      ))}
    </div>
  );
}
