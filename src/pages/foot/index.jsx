import { View, Text, Image } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import './index.css'
import { useState } from 'react'
import Delete from '../../components/Delete'
import foothomeImage from '../../assets/foot/主页图标@2x.png'
import footrubbishImage from '../../assets/foot/垃圾桶@2x.png'
import footbackImage from '../../assets/foot/背景图@2x.png'
import FootCard from '../../components/FootCard'

export default function Foot() {

  const [footnumber,setFootnumber] = useState(0);

  useLoad(() => {
    console.log('Page loaded.')
  })

  const changeFootnumber = ()=>{
    console.log("改变数字");
    if(footnumber===0){
      setFootnumber(-1);
    }
    else{
      setFootnumber(0)
    }
  }

  return (
    <>
    <View className={footnumber===0||footnumber===(-1)?'':'foot'}>
      <View className='footnavber'>
        <Image className='foothome' src={foothomeImage} onClick={()=>Taro.navigateBack()}></Image>
        <Text>我的足迹</Text>
        <Image onClick={()=>changeFootnumber()} className='footrubbish' src={footrubbishImage}></Image>
      </View>
      <View className='footpage'>
      <View className='foots'>
        <Image className='footback' src={footbackImage}></Image>
        <FootCard footnumber={footnumber} setFootnumber={setFootnumber}/>
        <FootCard footnumber={footnumber} setFootnumber={setFootnumber}/>
        <FootCard footnumber={footnumber} setFootnumber={setFootnumber}/>
      </View>
    </View>
    </View>
    <View>
        <Delete text='足迹' nonenumber={0} number={footnumber} setNumber={setFootnumber}/>
    </View>
    </>
  )
}
