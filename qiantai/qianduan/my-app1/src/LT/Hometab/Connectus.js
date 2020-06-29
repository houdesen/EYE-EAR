import React, { Component } from 'react'
import '../../index_fxy.css';
import { Icon, Grid } from 'antd-mobile';
import {HashRouter  as Router,withRouter,Route,Link,Switch,Redirect} from 'react-router-dom';

export default class Connectus extends Component {
    render() {
        return (
            <div style={{width: '100%',height:'108%',backgroundColor: '#fff',zIndex:999,position:'absolute'}}>
                <div style={{width:'100%',height:'55px',background:'#8794a8',position:'relative'}}>
                    <Link to='/apphome' style={{color:'#e1e5df',background:"#8794a8"}}>
                        <Icon style={{width:"40px",height:"40px",marginTop:'10px',color:'#e1e5df'}} type="left" />
                    </Link>
                    <span style={{color:'#e1e5df',fontSize:'25px',marginLeft:'90px',position:'absolute',bottom:'7px'}}>联系我们</span>
                </div>
                <div style={{width:'320px',height:'250px',margin:'0 auto',background:'white',marginTop:'40px',borderRadius:'15px'}}>
                    <p style={{textAlign:'center',fontSize:'20px',color:'#939593',paddingTop:'20px'}}>服 务 热 线</p>
                    <p style={{textAlign:'center',fontSize:'15px'}}>
                        注册咨询/软件使用使用咨询等问题处理
                    </p>
                    <p style={{textAlign:'center',fontSize:'15px'}}>
                        +86 1342567890
                    </p>
                    <input type='button' value='立即拨打' style={{width:'200px',height:'50px',position:'absolute',left:'90px',marginTop:'20px'}}/>
                </div>
                <div style={{width:'320px',height:'250px',margin:'0 auto',background:'white',marginTop:'40px',borderRadius:'15px'}}>
                    <p style={{textAlign:'center',fontSize:'20px',color:'#939593',paddingTop:'20px'}}>我们的邮箱</p>
                    <p style={{textAlign:'center',fontSize:'15px',paddingLeft:'10px',paddingRight:'10px'}}>
                        补充资料、投诉与建议、变更账户信息、争议处理问题等问题处理
                    </p>
                    <p style={{textAlign:'center',fontSize:'15px'}}>
                        1234567@234.com
                    </p>
                    <input type='button' value='立即拨打' style={{width:'200px',height:'50px',position:'absolute',left:'90px',marginTop:'20px'}}/>
                </div>

            </div>
        )
    }
}
