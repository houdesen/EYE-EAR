import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { SearchBar,WhiteSpace, Tabs ,Grid } from 'antd-mobile';
import Shop_publish from './Shop_publish';
import { Item } from 'rc-menu';
const ticketContent = {
    id:1,
    tImg: "./images/朗.jpg",
    tName: "pic"
};
const artContent = {
    id:1,
    aImg: "./images/朗.jpg",
    aName: "pic"
};
const souvenirContent = {
    id:1,
    sImg: "./images/朗.jpg",
    sName: "pic"
};
// const art = Array.from(new Array(9)).map(() => ({
//     icon: artContent.aImg,
//     id:artContent.id
// }));

const ticket = Array.from(new Array(9)).map(() => ({
    icon: ticketContent.tImg,
    id:ticketContent.id
}));
const souvenir = Array.from(new Array(9)).map(() => ({
    icon: souvenirContent.sImg,
    id:souvenirContent.id
}));

const tabs = [
    { title: '票类'},
    { title: '艺术品'},
    { title: '发布'},
];    
export default class Goods extends Component {
    constructor() {
        super();
        this.state={
            style:{
                zIndex: '100',
                width: '100%',
                height: 'auto',
                background: 'white',
                position: '',
                transition: 'all  1s linear',
                fontSize: '25px',
            },
            data:[],
            data1:[]
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        fetch('http://localhost:5000/apphome',{
            method:'GET' 
            })
          .then(res=>res.json())
          .then(res=>{
            this.setState({
                data:res
            })
            console.log(this.state.data)
          } 
          )
          fetch('http://localhost:5000/apphome1',{
            method:'GET' 
            })
          .then(res=>res.json())
          .then(res=>{
            this.setState({
                data1:res
            })

            console.log(this.state.data1)
          } 
          )
    }
    handleScroll=(event)=>{
        let ctx=this;
        let scrollTop  = document.documentElement.scrollTop;  //滚动条滚动高度
        if(scrollTop>100){
            ctx.setState({ style: {
                zIndex: '100',
                width: '100%',
                height: 'auto',
                background: '#dcd9dd',
                fontSize: '25px', 
                position: "fixed",
                top:0,
                left:0 ,
                transition: 'all  1s linear'
            } })
        }else
        {
            ctx.setState({ style: {
                zIndex: '100',
                width: '100%',
                height: 'auto',
                background: 'white',
                fontSize: '25px' ,
                position: '',
                transition: 'all  1s linear',
            }})
        }    
    }
    render() {
        return (
            <div className='box'>
                <div style={{ height: 600}}>
                    <WhiteSpace />
                    <Tabs tabs={tabs}
                        initialPage={1}
                        tabBarPosition="left"
                        tabDirection="vertical"
                    >
                        {/* <div style={{alignItems: 'center', backgroundColor: '#fff' }}> */}
                        <div style={{  alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                        <ul style={{listStyle:'none',margin:'0px auto'}}>
                            {
                                this.state.data1.map((item,index)=>(
                                item.state=='上架'?
                                // <Link to={'/apphome/shoptab_detail_one/'+item.id}>
                                 <Link to={'/apphome/shoptab/shop_detail_one/'+item.id}>
                                <li style={{height:'110px',width:'80%',margin:'0 auto',marginBottom:'10px',border:'1px solid #8794a8'}} key={1}>
                                    <img style={{width:'90px',height:'90px',float:'left'}} src={'http://localhost:5000/images?imgname='+item.tImg}/>
                                    <div style={{display:'inline-block',marginLeft:'10px',width:'60%'}}>
                                    <p style={{textOverflow: "ellipsis", whiteSpace: "nowrap",
                                            overflow: "hidden",width:'80%',marginLeft:10,marginBottom:0,fontSize:18,color:'black'}}>
                                        {item.tName}
                                    </p>
                                    <p style={{
                                        width:'80%',
                                        display: "block",fontSize:16,color:'black',
                                        textOverflow: "ellipsis", whiteSpace: "nowrap",
                                        overflow: "hidden",marginLeft:10,marginTop:0
                                        }}>
                                        {item.tContent}
                                        </p>                                    
                                    </div>
                                </li>
                                </Link>:null
                                ))
                            }
                            </ul>
                        </div>
                        <div style={{  alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                            <ul style={{listStyle:'none',margin:'0px auto'}}>
                            {
                                this.state.data.map((item,index)=>(
                                item.state=='上架'?
                                <Link to={'/apphome/shoptab/shop_detail_two/'+item.id}>
                                {/* <Link to='/apphome/shoptab_detail_two'> */}
                                <li style={{height:'110px',width:'80%',margin:'0 auto',marginBottom:'10px',border:'1px solid #8794a8'}} key={1}>
                                    <img style={{width:'90px',height:'90px',float:'left'}} src={'http://localhost:5000/images?imgname='+item.aImg}/>
                                    <div className='part1' style={{display:'inline-block',marginLeft:'10px',width:'60%'}}>
                                        <p className='p1' style={{width:'80%',marginLeft:10,marginBottom:0,fontSize:18,color:'black'}}>
                                            {item.aName}
                                        </p>
                                        <p className='p2' style={{
                                            width:'80%',
                                            display: "block",fontSize:16,color:'black',
                                            textOverflow: "ellipsis", whiteSpace: "nowrap",
                                            overflow: "hidden",marginLeft:10,marginTop:0
                                            }}>
                                            {item.aContent}
                                        </p>
                                    </div>
                                </li>
                                </Link>:null
                                ))
                            }
                            </ul>

                        </div>
                        <div style={{ alignItems: 'center', justifyContent: 'center',  backgroundColor: '#fff' }}>
                            <Shop_publish/>
                            
                        </div>
                        
                    </Tabs>
                    <WhiteSpace />
                </div>
                
            </div>
        )
    }
}
