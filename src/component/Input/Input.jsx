import { useContext, useState } from 'react'
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
        // 获取验证码
         Services(
            {
                url: '/api/get_code',
                method: 'POST',
                data: { "email": newmailbox, "gettype": gettype }
            }
        ).then(function (response) {
            console.log("identify is", response.data.message)
        }).catch(function (error) {
            console.log("request fail", error)
        })
    }

    const handleInput1 = (event) => {
        setnewMailbox(event.target.value)
    }

    const handleConfirm1 = (event) => {
        setMailbox(event.target.value)
        console.log(event.target.value)
    }

    const handleInput2 = (event) => {
        setNewIdentify(event.target.value)
    }

    const handleConfirm2 = (event) => {
        setIdentify(event.target.value)
        console.log(event.target.value)
    }

    return (
        <>
            <View className='input-back'>
                <View className='input-top'>
                    <Input type='text' value={newmailbox} placeholder='请输入邮箱' className='input' onInput={handleInput1} onConfirm={handleConfirm1}></Input>
                    <Input type='text' value={newidentify} placeholder='请输入验证码' className='input' onInput={handleInput2} onConfirm={handleConfirm2}></Input>
                    <View className='input-button' onClick={handleIdentifyClick}>获取验证码</View>
                </View>
            </View>
        </>
    )
}