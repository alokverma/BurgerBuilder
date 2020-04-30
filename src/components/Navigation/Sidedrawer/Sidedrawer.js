import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'

const sideDrawer = (propps) => (
    <div className = {classes.SideDrawer}>
        <Logo/>
        <nav>
          <NavigationItems/>
        </nav>
    
    </div>
)

export default sideDrawer;