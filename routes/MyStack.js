import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Output from '../screens/Output';
// import About from '../screens/About';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle:{
    backgroundColor:'navy',
  },
  headerTintColor:'white',
  headerTitleStyle:{
    fontWeight:'bold',
  }
}

const OutputStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Output" component={Output} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export { HomeStack, OutputStack };
