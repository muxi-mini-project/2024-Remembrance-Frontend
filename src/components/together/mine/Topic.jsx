import { View, Text } from '@tarojs/components';
import React, { useEffect, useState } from 'react';
import './Topic.css';
import Taro from '@tarojs/taro';
import { Services } from '../../service/Services';

export default function Topic() {
    // 状态用来保存个人相册列表
    const [topicList, setTopicList] = useState([]);

    const userid = Taro.getStorageSync("userid");

    const fetchTopicList = () => {
        Services({
            url: `/api/photo/personal/getpersonalalbum`,
            method: "POST",
            data:{
                "userid":userid
            }
        }).then(response => {
            console.log(response);
            // 使用获取的数据更新topicList状态
            if (response.data) {
                setTopicList(response.data);
            }
        }).catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        fetchTopicList();
    }, []);

    // 导航到详细主题页面的函数
    const toTopic = (item) => {
        // 将项目对象转换为JSON字符串
        const itemString = JSON.stringify(item);
        // 导航到详细主题页面，并将项目作为查询参数传递
        Taro.navigateTo({
            url: `/pages/mytopic/index?topicItem=${encodeURIComponent(itemString)}`,
        });
    };

    Taro.useDidShow(() => {
        fetchTopicList();
    });

    return (
        <View className='topic'>
            {topicList && topicList.map((item) => (
                <View key={item.ID} className='topicBack'>
                    <View onClick={() => toTopic(item)}></View>
                    <Text>{item.personalalbumname}</Text>
                </View>
            ))}
        </View>
    );
}

