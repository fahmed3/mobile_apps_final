import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HomeStack, OutputStack } from './MyStack';

const Tab = createBottomTabNavigator();

const tabScreenOptions = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    return <Ionicons
    name={focused ? 'musical-notes' : 'musical-notes-outline'}
    size={size} color={color}/>
  },
  header: () => null,
})

const MyTab = () => {
  return (
    <Tab.Navigator 
    >
    <Tab.Screen name="Editor" component={HomeStack} options={tabScreenOptions} />
    <Tab.Screen name="Output" component={OutputStack} options={tabScreenOptions}/>
    </Tab.Navigator>
  )
}

export default MyTab