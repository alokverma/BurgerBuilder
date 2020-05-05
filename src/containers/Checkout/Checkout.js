import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../Checkout/ContactData/ContactData'

class Checkout extends Component{
    state = {
        ingredients:null,
        totalPrice:0
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {}
        for(let param of query.entries()){
            //['salad','1']
            if(param[0]  === 'price'){
                this.setState({totalPrice:param[1]});
            }else
               ingredients[param[0]] = +param[1]
        }
        this.setState({ingredients:ingredients})
    }

    checoutCancelHander= () =>{
        this.props.history.goBack();
    }

    checkoutContinuedHandler = ()=>{
        this.props.history.replace('/checkout/contact-data')
    }
        render(){
            return(
                <div>
                    <CheckoutSummary
                        checkoutCance = {this.checoutCancelHander}
                        checkoutContinued = {this.checkoutContinuedHandler}
                        ingredients = {this.state.ingredients}></CheckoutSummary>
                        <Route path = {this.props.match.path+'/contact-data'}
                         render = {(props)=>(<ContactData 
                         ingredients = {this.state.ingredients}
                         totalPrice = {this.state.totalPrice}
                         {...props}/>)}/>
                </div>
            )
        }
}

export default Checkout;