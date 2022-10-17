import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Constants from '../Constants';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const goToGameBoard = () => {
    navigation.navigate('TicTacToe');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to the game!</Text>
      <View style={styles.buttonContainer}>
        <TouchableHighlight style={styles.button} onPress={goToGameBoard}>
          <Text style={styles.instructions}>Touch here to start</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  welcome: {
    fontSize: Constants.Font_Size_Large,
    marginTop: 50,
  },
  instructions: {
    textAlign: 'center',
    fontSize: Constants.Font_Size_Large,
    color: Constants.Background_Color,
  },
  button: {
    backgroundColor: Constants.X_Color,
    paddingHorizontal: Constants.Small_Space,
    paddingVertical: Constants.Small_Padding,
    margin: Constants.Small_Space,
    borderRadius: Constants.Border_Radius,
  },
});
