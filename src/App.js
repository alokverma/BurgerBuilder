import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { Route ,Switch, Redirect,withRouter} from 'react-router-dom';
import Burgerbuilder from './containers/Burgerbuilder/Burgerbuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import { connect } from 'react-redux';
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'
class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }
  render() {
    let routes = (
            <Switch>
              <Route path = "/auth" component = {Auth}></Route>
              <Route path = "/" exact component = {Burgerbuilder}></Route>
              <Redirect to = "/"></Redirect>
            </Switch>
    );
    if(this.props.isAuthenticate){
      routes =  (<Switch>
                <Route path = "/checkout" component = {Checkout}></Route>
                <Route path = "/orders" component = {Orders}></Route>
                <Route path = "/logout" component = {Logout}></Route>
                <Route path = "/auth" component = {Auth}></Route>
                <Route path = "/" exact component = {Burgerbuilder}></Route>
                <Redirect to = "/"></Redirect>
                
              </Switch>)
    }
    return (
      <Layout>
          {routes}
        </Layout>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    isAuthenticate: state.authReducer.token !==null
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSignUp : ()=>dispatch(actions.checkAuthStatus())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
