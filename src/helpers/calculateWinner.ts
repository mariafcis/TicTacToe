import {ETicTacToeLetter, IPlayer} from '../models';
import {Alert} from 'react-native';

const checkRows = (markersArray: IPlayer[]): IPlayer | null => {
  let rowSum = 0;
  for (let i = 0; i < markersArray.length; i += 3) {
    rowSum = 0;
    for (let j = 0; j < 3; j++) {
      if (markersArray[i + j].player_letter == ETicTacToeLetter.X) rowSum++;
      else if (markersArray[i + j].player_letter == ETicTacToeLetter.O)
        rowSum--;
    }
    let res = getResult(rowSum);
    if (res) return res;
  }
  return null;
};

const checkColumns = (markersArray: IPlayer[]): IPlayer | null => {
  let colSum = 0;
  for (let r = 0; r < 3; r++) {
    colSum = 0;
    console.log('i', r);

    for (let j = 0; j < markersArray.length; j += 3) {
      console.log('j', j);
      console.log('i+j', r + j);

      if (markersArray[r + j].player_letter == ETicTacToeLetter.X) colSum++;
      else if (markersArray[r + j].player_letter == ETicTacToeLetter.O)
        colSum--;
    }
    let res = getResult(colSum);
    if (res) return res;
  }
  return null;
};

const checkDiagonal1 = (markersArray: IPlayer[]): IPlayer | null => {
  let diagonal1Sum = 0;
  diagonal1Sum = 0;
  for (let j = 0; j < markersArray.length; j += 4) {
    if (markersArray[j].player_letter == ETicTacToeLetter.X) diagonal1Sum++;
    else if (markersArray[j].player_letter == ETicTacToeLetter.O)
      diagonal1Sum--;
  }
  return getResult(diagonal1Sum);
};

const checkDiagonal2 = (markersArray: IPlayer[]): IPlayer | null => {
  let diagonal2Sum = 0;
  diagonal2Sum = 0;
  for (let j = 1; j <= 3; j++) {
    if (markersArray[j * 2].player_letter == ETicTacToeLetter.X) diagonal2Sum++;
    else if (markersArray[j * 2].player_letter == ETicTacToeLetter.O)
      diagonal2Sum--;
  }
  return getResult(diagonal2Sum);
};

const getResult = (sum: number): IPlayer | null => {
  if (sum === 3) {
    return {
      player_letter: ETicTacToeLetter.X,
    };
  } else if (sum === -3) {
    return {
      player_letter: ETicTacToeLetter.O,
    };
  }
  return null;
};

const showWinnerAlert = (winner: IPlayer, reset: () => void) => {
  Alert.alert('Congratulations!!!', `Player ${winner?.player_letter} Won!`, [
    {
      text: 'Rematch',
      onPress: reset,
    },
  ]);
};
export const checkWinner = (markersArray: IPlayer[], reset: () => void) => {
  let winner = checkRows(markersArray);
  if (!winner) winner = checkColumns(markersArray);
  if (!winner) winner = checkDiagonal1(markersArray);
  if (!winner) winner = checkDiagonal2(markersArray);
  if (winner) showWinnerAlert(winner, reset);
};
