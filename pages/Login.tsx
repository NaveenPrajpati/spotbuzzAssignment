import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Login({ navigation }) {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>
                Signin to your PopX account
            </Text>
            <Text style={styles.description}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </Text>

            <View style={[styles.textinputbox,{marginTop: 24}]}>
                <Text style={styles.textinputboxtext}>Email Address</Text>
                <TextInput placeholder='Enter email address' style={{ borderWidth: 1, borderRadius: 6, borderColor: 'lightgray', height: 40 }}></TextInput>
            </View>

            <View style={ styles.textinputbox}>
                <Text style={styles.textinputboxtext}>Password</Text>
                <TextInput placeholder='Enter password' style={styles.textinputStyle}></TextInput>
            </View>

            <TouchableOpacity style={[styles.buttonstyle]} onPress={() => navigation.navigate('Profile')}>
                <Text style={styles.buttontextstyle}>Login</Text>

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
        backgroundColor: '#CBCBCB',
        marginTop: 14
    },
 
  

    buttontextstyle: {
        fontSize: 16, color: 'white', fontFamily: 'Rubik-Medium' 
    }
})