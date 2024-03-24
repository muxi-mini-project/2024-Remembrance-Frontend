import Taro from "@tarojs/taro";

const baseUrl = 'http://127.0.0.1:4523/m1/3942932-0-default';

export function Services(props = {
    url: '',
    data: '',
    header: {"Content-Type": "application/json"},
    method: ''
}) {
    const { url, data, header, method } = props;

    // 创建一个新的请求配置对象，避免修改传入的参数
    const requestConfig = {
        url: baseUrl + url,
        data,
        header,
        method
    };

    // 发起请求并返回 Promise 对象
    return Taro.request(requestConfig)
        .then((res) => {
            // 在这里可以对响应进行进一步处理，比如检查状态码等
            return res.data; // 返回响应数据
        })
        .catch((err) => {
            // 在这里可以对错误进行进一步处理，比如打印错误信息、提示用户等
            console.error(err);
            throw err; // 将错误向上传递，让调用方处理
        });
}
