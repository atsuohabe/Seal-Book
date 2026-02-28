export function getTodayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

export function isSameDay(dateStr: string): boolean {
  return dateStr === getTodayDateString();
}
