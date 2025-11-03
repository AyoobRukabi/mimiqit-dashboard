import { Filter, X } from "lucide-react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useFilters } from "../lib/FilterContext";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterSidebar({ isOpen, onClose }: FilterSidebarProps) {
  const { filters, updateFilters } = useFilters();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 lg:w-64 border-r border-gray-100 bg-gray-50/50 p-6 min-h-screen
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <h3 className="text-gray-900">Filters</h3>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-gray-200 rounded"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Date Range */}
          <div className="space-y-2">
            <Label htmlFor="date-range" className="text-gray-700">Date Range</Label>
            <Select 
              value={filters.dateRange}
              onValueChange={(value) => updateFilters({ dateRange: value })}
            >
              <SelectTrigger id="date-range" className="bg-white rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Class Type */}
          <div className="space-y-2">
            <Label htmlFor="class-type" className="text-gray-700">Class Type</Label>
            <Select 
              value={filters.classType}
              onValueChange={(value) => updateFilters({ classType: value })}
            >
              <SelectTrigger id="class-type" className="bg-white rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="yoga">Yoga</SelectItem>
                <SelectItem value="pilates">Pilates</SelectItem>
                <SelectItem value="hiit">HIIT</SelectItem>
                <SelectItem value="spinning">Spinning</SelectItem>
                <SelectItem value="strength">Strength Training</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Instructor */}
          <div className="space-y-2">
            <Label htmlFor="instructor" className="text-gray-700">Instructor</Label>
            <Select 
              value={filters.instructor}
              onValueChange={(value) => updateFilters({ instructor: value })}
            >
              <SelectTrigger id="instructor" className="bg-white rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Instructors</SelectItem>
                <SelectItem value="anna">Anna</SelectItem>
                <SelectItem value="erik">Erik</SelectItem>
                <SelectItem value="sofia">Sofia</SelectItem>
                <SelectItem value="lars">Lars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </aside>
    </>
  );
}
