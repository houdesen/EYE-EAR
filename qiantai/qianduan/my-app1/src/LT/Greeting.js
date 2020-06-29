import React, { Component } from 'react';
import { Carousel} from 'antd-mobile';
import {HashRouter  as Router,withRouter,Route,Link,Switch,Redirect} from 'react-router-dom';
import '../index.css'

const data = [
    {img:'/img/6.jpg',title:'音乐会',context1:'谱写乐曲的是人类的心，',context2:'而音乐展现的是人类心的世界。'},
    {img:'/img/7.jpg',title:'话剧',context1:'话剧是艺术，是舶来品，',context2:'而不仅仅是对话剧的戏剧。'},
    {img:'/img/8.jpg',title:'画展',context1:'人生如画，画如人生。',context2:'领略画卷之美，感悟意境之美。'},
    {img:'/img/9.jpg',title:'国粹',context1:'京剧艺术博大精深，文戏武戏各美其美。',context2:''},
]

export default class Greeting extends Component {
    render() {
        return (
            // <div style={{position: 'absolute',width:'100%',height:'100%',backgroundColor:'#091e2e'}}>
            <div style={{position: 'absolute',width:'100%',height:'100%',backgroundColor:'#0e0e0c'}}>
                <Carousel
                    style={{position:'fixed',top:'20%',height:'60%'}}
                    autoplay={true}
                    dotStyle={{width:6,height:6,borderRadius:3,border:'1px solid #444',backgroundColor:'#091e2e',display:'block',marginLeft:10}}
                    dotActiveStyle={{width:6,height:6,borderRadius:3,border:'1px solid #444',backgroundColor:'#444',display:'block',marginLeft:10}}
                    >
                    {data.map(val => (
                        <div style={{textAlign:'center'}}>
                            <div style={{
                                width:150,
                                height:150,
                                borderRadius:75,
                                backgroundImage:'url('+(val.img)+')',
                                backgroundSize:200,
                                margin:'0 auto'
                            }}></div>
                            <h3 style={{color:'#fff',fontSize:20,marginTop:30,marginLeft:-10,marginBottom:0}}>{val.title}</h3>
                            <p style={{color:'#7a858e',fontSize:12,margin:'0px'}}>{val.context1}</p>
                            <p style={{color:'#7a858e',fontSize:12,margin:'0px'}}>{val.context2}</p>
                        </div>
                    ))}
                </Carousel>
                <Link to='/login'>
                <button 
                    style={{
                    width:'50%',
                    height:50,
                    zIndex:5,
                    backgroundColor:"white",
                    position: 'fixed', 
                    top:'85%',
                    bottom: '5%',
                    left:'25%',
                    right:'25%',
                    margin:'0 auto',
                    border:'0',
                    borderRadius:25,
                    color:"black",
                    fontSize:'20px',
                    opacity:0.5}}
                    onClick={this.changeUrl}
                    >
                        跳过
                </button>
                </Link>
            </div>
        )
    }
}
