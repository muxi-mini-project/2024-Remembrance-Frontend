import { Image, View } from '@tarojs/components'
import React from 'react'
import './ToolMemory.css'
import centerImage from '../../../assets/common/个人中心图标@2x.png'
import zu76Image from '../../../assets/common/组 76@2x.png'
import footImage from '../../../assets/common/足迹@2x.png'
import jiahaoImage from '../../../assets/common/加号@2x.png'
import Taro from '@tarojs/taro'


export default function ToolMemory() {

  const toCenter = ()=>{
    console.log("进入个人中心");
    Taro.navigateTo({
      url: '/pages/personal/index',
    });
  }

  const toSearch = ()=>{
    console.log("进入搜索页面");
    Taro.navigateTo({
      url: '/pages/search/index'
    })
  }

  const toFoot = ()=>{
    console.log("进入我的足迹");
    Taro.navigateTo({
      url: '/pages/foot/index'
    })
  }

  const toPublish = ()=>{
    console.log("发布我的记忆");
    Taro.navigateTo({
      url:'/pages/publish/index'
    })
  }

  return (
    <>
    <View className='toolMemory'>
      <Image onClick={()=>toCenter()} className='centerlogo' src={centerImage}></Image>
      <Image onClick={()=>toSearch()} className='search' src={zu76Image}></Image>
      <Image onClick={()=>toFoot()} className='foot' src={footImage}></Image>
      <Image onClick={()=>toPublish()} className='publishCommon' src={jiahaoImage}></Image>
    </View>
    </>
  )
}
