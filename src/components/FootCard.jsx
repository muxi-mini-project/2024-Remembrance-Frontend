import { Image, Text, View } from '@tarojs/components'
import React from 'react'
import zu177Image from '../assets/foot/组 177@2x.png'
import zu158Image from '../assets/foot/组 158@2x.png'

export default function FootCard(props) {

    const {footnumber,setFootnumber} = props

  return (
    <>
    <View className='footcard'>
          {footnumber !== 0 ? <Image onClick={()=>{setFootnumber(1)}} className='zu158' src={zu158Image}></Image>:''}
          <View className='footplace'>
            <Image className='zu177' src={zu177Image}></Image>
            <View>大理</View>
          </View>
          <View className='footphoto'>
            <View></View>
            <View></View>
          </View>
          <View className='footfeel'>
            <View className='footfeeling'>
              <View className='content'>11111111111111111111111111111111111111111111111111111111111111111111111111</View>
              <Text className='commentDate'>2024.10.30</Text>
            </View>
            <View className='footfeeling'>
              <View className='content'>11111111111111111111111111111111111111111111111111111111111111111111111111</View>
              <Text className='commentDate'>2024.10.30</Text>
            </View>
          </View>
        </View>
    </>
  )
}
