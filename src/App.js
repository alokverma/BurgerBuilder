import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Burgerbuilder from './containers/Burgerbuilder/Burgerbuilder';

class App extends Component {
  render() {
    return (
      <Layout>
         <Burgerbuilder/>
      </Layout>
    );
  }
}

export default App;
