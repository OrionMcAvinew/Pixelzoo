import { useGameStore } from '../game/store';
import { STAFF_DEFS } from '../game/data/staff';
import type { StaffType } from '../game/types';
import { PixelIcon } from './PixelIcon';

const STAFF_TYPES: StaffType[] = ['keeper', 'vendor', 'scientist'];

export function StaffPanel() {
  const coins = useGameStore((s) => s.coins);
  const staff = useGameStore((s) => s.staff);
  const hireStaff = useGameStore((s) => s.hireStaff);
  const fireStaff = useGameStore((s) => s.fireStaff);

  return (
    <div className="panel">
      <div className="shop-list">
        {STAFF_TYPES.map((type) => {
          const def = STAFF_DEFS[type];
          const count = staff.filter((s) => s.type === type).length;
          return (
            <div key={type} className="shop-item">
              <PixelIcon emoji={def.emoji} size={32} />
              <div className="shop-item-info">
                <div className="shop-item-name">
                  {def.name} <span className="staff-count">x{count}</span>
                </div>
                <div className="shop-item-meta">
                  💰{def.hireCost} hire · 💵{def.wage}/day
                </div>
              </div>
              <button disabled={coins < def.hireCost} onClick={() => hireStaff(type)}>
                Hire
              </button>
            </div>
          );
        })}
      </div>
      <h3 className="panel-subheading">Current Staff</h3>
      <div className="staff-roster">
        {staff.length === 0 && <p className="empty-note">No staff hired yet.</p>}
        {staff.map((member) => {
          const def = STAFF_DEFS[member.type];
          return (
            <div key={member.id} className="staff-row">
              <PixelIcon emoji={def.emoji} size={24} />
              <span>{def.name}</span>
              <button className="fire-btn" onClick={() => fireStaff(member.id)}>
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
