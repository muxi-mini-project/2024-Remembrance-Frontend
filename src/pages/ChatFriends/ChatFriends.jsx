import React, { useState, useEffect } from 'react'
import { View } from "@tarojs/components";
import Taro from '@tarojs/taro';
import Header from '../../component/Header/Header'
import Content from "../../component/ChatFriends/Content";
import './ChatFriends.css'
import { Services } from '../../serves/Services';


export default function ChatFriends() {
  const [cancle, setCancle] = useState(false)
  const [Disband, setDisband] = useState(false)
  const [CurrentGroupId, setCurrentGroupId] = useState("")      // 当前群聊ID，解散群聊时用
  const [Idcontext, setIdcontext] = useState('')                // 被删除的人的渲染key值
  const [CurrentPosition, SetCurrentPosition] = useState('')    // 当前群名
  const [namelist, setNameList] = useState([{
    name: "昵称",
    id: Math.random() * 1000000
  },
  {
    name: "111",
    id: Math.random() * 1000000
  }, {
    name: '222',
    id: Math.random() * 1000000
  }])

  // 传过来的-当前群聊的地点名和群聊ID
  useEffect(() => {
    const pages = Taro.getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const { key, groupId } = currentPage.options;
    SetCurrentPosition(key)
    setCurrentGroupId(groupId)
    console.log('Received data:', key, groupId);
  }, []);

  const CurrentUserContent = React.createContext()

  const ListFunctions = {

    // 删除群好友 
    handleCancle: () => {

      setCancle(false)
      dellist(Idcontext)
      Services(
        {
          url: '/api/user/group/out',
          method: 'POST',
          data: { "groupname": CurrentPosition, "userid": Taro.setStorageSync('userid') }
        }
      ).then(function (response) {
        Taro.showToast({
          title: response.data.message,
          icon: 'none'
        })
      }).catch(function (error) {
        console.log("requset fail", error)
        Taro.showToast({
          title: error,
          icon: 'none'
        })
      })

    },

    handleNotCancle: () => {
      setCancle(false)
    },

    handleDisband: () => {

      // 解散群聊 
      Services(
        {
          url: '/api/user/group/delete',
          method: 'POST',
          data: { "groupid": CurrentGroupId }
        }
      ).then(function (res) {
        Taro.showToast({
          title: res.data.message,
          icon: 'none'
        })
      }).catch(function (error) {
        console.log("request fail", error)
        Taro.showToast({
          title: error,
          icon: 'none'
        })
      })

      var newnamelist = []
      setNameList(newnamelist)
      setDisband(false)
      Taro.navigateBack({
        delta: 2
      })
    }
  }
  const dellist = (Id) => {
    const newnamelist = namelist.filter(item => item.id != Id)
    console.log(namelist, Id);
    setNameList(newnamelist)
  }

  return (
    <>
      <View className='background'>
        <Header title='多人记忆' secondTitle='群聊设置' style={{ 'position': 'absolute', 'left': '38vw' }}></Header>
        <CurrentUserContent.Provider value={{ Idcontext: Idcontext, setIdcontext: setIdcontext, ListFunctions: ListFunctions, cancle: cancle, setCancle: setCancle, setDisband: setDisband, Disband: Disband, namelist: namelist }}>
          <Content CurrentUserContent={CurrentUserContent}></Content>
        </CurrentUserContent.Provider>
        <View className='airplane1'></View>
        <View className='airplane2'></View>
      </View>
    </>
  )
}
