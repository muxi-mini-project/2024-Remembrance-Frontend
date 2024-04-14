import { View, Image, Textarea } from '@tarojs/components';
import React, { useState, useEffect } from 'react';
import './PublishFeel.css';
import * as qiniu from 'qiniu-js'; // 使用 import * as 语法导入整个模块
import { Services } from './service/Services'; // 假设这是您定义的服务函数
import Taro from '@tarojs/taro';

export default function PublishFeel(props) {
    const { initialFeeling, feeling, setFeeling, filePaths ,setFilePaths } = props; 

    const userid = Taro.getStorageSync("userid");

    const takePhoto = (maxCount = 1, sizeType = ['original'], sourceType = ['camera']) => {
        return new Promise((resolve, reject) => {
            Taro.chooseImage({
                count: maxCount, // 最多可以选择的图片张数，默认1
                sizeType, // original 原图，compressed 压缩图，默认二者都有
                sourceType, // album 从相册选图，camera 使用相机，默认二者都有
                success(res) {
                    // success
                    const urlPath = res.tempFilePaths[0]
                    resolve(urlPath)
                },
                fail(res) {
                    // fail
                    reject(res)
                },
            })
        })
    }

    const uploadFile = (upFile) => {
        return new Promise((resolve, reject) => {
            Taro.uploadFile({
                url: "https://up-z2.qiniup.com",
                filePath: upFile, // chooseImage上传的图片,是一个临时路径
                name: "file",
                header: {
                    "Content-Type": "multipart/form-data",
                    'region': 'up-z2.qiniup.com', // 指定区域为 up-z2
                    'bucket': 'muxi-miniproject'
                },
                formData: {
                    key:`${Date.now()}.${upFile.split('.')[1]}`,
                    token: Taro.getStorageSync('qiniutoken'),
                },
                success(res) {
                    // 这里返回key 与 hash
                    console.log(res)
                    const imageUrl = `http://mini-project.muxixyz.com/${JSON.parse(res.data).key}`;
                    resolve(imageUrl); // 返回图片链接
                },
                fail(error) {
                    reject(error);
                }
            })
        });
    }

    useEffect(() => {
        // 在此处调用获取七牛云上传凭证的函数，并设置对应的状态
        Services({
            url: `/api/photo/gettoken?userid=${userid}`,
            method: "GET",
        }).then(response => {
            console.log("七牛", response);
            Taro.setStorageSync('qiniutoken', response.data.QnToken);
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

    const addPhoto = () => {
        takePhoto().then((file) => {
            uploadFile(file).then((imageUrl) => {
                setFilePaths([imageUrl]); // 将图片链接添加到数组中
            }).catch(error => {
                console.error("上传文件失败：", error);
            });
        }).catch(error => {
            console.error("选择图片失败：", error);
        });
    };

    return (
        <>
            <Textarea value={feeling} className='yourFeel' onFocus={clearText} onBlur={returnText} onInput={inputFeel}></Textarea>
            <View className='photoShow'>
                {filePaths.map((file, index) => (
                    <View key={index} className='photoItem'>
                        <View onClick={()=>addPhoto()}>
                        <Image className='addphoto' src={file}></Image>
                    </View>
                </View>
                ))}
            </View>
        </>
    )
}
