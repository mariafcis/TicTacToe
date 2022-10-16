import React from 'react';
import {Pressable, Image, StyleSheet, Dimensions} from 'react-native';
import Constants from '../Constants';
import {IPlayer, ETicTacToeLetter} from '../models';

const windowWidth = Dimensions.get('window').width;

const TicTacToeItem = ({
  item,
  index,
  onPress,
}: {
  item: IPlayer;
  index: number;
  onPress: (index: number) => void;
}) => {
  return (
    <Pressable style={styles.cell} onPress={() => onPress(index)}>
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

export default TicTacToeItem;

const styles = StyleSheet.create({
  icon: {
    height: Constants.IconSize,
    width: Constants.IconSize,
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
