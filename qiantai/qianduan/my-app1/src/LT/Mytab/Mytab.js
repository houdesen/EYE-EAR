import React, { Component } from 'react';
import {HashRouter  as Router,withRouter,Route,Link,Switch,Redirect} from 'react-router-dom';
import Community from './Community';
import Dynamic from './Dynamic';
import Chat1 from './Chat1';
export default class Mytab extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/apphome' component={Community}/> 
          <Route path='/apphome/mytab/dynamic' component={Dynamic}/> 
          {/* <Route path='/apphome/mytab/chat1' component={Chat1}/>  */}
          <Route path='/apphome/mytab/eyemychat/:id' component={Chat1}/>
          <Route path='/apphome/mytab/earmychat/:id' component={Chat1}/>
        </Switch>
      </div>
    );
  }
}
