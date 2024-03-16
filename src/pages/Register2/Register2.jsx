import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View } from "@tarojs/components"
import Header from '../../component/Login_header/Login_header'
import Input from '../../component/Register2_Forget2/Input'
import Submit from '../../component/Register2_Forget2/Submit'
import './Register2.css'


export default function Register() {
  const [password, setPassword] = useState("")
  const [secondPassword, setSecondPassword] = useState("")
  const [view, setview] = useState(false)
  const [CurrentMail, setCurrentMail] = useState('')
  const CurrentUserContent = React.createContext()

 // 传过来的-当前用户的邮箱
  useEffect(() => {
    const pages = Taro.getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const { key } = currentPage.options;
    setCurrentMail(key)
    console.log('Received data:', key);
  }, [])

  return (
    <>
      <View className='background'>
        <View className='Register'>
          <Header></Header>
          <CurrentUserContent.Provider value={{ CurrentMail: CurrentMail, password, secondPassword, setPassword, setSecondPassword, view, setview }}>
            <Input CurrentUserContent={CurrentUserContent}></Input>
            <Submit CurrentUserContent={CurrentUserContent}></Submit>
          </CurrentUserContent.Provider>
        </View>
      </View>
    </>
  )
}
