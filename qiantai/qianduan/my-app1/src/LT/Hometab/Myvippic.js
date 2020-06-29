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
    this.time='';
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
    console.log(this.state.user_id);
    res.json()
  })
  .then(res=>{
    console.log('1');
    window.alert('设置成功！');
  } 
  )
}
onChange = (files, type, index) => {
  console.log(files, type, index);
  this.setState({
    files,
  });
}
click = () => {
  var curDate = new Date();
  var curYear =curDate.getFullYear();  
  var curMonth = curDate.getMonth()+1;  
  var curDay = curDate.getDate();       
  var curHour = curDate.getHours();     
  var curMinute = curDate.getMinutes();   
  var curSecond = curDate.getSeconds(); 
  this.time= curYear+'年'+curMonth+'月'+curDay+'日'+curHour+'时'+curMinute+'分'+curSecond+'秒';

  var files = this.state.files;
  this.img0=files[0].url;
  this.name0=files[0].file.name   
  
  fetch('http://localhost:5000/apphome/hometab/myvippic',{
      method:'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify({
        user_id:this.state.data.user_id,
        img0:this.img0,
        name0:this.name0,
        time:this.time
      })})
    .then(res=>res.json())
    .then(res=>{
     console.log('修改成功！');
    } 
  )
  window.alert('修改成功')
}
  render() {
    const{files}=this.state; 
    return (
      <div style={{width: '100%',height:'108%',backgroundColor: '#fff',zIndex:999,position:'absolute',overflow:'auto'}}>
        <div style={{width:'100%',height:"40px",position:'relative',background:"#8794a8",marginBottom:20}}>
        <Link to='/apphome/hometab/dressup' style={{width:'100%',height:"40px",color:'black',background:"#8794a8"}}>
          <Icon style={{width:"10%",height:"40px",position:'absolute',left:0,top:0}} type="left" />
          <div style={{width:'100%',float:'right',textAlign:'center',fontSize:20,paddingTop:5}}> <span>从相册上传</span></div>
        </Link>
        </div>
        
        <div>
        
        <ImagePicker
            files={files}
            onChange={this.onChange}
            multiple
            accept="image/gif,image/jpeg,image/jpg,image/png"
        />  
         <button onClick={this.click} style={{float:'right',backgroundColor:'#8794a8',width:200,height:35,borderRadius:5,
          fontSize:18,marginTop:8,marginRight:80,border:'none',textAlign:'center'}}>上 传</button>
        </div>
       
      </div>
    )
  }
}
