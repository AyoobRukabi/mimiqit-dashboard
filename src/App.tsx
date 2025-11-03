import { DashboardHeader } from "./components/DashboardHeader";
import { FilterSidebar } from "./components/FilterSidebar";
import { KPIGrid } from "./components/KPIGrid";
import { PredictiveInsights } from "./components/PredictiveInsights";
import { ChartsSection } from "./components/ChartsSection";
import { AddClassModal } from "./components/AddClassModal";
import { FilterProvider } from "./lib/FilterContext";
import { Toaster } from "./components/ui/sonner";
import { useState } from "react";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addClassOpen, setAddClassOpen] = useState(false);

  return (
    <FilterProvider>
      <div className="min-h-screen bg-white">
        <DashboardHeader 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onAddClass={() => setAddClassOpen(true)}
        />
        
        <div className="flex">
          <FilterSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          <main className="flex-1 p-4 md:p-8 w-full">
            <div className="max-w-[1400px] mx-auto space-y-6">
              <KPIGrid />
              <PredictiveInsights />
              <ChartsSection />
            </div>
          </main>
        </div>

        <AddClassModal open={addClassOpen} onOpenChange={setAddClassOpen} />
        <Toaster position="top-right" />
      </div>
    </FilterProvider>
  );
}
