import React, { useState } from 'react'
import { View } from "@tarojs/components"
import Header from '../../component/Login_header/Login_header'
import Input from '../../component/Input/Input'
import Submit from '../../component/Submit/Submit'
import Footnote from '../../component/Footnote/Footnote'
import './Forget.css'

export default function Register() {
  const [mailbox, setMailbox] = useState("")
  const [identify, setIdentify] = useState("")
  const [agreeCondition,setAgreeCondition]=useState(false)
  const CurrentUserContent = React.createContext()
  console.log('glob',agreeCondition);
  return (
    <>
      <View className='background'>
        <View className='Register'>
          <Header></Header>
          <CurrentUserContent.Provider value={{agreeCondition: agreeCondition, mailbox: mailbox, setMailbox: setMailbox, identify: identify, setIdentify: setIdentify }}>
            <Input CurrentUserContent={CurrentUserContent} gettype='change'></Input>
            <View className='submit-back'>
            <Submit CurrentUserContent={CurrentUserContent} GoalPosition='Forget2/Forget2' gettype='change'></Submit>
            <Footnote agreeCondition={agreeCondition} setAgreeCondition={setAgreeCondition}></Footnote>
            </View>
          </CurrentUserContent.Provider>
        </View>
      </View>
    </>
  )
}