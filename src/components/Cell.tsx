import { useGameStore } from '../game/store';
import { SPECIES_MAP } from '../game/data/species';
import { DECORATIONS_MAP } from '../game/data/decorations';
import { PixelIcon } from './PixelIcon';

interface CellProps {
  index: number;
}

export function Cell({ index }: CellProps) {
  const tile = useGameStore((s) => s.tiles[index]);
  const selectedTileIndex = useGameStore((s) => s.selectedTileIndex);
  const clickTile = useGameStore((s) => s.clickTile);
  const selectedTool = useGameStore((s) => s.selectedTool);

  const isSelected = selectedTileIndex === index;
  const isHoverable = selectedTool !== null && (selectedTool.kind === 'bulldoze' || tile.kind === 'empty');

  let emoji = '';
  let happiness: number | null = null;

  if (tile.kind === 'animal') {
    emoji = SPECIES_MAP[tile.speciesId]?.emoji ?? '❓';
    happiness = tile.happiness;
  } else if (tile.kind === 'decoration') {
    emoji = DECORATIONS_MAP[tile.decorationId]?.emoji ?? '❓';
  }

  return (
    <div
      className={[
        'cell',
        tile.kind === 'empty' ? 'cell-empty' : 'cell-filled',
        isSelected ? 'cell-selected' : '',
        isHoverable ? 'cell-hoverable' : '',
      ].join(' ')}
      onClick={() => clickTile(index)}
    >
      {emoji && <PixelIcon emoji={emoji} size={36} />}
      {happiness !== null && (
        <div className="happiness-bar">
          <div
            className="happiness-fill"
            style={{
              width: `${happiness}%`,
              background: happiness > 60 ? '#5fcf6b' : happiness > 30 ? '#e8c44d' : '#e0524d',
            }}
          />
        </div>
      )}
    </div>
  );
}
