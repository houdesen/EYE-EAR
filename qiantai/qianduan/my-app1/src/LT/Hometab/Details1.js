import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Details.css'
const axios = require('axios');
const querystring = require('querystring');
const content =  {
    Title:'美术的诞生:从太阳王到拿破仑——巴黎国立高等美术学院珍藏展',
    First_type: "apphome/hometab/ear",
    Tab_id: "演唱会",
    Author:'赫本',
    avatar: './images/16.jpg',
    Content:`<p align="left">&nbsp;&nbsp;&nbsp;&nbsp;2002年岁末，神话开始。2003年秋冬，走向高潮和终极。《无间道》即自承取乎佛家理念，光明与黑暗、生存与消亡、存在与虚无纠结于混然一体，愕然分崩离析，亦是丰富兼统一的过程。有因就有果，有孽就有缘，境与相的妙处在于言诠的限度，不可道破，又不可沉默，相互依托。心音始终在，拷问自我，拷问时空。这是最好的时代，这是最坏的时代，几乎每个时代的人都在这么说。然而《维摩诘经·观众生品第七》中说：无住则无本。从身体的言行开始，经过辩难言说的层面，初步达到存有自视境界，最后不过是归结为生存的态度。在我看来，刘健明、陈永仁、韩琛、黄志诚、倪永孝、陆启昌、杨锦荣、沈澄等人其实是宿命中的镜像人物，都可以从对方身上看到自我，抗争、迸发、沉雄、挥洒，仿佛的劫数、扭曲的生命，于是乎“无间道”。</p>　 
    <p align="left">&nbsp;&nbsp;&nbsp;&nbsp;顾准说从理想主义到经验主义，王小波说要警惕僭主和英雄，谁是英雄？他们从哪里来？他们来了又怎样？我们这个时代还要不要英雄？我在编辑这期E论坛时，有一些欣慰，从文字中可以看出大家都在思考，毕竟我们不再是盲从的一代。在我看来，娱乐从来就不仅仅是娱乐本身，从一滴水、一朵花、一粒沙可以看到一个世界，从一场电影中我们想到的注定更多，理解定可变奏无穷。我们每个人就构成了这个世界，无论这个世界是好是坏，我们都有份。我们每个人都有自己的生活，都有优点都有缺点，这是我们共同进步的基础。</p> `,
    Img:'./images/赫本.jpg',
    Article_id:'' 
}
let id=0;
export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state={
            dataItem:[],
            style:{
                zIndex: '100',
                width: '100%',
                height: '50px',
                background: '#8794a8',
                position: '',
                transition: 'all  1s linear',
                fontSize: '25px',
            },
            data:[],
            userdata:[]
        }
    }
    componentDidMount() {
        // window.addEventListener('scroll', this.handleScroll);
        id = this.props.match.params.id;//
        console.log(id);
        fetch('http://localhost:5000/apphome/hometab/details1',
        {method:'GET'})//
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res);
            // this.dataItem.push(res[0])
            this.setState({
                dataItem:res
            })
        }).then(()=>{
            console.log(this.state.dataItem);
        })
        fetch('http://localhost:5000/login', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res[0].user_id
                })
            }
            )  
        fetch('http://localhost:5000/loginlist', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    userdata: res
                })
            }
            ).then(()=>{
                console.log(this.state.userdata);
            })
    }
    componentWillReceiveProps(nextProps) {
        if(this.props != nextProps) {
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
    componentDidUpdate(prevProps,prevState){
        if(prevProps.match.params.id!==this.props.match.params.id){//
            let id = this.props.match.params.id//
            fetch('http://localhost:5000/apphome/hometab/details1/',
            {method:'GET'})//
            .then((res)=>res.json())
            .then((res)=>{
                this.setState({
                    dataItem:res
                })                
            })
        }
    }
    change = (e) => {
        this.setState({
          comment: e.target.value
        })
      }
    publish = (item) => {
        var user_id = [];
        if(item.comment_user_id) {
            user_id = item.comment_user_id.split(',')
        }
        user_id.push(this.state.data)
        user_id = user_id.join(',')

        var commentlist = [];
        if(item.comment) {
            commentlist = item.comment.split(',')
        }
        var date=new Date();
        var year=date.getFullYear();
        var month=date.getMonth();
        var day=date.getDate();

        var hour=date.getHours();
        var minute=date.getMinutes();
        var second=date.getSeconds();
        if (hour<10) {
            hour='0'+hour;
        }
        if (minute<10) {
            minute='0'+minute;
        }
        if (second<10) {
            second='0'+second;
        }
        var time="+"+year+'/'+month+'/'+day+'/'+hour+':'+minute+':'+second
        var commenttime=this.state.comment+time
        commentlist.push(commenttime);
        commentlist = commentlist.join(',')
        console.log(commentlist)
        fetch('http://localhost:5000/comment1',{
            method:'POST', 
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify({
              user_id:user_id,
              comment:commentlist,
              id:id
            })})
          .then(res=>res.json())
          .then(res=>{   
            console.log(this.state.data)
            console.log(user_id)
            console.log("评论存储成功！")
        })
    }
    btn = (item) => {
        var num = [];
        var tip = 0;
        var len = 0;
        if(item.people) {
            num = item.people.split(',')
            len = num.length;
        }
        for(var i=0;i<num.length;i++) {
            if(num[i] == this.state.data) {
                num.splice(i);
                len--;
                tip = 1;
            }
        }
        if(tip == 0) {
            len++;
            num.push(this.state.data)
        }
        num = num.join(',')
        let id = this.props.match.params.id
        fetch('http://localhost:5000/heart1',{
            method:'POST', 
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify({
              userId:num,
              num:len,
              id:id
            })})
          .then(res=>res.json())
          .then(res=>{      
        })
        fetch('http://localhost:5000/apphome/hometab/details1/',
        {method:'GET'})
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({
                dataItem:res
            })                
        })
    }
    render() {     
        return(
            <div style={{width: '100%',height:'108%',backgroundColor: '#fff',zIndex:999,position:'absolute',overflow:'auto'}}>
            {
            this.state.dataItem.map((item,index)=>{
                var arr = [];
                if(item.people) {
                    arr = item.people.split(',')
                }
                var color = '#666';
                for(var i = 0; i < arr.length; i++) {
                    if(arr[i] == this.state.data) {
                        color = 'red';
                    }
                }
                if(item.article_id==id){
                    return(
                    <div className='box'>
                        <div className="header" style={this.state.style}>
                            <p className='p1'><Link to={'/'+content.First_type}><span style={{fontSize:'35px'}}className="iconfont icon-htmal5icon37"></span></Link></p>                    
                            <Link to={'/apphome/hometab/author1/' + item.article_id} style={{marginLeft:'1px',display:"inline-block",float:'left',marginTop:'5px'}}>
                                <img src={item.avatar}/>
                                &nbsp;
                                <span>{item.author}</span>
                            </Link>
                            <div style={{display:'inline-block',float:'right',padding:'1px 7px'}}>
                                <Link to={'/apphome/hometab/earmychat/' + item.article_id}>
                                    <button>进入圈子</button>
                                </Link>
                            </div>
                        </div>
                        <div className='part1'>
                            <img className='img-responsive' src={item.img}/>
                        </div>
                        <p></p>
                        <div className='part2 container'>
                            <h2 style={{marginTop:'30px'}}>
                                {item.title}
                            </h2>                                      
                            <div dangerouslySetInnerHTML={{ __html: item.content }} style={{fontSize:16,textAlign:'justify'}}>
                            </div>                   
                        </div>
                        <div className='part3'>
                            <div className='commentall'>
                                <input  name='comment'value={this.state.comment} className='comment' placeholder='在此处评论' onChange={this.change}/>
                                <input  className='commentbutton' value='发表' onClick={()=>this.publish(item)}/>
                            </div>
                            <span style={{color:color,float:'right'}}>
                                <i style={{fontSize:22,lineHeight:'35px'}} onClick={()=>this.btn(item)} className='iconfont icon-xin'></i>
                                <span style={{color:'black',fontSize:'20px'}}> {item.num}</span>
                            </span>
                        </div>
                        <div className='part6'>
                            {
                                item.comment == null ? <div></div> :
                                <div className='part4'>
                                    {                            
                                        item.comment.split(',').map((item,index)=>{
                                            var arr=item.split("+")
                                            return(
                                                <div className='comment1' style={{width:"90%",height:'40px',marginTop:"10px"}}>
                                                    <div>{arr[1]}</div>
                                                    <div>{arr[0]}</div>
                                                </div>
                                                
                                            )
                                        })
                                    }                        
                                </div>
                            }
                            {
                                item.comment_user_id == null ? <div></div> :                         
                                <div className='part5'>
                                {                        
                                    item.comment_user_id.split(',').map((item,index)=>{
                                        var that=this
                                        var b
                                        that.state.userdata.map((a,index)=>{
                                            if(a.user_id==item){
                                                b=a.avatar
                                            }
                                        })
                                        return(
                                        <img src={'http://localhost:5000/img?imgname=' + b} style={{width:'40px',height:'40px',marginTop:"10px",marginLeft:'5px'}}/>
                                        )
                                        
                                    })
                                }
                                </div>
                            }
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
