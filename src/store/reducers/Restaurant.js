const initalState={
    data:[
        {
            name:'Jheel’s Rooftop Restaurant',
            menu:[
                {type:'dish',name:'Pav Bhaji',price:180},
                {type:'Cuisine',name:' Cuisine',price:150}
                ]
        },
        {
            name:'Dil Punjabi',
            menu:[
                {type:'dish',name:'Burger',price:80},
                {type:'dish',name:'Dosa',price:120},
                {type:'Cuisine',name:'Punjabi Cuisine',price:200}
            ]
        }
    ]
}

function Restaurant(state=initalState,action) {
    console.log(action)
    switch (action.type) {
        case 'ADD_RESTAUTRANT':
            state.data.push(action.data)
            return state;
        case 'EDIT_RESTAUTRANT':
            state.data.splice(action.data.editable,1)
            state.data.splice(action.data.editable,0,action.data.restaurant)
            return state;
        default:
            return state
    }
}

export default Restaurant;