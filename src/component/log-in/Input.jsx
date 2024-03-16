import { useContext, useState, useCallback} from 'react'
import Taro from '@tarojs/taro'
import { View, Input } from "@tarojs/components";



export default function Imput(prop) {
  const { CurrentUserContent } = prop
  const { mailbox, setMailbox, password, setPassword } = useContext(CurrentUserContent)
  const [newmailbox, setnewMailbox] = useState(mailbox)
  const [newpassword, setnewPassword] = useState(password)

  const handleInput1 = (event) => {
    setnewMailbox(event.target.value)
  }

  const handleConfirm1 = (event) => {
    setMailbox(event.target.value)
    console.log(event.target.value)
  }


  const handleInput2 = (event) => {
    setnewPassword(event.target.value)
  }

  const handleConfirm2 = (event) => {
    setPassword(event.target.value)
    console.log(event.target.value)
  }

  const handleRegisterClick = useCallback(() => {
    Taro.navigateTo({
      url: '../../pages/Register/Register'
    })
  }, [])

  const handleForgetClick = useCallback(() => {
    Taro.navigateTo({
      url: '../../pages/Forget/Forget'
    })
  }, [])

  return (
    <>
      <View className='input-back'>
        <View className='input-top'>
          <Input type='text' value={newmailbox} placeholder='请输入邮箱' className='input' onInput={handleInput1} onConfirm={handleConfirm1}></Input>
          <Input type='password' value={newpassword} placeholder='输入密码' className='input' onInput={handleInput2} onConfirm={handleConfirm2}></Input>
        </View>
        <View className='input-foot'>
          <View className='input-footnote' onClick={handleRegisterClick}>注册账号</View>
          <View className='input-footnote' onClick={handleForgetClick}>忘记密码</View>
        </View>

      </View>
    </>
  )
}
