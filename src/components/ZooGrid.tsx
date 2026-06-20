import { GRID_WIDTH, GRID_HEIGHT } from '../game/store';
import { Cell } from './Cell';

export function ZooGrid() {
  const cells = Array.from({ length: GRID_WIDTH * GRID_HEIGHT }, (_, i) => i);
  return (
    <div
      className="zoo-grid"
      style={{
        gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_HEIGHT}, 1fr)`,
      }}
    >
      {cells.map((i) => (
        <Cell key={i} index={i} />
      ))}
    </div>
  );
}
