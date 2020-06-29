import React, { Component } from 'react'
import '../../index_fxy.css';
import { Icon, Grid,ImagePicker } from 'antd-mobile';
import {HashRouter  as Router,withRouter,Route,Link,Switch,Redirect} from 'react-router-dom';
import { Z_BLOCK } from 'zlib';
import img from '../../images/2.jpeg';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files:[],
      data: [],
      name: '',
      age: '',
      sex: '',
      birth:'',
      star:'',
      job:'',
      hobby:'',
      place:'',
      sign:'',
      backgroundImage:''
    }
  }
  
  componentDidMount(){
    //api请求函数

  fetch('http://localhost:5000/login',{
    method:'GET', 
    headers: {'Content-Type': 'application/json; charset=utf-8'},
  })
  .then(res=>res.json())
  .then(res=>{
      this.setState({
        data:res[0]
      })
      console.log(this.state.data);
  } 
  )

}
change = (e) => {
  console.log(img);
  var img1=JSON.stringify(img);
  console.log(img1);
  img1=img1.substring(4);
  console.log(this.state.data.backgroundImage1)
  this.setState({
    backgroundImage: this.state.data.backgroundImage1
  })
}
getConnect = (e) => {  //api请求函数
  console.log(this.state.data.backgroundImage);
  console.log(this.state.data.backgroundImage1);
  fetch('http://localhost:5000/apphome/hometab/dressup',{
    method:'POST', 
    headers: {'Content-Type': 'application/json; charset=utf-8'},
    body: JSON.stringify({
      user_id:this.state.data.user_id,
      backgroundImage:e
    })})
  .then(res=>{
    console.log('1');
    window.alert('设置成功!');
  } 
  )
  window.alert('设置成功!');
}


  render() {
    const{files}=this.state; 
    return (
      <div style={{width: '100%',height:'108%',backgroundColor: '#fff',zIndex:999,position:'absolute',overflow:'auto'}}>
        <div style={{width:'100%',position:'relative',background:"#8794a8"}}>
        <Link to='/apphome/hometab/vip' style={{color:'black',background:"#8794a8"}}><Icon style={{width:"40px",height:"40px"}} type="left" /></Link>
        </div>
        <div>
        <Link to='/apphome/hometab/myvippic' style={{color:'black',background:"#8794a8"}}>
        <div style={{width:'100%',height:'35px',position:'relative',fontSize:'20px',
        marginTop:'10px',paddingLeft:'10px',color:'black',backgroundColor: '#ccc'}}>
          从相册选择
          <Icon style={{width:"40px",height:"40px",float:'right'}} type="right" />
         
        </div>
        </Link>
        {/* <div style={{width:'100%',height:'35px',position:'relative',fontSize:'20px',
        marginTop:'50px',paddingLeft:'10px',color:'black',backgroundColor: '#ccc'}}>
          拍一张
          <Icon style={{width:"40px",height:"40px",float:'right'}} type="right" />
        </div> */}
        </div>
        <div style={{width:'100%',height:'35px',fontSize:'20px',
        marginTop:'25px',paddingLeft:'10px',color:'black',backgroundColor: '#ccc'}}>
          推荐背景
          <div style={{width:'100%'}}>
            <div style={{width:'40%',height:'200px',marginTop:'20px',
            display:'inline-block',marginLeft:'10px',backgroundImage: 'url(' +'http://localhost:5000/img?imgname='+this.state.data.backgroundImage1 + ')'}} onClick={()=>this.getConnect(this.state.data.backgroundImage1)}>
            </div>
            <div style={{width:'40%',height:'200px',backgroundColor:'green',
            display:'inline-block',marginLeft:'20px',backgroundImage: 'url(' +'http://localhost:5000/img?imgname='+this.state.data.backgroundImage2 + ')'}} onClick={()=>this.getConnect(this.state.data.backgroundImage2)}></div>
          </div>
          <div style={{width:'100%'}}>
            <div style={{width:'40%',height:'200px',marginTop:'20px',
            display:'inline-block',marginLeft:'10px',backgroundImage: 'url('+'http://localhost:5000/img?imgname='+this.state.data.backgroundImage3 + ')'}} onClick={()=>this.getConnect(this.state.data.backgroundImage3)}>
            </div>
            <div style={{width:'40%',height:'200px',backgroundColor:'green',
            display:'inline-block',marginLeft:'20px',backgroundImage: 'url(' +'http://localhost:5000/img?imgname='+this.state.data.backgroundImage4 + ')'}} onClick={()=>this.getConnect(this.state.data.backgroundImage4)}></div>
          </div>
        </div>
      </div>
    )
  }
}
// +'http://localhost:5000/img?imgname='