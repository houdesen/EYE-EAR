import React, { Component } from 'react';
import '../../index_fxy.css';
import { Link } from 'react-router-dom';
import Chat from 'chat-react';
import { NavBar } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import './mychat.css'

const t = new Date().getTime();
const local = window.location.hash.split('/');
var all = [];
var arr = [];
var arr1 = [];
var arr2 = [];
var tip;
export default class MyChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      say: '',
      inputValue: '',
      userid: '',
      username: '',
      avatar: '',
      data: '',
      messages: [],
      userdata: [],
      className: 'hidden',
      tip: true,
      emojiList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
      emo: {
        display: 'none'
      }
    };
  }
  handleScroll() {
    if (document.documentElement.scrollTop > 630) {
      this.setState({
        className: 'show'
      })
    }
  }
  componentDidMount() {
    all = [];
    window.onscroll = () => this.handleScroll()
    tip = this.props.match.path.slice(17, 20);
    console.log(tip)
    fetch('http://localhost:5000/login', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
      .then(res => res.json())
      .then(res => {
        console.log(res[0])
        this.setState({
          userid: res[0].user_id,
          username: res[0].username,
          avatar: res[0].avatar,
        })
      })
    fetch('http://localhost:5000/loginlist', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          userdata: res
        })
      })
    fetch('http://localhost:5000/chatroom' + tip + '?id=' + this.props.match.params.id, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res[0]
        })
      })
      .then(() => {
        if (this.state.data.user_id) {
          arr = this.state.data.user_id.split(',')
        }
        if (this.state.data.user_id) {
          arr1 = this.state.data.message.split(',')
        }
        if (this.state.data.user_id) {
          arr2 = this.state.data.time.split(',')
        };
        var len = arr.length;
        for (var i = 0; i < len; i++) {
          var obj = {};
          obj.timestamp = arr2[i];
          obj.avatar = 'http://localhost:5000/img?imgname=' + "0.jpg";
          obj.name = "username";
          obj.userId = arr[i];
          obj.value = arr1[i];
          all.push(obj);
        }
        // console.log(111111111111111111111111111111)
        // console.log(all)
      })
  }

  componentDidUpdate(prevProps, prevState) {
    tip = this.props.match.path.slice(17, 20);
    // all=[];
    // console.log(this.props.match.params.id)
    // console.log(this.state.data.article_id)
    // if((this.props.match.params.id!==this.state.data.article_id)){
    console.log(this.state.tip)
    if (this.state.tip == false) {
      let id = this.props.match.params.id
      fetch('http://localhost:5000/chatroom' + tip + '?id=' + this.props.match.params.id,
        { method: 'GET' })
        .then((res) => res.json())
        .then((res) => {
          all = [];
          this.setState({
            data: res[0]
          })
        })

        .then(() => {
          all = [];
          if (this.state.data.user_id) {
            arr = this.state.data.user_id.split(',')
          }
          if (this.state.data.user_id) {
            arr1 = this.state.data.message.split(',')
          }
          if (this.state.data.user_id) {
            arr2 = this.state.data.time.split(',')
          };
          var len = arr.length;
          for (var i = 0; i < len; i++) {
            var obj = {};
            obj.timestamp = arr2[i];
            obj.avatar = 'http://localhost:5000/img?imgname=' + "0.jpg";
            obj.name = "username";
            obj.userId = arr[i];
            obj.value = arr1[i];
            all.push(obj);
          }
          this.setState({
            tip: true
          })
        })
    }
  }
  sendMessage = () => {
    tip = this.props.match.path.slice(17, 20);
    var useridarr = [];
    if (this.state.data.user_id) {
      useridarr = this.state.data.user_id.split(',')
    }
    useridarr.push(this.state.userid)
    useridarr = useridarr.join(',')
    var messagearr = [];
    if (this.state.data.message) {
      messagearr = this.state.data.message.split(',')
    }
    messagearr.push(this.state.say)
    messagearr = messagearr.join(',')
    console.log(messagearr)

    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if (hour < 10) {
      hour = '0' + hour;
    }
    if (minute < 10) {
      minute = '0' + minute;
    }
    if (second < 10) {
      second = '0' + second;
    }
    var time = year + '/' + month + '/' + day + '/' + hour + ':' + minute + ':' + second;

    var timearr = [];
    if (this.state.data.time) {
      timearr = this.state.data.time.split(',')
    }
    timearr.push(time)
    timearr = timearr.join(',')
    console.log(timearr)

    fetch('http://localhost:5000/chatroom' + tip, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        userid: useridarr,
        eyeid: this.props.match.params.id,
        time: timearr,
        message: messagearr
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log('消息存储成功')
        this.setState({
          tip: false
        })
      })
  }
  change = (e) => {
    this.setState({
      say: e.target.value
    })
    var mess = document.getElementById('mess');
    mess.style.backgroundColor = '#2883bf'
    mess.style.color = '#fff'
  }
  onUser = (username) => {
    this.props.history.push('/apphome/hometab/member');
  }
  click1 = () => {
    this.setState({
      tip: false
    })
  }
  chooseEmoji = (item) => {
    var img = '/img/' + item + '.gif';
    tip = this.props.match.path.slice(17, 20);
    var useridarr = [];
    if (this.state.data.user_id) {
      useridarr = this.state.data.user_id.split(',')
    }
    useridarr.push(this.state.userid)
    useridarr = useridarr.join(',')
    var messagearr = [];
    if (this.state.data.message) {
      messagearr = this.state.data.message.split(',')
    }
    messagearr.push(img)
    messagearr = messagearr.join(',')
    console.log(messagearr)

    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if (hour < 10) {
      hour = '0' + hour;
    }
    if (minute < 10) {
      minute = '0' + minute;
    }
    if (second < 10) {
      second = '0' + second;
    }
    var time = year + '/' + month + '/' + day + '/' + hour + ':' + minute + ':' + second;

    var timearr = [];
    if (this.state.data.time) {
      timearr = this.state.data.time.split(',')
    }
    timearr.push(time)
    timearr = timearr.join(',')
    console.log(timearr)

    fetch('http://localhost:5000/chatroom' + tip, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        userid: useridarr,
        eyeid: this.props.match.params.id,
        time: timearr,
        message: messagearr
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log('消息存储成功')
        this.setState({
          tip: false
        })
      })
    this.setState({
      emo: {
        display: 'none'
      }
    })
  }
  click2 = () => {
    if (this.state.emo.display == 'none') {
      this.setState({
        emo: {
          display: 'block',
          width: '170px',
          height: '170px',
          position: 'absolute',
          bottom: '40px',
          border: '1px #999 solid',
          background: 'white'
        }
      })
    } else {
      this.setState({
        emo: {
          display: 'none'
        }
      })
    }
  }
  render() {
    var style1;
    var style2;
    var style3;
    var style4;
    var style5;
    var a;
    var b;
    if (tip == 'ear') {
      b = '/apphome/hometab/details1/'
    } else {
      b = '/apphome/hometab/details/'
    }
    return (
      <div style={{ width: '100%', height: '100%', background: "white", zIndex: 99999, position: 'fixed', top: 0, bottom: 0 }}>

        <NavBar mode="light" style={{ width: '100%', background: '#8794a8', color: 'black' }}
          leftContent={[
            <Link to={b + this.props.match.params.id} style={{ color: 'black' }}><i onClick={this.click1} style={{ fontSize: 22, lineHeight: '22px', marginLeft: '-10px' }} className='iconfont icon-fanhui'></i></Link>,
          ]}
        >聊天室</NavBar>
        <div className={this.props.className} style={{ width: '100%', height: '550px', backgroundColor: '#fff', position: 'absolute', overflow: 'auto' }}>
          {
            all.map((item, index) => {
              console.log(this.state.userid);
              if (item.userId == this.state.userid) {
                style1 = {
                  position: "relative",
                  width: "100%",
                  height: "80px",
                  marginBottom: "10px"

                }
                style2 = {
                  width: "60px",
                  height: "60px",
                  borderRadius: "30px",
                  position: "absolute",
                  top: "20px",
                  right: "15px"
                }
                style3 = {
                  position: "absolute",
                  top: "20px",
                  right: "85px",
                  width: "auto",
                  height: "10px",
                }
                style5 = {
                  position: "absolute",
                  top: "20px",
                  right: "190px",
                  width: "60px",
                  height: "10px",
                }
                style4 = {
                  color: "white",
                  position: "absolute",
                  top: "50px",
                  right: "85px",
                  width: "auto",
                  height: "30px",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                  lineHeight: "30px",
                  borderRadius: "15px",
                  background: "#8794a8",
                  marginLeft: "10px",
                }
              } else {
                style1 = {
                  position: "relative",
                  width: "100%",
                  height: "80px",
                  marginBottom: "10px"
                }
                style2 = {
                  width: "60px",
                  height: "60px",
                  borderRadius: "30px",
                  marginTop: "20px",
                  marginLeft: "15px"
                }
                style3 = {
                  width: "auto",
                  height: "10px",
                  marginLeft: "10px",
                }
                style4 = {
                  color: "white",
                  position: "absolute",
                  top: "50px",
                  left: "75px",
                  width: "auto",
                  height: "30px",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                  lineHeight: "30px",
                  borderRadius: "15px",
                  background: "#8794a8",
                  marginLeft: "10px",
                }
                style5 = {

                }

              }
              return (
                <div style={style1}>

                  {
                    this.state.userdata.map((a, index) => {
                      if (a.user_id == item.userId) {
                        return (
                          <img src={'http://localhost:5000/img?imgname=' + a.avatar} style={style2} />
                        )
                      }
                    })
                  }


                  {
                    this.state.userdata.map((a, index) => {
                      if (a.user_id == item.userId) {
                        return (
                          <span style={style3}>{a.username}</span>
                        )
                      }
                    })
                  }
                  <span style={style5}>&nbsp;&nbsp;&nbsp;{item.timestamp}</span>
                  {
                    item.value.indexOf('gif') != -1 ?
                      <span style={style4}><img src={item.value} /></span> :
                      <span style={style4}>
                        {item.value}
                      </span>
                  }
                </div>
              )
            })
          }
        </div>
        <div style={{ width: '100%', height: "40px", background: '#8794a8', color: 'black', bottom: "0px", position: 'absolute' }}>
          <div>
            <div style={this.state.emo}>
              {
                this.state.emojiList.map((item, index) => {
                  return <img onClick={this.chooseEmoji.bind(this, item)} src={`./img/${item}.gif`} />
                })
              }
            </div>
            <img onClick={this.click2} style={{ margin: '0 3%', width: '9%', height: '26px', borderRadius: '13px' }} src='./img/timg.jpg' />
            <input style={{ width: "65%", height: '30px', marginTop: '5px', borderRadius: "20px"}} onChange={this.change} value={this.state.say} />
            <input id='mess' style={{ width: "15%", height: '30px', borderRadius: "10px", margin: "0 2.5%", color: "#8794a8", textAlign: "center", position: 'fixed', bottom: 5, backgroundColor: '#fff' }} type='button' value='发送' onClick={() => this.sendMessage()} />
          </div>
        </div>
      </div>
    )
  }
}
