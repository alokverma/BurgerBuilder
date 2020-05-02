import React,{Component} from 'react';
import Aux from '../../hoc/Auxilary/Auxilary'
import Burger from '../../components/Burger/Burger'
import BuildControlls from '../../components/Burger/BurgerController/BuildControlls'
import Model from '../../components/UI/Model/Model'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.6
}

class BurgerBuilder extends Component{

    state = {
        ingredeints: null,
        totalPrice:4,
        purchasable:false,
        puchasing:false,
        loading:false,
        error:false
    }
    componentDidMount(){
        axios.get('https://react-myburger-a947e.firebaseio.com/ingredients.json')
             .then(response=>{
                this.setState({ingredeints: response.data})
             })
             .catch(error=>{
                 console.log(error)
                this.setState({error:'ingredients cant be loaded'})
             })
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
       // alert('you shoped')
       this.setState({loading:true})
       const orderObject = {
           ingredeints:this.state.ingredeints,
           price: this.state.totalPrice,
           customer:{
               name:'alok',
               address:{
                   street:'2b',
                   pinCode: 11001,
                   state:'Delhi'
               },
               email:'averma1309@gmail.com'
           },
           deleiveryMethod:'fastest'
       }

       axios.post('/orders.json',orderObject)
            .then(resoponse => {
                console.log(resoponse)
                this.setState({loading:false, puchasing:false});
            })
            .catch(error=>{
                console.log(error)
                this.setState({loading:false,puchasing:false});
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
        this.updatePurchsateState(updateIngredients);
    }
    render(){
        const disableInfor = {
            ...this.state.ingredeints
        }
        for(let key in disableInfor){
            disableInfor[key] = disableInfor[key]<=0
        }
        let orderSummary = null
        
        let burger =  this.state.error? <p>Ingredients cant be loaded</p> : <Spinner></Spinner>
        if(this.state.ingredeints){
         burger = (
                <Aux>
                <Burger ingredients = {this.state.ingredeints}/>
                    <BuildControlls 
                        totalPrice = {this.state.totalPrice}
                        ingredientRemoved = {this.removeIngredientHandler}
                        ingredientAdded = {this.addIngredientHandler}
                        disabled = {disableInfor}
                        purchase = {this.purchaseHandler}
                        purchasable = {!this.state.purchasable}/>
               </Aux>)
               orderSummary = <OrderSummary
                    totalPrice = {this.state.totalPrice}
                    cancle = {this.purchaseCancelHandler}
                    continue = {this.purchaseContinuewHandler}
                    ingredeints = {this.state.ingredeints}></OrderSummary>;
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

export default withErrorHandler(BurgerBuilder,axios);