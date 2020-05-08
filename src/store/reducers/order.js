import * as actionsType from '../actions/actionTypes';

const initialState ={
    orders:[],
    loading:false,
    purchased:false
}

const orderReducer = (state=initialState,action) =>{
    switch(action.type){
        case actionsType.PURCHASE_INIT:
            return{
                ...state,
                purchased:false
            }
        case actionsType.PURCHASE_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id:action.orderId
            }
            return{
                ...state,
                loading:false,
                orders:state.orders.concat(newOrder),
                purchased:true
            };
        case actionsType.PURCHASE_FAILS:
            return{
                ...state,
                loading:false,

            };
        case actionsType.PURCHASE_LOADING:
            return{
                ...state,
                loading:true
            };
    }
    return state;
}

export default orderReducer;