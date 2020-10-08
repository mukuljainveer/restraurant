export const addNewRestaurant=(data)=>{
    return {
        type:'ADD_RESTAUTRANT',
        data:data
    }
}

export const editRestaurant=(data)=>{
    return {
        type:'EDIT_RESTAUTRANT',
        data
    }
}