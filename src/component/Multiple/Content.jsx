// import React from 'react'
import { View } from "@tarojs/components";
import List from './content/List'
// import Bubble from "../Bubble/Bubble";



export default function Content(prop) {
const {CurrentUserContent}=prop

    return (
        <>
            <View className='background'>
                <View className='bubble1'></View>
                <View className='bubble2'></View>
                <View className='bubble3'></View>
                <View className='bubble4'></View>
                <View className='bubble5'></View>
                <List CurrentUserContent={CurrentUserContent}></List>
            </View>
        </>
    )
}
