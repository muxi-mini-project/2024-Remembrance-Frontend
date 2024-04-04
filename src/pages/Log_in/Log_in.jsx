import React, { useState } from 'react'
import { View } from "@tarojs/components"
import Header from "../../component/Login_header/Login_header"
import Input from "../../component/log-in/Input"
import Submit from "../../component/log-in/Submit"
import Footnote from "../../component/Footnote/Footnote"
import './Log_in.css'



export default function Log_in() {
  const [mailbox, setMailbox] = useState("")
  const [password, setPassword] = useState("")
  const [userId,setUserId]=useState("")
 
  const CurrentUserContent = React.createContext()
 
  return (
    <View className='background'>
      <View className='log-in'>
        <Header></Header>
        <CurrentUserContent.Provider value={{ setUserId:setUserId,userId:userId,mailbox:mailbox, setMailbox:setMailbox, password:password, setPassword:setPassword }}>
          <Input CurrentUserContent={CurrentUserContent}></Input>
          <View className='submit-back'>
          <Submit CurrentUserContent={CurrentUserContent}></Submit>
          <Footnote></Footnote>
          </View>
        </CurrentUserContent.Provider>
      </View>
    </View>
  )
}

