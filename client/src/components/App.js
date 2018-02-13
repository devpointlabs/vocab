import React, { Component } from 'react';
import NoMatch from './NoMatch';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import Flash from './Flash';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';
import AuthRoute from './AuthRoute';
import FetchUser from './FetchUser';
import { Switch, Route } from 'react-router-dom';
import '../App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Flash />
        <FetchUser>
          <div className='wrapper'> 
          <Switch>
            <ProtectedRoute exact path='/' component={Home} />
            <AuthRoute exact path='/login' component={Login} />
            <AuthRoute exact path='/register' component={Register} />
            <Route component={NoMatch} />
          </Switch>
        </div>
        </FetchUser>
        <Footer />
      </div>
    );
  }
}



export default App;
