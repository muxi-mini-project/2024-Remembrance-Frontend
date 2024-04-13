import { useState } from 'react'
import Taro from "@tarojs/taro"
import { View } from "@tarojs/components"
import Header from "../../component/CreateMultiple/Header"
import Content from "../../component/CreateMultiple/Content"
import "./CreateMultiple.css"
import { Services } from '../../serves/Services'


export default function CreateMultiple() {

    const [click, setClick] = useState(false)
    const [name, setName] = useState('')
    const [enteredDigits, setEnteredDigits] = useState('');

    const ListFunctions = {
        handleBack: () => {
            Taro.navigateBack({
                delta: 1
            })
        },
        handleInput: (event) => {
            setName(event.target.value)
        },
        handleSend: () => {
            console.log(name)

        },
        handleClickCreate: () => {
            setClick(!click)
            // 创建新群聊
            Services(
                {
                    url: '/api/user/group/creat',
                    method: 'PUT',
                    data: { "groupname": name, "userid": Number(Taro.getStorageSync('userid')) }
                }
            ).then(function (res) {
                console.log("request state is", res.data.message)
                if (res.data.code == 200) {
                    Taro.showToast({
                        title: "创建成功,请注意查收群聊数字",
                        icon: 'none'
                    })
                    Taro.showToast({
                        title: res.data.data.groupcode,
                        icon: 'none'
                    })
                }
                if (res.data.code == 400) {
                    Taro.showToast({
                        title: "该群名已被使用,请不要重复哦",
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
        },
        handleQuest: () => {
            Taro.navigateTo({
                url: '../../pages/Multiple/Multiple'
            })
        }
    }
    return (
        <>
            <View className='background'>
                <Header></Header>
                <Content ListFunctions={ListFunctions} name={name} click={click} enteredDigits={enteredDigits} setEnteredDigits={setEnteredDigits}></Content>
            </View>
        </>
    )
}
