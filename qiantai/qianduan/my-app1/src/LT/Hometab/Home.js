import React, { Component } from 'react';
import { NavBar, Icon, Tabs, Carousel, Grid, Drawer, List, } from 'antd-mobile';
import { HashRouter as Router, withRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import Eye from './Eye'
export default class Home extends Component {
  state = {
    data: ['5', '3', '4'],
    imgHeight: 176,
    open: false,
    name: [],
  }

  onOpenChange = (...args) => {
    console.log(args);
    this.setState({ open: !this.state.open });
  }
  componentDidMount() {
    //api请求函数

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
      }
      )

  }
  componentDidUpdate(nextProps) {
    if (this.props != nextProps) {
      fetch('http://localhost:5000/login', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      })
        .then(res => res.json())
        .then(res => {
          this.setState({
            name: res[0]
          })
          console.log(this.state.data.avatar);
        }
        )
    }
  }
  render() {
    const sidebar = (
      <List style={{ background: '#c4c9d9' }}>
        {['用户名称', '个人主页', '联系我们', '会员中心', '设置', '退出'].map((i, index) => {
          if (index === 0) {
            return (<List.Item key={index}
              style={{ marginBottom: '10px', marginTop: '10px' }}
            ><Link to='/apphome/hometab/member' style={{ color: 'black' }}>
                <img src={'http://localhost:5000/img?imgname=' + this.state.name.avatar} style={{ width: '60px', height: '60px', marginLeft: '110px', border: '1px solid black', borderRadius: "50%" }} />
                <p style={{ marginLeft: '120px', marginTop: '10px', marginBottom: 30 }}>{this.state.name.username}</p></Link></List.Item>);
          }
          if (index === 1) {
            return (<List.Item key={index}
              style={{ marginBottom: '10px' }}
            >
              <Link to='/apphome/hometab/member' style={{ color: 'black' }}><i style={{ fontSize: 22, lineHeight: '22px', marginRight: '8px' }} className='iconfont icon-wode3'></i>
                {i}</Link></List.Item>);
          }
          if (index === 2) {
            return (<List.Item key={index}
              style={{ marginBottom: '10px' }}
            >
              <i style={{ fontSize: 22, lineHeight: '22px', marginRight: '8px' }} className='iconfont icon-notice'></i>
              <Link to='/apphome/hometab/connectus' style={{ color: 'black' }}>
                {i}</Link></List.Item>);
          }
          if (index === 3) {
            return (<List.Item key={index}
              style={{ marginBottom: '10px' }}
            >
              <Link to='/apphome/hometab/vip' style={{ color: 'black' }}><i style={{ fontSize: 22, lineHeight: '22px', marginRight: '8px' }} className='iconfont icon-huiyuanzhongxin'></i>
                {i}</Link></List.Item>);

          }
          if (index === 4) {
            return (<List.Item key={index}
              style={{ marginBottom: '10px' }}
            >
              <i style={{ fontSize: 22, lineHeight: '22px', marginRight: '8px' }} className='iconfont icon-settings'></i>
              {i}</List.Item>);
          }
          if (index === 5) {
            return (<List.Item key={index}
              style={{ marginTop: '160px' }}
            >
              <i style={{ fontSize: 22, lineHeight: '22px', marginRight: '8px' }} className='iconfont icon-tuichu'></i>
              <Link to="../login" style={{ color: "black" }}>{i}</Link></List.Item>);
          }
        })}
      </List>);
    return (
      <div style={{ height: 'auto' }}>

        <NavBar mode="light" style={{ background: 'white', color: 'black' }}
          leftContent={[
            <i style={{ fontSize: 22, lineHeight: '22px', marginLeft: '-10px' }} className='iconfont icon-mulu'></i>,
          ]}
          onLeftClick={this.onOpenChange}
          rightContent={[
            <i style={{ fontSize: 22, lineHeight: '22px', marginRight: '8px' }} className='iconfont icon-xin'></i>,
            <Link to='/apphome/hometab/search' style={{ color: 'black' }}><i style={{ fontSize: 22, lineHeight: '22px' }} className='iconfont icon-sousuo1'></i></Link>,

          ]}
        >EYE&EAR</NavBar>

        <Drawer
          className="my-drawer"
          style={{ height: 573, backgroundImage: "url(" + "../images/13.png" + ")" }}
          enableDragHandle
          contentStyle={{ color: '#A6A6A6', textAlign: 'center', marginTop: 42 }}
          sidebar={sidebar}
          open={this.state.open}
          onOpenChange={this.onOpenChange}
        >
          <Carousel
            autoplay={true}
            infinite
            // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            // afterChange={index => console.log('slide to', index)}
            style={{ width: '60%', height: this.state.imgHeight, margin: '0 auto' }}
            dotStyle={{ width: 0, height: 0 }}
            dotActiveStyle={{ width: 0, height: 0 }}
          >
            {this.state.data.map(val => (
              <a
                key={val}
                href="http://www.alipay.com"
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
              >

                <img
                  //src={require(`./images/${val}.png`)}
                  src={`./images/${val}.png`}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top' }}   //图片记得写上宽度百分之百
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </a>
            ))}
          </Carousel>

          <div style={{ background: '#8794a8', border: "1px solid #8794a8", width: '60%', height: '40px', lineHeight: '40PX', margin: '30px auto', color: 'black', borderRadius: '10% 10% 10% 10%', textAlign: 'center center' }}>
            <Link to='/apphome/hometab/eye'> <h1 style={{ fontSize: '15px' }}>进入EYE世界</h1></Link>
          </div>
          <div style={{ background: '#8794a8', border: "1px solid #8794a8", width: '60%', height: '40px', lineHeight: '40PX', margin: '30px auto', color: 'black', borderRadius: '10% 10% 10% 10%', textAlign: 'center center' }}>
            <Link to='/apphome/hometab/ear'> <h1 style={{ fontSize: '15px' }}>进入EAR世界</h1></Link>
          </div>

        </Drawer>





      </div>
    );
  }
}
