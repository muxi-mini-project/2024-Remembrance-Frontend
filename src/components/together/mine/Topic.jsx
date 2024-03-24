import { View , Text} from '@tarojs/components'
import React, { useEffect, useState } from 'react'
import './Topic.css'
import Taro from '@tarojs/taro'


export default function Topic() {

    const [topicList,setTopicList] = useState([]);

    // const getAlbumName = async () =>{

    //   try{
    //     const response = await Taro.request({
    //       url :"http://127.0.0.1:4523/m1/3942932-0-default/api/photo/personal/getpersonalalbum",
    //       method : "GET",
    //       Header :{
    //         "Content-Type": "application/json",
    //       },
    //       redirect: 'follow',
    //     })
  
    //     const result = response.data;
    //     console.log(response);
    //     console.log(result);
    //     setTopicList(response.data)
    //   }
  
    //   catch(e){
    //     console.log(e);
    //   }
    // }
  
    // useEffect(()=>{
    //   getAlbumName();
    //   return ()=>{};
    // },[]);

    useEffect(() => {
        const newTopicList = [{
            topicName: "一",
            topicFeeling: [],
        },{
            topicName: "二",
            topicFeeling: [],
        },{
            topicName: "三",
            topicFeeling: [],
        },{
            topicName: "四",
            topicFeeling: [],
        },{
            topicName: "五",
            topicFeeling: [],
        },{
            topicName: "六",
            topicFeeling: [],
        }];
        setTopicList(newTopicList);
      }, []);

      const toTopic = (item) => {
        // 将 item 转为 JSON 字符串
        const itemString = JSON.stringify(item);
        Taro.navigateTo({
          url: `/pages/mytopic/index?item=${encodeURIComponent(itemString)}`,
        });
      }

  return (
    <>
        <View className='topic'>
            {
                topicList.map((item,index)=>(
                  <View key={index} className='topicBack'>
                    <View onClick={()=>toTopic(item)}></View>
                    <Text>{item.topicName}</Text>
                  </View>
                ))
            }
        </View>
    </>
  )
}
