import { View, Image, Text } from '@tarojs/components';
import './index.css';
import DiyTopic from '../../components/DiyTopic';
import { useState, useEffect } from 'react';
import PublishFeel from '../../components/PublishFeel';
import { Services } from '../../components/service/Services';
import Taro from '@tarojs/taro';
import Header from '../../components/Header';

export default function Mypublish() {
  const initialTopicName = "#自定专题";
  const initialFeeling = "想留存什么记忆······";
  const initialPath = 'https://img2.imgtp.com/2024/03/27/rxyFfVbf.png';
  const [diynumber, setDiynumber] = useState(1);
  const [topicName, setTopicName] = useState(initialTopicName);
  const [feeling,setFeeling] = useState(initialFeeling)
  const [filePaths, setFilePaths] = useState([initialPath]);

  const userid = Taro.getStorageSync("userid");
  const putAlbum = (url,name) => {
    console.log("发布记忆");
    Services({
        url: `/api/photo/personal/post`,
        method: "Put",
        data:{
          "cloudurl": url,
          "personalalbumname":name,
          "text": feeling,
          "userid": userid
        }
    }).then(response => {
        console.log(name);
        console.log("成功",response);
        // 发布成功
        if (!isFirstPage()) {
          Taro.navigateBack();
        } else {
          console.log("当前页面为第一页，无法返回");
        }
    }).catch(error => {
        console.error(error);
        // 发布失败的提示或者其他操作
    });
  };
  
  // 检查当前页面是否为第一页
  const isFirstPage = () => {
    const pages = Taro.getCurrentPages();
    return pages.length === 1;
  };

  const publishCommon = () => {
    console.log("发布");

    if(topicName !== initialTopicName && feeling !== initialFeeling && filePaths[0] !== initialPath)
    {
      if(topicName !== '' && feeling !== '' && filePaths[0] !== '')
      {
        putAlbum(filePaths[0],topicName);
        Taro.navigateBack();
      }
    }
  }

  const choseTopic = ()=>{
    setDiynumber(0);
}

  const backCommon = ()=>{
    console.log("返回");
    Taro.navigateBack();
  }

  return (
  <View className='all'>
    <Header></Header>
      <View className={diynumber === 1 ? '' : 'publish'}>
        <View>
          <View className='oneNavber'>
            <Image className='zu169' src='https://img2.imgtp.com/2024/03/27/6e5v1oOQ.png' onClick={backCommon}></Image>
            <View onClick={publishCommon}>发布</View>
          </View>
        </View>
        <View className='commonPage'>
        <Image className='beijing' src='https://img2.imgtp.com/2024/03/27/yb7QKmYW.png'></Image>
        <View className='card'>
            <PublishFeel filePaths={filePaths} setFilePaths={setFilePaths} initialFeeling={initialFeeling} feeling={feeling} setFeeling={setFeeling}/>
            <Text className='diytopic' onClick={()=>choseTopic()}>{topicName}</Text>
        </View>
    </View>
      </View>
      <View>
        {diynumber === 0 ? <DiyTopic diynumber={diynumber} topicName={topicName} setTopicName={setTopicName} setDiynumber={setDiynumber} /> : null}
      </View>
    </View>
  );
}
