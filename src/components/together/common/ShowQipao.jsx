import { View , Text , Image} from '@tarojs/components'
import React, { useEffect, useState } from 'react'
import zuImage from '../../../assets/common/组 64@2x.png'
import Taro from '@tarojs/taro'

export default function ShowQipao() {

    const [memoryList, setMemoryList] = useState([]);
    const [shuffledMemoryList, setShuffledMemoryList] = useState([]);

    useEffect(() => {
      setMemoryList([
        {
          place: "大理",
          date: "24.10.25",
          memoryId: "1",
        },
        {
          place: "长沙",
          date: "24.1.20",
          memoryId: "2",
        },
        {
          place: "南昌",
          date: "24.11.25",
          memoryId: "3",
        },
        {
          place: "重庆",
          date: "24.12.29",
          memoryId: "4",
        },
        {
          place: "武汉",
          date: "24.12.1",
          memoryId: "5",
        },
        {
          place: "西藏",
          date: "24.9.21",
          memoryId: "6",
        },
      ]);
    }, []);
    
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

    const lookMemory = (memoryItem) => {
      console.log('memory', memoryItem);
      // 使用 Taro.navigateTo 传递 memoryItem 到下一个页面
      Taro.navigateTo({
        url: `/pages/qipao/index?memoryItem=${encodeURIComponent(JSON.stringify(memoryItem))}`,
      });
    };

  return (
    <>
    <View>
      {shuffledMemoryList.map((item, index) => (
        <View key={index} className={`memory${index + 1}`}>
          <View onClick={() => lookMemory(item)}>
          </View>
          <Image className={`zu${index+1}`} src={zuImage}></Image>
          <Text className={`date${index + 1}`}>{item.date}</Text>
        </View>
      ))}
    </View>
    </>
  )
}
