import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { Route ,Switch} from 'react-router-dom';
import Burgerbuilder from './containers/Burgerbuilder/Burgerbuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders'

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path = "/checkout" component = {Checkout}></Route>
          <Route path = "/orders" component = {Orders}></Route>
          <Route path = "/" exact component = {Burgerbuilder}></Route>
        </Switch>
        </Layout>
    );
  }
}

export default App;
