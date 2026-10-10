import type { Crop } from "@/types";

export interface ScheduleRow { stage: string; task: string; date: Date }

/** Parses "Grain filling (10–14 weeks)" → days from planting (upper bound of range). */
export function parseDaysFromPlanting(stageText: string): number | null {
  const match = stageText.match(/\(([^)]+)\)\s*$/);
  if (!match) return null;
  const nums = match[1].match(/\d+/g);
  if (!nums) return null;
  const upper = parseInt(nums[nums.length - 1], 10);
  if (/week/i.test(match[1])) return upper * 7;
  if (/month/i.test(match[1])) return upper * 30;
  return upper;
}

export const addDays = (date: Date, days: number): Date => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

export function buildSchedule(crop: Crop, plantingDate: Date): ScheduleRow[] {
  const rows: ScheduleRow[] = [
    { stage: "Land preparation", task: crop.landPreparation[0] ?? "Prepare and plough the land", date: addDays(plantingDate, -14) },
    { stage: "Planting", task: `Plant using: ${crop.plantingGuide.method}`, date: plantingDate },
    { stage: "Fertilizer", task: `Apply basal fertilizer: ${crop.fertilizer.planting}`, date: plantingDate },
    { stage: "Weeding", task: crop.weedManagement[0] ?? "First weeding", date: addDays(plantingDate, 21) },
  ];
  let lastDays = 21;
  for (const stageText of crop.growthStages) {
    const days = parseDaysFromPlanting(stageText);
    if (days == null) continue;
    lastDays = days;
    rows.push({ stage: "Growth stage", task: stageText, date: addDays(plantingDate, days) });
  }
  rows.push(
    { stage: "Top dressing", task: crop.fertilizer.topDressing, date: addDays(plantingDate, Math.min(35, Math.round(lastDays * 0.3))) },
    { stage: "Harvest", task: crop.harvesting, date: addDays(plantingDate, lastDays + 7) },
    { stage: "Storage", task: crop.storage, date: addDays(plantingDate, lastDays + 10) },
  );
  return rows.sort((a, b) => a.date.getTime() - b.date.getTime());
}
