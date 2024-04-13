import { View } from '@tarojs/components'
import { useContext } from 'react'
import Grouprecord from './content/Grouprecord'
import Input from './content/Input'


export default function Content(prop) {
  const { CurrentUserContent } = prop
  const { inputContent,ListFunctions,groupRecord } = useContext(CurrentUserContent)
  return (
    <>
      <View className='background'>
        <View className='paper-airplane1'></View>
        <View className='paper-airplane2'></View>
        <CurrentUserContent.Provider value={{groupRecord:groupRecord,inputContent:inputContent,ListFunctions:ListFunctions }}>
          <Grouprecord CurrentUserContent={CurrentUserContent}></Grouprecord>
          <Input CurrentUserContent={CurrentUserContent}></Input>
        </CurrentUserContent.Provider>
      </View>
    </>
  )

}
