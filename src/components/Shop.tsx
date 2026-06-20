import { useState } from 'react';
import { useGameStore } from '../game/store';
import { SPECIES } from '../game/data/species';
import { DECORATIONS } from '../game/data/decorations';
import { PixelIcon } from './PixelIcon';

export function Shop() {
  const [tab, setTab] = useState<'animals' | 'decorations'>('animals');
  const coins = useGameStore((s) => s.coins);
  const researchPoints = useGameStore((s) => s.researchPoints);
  const unlockedSpecies = useGameStore((s) => s.unlockedSpecies);
  const unlockedDecorations = useGameStore((s) => s.unlockedDecorations);
  const selectedTool = useGameStore((s) => s.selectedTool);
  const selectTool = useGameStore((s) => s.selectTool);
  const unlockSpecies = useGameStore((s) => s.unlockSpecies);
  const unlockDecoration = useGameStore((s) => s.unlockDecoration);

  return (
    <div className="panel">
      <div className="subtabs">
        <button className={tab === 'animals' ? 'active' : ''} onClick={() => setTab('animals')}>
          Animals
        </button>
        <button className={tab === 'decorations' ? 'active' : ''} onClick={() => setTab('decorations')}>
          Decor
        </button>
      </div>
      <div className="shop-list">
        {tab === 'animals' &&
          SPECIES.map((s) => {
            const unlocked = unlockedSpecies.includes(s.id);
            const selected = selectedTool?.kind === 'animal' && selectedTool.speciesId === s.id;
            const canAfford = coins >= s.cost;
            return (
              <div key={s.id} className={`shop-item ${selected ? 'shop-item-selected' : ''}`}>
                <PixelIcon emoji={s.emoji} size={32} className={unlocked ? '' : 'icon-locked'} />
                <div className="shop-item-info">
                  <div className="shop-item-name">{s.name}</div>
                  <div className="shop-item-meta">
                    💰{s.cost} · ✨{s.appeal}
                  </div>
                </div>
                {unlocked ? (
                  <button
                    disabled={!canAfford}
                    className={selected ? 'active' : ''}
                    onClick={() => selectTool(selected ? null : { kind: 'animal', speciesId: s.id })}
                  >
                    {selected ? 'Cancel' : 'Place'}
                  </button>
                ) : (
                  <button disabled={researchPoints < s.unlockRP} onClick={() => unlockSpecies(s.id)}>
                    🔬{s.unlockRP}
                  </button>
                )}
              </div>
            );
          })}
        {tab === 'decorations' &&
          DECORATIONS.map((d) => {
            const unlocked = unlockedDecorations.includes(d.id);
            const selected = selectedTool?.kind === 'decoration' && selectedTool.decorationId === d.id;
            const canAfford = coins >= d.cost;
            return (
              <div key={d.id} className={`shop-item ${selected ? 'shop-item-selected' : ''}`}>
                <PixelIcon emoji={d.emoji} size={32} className={unlocked ? '' : 'icon-locked'} />
                <div className="shop-item-info">
                  <div className="shop-item-name">{d.name}</div>
                  <div className="shop-item-meta">
                    💰{d.cost} · ✨{d.appeal}
                  </div>
                </div>
                {unlocked ? (
                  <button
                    disabled={!canAfford}
                    className={selected ? 'active' : ''}
                    onClick={() => selectTool(selected ? null : { kind: 'decoration', decorationId: d.id })}
                  >
                    {selected ? 'Cancel' : 'Place'}
                  </button>
                ) : (
                  <button disabled={researchPoints < d.unlockRP} onClick={() => unlockDecoration(d.id)}>
                    🔬{d.unlockRP}
                  </button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
