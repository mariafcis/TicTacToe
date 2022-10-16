import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, FlatList, Alert} from 'react-native';
import PlayerName from '../components/PlayerName';
import ReplayButton from '../components/ReplayButton';
import TicTacToeItem from '../components/TicTacToeItem';
import Constants from '../Constants';
import {IPlayer, ETicTacToeLetter} from '../models';

const TicTacToeScreen = () => {
  const [active_player, setActive_player] = useState({
    player_letter: ETicTacToeLetter.X,
  });
  const [markers, setMarkers] = useState(new Array(9).fill(''));

  const markPosition = (position: number) => {
    console.log('markPosition', position, markers);

    if (!markers[position]) {
      let temp = [...markers];
      temp[position] = active_player;
      setMarkers(temp);
      console.log('temp', temp);

      if (active_player.player_letter === ETicTacToeLetter.X) {
        //transfer chances to next player
        setActive_player({player_letter: ETicTacToeLetter.O});
      } else {
        setActive_player({player_letter: ETicTacToeLetter.X});
      }
    }
  };

  const resetMarkers = () => {
    setMarkers(new Array(9).fill(''));
  };

  const showWinnerAlert = (winner: IPlayer) => {
    Alert.alert(
      'Congratulations!!!',
      `Player ${winner?.player_letter} Won!`,
      [
        {
          text: 'OK',
          style: 'cancel',
        },

        {
          text: 'Rematch',
          onPress: () => resetMarkers(),
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const calculateWinner = (squares: IPlayer[]) => {
    const win_lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < win_lines.length; i++) {
      const [a, b, c] = win_lines[i];
      if (
        squares[a]?.player_letter &&
        squares[a].player_letter === squares[b].player_letter &&
        squares[a].player_letter === squares[c].player_letter
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const renderTicTacToeItem = ({
    item,
    index,
  }: {
    item: IPlayer;
    index: number;
  }) => {
    return <TicTacToeItem item={item} index={index} onPress={markPosition} />;
  };

  const renderTicTacToeGrid = (markers: IPlayer[]) => {
    return (
      <FlatList
        numColumns={3}
        data={markers}
        contentContainerStyle={styles.mainContainer}
        renderItem={renderTicTacToeItem}></FlatList>
    );
  };

  useEffect(() => {
    const winner = calculateWinner(markers);
    if (winner?.player_letter) {
      showWinnerAlert(winner);
    }
  }, [markers]);

  return (
    <SafeAreaView style={styles.body}>
      <PlayerName active_player={active_player} />
      {renderTicTacToeGrid(markers)}
      <ReplayButton resetMarkers={resetMarkers} />
    </SafeAreaView>
  );
};

export default TicTacToeScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Constants.Background_Color,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
