import * as actionType from '../actions/actionTypes'
import {updateObject} from '../utiltiy'

const initialState = {
    ingredients:null,
    totalPrice : 4,
    error: false,
    loading:false
}

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.6
}

const reducer = (state = initialState,action)=>{
    switch(action.type){
        case actionType.ADD_INGREDIENT:
            const updatedIngreidnt = { [action.ingredientName]:state.ingredients[action.ingredientName]+1}
            const updatedIngreidnts = updateObject(state.ingredients,updatedIngreidnt)
            const updatedState = {
                ingredients: updatedIngreidnts,
                totalPrice: state.totalPrice+INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state,updatedState)
        case actionType.REMOVE_INGREDENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice:state.totalPrice-INGREDIENT_PRICES[action.ingredientName]
            };
        case actionType.LOAD_INGREDIENT:
            return{
                ...state,
                ingredients : action.ingredients,
                totalPrice:4,
                error:false
            }
        case actionType.FETCH_INGREDEITNS_FAIL:
            return{
                ...state,
                error: true
            };
    }
    return state;
};

export default reducer;