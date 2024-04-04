export function AddDate(props){
      const updatedData = props.data.map(item => {
        const createdAtString = item.CreatedAt;
        const createdAtDate = new Date(createdAtString);
        const year = createdAtDate.getFullYear();
        const month = createdAtDate.getMonth() + 1;
        const day = createdAtDate.getDate();
        const date = `${year}.${month}.${day}`;
        return { ...item, date }; // 添加 formattedDate 到每个属性中
      })

      return updatedData;
}