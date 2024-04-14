import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import './Header.css'

export default function Header({ListFunctions,title,secondTitle, backUrl='/pages/index/index'}) {
  
    const handleClickBack=()=>{
        Taro.redirectTo({
            url: backUrl
        })
    }
    const handleClickNext=()=>{
        ListFunctions.handleClickMore()
    }
    return (
        <>
            <View className='header-header'>
                <View className='title-title'>
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
