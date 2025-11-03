import { Bell, Settings, User, Plus, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import mimiqitLogo from "../assets/images/mimiqit-logo.png";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  onAddClass: () => void;
}

export function DashboardHeader({ onMenuClick, onAddClass }: DashboardHeaderProps) {
  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo & Menu */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors lg:hidden"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="h-10 flex items-center">
              <img src={mimiqitLogo} alt="MimiqIt" className="h-8 w-auto" />
            </div>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button 
            onClick={onAddClass}
            className="bg-[#BFFF00] hover:bg-[#a8e600] text-gray-900 rounded-full gap-2 h-9 md:h-10"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add New Class</span>
            <span className="sm:hidden">Add</span>
          </Button>
          
          <button className="p-2 hover:bg-gray-50 rounded-full transition-colors hidden md:block">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          
          <button className="p-2 hover:bg-gray-50 rounded-full transition-colors hidden md:block">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          
          <Avatar className="w-9 h-9 cursor-pointer">
            <AvatarFallback className="bg-[#003C78]/10 text-[#003C78]">
              <User className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
