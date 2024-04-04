import { View , Text , Image} from '@tarojs/components'
import React, { useEffect } from 'react'
import './Common.css'
import ToolMemory from './ToolMemory'
import ShowBubble from './ShowBubble'

export default function Common() {

  const multiMemory = ()=>{
    console.log("多人记忆");
    Taro.navigateTo({
      url: '/pages/Multiple/Multiple'
    })
  }

  return (
    <>
        <View className='commonMemory'>
            <View className='duorenMemory' onClick={()=>multiMemory()}>
                <View className='bluePin'></View>
                <Image className='zu85' src='https://img2.imgtp.com/2024/03/27/ntOTTgP2.png'></Image>
                <View>
                  <Text className='multi'>
                    多人记忆
                  </Text>
                </View>
            </View>
            <View className='docation'>
              <Image className='zu81' src='https://img2.imgtp.com/2024/03/27/oUuVVaTO.png'></Image>
              <Image className='zu83' src='https://img2.imgtp.com/2024/03/27/phZ4NNlT.png'></Image>
              <View className='paopao1'>
                <Image className='zu70' src='https://img2.imgtp.com/2024/03/27/gc2vEVeq.png'></Image>
                <Image className='zu78' src='https://img2.imgtp.com/2024/03/27/IA2BsTDB.png'></Image>
              </View>
              <View className='paopao2'>
                <Image className='paopaoImage' src='https://img2.imgtp.com/2024/03/27/U5qjP55j.png'></Image>
                <Image className='zu77' src='https://img2.imgtp.com/2024/03/27/WLqcW2sr.png'></Image>
              </View>
                <Image className='paopao3' src='https://img2.imgtp.com/2024/03/27/rlA31fkH.png'></Image>
                <Image className='zu71' src='https://img2.imgtp.com/2024/03/27/4hJBqKhE.png'></Image>
              </View>
              <View className='memory'>
                <ShowBubble/>
              </View>
            <ToolMemory/>
        </View>
    </>
  )
}
