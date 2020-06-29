import React, { Component } from 'react'
import { Icon, Grid,ImagePicker } from 'antd-mobile';
import {HashRouter  as Router,withRouter,Route,Link,Switch,Redirect} from 'react-router-dom';

class ClockIn extends React.Component {
  state = {
    weather: null,
    data:[],
    content:'立即打卡'
  }
  // componentDidMount (nextProps) {
  //   // if (this.props != nextProps){
  //   console.log(1);
  //   fetch('http://localhost:5000/login', {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json; charset=utf-8' },
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       this.setState({
  //         data: res[0]
  //       })
  //       console.log(this.state.data.place);
  //     }
  //   )
  //   console.log('延迟执行外部：'+this.state.data.place);
  //   // }
  // }
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
        // console.log(res[0])
    } 
    )
}
  componentDidUpdate(){
    // console.log(this.state.data.place);
    fetch(`http://api.help.bj.cn/apis/weather36h/?id=`+this.state.data.place)
    .then(res => {
      res.json().
      then(resJson => {
        this.setState({
          weather: resJson
        })
        // console.log(this.state.weather);
      })
    })
    fetch('http://localhost:5000/login',{
      method:'GET', 
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      })
      .then(res=>res.json())
      .then(res=>{
          this.setState({
              data:res[0]
          })
          // console.log(res[0])
      } 
      )
  }

  add = () => {  //api请求函数
    console.log(this.state.data.integral);
    console.log(this.state.data.clockIn);
      fetch('http://localhost:5000/apphome/hometab/clockIn',{
        method:'POST', 
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: JSON.stringify({
          clockIn:this.state.data.clockIn+1,
          user_id:this.state.data.user_id,
          integral:this.state.data.integral+1,
          content:'打卡成功'
        })})
      .then(res=>{
        this.setState({
          content:'打卡成功'
        })
        res.json()
      })
      console.log(this.state.data.clockIn);
      console.log(this.state.data.integral);
  }

  render () {
    const {  weather } = this.state
    return (
      // backgroundImage: `url(${require("../../images/clockInbg.jpg")})`,
      <div style={{width: '100%',height:'108%',backgroundColor: '#fff',zIndex:999,position:'absolute',overflow:'auto'}}>
        <div style={{width:'100%',height:"40px",position:'relative',background:"#8794a8",marginBottom:20}}>
        <Link to='/apphome/hometab/vip' style={{width:'100%',height:"40px",color:'black',background:"#8794a8"}}>
          <Icon style={{width:"10%",height:"40px",position:'absolute',left:0,top:0}} type="left" />
          <div style={{width:'100%',float:'right',textAlign:'center',fontSize:20,paddingTop:5}}> <span>日签卡</span></div>
        </Link>
        </div>
        <div style={{width:'85%',height:'80%',margin:'auto',backgroundColor:'#47bbf8',padding:8,borderRadius:15}}>
          { this.state.weather ?
            <div>
              <p style={{fontSize:18,color:'white'}}>{ weather.dateweek }</p>
              <p style={{fontSize:15,color:'white'}}>
                <span style={{fontSize:18,color:'white',marginRight:8}}>{ weather.city }</span>
              </p>
              <p style={{fontSize:15,color:'white'}}>
                <span style={{fontSize:16,color:'white',marginRight:10}}>{ weather.weather36h[0].weather }</span>
                <span>{ weather.weather36h[0].temp }℃</span>
              </p>
              <p style={{fontSize:15,color:'white'}}><span style={{fontSize:18}}>宜</span> 犒赏自己</p>
              <img style={{width:210,height:250,position:'absolute',right:30,top:150,opacity:0.9,borderRadius:20}} src={'./images/weather.png'}/>
            </div>
            : <p>暂无数据</p>
          }
          <div style={{position:'absolute',top:450,width:'80%'}}>
            <p style={{fontSize:25,color:'white',textAlign:'center'}}>已成功打卡{this.state.data.clockIn}天</p>
            <div onClick={this.add} style={{fontSize:18,color:'white',textAlign:'center',borderRadius:10,padding:10,backgroundColor:'#2789bd'}}>
              {this.state.data.content}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ClockIn