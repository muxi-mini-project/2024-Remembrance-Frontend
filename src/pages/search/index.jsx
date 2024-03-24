import { Image, Input, Text, View } from '@tarojs/components'
import React, { useEffect, useState } from 'react'
import './index.css'
import searchbackImage from '../../assets/search/背景图@3x.png'
import zhuyeImage from '../../assets/search/主页图标@3x.png'
import boxImage from '../../assets/search/搜索框@3x.png'
import searchbuttonImage from '../../assets/search/搜索按钮@3x.png'
import searchrubbishImage from '../../assets/search/垃圾桶@3x.png'
import zu137Image from '../../assets/search/组 137@3x.png'
import Taro from '@tarojs/taro'
import { Services } from '../../components/service/Services'

export default function Search() {

  const userid = "123";
  const [findPlace,setFindPlace] = useState('');
  const [searchList,setSearchList] = useState([]);

  const putHistory = (item)=>{
    Services({
      url:`/api/photo/common/comment/get?userid=${userid}`,
      method:"GET",
      data:{
        userid:userid,
        location:item,
      }
    }).then(response=>{
      console.log(response);
      getHistory();
    }).catch(error=>{
      console.log(error);
    })
  }

  const getHistory = ()=>{
    Services({
      url:`/api/photo/common/comment/getsearch?userid=${userid}`,
      method:"GET",
    }).then(response=>{
      console.log(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    getHistory();
    console.log('Page loaded.')
  },[])

  const [isexpend,setIsexpend] = useState(true);

  const searchPlace = (evt)=>{
    console.log(evt.target.value);
    setFindPlace(evt.target.value)
  }

  const memoryItem = {place:"南昌"}

  const changeSearch = ()=>{
    if(findPlace !== ''){
      putHistory(findPlace);
      Taro.navigateTo({
        url: `/pages/qipao/index?memoryItem=${encodeURIComponent(JSON.stringify(memoryItem))}`
    })

    setFindPlace('');
    }
  }

  const changeEor = ()=>{
    const newIsexpend = !isexpend;
    setIsexpend(newIsexpend);
  }

  const backHome = ()=>{
    Taro.navigateBack();
  }

return (
  <>
    <View>
      <Image className='searchback' src={searchbackImage}></Image>
      <View className='searchpage'>
        <Image onClick={()=>backHome()} className='searchhome' src={zhuyeImage}></Image>
        <View className='searchbox'>
            <Image className='box' src={boxImage}></Image>
            <Input className='searchinput' onInput={(event)=>searchPlace(event)}></Input>
            <Image className='searchbutton' src={searchbuttonImage}></Image>
            <Text onClick={()=>changeSearch()}>搜索</Text>
        </View>
        <View className='searchhistory'>
            <Text>搜索历史</Text>
            <View onClick={()=>changeEor()} className={isexpend?'expend':'recover'}>
                {isexpend ? '展开' : '收回'}
            </View>
            <Image className='searchrubbish' src={searchrubbishImage}></Image>
        </View>
        <View className='zhixian'></View>
        <View className='placedisplay'>
            {
              searchList.map((item)=>(
                <View>
                  <Text>{item.place}</Text>
                </View>
              ))
            }
        </View>
        <Image className='zu137' src={zu137Image}></Image>
        </View>
      </View>
    </>
  )
}