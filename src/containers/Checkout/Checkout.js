import React,{Component} from 'react';
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom';
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
            let summary = <Redirect to = "/" />
            if(this.props.ings){
                const purchasedRedirect = this.props.purchased?<Redirect to = "/" /> : null
                summary = (
                    <div>
                        {purchasedRedirect}
                        <CheckoutSummary
                            checkoutCance = {this.checoutCancelHander}
                            checkoutContinued = {this.checkoutContinuedHandler}
                            ingredients = {this.props.ings}></CheckoutSummary>
                            <Route path = {this.props.match.path+'/contact-data'}
                            component = {ContactData}/>
                     </div>
                )
            }
            return(
                <div> {summary}</div>
            )
        }
}

const mapStateToProps =(state)=>{
    return{
        ings: state.burgerBuilder.ingredients,
        purchased: state.orderReducer.purchased
    }
}



export default connect(mapStateToProps)(Checkout);