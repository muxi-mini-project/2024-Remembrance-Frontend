import { View, Text, Image, Textarea } from '@tarojs/components'
import { useLoad, useRouter } from '@tarojs/taro'
import './index.css'
import { useEffect, useState } from 'react'
import juxing61Image from '../../assets/qipao/矩形 61@2x.png'
import zu120Image from '../../assets/qipao/组 120@2x.png'
import jiahao2Image from '../../assets/qipao/加号@2x.png'
import backgroundImage from '../../assets/qipao/背景图@2x.png'
import buleroundImage from '../../assets/qipao/蓝椭圆@2x.png'
import greenroundImage from '../../assets/qipao/绿椭圆@2x.png'
import lujing187Image from '../../assets/qipao/路径 187@2x.png'
import lujing188Image from '../../assets/qipao/路径 188@2x.png'
import Taro from '@tarojs/taro'
import { Services } from '../../components/service/Services'

export default function Qipao() {

  const [text,setText] = useState('');
  const [commentList,setCommentList] = useState([{username:'',text:'',date:''}])

  const router = useRouter();
  const { memoryItem } = router.params;
  const qipaoItem = JSON.parse(decodeURIComponent(memoryItem));
  console.log('decodedMemoryItem:', qipaoItem);

  const getComment = ()=>{
    Services({
        url:`/api/photo/common/comment/get?groupid=${memoryItem.memoryid}`,
        method:"GET",
    }).then(response=>{
        console.log(response);
    }).catch(error=>{
        console.log(error);
    })
}

useEffect(()=>{
    getComment();
},[])

  useEffect(()=>{
    setCommentList([{
        username:"linlin",
        text:"生命是一万次的春和景明",
        date:"2024.9.21"
    },{
        username:"like",
        text:"海压竹枝低复举",
        date:"2024.5.6"
    }])
  },[])

  const backCommon = ()=>{
    console.log("返回上一页");
    Taro.navigateBack();
  }

  const publishMemory = () =>{
    console.log("发布记忆");
    Taro.navigateTo({
      url: '/pages/publish/index'
    })
  }

  const handleChangetext = (evt)=>{
      console.log(evt.target.value);
      setText(evt.target.value);
  }

  const putComment = () => {
    Services({
        url: `/api/photo/common/comment/post?userId=${userId}`,
        method: "PUT",
        data: text
    }).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    });
};

const sendComment = (evt) => {
    console.log("发布评论", text);
    if (text !== '') { // 检查 text 是否为空
        putComment();
    }
    setText(''); // 清空 text
};

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <>
      <View className='memoryNavbar'>
            <Image className='juxing61' src={juxing61Image}></Image>
            <Image onClick={()=>backCommon()} className='zu120' src={zu120Image}></Image>
            <Image onClick={()=>publishMemory()} className='fabu' src={jiahao2Image}></Image>
            <Text>{qipaoItem.place}</Text>
        </View>
        <View className='background'>
            <View className='backPage'>
                <Image className='paoBackground' src={backgroundImage}></Image>
                <Image className='blueround' src={buleroundImage}></Image>
                <Image className='greenround' src={greenroundImage}></Image>
                <Image className='blueround1' src={buleroundImage}></Image>
            </View>
            <View className='showMemory'>
                <View className='user'>
                    <View className='myusername'>昵称</View>
                    <View className='myuserdate'>2023.9.21</View>
                </View>
                <View className='textShow'>
                    <View>1111</View>
                    <View>2222</View>
                </View>
                <Image className='lujing187' src={lujing187Image}></Image>
                <View className='photoShow'>

                </View>
                <Image className='lujing188' src={lujing188Image}></Image>
                <View className='comment'>
                    <View className='pinglun'>评论</View>
                    <View className='commentShow'>
                        {
                            commentList.map((item,index)=>(
                                <View key={index} className='showcomment'>
                                    <Text className='commentName'>{item.username}</Text>
                                    <View className='content'>{item.text}</View>
                                    <Text className='commentDate'>{item.date}</Text>
                                </View>
                            ))
                        }
                    </View>
                    <View className='publish'>
                        <Textarea onInput={(event)=>handleChangetext(event)} value={text} className='inputComment'></Textarea>
                        <View className='send' onClick={()=>sendComment()}>发送</View>
                    </View>
                </View>
            </View>
        </View>
    </>
  )
}
