import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TicTacToeScreen from '../screens/TicTacToeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="TicTacToe" component={TicTacToeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Navigation;
