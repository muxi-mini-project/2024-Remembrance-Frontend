// import React from 'react'
import { View } from "@tarojs/components"
import Header from "../../component/CreateMultiple/Header"
import Content from "../../component/CreateMultiple/Content"
import "./CreateMultiple.css"



export default function CreateMultiple() {
   
    return (
        <>
            <View className='background'>
                <Header></Header>
                <Content></Content>
            </View>
        </>
    )
}
