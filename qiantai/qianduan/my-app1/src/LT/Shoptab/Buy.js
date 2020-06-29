import React, { Component } from 'react'
import { List, InputItem, TextareaItem, Grid,NavBar,Toast } from 'antd-mobile';
import { HashRouter as Router, withRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

export default class buy extends Component {
    constructor(props){
        super(props);
        this.state={
            list:[]
        }
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
    }
    componentDidUpdate() {
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
    }
    render() {
        // 支付页面
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
                        <p style={{width:'100%',height:30,fontSize:18,textAlign:'center',marginTop:50}}>
                            <Link to='/apphome/shoptab/pay'><button style={{color:'white',backgroundColor:'#4296c2',width:'60%',height:50,padding:0,borderRadius:8}}>密码验证</button></Link>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
