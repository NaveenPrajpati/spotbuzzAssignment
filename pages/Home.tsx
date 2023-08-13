import { StyleSheet, Text, View,Image,TouchableOpacity,FlatList,Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setEditPlayer, setPlayerData } from '../redux/slices/playerSlice';
import Navbar from '../components/Navbar';
import EditPlayer from './EditPlayer';


export default function Home({navigation}) {
  const {playerData,sortOrder}= useSelector(state=>state.playerState)
  const dispatch=useDispatch()
  

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

 async function handleDelete(item){
    const jsonValue = await AsyncStorage.getItem('myData');
    const data= jsonValue != null ? JSON.parse(jsonValue) : null;
    const filt=data.filter(it=>it.id!==item.id)
    Alert.alert(
      'Confirmation',
      `Are you sure, you want to delete player ${item.name}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
      },
      {
          text: 'Delete',
          style: 'destructive',
          onPress: async() => {
            await AsyncStorage.setItem('myData',JSON.stringify(filt))
            dispatch(setPlayerData(filt))
          },
      },
      ],
     
    )
   
  }

  function sortedData() {
    console.log(sortOrder);
    if (sortOrder =='score' || sortOrder == 'id') {
        return [...playerData].sort((a, b) => parseFloat(a[sortOrder]) - parseFloat(b[sortOrder]));
    } else {
        return [...playerData].sort((a, b) => a[sortOrder].localeCompare(b[sortOrder]));
    }
}


  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.buttonstyle]} onPress={() => navigation.navigate('AddPlayer')}>
                <Text style={styles.buttontextstyle}>Add Player</Text>

            </TouchableOpacity>
      <View style={{marginTop:10,}}>
    {playerData.length>0?
        <FlatList
        data={sortedData()}
        renderItem={({item,index})=>(
          <View key={index} style={{backgroundColor:'lightgray',borderRadius:6,marginVertical:4,padding:5}}>
          <Text style={{color:'black',fontWeight:'500'}}>Id: {item?.id}</Text>
          <Text style={{color:'black',fontWeight:'500'}}>Name: {item?.name}</Text>
          <Text style={{color:'black',fontWeight:'500'}}>Country: {item?.country}</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>

          <Text style={{color:'black',fontWeight:'500'}}>Score: {item?.score}</Text>
          <View style={{flexDirection:'row',gap:10}}>
            <TouchableOpacity onPress={()=>{
              dispatch(setEditPlayer(item))
              navigation.navigate('EditPlayer')
            }}>
            <Text style={{color:'purple'}}>edit</Text>
            </TouchableOpacity >

            <TouchableOpacity onPress={()=>handleDelete(item)}>
            <Text style={{color:'red'}}>delete</Text>

            </TouchableOpacity>
          </View>
          </View>
          
          </View>
        )}
        />:
        <Text style={{color:'black'}}>Add player to list</Text>}
     
      </View>
     
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,padding:10,backgroundColor:'#F7F8F9'
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
      backgroundColor: '#6C25FF',
      marginTop: 14
  },



  buttontextstyle: {
      fontSize: 16, color: 'white', fontFamily: 'Rubik-Medium' 
  }
})