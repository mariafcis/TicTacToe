import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Constants from '../Constants';
import {IPlayer, ETicTacToeLetter} from '../models';

const PlayerName = ({active_player}: {active_player: IPlayer}) => {
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

export default PlayerName;

const styles = StyleSheet.create({
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
});
