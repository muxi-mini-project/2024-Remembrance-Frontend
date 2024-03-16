import { useContext } from 'react'
import { View } from "@tarojs/components"

export default function Poppup(prop) {
    const { CurrentUserContent } = prop
    const { setDisband,ListFunctions } = useContext(CurrentUserContent)
    const handleCancle = () => {
        setDisband(false)
    }
    return (
        <>
            <View className='poppup'>
                <View className='cancle-button' onClick={handleCancle}>x</View>
                <View className='poppup-content'>是否要解散此群聊</View>
                <View className='check-button'>
                    <View className='check-botton-content1' id='default' onClick={ListFunctions.handleDisband}>是</View>
                    <View className='check-botton-content1' onClick={handleCancle}>否</View>
                </View>
            </View>

        </>
    )
}
