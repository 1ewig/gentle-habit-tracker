import React from 'react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);
export const TODAY_KEY = dateKey(TODAY);
export const TODAY_IDX = TODAY.getDay();

export const YESTERDAY = new Date(TODAY);
YESTERDAY.setDate(TODAY.getDate() - 1);
export const YESTERDAY_KEY = dateKey(YESTERDAY);

export const DAY_LABELS = ['s', 'm', 't', 'w', 't', 'f', 's'];
export const FULL_DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
export const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

export function getWeek() {
  const start = new Date(TODAY);
  start.setDate(TODAY.getDate() - TODAY.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

export const WEEK = getWeek();

export const onCardKeyDown = (e: React.KeyboardEvent, cb: () => void) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    cb();
  }
};
