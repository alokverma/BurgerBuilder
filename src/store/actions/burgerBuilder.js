import * as actionType from './actionTypes';
import axios from '../../axios-order';

export const addIngredients =(name) =>{
    return{
        ingredientName : name,
        type:actionType.ADD_INGREDIENT
    }
}

export const removeIngredients =(name) =>{
    return{
        ingredientName : name,
        type:actionType.REMOVE_INGREDENT
    }
}


const setIngredeitns = (ingredients) =>{
    return{
        type:actionType.LOAD_INGREDIENT,
        ingredients:ingredients
    }
}

const fetchIngerdientsFail =() =>{
    return{
        type:actionType.FETCH_INGREDEITNS_FAIL
    }
}
export const initIngredients = () =>{
    return dispatch => {
            axios.get('https://react-myburger-a947e.firebaseio.com/ingredients.json')
                 .then(response=>{
                     dispatch(setIngredeitns(response.data))
                 })
                 .catch(error=>{
                     console.log(error)
                     dispatch(fetchIngerdientsFail());
                 })
    }
}