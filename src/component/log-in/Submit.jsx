import { useContext } from 'react'
import Taro from '@tarojs/taro';
import { View, Button } from "@tarojs/components";
import { Services } from '../../serves/Services'



export default function Submit(prop) {
    const { CurrentUserContent } = prop
    const { password, mailbox, agreeCondition } = useContext(CurrentUserContent)

    const handleEnter = () => {

        // 登入接口 
        Services(
            {
                url: '/api',
                method: 'POST',
                data: { "email": mailbox, "password": password }
            }
        ).then(function (response) {
            console.log("request state is", response.data.message)
            Taro.setStorageSync("token", response.header.Authorization)
            Taro.setStorageSync("userid", response.data.data)
            if (response.data.code == 200 && agreeCondition == true) {
                Taro.navigateTo({
                    url: `../../pages/index/index?userid=${Taro.getStorageSync('userid')}`,
                })
            }
            if (response.data.code == 400) {
                Taro.showToast({
                    title: '账号或密码错误',
                    icon: 'none'
                })
            }
            if (agreeCondition == false) {
                Taro.showToast({
                    title: "未勾选隐私政策",
                    icon: 'none'
                })
            }
        }).catch(function (error) {
            console.log("request failed", error)
            Taro.showToast({
                title: error,
                icon: 'error'
            })
        })

    }
    return (
        <>
            <View className='submit-back'>
                <View className='submit-top'>
                    <Button className='button' style={{ backgroundColor: agreeCondition && password.length ? '#2383E0' : 'transparent' }} onClick={handleEnter}>登入</Button>
                    <View className='submit-foot1'>微信授权登入</View>
                </View>
            </View>
        </>
    )
}
