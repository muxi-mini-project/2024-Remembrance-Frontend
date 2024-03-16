import { useContext } from 'react'
import { View } from "@tarojs/components"

export default function Poppup2(prop) {
    const { CurrentUserContent } = prop
    const {ListFunctions } = useContext(CurrentUserContent)

    return (
        <>
            <View className='poppup'>
                <View className='cancle-button' onClick={ListFunctions.handleNotCancle}>x</View>
                <View className='poppup-content'>是否要将该用户移出群聊</View>
                <View className='check-button'>
                    <View className='check-botton-content1' id='default' onClick={ListFunctions.handleCancle}>是</View>
                    <View className='check-botton-content1' onClick={ListFunctions.handleNotCancle}>否</View>
                </View>
            </View>

        </>
    )
}
