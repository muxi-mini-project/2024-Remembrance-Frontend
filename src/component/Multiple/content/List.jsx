// import React from 'react'
import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { useContext } from "react"
import { key } from "../../../utils/keyGene"


export default function List(prop) {
   const {CurrentUserContent}=prop
   const {groupid,list}=useContext(CurrentUserContent)

    const handleClick = (item) => {
        Taro.navigateTo({
            url: `../../pages/GoalList/GoalList?key=${item.Name}&groupid=${groupid}`
        })
    }

    return (
        <>
            <View className='list'>
                {
                    list && list.map((item) =>
                        <View key={key.next().value} className='list-back'>
                            <View className='list-title'>
                                <View className='list-title-content'>{item.peoplenum}人</View>
                                <View className='list-title-position'>{item.Name}</View>
                            </View>
                            <View onClick={() => handleClick(item)} className='list-content'></View>
                            <View className='list-time'>{item.CreatedAt}</View>
                        </View>
                    )
                }
            </View>
        </>
    )
}
