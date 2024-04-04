import Taro from "@tarojs/taro";

const baseUrl = 'http://8.138.81.141:8088';

export function Services({ url = '', data = {}, header = {"Content-Type": "application/json"}, method = 'GET' }) {
    // 创建一个新的请求配置对象，避免修改传入的参数
    const requestConfig = {
        url: baseUrl + url.trim(),
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
