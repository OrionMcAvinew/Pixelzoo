import { useGameStore } from '../game/store';
import { PixelIcon } from './PixelIcon';

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < full) stars.push('⭐');
    else if (i === full && half) stars.push('🌟');
    else stars.push('☆');
  }
  return <span className="star-rating">{stars.join('')}</span>;
}

export function Header() {
  const zooName = useGameStore((s) => s.zooName);
  const coins = useGameStore((s) => s.coins);
  const researchPoints = useGameStore((s) => s.researchPoints);
  const day = useGameStore((s) => s.day);
  const rating = useGameStore((s) => s.rating);
  const visitorsToday = useGameStore((s) => s.visitorsToday);
  const speed = useGameStore((s) => s.speed);
  const setSpeed = useGameStore((s) => s.setSpeed);

  return (
    <header className="header">
      <div className="header-title">
        <PixelIcon emoji="🦁" size={36} />
        <h1>{zooName}</h1>
      </div>
      <div className="header-stats">
        <div className="stat" title="Coins">
          <PixelIcon emoji="🪙" size={24} />
          <span>{Math.floor(coins)}</span>
        </div>
        <div className="stat" title="Research Points">
          <PixelIcon emoji="🔬" size={24} />
          <span>{researchPoints}</span>
        </div>
        <div className="stat" title="Day">
          <PixelIcon emoji="📅" size={24} />
          <span>Day {day}</span>
        </div>
        <div className="stat" title="Visitors today">
          <PixelIcon emoji="🚶" size={24} />
          <span>{visitorsToday}</span>
        </div>
        <div className="stat" title="Zoo rating">
          <StarRating rating={rating} />
        </div>
      </div>
      <div className="header-speed">
        <button className={speed === 'paused' ? 'active' : ''} onClick={() => setSpeed('paused')}>
          ⏸
        </button>
        <button className={speed === 'normal' ? 'active' : ''} onClick={() => setSpeed('normal')}>
          ▶
        </button>
        <button className={speed === 'fast' ? 'active' : ''} onClick={() => setSpeed('fast')}>
          ⏩
        </button>
      </div>
    </header>
  );
}
