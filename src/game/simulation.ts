import type { StaffMember, TileContent } from './types';
import { SPECIES_MAP } from './data/species';
import { DECORATIONS_MAP } from './data/decorations';

export interface AppealResult {
  totalAppeal: number;
  avgHappiness: number;
  varietyCount: number;
  animalCount: number;
}

export function computeAppeal(tiles: TileContent[]): AppealResult {
  let totalAppeal = 0;
  let happinessSum = 0;
  let animalCount = 0;
  const speciesSeen = new Set<string>();

  for (const tile of tiles) {
    if (tile.kind === 'animal') {
      const def = SPECIES_MAP[tile.speciesId];
      if (!def) continue;
      const happinessFactor = tile.happiness / 100;
      totalAppeal += def.appeal * happinessFactor;
      happinessSum += tile.happiness;
      animalCount += 1;
      speciesSeen.add(tile.speciesId);
    } else if (tile.kind === 'decoration') {
      const def = DECORATIONS_MAP[tile.decorationId];
      if (!def) continue;
      totalAppeal += def.appeal;
    }
  }

  const varietyCount = speciesSeen.size;
  totalAppeal += varietyCount * 4;

  return {
    totalAppeal,
    avgHappiness: animalCount > 0 ? happinessSum / animalCount : 0,
    varietyCount,
    animalCount,
  };
}

export function computeRating(appeal: AppealResult): number {
  if (appeal.animalCount === 0) return 1;
  const happinessScore = (appeal.avgHappiness / 100) * 2.5;
  const varietyScore = Math.min(appeal.varietyCount * 0.25, 2);
  const rating = 1 + happinessScore + varietyScore;
  return Math.max(1, Math.min(5, Math.round(rating * 2) / 2));
}

export function computeVisitors(
  appeal: AppealResult,
  rating: number,
  day: number,
  boost: number,
): number {
  const base = 8 + day * 0.4;
  const appealBonus = appeal.totalAppeal * 1.8;
  const ratingMultiplier = 0.6 + rating * 0.28;
  const randomFactor = 0.85 + Math.random() * 0.3;
  const visitors = (base + appealBonus) * ratingMultiplier * randomFactor * (1 + boost);
  return Math.max(0, Math.round(visitors));
}

export function computeRevenue(
  visitors: number,
  vendorCount: number,
): { ticketRevenue: number; vendorRevenue: number } {
  const ticketRevenue = visitors * 5;
  const vendorRevenue = visitors * vendorCount * 1.2;
  return { ticketRevenue, vendorRevenue };
}

export function computeWages(staff: StaffMember[], staffDefs: Record<string, { wage: number }>): number {
  return staff.reduce((sum, s) => sum + staffDefs[s.type].wage, 0);
}

export function computeUpkeep(tiles: TileContent[]): number {
  let upkeep = 0;
  for (const tile of tiles) {
    if (tile.kind === 'animal') {
      const def = SPECIES_MAP[tile.speciesId];
      if (def) upkeep += def.upkeep;
    }
  }
  return upkeep;
}

export function decayHappiness(happiness: number, keeperRatio: number): number {
  const rawDecay = 3 - keeperRatio * 6;
  const decay = Math.max(-4, Math.min(4, rawDecay));
  const next = happiness - decay;
  return Math.max(0, Math.min(100, next));
}
