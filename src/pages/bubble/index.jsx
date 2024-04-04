import { View, Text, Image, Textarea } from '@tarojs/components'
import { useLoad, useRouter } from '@tarojs/taro'
import './index.css'
import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { Services } from '../../components/service/Services'
import Header from '../../components/Header'
import { AddDate } from '../../components/service/AddDate'

export default function Qipao() {

  const [text,setText] = useState('');
  const [commentList,setCommentList] = useState([{username:'',text:'',date:''}])
  const [image,setImage] = useState({});

  const userid = Taro.getStorageSync("userid");
  const router = useRouter();
  const { memoryItem } = router.params;
  const qipaoItem = JSON.parse(decodeURIComponent(memoryItem));

 console.log("qipao",qipaoItem);
  const getComment = (index)=>{
    Services({
        url:`/api/photo/common/comment/get`,
        method:"POST",
        data:{
            "photoid":index
        }
    }).then(resp=>{
        console.log("评论",resp);
        if (resp.data) {
          const updatedData = AddDate(resp);
          console.log(updatedData);
          setCommentList(updatedData);
    }}).catch(error=>{
        console.log(error);
    })
    }

    // const getUser = (index)=>{
    //     Services({
    //         url: `/api/user/getinfo`,
    //         method: "POST",
    //         data:{
    //             "id":index
    //         }
    //     }).then(res=>{
    //         console.log("信息",res);
    //         return res.data.username;
    //     }).catch(err=>{
    //         console.log(err);
    //         return err;
    //     })
    // }

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
                "userid": userid
            }
        }).then(response => {
            const newElements = AddDate(response);
            const randomIndex = Math.floor(Math.random() * newElements.length);
            const randomElement = response.data[randomIndex];
            getComment(randomElement.ID)
            setImage(randomElement);
        }).catch(error => {
            console.log(error);
        });
    }

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
    Taro.navigateTo({
      url: '/pages/publish/index'
    })
  }

  const handleChangetext = (evt)=>{
      console.log("评论",evt.target.value);
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
    console.log("发布评论", text);
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
