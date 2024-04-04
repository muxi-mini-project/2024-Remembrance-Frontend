import { Image, View, Text, Input } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import { Services } from '../../components/service/Services'
import Header from '../../components/Header'

export default function Personal() {
    const [username, setUsername] = useState("");
    const [isNameEditing, setIsNameEditing] = useState(false);
    const [temporaryUsername, setTemporaryUsername] = useState(username); // 临时状态来保存用户输入的新昵称
    const inputRef = useRef(null);
    const [userInfo, setUserInfo] = useState(null);

    const userid = Taro.getStorageSync("userid");
  
    const getInfo = ()=>{
      if (userid) {
        Services({
          url:`/api/user/getinfo`,
          method: "POST",
          data:{
            "id":userid
          }
        }).then(response => {
          console.log(response);
          setUserInfo(response.data);
          setUsername(response.data.username);
          Taro.setStorageSync("username",response.data.username)
          setTemporaryUsername(response.data.username); // 将获取的用户名也保存到临时状态中
        }).catch(error => {
          console.log(error);
        });
      }
    }

    console.log(username);

    useEffect(() => {
      // 确保 userid 有值后再进行请求
      getInfo();
      console.log(username);
    }, [userid]);
  
    const backHome = () => {
      Taro.navigateBack();
    }
  
    const changeName = () => {
      setIsNameEditing(true);
      // 自动聚焦到输入框
      inputRef.current && inputRef.current.focus();
    }
  
    const handleInputChange = (event) => {
      setTemporaryUsername(event.target.value); // 更新临时状态，而不是直接更新主要的username状态
    }
  
    const preserveName = () => {
      setIsNameEditing(false);
      setUsername(temporaryUsername);
      // 这里可以发送请求将新的用户名保存到服务器
      Services({
        url: `/api/user/changename`,
        method: "POST",
        data:{
          "email": userInfo.email,
          "username": temporaryUsername // 使用临时用户名
        }
      }).then(res=>{
        console.log(res);
        getInfo();
      }).catch(err=>{
        console.log(err);
      })
    }
  
    const changePassword = () => {
      console.log("修改密码");
      Taro.navigateTo(
        {url: '/pages/Forget/Forget'}
      )
    }
  
    const logout = () => {
      console.log("退出登录");
    }
  
    return (
      <>
      <Header/>
        <View className='pernavber'>
          <Image className='juxing61' src='https://img2.imgtp.com/2024/03/27/Y1T1VrRz.png'></Image>
          <Image onClick={backHome} className='home' src='https://img2.imgtp.com/2024/03/27/Pz3AZCFP.png'></Image>
        </View>
        <View className='onperson'>
          <Image className='background' src='https://img2.imgtp.com/2024/03/27/rtNiJQ3y.png'></Image>
          <View className='username'>
            <Input
              ref={inputRef}
              value={temporaryUsername} // 使用临时状态的值作为输入框的值
              onInput={handleInputChange} // 处理输入框值的变化
              onBlur={preserveName}
              focus={isNameEditing} // 自动聚焦
            />
          </View>
          <View className='change'>
            <Image className='shugan' src='https://img2.imgtp.com/2024/03/27/wSSJE6PQ.png'></Image>
            <View className='changeName'>
              <View onClick={changeName}>
                <Image className='juxing176' src='https://img2.imgtp.com/2024/03/27/HaZdX9Oj.png'></Image>
                <Text>修改昵称</Text>
              </View>
              <Image className='lujing193' src='https://img2.imgtp.com/2024/03/27/5H6hWjxq.png'></Image>
            </View>
            <View className='changePass'>
              <View onClick={changePassword}>
                <Image className='juxing176' src='https://img2.imgtp.com/2024/03/27/HaZdX9Oj.png'></Image>
                <Text>修改密码</Text>
              </View>
              <Image className='lujing194' src='https://img2.imgtp.com/2024/03/27/OycLJqNT.png'></Image>
            </View>
            <View className='logout'>
              <View onClick={logout}>
                <Image className='juxing176' src='https://img2.imgtp.com/2024/03/27/HaZdX9Oj.png'></Image>
                <Text>退出登录</Text>
              </View>
              <Image className='lujing195' src='https://img2.imgtp.com/2024/03/27/nUHSitrG.png'></Image>
            </View>
            <Image className='treebottom' src='https://img2.imgtp.com/2024/03/27/EQPmEekR.png'></Image>
          </View>
        </View>
      </>
    )
  }
  