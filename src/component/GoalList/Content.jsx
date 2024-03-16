import { View } from '@tarojs/components'
import { useContext } from 'react'
import ChatList from './content/ChatList'
import PhotoList from './content/PhotoList'
import Input from './content/Input'


export default function Content(prop) {
  const { CurrentUserContent } = prop
  const {chatlist, inputContent,ListFunctions,photoList } = useContext(CurrentUserContent)
  return (
    <>
      <View className='background'>
        <View className='paper-airplane1'></View>
        <View className='paper-airplane2'></View>
        <CurrentUserContent.Provider value={{photoList:photoList, chatlist:chatlist, inputContent:inputContent,ListFunctions:ListFunctions }}>
          <ChatList CurrentUserContent={CurrentUserContent}></ChatList>
          <PhotoList CurrentUserContent={CurrentUserContent}></PhotoList>
          <Input CurrentUserContent={CurrentUserContent}></Input>
        </CurrentUserContent.Provider>
      </View>
    </>
  )

}
