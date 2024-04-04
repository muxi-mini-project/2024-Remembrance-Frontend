import { View , Text , Image} from '@tarojs/components'
import React, { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { Services } from '../../service/Services';
import { AddDate } from '../../service/AddDate';

export default function ShowBubble() {

    const userid = Taro.getStorageSync("userid");

    const [memoryList, setMemoryList] = useState([]);
    const [shuffledMemoryList, setShuffledMemoryList] = useState([]);

    useEffect(() => {
      getMemory();
    }, []);

    const getMemory = ()=>{
      console.log("show",userid);
      Services({
        url:`/api/photo/common/photo/getself`,
        method: "POST",
        data: {
          "userid": userid
        }
      }).then(resp => {
        console.log(resp);
        if (resp.data) {

          const updatedData = AddDate(resp);
          console.log(updatedData);
          setMemoryList(updatedData);
        }
      }).catch(err => {
        console.log(err);
      })
    }
    
    // 洗牌数组的函数
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    
    // 生成打乱的索引数组的函数
    function generateShuffledIndexes(length) {
      const indexes = Array.from({ length }, (_, i) => i);
      return shuffleArray(indexes);
    }
    
    useEffect(() => {
        const shuffledIndexes = generateShuffledIndexes(memoryList.length);
        const shuffledMemoryList = shuffleArray([...memoryList]).slice(0, 4);
        setShuffledMemoryList(shuffledMemoryList);
      }, [memoryList]);

    const lookMemory = (item) => {
      console.log('memory', item);
      // 使用 Taro.navigateTo 传递 memoryItem 到下一个页面
      Taro.navigateTo({
        url: `/pages/bubble/index?memoryItem=${encodeURIComponent(JSON.stringify(item))}`,
      });
    };

    Taro.useDidShow(() => {
      getMemory();
  });

  return (
    <>
    <View>
      {shuffledMemoryList.map((item, index) => (
        <View key={item.ID} className={`memory${index + 1}`}>
          <View onClick={() => lookMemory(item)}></View>
          <Image className={`zu${index+1}`} src='https://img2.imgtp.com/2024/03/27/LwkTTYEn.png'></Image>
          <Text className={`date${index + 1}`}>{item.date}</Text>
        </View>
      ))}
    </View>
    </>
  )
}
