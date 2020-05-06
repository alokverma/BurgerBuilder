import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/Input/Input'

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
                },
            street:{
                    elementType : 'input',
                    elementConfig: {
                        type:'text',
                        placeholder: 'Street'
                    },
                    value:'',
                },
            pinCode: {
                    elementType : 'input',
                    elementConfig: {
                        type:'text',
                        placeholder: 'pinCode'
                    },
                    value:'',
                },
            country:{
                    elementType : 'input',
                    elementConfig: {
                        type:'text',
                        placeholder: 'Country'
                    },
                    value:''
                },
            email:{
                    elementType : 'input',
                    elementConfig: {
                        type:'email',
                        placeholder: 'email'
                    },
                    value:''
                },
            deleiveryMethod:{
                    elementType : 'select',
                    elementConfig: {
                       options:[
                           {value:'fastest', displayValue:'Fastest'},
                           {value:'cheepest', displayValue:'Cheepest'}
                       ]
                    },
                    value:''
                }
            },
            loading:false
        }
    

    orderHandler=(event)=>{
        event.preventDefault();
        console.log(this.props)
        this.setState({loading:true})
        const formData = {};
        for(let formId in this.state.orderForm){
            formData[formId] = this.state.orderForm[formId].value;
        }

       const orderObject = {
           ingredeints:this.props.ingredients,
           price: this.props.totalPrice,
           orderData : formData,
       }

       axios.post('/orders.json',orderObject)
            .then(resoponse => {
                console.log(resoponse)
                this.setState({loading:false});
                this.props.history.push('/')
            })
            .catch(error=>{
                console.log(error)
                this.setState({loading:false});
            })

    }

    inputChangeHandler = (event,inputIdentifier) =>{
        console.log(event.target.value)
        const value =  event.target.value;
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = { 
           ...updatedOrderForm[inputIdentifier]
         }
         updatedFormElement.value = event.target.value
         updatedOrderForm[inputIdentifier] = updatedFormElement
         this.setState({orderForm:updatedOrderForm})
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
                         value = {formElement.config.value}
                         changed = {(event)=>this.inputChangeHandler(event,formElement.id)}
                        />
                    })
                }
                 <Button btnType = "Success">ORDER</Button>
        </form>);
        if(this.state.loading){
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

export default ContactData;