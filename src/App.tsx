import { useEffect, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

import './App.css';

type Disc = number;

const COLORS = [
  'tomato',
  'blanchedalmond',
  'blueviolet',
  'goldenrod',
  'olive',
  'darkcyan',
  'coral',
  'aquamarine',
];
const discs: Disc[] = [...Array(7).keys()].map((index) => index + 1);
function App() {
  const [towers, setTowers] = useState([discs, [], []]);
  const [isVictory, setIsVictory] = useState(false);
  const [activeDisc, setActiveDisk] = useState<number | null>();

  const checkIfWin = () => {
    const [_tower1, ...winningTowers] = towers;
    if (
      isVictory &&
      !winningTowers.find((wTower) => wTower.length === discs.length)
    ) {
      setIsVictory(false);
    }

    if (!isVictory) {
      if (winningTowers.find((wTower) => wTower.length === discs.length)) {
        setIsVictory(true);
      }
    }
  };

  const removeDisc = (disc: Disc, towerIndex: number) => {
    setActiveDisk(disc);
    setTowers((prevTowers) => {
      return prevTowers.map((prevTower, index) => {
        if (towerIndex === index) {
          return prevTower.filter((prevDisc) => prevDisc !== disc);
        }
        return prevTower;
      });
    });
  };

  const addDisc = (disc: Disc, towerIndex: number) => {
    setActiveDisk(null);
    const updatedTowers = [...towers].map((prevTower, index) => {
      if (towerIndex === index) {
        prevTower.unshift(disc);
        return prevTower;
      }
      return prevTower;
    });
    setTowers(updatedTowers);
  };

  const moveRing = (towerIndex: number) => {
    setIsVictory(false);
    const selectedTower = towers[towerIndex];
    const [topDisc] = selectedTower;

    if (!activeDisc) {
      if (!isNaN(topDisc)) removeDisc(topDisc, towerIndex);
      return;
    }

    if (activeDisc) {
      if (!topDisc || topDisc > activeDisc) addDisc(activeDisc, towerIndex);
      checkIfWin();
      return;
    }
  };

  return (
    <div className='App'>
      <h1>
        {isVictory && <span className='winner'> You Win!! </span>}
        Towers{' '}
      </h1>

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
    </div>
  );
}

export default App;
