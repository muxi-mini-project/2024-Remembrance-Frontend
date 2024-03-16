import { useContext, useState } from 'react'
import { View, Input } from "@tarojs/components";
import { Services } from '../../serves/Services';


export default function Imput(prop) {
    const { CurrentUserContent } = prop
    const { CurrentMail,password, secondPassword, setPassword, setSecondPassword,view,setview } = useContext(CurrentUserContent)
    const [newpassword, setnewPassword] = useState(password)
    const [second, setSecond] = useState(secondPassword)
    const [newview,setnewView] = useState(view)


    const handleInput1 = (event) => {
        setnewPassword(event.target.value)
        setnewView(true)
    }

    const handleConfirm1 = (event) => {
        setPassword(event.target.value)
        console.log(event.target.value)
        console.log(newview)
    }

    const handleInput2 = (event) => {
        setSecond(event.target.value)
    }

    const handleConfirm2 = (event) => {
        setSecondPassword(event.target.value)
        setview(true)
        console.log(event.target.value)
         // 更改密码 
         const data = Services({ url: '/api/user/changepassword', method: 'POST', data: { "password": event.target.value, "email": CurrentMail} })
         console.log(data);
    }

    return (
        <>
            <View className='input-back'>
                <View className='input-top'>
                    <Input type='text' value={newpassword} placeholder='请输入新密码' className='input' onInput={handleInput1} onConfirm={handleConfirm1}></Input>
                    <Input type='text' value={second} placeholder='再次输入新密码' className='input' onInput={handleInput2} onConfirm={handleConfirm2}></Input>
                </View>
            </View>
        </>
    )
}