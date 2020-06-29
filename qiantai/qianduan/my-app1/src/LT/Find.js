import React, { Component } from 'react'
import { Flex, WhiteSpace } from 'antd-mobile';
import { Link } from 'react-router-dom'
import { Icon } from 'antd-mobile';
import './Find.css'
export default class Find extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tel: '',
      verification: '',
      newPwd: '',
    }
    this.tip1 = false;
    this.tip2 = false;
    this.tip3 = false;
    this.tip = '';
  }
  change1 = (e) => {
    this.setState({
      tel: e.target.value
    })
  }
  blur1 = (e) => {
    var tipMobile = document.getElementsByClassName('tipMobile')[0];
    var con = e.target.value;
    var reg1 = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/g;
    if (!con.match(reg1) && con !== '') {
      // this.tip1 = false;
      tipMobile.innerHTML = '手机号码格式不正确';
      this.tip1 = true;
    } else if (con == '') {
      this.tip1 = false;
      tipMobile.innerHTML = '手机号不能为空';
    } else {
      this.tip1 = true;
      tipMobile.innerHTML = '';
      fetch('http://localhost:5000/users/tel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        tel: this.state.tel
      })
    })
      .then(res => res.json())
      .then(res => {
         if(res.result.length != 0){
           window.alert('手机号存在')
         }else{
           window.alert('手机号不存在')
         }
      })
    }
  }

  change2 = (e) => {
    this.setState({
      verification: e.target.value
    })
  }
  blur2 = (e) => {
    var tipVerification = document.getElementsByClassName('tipVerification')[0];
    console.log(this.state.verification,this.tip)
    if(this.state.verification == this.tip && this.state.verification!='' && this.tip!=''){
      this.tip2 = true;
      tipVerification.innerHTML = ''
    }else{
      this.tip2 = false;
      tipVerification.innerHTML = '验证码不正确'
    }
  }

  change3 = (e) => {
    this.setState({
      newPwd: e.target.value
    })
  }
  blur3 = (e) => {
    var con = e.target.value;
    var tipNewPwd = document.getElementsByClassName('tipNewPwd')[0];
    var reg1 = /^[0-9]*$/g;
    var reg2 = /[`~!@#$%^&*()\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/g;
    if((con.match(reg1) || con.match(reg2)) && con !== '') {
      this.tip3 = false;
      tipNewPwd.innerHTML = '仅支持字符和下划线且不为纯数字';
    } 
    else if(con == '') {
        this.tip3 = false;
        tipNewPwd.innerHTML = '密码不能为空';
    } else {
        var len = 0;  
        for (var i = 0; i < con.length; i++ ) {
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
            tipNewPwd.innerHTML = '最长14个英文或7个汉字';
        } else {
            this.tip3 = true;
            tipNewPwd.innerHTML = '';
        }
    }
  }
  getVerificationCode = () => {
    var ver = document.getElementsByTagName('input')[2]
    ver.value='正在发送';
    ver.style.backgroundColor = '#7e9cda'
    let Num = '';
    for (var i = 0; i < 6; i++) {
      Num += Math.floor(Math.random() * 10);
    }
    this.tip = Num;
    fetch("  http://106.ihuyi.com/webservice/sms.php?method=Submit&account=C70139448&password=1375d9594e41f1f891c262da5ab756d1&mobile="+this.state.tel+"&content=您的验证码是："+Num+"。请不要把验证码泄露给其他人。", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json; charset=utf-8'},
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        window.history.back(-1);
      })
  }
  getConnect = () => {  //api请求函数    
    var tipMobile = document.getElementsByClassName('tipMobile')[0];
    var tipVerification = document.getElementsByClassName('tipVerification')[0];
    var tipNewPwd = document.getElementsByClassName('tipNewPwd')[0];
    if (this.tip1 == true && this.tip2 == true && this.tip3 == true) {
      fetch('http://localhost:5000/users/find', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          tel: this.state.tel,
          password: this.state.newPwd
        })
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          
        })
    } else if (this.tip1 == false) {
      tipMobile.innerHTML = '手机号不能为空';
    } else if (this.tip2 == false) {
      tipVerification.innerHTML = '验证码不能为空';
    } else if (this.tip3 == false) {
      tipNewPwd.innerHTML = '密码不能为空';
    }
    alert("修改成功")
    window.history.back(-1);
  }
  up = () => {
  
  }
  render() {
    return (
      <div style={{ width: '100%', textAlign: 'center', background: '#fff' }}>
        <div style={{ width: '100%', height: '40px', background: 'rgb(149, 170, 184)' }}>
          <p style={{ position: 'absolute', left: 0 }}><Icon onClick={() => { this.props.history.go(-1) }} style={{ width: '30px', height: '30px', position: 'relative', top: '5px' }} type="left" /><span style={{ width: '60px', height: '40px', position: 'absolute', top: 10 }}>找回密码</span></p>
        </div>
        <WhiteSpace />
        <Flex align="start">
          <div className='find'>
            <form className='form'>
              <input onChange={this.change1} placeholder='输入手机号' name='tel' onBlur={this.blur1} value={this.state.tel} style={{display:'block',marginBottom:10,marginLeft:'12%'}}/>
              <p className='tip tipMobile'></p>
              <input style={{width:120,float:'left',marginLeft:30,marginBottom:10}} onChange={this.change2} placeholder='填写验证码' name='verification' onBlur={this.blur2} value={this.state.pwd} />
              <span><input onClick={this.getVerificationCode} style={{width:70,height:35,backgroundColor:'blue',marginRight:30,borderRadius: 15,color:'#fff',fontSize:8,paddingLeft:0}} value='获取验证码' type='button'/></span>
              <p style={{float:'left'}} className='tip tipVerification'></p>
              <input onChange={this.change3} type="password" placeholder='输入新密码' name="password" onBlur={this.blur3} value={this.state.newPwd} />
              <p className='tip tipNewPwd'></p>
              <input value='确定' className='button' type='button' name='button' onClick={this.getConnect} style={{ background: '#8693a6', color: '#fff', textAlign: 'center', borderRadius: '15px', width: '75%' }} />
            </form>
          </div>
        </Flex>
        <WhiteSpace />
      </div>
    )
  }
}
