import React, { Component } from 'react';
import {connect} from 'react-redux';
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
                <Toolbar 
                isAuth = {this.props.isAuthenitacted}
                drawerToggle = {this.sideDrawerClosedHandler}/>
                <SideDrawer
                isAuth = {this.props.isAuthenitacted}
                 open = {this.state.showSideDrawer}
                 closed = {this.sideDrawerClosedHandler}/>
                <main className = {clasess.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    };
    
}

const mapStateToProps = state =>{
    return{
        isAuthenitacted: state.authReducer.token !==null
    }
}

export default connect(mapStateToProps)(Layout);