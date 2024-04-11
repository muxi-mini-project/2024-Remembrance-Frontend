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
    // const [groupid, setGroupid] = useState("")
    const [list, setList] = useState([{
        peoplenum: '3',
        Name: '武昌',
        CreatedAt: '2024.1.24',
        ID:''
    },
    {
        peoplenum: '3',
        Name: '汉阳',
        CreatedAt: '2024.1.24',
        ID:''
    },
    ])

    useEffect(() => {
        // 获取群聊信息
        Services(
            {
                url: '/api/user/group/get',
                method: 'POST',
                data: { "userid": 8 }
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

    // 返回删除的信息 
    // const dellist = (Id) => {

    //     var newlist = list.filter(item => item.id != Id)
    //     setList(newlist)
    // }


    // const addlist = () => {
    //     var newlist = {
    //         Name: '',
    //         CreatedAt: '',
    //     }
    //     setList({ ...list, newlist })
    // }

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
