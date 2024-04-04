import { useCallback, useContext } from 'react'
import { View, Button } from "@tarojs/components";
import Taro from '@tarojs/taro'
import { Services } from '../../serves/Services';
import './Submit.css'

export default function Submit(prop) {
    const { CurrentUserContent, gettype, GoalPosition } = prop
    const { mailbox, identify } = useContext(CurrentUserContent)

    const handleNextClick = useCallback(() => {
        Taro.navigateTo({
            url: `../../pages/${GoalPosition}?key=${mailbox}`
        })
        // 检查验证码  （会返回 "验证码不存在或已过期"/"验证码正确"/"验证码错误"）
        Services(
            {
                url: '/api/check_code',
                method: 'POST',
                data: { "email": mailbox, "code": identify, "gettype": gettype }
            }
        ).then(function(response){
            console.log("response is",response.data.message)
        }).catch(function(error){
            console.log("request fail",error)
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
                    <Button className='button' style={{ backgroundColor: mailbox && mailbox.length ? '#2383E0' : 'transparent' }} onClick={handleNextClick}>下一步</Button>
                    <View className='submit-foot1' onClick={handleBackClick}>返回上一步</View>
                </View>
            </View>
        </>
    )
}
