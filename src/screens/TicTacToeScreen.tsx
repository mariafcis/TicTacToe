import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import PlayerName from '../components/PlayerName';
import ReplayButton from '../components/ReplayButton';
import TicTacToeItem from '../components/TicTacToeItem';
import Constants from '../Constants';
import {checkWinner} from '../helpers/calculateWinner';
import {IPlayer, ETicTacToeLetter} from '../models';

const TicTacToeScreen = () => {
  const [active_player, setActive_player] = useState({
    player_letter: ETicTacToeLetter.X,
  });
  const [markers, setMarkers] = useState(new Array(9).fill(''));

  const markPosition = (position: number) => {
    if (!markers[position]) {
      let temp = [...markers];
      temp[position] = active_player;
      setMarkers(temp);

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
    checkWinner(markers, resetMarkers);
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
