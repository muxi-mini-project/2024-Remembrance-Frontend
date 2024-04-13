import React, { useState, useEffect } from 'react'
import { View } from "@tarojs/components"
import Taro from '@tarojs/taro'
import Header from '../../component/Header/Header'
import Content from '../../component/GoalList/Content'
import { Services } from '../../serves/Services'
import "./GoalList.css"
import { takePhoto, uploadFile } from '../../UploadQiniu/UploadQiniu';




export default function GoalList() {
    const [inputContent, setInputContent] = useState('')
    const [secondTitle, setSecondTitle] = useState('')
    const [currentGroupId, setCurrentGroupId] = useState('')
    const [groupRecord, setGroupRecord] = useState([
        {
            userid: "",
            text: '',
            cloudurl: ''
        }
    ])


    const Getgrouprecord = () => {
        // 拉下聊天记录
        Services({
            url: `/api/photo/group/get`,
            method: "POST",
            data: { 'groupid': Number(currentGroupId) }
        }).then(function (response) {
            setGroupRecord(response.data.data.map((item) => ({ ...item })))
            console.log('request state is', response.data.message)
        }).catch(error => {
            console.log("service fail", error)
        })
        console.log(groupRecord)

    }
    console.log(groupRecord)

    useEffect(() => {

        // 传群聊名称信息
        const pages = Taro.getCurrentPages();
        const currentPage = pages[pages.length - 1];
        const { key, groupID } = currentPage.options;
        setCurrentGroupId(groupID)
        setSecondTitle(key)
        console.log('Received data:', key, groupID);



        // 获得图片token
        Services({
            url: `/api/photo/gettoken?user=${19}`,
            method: "GET"
        }).then(response => {
            console.log(response.data);
            Taro.setStorageSync('qiniutoken', response.data.data.QnToken)
        }).catch(error => {
            console.log("service fail", error)
        })

        // 获取聊天记录
        // Services({
        //     url: `/api/photo/group/get`,
        //     method: "POST",
        //     data: { 'groupid': Number(currentGroupId) }
        // }).then(function (response) {
        //     setGroupRecord(response.data.data.map((item) => ({ ...item })))
        //     console.log('request state is', response.data.message)
        // }).catch(error => {
        //     console.log("service fail", error)
        // })

        // setInterval(() => {
        //     Getgrouprecord()
        // }, 1000)

    }, []);

    const CurrentUserContent = React.createContext()


    const ListFunctions = {

        // 发文字内容
        handleClickInput: (event) => {
            setInputContent(event.target.value)
        },
        handleConfirm: (event) => {
            setInputContent("")
            // addTextlist(event.target.value)

            Services({
                url: '/api/photo/group/post',
                method: 'PUT',
                data: {
                    "groupid": Number(currentGroupId),
                    "text": event.target.value,
                    // "userid": Number(Taro.getStorageSync('userid'))
                    'userid': 19,
                    'cloudurl': ''
                }
            }).then(Getgrouprecord)
            console.log("send", event.target.value)
            // console.log(groupRecord)
        },

        // 发图片 
        handleSend: async () => {
            takePhoto().then((file) => {
                uploadFile(file).then((res) => {
                    console.log(res.data);
                    Services({
                        url: '/api/photo/group/post',
                        method: 'PUT',
                        data: {
                            'cloudurl': 'http://' + 'mini-project.muxixyz.com/' + JSON.parse(res.data).key,
                            "groupid": Number(currentGroupId),
                            //    "userid": Number(Taro.getStorageSync('userid'))
                            "userid": 19,
                            'text': ''
                        }
                    }).then(Getgrouprecord)
                })
            })
        },
        // 跳转页面到 群成员设置
        handleClickMore: () => {
            Taro.navigateTo({
                url: `../../pages/ChatFriends/ChatFriends?key=${secondTitle}&groupID=${currentGroupId}`
            })
        },

    }

    return (
        <>
            <View>
                <CurrentUserContent.Provider value={{ groupRecord: groupRecord, inputContent: inputContent, ListFunctions: ListFunctions }}>
                    <Header CurrentUserContent={CurrentUserContent} title='多人记忆' ListFunctions={ListFunctions} secondTitle={secondTitle}></Header>
                    <Content CurrentUserContent={CurrentUserContent}></Content>
                </CurrentUserContent.Provider>
            </View>
        </>
    )
}



