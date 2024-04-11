import React, { useState, useEffect } from 'react'
import { View } from "@tarojs/components"
import Taro from '@tarojs/taro'
import Header from '../../component/Header/Header'
import Content from '../../component/GoalList/Content'
import { Services } from '../../serves/Services'
import "./GoalList.css"
import { takePhoto, uploadFile } from '../../UploadQiniu/UploadQiniu';


export default function GoalList() {

    // 自己发出去的信息
    const [chatlist, setChatList] = useState([{
        username: "昵称",
        id: Math.random() * 1000000,
        content: "111"
    }])
    // 对面发来的信息
    const [onMessagelist, setOnMessagelist] = useState([{
        username: "昵称",
        id: Math.random() * 1000000,
        content: "111"
    }])
    const [photoList, setPhotoList] = useState([])
    const [inputContent, setInputContent] = useState('')
    const [secondTitle, setSecondTitle] = useState('')
    const [currentGroupId,setCurrentGroupId]=useState('')



    useEffect(() => {

        // 传群聊名称信息
        const pages = Taro.getCurrentPages();
        const currentPage = pages[pages.length - 1];
        const { key,groupID } = currentPage.options;
        setCurrentGroupId(groupID)
        setSecondTitle(key)
        console.log('Received data:', key,groupID);

        // websoket 接口
        Taro.connectSocket({
            url: 'ws://8.138.81.141:8088/api/user/group/line',
            success: function () {
                console.log('connect success')
            }
        }).then(task => {
            task.onOpen(function () {
                // 建立连接
                console.log('onOpen')
                // task.send({ data: chatlist.Content })
            })
            task.onMessage(function (msg) {

                // 对面发来的
                addmessagelist(msg)
                console.log('onMessage: ', msg)
                task.close()
            })
            task.onError(function (error) {
                console.log('onError', error)
            })
            task.onClose(function (e) {
                console.log('onClose: ', e)
            })
        })

        // 获得图片token
        Services({
            url: `/api/photo/gettoken?user=${Taro.setStorageSync('userid')}`,
            method: "GET"
        }).then(response => {
            console.log(response.data);
            Taro.setStorageSync('qiniutoken', response.data.data.QnToken)
        }).catch(error => {
            console.log("service fail", error)
        })

        // 获取聊天记录 接口还没好 好像不打算写了？
        // Services({
        //     url: ``,
        //     method: "",
        //     data: { "userid": Taro.getStorage.userId, "position": key }
        // }).then(function () {
        //     chatlist.username = photoList.username = "",
        //         chatlist.text = "",
        //         photoList.photo = ""
        // }).catch(error => {
        //     console.log("service fail", error)
        // })
    }, []);

    const CurrentUserContent = React.createContext()

    const addTextlist = (text) => {
        const newchatlist = {
            username: Taro.getStorageSync('userid'),
            content: text,
        }
        setChatList([...chatlist, newchatlist])
    }

    const addPhotolist = (string) => {
        const newphotolist = {
            username: Taro.getStorageSync('userid'),
            photo: string,
        }
        setPhotoList([...photoList, newphotolist])
    }

    const addmessagelist = (text) => {
        const newmessagelist = {
            username: "昵称",
            content: text,
        }
        setOnMessagelist([...onMessagelist, newmessagelist])
    }

    const ListFunctions = {

        // 发文字内容
        handleClickInput: (event) => {
            setInputContent(event.target.value)
        },
        handleConfirm: (event) => {
            setInputContent("")
            addTextlist(event.target.value)

            Services({
                url: '/api/photo/group/post',
                method: 'PUT',
                data: {
                    "groupid": Number(currentGroupId),
                    "text": event.target.value,
                    "userid": Number(Taro.getStorageSync('userid'))
                }
            })
            console.log("send", event.target.value)

        },

        // 发图片 
        handleSend: async () => {
            takePhoto().then((file) => {
                uploadFile(file).then((res) => {
                    console.log(res.data);
                    addPhotolist('http://'+'mini-project.muxixyz.com/'+JSON.parse(res.data).key)
                })
            })
        },
        // 跳转页面到 群成员设置
        handleClickMore:()=>{
            Taro.navigateTo({
            url:`../../pages/ChatFriends/ChatFriends?key=${secondTitle}&groupID=${currentGroupId}`
        })
        }
    }

    return (
        <>
            <View>
                <CurrentUserContent.Provider value={{ onMessagelist, photoList: photoList, chatlist: chatlist, inputContent: inputContent, ListFunctions: ListFunctions }}>
                    <Header CurrentUserContent={CurrentUserContent} title='多人记忆' ListFunctions={ListFunctions} secondTitle={secondTitle}></Header>
                    <Content CurrentUserContent={CurrentUserContent}></Content>
                </CurrentUserContent.Provider>
            </View>
        </>
    )
}
