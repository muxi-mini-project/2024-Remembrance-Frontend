import React, { useState } from 'react'
import { View } from "@tarojs/components"
import Header from '../../component/Login_header/Login_header'
import Input from '../../component/Input/Input'
import Submit from '../../component/Submit/Submit'
import Footnote from '../../component/Footnote/Footnote'
import './Register.css'

export default function Register() {
  const [mailbox, setMailbox] = useState("")
  const [identify, setIdentify] = useState("")
  const CurrentUserContent = React.createContext()
  return (
    <>
      <View className='background'>
        <View className='Register'>
          <Header></Header>
          <CurrentUserContent.Provider value={{ mailbox: mailbox, setMailbox: setMailbox, identify: identify, setIdentify: setIdentify }}>
            <Input CurrentUserContent={CurrentUserContent} gettype='register'></Input>
            <View className='submit-back'>
            <Submit CurrentUserContent={CurrentUserContent} gettype='register' GoalPosition='Register2/Register2'></Submit>
            <Footnote className='footnote'></Footnote>
            </View>
          </CurrentUserContent.Provider>
        </View>
      </View>
    </>
  )
}
