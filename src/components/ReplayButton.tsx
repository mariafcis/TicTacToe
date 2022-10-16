import React from 'react';
import {Pressable, Image, StyleSheet} from 'react-native';
import Constants from '../Constants';

const ReplayButton = ({resetMarkers}: {resetMarkers: () => void}) => {
  return (
    <Pressable style={styles.cancleBTN} onPress={resetMarkers}>
      <Image source={Constants.Replay_Img} style={styles.replayIcon} />
    </Pressable>
  );
};

export default ReplayButton;

const styles = StyleSheet.create({
  cancleBTN: {
    position: 'absolute',
    bottom: Constants.Small_Space,
    right: Constants.Small_Space,
  },
  replayIcon: {
    height: Constants.ReplayIcon_Size,
    width: Constants.ReplayIcon_Size,
  },
});
