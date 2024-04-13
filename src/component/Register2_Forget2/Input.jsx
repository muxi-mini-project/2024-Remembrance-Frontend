import { useContext,  useState } from 'react'
// import Taro from '@tarojs/taro';
import { View, Input } from "@tarojs/components";



export default function Imput(prop) {
    const { CurrentUserContent } = prop
    const {password, secondPassword, setPassword, setSecondPassword } = useContext(CurrentUserContent)
    const [newpassword, setnewPassword] = useState(password)
    const [second, setSecond] = useState(secondPassword)
    // const [newview,setNewView] = useState(view)
    // useEffect(() => {
    //     setNewView(newpassword && newpassword === second)
    // }, [newpassword, second, setNewView])

    const handleInputPassword = (event) => {
        setnewPassword(event.target.value)
        // setnewView(true)
    }

    const handleBlurPassword = (event) => {
        setPassword(event.target.value)
        console.log(password)
    }

    const handleInputSecond = (event) => {
        setSecond(event.target.value)
        
    }

    const handleBlurSecond = (event) => {
        setSecondPassword(event.target.value)
        // Taro.setStorageSync("passward",event.target.value)
        // console.log(view)
        console.log(secondPassword)
        // if (Number(newpassword) == Number(second)) {
        //     setview(newview)
        // } else {
        //     setview(!newview)
        //     Taro.showToast({
        //         title:'密码错误',
        //         icon:'none'
        //     })
        // }
         
    }
   

    return (
        <>
            <View className='input-back'>
                <View className='input-top'>
                    <Input type='password' value={newpassword} placeholder='请输入密码' className='input'   onInput={handleInputPassword} onBlur={handleBlurPassword}></Input>
                    <Input type='password' value={second} placeholder='再次输入密码' className='input' onInput={handleInputSecond} onBlur={handleBlurSecond}></Input>
                </View>
            </View>
        </>
    )
}