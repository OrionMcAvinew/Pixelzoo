import { useGameStore } from '../game/store';
import { SPECIES_MAP } from '../game/data/species';
import { DECORATIONS_MAP } from '../game/data/decorations';
import { PixelIcon } from './PixelIcon';

export function InfoPanel() {
  const selectedTileIndex = useGameStore((s) => s.selectedTileIndex);
  const tile = useGameStore((s) => (selectedTileIndex !== null ? s.tiles[selectedTileIndex] : null));
  const clickTile = useGameStore((s) => s.clickTile);
  const selectTool = useGameStore((s) => s.selectTool);

  if (selectedTileIndex === null || !tile || tile.kind === 'empty') return null;

  const def = tile.kind === 'animal' ? SPECIES_MAP[tile.speciesId] : DECORATIONS_MAP[tile.decorationId];
  if (!def) return null;

  return (
    <div className="info-panel">
      <PixelIcon emoji={def.emoji} size={48} />
      <div className="info-panel-body">
        <div className="info-panel-name">{def.name}</div>
        <div className="info-panel-desc">{def.description}</div>
        {tile.kind === 'animal' && (
          <div className="happiness-bar info-happiness">
            <div
              className="happiness-fill"
              style={{
                width: `${tile.happiness}%`,
                background: tile.happiness > 60 ? '#5fcf6b' : tile.happiness > 30 ? '#e8c44d' : '#e0524d',
              }}
            />
          </div>
        )}
      </div>
      <button
        className="remove-btn"
        onClick={() => {
          selectTool({ kind: 'bulldoze' });
          clickTile(selectedTileIndex);
          selectTool(null);
        }}
      >
        Remove
      </button>
    </div>
  );
}
