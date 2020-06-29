import React, { Component } from 'react'
import { Tabs, Grid } from 'antd-mobile';
import { HashRouter as Router, withRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
const tabs = [
    { title: '树洞' },
    { title: '聊天室' }
];
const data = [
    { icon: 'images/5.png' },
    { icon: 'images/8.png' },
    { icon: 'images/9.png' }
];
var arr = [];
var brr = [];
var arr1 = [];
var brr1 = [];
export default class Community extends Component {
    constructor() {
        super();
        this.state = {
            dataItem: [],
            dataItem2: [],
            data: [],
            name: [],
            message:[],
            message2:[]
        }
    }
    componentDidMount() {
        fetch('http://localhost:5000/active', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
            this.setState({
                data: res

            })
        })
        fetch('http://localhost:5000/login', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
        })
        .then(res => res.json())
        .then(res => {
            this.setState({
                name: res[0]
            })
            console.log(this.state.name);
        })
        fetch('http://localhost:5000/chateye1',{
            method:'GET', 
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        })
        .then(res=>res.json())
        .then(res=>{            
            res.map((item,index)=>{
                if(item.user_id!=null) {
                    if(item.user_id.indexOf(this.state.name.user_id) != -1) {
                        arr.push(item)
                    }
                }
            })
            this.setState({
              dataItem:arr
            })
        })
        fetch('http://localhost:5000/chatear1',{
            method:'GET', 
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        })
        .then(res=>res.json())
        .then(res=>{            
            res.map((item,index)=>{
                if(item.user_id!=null) {
                    if(item.user_id.indexOf(this.state.name.user_id) != -1) {
                        brr.push(item)
                    }
                }
            })
            this.setState({
              dataItem2:brr
            })
        })
        fetch('http://localhost:5000/apphome/hometab/details',
        {method:'GET'})
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res)
            this.setState({
                message:res
            })
        }).then((res)=>{console.log(this.state.message)})
        fetch('http://localhost:5000/apphome/hometab/details1',
        {method:'GET'})
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res)
            this.setState({
                message2:res
            })
        }).then((res)=>{console.log(this.state.message2)})

    }
    render() {
        if(arr) {
            arr1=[]
            arr.map((item,index) => {
                this.state.message.map((item1,index1) => {
                    if(item.article_id == item1.article_id) {
                        arr1.push(item1)
                    }
                })
            })
        }
        if(brr) {
            brr1=[]
            brr.map((item,index) => {
                this.state.message2.map((item1,index1) => {
                    if(item.article_id == item1.article_id) {
                        brr1.push(item1)
                    }
                })
            })
        }
        return (
            <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
                <div style={{ width: '100%', backgroundColor: '#8794a8', height: '50px' }}>
                    <p style={{ margin: '0 auto', fontSize: 18, textAlign: 'center', lineHeight: '50px' }}>社区</p>
                </div>
                <div style={{ height: '93%', width: '100%', paddingTop: 30, position: 'fixed' }}>
                    <Link to='/apphome/mytab/dynamic'><div style={{ position: 'absolute', right: 10, top: 45, fontSize: 20 }} className='iconfont icon21'></div></Link>
                    <div style={{ height: '18%', margin: 15 }}>
                        <div style={{
                            width: 80,
                            height: 80,
                            borderRadius: 20,
                            backgroundImage: 'url(' + 'http://localhost:5000/img?imgname=' + this.state.name.avatar + ')',
                            backgroundSize: '120% 100%',
                            float: 'left',
                            marginRight: 15
                        }}></div>
                        <p style={{ margin: 0, fontSize: 25, }}>{this.state.name.username}</p>
                        {/* <button style={{ backgroundColor: '#8794a8', width: 50, height: 25, marginTop: 15, marginLeft: 1, marginRight: 10, backgroundColor: '#fff', border: '1px solid #d4d4d4', borderRadius: 5, fontSize: 15 }}>
                            粉丝<span>{this.state.name.like_number}</span>
                        </button> */}
                        <button style={{ backgroundColor: '#8794a8', width: 120, height: 25, marginTop: 15, backgroundColor: '#fff', border: '1px solid #d4d4d4', borderRadius: 5, fontSize: 15 }}>
                            我关注的人      <span>{this.state.name.liked_number}</span>
                        </button>
                    </div>
                    <div style={{ borderTop: '1px solid #fff', height: '100%', backgroundColor: '#fff' }}>
                        <Tabs tabs={tabs}
                            initialPage={0}
                            destroyInactiveTab={true}
                            tabBarUnderlineStyle={{ backgroundColor: 'white', border: 'none' }}
                            tabBarActiveTextColor={'#8794a8'}
                            // animated={false}
                            swipeable={true}
                            style={{ backgroundColor: '#8794a8' }}
                        >
                            {
                                tabs.map(item => {
                                    if (item.title == '树洞') {
                                        return (
                                            <ul style={{ listStyle: 'none', marginBottom: '100px',color:'black',fontSize:'15px',height:'300%' }}>
                                                {
                                                    this.state.data.map((item, index) => (

                                                        <li style={{ height: 'fixContent', width: '95%', marginLeft:'2.5%', marginBottom: '10px', border: '1px solid #8794a8' }} key={index}>
                                                            <img style={{ width: '90px', height: '90px', float: 'left' }} src={'http://localhost:5000/img?imgname=' + item.img1} />
                                                            <div style={{ display: 'inline-block', marginLeft: '10px',width:'70%' }}>
                                                                <p style={{ overflow: 'hidden', width: '230px', height: '40px',float:'right' }}>{item.content}</p>
                                                                <p style={{ overflow: 'hidden', width: '230px', height: '40px',float:'right' }}>{item.time}</p>
                                             
                                                            </div>
                                                            {item.audio ? 
                                                                <div id='load' style={{display:'block'}}>
                                                                    <audio src={require('../Taylor/'+item.audio)} id='audio' loop="loop" controls >
                                                                    　　<track kind="captions" />
                                                                    　　您的浏览器不支持 audio 元素。
                                                                    </audio>
                                                                </div>
                                                                :<div></div>
                                                            }
                                                        </li>

                                                    ))
                                                }
                                            </ul>
                                        )
                                    } else if (item.title == '聊天室') {                                        
                                        return (
                                            <ul style={{ listStyle: 'none', marginBottom: '100px',color:'black',fontSize:'15px',height:'300%'  }}>
                                                {
                                                    arr1.map((item, index) => (
                                                        <Link to={'/apphome/mytab/eyemychat/'+item.article_id}>
                                                            <li style={{ height: '110px', width: '95%', margin: '0 auto', marginBottom: '10px', border: '1px solid #8794a8' }} key={index}>
                                                                <img style={{ width: '90px', height: '90px', float: 'left' }} src={item.img} />
                                                                <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                                                                        {
                                                                            item.title.length <= 10 ? 
                                                                            <span style={{color:'#8794a8',fontSize:'15px'}}>
                                                                                {item.title}
                                                                            </span> :
                                                                            <span style={{color:'#8794a8',fontSize:'15px'}}>
                                                                                {item.title.slice(0,10)+'...'}
                                                                            </span>
                                                                        }
                                                                </div>
                                                            </li>
                                                        </Link>
                                                    ))
                                                }
                                                {
                                                    brr1.map((item, index) => (
                                                        <Link to={'/apphome/mytab/earmychat/'+item.article_id}>
                                                            <li style={{ height: '110px', width: '95%', margin: '0 auto', marginBottom: '10px', border: '1px solid #8794a8' }} key={index}>
                                                                <img style={{ width: '90px', height: '90px', float: 'left' }} src={item.img} />
                                                                <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                                                                {
                                                                    item.title.length <= 10 ? 
                                                                    <span style={{color:'#8794a8',fontSize:'15px'}}>
                                                                        {item.title}
                                                                    </span> :
                                                                    <span style={{color:'#8794a8',fontSize:'15px'}}>
                                                                        {item.title.slice(0,10)+'...'}
                                                                    </span>
                                                                }
                                                                </div>
                                                            </li>
                                                        </Link>
                                                    ))
                                                }
                                            </ul>

                                        )

                                    }
                                }
                                )
                            }
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}
