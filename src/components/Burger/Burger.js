import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props )=>{
     let tronsformIngredient = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_,index)=>{
                return <BurgerIngredient key={igKey+index} type = {igKey}/>
            })
        }).reduce((arr,el)=>{
            return arr.concat(el);  
        },[])
        ;
        if(tronsformIngredient.length === 0){
            tronsformIngredient = <p>Please add ingredients</p>
        }
    return(
        <div className = {classes.Burger}>
                <BurgerIngredient type = 'bread-top'/>
                {tronsformIngredient}
                <BurgerIngredient type = "bread-bottom"/>
        </div>
    )
}
export default burger;