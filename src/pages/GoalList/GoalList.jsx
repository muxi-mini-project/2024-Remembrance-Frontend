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


    const Getgrouprecord = (groupID) => {
        // 拉下聊天记录
        Services({
            url: `/api/photo/group/get`,
            method: "POST",
            data: { 'groupid': Number(groupID) }
        }).then(function (response) {
            setGroupRecord(response.data.data)
            console.log('request state is', response.data.message)
        }).catch(error => {
            console.log("service fail", error)
        })

    }

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
        Getgrouprecord(groupID)
        let timer = setInterval(() => {
            Getgrouprecord(groupID)
        }, 6000)
        return () => {
            clearInterval(timer)
        }
    }, []);

    const CurrentUserContent = React.createContext()


    const ListFunctions = {

        // 发文字内容
        handleClickInput: (event) => {
            setInputContent(event.target.value)
        },
        handleConfirm: (event) => {
            setInputContent("")
            Services({
                url: '/api/photo/group/post',
                method: 'PUT',
                data: {
                    "groupid": Number(currentGroupId),
                    "text": event.target.value,
                    'userid': Number(Taro.getStorageSync('userid')),
                    'cloudurl': ''
                }
            }).then(() => Getgrouprecord(currentGroupId))
            console.log("send", event.target.value)
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
                            "userid": Number(Taro.getStorageSync('userid')),
                            'text': ''
                        }
                    }).then(function(response) {
                        Getgrouprecord(currentGroupId)
                        if (response.data.message==400){
                            Taro.showToast({
                                title:'出错啦，请重试',
                                icon:'none'
                            
                            })
                        }
                    }

                    )
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
                    <Header CurrentUserContent={CurrentUserContent} backUrl='/pages/Multiple/Multiple' title='多人记忆' ListFunctions={ListFunctions} secondTitle={secondTitle}></Header>
                    <Content CurrentUserContent={CurrentUserContent}></Content>
                </CurrentUserContent.Provider>
            </View>
        </>
    )
}



