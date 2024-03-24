import { Input, View } from '@tarojs/components'
import React, { useState } from 'react'
import './DiyTopic.css'
import { Services } from './service/Services';


export default function DiyTopic(props) {

    const {diynumber,setDiynumber,topicName,setTopicName} = props;
    const [text,setText] = useState('');

    const userId = "123456";
    const albumNameData = {
      personalalbumname:topicName,

    }

    const shutBox = ()=>{
        setDiynumber(1);
    }

    const handleTopic = (evt)=>{
        console.log(evt.target.value);
        setText(evt.target.value);
    }

    const putAlbumName = ()=>{
      Services({
        url:`/api/photo/personal/createalbum?userId=${userId} `,
        method:"PUT",
        data:albumNameData
      })
    }

    const addTopic = ()=>{
        console.log("添加成功");
        setText('');
        if(text !== '')
        {
          setTopicName(text);
          putAlbumName();
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
