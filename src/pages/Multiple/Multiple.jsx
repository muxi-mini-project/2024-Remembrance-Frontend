import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro';
import { View } from "@tarojs/components";
import Header from '../../component/Header/Header'
import Content from "../../component/Multiple/Content"
import More from '../../component/Multiple/More'
import './Multiple.css'
import { Services } from '../../serves/Services';


export default function Multiple() {

    const [more,setMore] = useState(false)
    const [list, setList] = useState([])

    useEffect(() => {
        // 获取群聊信息
        Services(
            {
                url: '/api/user/group/get',
                method: 'POST',
                data: { "userid": Number(Taro.getStorageSync('userid')) }
            }
        ).then(function (response) {
            setList(response.data.group.map((item) => ({ ...item, CreatedAt: item.CreatedAt.split('.')[0].replace('T', ' ') })))
            console.log("request state is", response.data.message)
        }).catch(function (error) {
            console.log("request fail", error)
            Taro.showToast({
                title:'出错啦，请重试',
                icon:'none'
            })
        })

    }, [])

    const ListFunctions = {
        handleClickMore: () => {
           setMore(!more)
        },
    }

    const CurrentUserContent = React.createContext()
    return (
        <>
            <View>

                <CurrentUserContent.Provider value={{more:more, list: list, setList: setList }}>
                    <Header CurrentUserContent={CurrentUserContent} title='多人记忆'  ListFunctions={ListFunctions}></Header>
                    <More CurrentUserContent={CurrentUserContent}></More>
                    <Content CurrentUserContent={CurrentUserContent}></Content>
                </CurrentUserContent.Provider>

            </View>
        </>
    )
}
