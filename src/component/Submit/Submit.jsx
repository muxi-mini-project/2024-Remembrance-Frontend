import { useCallback, useContext } from 'react'
import { View, Button } from "@tarojs/components";
import Taro from '@tarojs/taro'
import { Services } from '../../serves/Services';
import './Submit.css'

export default function Submit(prop) {
    const { CurrentUserContent, gettype, GoalPosition,  } = prop
    const { mailbox, identify, agreeCondition } = useContext(CurrentUserContent)

    const handleNextPage = useCallback(() => {

        // 检查验证码  （会返回 "验证码不存在或已过期"/"验证码正确"/"验证码错误"）
        Services(
            {
                url: '/api/check_code',
                method: 'POST',
                data: { "email": mailbox, "code": identify, "gettype": gettype }
            }
        ).then(function (response) {
            // console.log('1',response, agreeCondition);
            if (response.data.code == 200 && agreeCondition == true) {
                Taro.navigateTo({
                    url: `../../pages/${GoalPosition}?key=${mailbox}`
                })
            }
            if (agreeCondition == false) {
                Taro.showToast({
                    title: "未勾选隐私政策",
                    icon: 'none'
                })
            }
            if (response.data.code == 400) {
                Taro.showToast({
                    title: '验证码有误',
                    icon: 'none'
                })
            }
          
        }).catch(function (error) {
            console.log("request fail", error)
            Taro.showToast({
                title: "出错啦，请重试",
                icon: 'error'
            })
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
                    <Button className='button' style={{ backgroundColor: identify.length == 0 ? 'transparent' : '#2383E0' }} onClick={handleNextPage}>下一步</Button>
                    <View className='submit-foot1' onClick={handleBackClick}>返回上一步</View>
                </View>
            </View>
        </>
    )
}
