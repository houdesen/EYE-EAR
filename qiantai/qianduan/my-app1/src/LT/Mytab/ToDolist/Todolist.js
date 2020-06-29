import React, { Component } from 'react'
import Todoing from './Todoing'
import Todoinput from './Todoinput'
import './todo.css'

export default class Todolist extends Component {
    constructor(){
        super();
        this.state={
            todo:[],
            a:100,
            b:100
        }
    }
    addItem = (data) => {
        //this.state.todo.push(data);
        this.setState({
            todo:[...this.state.todo,data]
        })
    }
    delItem = (idx)=>{ 
       
        let todo = [...this.state.todo]//拷贝
        todo.splice(idx,1);
    
    }
    render() {
        return (
            <div>
                {/* <Todoing todo={this.state.todo} del={this.delItem}/> */}
                <Todoinput add={this.addItem}/>
            </div>
        )
        
    }
}
