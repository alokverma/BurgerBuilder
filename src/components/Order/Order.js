import React from 'react';
import classes from './Order.css'
const order = (props) =>{
    let ingredients = [];
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name:ingredientName,
            amount : props.ingredients[ingredientName]
        })
    }

    const ingOutputs  = ingredients.map( (ig) =>{
    return <span
    style = {
        {
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '2px'
        }
    }
     key = {ig.name}>{ig.name} {ig.amount}</span>
    })

    return (<div className = {classes.Order}>
        {ingOutputs}
        <p>price : USD: {props.price}</p>
    </div>
    )
    }

export default order;