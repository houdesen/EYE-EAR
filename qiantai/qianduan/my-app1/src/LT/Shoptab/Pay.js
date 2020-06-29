import React, { Component } from 'react'
import { List, InputItem, TextareaItem, Grid,NavBar,Toast } from 'antd-mobile';
import { HashRouter as Router, withRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import InputGroup from 'react-input-groups';
import 'react-input-groups/lib/css/styles.css';

export default class Pay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[]
        };
        this.getValue = this.getValue.bind(this)
    }
    getValue(value) {
        console.log(value)
    }
    componentDidMount() {
        fetch('http://localhost:5000/cartlist', {
            "method": "get",
        })
        .then(res => res.json())
        .then(res => {
            this.setState({
                list:res
            })
            console.log(this.state.list);
        })
        .then(res=>{
            // console.log(this.state.list)
        })    
    }
    getConnect = () => {  //api请求函数
        fetch('http://localhost:5000/apphome/shoptab/pay',{
          method:'POST', 
          headers: {'Content-Type': 'application/json; charset=utf-8'},
          body: JSON.stringify({
            // gstate:this.state.list
          })})
        .then(res=>{
        //   console.log('22')
          res.json()
        })
        .then(res=>{
        //   console.log('1');
          // if(res.state) {
            window.alert('支付成功！');      
        } 
        )
    }

    render() {
        return (
            <div style={{width: '100%',height:'108%',backgroundColor: '#fff',zIndex:999,position:'absolute'}}>
                <NavBar mode="light" style={{ background: '#8794a8', color: 'black' }}
                    leftContent={[
                        <Link to='/apphome/shoptab/cart' style={{ color: 'black' }}><i style={{ fontSize: 22, lineHeight: '22px', marginLeft: '-10px' }} className='iconfont icon-fanhui'></i></Link>,
                    ]}
                >支付页面</NavBar>
                <div style={{backgroundColor:'#eee',width:'100%',height:'100%',paddingTop:50}}>
                    <div style={{backgroundColor:'#fff',width:'90%',height:400,margin:'0 auto',fontSize:20,paddingTop:30,paddingLeft:20,paddingRight:20}}>
                        {this.state.list.map((item, index) =>
                            {
                                if(item.gstate=='支付中'){
                                    return(
                                        <p style={{textAlign:'center',paddingBottom:45}}><span style={{fontSize:30}}>{item.gPrice2}</span></p>
                                    )
                                }
                            }
                        )}
                        <p style={{width:'100%',height:30,marginBottom:5}}>
                            <span style={{fontSize:20,float:'left',color:'gray'}}>订单信息</span>
                            <span style={{fontSize:20,float:'right',color:'black'}}>转账</span>
                        </p>
                        <hr/>
                        <p style={{width:'100%',height:30,paddingTop:15,paddingBottom:10}}>
                            <span style={{fontSize:20,float:'left',color:'gray'}}>付款方式</span>
                            <span style={{fontSize:20,float:'right',color:'black'}}>余额宝</span>
                        </p>
                        <hr/>
                        <p style={{width:'100%',height:50,marginTop:30}}>
                        <InputGroup
                            getValue={this.getValue}
                            length={6}
                            type={'box'}
                        />
                        </p>
                        <p style={{width:'100%',height:30,fontSize:18,textAlign:'center',marginTop:20}}>
                            <Link to='/apphome/shoptab/cart'><button onClick={this.getConnect} style={{color:'white',backgroundColor:'#4296c2',width:'60%',height:50,padding:0,borderRadius:8}}>立即付款</button></Link>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
