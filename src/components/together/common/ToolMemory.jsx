import { Image, View } from '@tarojs/components'
import React from 'react'
import './ToolMemory.css'
import Taro from '@tarojs/taro'

export default function ToolMemory() {

  const userid = Taro.getStorageSync('userid');
  console.log(userid);

  const toCenter = ()=>{
    console.log("进入个人中心");
    Taro.navigateTo({
      url: `/pages/personal/index`,
    });
  }

  const toSearch = ()=>{
    console.log("进入搜索页面");
    Taro.navigateTo({
      url: `/pages/search/index`
    })
  }

  const toFoot = ()=>{
    console.log("进入我的足迹");
    Taro.navigateTo({
      url: `/pages/foot/index`
    })
  }

  const toPublish = ()=>{
    console.log("发布共同记忆");
    Taro.navigateTo({
      url:`/pages/publish/index`,
    })
  }

  return (
    <>
    <View className='toolMemory'>
      <Image onClick={()=>toCenter()} className='centerlogo' src='https://img2.imgtp.com/2024/03/27/vvGwVjf1.png'></Image>
      <Image onClick={()=>toSearch()} className='search' src='https://img2.imgtp.com/2024/03/27/jl3VkMgg.png'></Image>
      <Image onClick={()=>toFoot()} className='foot' src='https://img2.imgtp.com/2024/03/27/0ZQ9rZY3.png'></Image>
      <Image onClick={()=>toPublish()} className='publishCommon' src='https://img2.imgtp.com/2024/03/27/7WdiaUXT.png'></Image>
    </View>
    </>
  )
}
