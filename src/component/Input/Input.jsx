import { useContext, useState } from 'react'
import Taro from '@tarojs/taro';
import { View, Input } from "@tarojs/components";
import { Services } from '../../serves/Services';
import './Input.css'


export default function Imput(prop) {
    const { CurrentUserContent, gettype } = prop
    const { mailbox, setMailbox, identify, setIdentify } = useContext(CurrentUserContent)
    const [newmailbox, setnewMailbox] = useState(mailbox)
    const [newidentify, setNewIdentify] = useState(identify)

    console.log(CurrentUserContent)

    const handleIdentifyClick = () => {
        console.log("send identify")
        // 获取验证码  差一个账号格式错误时的返回状态码
        Services(
            {
                url: '/api/get_code',
                method: 'POST',
                data: { "email": newmailbox, "gettype": gettype }
            }
        ).then(function (response) {
            console.log("identify is", response.data.message)
            if (response.data.code == 200) {
                Taro.showToast({
                    title: '验证码已发送,请注意查收',
                    icon: 'none'
                })
            }
            if (response.data.code == 400) {
                Taro.showToast({
                    title: '账号出错啦',
                    icon: 'none'
                })
            }
        }).catch(function (error) {
            console.log("request fail", error)
            Taro.showToast({
                title: "请重试",
                icon: 'none'
            })
        })
    }

    const handleInputMailbox = (event) => {
        setnewMailbox(event.target.value)

    }

    const handleBlurMailbox = (event) => {
        setMailbox(event.target.value)
        // console.log(event.target.value)
    }

    const handleInputPassword = (event) => {
        setNewIdentify(event.target.value)
    }

    const handleBlurTdentify = (event) => {
        // console.log(event.target.value)

        setIdentify(event.target.value)
    }

    return (
        <>
            <View className='input-back'>
                <View className='input-top'>
                    <Input type='text' value={newmailbox} placeholder='请输入邮箱' className='input' onInput={handleInputMailbox} onBlur={handleBlurMailbox}></Input>
                    <Input type='text' value={newidentify} placeholder='请输入验证码' className='input' onInput={handleInputPassword} onBlur={handleBlurTdentify}></Input>
                    <View className='input-button' onClick={handleIdentifyClick}>获取验证码</View>
                </View>
            </View>
        </>
    )
}