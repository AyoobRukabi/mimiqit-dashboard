import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

interface AddClassModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddClassModal({ open, onOpenChange }: AddClassModalProps) {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    className: '',
    instructor: '',
    classType: '',
    duration: '',
    capacity: '',
    time: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.className || !formData.instructor || !formData.classType || !date) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Class added successfully!', {
      description: `${formData.className} scheduled for ${date.toLocaleDateString()}`,
    });
    
    // Reset form
    setFormData({
      className: '',
      instructor: '',
      classType: '',
      duration: '',
      capacity: '',
      time: '',
      description: '',
    });
    setDate(undefined);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Class</DialogTitle>
          <DialogDescription>
            Create a new class session for your fitness studio
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Class Name */}
            <div className="space-y-2">
              <Label htmlFor="className">Class Name *</Label>
              <Input
                id="className"
                placeholder="e.g., Morning Yoga Flow"
                value={formData.className}
                onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                required
              />
            </div>

            {/* Class Type */}
            <div className="space-y-2">
              <Label htmlFor="classType">Class Type *</Label>
              <Select 
                value={formData.classType} 
                onValueChange={(value) => setFormData({ ...formData, classType: value })}
              >
                <SelectTrigger id="classType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yoga">Yoga</SelectItem>
                  <SelectItem value="pilates">Pilates</SelectItem>
                  <SelectItem value="hiit">HIIT</SelectItem>
                  <SelectItem value="spinning">Spinning</SelectItem>
                  <SelectItem value="strength">Strength Training</SelectItem>
                  <SelectItem value="dance">Dance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Instructor */}
            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor *</Label>
              <Select 
                value={formData.instructor} 
                onValueChange={(value) => setFormData({ ...formData, instructor: value })}
              >
                <SelectTrigger id="instructor">
                  <SelectValue placeholder="Select instructor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anna">Anna</SelectItem>
                  <SelectItem value="erik">Erik</SelectItem>
                  <SelectItem value="sofia">Sofia</SelectItem>
                  <SelectItem value="lars">Lars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label>Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? date.toLocaleDateString() : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time */}
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="time"
                  type="time"
                  className="pl-10"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="60"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>

            {/* Capacity */}
            <div className="space-y-2">
              <Label htmlFor="capacity">Max Capacity</Label>
              <Input
                id="capacity"
                type="number"
                placeholder="20"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the class..."
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-[#BFFF00] hover:bg-[#a8e600] text-gray-900"
            >
              Add Class
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
