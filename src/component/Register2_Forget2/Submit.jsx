import { useCallback, useContext } from 'react'
import { View, Button } from "@tarojs/components";
import Taro from '@tarojs/taro'
import { Services } from '../../serves/Services';


export default function Submit(prop) {
    const { CurrentUserContent } = prop
    const { CurrentMail,passward, secondPassward, view } = useContext(CurrentUserContent)

    const handleClick = useCallback(() => {
        Taro.navigateTo({
            url: '../../pages/Log_in/Log_in'
        })
        // 更改密码 
        const data = Services({ url: '/api/user/changepassword', method: 'POST', data: { "password": passward, "email": CurrentMail} })
        console.log(data);
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
                    <Button className='button' style={{ backgroundColor: passward == secondPassward && view ? '#2383E0' : 'transparent' }} onClick={handleClick}>完成</Button>
                    <View className='submit-foot1' style={{ display: passward == secondPassward && view ? 'none' : 'blod' }} onClick={handleBackClick}>返回上一步</View>
                </View>
            </View>
        </>
    )
}