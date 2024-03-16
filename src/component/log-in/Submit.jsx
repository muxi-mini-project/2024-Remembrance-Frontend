import { useContext } from 'react'
import { View, Button} from "@tarojs/components";
import { Services } from '../../serves/Services'


export default function Submit(prop) {
    const {CurrentUserContent}=prop
    const {password,mailbox}=useContext(CurrentUserContent)

    const handleEnter=()=>{
        // 登入接口 ok？
        const data = Services({ url: '/user/login', method: 'POST', data: { "email": mailbox, "password": password } })
        console.log(data);
    }
    return (
        <>
            <View className='submit-back'>
                <View className='submit-top'>
                    <Button className='button' style={{backgroundColor:password&&password.length?'#2383E0':'transparent'}} onClick={handleEnter}>登入</Button>
                    <View className='submit-foot1'>微信授权登入</View>
                </View>
            </View>
        </>
    )
}
