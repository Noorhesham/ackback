"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, isBefore } from "date-fns";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "./ui/label";

interface CalendarInput2Props {
  label?: string;
  disabled?: boolean;
  optional?: boolean;
  monthOnly?: boolean;
  disableOldDates?: boolean;
}

const CalendarInput2: React.FC<CalendarInput2Props> = ({
  label,
  disabled,
  optional,
  monthOnly = false,
  disableOldDates = false,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex flex-col">
          {label && <Label className="duration-200 relative uppercase">{label}</Label>}
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full pl-3 flex justify-between text-left rounded-lg font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            {selectedDate ? format(selectedDate, "yyyy-MM-dd") : "Pick a date"}
            <CalendarIcon className="ml-auto mr-2 h-4 w-4 opacity-50" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent sideOffset={-40} className="w-full z-[51] relative p-0" align="end">
        <Calendar
          className="relative w-full"
          mode="single"
          captionLayout="dropdown-buttons"
          fromYear={1990}
          toYear={new Date().getFullYear() + 50} // السماح باختيار تواريخ حتى 50 سنة مستقبلًا
          onSelect={handleDateSelect}
          disabled={(date) => disableOldDates && isBefore(date, new Date())}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default CalendarInput2;
