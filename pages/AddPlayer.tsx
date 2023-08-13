import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native'
import React, { useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddPlayer({ navigation }: { navigation: any }) {
    const [value, setValue] = useState('');

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
// console.log('before-',parsedData)
    

            parsedData.push(value);
// console.log('after-',parsedData)

            await AsyncStorage.setItem('myData', JSON.stringify(parsedData));
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

        if(parsedData)
        parsedData.map((it)=>{
            if(it.id==id){
        ToastAndroid.show('ID already exists',ToastAndroid.TOP)
        return
            }

        })
   
       else if(!id || !name || !country || !score)
        ToastAndroid.show('all field required',ToastAndroid.TOP)
  
    else{
      
        storeData(data)
        
    }

      }
   
    return (
        <ScrollView style={ styles.container}>

            <Text style={styles.heading}>
                Create your PopX account
            </Text>


            <View style={{ position: 'relative', paddingTop: 9, marginTop: 14, height: 49, }}>
                <View style={styles.textinputSubbox}>
                    <Text style={styles.textinputboxtext}>ID</Text>
                    <Text style={{ color: '#DD4A3D' }}>*</Text>
                </View>

                <TextInput style={styles.textinputStyle} onChangeText={(text)=>setData({...data,id:text})}></TextInput>
            </View>


            <View style={styles.textinputbox}>
                <View style={styles.textinputSubbox}>
                    <Text style={styles.textinputboxtext}>Name</Text>
                    <Text style={{ color: '#DD4A3D' }}>*</Text>
                </View>

                <TextInput style={[styles.textinputStyle,{textTransform:'uppercase'}]} maxLength={15}
                onChangeText={(text)=>setData({...data,name:text})}></TextInput>
            </View>

            <View style={styles.textinputbox}>
                <View style={styles.textinputSubbox}>
                    <Text style={styles.textinputboxtext}>Country</Text>
                    <Text style={{ color: '#DD4A3D' }}>*</Text>
                </View>

                <TextInput onChangeText={(text)=>setData({...data,country:text})} placeholder="Ex-'IN'" style={[styles.textinputStyle,{textTransform:'uppercase'}]} maxLength={2}></TextInput>
            </View>

            <View style={styles.textinputbox}>
                <View style={styles.textinputSubbox}>
                    <Text style={styles.textinputboxtext}>Score</Text>
                    <Text style={{ color: '#DD4A3D' }}>*</Text>
                </View>

                <TextInput style={styles.textinputStyle} inputMode='numeric' onChangeText={(text)=>setData({...data,score:text})}></TextInput>
            </View>









            <TouchableOpacity style={[styles.buttonstyle]} onPress={handleData}>
                <Text style={{ fontSize: 16, color: 'white', fontFamily: 'Rubik-Medium' }}>Save Data</Text>

            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonstyle]} onPress={() => navigation.navigate('Home')}>
                <Text style={{ fontSize: 16, color: 'white', fontFamily: 'Rubik-Medium' }}>Cancel</Text>

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