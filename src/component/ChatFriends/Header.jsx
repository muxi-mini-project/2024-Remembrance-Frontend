// import React from 'react'
import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"

export default function Heater() {
  const handleBack=()=>{
    Taro.navigateBack({
      delta:1
    })
  }
  return (
    <>
      <View className='header'>
        <View className='title'>
          <View className='title-logo'></View>
          <View className='title-content'>多人记忆</View>
          <View className='none'></View>
        </View>
        <View className='second-title'>
          <View className='return' onClick={handleBack}></View>
          <View id='second-title-content'>群聊设置</View>
          <View className='none'></View>
        </View>
      </View>

    </>
  )
}
