import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setPlayerData } from '../redux/slices/playerSlice'

export default function EditPlayer({ navigation }) {

    
    const dispatch=useDispatch()
    const {playerData,editPlayer}= useSelector(state=>state.playerState)
    const [Name, setName] = useState(editPlayer.name)
    const [country, setCountry] = useState(editPlayer.country)
    const [Score, setScore] = useState(editPlayer.score)

   async function handleEdit(){
        const existingData = await AsyncStorage.getItem('myData');
        const parsedData = existingData ? JSON.parse(existingData) : [];

        parsedData.map((it)=>{
            if(it.id==editPlayer.id){
                it.name=Name
                it.country=country
                it.score=Score
       
            }
        }
        )
        await AsyncStorage.setItem('myData',JSON.stringify(parsedData))
        dispatch(setPlayerData(parsedData))
        ToastAndroid.show('data updated',ToastAndroid.TOP)
        navigation.navigate('Home')
     
      

    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>
                Update Details
            </Text>
          

            <View style={[styles.textinputbox,{marginTop: 24}]}>
                <Text style={styles.textinputboxtext}>Name</Text>
                <TextInput value={Name} onChangeText={(text)=>setName(text)} autoCapitalize='characters'  style={{ borderWidth: 1, borderRadius: 6, borderColor: 'lightgray', height: 40 }}></TextInput>
            </View>

            <View style={ styles.textinputbox}>
                <Text style={styles.textinputboxtext}>Country</Text>
                <TextInput value={country} onChangeText={(text)=>setCountry(text)} autoCapitalize='characters' style={styles.textinputStyle}></TextInput>
            </View>
            <View style={ styles.textinputbox}>
                <Text style={styles.textinputboxtext}>Score</Text>
                <TextInput value={Score} onChangeText={(text)=>setScore(text)} inputMode='numeric' style={styles.textinputStyle}></TextInput>
            </View>

            <TouchableOpacity style={[styles.buttonstyle]} onPress={handleEdit}>
                <Text style={styles.buttontextstyle}>UPDATE</Text>

            </TouchableOpacity>

            <TouchableOpacity style={[styles.buttonstyle,{backgroundColor:'#6C25FF4B'}]} onPress={() => navigation.navigate('Home')}>
                <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Rubik-Medium' }}>Cancel</Text>

            </TouchableOpacity>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20, marginTop: 20, backgroundColor: '#F7F8F9' 
    },
    heading: {
        fontFamily: 'Rubik-Medium', fontSize: 28, lineHeight: 36, color: 'black', width: 188 
    },
    description: {
        marginTop: 14, fontFamily: 'Rubik-Regular', fontSize: 18, lineHeight: 26, width: 232, color: '#1D2226', opacity: 0.6 
    },
    textinputbox:{
        position: 'relative', paddingTop: 9, marginTop: 14, height: 49,
    },
    textinputboxtext:{
        paddingHorizontal: 5, marginLeft: 10, position: 'absolute', zIndex: 2, backgroundColor: '#F7F8F9',
        color: '#6C25FF', fontSize: 13, fontFamily: 'Rubik-Regular', fontWeight: '600', lineHeight: 17, top: 2
    },
    textinputStyle: {
        borderWidth: 1, borderRadius: 6, borderColor: 'lightgray' 
    },
    buttonstyle: {
        height: 46,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6C25FF',
        marginTop: 14
    },
 
  

    buttontextstyle: {
        fontSize: 16, color: 'white', fontFamily: 'Rubik-Medium' 
    }
})