import { View , Text } from '@tarojs/components'
import React from 'react'
import './Delete.css'
import { Services } from './service/Services';
import Taro from '@tarojs/taro';

export default function Delete(props) {

    const {number,setNumber,text,nonenumber} = props;
    const albumid = Taro.getStorageSync("albumid");
    const photoid = Taro.getStorageSync("photoid");

    const changeNumber = ()=>{
        setNumber(nonenumber);
    }

    const deleteIt = ()=>{
      if(text === "足迹"){
        deleteFoot();
      }

      if(text === "专题"){
        deleteTopic();
      }
    }

    const deleteFoot = ()=>{
      let {setDeleted} = props;
      setNumber(nonenumber);
      console.log("删除足迹",photoid);
      Services({
        url: `/api/photo/common/photo/delete`,
        method: "POST",
        data:{
          "photoid": photoid
        }
      }).then(res=>{
        console.log("足迹",photoid);
        console.log(res);
        setDeleted(true);
      }).catch(err=>{
        console.log(err);
      })
    }

    const deleteTopic = ()=>{
      setNumber(nonenumber);
      console.log("删除专题",albumid);
      Services({
        url: `/api/photo/personal/deletealbum`,
        method: "POST",
        data:{
          "id": albumid
        }
      }).then(res=>{
        console.log(res);
        Taro.navigateBack();
      }).catch(err=>{
        console.log(err);
      })
    }

  return (
    <>
    <View className={number===(-1) || number === nonenumber?'notShow':'deletememory'}>
       <View className='cha' onClick={()=>changeNumber()}>+</View>
        <View className='confirm'>是否要删除此{text}</View>
        <View className='YoN'>
            <View className='yes' onClick={()=>deleteIt()}>是</View>
            <View className='no' onClick={()=>changeNumber()}>否</View>
        </View>
    </View>
    </>
  )
}
