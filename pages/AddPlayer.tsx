import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native'
import React, { useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerData } from '../redux/slices/playerSlice';

export default function AddPlayer({ navigation }: { navigation: any }) {
    
    const dispatch=useDispatch()
    const {playerData,editPlayer}= useSelector(state=>state.playerState)

    const[data,setData]=useState({
        id:'',
        name:'',
        country:'',
        score:''
    })

    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('myData');
          return jsonValue != null ? JSON.parse(jsonValue) : null;
       
        } catch (e) {
          // error reading value
        }
      };

    const storeData = async (value) => {
        try {
            const existingData = await AsyncStorage.getItem('myData');
            const parsedData = existingData ? JSON.parse(existingData) : [];
            parsedData.push(value);

            await AsyncStorage.setItem('myData', JSON.stringify(parsedData));
            dispatch(setPlayerData(parsedData))
            ToastAndroid.show('Information saved',ToastAndroid.TOP)

        navigation.navigate('Home')
        } catch (e) {
          // saving error
        }
      };

     async function handleData(){
        const {id,name,country,score}=data
        const existingData = await AsyncStorage.getItem('myData');
        const parsedData = existingData ? JSON.parse(existingData) : [];

        
   
        if(!id || !name || !country || !score)
        ToastAndroid.show('all field required',ToastAndroid.TOP)
    else{
       let exist=false
        parsedData.forEach((it)=>{
            if(it.id==id){
        ToastAndroid.show('ID already exists',ToastAndroid.TOP)
        exist=true
            }

        })

        if(!exist)
        storeData(data)
        
    }

      }
   
    return (
        <ScrollView style={ styles.container}>

            <Text style={styles.heading}>
                Create Player
            </Text>


            <View style={{ position: 'relative', paddingTop: 9, marginTop: 14, height: 49, }}>
                <View style={styles.textinputSubbox}>
                    <Text style={styles.textinputboxtext}>ID</Text>
                    <Text style={{ color: '#DD4A3D' }}>*</Text>
                </View>

                <TextInput style={styles.textinputStyle} autoCapitalize='characters'  inputMode='numeric' onChangeText={(text)=>setData({...data,id:text})}></TextInput>
            </View>


            <View style={styles.textinputbox}>
                <View style={styles.textinputSubbox}>
                    <Text style={styles.textinputboxtext}>Name</Text>
                    <Text style={{ color: '#DD4A3D' }}>*</Text>
                </View>

                <TextInput style={[styles.textinputStyle,]} autoCapitalize='characters' maxLength={15}
                onChangeText={(text)=>setData({...data,name:text.toUpperCase()})}></TextInput>
            </View>

            <View style={styles.textinputbox}>
                <View style={styles.textinputSubbox}>
                    <Text style={styles.textinputboxtext}>Country</Text>
                    <Text style={{ color: '#DD4A3D' }}>*</Text>
                </View>

                <TextInput onChangeText={(text)=>setData({...data,country:text.toUpperCase()})} autoCapitalize='characters' placeholder="Ex- IN" style={[styles.textinputStyle,{textTransform:'uppercase'}]} maxLength={2}></TextInput>
            </View>

            <View style={styles.textinputbox}>
                <View style={styles.textinputSubbox}>
                    <Text style={styles.textinputboxtext}>Score</Text>
                    <Text style={{ color: '#DD4A3D' }}>*</Text>
                </View>

                <TextInput style={styles.textinputStyle} inputMode='decimal' onChangeText={(text)=>setData({...data,score:text})}></TextInput>
            </View>









            <TouchableOpacity style={[styles.buttonstyle]} onPress={handleData}>
                <Text style={{ fontSize: 16, color: 'white', fontFamily: 'Rubik-Medium' }}>Save Data</Text>

            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonstyle,{backgroundColor:'#6C25FF4B',marginTop:10}]} onPress={() => navigation.navigate('Home')}>
                <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Rubik-Medium' }}>Cancel</Text>

            </TouchableOpacity>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20, backgroundColor: '#F7F8F9', position: 'relative', 
    },
    heading: {
        fontFamily: 'Rubik-Medium', marginTop: 20, fontSize: 28, lineHeight: 36, color: 'black', width: 188 
    },
    
    textinputbox:{
        position: 'relative', paddingTop: 9, marginTop: 14, height: 49,
    },
    textinputSubbox:{
        paddingHorizontal: 5, left: 10, position: 'absolute', zIndex: 2, backgroundColor: '#F7F8F9', flexDirection: 'row' 
    },
    textinputboxtext:{
        color: '#6C25FF', fontSize: 13, fontFamily: 'Rubik-Regular', lineHeight: 17, top: 2
                    
    },
    textinputStyle: {
        borderWidth: 1, borderRadius: 6, borderColor: 'lightgray', height: 40,
    },

 
  

    buttontextstyle: {
        fontSize: 16, color: 'white', fontFamily: 'Rubik-Medium' 
    },
    buttonstyle: {
        height: 46,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6C25FF',
        marginTop: 50
    },
    radioContainer: {
        flexDirection:'row',
        marginLeft:-7,
        gap:20
       
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      gap:8
    },
})