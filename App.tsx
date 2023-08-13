import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import AddPlayer from './pages/AddPlayer';
import Home from './pages/Home';

import Navbar from './components/Navbar';
import EditPlayer from './pages/EditPlayer';
const Stack = createNativeStackNavigator();
export default function App():JSX.Element {
  return (
        <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Home" component={Home} options={{header:()=><Navbar/>}}/>
      <Stack.Screen name="AddPlayer" component={AddPlayer} options={{headerShown:false}}/>
        <Stack.Screen name="EditPlayer" component={EditPlayer} options={{headerShown:false}}/>
 
       
    
      </Stack.Navigator>
    </NavigationContainer>
       </Provider>
  )
}

const styles = StyleSheet.create({})