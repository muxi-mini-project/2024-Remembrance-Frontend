import React, { useState, useEffect } from 'react'
import { View } from "@tarojs/components"
import Taro from '@tarojs/taro'
import Header from '../../component/Login_header/Login_header'
import Input from '../../component/Register2_Forget2/Input'
import Submit from '../../component/Register2_Forget2/Submit'
import './Forget2.css'


export default function Register() {
  const [password, setPassword] = useState("")
  const [secondPassword, setSecondPassword] = useState("")
  const [CurrentMail, setCurrentMail] = useState('')
  // const [view, setview] = useState(false)
  const CurrentUserContent = React.createContext()

  // 传过来的-当前用户的邮箱
  useEffect(() => {
    const pages = Taro.getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const { key } = currentPage.options;
    setCurrentMail(key)
    console.log('Received data:', key);
  }, [])

  console.log(password)

  return (
    <>
      <View className='background'>
        <View className='Register'>
          <Header></Header>
          <CurrentUserContent.Provider value={{ CurrentMail: CurrentMail, password:password, secondPassword, setPassword, setSecondPassword }}>
            <Input CurrentUserContent={CurrentUserContent}></Input>
            <Submit CurrentUserContent={CurrentUserContent}></Submit>
          </CurrentUserContent.Provider>
        </View>
      </View>
    </>
  )
}