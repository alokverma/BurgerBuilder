import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import clasess from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/Sidedrawer/Sidedrawer'

class Layout extends Component {

    state = {
        showSideDrawer:false
    }

    sideDrawerClosedHandler= ()=>{
        this.setState({showSideDrawer:false})
    }
   
    render(){
        return (
            <Aux>
                <Toolbar/>
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