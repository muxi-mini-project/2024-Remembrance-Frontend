import {useContext} from 'react'
import Taro from '@tarojs/taro';
// import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import './More/More.css'


export default function More(prop) {
    const {CurrentUserContent}=prop
    const {more}= useContext(CurrentUserContent)

    const handleClickCreate=()=>{
        Taro.navigateTo({
            url:`../../pages/CreateMultiple/CreateMultiple`
        })
    }
    const handleClickJoin=()=>{
        Taro.navigateTo({
            url:`../../pages/JoinMultiple/JoinMultiple`
        })
        console.log(111)
    }

    return (
        <>
            <View className='more-background' style={{display:more?'block':'none'}}>
                <View className='more-content'>
                    <View className='creat-group'>
                        <View className='creat-image'></View>
                        <View className='creat-font' onClick={handleClickCreate}>创建群聊</View>
                    </View>
                    <View className='join-group'>
                        <View className='join-image'></View>
                        <View className='creat-font' onClick={handleClickJoin}>加入群聊</View>
                    </View>
                </View>
            </View>
        </>
    )
}
