import React, { Component } from 'react';
import { NavBar, Icon, Tabs, Carousel, Grid, Drawer, List, SegmentedControl, WhiteSpace, Button, Pagination } from 'antd-mobile';
import { HashRouter as Router, withRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
const tabs = [
    { title: '详情' },
    { title: '购买须知' },
];
const locale = {
    prevText: '-',
    nextText: '+',
};
var num = 1;

export default class Shop_detail_one extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data1: [],
            data2: [],
            data3: [],
            data4: [],
            imgHeight: 200,
            open: true
        }
    }
    componentDidMount() {
        console.log(this.props.match.params.id)
        fetch('http://localhost:5000/detail1?id=' + this.props.match.params.id, {
            "method": "get",
            // params:JSON.stringify({"id":1})
            // headers: {'Content-Type': 'application/json; charset=utf-8'},
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                console.log(this.state.data)
                this.setState({
                    data: res[0]
                })

                this.setState({
                    data1: [this.state.data.img1, this.state.data.img2]
                })
                this.setState({
                    data2: this.state.data.place1.split('、')
                })
                this.setState({
                    data3: this.state.data.place2.split('、')
                })
                this.setState({
                    data4: this.state.data.money.split('、')
                })

            }
            )
    }
    click = () => {
        var tName = this.state.data.tName
        var tPrice = this.state.data4[0]
        var tImg=this.state.data.tImg

        // var num=
        console.log(num)
        fetch('http://localhost:5000/cart1', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({
                tName,
                tPrice,
                tImg
            })
        })
            .then(res => res.json())
            .then(res => {
                // this.setState({
                //     data1:res
                // })
            })
    }
    //获取父级对像

    render() {
        return (
            <div style={{width: '100%',height:'108%',backgroundColor: '#fff',zIndex:999,position:'absolute',overflow:'auto'}}>
                <NavBar mode="light" style={{ background: '#8794a8', color: 'black' }}
                    leftContent={[
                        <Link to='/apphome' style={{ color: 'black' }}><i style={{ fontSize: 22, lineHeight: '22px', marginLeft: '-10px' }} className='iconfont icon-fanhui'></i></Link>,
                    ]}
                    onLeftClick={this.onOpenChange}
                    rightContent={[
                        <Link to='/apphome/shoptab/cart' style={{ color: 'black' }}><i style={{ fontSize: 22, lineHeight: '22px', marginRight: '8px' }} className='iconfont icon-gouwuche'></i></Link>

                    ]}
                ></NavBar>
                <div>
                    <Carousel
                        autoplay={true}
                        infinite
                        // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        // afterChange={index => console.log('slide to', index)}
                        style={{ width: '100%', height: this.state.imgHeight, margin: '0 auto' }}
                    >
                        {this.state.data1.map(val => {
                            return <a
                                key={val}
                                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                            >

                                <img
                                    src={'http://localhost:5000/images?imgname=' + val}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top' }}   //图片记得写上宽度百分之百
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        // this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                            </a>
                        })}
                    </Carousel>
                    <p style={{ width: '90%', margin: '30px auto' }}>{this.state.data.tContent}</p>
                </div>
                <div style={{ width: '90%', margin: '0 auto', border: '0px solid #8794a8', marginTop: '20px' }}>
                    <h1 style={{ margin: '0 auto', fontSize: '25px' }}>城市</h1> <SegmentedControl
                    values={this.state.data2}
                    tintColor={'#8794a8'}
                    style={{ height: '40px', width: '250px' }}
                />
                </div>
                <div style={{ width: '90%', margin: '0 auto', border: '0px solid #8794a8' }}><h1 style={{ margin: '0 auto', fontSize: '25px' }}>场次</h1> <SegmentedControl
                    values={this.state.data3}
                    tintColor={'#8794a8'}
                    style={{ height: '40px', width: '250px' }}
                />
                </div>
                <div style={{ width: '90%', margin: '0 auto', border: '0px solid #8794a8' }}><h1 style={{ margin: '0 auto', fontSize: '25px' }}>票价</h1> <SegmentedControl
                    values={this.state.data4}
                    tintColor={'#8794a8'}
                    style={{ height: '40px', width: '250px' }}
                />
                </div>
                <div style={{ width: '90%', margin: '0 auto', marginTop: '20px', color: 'white' }}>
                    <Pagination total={'20000'} current={1} locale={locale} id='num' />
                    <p>+</p><span>-</span>
                </div>

                <Button style={{ width: '90%', margin: '0 auto', backgroundColor: '#ccc0d4', marginTop: '5px', color: 'white' }}>立即购买</Button>
                <Link to='/apphome/shoptab/cart'><Button style={{ width: '90%', margin: '0 auto', backgroundColor: '#ccc0d4', marginTop: '20px', color: 'white' }} onClick={this.click}>加入购物车</Button></Link>


                <div>
                    <WhiteSpace />
                    <Tabs tabs={tabs} initialPage={2} animated={false} useOnPan={true} initialPage={0}>
                        <div style={{ alignItems: 'center', justifyContent: 'center', height: '350px', backgroundColor: '#fff' }}>
                            <ul style={{ listStyle: 'none', margin: '10px auto' }}>
                                <li style={{ height: 'auto', width: '100%', margin: '10px auto' }} >
                                    <img style={{ height: 'auto', width: '100%', margin: '0px auto' }} src={'http://localhost:5000/images?imgname=' + this.state.data.img_1} />
                                    <div dangerouslySetInnerHTML={{ __html: this.state.data.detail1 }}></div>
                                </li>
                                <li style={{ height: 'auto', width: '100%', margin: '20px auto' }} >
                                    <img style={{ height: 'auto', width: '100%', margin: '0px auto' }} src={'http://localhost:5000/images?imgname=' + this.state.data.img_2} />
                                    <div dangerouslySetInnerHTML={{ __html: this.state.data.detail2 }}></div>
                                </li>
                                <li style={{ height: 'auto', width: '100%', margin: '20px auto' }} >
                                    <img style={{ height: 'auto', width: '100%', margin: '0px auto' }} src={'http://localhost:5000/images?imgname=' + this.state.data.img_3} />
                                    <div dangerouslySetInnerHTML={{ __html: this.state.data.detail3 }}></div>
                                </li>
                            </ul>
                        </div>

                        <div style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '350px', backgroundColor: '#fff' }}>
                            <div dangerouslySetInnerHTML={{ __html: this.state.data.need }}></div>
                        </div>
                    </Tabs>
                    <WhiteSpace />
                </div>
            </div>
        )
    }

}
