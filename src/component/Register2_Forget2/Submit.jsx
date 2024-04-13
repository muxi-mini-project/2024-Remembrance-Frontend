import { useCallback, useContext } from 'react'
import { View, Button } from "@tarojs/components";
import Taro from '@tarojs/taro'
import { Services } from '../../serves/Services';


export default function Submit(prop) {
    const { CurrentUserContent } = prop
    const { CurrentMail, password, secondPassword } = useContext(CurrentUserContent)
    const status = password && password === secondPassword
    const handleClick = useCallback(() => {
       
        // 更改密码 
        Services(
            {
                url: '/api/user/changepassword',
                method: 'POST',
                data: { "password": password, "email": CurrentMail }
            }
        ).then(function (response) {
            console.log("change state is", response.data.message)
            if(response.data.code==200){
                Taro.navigateTo({
                    url: '../../pages/Log_in/Log_in'
                })
            }
            if(response.data.code==400){
                Taro.showToast({
                    title: '更改失败',
                    icon: 'none'
                })
            }
        }).catch(function (error) {
            console.log("request fail", error)
            Taro.showToast({
                title: '出错啦，请重试',
                icon: 'error'
            })
        })

    }, [])

    console.log(CurrentMail, password)

    const handleBackClick = () => {
        Taro.navigateBack({
            delta: 1
        })
    }
    return (
        <>
            <View className='submit-back'>
                <View className='submit-top'>
                    <Button className='button' style={{ backgroundColor: status ? '#2383E0' : 'transparent' }} onClick={handleClick}>完成</Button>
                    <View className='submit-foot1' style={{ display: status ? 'none' : 'block' }} onClick={handleBackClick}>返回上一步</View>
                </View>
            </View>
        </>
    )
}