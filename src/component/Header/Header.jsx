import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import './Header.css'

export default function Header({title, navigationUrl,secondTitle}) {
    // const {CurrentUserContent}=prop
    // const {item}=useContext(CurrentUserContent)
    const handleClickBack=()=>{
        Taro.navigateBack({
            delta:1
        })
    }
    const handleClickNext=()=>{
        Taro.navigateTo({
            url:`../../pages${navigationUrl}?key=${secondTitle}`
        })
    }
    return (
        <>
            <View className='header'>
                <View className='title'>
                    <View className='title-logo'></View>
                    <View className='title-content'>{title}</View>
                    <View className='none'></View>
                </View>
                <View className='second-title'>
                    <View className='return' onClick={handleClickBack}></View>
                    <View className='second-title-content' >{secondTitle}</View>
                    <View className='next-page' onClick={handleClickNext}></View>
                </View>
            </View>
        </>
    )
}
