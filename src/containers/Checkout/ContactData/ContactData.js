import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
    state = {
        name:'',
        email:'',
        address:{
            stree:'',
            city:''
        },
        loading:false
    }

    orderHandler=(event)=>{
        event.preventDefault();
        console.log(this.props)
        this.setState({loading:true})
       const orderObject = {
           ingredeints:this.props.ingredients,
           price: this.props.totalPrice,
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
                this.setState({loading:false});
                this.props.history.push('/')
            })
            .catch(error=>{
                console.log(error)
                this.setState({loading:false});
            })

    }

    render(){
        let form = ( <form>
                <input className ={classes.Input} type = "text" name = "name" placeholder = "Your Name"/>
                <input  className ={classes.Input} type = "text" name = "email" placeholder = "Your mail"/>
                <input  className ={classes.Input} type = "text" name = "street" placeholder = "Your street"/>
                <input   className ={classes.Input}type = "text" name = "city" placeholder = "Your city"/>
                <Button btnType = "Success"
                clicked = {this.orderHandler}>ORDER</Button>
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