export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isDateDisabled(
  date: Date,
  min: Date | undefined,
  max: Date | undefined,
): boolean {
  const dateStart = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  if (min !== undefined) {
    const minStart = new Date(min.getFullYear(), min.getMonth(), min.getDate());
    if (dateStart < minStart) return true;
  }
  if (max !== undefined) {
    const maxEnd = new Date(max.getFullYear(), max.getMonth(), max.getDate());
    if (dateStart > maxEnd) return true;
  }
  return false;
}

export function defaultFormatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${String(y)}-${m}-${d}`;
}

export function defaultParseDate(input: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12) return null;
  const maxDay = new Date(year, month, 0).getDate();
  if (day < 1 || day > maxDay) return null;
  return new Date(year, month - 1, day);
}

export function buildMonthGrid(
  year: number,
  month: number,
): (number | null)[][] {
  const firstDay = new Date(year, month, 1).getDay();
  const leadingEmpties = (firstDay + 6) % 7;
  const totalDays = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < leadingEmpties; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

export function clampDate(
  date: Date,
  min: Date | undefined,
  max: Date | undefined,
): Date {
  if (min !== undefined && date < min)
    return new Date(min.getFullYear(), min.getMonth(), min.getDate());
  if (max !== undefined && date > max)
    return new Date(max.getFullYear(), max.getMonth(), max.getDate());
  return date;
}

export function monthHasSelectableDays(
  year: number,
  month: number,
  min: Date | undefined,
  max: Date | undefined,
): boolean {
  const totalDays = new Date(year, month + 1, 0).getDate();
  const firstOfMonth = new Date(year, month, 1);
  const lastOfMonth = new Date(year, month, totalDays);
  if (
    min !== undefined &&
    lastOfMonth < new Date(min.getFullYear(), min.getMonth(), min.getDate())
  )
    return false;
  if (
    max !== undefined &&
    firstOfMonth > new Date(max.getFullYear(), max.getMonth(), max.getDate())
  )
    return false;
  return true;
}
