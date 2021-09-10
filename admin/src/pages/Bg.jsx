
import ParticlesBg from 'particles-bg'

import React, { Component } from 'react'

export default class Bg extends Component {

    constructor(props){
        super(props)
        this.state = {height:1000};
        this.scrollTop = 0;
        // this.handleScroll = this.handleScroll.bind(this)
 
    }

    componentDidMount() {

        // 监听滚动
         window.addEventListener('scroll', this.handleScroll)
        
        
        }
        
    componentWillUnmount() {
        
        // 一定要最后移除监听器，以防多个组件之间导致this的指向紊乱
        
        window.removeEventListener('scroll', this.handleScroll)
        
        
        }
        
 
        
     handleScroll = e =>{
            this.setState({height:e.srcElement.scrollingElement.scrollHeight})
            
        } 
    


    render() {
        const {height} =this.state
        // const num = Math.ceil(height/10)
        return (
            
            <div>
                <ParticlesBg 
                type="circle"
                // num ={num}
                bg={{
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
                height:height
                }}  
                />

            </div>
        )
    }
}

