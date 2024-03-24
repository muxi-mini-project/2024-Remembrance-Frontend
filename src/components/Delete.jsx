import { View , Text } from '@tarojs/components'
import React from 'react'
import './Delete.css'

export default function Delete(props) {

    const {number,setNumber,text,nonenumber} = props;

    const changeNumber = ()=>{
        setNumber(nonenumber);
    }

    const deleteMemory = ()=>{
        setNumber(nonenumber);
        console.log("删除记忆");
    }

  return (
    <>
    <View className={number===(-1) || number === nonenumber?'notShow':'deletememory'}>
       <View className='cha' onClick={()=>changeNumber()}>+</View>
        <View className='confirm'>是否要删除此{text}</View>
        <View className='YoN'>
            <View className='yes' onClick={()=>deleteMemory()}>是</View>
            <View className='no' onClick={()=>changeNumber()}>否</View>
        </View>
    </View>
    </>
  )
}
