import { useState } from 'react'
import Taro from '@tarojs/taro'
import { View } from "@tarojs/components"
import Header from "../../component/CreateMultiple/Header"
import Content from "../../component/JoinMultiple/content"
import './JoinMultiple.css'
import { Services } from '../../serves/Services'


export default function CreateMultiple() {
    const [click, setClick] = useState(false)
    const [name, setName] = useState('')
    const [enteredDigits, setEnteredDigits] = useState('');

    const ListFunctions = {
        handleClickButton: () => {

            setClick(!click)
            // 加入群聊 验证groupcode？  
            Services(
                {
                    url: '/api/user/group/join',
                    method: 'POST',
                    data: { 'groupcode': enteredDigits, 'groupname': name, 'userid': Number(Taro.getStorageSync('userid'))}
                }
            ).then(function (res) {
                console.log("request state is", res.data.message)
                if (res.data.code == 200) {
                    Taro.showToast({
                        title: '加入成功',
                        icon: 'none'
                    })
                    Taro.navigateTo({
                        url: '../../pages/Multiple/Multiple'
                    })
                }
                if (res.data.code == 400) {
                    Taro.showToast({
                        title: '加入失败',
                        icon: 'none'
                    })
                }

            }).catch(function (error) {
                console.log("request fail", error)
                Taro.showToast({
                    title: '出错啦，请重试',
                    icon: 'none'
                })
            })


        },

        handleBack: () => {
            Taro.navigateBack({
                delta: 1
            })
        },
        handleInput: (event) => {
            setName(event.target.value)
        },
        handleBlurGroupname: () => {
            console.log(name)
        },
        handleQuest: () => {
            console.log(enteredDigits)
        }
    }

    return (
        <>
            <View className='background'>
                <Header></Header>
                <Content ListFunctions={ListFunctions} click={click} name={name} enteredDigits={enteredDigits} setEnteredDigits={setEnteredDigits}></Content>
            </View>
        </>
    )
}
