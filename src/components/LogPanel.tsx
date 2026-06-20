import { useGameStore } from '../game/store';

export function LogPanel() {
  const log = useGameStore((s) => s.log);
  return (
    <div className="panel">
      <div className="log-list">
        {log.map((entry) => (
          <div key={entry.id} className="log-entry">
            <span className="log-day">Day {entry.day}</span>
            <span>{entry.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
