import React, { Component } from 'react'
import { Flex, WhiteSpace } from 'antd-mobile';
import {Link} from 'react-router-dom'
import './indexldq.css'
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: '',
      pwd: '',
      mobile: ''
    }
    this.tip1 = false;
    this.tip2 = false;
    this.tip3 = false;
  }
  change1 = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  blur1 = (e) => {
    var tipName = document.getElementsByClassName('tipName')[0];
    var con = e.target.value;
    var reg1 = /^[0-9]*$/g;
    var reg2 = /[`~!@#$%^&*()\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/g;
    if((con.match(reg1) || con.match(reg2)) && con !== '') {
      this.tip1 = false;
      tipName.innerHTML = '仅支持字符和下划线且不为纯数字';
    } else if(con == '') {
        this.tip1 = false;
        tipName.innerHTML = '';
    } else {
        var len = 0;  
        for (var i = 0; i < con.length; i++ ) {
            // 如果是中文，就+2；否则+1
            if (con[i].match(/^[\u4e00-\u9fa5]{0,}$/)) {
                len += 2;
            } else {
                len += 1;
            }
            if (len > 14) {
                break;
            }
        }
        if (len > 14) {
            this.tip1 = false;
            tipName.innerHTML = '最长14个英文或7个汉字';
        } else {
            this.tip1 = true;
            tipName.innerHTML = '';
        }
    }
  }
  change2 = (e) => {
    this.setState({
      pwd: e.target.value
    })
  }
  blur2 = (e) => {
    var tipMobile = document.getElementsByClassName('tipMobile')[0];
    var con = e.target.value;
    var reg1 = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/g;
    if(!con.match(reg1) && con !== '') {
        this.tip2 = false;
        tipMobile.innerHTML = '手机号码格式不正确';
    } else if(con == '') {
        this.tip2 = false;
        tipMobile.innerHTML = '';
    }else {
        this.tip2 = true;
        tipMobile.innerHTML = '';
    }
  }
  change3 = (e) => {
    this.setState({
      mobile: e.target.value
    })
  }
  blur3 = (e) => {
    var con = e.target.value;
    var tipPwd = document.getElementsByClassName('tipPwd')[0];
    var reg1 = /^[0-9]*$/g;
    var reg2 = /[`~!@#$%^&*()\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/g;
    if((con.match(reg1) || con.match(reg2)) && con !== '') {
      this.tip3 = false;
      tipPwd.innerHTML = '仅支持字符和下划线且不为纯数字';
    } 
    else if(con == '') {
        this.tip3 = false;
        tipPwd.innerHTML = '';
    } else {
        var len = 0;  
        for (var i = 0; i < con.length; i++ ) {
            // 如果是中文，就+2；否则+1
            if (con[i].match(/^[\u4e00-\u9fa5]{0,}$/)) {
                len += 2;
            } else {
                len += 1;
            }
            if (len > 14) {
                break;
            }
        }
        if (len > 14) {
            this.tip3 = false;
            tipPwd.innerHTML = '最长14个英文或7个汉字';
        } else {
            this.tip3 = true;
            tipPwd.innerHTML = '';
        }
    }
  }
  getConnect = () => {  //api请求函数    
    var tipName = document.getElementsByClassName('tipName')[0];
    var tipMobile = document.getElementsByClassName('tipMobile')[0];
    var tipPwd = document.getElementsByClassName('tipPwd')[0];
    if(this.tip1 == true && this.tip2 == true && this.tip3 == true) {
      alert("注册成功！")
      this.up();
    } else if(this.tip1 == false) {
        tipName.innerHTML = '用户名不能为空';
    } else if(this.tip2 == false) {
        tipMobile.innerHTML = '手机号码不能为空';
    } else if(this.tip3 == false) {
        tipPwd.innerHTML = '密码不能为空';
    }
  }
  up = () => {
    fetch('http://localhost:5000/register',{
      method:'POST', 
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify({
        username:this.state.name,
        password:this.state.pwd,
        mobile:this.state.mobile 
      })})
    .then(res=>res.json())
    .then(res=>{
      window.history.back(-1);       
    })
  }
  render() {
      return (
          <div style={{width:'100%',textAlign:'center',background:'#fff'}}>        
          <p style={{display:"inline-block",width:"100%",height:50,paddingTop:'10px',color:"white",fontSize:20,background:'rgb(149, 170, 184)'}}>注册</p>
          <WhiteSpace />
          <Flex align="start">
            <div className='placeholder'>
              <div className='img' style={{position:'relative'}}>
                  <img src='./images/register.png' style={{width:'60px',height:'65px'}}/>
                  <span style={{position:'absolute',right:'-8px',bottom:'-10px',color:'black',fontSize:'20px'}}>+</span>
              </div>
              <form className='form'>
                <input onChange={this.change1} placeholder='username' name='username' onBlur={this.blur1} value={this.state.name}/>
                <p className='tip tipName'></p>
                <input onChange={this.change3} placeholder='mobile' name='mobile' onBlur={this.blur2} value={this.state.mobile}/>
                <p className='tip tipMobile'></p>
                <input type="password" placeholder='密码' name="password" onBlur={this.blur3} value={this.state.pwd} onChange={this.change2} />
                <p className='tip tipPwd'></p>
                <input value='注册' className='button' type='button' name='button' onClick={this.getConnect} style={{ background: '#8693a6', color: '#fff' ,textAlign:'center',borderRadius: '15px',width:'75%'}}/>
              </form>
            </div>
          </Flex>
          <p><Link style={{color:'#bbb'}} to='/login'>已有账号了？点击登录</Link></p>
          <WhiteSpace />
        </div>
      )
  }
}
