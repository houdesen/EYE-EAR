import React, { Component } from 'react'
import { HashRouter as Router, Link } from 'react-router-dom';
let id = 0;

export default class Author extends Component {
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
      ],
      user: []
    }
  }
  componentWillReceiveProps(nextProps) {
    if(this.props !== nextProps) {
      fetch('http://localhost:5000/apphome/hometab/details1/',
      {method:'GET'})
      .then((res)=>res.json())
      .then((res)=>{
          this.setState({
              dataItem:res
          })                
      })
    }
  }
  // componentDidUpdate(prevProps, prevState) {    
  //   if (prevState.flag !== this.state.flag){
  //     fetch('http://localhost:5000/apphome/hometab/details1/',
  //     {method:'GET'})
  //     .then((res)=>res.json())
  //     .then((res)=>{
  //         this.setState({
  //             dataItem:res
  //         })                
  //     })
  //   }
  // }
  componentDidMount() {
    id = this.props.match.params.id;
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
      }).then(() => {
        console.log(this.state.dataItem);
      })
    fetch('http://localhost:5000/login', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          user: res[0].user_id,
        })
      }
      ).then(() => {

      })
  }
  btn = (item) => {
    var num = [];
    var tip = 0;
    var len = 0;
    if (item.author_likedId) {
      num = item.author_likedId.split(',')
      len = num.length;
    }
    for (var i = 0; i < num.length; i++) {
      if (num[i] == this.state.user) {
        num.splice(i);
        len--;
        tip = 1;
      }
    }
    if (tip == 0) {
      len++;
      num.push(this.state.user)
    }
    num = num.join(',')
    let id = this.props.match.params.id
    fetch('http://localhost:5000/authorLiked1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        author_likedId: num,
        num: len,
        id: id
      })
    })
      .then(res => res.json())
      .then(res => {
      })
    fetch('http://localhost:5000/apphome/hometab/details1/',
      { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          dataItem: res
        })
      })
  }
  render() {
    return (
      <div style={{ width: '100%', height: '108%', backgroundColor: '#fff', zIndex: 999, position: 'absolute', overflow: 'auto' }}>
        {
          this.state.dataItem.map((item, index) => {
            var arr = [];
            if(item.author_likedId) {
                arr = item.author_likedId.split(',')
            }
            var con = '关注';
            var color = 'red';
            for(var i = 0; i < arr.length; i++) {
                if(arr[i] == this.state.user) {
                    con = '取消关注';
                    color = '#d4d4d4'
                }
            }
            if (item.article_id == id) {
              return (
                <div>
                  <Link to={'/apphome/hometab/details1/' + item.article_id}>
                    <div style={{ position: 'fixed', top: 10, left: 10, zIndex: 5, fontSize: 22 }} className='iconfont icon-fanhui'></div>
                  </Link>
                  <div style={{ height: '50%', overflow: 'hidden' }}>
                    <img src={item.avatar} style={{ width: "100%" }} />
                  </div>
                  <div style={{ height: '35%' }}>
                    <div style={{ height: '40%', margin: 15 }}>
                      <div style={{
                        width: 80,
                        height: 80,
                        borderRadius: 20,
                        backgroundImage: 'url(' + item.avatar + ')',
                        backgroundSize: '120% 100%',
                        float: 'left',
                        marginRight: 15
                      }}></div>
                      <p style={{ margin: 0, fontSize: 22, fontWeight: 'bolder', display: "block", width: "100%" }}>{item.author}</p>
                    </div>
                    <div style={{ border: '1px solid #d4d4d4', height: '60%', margin: 15, borderRadius: 5 }}>
                      {item.content}
                    </div>
                    <button style={{ width: 80, height: 25, float: 'right', marginTop: '10%', marginLeft: 30, backgroundColor: '#fff', border: '1px solid #d4d4d4', borderRadius: 5 }}>粉丝<span>{item.author_liked}</span></button>
                    <button style={{ width: 80, height: 25, float: 'right', marginTop: '10%', backgroundColor: '#fff', border: '1px solid #d4d4d4', borderRadius: 5, color:color}} onClick={()=>{this.btn(item)}}>{con}</button>
                  </div>
                </div>
              )
            }
          })
        }
      </div>
    )
  }
}