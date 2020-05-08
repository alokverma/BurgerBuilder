import React,{Component} from 'react';
import {connect} from 'react-redux'
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../Checkout/ContactData/ContactData'

class Checkout extends Component{

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
                        ingredients = {this.props.ings}></CheckoutSummary>
                        <Route path = {this.props.match.path+'/contact-data'}
                        component = {ContactData}/>
                </div>
            )
        }
}

const mapStateToProps =(state)=>{
    return{
        ings: state.ingredients
    }
}



export default connect(mapStateToProps)(Checkout);