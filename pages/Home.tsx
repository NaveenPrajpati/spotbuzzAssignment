import { StyleSheet, Text, View,Image,TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerData } from '../redux/slices/playerSlice';
import Navbar from '../components/Navbar';


export default function Home({navigation}) {

  const dispatch=useDispatch()
  const {playerData}= useSelector(state=>state.playerState)
  

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('myData');
      const data= jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(data)
      dispatch(setPlayerData(data))
    } catch (e) {
      // error reading value
    }
  };

  useEffect(()=>{
    getData()
// console.log('data is-',playerData)

  },[])

  return (
    <View style={styles.container}>
      <Navbar/>
      <View style={{marginTop:10,flexDirection:'row',gap:20}}>
        <View  style={{position:'relative'}}>

        <Image source={require('../assets/images/profilepic.png')} alt='no' width={76} height={76}  />
        <Image source={require('../assets/images/picprofile.png')} alt='no' width={21} height={23} style={{position:'absolute',right:-3,bottom:4}} />
        
        </View>
        <View>
            <Text style={styles.nameStyle}>name</Text>
            <Text style={styles.mailStyle}>name@gmail.com</Text>
     
        </View>
      </View>
      <TouchableOpacity style={[styles.buttonstyle]} onPress={() => navigation.navigate('AddPlayer')}>
                <Text style={styles.buttontextstyle}>Login</Text>

            </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,padding:20,backgroundColor:'#F7F8F9'
    },
    nameStyle:{
        fontSize:15,fontFamily:'Rubik-Medium',textTransform:'capitalize',color:'black',lineHeight:19
    },
    mailStyle:{
        marginTop:6,fontSize:14,fontFamily:'Rubik-Regular',textTransform:'capitalize',color:'#1D2226',lineHeight:19
    },

    desc:{
        marginTop:30,fontSize:14,lineHeight:22,fontFamily:'Rubik-Regular',textTransform:'capitalize',color:'#1D2226',
    },
    buttonstyle: {
      height: 46,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#CBCBCB',
      marginTop: 14
  },



  buttontextstyle: {
      fontSize: 16, color: 'white', fontFamily: 'Rubik-Medium' 
  }
})