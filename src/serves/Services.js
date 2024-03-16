// import React from 'react'
import Taro from "@tarojs/taro"

const baseUrl = 'http://8.138.81.141:8088'
export function Services(props={
    url: '',
    data: '',
    header: '',
    method: ''
}) {
    props.url = baseUrl + props.url
    props.header = {"Authorization":"09"}
    return Taro.request(props).then((res) => {
        return res
    })
    .catch((err) => {
        console.error(err);
    })
}
