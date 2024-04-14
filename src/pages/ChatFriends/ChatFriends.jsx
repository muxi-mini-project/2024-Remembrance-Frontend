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
    username: "昵称",
    userid: Math.random() * 1000000
  },
  {
    username: "111",
    userid: Math.random() * 1000000
  }])

  // 传过来的-当前群聊的地点名和群聊ID
  useEffect(() => {
    // 传群聊名称信息
    const pages = Taro.getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const { key, groupID } = currentPage.options;
    setCurrentGroupId(groupID)
    SetCurrentPosition(key)
    console.log('Received data:', key, groupID);

    // 获取群内人员昵称 id信息
  }, []);

  useEffect(() => {
    Services(
      {
        url: '/api/user/group/getmember',
        method: 'POST',
        data: {"groupid": Number(CurrentGroupId)}
      }
    ).then(function (response) {
      console.log("request state is", response.data.message)
      setNameList(response.data.data)
    }).catch(function (error) {
      console.log("requset fail", error)
      Taro.showToast({
        title: '出错啦，请重试',
        icon: 'none'
      })
    })

  }, [CurrentGroupId])
  console.log(CurrentGroupId)

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
          data: { "groupname": CurrentPosition, "userid":  Number(Idcontext)
          // Number(Taro.setStorageSync('userid'))
        }
        }
      ).then(function (response) {
        console.log("request state is", response.data.message)
        if(response.data.code==200){
          Taro.showToast({
            title: '操作成功',
            icon: 'none'
          })
        }
       
      }).catch(function (error) {
        console.log("requset fail", error)
        Taro.showToast({
          title: '出错啦，请重试',
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
          data: { "groupid": Number(CurrentGroupId) }
        }
      ).then(function (res) {
        if (res.data.code == 200) {
          Taro.redirectTo({
            url: '/pages/Multiple/Multiple'
          })
        }
        Taro.showToast({
          title: '操作成功',
          icon: 'none'
        })
      }).catch(function (error) {
        console.log("request fail", error)
        Taro.showToast({
          title: '出错啦，请重试',
          icon: 'none'
        })
      })

      setDisband(false)
    }
  }
  const dellist = (Id) => {
    const newnamelist = namelist.filter(item => item.userid != Id)
    console.log(namelist, Id);
    setNameList(newnamelist)
  }

  return (
    <>
      <View className='background'>
        <Header title='多人记忆' secondTitle='群聊设置' backUrl='/pages/GoalList/GoalList' style={{ 'position': 'absolute', 'left': '38vw' }}></Header>
        <CurrentUserContent.Provider value={{ Idcontext: Idcontext, setIdcontext: setIdcontext, ListFunctions: ListFunctions, cancle: cancle, setCancle: setCancle, setDisband: setDisband, Disband: Disband, namelist: namelist }}>
          <Content CurrentUserContent={CurrentUserContent}></Content>
        </CurrentUserContent.Provider>
        <View className='airplane1'></View>
        <View className='airplane2'></View>
      </View>
    </>
  )
}
