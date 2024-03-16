import React, { useState, useEffect } from 'react'
import { View } from "@tarojs/components"
import Taro from '@tarojs/taro'
import Header from '../../component/Header/Header'
import Content from '../../component/GoalList/Content'
import { Services } from '../../serves/Services'
import "./GoalList.css"

export default function GoalList() {


    const [chatlist, setChatList] = useState([])
    const [photoList, setPhotoList] = useState([])
    const [inputContent, setInputContent] = useState('')
    const [secondTitle, setSecondTitle] = useState('')

    useEffect(() => {
        const pages = Taro.getCurrentPages();
        const currentPage = pages[pages.length - 1];
        const { key } = currentPage.options;
        setSecondTitle(key)
        console.log('Received data:', key);
    }, []);


    const CurrentUserContent = React.createContext()

    const addTextlist = (text) => {
        const newchatlist = {
            username: "昵称",
            id: Math.random() * 1000000,
            content: text,
        }
        setChatList([...chatlist, newchatlist])
    }

    const addPhotolist = () => {
        const newphotolist = {
            username: "昵称",
            id: Math.random() * 1000000,
            photo: '',
        }
        setPhotoList([...photoList, newphotolist])
    }


    const ListFunctions = {
        // 发文字内容
        handleClickInput: (event) => {
            setInputContent(event.target.value)
        },
        handleConfirm: (event) => {
            setInputContent("")
            addTextlist(event.target.value)
            const data = Services({ url: '/api/photo/group/post', method: 'PUT', data: { "groupid": secondTitle, "text": event.target.value, "userid": "" } })
            console.log(data);
            console.log("send", event.target.value)

        },
        // 发图片 接口不知道写哪思密达？?
        handleSend: () => {
            console.log("send")
            Taro.chooseImage({
                success: function (res) {
                    var tempFilePaths = res.tempFilePaths
                }
            })
            const data = Services({ url: '/api/photo/gettoken', method: 'GET', data: { } })
            console.log(data);
        }
    }

    return (
        <>
            <View>
                <CurrentUserContent.Provider value={{ photoList: photoList, chatlist: chatlist, inputContent: inputContent, ListFunctions: ListFunctions }}>
                    <Header CurrentUserContent={CurrentUserContent} title='多人记忆' navigationUrl='/ChatFriends/ChatFriends' secondTitle={secondTitle} ></Header>
                    <Content CurrentUserContent={CurrentUserContent}></Content>
                </CurrentUserContent.Provider>
            </View>
        </>
    )
}
