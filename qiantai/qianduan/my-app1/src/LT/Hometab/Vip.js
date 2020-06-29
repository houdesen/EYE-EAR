import React, { Component } from 'react'
import './vip.css';
import { Icon } from 'antd-mobile';
import {HashRouter  as Router,withRouter,Route,Link,Switch,Redirect} from 'react-router-dom';
import { Grid,Steps,WhiteSpace,NavBar } from 'antd-mobile';
import Progress from './Progress';
const Step = Steps.Step;
const steps = [{
    title: '1级',
    description: '',
  }, {
    title: '2级',
    description: '',
  }, {
    title: '3级',
    description: '',
  }, {
    title: '..',
    description: '',
  }].map((s, i) => <Step key={i} title={s.title} description={s.description} />);
  
export default class VIP extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          data1:[
            {icon:'iconfont icon-chongzhi',tit:'个人定制',src:'/apphome/hometab/dressup'},
            {icon:'iconfont icon-wodehezi',tit:'动态置顶',src:'/apphome/hometab/sticky'},
            {icon:'iconfont icon-huiyuan-',tit:'会员打卡',src:'/apphome/hometab/clockIn'},
            {icon:'iconfont icon-yifu',tit:'外观',src:'/apphome/hometab/sticky'},
            {icon:'iconfont icon-huiyuan',tit:'会员福利',src:'/apphome/hometab/dressup'},
            {icon:'iconfont icon-zu',tit:'更多',src:'/apphome/hometab/sticky'},
          ],
        //   grade:2
        }
    }
    componentDidMount(){
        fetch('http://localhost:5000/login',{
        method:'GET', 
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        })
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                data:res[0]
            })
            console.log(res[0])
        } 
        )
    }

    render() {
        return (
            <div style={{width: '100%',height:'108%',backgroundColor: '#fff',zIndex:999,position:'absolute'}}>
                <NavBar mode="light" style={{ background: '#8794a8', color: 'black' }}
                    leftContent={[
                        <Link to='/apphome' style={{ color: 'black' }}><i style={{ fontSize: 22, lineHeight: '22px', marginLeft: '-10px' }} className='iconfont icon-fanhui'></i></Link>,
                    ]}
                    >会员中心</NavBar>
                <div className="Vheader">
                    <div className="Vmessage">
                        <img src={'http://localhost:5000/img?imgname=' + this.state.data.avatar} id="Vtou" style={{width:80,height:80}}></img>
                        <p id="Vname">{this.state.data.username}</p>
                        <p id="Vdevelop">成长值：{this.state.data.growth}</p>
                        <p id="Vgrade">积分：{this.state.data.integral}</p>
                    </div>
                </div>
                <div className="Vbody">
                    <div className="Vb1" style={{marginTop:'15px'}}><p>会员等级</p></div>
                    <div className="Vb2">
                        <WhiteSpace/>
                        {/* <Steps current={1} direction="horizontal" size="small">
                            {steps}
                        </Steps> */}
                        <Progress nums={Math.floor(this.state.data.integral/10)} index={Math.floor(this.state.data.integral/10)} progressColor='#dabb84' />
                        {/* <Progress nums={10} index={1} progressColor='#dabb84' /> */}
                        <WhiteSpace />
                    </div>
                </div>
                <div className="Vbottom">
                    <div className="Vb1"><p>会员特权</p></div>
                    <Grid data={this.state.data1}
                        columnNum={3}
                        renderItem={dataItem => (
                            <Link to={`${dataItem.src}`} style={{color:'black'}}>
                            <div id="homeimg">
                                <div style={{width:'100%',height:60}}>

                                {
                                    <i className={dataItem.icon} style={{fontSize:50,color:'black',height:60,width:80,textAlign:'center'}} ></i>
                                }
                                </div>
                                <div id="Vp">{dataItem.tit}</div>
                                {/* style={{fontSize:25,color:'black',height:80,width:80,paddingTop:1,float:'left'}} */}
                            </div>
                            </Link>
                        )}
                    />
                </div>
            </div>
        )
    }
}
