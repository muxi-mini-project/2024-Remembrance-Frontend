import React, { useState,useEffect } from 'react'
import { View } from "@tarojs/components";
// import Taro from '@tarojs/taro';
import Header from "../../component/Multiple/Header"
import Content from "../../component/Multiple/Content"
import './Multiple.css'
import { Services } from '../../serves/Services';


export default function Multiple() {
    const [Idcontext, setIdcontext] = useState('')
    const [list, setList] = useState([{
        count: '3',
        position: '武昌',
        time: '2024.1.24',
        id: Math.random() * 1000000

    },
    {
        count: '3',
        position: '111',
        time: '2024.1.24',
        id: Math.random() * 1000000

    },
    {
        count: '3',
        position: '222',
        time: '2024.1.24',
        id: Math.random() * 1000000

    },
    {
        count: '3',
        position: '333',
        time: '2024.1.24',
        id: Math.random() * 1000000

    }])
    
    useEffect(() => {
        // 获取用户信息 但是接口还没
        const data = Services({ url: '', method: 'GET', data: { "count":"","time":"","position":"" } })
        console.log(data);
    })

    const dellist = (Id) => {
        // 返回删除的信息，接口还是没
        var newlist = list.filter(item => item.id != Id)
        setList(newlist)
    }

    const addlist = () => {
        var newlist = {
            position: '',
            time: '',
            id: Math.random() * 1000000
        }
        setList({ ...list, newlist })
    }

    const CurrentUserContent = React.createContext()
    return (
        <>
            <View>

                <CurrentUserContent.Provider value={{ Idcontext: Idcontext, setIdcontext: setIdcontext, addlist: addlist, list: list, setList: setList }}>
                    <Header CurrentUserContent={CurrentUserContent}></Header>
                    <Content CurrentUserContent={CurrentUserContent}></Content>
                </CurrentUserContent.Provider>

            </View>
        </>
    )
}
