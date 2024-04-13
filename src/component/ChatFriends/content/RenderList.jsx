import { useContext } from 'react'
import { View } from "@tarojs/components";

export default function RenderList(prop) {
  const { CurrentUserContent } = prop
  const { setCancle, setDisband, namelist,setIdcontext } = useContext(CurrentUserContent)
  const handleCancle = (item) => {
    setCancle(true)
    console.log(item.id)
    console.log(item.name)
    setIdcontext(item.id)
  }
  const handleDisband = () => {
    setDisband(true)
  }
  return (
    <>
      <View className='render-list-back'>
        {
          namelist.map((item) => (
            <View className='render-background' key={item.id}>
              <View className='renderlist'>
                <View className='username' >{item.name}</View>
                <View className='cancle' onClick={()=>handleCancle(item)}></View>
              </View>
            </View>

          ))}
      </View>
      <View className='button' onClick={handleDisband}>解散群聊</View>
    </>
  )
}
