import React from 'react';
import Aux from '../../../hoc/Aux/Auxilary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredeints)
                        .map((igKey)=>{
                        return <li key = {igKey}>
                            <span style = {{textTransform:"capitalize"}}>{igKey}</span>: {props.ingredeints[igKey]}</li>
                        });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Delecious burger with following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to checkout? </p>
             <p>Price: {props.totalPrice}</p>
            <Button
             clicked = {props.cancle}
             btnType = "Danger">CANCEL</Button>
            <Button 
            clicked = {props.continue}
            btnType= "Success">CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary;