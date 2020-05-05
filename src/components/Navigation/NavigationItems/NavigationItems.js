import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'
const navigationItems = (props)=>{
    return(
           <ul className = {classes.NavigationItems}>
               <NavigationItem link = "/" exact >BurgerBuilder</NavigationItem>
               <NavigationItem link = "/orders"> Order</NavigationItem>
           </ul>
    )
}

export default navigationItems;