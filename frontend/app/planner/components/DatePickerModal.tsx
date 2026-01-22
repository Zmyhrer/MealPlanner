"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { DayOfWeek } from "@/lib/types";

interface DatePickerModalProps {
  onSelectDate: (date: Date) => void;
  onClose: () => void;
  startDayOfWeek: DayOfWeek;
  triggerRef: React.RefObject<HTMLElement>;
  currentDate: Date;
}

export const DatePickerModal = forwardRef<HTMLDivElement, DatePickerModalProps>(
  ({ onSelectDate, onClose, startDayOfWeek, triggerRef, currentDate }, ref) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [isVisible, setIsVisible] = useState(false);

    // Helper to get start of week based on user preference
    const getStartOfWeek = (date: Date, startDay: DayOfWeek) => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      const currentDay = d.getDay();
      const diff = (currentDay - startDay + 7) % 7;
      d.setDate(d.getDate() - diff);
      return d;
    };

    const [currentMonth, setCurrentMonth] = useState<Date>(() => {
      const startOfWeek = getStartOfWeek(currentDate, startDayOfWeek);
      return new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), 1);
    });

    // Get days of the week in correct order based on user preference
    const getWeekDays = () => {
      const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
      const orderedDays = [];
      for (let i = 0; i < 7; i++) {
        const index = (startDayOfWeek + i) % 7;
        orderedDays.push(days[index]);
      }
      return orderedDays;
    };

    // Get days in month for the calendar
    const getDaysInMonth = () => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();

      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      const daysInMonth = lastDay.getDate();
      const startingDay = (firstDay.getDay() - startDayOfWeek + 7) % 7;

      const days = [];

      for (let i = 0; i < startingDay; i++) {
        days.push(null);
      }

      for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(year, month, i));
      }

      return days;
    };

    // Navigate to previous/next month
    const prevMonth = () => {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
      );
    };

    const nextMonth = () => {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
      );
    };

    // Position modal relative to trigger button
    useEffect(() => {
      if (!triggerRef.current || !modalRef.current) return;

      const calculatePosition = () => {
        const rect = triggerRef.current!.getBoundingClientRect();
        const modalHeight = 350;
        const viewportHeight = window.innerHeight;

        let top = rect.bottom + 8;
        let left = rect.left;

        if (top + modalHeight > viewportHeight - 20) {
          top = rect.top - modalHeight - 8;
        }

        const modalWidth = 320;
        if (left + modalWidth > window.innerWidth - 20) {
          left = window.innerWidth - modalWidth - 20;
        }
        if (left < 20) {
          left = 20;
        }

        return { top, left };
      };

      const pos = calculatePosition();
      setPosition(pos);

      requestAnimationFrame(() => {
        setIsVisible(true);
      });

      const handleResize = () => {
        const newPos = calculatePosition();
        setPosition(newPos);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [triggerRef]);

    // Handle date selection - jump to the week containing the selected date
    const handleDateSelect = (date: Date) => {
      const startOfSelectedWeek = getStartOfWeek(date, startDayOfWeek);
      onSelectDate(startOfSelectedWeek);
      onClose();
    };

    const today = new Date();
    const currentStartOfWeek = getStartOfWeek(currentDate, startDayOfWeek);
    const monthName = currentMonth.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    const weekDays = getWeekDays();
    const days = getDaysInMonth();

    return (
      <div
        ref={modalRef}
        className={`date-picker-modal fixed z-50 transition-opacity duration-150 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 w-[320px]">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              ←
            </button>
            <h3 className="font-bold text-sm">{monthName}</h3>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              →
            </button>
          </div>

          {/* Week days header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className="text-center text-xs font-medium text-slate-500 dark:text-slate-400 py-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              const isToday =
                date &&
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();

              const isCurrentWeekStart =
                date &&
                date.getDate() === currentStartOfWeek.getDate() &&
                date.getMonth() === currentStartOfWeek.getMonth() &&
                date.getFullYear() === currentStartOfWeek.getFullYear();

              return date ? (
                <button
                  key={index}
                  onClick={() => handleDateSelect(date)}
                  className={`
                  h-9 w-9 rounded-lg text-sm font-medium transition-all
                  flex items-center justify-center mx-auto relative
                  ${
                    isToday
                      ? "bg-indigo-600 text-white"
                      : isCurrentWeekStart
                      ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                      : "hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                  }
                `}
                >
                  {date.getDate()}
                  {isCurrentWeekStart && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 bg-indigo-500 rounded-full"></span>
                  )}
                </button>
              ) : (
                <div key={index} className="h-9 w-9"></div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

DatePickerModal.displayName = "DatePickerModal";
