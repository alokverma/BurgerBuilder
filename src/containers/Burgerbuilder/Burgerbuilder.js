import React,{Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Auxilary/Auxilary'
import Burger from '../../components/Burger/Burger'
import BuildControlls from '../../components/Burger/BurgerController/BuildControlls'
import Model from '../../components/UI/Model/Model'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import * as actionType from '../../store/actions'


class BurgerBuilder extends Component{

    state = {
        ingredeints: {
            salad:0,
            cheese:0,
            meat:0,
            bacon:0
        },
        totalPrice:4,
        purchasable:false,
        puchasing:false,
        loading:false,
        error:false
    }
    componentDidMount(){
        console.log(this.props)
        // axios.get('https://react-myburger-a947e.firebaseio.com/ingredients.json')
        //      .then(response=>{
        //         this.setState({ingredeints: response.data})
        //      })
        //      .catch(error=>{
        //          console.log(error)
        //         this.setState({error:'ingredients cant be loaded'})
        //      })
    }
  

    purchaseHandler=()=>{
        this.setState({puchasing:true})
    }

    updatePurchsateState= ()=> {
      
        const sum = Object.keys(this.props.ings)
                    .map((igKey) => {
                        return this.props.ings[igKey];
                    })
                    .reduce((sum,el)=>{
                        return sum+el;
                    },0);
         return sum>0;
    }

    purchaseCancelHandler = ()=>{
        this.setState({puchasing:false})
    }

    purchaseContinuewHandler= ()=>{
        this.props.history.push({
            pathname:'/checkout',
        })
    }

   
    render(){
        const disableInfor = {
            ...this.props.ings
        }
        for(let key in disableInfor){
            disableInfor[key] = disableInfor[key]<=0
        }
        let orderSummary = null
        
        let burger =  this.state.error? <p>Ingredients cant be loaded</p> : <Spinner></Spinner>
        if(this.props.ings){
         burger = (
                    <Aux>
                    <Burger ingredients = {this.props.ings}/>
                    <BuildControlls 
                            totalPrice = {this.props.totalPrice}
                            ingredientRemoved = {this.props.removeIngredients}
                            ingredientAdded = {this.props.addIngredients}
                            disabled = {disableInfor}
                            purchase = {this.purchaseHandler}
                            purchasable = {!this.updatePurchsateState()}/>
                </Aux>
               );
        orderSummary = (<OrderSummary
                    totalPrice = {this.props.totalPrice}
                    cancle = {this.purchaseCancelHandler}
                    continue = {this.purchaseContinuewHandler}
                     ingredeints = {this.props.ings}></OrderSummary>);
        }
        if(this.state.loading){
            orderSummary = <Spinner></Spinner>
        }
        return(
            <Aux>
                <Model
                 modelClosed = {this.purchaseCancelHandler}
                 show = {this.state.puchasing}>
                    {orderSummary}
                </Model>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps=(state)=>{
    return {
        ings:state.ingredients,
        totalPrice: state.totalPrice
    };
}

const mapDispatchToProps = (dispatch)=>{
    return{
        addIngredients : (ingName)=>dispatch({type: actionType.ADD_INGREDIENT,ingredientName:ingName}),
        removeIngredients : (ingName)=>dispatch({type: actionType.REMOVE_INGREDENT,ingredientName:ingName})

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));