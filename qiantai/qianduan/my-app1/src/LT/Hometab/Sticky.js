import React, { Component } from 'react'
import '../../index_fxy.css';
import { Icon, Grid } from 'antd-mobile';
import {HashRouter  as Router,withRouter,Route,Link,Switch,Redirect} from 'react-router-dom';
import { Z_BLOCK } from 'zlib';
import img from '../../images/1.jpeg';
const data = [
  { icon: 'images/5.png' },
  { icon: 'images/8.png' },
  { icon: 'images/9.png' }
];
export default class App extends Component {
  constructor() {
    super();
    this.state = {
        dataItem: [
            { img: './images/5.png', title: '毕加索画展的群' },
            { img: './images/10.png', title: '皮影展的群' },
            { img: './images/8.png', title: '毕加索画展的群' },
            { img: './images/9.png', title: '毕加索画展的群' },
        ],
        data: [],
        data1:[],
        name: [],

    }
}
componentDidMount() {

    fetch('http://localhost:5000/login',{
      method:'GET', 
      headers: {'Content-Type': 'application/json; charset=utf-8'},
    })
    .then(res=>res.json())
    .then(res=>{
        this.setState({
          data1:res[0]
        })
        console.log(this.state.data1.user_id);
    } 
    )
    fetch('http://localhost:5000/active', {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
            data: res

        })
      console.log(this.state.data);
      console.log(this.state.data[0].user_id);

    })
}
click = (e,i) => {
  console.log('check')
  console.log(i,this.state.data[0].time)
  fetch('http://localhost:5000/apphome/hometab/sticky',{
      method:'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify({
        id:e,
        time:i,
        time1:this.state.data[0].time,
        user_id:this.state.data.user_id,
        img0:this.img0,
        name0:this.name0,
        length:this.length
      })})
    .then(res=>{
      console.log(res);
      window.location.reload();
    })
}
  render() {
    return (
      <div style={{width: '100%',height:'108%',backgroundColor: '#fff',zIndex:999,position:'absolute',overflow:'auto'}}>
        <div style={{width:'100%',position:'relative',background:"#8794a8"}}>
        <Link to='/apphome/hometab/vip' style={{color:'black',background:"#8794a8"}}><Icon style={{width:"40px",height:"40px"}} type="left" /></Link>
        </div>
        <div style={{ borderTop: '1px solid #fff', height: '100%', backgroundColor: '#fff' }}>  
            <ul style={{ listStyle: 'none', margin: '0px auto',height:'150%' }}>
              {
                this.state.data.map((item, index) => {
                  if(this.state.data[index].user_id==1){
                    return(
                    <li style={{ height: '110px', width: '95%', margin: '0 auto', marginBottom: '10px', border: '1px solid #8794a8' }} key={index}>
                      <button onClick={()=>this.click(item.id,item.time)} style={{float:'right',backgroundColor:'#eee',width:50,padding:0,
                             fontSize:18,border:'none',textAlign:'center'}}>置顶</button>
                          <img style={{ width: '90px', height: '90px', float: 'left' }} src={'http://localhost:5000/img?imgname=' + item.img1} />
                          <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                            <p style={{ overflow: 'hidden', width: '150px', height: '40px' }}>{item.content}</p>
                            <p>{item.time}</p>
                          </div>
                        </li>
                    )
                  }
                })
              }
            </ul>
        </div>
      </div>
    )
  }
}
