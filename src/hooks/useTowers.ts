import { useState } from 'react';

type Disc = number;
const initialDiscs: Disc[] = [...Array(7).keys()].map((index) => index + 1);

const useTowers = () => {
  const [towers, setTowers] = useState([[...initialDiscs], [], []]);
  const [move, setMove] = useState(0);

  const [isVictory, setIsVictory] = useState(false);
  const [activeDisc, setActiveDisk] = useState<number | null>();

  const resetGame = () => {
    setTowers([[...initialDiscs], [], []]);
    setActiveDisk(null);
    setIsVictory(false);
    setMove(0);
  };

  const checkIfWin = () => {
    const [_tower1, ...winningTowers] = towers;
    if (
      isVictory &&
      !winningTowers.find((wTower) => wTower.length === initialDiscs.length)
    ) {
      setIsVictory(false);
    }

    if (!isVictory) {
      if (
        winningTowers.find((wTower) => wTower.length === initialDiscs.length)
      ) {
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
    setMove(move + 1);

    if (activeDisc) {
      if (!topDisc || topDisc > activeDisc) addDisc(activeDisc, towerIndex);
      checkIfWin();
      return;
    }
  };

  return { towers, moveRing, isVictory, resetGame, activeDisc, move };
};

export default useTowers;
