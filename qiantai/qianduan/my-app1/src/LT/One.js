

import React from 'react';
import Greeting from './Greeting';
import {HashRouter  as Router,withRouter,Route,Link,Switch,Redirect} from 'react-router-dom';

export default class One extends React.Component {
  
  render() {
      return (
        
        <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
          <img style={{overflow:"hidden"}} src="img/10.jpg"/>
          <Link to='/greeting'>
          <button 
            style={{
              width:'70%',
              height:80,
              zIndex:5,
              backgroundColor:"white",
              position: 'fixed', 
              bottom: '10%',
              left:'15%',
              right:'15%',
              border:'0',
              borderRadius:25,
              color:"black",
              fontSize:'30px',
              opacity:0.5}}
              onClick={this.changeUrl}
              >
                EYE&EAR
          </button>
          </Link>
        </div>
        
      );
    }
}