import { Image, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro';
import React from 'react'
export default function FootCard(props) {

    const {footnumber,setFootnumber,footContent} = props;

    const deleteFoot = ()=>{
      setFootnumber(1);
      console.log(footContent);
      Taro.setStorageSync("photoid",footContent.ID);
    }

  return (
    <>
    <View className='footcard'>
          {footnumber !== 0 ? <Image onClick={()=>deleteFoot()} className='zu158' src='https://img2.imgtp.com/2024/03/27/QNqheTbu.png'></Image>:''}
          <View className='footplace'>
            <Image className='zu177' src='https://img2.imgtp.com/2024/03/27/rbI8BdRt.png'></Image>
            <View>{footContent.location}</View>
          </View>
          <Image className='footphoto' src={footContent.cloudurl}/>
          <View className='footfeel'>
            <View className='footfeeling'>
              <View className='content'>{footContent.text}</View>
              <Text className='commentDate'>{footContent.date}</Text>
            </View>
          </View>
        </View>
    </>
  )
}
