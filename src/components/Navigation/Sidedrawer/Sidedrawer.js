import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxilary/Auxilary'

const sideDrawer = (props) => {
  let attachedClass = [classes.SideDrawer,classes.Close];
  if(props.open){
    attachedClass = [classes.SideDrawer,classes.Open];
  }
    return (
    <Aux>
      <Backdrop show = {props.open}
                clicked = {props.closed}/>
      <div
      onClick =  {props.closed}
       className = {attachedClass.join(' ')}>
        <div className = {classes.Logo}>
        <Logo/>
        </div>
          <nav>
            <NavigationItems
              isAuthenticated = {props.isAuth} />
          </nav>
      </div>
    </Aux>

    )
    }

export default sideDrawer;