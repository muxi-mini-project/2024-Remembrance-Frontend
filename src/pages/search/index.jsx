import { Image, Input, Text, View } from '@tarojs/components'
import React, { useEffect, useState } from 'react'
import './index.css'
import Taro from '@tarojs/taro'
import { Services } from '../../components/service/Services'
import Header from '../../components/Header'

export default function Search() {

  const userid = Taro.getStorageSync("userid");
  const [findPlace, setFindPlace] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [expanded,setExpanded] = useState(false);
  const [searching, setSearching] = useState(false);

  const getHistory = () => {
    Services({
      url: `/api/photo/common/comment/getsearch`,
      method: "POST",
      data:{
        "userid":userid
      }
    }).then(response => {
      console.log("搜索历史", response);
      // 使用 Map 数据结构保存搜索历史
      const historyMap = new Map();
  
      // 将搜索历史中相同的字符串只保留最新的一次记录
      response.data.forEach(item => {
        historyMap.set(item.text, item);
      });
  
      // 将 Map 中的值转换为数组并更新搜索列表
      setSearchList(Array.from(historyMap.values()));
    }).catch(error => {
      console.log(error);
    });
  };

  const getPlace = (place) => {
    console.log("搜索地点");
    return new Promise((resolve, reject) => {
      Services({
        url: `/api/photo/common/photo/get`,
        method: "POST",
        data: {
          "location": place,
          "userid": userid
        }
      }).then(res => {
        console.log("地点", res);
        setSearching(true);
        resolve(res); // 将获取的数据传递给 Promise 的 resolve 函数
      }).catch(err => {
        console.log(err);
        reject(err); // 在发生错误时将错误传递给 Promise 的 reject 函数
      });
    });
  }
  

  useEffect(() => {
    getHistory();
  }, [])

  const searchPlace = (evt) => {
    setFindPlace(evt.target.value);
  }

  const changeSearch = async (place) => {
    if (!searching && place !== '') {
      // 设置搜索状态为 true，避免重复搜索
      console.log("搜索地点", place);
      const memoryItem = await getPlace(place); // 等待异步操作完成
      console.log(memoryItem);
      const newmemory = { ...memoryItem, location: place }
      // 检查 memoryItem 是否为空或未定义，如果不为空则执行后续操作
      if (memoryItem) {
        Taro.navigateTo({
          url: `/pages/bubble/index?memoryItem=${encodeURIComponent(JSON.stringify(newmemory))}`
        })
      }
      // 搜索完成后将搜索状态重置为 false
    }

  }

  const changeEor = () => {
    const newIsexpanded = !expanded;
    setExpanded(newIsexpanded);
  }

  const backHome = () => {
    Taro.navigateBack();
  }

  Taro.useDidShow(() => {
    getHistory();
    setSearching(false);
  });

  const clearHistory = ()=>{
    Services({
      url: `/api/photo/common/comment/deletesearch`,
      method: "POST",
      data: {
        "userid": userid
      }
    }).then(res => {
      console.log("清空", res);
      getHistory();
    }).catch(err => {
      console.log(err);
    });
  };

 return (
    <>
    <View className='all'>
    <Header></Header>
    <View className='onsearch'>
      <Image className='searchback' src='https://img2.imgtp.com/2024/03/27/ZWt8e9iV.png'></Image>
      <View className='searchpage'>
        <Image onClick={()=>backHome()} className='searchhome' src='https://img2.imgtp.com/2024/03/27/37XIyO1A.png'></Image>
        <View className='searchbox'>
            <Image className='box' src='https://img2.imgtp.com/2024/03/27/hJpRTSyV.png'></Image>
            <Input className='searchinput' onInput={(event)=>searchPlace(event)}></Input>
            <Image className='searchbutton' src='https://img2.imgtp.com/2024/03/27/uZJgauXg.png'></Image>
            <Text onClick={()=>changeSearch(findPlace)}>搜索</Text>
        </View>
        <View className='searchhistory'>
            <Text>搜索历史</Text>
            <View onClick={()=>changeEor()} className={expanded?'expend':'recover'}>
                {!expanded ? '展开' : '收回'}
            </View>
            <Image onClick={()=>clearHistory()} className='searchrubbish' src='https://img2.imgtp.com/2024/03/27/a8Z7LxKx.png'></Image>
        </View>
        <View className='zhixian'></View>
        <View className='placedisplay'>
            {searchList.slice(0, expanded ? 12 : 6).map((item, index) => (
                <View key={index} onClick={() => changeSearch(item.text)}>
                  <Text>{item.text}</Text>
                </View>
            ))}
        </View>
        <Image className='zu137' src='https://img2.imgtp.com/2024/03/27/eHb7DJBQ.png'></Image>
        </View>
      </View>
    </View>
    </>
  )
}

