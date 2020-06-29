import React, { Component } from 'react'
import PropTypes from 'prop-types';
export default class Todoing extends Component {
    render() {
        var {todo} = this.props;
        return (
            <div style={{display:'inline'}}> 
                {
                    todo.map((item,idx)=>
                    <p style={{float:'right',width:'80%',display:'inline'}} key={idx}>
                        <img src="./img/a.jpg" style={{display:'inline-block',width:33,height:33,float:'right',borderRadius:'10px',marginTop:5}}/>
                        <span style={{float:'right',width:'fixContent',border:'0.5px solid #8794a8',
                        borderRadius:'10px',marginRight:'5px',marginTop:'10px',padding:'3px 3px 3px 3px'}}>{item}</span>
                    </p>)
                }
            </div>
        )
    }
}

Todoing.propTypes = {
    todo:PropTypes.string,
    del:PropTypes.func
}

Todoing.defaultProps = {
    todo:[1,2,3,4]
}