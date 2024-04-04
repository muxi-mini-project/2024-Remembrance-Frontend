import React, { useState, useEffect } from 'react'
// import Taro from '@tarojs/taro';
import { View } from "@tarojs/components";
import Header from '../../component/Header/Header'
import Content from "../../component/Multiple/Content"
import './Multiple.css'
import { Services } from '../../serves/Services';



export default function Multiple() {

    // const [Idcontext, setIdcontext] = useState('')
    const [groupid, setGroupid] = useState("")
    const [list, setList] = useState([{
        peoplenum: '3',
        Name: '武昌',
        CreatedAt: '2024.1.24',
    },
    {
        peoplenum: '3',
        Name: '111',
        CreatedAt: '2024.1.24',
    },
    {
        peoplenum: '3',
        Name: '222',
        CreatedAt: '2024.1.24',
    },
    {
        peoplenum: '3',
        Name: '333',
        CreatedAt: '2024.1.24',
    }])

    useEffect(() => {
        // 获取用户信息
        Services(
            {
                url: '/api/user/group/get',
                method: 'POST',
                data: { "userid": 8 }
            }
        ).then(function (response) {
            setList(response.data.data.map((item) => ({...item, CreatedAt: item.CreatedAt.split('.')[0].replace('T', ' ')})))
            setGroupid(response.ID)
            console.log("request state is", response.data.message)
        }).catch(function (error) {
            console.log("request fail", error)
        })

    }, [])


    // 返回删除的信息 
    // const dellist = (Id) => {

    //     var newlist = list.filter(item => item.id != Id)
    //     setList(newlist)
    // }

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

                <CurrentUserContent.Provider value={{ groupid:groupid, addlist: addlist, list: list, setList: setList }}>
                    <Header CurrentUserContent={CurrentUserContent} title='多人记忆' navigationUrl='/CreateMultiple/CreateMultiple' secondTitle='列表' ></Header>
                    <Content CurrentUserContent={CurrentUserContent}></Content>
                </CurrentUserContent.Provider>

            </View>
        </>
    )
}
