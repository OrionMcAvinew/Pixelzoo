import { useEffect } from 'react';
import { useGameStore } from './game/store';
import { Header } from './components/Header';
import { ZooGrid } from './components/ZooGrid';
import { Sidebar } from './components/Sidebar';
import { EventModal } from './components/EventModal';
import './App.css';

const TICK_MS: Record<string, number> = {
  normal: 2200,
  fast: 700,
};

function App() {
  const speed = useGameStore((s) => s.speed);
  const tick = useGameStore((s) => s.tick);
  const resetGame = useGameStore((s) => s.resetGame);

  useEffect(() => {
    if (speed === 'paused') return;
    const interval = setInterval(() => tick(), TICK_MS[speed]);
    return () => clearInterval(interval);
  }, [speed, tick]);

  return (
    <div className="app">
      <Header />
      <main className="main">
        <ZooGrid />
        <Sidebar />
      </main>
      <footer className="footer">
        <button
          className="reset-btn"
          onClick={() => {
            if (window.confirm('Start a new zoo? This will erase your current progress.')) {
              resetGame();
            }
          }}
        >
          ⟲ New Zoo
        </button>
      </footer>
      <EventModal />
    </div>
  );
}

export default App;
