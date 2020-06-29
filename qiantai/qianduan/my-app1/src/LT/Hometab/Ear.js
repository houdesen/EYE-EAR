import React, { Component } from 'react';
import { NavBar, Carousel, Grid, SearchBar, SegmentedControl, ListView, Accordion, List } from 'antd-mobile';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';


const axios = require('axios');
const querystring = require('querystring');

export default class Eye extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataItem: [],
      data: [
        { icon: 'iconfont iconyanchanghui', tit: '演唱会', url: '/Yanchang' },
        { icon: 'iconfont icongejuyuan', tit: '歌剧', url: '/Geju' },
        { icon: 'iconfont iconyinlehui28', tit: '音乐会', url: '/Yinyueju' },
        { icon: 'iconfont iconxiangshengxiaopin', tit: '相声', url: '/Yinyuehui' },
        { icon: 'iconfont iconxiqu', tit: '戏曲', url: '/Xiqu' },
        { icon: 'iconfont iconyinlehui1', tit: '音乐剧', url: '/Xiangsheng' },
      ]
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/apphome/hometab/ear', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          dataItem: res
        })
        console.log(this.state.dataItem);
      }).then(()=>{
        console.log(this.state.dataItem);
    })
  }
  change = (ev) => {
    fetch('http://localhost:5000/apphome/hometab/ear/search', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          dataItem: res
        })
        console.log(this.state.dataItem)
      }).then(() => {
        console.log(this.state.dataItem);
      })
  }

  submit = (value) => {
    // console.log(value);
    fetch('http://localhost:5000/apphome/hometab/ear/search?content=' + value, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        // console.log(this.state.value);
        this.setState({
          dataItem: res
        })
        console.log(this.state.dataItem)
      }).then(() => {
        // console.log(id);
      })
  }
  click=(id)=>{
    console.log(id)
    fetch('http://localhost:5000/apphome/hometab/ear/class?tab_id='+id, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          dataItem: res
        })
        console.log(this.state.dataItem)
    }).then(()=>{
      console.log(this.state.dataItem);
  })
  }
  render() {
    return (
      <div  style={{width: '100%',height:'108%',backgroundColor: '#fff',zIndex:999,position:'absolute'}}>
        <NavBar mode="light" style={{ background: '#8794a8', color: 'black' }}
          leftContent={[
            <Link to='/apphome' style={{ color: 'black' }}><i style={{ fontSize: 22, lineHeight: '22px', marginLeft: '-10px' }} className='iconfont icon-fanhui'></i></Link>,
          ]}
        >EAR</NavBar>
        <SearchBar placeholder="Search" maxLength={8} onSubmit={this.submit} />
        <Grid data={this.state.data}
          columnNum={3}
          renderItem={data => (
                    <Link to={`/apphome/hometab/ear/${data.tit}`} style={{color:'#000'}}>
                    <div onClick={()=>this.click(data.tit)} style={{ border: '1px solid #8794a8', backgroundColor: '#8794a8' }}>
                      <div style={{ width: '100%', height: 85 }} onClick={this.onClick}>
                        {
                          <i className={data.icon} style={{ fontSize: 60, color: 'black', height: 40, width: 40, textAlign: 'center' }} ></i>
                        }
                      </div>
                      <p style={{ fontSize: 15 }}>{data.tit}</p>
                    </div>
                    </Link>  
            )}
        />
      
        <ul style={{ listStyle: 'none', margin: '10px auto',height:'50%',overflow:'auto'}}>
          {
            this.state.dataItem.map((item, index) => (
              <Link to={'/apphome/hometab/details1/' + item.article_id}>
                <li style={{ height: '110px', width: '95%', margin: '0 auto', marginBottom: '10px', border: '1px solid #8794a8' }} key={index}>
                  <img style={{ width: '20%', height: '80px', float: 'left' }} src={item.img} />
                  <div style={{ display: 'inline-block', marginLeft: '10px', width: '70%', float: 'left' }}>
                  <h4 style={{
                      display: "block", marginTop: '5', marginLeft: '20px',
                      textOverflow: "ellipsis", whiteSpace: "nowrap",
                      overflow: "hidden", width: "90%", fontSize: '20px'
                    }}>
                      {item.title}
                    </h4>
                    <p style={{
                      width: '90%', height: '40px', display: 'block',
                      display: 'inline-block', marginLeft: '20px', lineHeight: "20px",
                      color: 'gray', fontSize: '15px',textOverflow: "ellipsis", whiteSpace: "nowrap",
                      overflow: "hidden"
                    }}>
                      {item.content}
                    </p>
                  </div>
                </li>
              </Link>
            ))
          }
        </ul>
      </div>
    );
  }}