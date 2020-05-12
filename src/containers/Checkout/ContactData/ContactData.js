import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/Input/Input'
import WithErrorHandler from '../../../hoc/withErrorHandler/WithErrorHandler'
import axios from '../../../axios-order'
import * as actions from '../../../store/actions/index';

class ContactData extends Component{
    state = {
        orderForm:{
            name:{
                    elementType : 'input',
                    elementConfig: {
                        type:'text',
                        placeholder: 'Your Name'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
            street:{
                    elementType : 'input',
                    elementConfig: {
                        type:'text',
                        placeholder: 'Street'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
            pinCode: {
                    elementType : 'input',
                    elementConfig: {
                        type:'number',
                        placeholder: 'pinCode'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
            country:{
                    elementType : 'input',
                    elementConfig: {
                        type:'text',
                        placeholder: 'Country'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
            email:{
                    elementType : 'input',
                    elementConfig: {
                        type:'email',
                        placeholder: 'email'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
            deleiveryMethod:{
                    elementType : 'select',
                    elementConfig: {
                       options:[
                           {value:'fastest', displayValue:'Fastest'},
                           {value:'cheepest', displayValue:'Cheepest'}
                       ]
                    },
                    validation:{
                       
                    },
                    value:'fastest',
                    valid:true,
                    touched:false
                }
            },
            formValid:false
        }
    
    checkValidation = (value,rules)=>{
        let isValid = false;
        if(rules.required){
            isValid = value.trim() !== ''
        }
        return isValid;
    }

    orderHandler=(event)=>{
        event.preventDefault();
        const formData = {};
        for(let formId in this.state.orderForm){
            formData[formId] = this.state.orderForm[formId].value;
        }

       const orderObject = {
           ingredeints:this.props.ings,
           price: this.props.price,
           orderData : formData,
           userId: this.props.userId
       }
       this.props.purchaseStart(orderObject,this.props.token)
      
    }

    inputChangeHandler = (event,inputIdentifier) =>{
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = { 
           ...updatedOrderForm[inputIdentifier]
         }
         updatedFormElement.value = event.target.value
         if(updatedFormElement.elementType !== "select")
            updatedFormElement.valid= this.checkValidation(updatedFormElement.value,updatedFormElement.validation)
         else
            updatedFormElement.valid = true
            if(updatedFormElement.elementType !== "select")
                 updatedFormElement.touched = true;
        
         let isFormValid = true;

         for(let key in updatedOrderForm){
             isFormValid = updatedOrderForm[key].valid && isFormValid
         }
         updatedOrderForm[inputIdentifier] = updatedFormElement
         this.setState({orderForm:updatedOrderForm,formValid:isFormValid})
    }

   
    render(){
        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config: this.state.orderForm[key]
            })
        }
        let form = ( <form onSubmit = {this.orderHandler}>
                {
                    formElementArray.map((formElement)=>{
                      return <Input
                         key = {formElement.id}
                         elementType = {formElement.config.elementType}
                         elementConfig = {formElement.config.elementConfig}
                         invalid = {!formElement.config.valid}
                         value = {formElement.config.value}
                         touched = {formElement.config.touched}
                         shouldValidate = {formElement.config.validation}
                         changed = {(event)=>this.inputChangeHandler(event,formElement.id)}
                        />
                    })
                }
                 <Button btnType = "Success" disabled = {!this.state.formValid}>ORDER</Button>
        </form>);
        if(this.props.loading){
            form = <Spinner/>
        }
        return(
            <div className = {classes.ContactData}>
                <h4>Enter Your contact data</h4>
                {form}
            </div>
        )
    }

}

const mapStateToProps = state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.orderReducer.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        purchaseStart: (orderData,token)=>dispatch(actions.purchaseBurgerStart(orderData,token))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(ContactData,axios));