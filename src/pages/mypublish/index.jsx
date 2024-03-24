import { View, Image, Text } from '@tarojs/components';
import './index.css';
import zu169Image from '../../assets/mypublish/组 169@2x.png';
import Taro from '@tarojs/taro';
import backgroundImage from '../../assets/mypublish/背景图@2x.png'
import DiyTopic from '../../components/DiyTopic';
import { useState, useEffect } from 'react';
import PublishFeel from '../../components/PublishFeel';
import { Services } from '../../components/service/Services';

export default function Mypublish() {
  const initialTopicName = "#自定专题";
  const initialFeeling = "想留存什么记忆······";
  const [diynumber, setDiynumber] = useState(1);
  const [topicName, setTopicName] = useState(initialTopicName);
  const [feeling,setFeeling] = useState(initialFeeling)

  const userId = '123456';

  const publishData = {
    albumname:topicName,
    text: feeling,
    cloudurl: 1,
  };

  useEffect(()=>{
    Services({
      url:`/api/photo/gettoken?userId=${userId}`,
      method:"GET",
    }).then(response=>{
      console.log(response);
    }).catch(error=>{
      console.log(error);
    })
  },[]);

  const putAlbum = () => {
    console.log("发布记忆");
    Services({
        url: `/api/photo/personal/post?userId=${userId}`,
        method: "Put",
        data: publishData // 将data对象传递给Services函数
    }).then(response => {
        // 处理响应
        console.log(response);
        Taro.navigateBack();
    }).catch(error => {
        // 处理错误
        console.error(error);
        // 发布失败的提示或者其他操作
    });
};

  const publishCommon = () => {
    console.log("发布");

    if(topicName !== initialTopicName)
    {
      putAlbum();
    }
  }

  const choseTopic = ()=>{
    setDiynumber(0);
}

  return (
    <>
      <View className={diynumber === 1 ? '' : 'publish'}>
        <View>
          <View className='oneNavber'>
            <Image className='zu169' src={zu169Image} onClick={publishCommon}></Image>
            <View onClick={publishCommon}>发布</View>
          </View>
        </View>
        <View className='commonPage'>
        <Image className='beijing' src={backgroundImage}></Image>
        <View className='card'>
            <PublishFeel initialFeeling={initialFeeling} feeling={feeling} setFeeling={setFeeling}/>
            <Text className='diytopic' onClick={()=>choseTopic()}>{topicName}</Text>
        </View>
    </View>
      </View>
      <View>
        {diynumber === 0 ? <DiyTopic diynumber={diynumber} topicName={topicName} setTopicName={setTopicName} setDiynumber={setDiynumber} /> : null}
      </View>
    </>
  );
}
