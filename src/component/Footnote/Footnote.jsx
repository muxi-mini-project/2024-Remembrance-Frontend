import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useCallback } from "react";
import './Footnote.css'


export default function Submit() {

    const handleClick = useCallback(() => {
        Taro.navigateTo({
            url: '../../pages/Privacy/Privacy'
        })
    }, [])

    return (
        <>
            <View className='submit-bottom'>
                <View className='checkbox'></View>
                <View className='submit-bottom-2'>
                    <View className='submit-foot2'>我已阅读并同意
                        <View className='submit-foot3' onClick={handleClick}>《隐私政策》</View>
                        及
                        <View className='submit-foot3' onClick={handleClick}>《服务协议》</View>
                    </View>
                </View>
            </View>
        </>
    )
}
