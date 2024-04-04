import { Input, View } from '@tarojs/components'
import React, { useEffect, useState } from 'react'
import './DiyTopic.css'
import { Services } from './service/Services';
import Taro from '@tarojs/taro';
import { GetTopic } from './service/GetTopic';


export default function DiyTopic(props) {

    const {diynumber,setDiynumber,setTopicName} = props;
    const [text,setText] = useState('');
    const [topicList,setTopicList] = useState([]);
    const userid = Taro.getStorageSync("userid");

    const fetchTopicList = async () => {
      const list = await GetTopic(userid);
      setTopicList(list);
    };

    useEffect(() => {
        // 在组件挂载后获取topicList
        fetchTopicList();
    }, [userid]);

    const shutBox = ()=>{
        setDiynumber(1);
    }

    const handleTopic = (evt)=>{
        console.log(evt.target.value);
        setText(evt.target.value);
    }

    const putAlbumName = async (text)=>{
      const response = await Services({
        url:`/api/photo/personal/createalbum`,
        method:"PUT",
        data:{
          "personalalbumname":text,
          "userid":userid
        }
      }).then(response=>{
        console.log("专题",response);
        fetchTopicList();
      }).catch((error)=>{
        console.log(error);
      })
    }

    const checkName = (str, arr) => {
      console.log("名字", arr);
      if (Array.isArray(arr)) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].personalalbumname === str) {
            console.log("数组中包含相同的字符串");
            return false;
          }
        }
      }
      console.log("数组中不包含相同的字符串");
      return true;
    };
    

    const addTopic = ()=>{
        console.log("添加成功");
        setText('');
        if(text !== '')
        {
          console.log("添加");
          const select = checkName(text,topicList);
          if(select)
          {
            console.log("成功");
            putAlbumName(text);
          }
          setTopicName(text);
        }
        setDiynumber(1)
    }

  return (
    <>
    <View className={diynumber===1?'notShow':'addTopic'}>
       <View className='shut' onClick={()=>shutBox()}>+</View>
        <View className='topicText'>请输入自定专题</View>
        <Input value={text} onInput={(event)=>handleTopic(event)}></Input>
        <View className='setTopic' onClick={()=>addTopic()}>ok</View>
    </View>
    </>
  )
}
