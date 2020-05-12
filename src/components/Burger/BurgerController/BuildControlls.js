import React from 'react';
import classes from './BuildControlls.css'
import BuildControll from './BuildControll/BuildControll'

const controlls = [
    {lable:'Salads',type:'salad'},
    {lable:'Bacon',type:'bacon'},
    {lable:'Cheese',type:'cheese'},
    {lable:'Meat',type:'meat'}
]
const buildControllers = (props)=>{
    return (
        <div className = {classes.BuildControlls}>
            <p>Current Price: {props.totalPrice.toFixed(2)}</p>
            {controlls.map( (ctrls)=> <BuildControll
             label = {ctrls.lable}
             key = {ctrls.lable}
             removed = { ()=> props.ingredientRemoved(ctrls.type)}
             added = {()=>props.ingredientAdded(ctrls.type)}
             disabled = {props.disabled[ctrls.type]}>
             </BuildControll>)
            }
            <button 
            onClick = {props.purchase}
            className = {classes.OrderButton}
            disabled = {props.purchasable}>{props.isAuth ? 'ORDER NOW':'SIGN UP TO ORDER' }</button>
        </div>
    );
}

export default buildControllers;