import React from 'react';
import { Flex, WhiteSpace } from 'antd-mobile';
import { Link } from 'react-router-dom'
import './indexldq.css'
const axios = require('axios');
const querystring = require('querystring');
// let path = '/login';
export default class Login extends React.Component {
componentDidMount(){
    fetch("https://account.xiaomi.com/oauth2/authorize",{
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
            client_id: 1110409449,
            redirect_uri: 'http://localhost:3000/#/apphome',
            response_type:'code'
        })
    })
    .then(res=>res.json())
    .then(res=>console.log(res))
}
  render() {
    return (
        <div>122</div>
    );
  }
}