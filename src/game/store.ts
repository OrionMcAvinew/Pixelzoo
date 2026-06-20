import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  GameEventDef,
  LogEntry,
  SelectedTool,
  StaffMember,
  StaffType,
  TileContent,
} from './types';
import { SPECIES, SPECIES_MAP } from './data/species';
import { DECORATIONS, DECORATIONS_MAP } from './data/decorations';
import { STAFF_DEFS } from './data/staff';
import { EVENTS } from './data/events';
import {
  computeAppeal,
  computeRating,
  computeRevenue,
  computeUpkeep,
  computeVisitors,
  computeWages,
  decayHappiness,
} from './simulation';

export const GRID_WIDTH = 9;
export const GRID_HEIGHT = 6;
const GRID_SIZE = GRID_WIDTH * GRID_HEIGHT;

function makeId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function emptyTiles(): TileContent[] {
  return Array.from({ length: GRID_SIZE }, () => ({ kind: 'empty' }));
}

export type Speed = 'paused' | 'normal' | 'fast';

export interface GameState {
  zooName: string;
  tiles: TileContent[];
  coins: number;
  researchPoints: number;
  day: number;
  speed: Speed;
  unlockedSpecies: string[];
  unlockedDecorations: string[];
  staff: StaffMember[];
  selectedTool: SelectedTool;
  selectedTileIndex: number | null;
  rating: number;
  visitorsToday: number;
  totalVisitors: number;
  log: LogEntry[];
  activeEvent: GameEventDef | null;
  pendingVisitorBoost: number;

  setSpeed: (speed: Speed) => void;
  selectTool: (tool: SelectedTool) => void;
  clickTile: (index: number) => void;
  unlockSpecies: (id: string) => void;
  unlockDecoration: (id: string) => void;
  hireStaff: (type: StaffType) => void;
  fireStaff: (id: string) => void;
  resolveEvent: (choiceId: string) => void;
  tick: () => void;
  resetGame: () => void;
}

function addLog(log: LogEntry[], day: number, message: string): LogEntry[] {
  const entry: LogEntry = { id: makeId(), day, message };
  return [entry, ...log].slice(0, 30);
}

const initialState = () => ({
  zooName: 'Pixel Zoo',
  tiles: emptyTiles(),
  coins: 500,
  researchPoints: 0,
  day: 1,
  speed: 'normal' as Speed,
  unlockedSpecies: SPECIES.filter((s) => s.unlockRP === 0).map((s) => s.id),
  unlockedDecorations: DECORATIONS.filter((d) => d.unlockRP === 0).map((d) => d.id),
  staff: [] as StaffMember[],
  selectedTool: null as SelectedTool,
  selectedTileIndex: null as number | null,
  rating: 1,
  visitorsToday: 0,
  totalVisitors: 0,
  log: addLog([], 1, 'Welcome to your new zoo! Place some animals to get started.'),
  activeEvent: null as GameEventDef | null,
  pendingVisitorBoost: 0,
});

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...initialState(),

      setSpeed: (speed) => set({ speed }),

      selectTool: (tool) => set({ selectedTool: tool, selectedTileIndex: null }),

      clickTile: (index) => {
        const state = get();
        const tool = state.selectedTool;
        const tile = state.tiles[index];

        if (!tool) {
          set({ selectedTileIndex: tile.kind === 'empty' ? null : index });
          return;
        }

        if (tool.kind === 'bulldoze') {
          if (tile.kind === 'empty') return;
          let refund = 0;
          if (tile.kind === 'animal') {
            refund = Math.floor((SPECIES_MAP[tile.speciesId]?.cost ?? 0) * 0.3);
          } else if (tile.kind === 'decoration') {
            refund = Math.floor((DECORATIONS_MAP[tile.decorationId]?.cost ?? 0) * 0.3);
          }
          const newTiles = [...state.tiles];
          newTiles[index] = { kind: 'empty' };
          set({ tiles: newTiles, coins: state.coins + refund });
          return;
        }

        if (tile.kind !== 'empty') return;

        if (tool.kind === 'animal') {
          const def = SPECIES_MAP[tool.speciesId];
          if (!def) return;
          if (!state.unlockedSpecies.includes(def.id)) return;
          if (state.coins < def.cost) return;
          const newTiles = [...state.tiles];
          newTiles[index] = {
            kind: 'animal',
            speciesId: def.id,
            happiness: 80,
            placedDay: state.day,
          };
          set({ tiles: newTiles, coins: state.coins - def.cost });
        } else if (tool.kind === 'decoration') {
          const def = DECORATIONS_MAP[tool.decorationId];
          if (!def) return;
          if (!state.unlockedDecorations.includes(def.id)) return;
          if (state.coins < def.cost) return;
          const newTiles = [...state.tiles];
          newTiles[index] = { kind: 'decoration', decorationId: def.id };
          set({ tiles: newTiles, coins: state.coins - def.cost });
        }
      },

      unlockSpecies: (id) => {
        const state = get();
        const def = SPECIES_MAP[id];
        if (!def || state.unlockedSpecies.includes(id)) return;
        if (state.researchPoints < def.unlockRP) return;
        set({
          unlockedSpecies: [...state.unlockedSpecies, id],
          researchPoints: state.researchPoints - def.unlockRP,
          log: addLog(state.log, state.day, `Research complete: ${def.name} unlocked!`),
        });
      },

      unlockDecoration: (id) => {
        const state = get();
        const def = DECORATIONS_MAP[id];
        if (!def || state.unlockedDecorations.includes(id)) return;
        if (state.researchPoints < def.unlockRP) return;
        set({
          unlockedDecorations: [...state.unlockedDecorations, id],
          researchPoints: state.researchPoints - def.unlockRP,
          log: addLog(state.log, state.day, `Research complete: ${def.name} unlocked!`),
        });
      },

      hireStaff: (type) => {
        const state = get();
        const def = STAFF_DEFS[type];
        if (state.coins < def.hireCost) return;
        const member: StaffMember = { id: makeId(), type, hiredDay: state.day };
        set({
          staff: [...state.staff, member],
          coins: state.coins - def.hireCost,
          log: addLog(state.log, state.day, `Hired a new ${def.name}.`),
        });
      },

      fireStaff: (id) => {
        const state = get();
        set({ staff: state.staff.filter((s) => s.id !== id) });
      },

      resolveEvent: (choiceId) => {
        const state = get();
        const event = state.activeEvent;
        if (!event) return;
        const choice = event.choices.find((c) => c.id === choiceId);
        if (!choice) return;

        const newTiles = state.tiles.map((tile) => {
          if (tile.kind === 'animal' && choice.effect.happinessDelta) {
            return {
              ...tile,
              happiness: Math.max(0, Math.min(100, tile.happiness + choice.effect.happinessDelta)),
            };
          }
          return tile;
        });

        set({
          tiles: newTiles,
          coins: Math.max(0, state.coins + (choice.effect.coins ?? 0)),
          researchPoints: state.researchPoints + (choice.effect.researchPoints ?? 0),
          pendingVisitorBoost: state.pendingVisitorBoost + (choice.effect.visitorBoostNextTick ?? 0),
          activeEvent: null,
          log: addLog(state.log, state.day, choice.resultMessage),
        });
      },

      tick: () => {
        const state = get();
        if (state.activeEvent) return;

        const appeal = computeAppeal(state.tiles);
        const rating = computeRating(appeal);
        const visitors = computeVisitors(appeal, rating, state.day, state.pendingVisitorBoost);
        const vendorCount = state.staff.filter((s) => s.type === 'vendor').length;
        const keeperCount = state.staff.filter((s) => s.type === 'keeper').length;
        const scientistCount = state.staff.filter((s) => s.type === 'scientist').length;

        const { ticketRevenue, vendorRevenue } = computeRevenue(visitors, vendorCount);
        const wages = computeWages(state.staff, STAFF_DEFS);
        const upkeep = computeUpkeep(state.tiles);

        const net = ticketRevenue + vendorRevenue - wages - upkeep;
        let newCoins = state.coins + net;
        let log = state.log;
        if (newCoins < 0) {
          newCoins = 0;
          log = addLog(log, state.day, 'Funds ran out! Wages and upkeep went unpaid.');
        }

        const keeperRatio = appeal.animalCount > 0 ? keeperCount / appeal.animalCount : 1;
        const newTiles = state.tiles.map((tile) => {
          if (tile.kind === 'animal') {
            return { ...tile, happiness: decayHappiness(tile.happiness, keeperRatio) };
          }
          return tile;
        });

        const researchGain = scientistCount * 3;
        const newDay = state.day + 1;

        let activeEvent: GameEventDef | null = null;
        if (Math.random() < 0.16) {
          const totalWeight = EVENTS.reduce((sum, e) => sum + e.weight, 0);
          let roll = Math.random() * totalWeight;
          for (const ev of EVENTS) {
            roll -= ev.weight;
            if (roll <= 0) {
              activeEvent = ev;
              break;
            }
          }
        }

        const prevRating = state.rating;
        if (rating !== prevRating) {
          log = addLog(
            log,
            state.day,
            rating > prevRating
              ? `Your zoo rating rose to ${rating} stars!`
              : `Your zoo rating dropped to ${rating} stars.`,
          );
        }

        set({
          tiles: newTiles,
          coins: newCoins,
          researchPoints: state.researchPoints + researchGain,
          day: newDay,
          rating,
          visitorsToday: visitors,
          totalVisitors: state.totalVisitors + visitors,
          activeEvent,
          pendingVisitorBoost: 0,
          log,
        });
      },

      resetGame: () => set(initialState()),
    }),
    {
      name: 'pixelzoo-save',
    },
  ),
);
