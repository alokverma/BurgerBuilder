import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'
const navigationItems = (props)=>{
    return(
        
           <ul className = {classes.NavigationItems}>
               <NavigationItem link = "/" exact >BurgerBuilder</NavigationItem>
               {props.isAuthenticated ?
                  <NavigationItem link = "/orders"> Order</NavigationItem> : null}
               {!props.isAuthenticated ?
                <NavigationItem link = "/auth"> Authenticate</NavigationItem>
                : <NavigationItem link = "/logout"> Logout</NavigationItem>}
           </ul>
    )
}

export default navigationItems;