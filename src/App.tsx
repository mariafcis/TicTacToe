import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import Constants from './Constants';
import {IPlayer, ETicTacToeLetter} from './models';

const windowWidth = Dimensions.get('window').width;
const App = () => {
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

  const calculateWinner = (squares: IPlayer[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
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

  useEffect(() => {
    const winner = calculateWinner(markers);
    if (winner?.player_letter) {
      alert(`Player ${winner?.player_letter} Won!`);
      resetMarkers();
    }
  }, [markers]);

  const renderTicTacToeItem = ({
    item,
    index,
  }: {
    item: IPlayer;
    index: number;
  }) => {
    return (
      <Pressable style={styles.cell} onPress={() => markPosition(index)}>
        {item.player_letter && (
          <Image
            source={
              item.player_letter === ETicTacToeLetter.X
                ? Constants.X_Img
                : Constants.O_Img
            }
            style={styles.icon}
          />
        )}
      </Pressable>
    );
  };

  const renderTicTacToeGrid = () => {
    return (
      <FlatList
        numColumns={3}
        data={markers}
        contentContainerStyle={styles.mainContainer}
        renderItem={renderTicTacToeItem}></FlatList>
    );
  };

  const renderPlayerName = () => {
    return (
      <View
        style={[
          styles.playerInfo,
          {
            backgroundColor:
              active_player.player_letter === ETicTacToeLetter.X
                ? Constants.X_Color
                : Constants.O_Color,
          },
        ]}>
        <Text style={styles.playerTxt}>
          Player {active_player.player_letter}'s turn
        </Text>
      </View>
    );
  };
  const renderReplay = () => {
    return (
      <Pressable style={styles.cancleBTN} onPress={resetMarkers}>
        <Image source={Constants.Replay_Img} style={styles.cancelIcon} />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.body}>
      {renderPlayerName()}
      {renderTicTacToeGrid()}
      {renderReplay()}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Constants.Background_Color,
  },
  playerInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Constants.Small_Space,
    paddingVertical: Constants.Small_Space,
    marginTop: Constants.Medium_Space,
  },
  playerTxt: {
    fontSize: Constants.Font_Size,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: Constants.Background_Color,
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: Constants.Large_Space,
  },
  icon: {
    height: Constants.IconSize,
    width: Constants.IconSize,
  },
  cancleBTN: {
    position: 'absolute',
    bottom: Constants.Small_Space,
    right: Constants.Small_Space,
  },
  cancelIcon: {
    height: Constants.CancelIcon_Size,
    width: Constants.CancelIcon_Size,
  },
  cell: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: Constants.Border_Width,
  },
});
