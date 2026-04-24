import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function dateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function startOfDay(d: Date) {
  const next = new Date(d);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function getToday() {
  return startOfDay(new Date());
}

export function getTodayKey() {
  return dateKey(getToday());
}

export function getTodayIdx() {
  return getToday().getDay();
}

export function getYesterday(d: Date = getToday()) {
  const y = startOfDay(d);
  y.setDate(y.getDate() - 1);
  return y;
}

export function getYesterdayKey(d: Date = getToday()) {
  return dateKey(getYesterday(d));
}

export const DAY_LABELS = ['s', 'm', 't', 'w', 't', 'f', 's'];
export const FULL_DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
export const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

export function getWeek(d: Date = getToday()) {
  const base = startOfDay(d);
  const start = new Date(base);
  start.setDate(base.getDate() - base.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

export const onCardKeyDown = (e: React.KeyboardEvent, cb: () => void) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    cb();
  }
};
