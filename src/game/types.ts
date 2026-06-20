export type SpeciesId = string;
export type DecorationId = string;
export type StaffType = 'keeper' | 'vendor' | 'scientist';

export interface SpeciesDef {
  id: SpeciesId;
  name: string;
  emoji: string;
  cost: number;
  upkeep: number;
  appeal: number;
  unlockRP: number;
  description: string;
}

export interface DecorationDef {
  id: DecorationId;
  name: string;
  emoji: string;
  cost: number;
  appeal: number;
  unlockRP: number;
  description: string;
}

export interface StaffDef {
  type: StaffType;
  name: string;
  emoji: string;
  wage: number;
  hireCost: number;
  description: string;
}

export type TileContent =
  | { kind: 'empty' }
  | { kind: 'animal'; speciesId: SpeciesId; happiness: number; placedDay: number }
  | { kind: 'decoration'; decorationId: DecorationId };

export interface StaffMember {
  id: string;
  type: StaffType;
  hiredDay: number;
}

export interface EventEffect {
  coins?: number;
  researchPoints?: number;
  happinessDelta?: number;
  visitorBoostNextTick?: number;
}

export interface EventChoice {
  id: string;
  label: string;
  effect: EventEffect;
  resultMessage: string;
}

export interface GameEventDef {
  id: string;
  title: string;
  description: string;
  weight: number;
  choices: EventChoice[];
}

export type SelectedTool =
  | { kind: 'animal'; speciesId: SpeciesId }
  | { kind: 'decoration'; decorationId: DecorationId }
  | { kind: 'bulldoze' }
  | null;

export interface LogEntry {
  id: string;
  day: number;
  message: string;
}
