import { useContext } from 'react'
import { View } from "@tarojs/components";


export default function RenderList(prop) {
  const { CurrentUserContent } = prop
  const { setCancle, setDisband, namelist,setIdcontext } = useContext(CurrentUserContent)
  const handleCancle = (item) => {
    setCancle(true)
    console.log(item.userid)
    console.log(item.username)
    setIdcontext(item.userid)
  }
  const handleDisband = () => {
    setDisband(true)
  }
  return (
    <>
      <View className='render-list-back'>
        {
          namelist && namelist.map((item) => (
            // 这里的id应该为当前用户的userid
            <View className='render-background' key={item.userid}>
              <View className='renderlist'>
                <View className='username' >{item.username}</View>
                <View className='cancle' onClick={()=>handleCancle(item)}></View>
              </View>
            </View>

          ))}
      </View>
      <View className='button' onClick={handleDisband}>解散群聊</View>
    </>
  )
}
