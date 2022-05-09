import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { OutputStack } from './MyStack';
import MyTab from './MyTab';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={MyTab} />
    <Drawer.Screen name="Output" component={OutputStack} />
    </Drawer.Navigator>
  )
}

export default MyDrawer;