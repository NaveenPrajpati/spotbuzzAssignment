import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import AddPlayer from './pages/AddPlayer';
import Home from './pages/Home';
import Profile from './pages/Profile';
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
      <Stack.Screen name="Profile" component={Profile} options={{headerLeft:()=>(
          <Text style={{fontSize:18,fontFamily:'Rubik-Regular',fontWeight:'normal',textTransform:'capitalize',color:'#1D2226',lineHeight:21}}>Account Settings</Text>
        ),headerTitle:''}} />
       
    
      </Stack.Navigator>
    </NavigationContainer>
       </Provider>
  )
}

const styles = StyleSheet.create({})