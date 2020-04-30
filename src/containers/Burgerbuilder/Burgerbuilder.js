import React,{Component} from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControlls from '../../components/Burger/BurgerController/BuildControlls'

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
        totalPrice:4
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
                <Burger ingredients = {this.state.ingredeints}/>
                <BuildControlls 
                    totalPrice = {this.state.totalPrice}
                    ingredientRemoved = {this.removeIngredientHandler}
                    ingredientAdded = {this.addIngredientHandler}
                    disabled = {disableInfor}/>
                 
            </Aux>
        );
    }
}

export default BurgerBuilder;