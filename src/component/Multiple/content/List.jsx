// import React from 'react'
import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { useContext } from "react"


export default function List(prop) {
   const {CurrentUserContent}=prop
   const {list,setIdcontext}=useContext(CurrentUserContent)

    const handleClick = (item) => {
        console.log(item.id)
        setIdcontext(item.id)
        Taro.navigateTo({
            url: `../../pages/GoalList/GoalList?key=${item.position}`
        })
    }

    return (
        <>
            <View className='list'>
                {
                    list && list.map((item) =>
                        <View key={item.id} className='list-back'>
                            <View className='list-title'>
                                <View className='list-title-content'>{item.count}人</View>
                                <View className='list-title-position'>{item.position}</View>
                            </View>
                            <View onClick={() => handleClick(item)} className='list-content'></View>
                            <View className='list-time'>{item.time}</View>
                        </View>
                    )
                }
            </View>
        </>
    )
}
