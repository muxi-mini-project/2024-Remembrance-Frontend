import { View } from '@tarojs/components'
import React from 'react'

export default function FeelingLook(props) {

    const {leafList,looknumber} = props;

  return (
    <>
    <View className='lookMemory'>
          <View className='lookname'>昵称</View>
          <View className='lookContent'></View>
          <View className='lookPhoto'></View>
          <View className='lookDate'>{leafList[looknumber].date}</View>
        </View>
    </>
  )
}
