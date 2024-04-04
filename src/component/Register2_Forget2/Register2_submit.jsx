import { useCallback, useContext } from 'react'
import { View, Button } from "@tarojs/components";
import Taro from '@tarojs/taro'
import { Services } from '../../serves/Services';


export default function Submit(prop) {
    const { CurrentUserContent } = prop
    const { CurrentMail, password, secondPassward, view } = useContext(CurrentUserContent)

    const handleClick = useCallback(() => {
        Taro.navigateTo({
            url: '../../pages/Log_in/Log_in'
        })

        // 注册
        Services(
            {
                url: '/api/register',
                method: 'PUT',
                data: { "password": password, "email": CurrentMail }
            }
        ).then(function (response) {
            console.log("change state is", response.data.message)
        }).catch(function (error) {
            console.log("request fail", error)
        })

    }, [])

    const handleBackClick = () => {
        Taro.navigateBack({
            delta: 1
        })
    }
    return (
        <>
            <View className='submit-back'>
                <View className='submit-top'>
                    <Button className='button' style={{ backgroundColor: password == secondPassward && view ? '#2383E0' : 'transparent' }} onClick={handleClick}>完成</Button>
                    <View className='submit-foot1' style={{ display: password == secondPassward && view ? 'none' : 'blod' }} onClick={handleBackClick}>返回上一步</View>
                </View>
            </View>
        </>
    )
}