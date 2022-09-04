export default function transformInitials (name :string) {
    const newArr = name.split(" ");
    let newName: string = '';
    if(newArr.length>2){
        for (let index = 0; index < newArr.length; index++) {
            if(index === 0 || index === newArr.length -1){
                if(index ===0){
                    newName += newArr[index].toUpperCase() + ' ';
                }else{
                    newName += newArr[index].toUpperCase();
                }   
            }else{
                newName += newArr[index][0].toUpperCase() + ' ';
            }    
        }
        return newName;
    }else{
        return name.toUpperCase();
    }
}