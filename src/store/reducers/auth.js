import * as actionType from '../actions/actionTypes';

const initialState = {
    token:null,
    userId:null,
    error:null,
    loading:false,
    redirectPath:'/'
}
const reducer = (state = initialState,action)=>{
    switch(action.type){
        case actionType.AUTH_START:
            return{
                ...state,
                loading:true
            }
        case actionType.AUTH_FAIL:
            return{
                ...state,
                error:action.error,
                loading:false
            }
        case actionType.AUTH_SUCCESS:
            return{
                ...state,
                userId:action.userId,
                loading:false,
                error:null,
                token:action.token
            }
        case actionType.LOGOUT:
            return{
                ...state,
                token:null,
                userId:null,
                error:null
                }
        case actionType.SET_AUTH_REDIRECT_PATH:
            return{
                ...state,
                redirectPath : action.path
            }
        default:
            return state;
    }
};

export default reducer;