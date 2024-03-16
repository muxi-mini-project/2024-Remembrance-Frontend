import { useContext } from 'react'
import { View,Input } from '@tarojs/components'


export default function Innput(prop) {

const {CurrentUserContent}=prop
const {inputContent,ListFunctions}=useContext(CurrentUserContent)


return (
   <>
     <View className='bottom-input'>
          <Input className='input-content' value={inputContent} placeholder='请输入' onInput={ListFunctions.handleClickInput} onConfirm={ListFunctions.handleConfirm} focus></Input>
          <View className='send' onClick={ListFunctions.handleSend}></View>
        </View>
   </>
  )
}
