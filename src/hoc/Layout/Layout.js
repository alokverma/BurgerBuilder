import React, { Component } from 'react';
import Aux from '../Auxilary/Auxilary';
import clasess from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/Sidedrawer/Sidedrawer'

class Layout extends Component {

    state = {
        showSideDrawer:false
    }

    sideDrawerClosedHandler= ()=>{
        const newStateForDrawer = this.state.showSideDrawer
        this.setState({showSideDrawer:!newStateForDrawer})
    }
   
    render(){
        return (
            <Aux>
                <Toolbar drawerToggle = {this.sideDrawerClosedHandler}/>
                <SideDrawer
                 open = {this.state.showSideDrawer}
                 closed = {this.sideDrawerClosedHandler}/>
                <main className = {clasess.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    };
    
}

export default Layout;