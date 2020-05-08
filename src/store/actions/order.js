import * as actionType from './actionTypes'
import axios from '../../axios-order'

export const purchaseBurgerloading = () =>{
    return{
        type:actionType.PURCHASE_LOADING
    }
}
export const purchaseBurgerSucess = (id,orderData) =>{
    return{
        type:actionType.PURCHASE_SUCCESS,
        orderId: id,
        orderData:orderData
    }
}

export const purchaseBurgerFail = (error) =>{
    return{
        type:actionType.PURCHASE_FAILS,
        error:error
    }
}

export const purchaseBurgerStart = (orderData) =>{
    return dispatch =>{
        dispatch(purchaseBurgerloading());
        axios.post('/orders.json',orderData)
        .then(resoponse => {
            console.log(resoponse)
            dispatch(purchaseBurgerSucess(resoponse.data.id,orderData))
          //  this.props.history.push('/')
        })
        .catch(error=>{
            console.log(error)
            dispatch(purchaseBurgerFail(error))
        })

    }
}

export const purchaseInit= ()=>{
    return{
        type:actionType.PURCHASE_INIT
    }
}

export const fetchOrders = ()=>{
    return dispatch =>{
        dispatch(fetchOrderStart())
        axios.get('/orders.json')
        .then(resp=>{
            console.log(resp.data)
            const fetedOrders = [];
            for(let key in resp.data){
                fetedOrders.push({
                    ...resp.data[key],
                    id:key})
            }
            dispatch(fetchOrderSuccess(fetedOrders));
        }).catch(error=>{
            dispatch(fetchOrderFails(error));
        })
    }
}

const fetchOrderSuccess = (orders)=>{
    return{
        type: actionType.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}

const fetchOrderFails = (error)=>{
    return{
        type:actionType.FETCH_ORDER_FAILS,
        error:error
    }
}

const fetchOrderStart = () =>{
    return{
        type:actionType.FETCH_ORDER_START,
    }

}