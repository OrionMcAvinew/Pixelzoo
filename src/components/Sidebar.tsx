import { useState } from 'react';
import { useGameStore } from '../game/store';
import { Shop } from './Shop';
import { StaffPanel } from './StaffPanel';
import { LogPanel } from './LogPanel';
import { InfoPanel } from './InfoPanel';

type TabKey = 'shop' | 'staff' | 'log';

export function Sidebar() {
  const [tab, setTab] = useState<TabKey>('shop');
  const selectedTool = useGameStore((s) => s.selectedTool);
  const selectTool = useGameStore((s) => s.selectTool);

  return (
    <div className="sidebar">
      <InfoPanel />
      {selectedTool && (
        <div className="tool-banner">
          <span>
            {selectedTool.kind === 'bulldoze' ? '🪓 Bulldoze mode' : '🛠 Placing — click an empty tile'}
          </span>
          <button onClick={() => selectTool(null)}>Cancel</button>
        </div>
      )}
      <div className="tabs">
        <button className={tab === 'shop' ? 'active' : ''} onClick={() => setTab('shop')}>
          🏪 Shop
        </button>
        <button className={tab === 'staff' ? 'active' : ''} onClick={() => setTab('staff')}>
          👥 Staff
        </button>
        <button className={tab === 'log' ? 'active' : ''} onClick={() => setTab('log')}>
          📜 Log
        </button>
        <button
          className={selectedTool?.kind === 'bulldoze' ? 'active' : ''}
          onClick={() => selectTool(selectedTool?.kind === 'bulldoze' ? null : { kind: 'bulldoze' })}
        >
          🪓
        </button>
      </div>
      <div className="tab-content">
        {tab === 'shop' && <Shop />}
        {tab === 'staff' && <StaffPanel />}
        {tab === 'log' && <LogPanel />}
      </div>
    </div>
  );
}
