import React, { Component } from 'react';
// import { Switch } from 'antd-mobile';
import {HashRouter  as Router,withRouter,Route,Link,Switch,Redirect} from 'react-router-dom';
import Shop from './Shop';
import Shop_detail_one from './Shop_detail_one';
import Shop_detail_two from './Shop_detail_two';
import Shop_publish from './Shop_publish';
import Cart from './Cart';
import Buy from './Buy';
import Pay from './Pay';

export default class Shoptab extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/apphome' component={Shop}/> 
          <Route path='/apphome/shoptab/shop_detail_one/:id' component={Shop_detail_one}/> 
          <Route path='/apphome/shoptab/shop_detail_two/:id' component={Shop_detail_two}/> 
          <Route path='/apphome/shoptab/shop_publish' component={Shop_publish}/>
          <Route path='/apphome/shoptab/cart' component={Cart}/>
          <Route path='/apphome/shoptab/buy' component={Buy}/>
          <Route path='/apphome/shoptab/pay' component={Pay}/>
        </Switch>
      </div>
    );
  }
}
