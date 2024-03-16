import { Button, Input, View } from '@tarojs/components'
import {useState } from 'react'
// import React from 'react'
import Taro from "@tarojs/taro"
import Verification from './content/Verification'
import { Services } from '../../serves/Services'


export default function Content() {
    const [click,setClick]=useState(false)
    const [name, setName] = useState('')
    const handleBack = () => {
        Taro.navigateBack({
            delta: 1
        })
    }
    const handleInput = (event) => {
        setName(event.target.value)
    }
    const handleConfirm=()=>{
        console.log(name)
        // 发送群名
        const data = Services({ url: '/api/user/group/creat', method: 'PUT', data: { "code":name,"id":"" } })
        console.log(data);
    }
    const handleClick=()=>{
        console.log('111')
        setClick(true)
    }
    return (
        <>

            <View className='content'>
                <View className='return' onClick={handleBack}></View>
                <View className='content-content'>
                    <Input className='input-name' value={name} placeholder='请输入列表昵称' onInput={handleInput} onConfirm={handleConfirm}></Input>
                    <Button className='button' onClick={handleClick} style={{backgroundColor:click?'#A5CCE7':'white'}}> 获取数字</Button>
                    <Verification></Verification>
                    <View className='footnote'>
                        <View className='footnote-content'>和小伙伴一起组件列表，</View>
                        <View className='footnote-content'>创造美好回忆吧！</View>
                    </View>
                    <View className='pattern'>
                        <View className='pattern1'></View>
                        <View className='pattern2'></View>
                    </View>
                </View>
            </View>

        </>
    )
}
