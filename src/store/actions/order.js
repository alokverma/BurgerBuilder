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