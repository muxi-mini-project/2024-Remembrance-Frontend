import { View, Image, Textarea, Text } from '@tarojs/components'
import React, { useState, useEffect } from 'react'
import './PublishFeel.css'
import * as qiniu from 'qiniu-js'
import addphotoImage from '../assets/publish/添加图片.png'
import { Services } from './service/Services' // 假设这是您定义的服务函数

export default function PublishFeel(props) {

    const { initialFeeling, feeling, setFeeling } = props;
    const [fileList, setFileList] = useState([]); // 文件列表
    const [postPhoto,setPostPhoto] = useState(null)

    const userid = '1';

    useEffect(() => {
        // 在此处调用获取七牛云上传凭证的函数，并设置对应的状态
        Services({
            url: `/api/photo/gettoken?userid=${userid}`,
            method: "GET",
        }).then(response => {
            console.log(response);
            const { key, token, putExtra, config } = response.data; 
            setPostPhoto({key:key,token:token,putExtra:putExtra,config:config});
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

    const addPhoto = (evt) => {
        const selectedFile = evt.target.files[0];
        // 在此处调用上传文件的函数
        if (selectedFile && postPhoto) {
            const { key, token, putExtra, config } = postPhoto;
            const observable = qiniu.upload(selectedFile, key, token, putExtra, config);
            observable.subscribe({
                next: (response) => {
                    console.log(response);
                    // 在上传成功后，将文件添加到文件列表中
                    setFileList([...fileList, selectedFile]);
                },
                error: (error) => {
                    console.error(error);
                    // 处理上传失败的情况
                },
                complete: () => {
                    console.log('上传完成');
                }
            });
        }
    }


    return (
        <>
            <Textarea value={feeling} className='yourFeel' onFocus={clearText} onBlur={returnText} onInput={inputFeel}></Textarea>
            <View className='photoShow'>
                {fileList.map((file, index) => (
                    <View key={index} className='photoItem'>
                        <Image className='photo' src={URL.createObjectURL(file)} />
                    </View>
                ))}
                {fileList.length < 9 && (
                    <View className='photoItem'>
                        <View onClick={addPhoto}>
                            <Image className='addphoto' src={addphotoImage}></Image>
                        </View>
                    </View>
                )}
            </View>
        </>
    )
}

