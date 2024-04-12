import { Services } from "./Services";

export async function AddName(props){
    const updatedData = await Promise.all(props.map(async (item) => {
        const username = await getUser(item.userid);
        return { ...item, username }; // 添加 formattedDate 到每个属性中
    }));
    
    return updatedData;
}

const getUser = async (index)=>{
    const response = await Services({
        url: `/api/user/getinfo`,
        method: "POST",
        data:{
            "id":index
        }
    }).then(res=>{
        return res.data.username;
    }).catch(err=>{
        console.log(err);
        return null;
    })

    return response;
}