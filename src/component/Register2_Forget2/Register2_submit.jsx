import { useContext } from 'react'
import { View, Button } from "@tarojs/components";
import Taro from '@tarojs/taro'
import { Services } from '../../serves/Services';


export default function Submit(prop) {
    const { CurrentUserContent } = prop
    const { CurrentMail, password,view } = useContext(CurrentUserContent)
    // const [clickview, setClickView] = useState(false)

    const handleClick = () => {

        // 注册
        Services(
            {
                url: '/api/register',
                method: 'PUT',
                data: { "password": password, "email": CurrentMail }
            }
        ).then(function (response) {
            console.log("register state is", response.data.message)
            if (response.data.code == 200) {
                Taro.navigateTo({
                    url: '../../pages/Log_in/Log_in'
                })
            }
            if (response.data.code == 400) {
                Taro.showToast({
                    title: '请重试',
                    icon: 'none'
                })
            }
        }).catch(function (error) {
            console.log("request fail", error)
            Taro.showToast({
                title: error,
                icon: 'error'
            })
        })

    }

    const handleBackClick = () => {
        Taro.navigateBack({
            delta: 1
        })
    }
    return (
        <>
            <View className='submit-back'>
                <View className='submit-top'>
                    <Button className='button' style={{ backgroundColor: view ? '#2383E0' : 'transparent' }} onClick={handleClick}>完成</Button>
                    <View className='submit-foot1' style={{ display: view ? 'none' : 'blod' }} onClick={handleBackClick}>返回上一步</View>
                </View>
            </View>
        </>
    )
}