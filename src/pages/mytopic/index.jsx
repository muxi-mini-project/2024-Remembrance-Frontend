import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'
import { useEffect, useState } from 'react'
import Delete from '../../components/Delete'
import { Services } from '../../components/service/Services'
import Header from '../../components/Header'

export default function Mytopic() {
  const [topicNumber, setTopicNumber] = useState(1);
  const router = Taro.useRouter();
  const itemString = decodeURIComponent(router.params.topicItem);
  const itemTopic = JSON.parse(itemString);

  console.log(itemTopic);
  const [feelList, setFeelList] = useState([]);
  const userid = Taro.getStorageSync("userid");

  useEffect(() => {
    fetchPersonal();
  }, [itemTopic.ID]);

  const fetchPersonal = ()=>{
    Services({
      url: `/api/photo/personal/getfromalbum`,
      method: "POST",
      data:{
        "personalAlbumId": itemTopic.ID
      }
    }).then(response => {
      console.log("获取专题记忆",response);
      setFeelList(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  const backTopic = () => {
    console.log("返回上一页");
    Taro.navigateBack();
  }

  const deleteTopic = () => {
    console.log("删除专题");
    Taro.setStorageSync("albumid",itemTopic.ID)
    setTopicNumber(0);
  }

  const deleteContent = (index) => {

    Services({
      url: `/api/photo/personal/delete`,
      method: "POST",
      data:{
        "userid":userid,
        "personalAlbumid": itemTopic.ID,
        "photoid": index
      }
    }).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  }

  Taro.useDidShow(() => {
    fetchPersonal();
});


  return (
    <View className='all'>
    <Header></Header>
      <View className={topicNumber === 0 ? "mytopic" : "ontopic"}>
        <View className='topicnavber'>
          <Image className='zu119' src='https://img2.imgtp.com/2024/03/27/So4KrkyV.png' onClick={backTopic}></Image>
          <View className='album'>{itemTopic.topicName}</View>
          <Image className='lajitong' src='https://img2.imgtp.com/2024/03/27/B93qEAIx.png' onClick={deleteTopic}></Image>
        </View>
        <View className='topiccontent'>
          <Image className='background' src='https://img2.imgtp.com/2024/03/27/yb7QKmYW.png'></Image>
          <Image className='blue' src='https://img2.imgtp.com/2024/03/27/rtYwuR5l.png'></Image>
          <Image className='green' src='https://img2.imgtp.com/2024/03/27/GctM5fk3.png'></Image>
          <View className='contentDisplay'>
            {feelList && feelList.map((item) => (
              <View className='content' key={item.ID}>
                <Image className='deletecontent' src='https://img2.imgtp.com/2024/03/27/0JNJuDfS.png' onClick={() => deleteContent(item.ID)}></Image>
                <View className='feelContent'>{item.text}</View>
                <View>
                  <Image  className='showPhoto' src={item.cloudurl}></Image>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View>
        <Delete nonenumber={1} number={topicNumber} setNumber={setTopicNumber} text="专题" />
      </View>
    </View>
  )
}
