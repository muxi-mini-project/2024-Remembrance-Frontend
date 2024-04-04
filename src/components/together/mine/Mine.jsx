import { View, Text, Image } from '@tarojs/components';
import React, { useState } from 'react';
import './Mine.css'
import Look from './Look';
import Topic from './Topic';
import Taro from '@tarojs/taro';


export default function Mine(props) {

  const {userid} = props;
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
          <Image className='jiahao' src='https://img2.imgtp.com/2024/03/27/9iZQethc.png' onClick={()=>addMoreMemory()}></Image>
          <View className='mytextcontainer'>
            <View onClick={()=>changeMycurrent(1)} className={mycurrent===1?'mineIndexActive':''}>
              专题
            </View>
          </View>
        </View>

        {mycurrent === 0 && <Look userid={userid} looknumber={looknumber} setLooknumber={setLooknumber}/>}
        {mycurrent === 1 && <Topic userid={userid}/>}

      </View>
    </>
  );
}
