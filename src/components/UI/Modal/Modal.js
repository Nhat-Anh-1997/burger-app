import React, { Component } from 'react';
import  classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
class Modal extends Component{
    shouldComponentUpdate(nextProps, nextState)
    {
        return nextProps.show !== this.props.show||nextProps.children !== this.props.children;
    }
    componentWillUpdate(){
        console.log("[Modal] componentWillUpdate");
    }
    render(){
        
        return(
            <div>
                <Backdrop
                    show={this.props.show}
                    click={this.props.close}
                />
                {/* props.show false : không hiện OrderSummary */}

                <div
                    className={classes.modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
            
                {this.props.children}
                </div>
        
            </div>

        );
    }
}
export default Modal;