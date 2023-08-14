import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { setSortOrder } from '../redux/slices/playerSlice';
const data = [
    { label: 'id', value: 'id' },
    { label: 'name', value: 'name' },
    { label: 'country', value: 'country' },
    { label: 'score', value: 'score' },

    
  ];

export default function Navbar() {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const dispatch=useDispatch()
    const {playerData,editPlayer}= useSelector(state=>state.playerState)


  return (
    <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'lightgray',padding:10,alignItems:'center'}}>
      <Text style={{color:'#6C25FF',fontSize:18}}>Player List </Text>
     <View >
      
      {playerData?.length>0 && <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
        containerStyle={{}}
        iconColor='black'
        itemTextStyle={{color:'black'}}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            dispatch(setSortOrder(item.value))
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <Text style={{color:'black'}}>sort order</Text>
          )}
        />
        }
     
     </View>
    </View>
  )
}

const styles = StyleSheet.create({
 
      dropdown: {
        height: 30,
        borderColor: '#6C25FF',
        borderWidth:1,
        paddingHorizontal: 4,
   
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'gray',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        color:'pink'

      },
      placeholderStyle: {
        fontSize: 16,
        color:'pink'

      },
      selectedTextStyle: {
        color:'pink',
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
        
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color:'pink'
      },
})