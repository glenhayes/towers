import { useState } from 'react';
import './App.css';

type Disc = {
  id: number;
  size: number;
  color: string;
};

const COLORS = [
  'tomato',
  'blanchedalmond',
  'blueviolet',
  'goldenrod',
  'olive',
  'darkcyan',
  'coral',
];
const discs: Disc[] = [...Array(7).keys()].map((index) => ({
  id: index + 1,
  size: index + 1,
  color: COLORS[index],
}));
function App() {
  const [towers, setTowers] = useState([discs, [], []]);
  const [activeDisc, setActiveDisk] = useState<Disc | null>();

  const removeDisc = (disc: Disc, towerIndex: number) => {
    setActiveDisk(disc);
    setTowers((prevTowers) => {
      return prevTowers.map((prevTower, index) => {
        if (towerIndex === index) {
          return prevTower.filter((prevDisc) => prevDisc.id !== disc.id);
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
    const selectedTower = towers[towerIndex];
    const [topDisc] = selectedTower;

    if (!activeDisc) {
      if (topDisc) removeDisc(topDisc, towerIndex);
      return;
    }

    if (activeDisc) {
      if (!topDisc || topDisc.size > activeDisc.size)
        addDisc(activeDisc, towerIndex);
      return;
    }
  };

  return (
    <div className='App'>
      <h1>Towers</h1>
      <div className='activeDisk'>
        {activeDisc && (
          <div
            className='disc'
            style={{
              width: `${activeDisc.size * 10 + 20}px`,
              background: activeDisc.color,
            }}
          />
        )}
      </div>
      <div className='towers'>
        {towers.map((tower, i) => (
          <button className='tower' key={i} onClick={() => moveRing(i)}>
            {tower.length &&
              tower.map((disc) => (
                <div
                  key={disc.id}
                  className='disc'
                  style={{
                    width: `${disc.size * 10 + 20}px`,
                    background: disc.color,
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
