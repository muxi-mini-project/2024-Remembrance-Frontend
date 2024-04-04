import { useContext } from 'react'
import { View,Image } from '@tarojs/components'
import defaultImg from '../../../assets/image/ChatFriends/airplane1.png'

export default function PictureList(prop) {
  const { CurrentUserContent } = prop
  const { photoList } = useContext(CurrentUserContent)
  return (
    <View>
      {
                photoList.map((item) =>
                    <View className='chatlist' key={item.id}>
                        <View className='username'>{item.username}</View>
                        <Image className='chatContent2' src={item.photo ? item.photo : defaultImg}></Image>
                    </View>
                )

            }

    </View>
  )
}
