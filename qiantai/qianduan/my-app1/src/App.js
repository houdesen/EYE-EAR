import React from 'react';
import {HashRouter  as Router,withRouter,Route,Link,Switch,Redirect} from 'react-router-dom';

import Apphome from './LT/Apphome';
import Login from './LT/Login';
import qq_login from './LT/qq_login';
import Register from './LT/Register';
import Find from './LT/Find';
import Greeting from './LT/Greeting';
import One from './LT/One';
import cart from './LT/Shoptab/Cart';

export default class App extends React.Component {
 

  render() {
    return (
    <Router>
      <div>
        {/* <One/> */}
        <Route exact path='/' component={One}/> 
        <Route path='/greeting' component={Greeting}/> 
        <Route path='/register' component={Register}/> 
        <Route path='/login' component={Login}/> 
        <Route path='/qq_login' component={qq_login}/> 
        <Route path='/find' component={Find}/> 
        <Route path='/apphome' component={Apphome}/> 
        <Route path='/apphome/shoptab/cart' component={cart}/> 
        {/* <Route path='/home' component={Home}/>
        <Route path='/search' component={Search}/>       
        <Route path='/member' component={Member}/>
        <Route path='/Vip' component={Vip}/>
        <Route path='/chat' component={Chat}/>
        <Route path='/dynamic' component={Dynamic}/> */}
      
      </div>
    </Router>

    );
  }
}