import { useContext } from 'react'
import { View } from '@tarojs/components'

export default function PictureList(prop) {
  const { CurrentUserContent } = prop
  const { photoList } = useContext(CurrentUserContent)
  return (
    <View>
      {
                photoList.map((item) =>
                    <View className='chatlist' key={item.id}>
                        <View className='username'>{item.username}</View>
                        <View className='chatContent2'>{item.photo}</View>
                    </View>
                )

            }

    </View>
  )
}
