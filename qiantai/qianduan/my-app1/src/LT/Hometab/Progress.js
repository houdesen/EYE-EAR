 
import React, { Component } from 'react';
import PropTypes from 'prop-types';
 
export default class Progress extends Component {
 
    constructor(props) {
        super(props)
    }
 
    renderProgress () {
        const progressItemStyle = {
            width: '10%',
            height: '100%'
        };
        console.log(this.props.nums);
        var ele = [];
        for (var i = 0; i < this.props.nums; i++) {
            if (i <= this.props.index) {
                ele.push(
                    <div style={Object.assign(progressItemStyle, {backgroundColor: this.props.progressColor})} key={i}></div>
                )
            } else {
                ele.push(
                    <div style={progressItemStyle} key={i}></div>
                )
            }
        }
        return ele;
    }
    render() {
        const progressStyle = {
            display: '-webkit-flex',
            color: this.props.progressColor,
            margin: '0 25px'
        };
        const progressArticleStyle = {
            height: 20,
            border: '1px solid #dabb84',
            width: '85%',
            display: '-webkit-flex',
            borderRadius: 2,
            overflow: 'hidden',
            marginTop: 8,
            marginLeft:10
        };
        return (
            <div style={progressStyle}>
                <div style={{width: '15%',fontSize:'20px'}}>
                    {this.props.index}/10
                </div>
                <div style={progressArticleStyle}>
                    {this.renderProgress()}
                </div>
            </div>
        )
    }
}
Progress.propTypes = {
    nums: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    progressColor: PropTypes.string.isRequired
};