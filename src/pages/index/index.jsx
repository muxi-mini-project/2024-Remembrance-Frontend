import { View, Text , Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'
import React, { useEffect, useState } from 'react'
import Common from '../../components/together/common/Common'
import Mine from '../../components/together/mine/Mine'
import { Services } from '../../components/service/Services'
import { GetTopic } from '../../components/service/GetTopic'
import Header from '../../components/Header'

export default function Index() {
  const [current, setCurrent] = useState(0);
  const userid = Taro.getStorageSync('userid');
  const handleChangeCurrent = (index) => {
    setCurrent(index);
  };

  const getInfo = ()=>{
    if (userid) {
      console.log("用户",userid);
      Services({
        url:`/api/user/getinfo`,
        method: "POST",
        data:{
          "id":userid
        }
      }).then(response => {
        console.log("个人信息",response);
        Taro.setStorageSync("username",response.data.username)
      }).catch(error => {
        console.log(error);
      });
    }
  }

  const getTopic = async ()=>{
    const topicList = await GetTopic(userid);
  }

  useEffect(() => {
    console.log(userid);
    getInfo();
    getTopic();
  }, [userid]);



  return (
    <>
      <Header>
      </Header>
      <View className='index'>
        <View className='navbar'>
          <View className='text-container' onClick={() => handleChangeCurrent(0)}>
            <Text className={current === 0 ? 'memoryActive' : ''}>
              共同记忆
            </Text>
          </View>
          <View className='text-container' onClick={() => handleChangeCurrent(1)}>
            <Text className={current === 1 ? 'memoryActive' : ''}>
              我的记忆
            </Text>
          </View>
        </View>
      </View>
      <View>
        {current === 0 && <Common />}
        {current === 1 && <Mine />}
      </View>
    </>
  );
}
