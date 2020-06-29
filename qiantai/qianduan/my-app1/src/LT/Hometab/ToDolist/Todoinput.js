import React, { Component } from 'react'
//受控组件：value值被react控制的表单元素
//可以实时获取表单元素的值
export default class Todoinput extends Component {
    constructor(){
        super();
        this.handleInput = this.handleInput.bind(this);
        this.state={
            a:'',
            b:'',
            c:''        
        }

    }
    handleInput = (e) =>{
        if(e.keyCode === 13){
            //console.log(e.target.value);//获得输入的值
            this.props.add(e.target.value);//调用这个属性的函数
        }
    } 
    handleChange = (e) => {
        this.setState({
            // 必须加[],不然非法
            [e.target.name]:parseInt(e.target.value===''?0:e.target.value)
        })
    }
    
    render() {
        return (
            <div className={this.b+this.c>10?'box':''}>
                {/* <label htmlFor="inp">请输入第一个数：</label> */}
                {/* <i className='iconfont icon-yuyin' 
                    ></i> */}
                <input style={{borderRadius:'10px',margin:'0 auto',width:240,marginTop:6}} id="inp" name="a"  
                onChange={this.handleChange} value={this.state.input} onKeyDown={this.handleInput} type="text"/>
        
            </div>
        )
    }
}
