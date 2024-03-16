import { useContext } from "react"
import { View } from "@tarojs/components"
import RenderList from "./content/RenderList"
import Poppup2 from './content/Poppup2'
import Poppup from "./content/Poppup"


export default function Content(prop) {
    const { CurrentUserContent } = prop
    const {cancle, Disband} = useContext(CurrentUserContent)

    return (
        <>
            <View className='content'>
                    <RenderList CurrentUserContent={CurrentUserContent}></RenderList>
                    {cancle && <Poppup2 CurrentUserContent={CurrentUserContent}></Poppup2>}
                    {Disband && <Poppup  CurrentUserContent={CurrentUserContent}></Poppup>}
            </View>
        </>
    )
}
