import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { setBanks, setBranches } from '../actions';
import Home from '../containers/Home';
import Emplooyees from '../containers/Employees';

const App = (props) => {

  useEffect(() => {
    try {
      const fetchData = async () => {
        const responseBanks = await fetch('https://tryouts-cumplo.herokuapp.com/banks/');
        const dataBanks = await responseBanks.json();
        const responseBranches = await fetch('https://tryouts-cumplo.herokuapp.com/branches/');
        const dataBranches = await responseBranches.json();
        props.setBanks(dataBanks);
        props.setBranches(dataBranches.results);
      };

      fetchData();
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/empleados' component={Emplooyees} />
      </Switch>
    </BrowserRouter>
  );
};

const mapDispatchToProps = {
  setBanks,
  setBranches,
};
  
export default connect(null, mapDispatchToProps)(App);
