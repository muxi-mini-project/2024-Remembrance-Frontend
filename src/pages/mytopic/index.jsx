import { View, Text, Image } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import './index.css'
import backImage from '../../assets/mytopic/背景图@2x.png'
import blueImage from '../../assets/mytopic/蓝椭圆@2x.png'
import greenImage from '../../assets/mytopic/绿椭圆@2x.png'
import zu185Image from '../../assets/mytopic/组 185@2x.png'
import lajitongImage from '../../assets/mytopic/垃圾桶@2x.png'
import zu119Image from '../../assets/mytopic/组 119@2x.png'
import { useState } from 'react'
import Delete from '../../components/Delete'

export default function Mytopic() {
  const [topicNumber, setTopicNumber] = useState(1);
  const router = Taro.useRouter();
  const itemString = decodeURIComponent(router.params.item);
  const itemTopic = JSON.parse(itemString);

  useLoad(() => {
    console.log('Page loaded.')
  })

  const backTopic = ()=>{
    console.log("返回上一页");
    Taro.navigateBack();
}

const deleteTopic = ()=>{
    console.log("删除专题");
    setTopicNumber(0);
}

const deleteContent = (index)=>{
  console.log("删除该感想");
}

  return (
    <>
    <View className={topicNumber===0?"mytopic":""}>
    <View className='topicnavber'>
        <Image className='zu119' src={zu119Image} onClick={()=>backTopic()}></Image>
        <View className='album'>{itemTopic.topicName}</View>
        <Image className='lajitong' src={lajitongImage} onClick={()=>deleteTopic()}></Image>
    </View>
    <View className='topiccontent'>
        <Image className='background' src={backImage}></Image>
        <Image className='blue' src={blueImage}></Image>
        <Image className='green' src={greenImage}></Image>
        <View className='contentDisplay'>
            <View className='content'>
                <Image onClick={(index)=>deleteContent(index)} className='deletecontent' src={zu185Image}></Image>
                <View className='feelContent'>感想</View>
            </View>
            <View className='content'>
            <Image onClick={(index)=>deleteContent(index)} className='deletecontent' src={zu185Image}></Image>
                <View className='feelContent'>感想</View>
            </View>
            <View className='content'>
            <Image onClick={(index)=>deleteContent(index)} className='deletecontent' src={zu185Image}></Image>
                <View className='feelContent'>感想</View>
            </View>
            <View className='content'>
            <Image onClick={(index)=>deleteContent(index)} className='deletecontent' src={zu185Image}></Image>
                <View className='feelContent'>感想</View>
            </View>
        </View>
    </View>
    </View>
    <View>
      <Delete nonenumber={1} number={topicNumber} setNumber={setTopicNumber} text="专题"/>
    </View>
    </>
  )
}
