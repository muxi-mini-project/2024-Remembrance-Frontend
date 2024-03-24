import { View , Image} from '@tarojs/components'
import React , { useEffect, useState } from 'react'
import shuzhiImage from '../../../assets/mine/滚动组 9@3x.png'
import cloudOneImage from '../../../assets/mine/路径 214@3x.png'
import cloudTwoImage from '../../../assets/mine/路径 216@3x.png'
import './Look.css'
import FeelingLook from './FeelingLook'

export default function Look(props) {

  const {looknumber,setLooknumber} = props;
  const [leafList,setLeafList] = useState([]);

  useEffect(() => {
    const tempLeafList = [
      {
        feeling: "南昌",
        photo: "南昌",
        date: "2024.10.30",
        leafId: 3,
      },
      {
        feeling: "武汉",
        photo: "武汉",
        date: "2024.1.22",
        leafId: 2,
      },
      {
        feeling: "上饶",
        photo: "上饶",
        date: "2024.5.15",
        leafId: 1,
      },
    ];
  
    // 确保 tempLeafList 不为 null，然后再设置给 leafList
    if (tempLeafList) {
      setLeafList(tempLeafList);
    }
  }, []);

  const lookMemory = (index)=>{
    console.log("浏览记忆");
    setLooknumber(index);
  }

  return (
    <>
        <View className={looknumber===(-1)?"lookBack":"looknone"}>
            <Image className='shuzhi' src={shuzhiImage}></Image>
            <Image className='cloudOne' src={cloudOneImage}></Image>
            <Image className='cloudTwo' src={cloudTwoImage}></Image>
              <View className='leafOne' onClick={()=>lookMemory(0)}></View>
              <View className='leafTwo' onClick={()=>lookMemory(1)}></View>
              <View className='leafThree' onClick={()=>lookMemory(2)}></View>
        </View>
        <View className={looknumber === (-1) ? 'looknone' : 'lookMemory'}>
          {looknumber >= 0 && (
            <>
              <View className='lookname'>昵称</View>
              <View className='lookContent'>{leafList[looknumber].feeling}</View>
              <View className='lookPhoto'>{leafList[looknumber].photo}</View>
              <View className='lookDate'>{leafList[looknumber].date}</View>
            </>
          )}
        </View>
    </>
  )
}
