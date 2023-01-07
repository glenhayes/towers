import ConfettiExplosion from 'react-confetti-explosion';
import useTowers from './hooks/useTowers';
import { COLORS } from './lib/colors';
import './App.css';

function App() {
  const { towers, isVictory, moveRing, activeDisc, resetGame, move } =
    useTowers();
  return (
    <div className='App'>
      <h1>
        {isVictory && <span className='winner'> You Win!! </span>}
        Towers{' '}
      </h1>

      <span className='counter'>Move {move}</span>
      <div className='activeDisk'>
        {activeDisc && (
          <div
            className='disc'
            style={{
              width: `${activeDisc * 10 + 20}px`,
              background: COLORS[activeDisc - 1],
            }}
          />
        )}
      </div>
      <div className='towers'>
        <div style={{ position: 'fixed', top: 0, zIndex: 100 }}>
          {isVictory && (
            <ConfettiExplosion
              duration={2500}
              particleCount={200}
              height={1000}
              width={500}
            />
          )}
        </div>
        {towers.map((tower, i) => (
          <button className='tower' key={i} onClick={() => moveRing(i)}>
            {tower.length &&
              tower.map((disc) => (
                <div
                  key={disc}
                  className='disc'
                  style={{
                    width: `${disc * 10 + 20}px`,
                    background: COLORS[disc - 1],
                  }}
                />
              ))}
          </button>
        ))}
      </div>
      <button onClick={() => resetGame()} className='btn-reset'>
        Reset Game
      </button>
    </div>
  );
}

export default App;
