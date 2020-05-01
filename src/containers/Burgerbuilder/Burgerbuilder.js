import React,{Component} from 'react';
import Aux from '../../hoc/Aux/Auxilary'
import Burger from '../../components/Burger/Burger'
import BuildControlls from '../../components/Burger/BurgerController/BuildControlls'
import Model from '../../components/UI/Model/Model'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.6
}

class BurgerBuilder extends Component{

    state = {
        ingredeints: {
            salad :0,
            bacon :0,
            cheese:0,
            meat:0
        },
        totalPrice:4,
        purchasable:false,
        puchasing:false
    }

    addIngredientHandler =(type)=>{
        const oldCount = this.state.ingredeints[type];
        const updatedCount = oldCount+1;
        const updateIngredients = {
            ...this.state.ingredeints
        }

        updateIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice+priceAddition;
        this.setState({
            ingredeints:updateIngredients,
            totalPrice:newPrice
        })
        this.updatePurchsateState(updateIngredients);
    }

    purchaseHandler=()=>{
        this.setState({puchasing:true})
    }

    updatePurchsateState= (ingredeints)=> {
      
        const sum = Object.keys(ingredeints)
                    .map((igKey) => {
                        return ingredeints[igKey];
                    })
                    .reduce((sum,el)=>{
                        return sum+el;
                    },0);
        this.setState({purchasable:sum>0});

    }

    purchaseCancelHandler = ()=>{
        this.setState({puchasing:false})
    }

    purchaseContinuewHandler= ()=>{
        alert('you shoped')
    }

    removeIngredientHandler= (type)=>{
        const oldCount = this.state.ingredeints[type];
        if(oldCount<=0){
            return;
        }
        const updatedCount = oldCount -1 ;
        const updateIngredients = {
            ...this.state.ingredeints
        }
        updateIngredients[type] = updatedCount;
        const priceReduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice-priceReduction;
        this.setState({
            ingredeints:updateIngredients,
            totalPrice:newPrice
        })
        this.updatePurchsateState(updateIngredients);
    }
    render(){
        const disableInfor = {
            ...this.state.ingredeints
        }
        for(let key in disableInfor){
            disableInfor[key] = disableInfor[key]<=0
        }
        return(
            <Aux>
                <Model
                modelClosed = {this.purchaseCancelHandler}
                 show = {this.state.puchasing}>
                    <OrderSummary
                     totalPrice = {this.state.totalPrice}
                     cancle = {this.purchaseCancelHandler}
                     continue = {this.purchaseContinuewHandler}
                     ingredeints = {this.state.ingredeints}/>
                </Model>
                <Burger ingredients = {this.state.ingredeints}/>
                <BuildControlls 
                    totalPrice = {this.state.totalPrice}
                    ingredientRemoved = {this.removeIngredientHandler}
                    ingredientAdded = {this.addIngredientHandler}
                    disabled = {disableInfor}
                    purchase = {this.purchaseHandler}
                    purchasable = {!this.state.purchasable}/>

                 
            </Aux>
        );
    }
}

export default BurgerBuilder;