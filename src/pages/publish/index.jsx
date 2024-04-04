import { View, Image, Input } from '@tarojs/components'
import Taro, { useLoad, useRouter } from '@tarojs/taro'
import './index.css'
import { Services } from '../../components/service/Services'
import { useState } from 'react'
import PublishFeel from '../../components/PublishFeel'
import Header from '../../components/Header'

export default function Publish() {

  const userid = Taro.getStorageSync("userid");

  const initialPlace = '输入地名';
  const initialPath = 'https://img2.imgtp.com/2024/03/27/rxyFfVbf.png';
  const [place,setPlace] = useState(initialPlace);
  const initialFeeling = "想留存什么记忆······";
  const [feeling,setFeeling] = useState(initialFeeling);
  const [filePaths, setFilePaths] = useState([initialPath]);

  useLoad(() => {
    console.log('Page loaded.')
  })

  const publishCommon = () => {
    console.log("发布记忆");
    if(place !==initialPlace && feeling !== initialFeeling && filePaths[0] !== initialPath){
      if(place !== '' && feeling !== '' && filePaths[0] !== '')
      {Services({
        url: `/api/photo/common/photo/post`,
        method: "Put",
        data:{
          "cloudurl": filePaths[0],
          "location": place,
          "text": feeling,
          "userid": userid
        } // 将data对象传递给Services函数
    }).then(response => {
        // 处理响应
        console.log(filePaths);
        console.log("成功",response);
        // 发布成功
        Taro.navigateBack();
    }).catch(error => {
        // 处理错误
        console.error(error);
        // 发布失败的提示或者其他操作
    });}
    }
};

const inputPlace = (evt)=>{
  setPlace(evt.target.value);
}

const clearPlace = (evt)=>{
  if(place === initialPlace){
    setPlace('')
  }
}

const returnPlace = ()=>{
  if(place.trim() === ''){
    setPlace(initialPlace);
  }
}

const returnHome = ()=>{
  Taro.navigateBack();
}

  return (
  <View className='all'>
    <Header></Header>
    <View className='publish'>
      <View>
        <View className='oneNavber'>
            <Image className='zu120' src='https://img2.imgtp.com/2024/03/27/Q1bxNZyD.png' onClick={()=>returnHome()}></Image>
            <View onClick={()=>publishCommon()}>发布</View>
        </View>
      </View>
      <View className='commonPage'>
        <Image className='beijing' src='https://img2.imgtp.com/2024/03/27/BJEYJsIs.png'></Image>
        <Image className='blue' src='https://img2.imgtp.com/2024/03/27/bq1JGE76.png'></Image>
        <Image className='green' src='https://img2.imgtp.com/2024/03/27/GctM5fk3.png'></Image>
        <View className='card'>
            <Input className='place' value={place} onFocus={()=>clearPlace()} onBlur={()=>returnPlace()} onInput={(event)=>inputPlace(event)}></Input>
           <PublishFeel feeling={feeling} setFeeling={setFeeling} initialFeeling={initialFeeling} filePaths={filePaths} setFilePaths={setFilePaths}/>
        </View>
    </View>
    </View>
  </View>
  )
}
