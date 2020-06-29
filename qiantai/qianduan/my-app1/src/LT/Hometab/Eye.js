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
        { icon: 'iconfont icon-huazhan', tit: '画展' },
        { icon: 'iconfont icon-sheying', tit: '话剧' },
        { icon: 'iconfont icon-songdance', tit: '非遗' },
        { icon: 'iconfont icon-diaosu2', tit: '摄影展' },
        { icon: 'iconfont icon-sydney1162852easyiconnet', tit: '雕塑展' },
        { icon: 'iconfont icon-feiyihuicuichuantongjiyi-_huaban', tit: '漫展' },
      ]
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/apphome/hometab/eye', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          dataItem: res
        })
        console.log(this.state.dataItem);
      }).then(() => {
        console.log(this.state.dataItem);
      })
  }
  change = (ev) => {
    fetch('http://localhost:5000/apphome/hometab/eye/search', {
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
    fetch('http://localhost:5000/apphome/hometab/eye/search?content=' + value, {
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

  click = (id) => {
    fetch('http://localhost:5000/apphome/hometab/eye/class?tab_id=' + id, {
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
  render() {
    return (
      <div style={{width: '100%',height:'108%',backgroundColor: '#fff',zIndex:999,position:'absolute'}}>
        <NavBar mode="light" style={{ background: '#8794a8', color: 'black' }}
          leftContent={[
            <Link to='/apphome' style={{ color: 'black' }}><i style={{ fontSize: 22, lineHeight: '22px', marginLeft: '-10px' }} className='iconfont icon-fanhui'></i></Link>,
          ]}
        >EYE</NavBar>
        <SearchBar
          placeholder="Search"
          maxLength={20}
          onSubmit={this.submit}
        />
        <Grid data={this.state.data}
          columnNum={3}
          renderItem={data => (
            <Link to={`/apphome/hometab/eye/${data.tit}`} style={{color:'#000'}}>
              <div onClick={() => this.click(data.tit)} style={{ border: '1px solid #8794a8', backgroundColor: '#8794a8' }}>
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
              <Link to={'/apphome/hometab/details/' + item.article_id}>
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
  }
}