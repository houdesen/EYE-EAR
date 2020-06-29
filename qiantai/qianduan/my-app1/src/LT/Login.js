import React from 'react';
import { Flex, WhiteSpace } from 'antd-mobile';
import { Link } from 'react-router-dom'
import './indexldq.css'
const axios = require('axios');
const querystring = require('querystring');
// let path = '/login';
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: '',
      pwd: ''
    }
  }
  change1 = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  change2 = (e) => {
    this.setState({
      pwd: e.target.value
    })
  }
  getConnect = () => {  //api请求函数
    // let data={
    //   username: this.state.name,
    //   password: this.state.pwd
    // };
    // data = querystring.stringify(data);
    // data=JSON.stringify(data)
    // axios.post('http://localhost:5000/login',data,{
    //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    // }).then(function (res) {
    //     console.log('成功')
    //     console.log(res);//处理成功的函数 相当于success
    //     this.setState({
    //       data: res[0]
    //     })
    //     console.log( window.location.hash)

    //     // window.location.hash='#/apphome'
    //     that.props.history.push('/apphome')
    //     // console.log( window.location.hash)
    //   }).catch(function (error) {
    //     console.log('失败')
    //     // console.log(error)//错误处理 相当于error
    //     // window.alert('验证失败，用户名或密码错误');
    //   })
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        username: this.state.name,
        password: this.state.pwd
      })
    })
      .then(res => res.json())
      .then(res => {
        if (!res[0]) {
          window.alert('验证失败，用户名或密码错误');
        }
        else {
          this.setState({
            data: res[0]
          })
          this.props.history.push('/apphome');
          // window.location.reload(); 
        }
      }
      )
  }
  login = () => {
    // var A=window.open("/#/qq_login","_self - URL","width=450,height=320,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=0");
  }

  render() {
    return (
      <div style={{ width: '100%', textAlign: 'center', background: '#fff' }}>
        <p style={{ display: "inline-block", width: "100%", height: 50, paddingTop: '10px', color: "white", fontSize: 20, background: 'rgb(149, 170, 184)' }}>登录</p>
        <WhiteSpace />
        <Flex align="start">
          <div className='placeholder'>
            <div className='img'>
              <img src='./images/register.png' style={{ width: '60px', height: '65px' }} />
            </div>
            <form className='form'>
              <input name='username' placeholder='username' value={this.state.name} onChange={this.change1} />
              <p></p>
              <input type="password" placeholder='密码' name="password" id="" value={this.state.pwd} onChange={this.change2} />
              <br />
              <span><Link to='/find'>忘记密码？</Link></span>
              <br />
              <input value='登录 ' className='button' type='button' onClick={this.getConnect} style={{ background: '#8693a6', color: '#fff', textAlign: 'center', borderRadius: '15px', width: '75%' }} />
            </form>
          </div>
        </Flex>
        <p><Link style={{ color: '#bbb' }} to='/register'>新用户？点击这里注册</Link></p>
        <ul>
          <li>
            <a target="_blank" href="https://graph.qq.com/oauth2.0/authorize?client_id=1110486936&redirect_uri=http://127.0.0.1:3000/#/apphome&response_type=code&state=1&scope=get_user_info,list_album,upload_pic,do_like">
              <img src='./images/qq.png' style={{ width: '40px', height: '40px' }} />
            </a>
          </li>
          <li>
            <img src='./images/wechat.png' style={{ width: '40px', height: '40px' }} />
          </li>
          <li>
            <a target="_blank" href="https://api.weibo.com/oauth2/authorize?client_id=app_key&response_type=code&redirect_uri=http://127.0.0.1:8000/process">
              <img src='./images/weibo.png' style={{ width: '40px', height: '40px' }} />
            </a>
          </li><li></li>
        </ul>

        <WhiteSpace />
      </div>
    );
  }
}