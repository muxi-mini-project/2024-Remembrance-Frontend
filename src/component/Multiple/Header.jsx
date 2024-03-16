import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
// import React from 'react'


export default function Header() {
    const handleCreate=()=>{
        Taro.navigateTo({
            url:'../../pages/CreateMultiple/CreateMultiple'
        })
    }
    const handleBack=()=>{
        Taro.navigateTo({
            url:''
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
                    <View className='homepage' onClick={handleBack}></View>
                    <View  id='second-title-content'>列表</View>
                    <View className='more' onClick={handleCreate}></View>
                </View>
            </View>
        </>
    )
}
