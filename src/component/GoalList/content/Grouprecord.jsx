import { View, Image } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { useContext } from "react"
// import defaultImg from '../../../assets/image/ChatFriends/airplane1.png'
import { key } from "../../../utils/keyGene"

export default function ChatList(prop) {
    const { CurrentUserContent } = prop
    const { groupRecord } = useContext(CurrentUserContent)
    console.log('11111',groupRecord)
    return (
        <>
            <View className='chatlist-background'>
                {
                    groupRecord && groupRecord.map((item) =>
                        <View className={`${item.userid == Taro.getStorageSync('userid') ? 'chatlist' : 'onmessagelist'}`} key={key.next().value}>
                            {item.text.length == 0 ? '' : <View className='username'>{item.userid}</View>}
                            {item.cloudurl.length==0 && <View className='chatContent1'>{item.text}</View>}
                            {item.cloudurl && <Image className='chatContent2' src={item.cloudurl}></Image>}
                        </View>
                    )

                }
            </View>
        </>
    )

}