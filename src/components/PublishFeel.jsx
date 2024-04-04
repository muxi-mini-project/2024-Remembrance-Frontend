import { View, Image, Textarea } from '@tarojs/components';
import React, { useState, useEffect } from 'react';
import './PublishFeel.css';
import * as qiniu from 'qiniu-js'; // 使用 import * as 语法导入整个模块
import { Services } from './service/Services'; // 假设这是您定义的服务函数
import Taro from '@tarojs/taro';

export default function PublishFeel(props) {
    const { initialFeeling, feeling, setFeeling, filePaths ,setFilePaths } = props; // 文件列表
    const [postPhoto, setPostPhoto] = useState({
        key: '',
        token: ''
    });

    const userid = Taro.getStorageSync("userid");

    useEffect(() => {
        // 在此处调用获取七牛云上传凭证的函数，并设置对应的状态
        Services({
            url: `/api/photo/gettoken?userid=${userid}`,
            method: "GET",
        }).then(response => {
            console.log("七牛",response);
            setPostPhoto({ key: "image1", token: response.message });
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const inputFeel = (evt) => {
        setFeeling(evt.target.value);
    }

    const clearText = () => {
        if (feeling === initialFeeling) {
            setFeeling('');
        }
    }

    const returnText = () => {
        if (feeling.trim() === "") {
            setFeeling(initialFeeling);
        }
    }

    const addPhoto = async () => {
        await chooseImage();
    };

    const chooseImage = async () => {
            Taro.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
            }).then(res=>{
                console.log(res);
                const tempFilePaths = res.tempFilePaths;
                console.log(tempFilePaths);
                setFilePaths(tempFilePaths);
            }).catch(error=>{
                console.log(error);
            })
    };
    
    useEffect(() => {
        console.log(filePaths); // 在 fileList 变化时打印
    }, [filePaths]);
    
    
    return (
        <>
            <Textarea value={feeling} className='yourFeel' onFocus={clearText} onBlur={returnText} onInput={inputFeel}></Textarea>
            <View className='photoShow'>
                {filePaths.map((file, index) => (
                    <View key={index} className='photoItem'>
                        <View onClick={addPhoto}>
                        <Image className='addphoto' src={file}></Image>
                    </View>
                </View>
                ))}
            </View>
        </>
    )
}
