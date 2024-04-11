// import React from 'react'
import { View } from "@tarojs/components"
import { useContext } from "react"
import { key } from "../../../utils/keyGene"

export default function ChatList(prop) {
   const {CurrentUserContent}=prop
   const {chatlist}=useContext(CurrentUserContent)
    return (
        <>
        <View className='chatlist-background'>
            {
                chatlist && chatlist.map((item) =>
                    <View className='chatlist' key={key.next().value}>
                        <View className='username'>{item.username}</View>
                        <View className='chatContent1'>{item.content}</View>
                    </View>
                )

            }
            </View>
        </>
    )

}