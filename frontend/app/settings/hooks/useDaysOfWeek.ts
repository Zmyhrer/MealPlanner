import { DayOfWeek } from "@/lib/types";

interface DayOption {
  value: DayOfWeek;
  label: string;
}

export const useDaysOfWeek = (): DayOption[] => {
  return [
    { value: DayOfWeek.SUNDAY, label: "Sunday" },
    { value: DayOfWeek.MONDAY, label: "Monday" },
    { value: DayOfWeek.TUESDAY, label: "Tuesday" },
    { value: DayOfWeek.WEDNESDAY, label: "Wednesday" },
    { value: DayOfWeek.THURSDAY, label: "Thursday" },
    { value: DayOfWeek.FRIDAY, label: "Friday" },
    { value: DayOfWeek.SATURDAY, label: "Saturday" },
  ];
};
