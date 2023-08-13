import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Profile({navigation}) {
  return (
    <View style={styles.container}>
        <View style={{}}>
      <Text style={styles.heading}>Welcome to PopX</Text>
      <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</Text>
      
      
      <TouchableOpacity style={[styles.buttonstyle,{marginTop:29,backgroundColor:'#6C25FF'}]} onPress={()=>navigation.navigate('Signup')}> 
      <Text style={[styles.buttontextstyle,{color:'white'}]}>Create Account</Text>

      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.buttonstyle,{backgroundColor:'#6C25FF4B',marginTop:10}]} onPress={()=>navigation.navigate('Login')}>
      <Text style={styles.buttontextstyle}>Already Registered? Login</Text>

      </TouchableOpacity>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,padding:20,justifyContent:'flex-end',backgroundColor:'#F7F8F9'
    },
    heading:{
        fontSize:28,color:'black',fontFamily:'Rubik-Medium',fontWeight:'normal',
    },
    description:{
        fontSize:18,fontWeight:'bold',fontFamily:'Rubik-Regular',lineHeight:26,letterSpacing:0,marginTop:10,color:'#1D2226',opacity:0.6
    },
    buttonstyle:{  
height:46,
borderRadius:6,
justifyContent:'center',
alignItems:'center',

    },
    buttontextstyle:{
        fontSize:16,
        color:'black',
        fontFamily:'Rubik-Medium'
    }
})