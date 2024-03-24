import { View, Text, Image } from '@tarojs/components';
import React, { useState } from 'react';
import jiahaoImage from '../../../assets/mine/加号@3x.png';
import './Mine.css'
import Look from './Look';
import Topic from './Topic';
import Taro from '@tarojs/taro';


export default function Mine() {

  const [mycurrent,setMycurrent] = useState(0);
  const [looknumber,setLooknumber] = useState(-1);

  const changeMycurrent = (index) =>{
    setMycurrent(index);
    setLooknumber(-1);
  }

  const addMoreMemory = ()=>{
    console.log("添加记忆");
    Taro.navigateTo({
      url: '/pages/mypublish/index'
    })
  }

  return (
    <>
      <View className='mymemory'>
        <View className='mineIndex'>
          <View className='mytextcontainer'>
            <View onClick={()=>changeMycurrent(0)} className={mycurrent===0?'mineIndexActive':''}>
              浏览记忆
            </View>
          </View>
          <Image className='jiahao' src={jiahaoImage} onClick={()=>addMoreMemory()}></Image>
          <View className='mytextcontainer'>
            <View onClick={()=>changeMycurrent(1)} className={mycurrent===1?'mineIndexActive':''}>
              专题
            </View>
          </View>
        </View>

        {mycurrent === 0 && <Look looknumber={looknumber} setLooknumber={setLooknumber}/>}
        {mycurrent === 1 && <Topic/>}

      </View>
    </>
  );
}
