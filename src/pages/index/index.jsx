import { View, Text , Image } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import './index.css'
import React,{ useEffect, useState } from 'react'
import Common from '../../components/together/common/Common'
import Mine from '../../components/together/mine/Mine'

export default function Index() {

  const [current, setCurrent] = useState(0);

  const handleChangeCurrent = (index) => {
    setCurrent((prevCurrent) => {
      console.log(prevCurrent); // 这里是之前的值
      return index; // 返回新的值
    });
  };

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <>
      <View className='index'>
        <View className='navbar'>
          <View className='text-container' onClick={()=>handleChangeCurrent(0)}>
            <Text className={current===0?'memoryActive':''}>
              共同记忆
            </Text>
          </View>
          <View className='text-container' onClick={()=>handleChangeCurrent(1)}>
            <Text className={current===1?'memoryActive':''}>
              我的记忆
            </Text>
          </View>
        </View>
      </View>
      <View>
        {current === 0 && <Common/>}
        {current === 1 && <Mine/>}
      </View>
    </>
  )
}
