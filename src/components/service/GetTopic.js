import Taro from "@tarojs/taro";
import { Services } from "./Services";

export function GetTopic(props) {
    return new Promise((resolve, reject) => {
        Services({
            url: `/api/photo/personal/getpersonalalbum`,
            method: "POST",
            data:{
                "userid":props
            }
        }).then(response => {
            console.log(response);
            if (response.data) {
                resolve(response.data);
            } else {
                resolve([]);
            }
        }).catch(error => {
            console.log(error);
            reject(error);
        });
    });
}
