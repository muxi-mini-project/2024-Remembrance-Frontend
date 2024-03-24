import { Image, View , Text, Input } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import homeImage from '../../assets/personal/主页图标@2x.png'
import juxing61Image from '../../assets/personal/矩形 61@2x.png'
import backgroundImage from '../../assets/personal/背景图@2x.png'
import duobian6Image from '../../assets/personal/多边形 6@2x.png'
import juxing176Image from '../../assets/personal/矩形 176@2x.png'
import lujing193Image from '../../assets/personal/路径 193@2x.png'
import lujing194Image from '../../assets/personal/路径 194@2x.png'
import lujing195Image from '../../assets/personal/路径 195@2x.png'
import tuoyuan41 from '../../assets/personal/椭圆 41@2x.png'
import { Services } from '../../components/service/Services'

export default function Personal() {

  const userid = 1;
  const getUserinfo = ()=>{
    Services({
      url: `/api/user/getinfo?userid=${userid}`,
      method:"GET",
    }).then(response=>{
      console.log(response);
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    getUserinfo();
  },[])

  const [uesrname,setUsername] = useState("林林");
  const [isNameEditing, setIsNameEditing] = useState(false);
  const inputRef = useRef(null);

const backHome = () =>{
    Taro.navigateBack()
}

const changeName = ()=>{
  console.log("修改昵称");
  setIsNameEditing(true);
}

const preserveName = (event)=>{
  setUsername(event.target.value)
}

const changePassword = ()=>{
  console.log("修改密码");
}

const logout = ()=>{
  console.log("退出登录");
}

  return (
    <>
      <View className='pernavber'>
            <Image className='juxing61' src={juxing61Image}></Image>
            <Image onClick={()=>backHome()} className='home' src={homeImage}></Image>
      </View>
      <View>
        <Image className='background' src={backgroundImage}></Image>
        <View className='username'>
        <Input ref={inputRef} value={uesrname}
        onInput={(event)=>setUsername(event.target.value)}
        focus={isNameEditing}
        onBlur={(event)=>preserveName(event)}></Input>
        </View>
        <View className='change'>
          <Image className='shugan' src={duobian6Image}></Image>
          <View className='changeName'>
            <View onClick={()=>changeName()}>
              <Image className='juxing176' src={juxing176Image}></Image>
              <Text>修改昵称</Text>
            </View>
            <Image className='lujing193' src={lujing193Image}></Image>
          </View>
          <View className='changePass'>
            <View onClick={()=>changePassword()}>
              <Image className='juxing176' src={juxing176Image}></Image>
              <Text>修改密码</Text>
            </View>
            <Image className='lujing194' src={lujing194Image}></Image>
          </View>
          <View className='logout'>
            <View onClick={()=>logout()}>
              <Image className='juxing176' src={juxing176Image}></Image>
              <Text>退出登录</Text>
            </View>
            <Image className='lujing195' src={lujing195Image}></Image>
          </View>
          <Image className='treebottom' src={tuoyuan41}></Image>
        </View>
    </View>
    </>
  )
}
