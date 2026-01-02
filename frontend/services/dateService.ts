const WEEKDAY_MAP: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

export const getClosestValidDateToToday = (weekday: string) => {
  const targetDay = WEEKDAY_MAP[weekday];
  if (targetDay === undefined) throw new Error(`Invalid weekday: ${weekday}`);

  const today = new Date();
  const todayDay = today.getDay();

  // Calculate offset backwards to the closest target day
  const offset = (todayDay - targetDay + 7) % 7;
  today.setDate(today.getDate() - offset);

  return today;
};

export const generateDates = (startDate: Date, numDays: number) =>
  Array.from({ length: numDays }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    return d;
  });

export const getVisibleDates = (dates: Date[], viewWeeks: number) =>
  dates.slice(0, viewWeeks * 7);
