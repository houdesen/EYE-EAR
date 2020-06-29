import React, { Component } from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import { Accordion, List } from 'antd-mobile';
import { Grid } from 'antd-mobile';
import { Tabs, WhiteSpace, Badge,ImagePicker } from 'antd-mobile';
import {HashRouter  as Router,withRouter,Route,Link,Switch,Redirect} from 'react-router-dom';
import music from '../Taylor/Taylor Swift - Clean.mp3';

const data = Array.from(new Array(17)).map((_val, i) => ({
  icon: './img/夜晚.png',
  text: `name${i}`,
}));

const tabs = [
    { title: <i className='iconfont icon-lianjie' 
    style={{fontSize:30,color:'black',height:30,width:30,marginBottom:5,float:'left'}} ></i> },
    { title: <i className='iconfont icon-chaohua' 
    style={{fontSize:30,color:'black',height:30,width:30,marginBottom:5,float:'left'}} ></i> },
    { title: <i className='iconfont icon-biaoqing' 
    style={{fontSize:30,color:'black',height:30,width:30,marginBottom:5,float:'left'}} ></i> },
    { title: <i className='iconfont icon-gengduo' 
    style={{fontSize:30,color:'black',height:30,width:30,marginBottom:5,float:'left'}} ></i> }
  ];
  let musicName ='';
  let name='';
  var b;
export default class Dynamic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      content:'',
      data:[],
      user_id:''
      
    };
    
    this.time='';
    this.length=0;
      this.img0=''
      this.img1=''
      this.img2=''
      this.img3=''
      this.img4=''
      this.img5=''
      this.name0='0.png'
      this.name1='0.png'
      this.name2='0.png'
      this.name3='0.png'
      this.name4='0.png'
      this.name5='0.png'
  }
  getFileURL(file) {
    var getUrl = null;
    if (window.createObjectURL !== undefined) { // basic
      getUrl = window.createObjectURL(file);
    } else if (window.URL !== undefined) { // mozilla(firefox)
      getUrl = window.URL.createObjectURL(file);
    } else if (window.webkitURL !== undefined) { // webkit or chrome
      getUrl = window.webkitURL.createObjectURL(file);
    }
    return getUrl;
  }
  handleFile (event){
    let audio=document.getElementById('audio');
    let load=document.getElementById('load');
    console.log(audio)
    console.log(audio.src)
     const files = [...event.target.files];
    if (files.length === 0) return;
    console.log(files)  
    console.log(files.src);
    
    for(let i=0;i<files.length;i++) {
      console.log(files[i])
      console.log(files[i].name)
      musicName = files[i];
      name=musicName.name;
    }
    var reader = new FileReader();
    reader.readAsDataURL(musicName);
    reader.onprogress=function(){
      load.style.display='block';
    }
    reader.onload=function(){
      // console.log(audio.src);
      console.log(name);
      // console.log(reader.result);
      // dataURL2Audio()
      b=require('../Taylor/'+name);
      audio.src=b;
      console.log(b);
      console.log(audio.src);
    }
  }
    onChange = (key) => {
        console.log(key);
      }
      componentDidMount() {
        //this.autoFocusInst.focus();
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
      onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
          files,
        });
      }
      handleClick = () => {
        this.inputRef.focus();
      }
      change = (e) => {
        this.setState({
          content: e.target.value
        })
      }
      click = () => {
        var timeStr = '-';
        var curDate = new Date();
        var curYear =curDate.getFullYear();  //获取完整的年份(4位,1970-????)
        var curMonth = curDate.getMonth()+1;  //获取当前月份(0-11,0代表1月)
        var curDay = curDate.getDate();       //获取当前日(1-31)
        var curHour = curDate.getHours();      //获取当前小时数(0-23)
        var curMinute = curDate.getMinutes();   // 获取当前分钟数(0-59)
        var curSecond = curDate.getSeconds(); 
        this.time= curYear+'年'+curMonth+'月'+curDay+'日'+curHour+'时'+curMinute+'分'+curSecond+'秒';
console.log(name);
  
        var files = this.state.files;

      this.length=files.length
      for(var i = 0; i < 6; i++) {
        if(i<files.length){
          if(i==0){
            // if(files[i].url!=''){
                this.img0=files[i].url;
                this.name0=files[i].file.name   
                        
            // }           
          }
          if(i==1){
            // if(files[i].url!=''){
              this.img1=files[i].url;
              this.name1=files[i].file.name           
          }   
          if(i==2){
            // if(files[i].url!=''){
                this.img2=files[i].url;
                this.name2=files[i].file.name             
            // }           
          }
          if(i==3){
            // if(files[i].url!=''){
                this.img3=files[i].url;
                this.name3=files[i].file.name             
            // }           
          }
          if(i==4){
            // if(files[i].url!=''){
                this.img4=files[i].url;
                this.name4=files[i].file.name             
            // }           
          }
          if(i==5){
            // if(files[i].url!=''){
                this.img5=files[i].url;
                this.name5=files[i].file.name             
            // }           
          }   

        }else{    
          if(i==0){
            this.img0='0.png'         
          }
          if(i==1){
            this.img1='0.png'           
          }   
          if(i==2){
            this.img2='0.png'         
          }
          if(i==3){
            this.img3='0.png' 
          }
          if(i==4){
            this.img4='0.png'        
          }
          if(i==5){
            this.img5='0.png'         
          }         
                     
      } 
    }
   
        fetch('http://localhost:5000/dynamic',{
            method:'POST',
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify({
              user_id:this.state.data.user_id,
              time:this.time,
              content:this.state.content, 
              img0:this.img0,
              img1:this.img1,
              img2:this.img2,
              img3:this.img3,
              img4:this.img4,
              img5:this.img5,
              name0:this.name0,
              name1:this.name1,
              name2:this.name2,
              name3:this.name3,
              name4:this.name4,
              name5:this.name5,
              length:this.length,
              audio:name
            })})
          .then(res=>res.json())
          .then(res=>{
            
            // this.setState({
            //     data1:res
            // })
          } 
        )
      }
    render() {
      const{files}=this.state; 
        return (
            <div style={{width: '100%',height:'108%',backgroundColor: '#fff',zIndex:999,position:'absolute',overflow:'auto'}}>
                <div style={{background:"#8794a8",width:'100%',height:"40px"}}>
                    <Link to='/apphome' style={{color:'black'}}><i className='iconfont icon-web-icon-' 
                        style={{fontSize:30,color:'black',height:35,width:35,marginBottom:5,float:'left'}} ></i></Link>
                    <Link to='/apphome' style={{color:'black'}}>
                      <button onClick={this.click} style={{float:'right',background:'#8794a8',
                      fontSize:18,marginTop:8,marginRight:10,border:'none',textAlign:'center'}}>发布</button>
                    </Link>
                </div>   
                <div style={{width:"100%",height:""}}>               
                  <textarea style={{width:"100%",border:'none',rows:"10"}} 
                  type="text" placeholder="说点什么吧..." onChange={this.change} name='content'  value={this.state.content}>
                  
                  </textarea>
                  {/* <ImagePicker
                      onChange={this.onChange}
                      onImageClick={(index, fs) => console.log(index, fs)} 
                      style={{marginTop:"200px"}}
                      accept="image/gif,image/jpeg,image/jpg,image/png"
                      /> */}
                  <ImagePicker
                    files={files}
                    onChange={this.onChange}
                    selectable={files.length < 6}
                    multiple
                    accept="image/gif,image/jpeg,image/jpg,image/png"
                  />  
                  <div id='load' style={{display:'none'}}>
                    <audio src={music} id='audio' loop="loop" controls >
                  　　<track kind="captions" />
                  　　您的浏览器不支持 audio 元素。
                   </audio>
                  </div>
                  {/* <Input id='MusicFile' type="file" name="file" title='选择音乐' onChange={this.handleFile} /> */}
                  <div class="upload-wrap anticon" nv-file-drop="" uploader="uploader">
                      <input class="file-ele" type="file" file-model="image" name="image" 
                        nv-file-select uploader="uploader" multiple  
                        id='MusicFile' type="file" name="file" title='选择音乐'
                        onChange={this.handleFile} />
                      <div class="file-open"><em class="icon icon-upload"></em>&nbsp;添加音乐</div>    
                  </div>  
                        <Tabs tabs={tabs}
                            initialPage={1}
                            onChange={(tab, index) => { console.log('onChange', index, tab); }}
                            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                            style={{height:"20%"}} 
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                            <a>选择添加链接</a>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                            <a>选择添加超话</a>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                            <a>点击获取更多表情</a>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                            <a>点击更多...</a>
                            </div>
                        </Tabs>
                </div>
            </div>
        )
    }
}
