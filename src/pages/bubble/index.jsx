import { View, Text, Image, Textarea } from '@tarojs/components'
import { useLoad, useRouter } from '@tarojs/taro'
import './index.css'
import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { Services } from '../../components/service/Services'
import Header from '../../components/Header'
import { AddDate } from '../../components/service/AddDate'
import { AddName } from '../../components/service/AddName'

export default function Qipao() {

  const [text,setText] = useState('');
  const [commentList,setCommentList] = useState([{username:'',text:'',date:''}])
  const [image,setImage] = useState({});

  const userid = Taro.getStorageSync("userid");
  const router = useRouter();
  const { memoryItem } = router.params;
  const qipaoItem = JSON.parse(decodeURIComponent(memoryItem));

  const getComment = (index)=>{
    Services({
        url:`/api/photo/common/comment/get`,
        method:"POST",
        data:{
            "photoid":index
        }
    }).then(async (resp)=>{
        if (resp.data) {
          const newData = AddDate(resp);
          const updatedData = await AddName(newData)
          console.log("用户评论",updatedData);
          setCommentList(updatedData);
    }}).catch(error=>{
        console.log(error);
    })
    }

    useEffect(() => {
        if (image.ID) {
            getComment(image.ID);
        }
    }, [image]);

    const getPhoto = () => {
        Services({
            url: `/api/photo/common/photo/get`,
            method: "POST",
            data: {
                "location": qipaoItem.location,
                "userid": 0
            }
        }).then(async (response) => {
            if (response.data) {
                const updatedElements = AddDate(response);
                const newElements = await AddName(updatedElements);
                const randomIndex = Math.floor(Math.random() * newElements.length);
                const randomElement = newElements[randomIndex];
                console.log("随机",randomElement);
                getComment(randomElement.ID);
                setImage(randomElement);
            }
        }).catch(error => {
            console.log(error);
        });
    }

    Taro.useDidShow(() => {
        getPhoto();
    });

    useEffect(()=>{
        getPhoto();
        console.log(qipaoItem);
    },[])

  const backCommon = ()=>{
    console.log("返回上一页");
    Taro.navigateBack();
  }

  const publishMemory = () =>{
    console.log("发布记忆");
    Taro.setStorageSync("pubPlace",qipaoItem.location)
    Taro.navigateTo({
      url: '/pages/publish/index'
    })
  }

  const handleChangetext = (evt)=>{
      setText(evt.target.value);
  }

  const putComment = (item) => {
    Services({
        url: `/api/photo/common/comment/post`,
        method: "PUT",
        data: {
            userid:qipaoItem.userid,
            photoid: image.ID,
            text: item
        }
    }).then(response => {
        console.log("发送评论",response);
        getComment(image.ID);
    }).catch(error => {
        console.log(error);
    });
};

const sendComment = (evt) => {
    if (text !== '') { // 检查 text 是否为空
        putComment(text);
    }
    setText(''); // 清空 text
};



  return (
    <>
      <Header></Header>
      <View className='memoryNavbar'>
            <Image className='juxing61' src='https://img2.imgtp.com/2024/03/27/Y1T1VrRz.png'></Image>
            <Image onClick={()=>backCommon()} className='zu120' src='https://img2.imgtp.com/2024/03/27/Q1bxNZyD.png'></Image>
            <Image onClick={()=>publishMemory()} className='fabu' src='https://img2.imgtp.com/2024/03/27/Cgog70iu.png'></Image>
            <Text>{qipaoItem.location}</Text>
        </View>
        <View className='background'>
            <View className='backPage'>
                <Image className='paoBackground' src='https://img2.imgtp.com/2024/03/27/6tThnlau.png'></Image>
                <Image className='blueround' src='https://img2.imgtp.com/2024/03/27/bq1JGE76.png'></Image>
                <Image className='greenround' src='https://img2.imgtp.com/2024/03/27/GctM5fk3.png'></Image>
                <Image className='blueround1' src='https://img2.imgtp.com/2024/03/27/bq1JGE76.png'></Image>
            </View>
            <View className='showMemory'>
                <View className='user'>
                    <View className='myusername'>{image.username}</View>
                    <View className='myuserdate'>{image.date}</View>
                </View>
                <View className='textShow'>
                    <View>{image.text}</View>
                </View>
                <Image className='lujing187' src='https://img2.imgtp.com/2024/03/27/0rVQz4EF.png'></Image>
                <View className='photoShow'>
                    <Image src={image.cloudurl}></Image>
                </View>
                <Image className='lujing188' src='https://img2.imgtp.com/2024/03/27/mF5pJRQR.png'></Image>
                <View className='comment'>
                    <View className='pinglun'>评论</View>
                    <View className='commentShow'>
                    {
                        commentList && commentList.length > 0 ? (
                            commentList.map((item) => (
                            <View key={item.id} className='showcomment'>
                                <Text className='commentName'>{item.username}</Text>
                                <View className='content'>{item.text}</View>
                                <Text className='commentDate'>{item.date}</Text>
                            </View>
                            ))
                        ) : (
                            <View className='noComments'>暂无评论</View>
                        )
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
