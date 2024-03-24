import { View, Image } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.css'
import zu120Image from '../../assets/publish/组 120@2x.png'
import Taro from '@tarojs/taro'
import CommonPage from '../../components/publish/CommonPage'
import { Services } from '../../components/service/Services'
import { useEffect, useState } from 'react'

export default function Publish() {

  const userid = '1';

  useEffect(()=>{
    const publishData = {
      location: place,
      text: feeling,
      cloudurl: 1,
    };
  },[]);

  const initialPlace = '输入地名';
  const [place,setPlace] = useState(initialPlace);
  const initialFeeling = "想留存什么记忆······";
  const [feeling,setFeeling] = useState(initialFeeling);

  useLoad(() => {
    console.log('Page loaded.')
  })

  const publishCommon = () => {
    console.log("发布记忆");
    Services({
        url: `/api/photo/common/photo/post?userId=${userId}`,
        method: "Put",
        data: publishData // 将data对象传递给Services函数
    }).then(response => {
        // 处理响应
        console.log(response);
        // 发布成功
        Taro.navigateBack();
    }).catch(error => {
        // 处理错误
        console.error(error);
        // 发布失败的提示或者其他操作
    });
};


  return (
    <View className='publish'>
      <View>
        <View className='oneNavber'>
            <Image className='zu120' src={zu120Image} onClick={()=>publishCommon()}></Image>
            <View onClick={()=>publishCommon()}>发布</View>
        </View>
      </View>
      <CommonPage feeling={feeling} setFeeling={setFeeling} initialFeeling={initialFeeling} place={place} setPlace={setPlace} initialPlace={initialPlace}/>
    </View>
  )
}
