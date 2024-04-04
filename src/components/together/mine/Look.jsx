import { View , Image} from '@tarojs/components'
import React , { useEffect, useState } from 'react'
import './Look.css'
import { Services } from '../../service/Services'
import Taro from '@tarojs/taro';
import { AddDate } from '../../service/AddDate';

export default function Look(props) {

  const { looknumber, setLooknumber } = props;
  const username = Taro.getStorageSync("username");
  const userid = Taro.getStorageSync('userid');
  const [leafList, setLeafList] = useState([]);

  useEffect(() => {

    Services({
      url: `/api/photo/personal/numget`,
      method: "POST",
      data: {
        "userid": userid,
        "num": 3
      }
    }).then(res => {
      console.log(res);
      if (res.data) {
        const updatedData = AddDate(res);
        console.log(updatedData);
        setLeafList(updatedData);
      }
    }).catch(err => {
      console.log(err);
    })
  }, []);


  const lookMemory = (index) => {
    console.log("浏览记忆");
    setLooknumber(index);
    if (leafList[index]) {
      return leafList[index];
    }
    else {
      return leafList[index] = {
        feeling: "暂无",
        photo: '',
        date: ''
      }
    }
  }

  return (
    <>
      <View className={looknumber === (-1) ? "lookBack" : "looknone"}>
        <Image className='shuzhi' src='https://img2.imgtp.com/2024/03/27/HUh95jl9.png'></Image>
        <Image className='cloudOne' src='https://img2.imgtp.com/2024/03/27/jgt7mCc1.png'></Image>
        <Image className='cloudTwo' src='https://img2.imgtp.com/2024/03/27/UJW0CYn2.png'></Image>
        <View className='leafOne' onClick={() => lookMemory(0)}></View>
        <View className='leafTwo' onClick={() => lookMemory(1)}></View>
        <View className='leafThree' onClick={() => lookMemory(2)}></View>
      </View>
      <View className={looknumber === (-1) ? 'looknone' : 'lookMemory'}>
        {looknumber >= 0 && (
          <>
            <View className='lookname'>{username}</View>
            <View className='lookContent'>{leafList[looknumber].text}</View>
            <View className='lookPhoto'>
              <Image src={leafList[looknumber].cloudurl}></Image>
            </View>
            <View className='lookDate'>{leafList[looknumber].date}</View>
          </>
        )}
      </View>
    </>
  )
}
