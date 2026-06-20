import { useGameStore } from '../game/store';

export function EventModal() {
  const activeEvent = useGameStore((s) => s.activeEvent);
  const resolveEvent = useGameStore((s) => s.resolveEvent);

  if (!activeEvent) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{activeEvent.title}</h2>
        <p>{activeEvent.description}</p>
        <div className="modal-choices">
          {activeEvent.choices.map((choice) => (
            <button key={choice.id} onClick={() => resolveEvent(choice.id)}>
              {choice.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
