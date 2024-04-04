import { View, Text, Image } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import './index.css'
import { useEffect, useState } from 'react'
import Delete from '../../components/Delete'
import FootCard from '../../components/FootCard'
import { Services } from '../../components/service/Services'
import { AddDate } from '../../components/service/AddDate'
import Header from '../../components/Header'

export default function Foot() {

  const userid = Taro.getStorageSync("userid");
  const [footnumber,setFootnumber] = useState(0);
  const [footList,setFootList] = useState([]);
  const [deleted, setDeleted] = useState(false);

  useEffect(()=>{
    if(deleted)
    {
      getFoot();
      setDeleted(false);
    }
  },[deleted]);

  useEffect(()=>{
    getFoot();
  },[]);

  const getFoot = ()=>{
    Services({
      url:`/api/photo/common/photo/getself`,
      method: "POST",
      data:{
        "userid":userid,
      }
    }).then(resp=>{
      console.log(resp);
        if (resp.data) {
          const updatedData = AddDate(resp);
          console.log(updatedData);
          setFootList(updatedData);}
    }).catch(err=>{
      console.log(err);
    })
  }

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
  <View className='all'>
    <Header></Header>
    <View className='footplay'>
    <View className={footnumber===0||footnumber===(-1)?'':'foot'}>
      <View className='footnavber'>
        <Image className='foothome' src='https://img2.imgtp.com/2024/03/27/udKhuep9.png' onClick={()=>Taro.navigateBack()}></Image>
        <Text>我的足迹</Text>
        <Image onClick={()=>changeFootnumber()} className='footrubbish' src='https://img2.imgtp.com/2024/03/27/L6esg4RT.png'></Image>
      </View>
      <View className='footpage'>
        <View className='foots'>
          <Image className='footback' src='https://img2.imgtp.com/2024/03/27/yj2fWglp.png'></Image>
          {
            footList && footList.map((item,)=>(
              <FootCard key={item.ID} footnumber={footnumber} setFootnumber={setFootnumber} footContent={item}/>
            ))
          }
        </View>
      </View>
    </View>
    </View>
    <View>
        <Delete deleted={deleted} setDeleted={setDeleted} text='足迹' getList={getFoot} nonenumber={0} number={footnumber} setNumber={setFootnumber}/>
    </View>
  </View>
  )
}
