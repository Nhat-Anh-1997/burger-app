import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxilliary from '../Auxilliary';
const WithErrorHandler =(WrappedComponent,axios)=>
{
    return  class extends Component{
        state={
            error:null
        }
        componentWillMount(){
            axios.interceptors.request.use(req=>{
                this.setState({error:null})
                return req;
            })
            axios.interceptors.response.use(res=>res, error=>{
                this.setState({error:error});

            })
        }///?????????//
        errorConfirmHandler =()=>{
            this.setState({error:null})
        }
        render(){
            return(
                <Auxilliary>
                    <Modal 
                        show={this.state.error}
                        close={this.errorConfirmHandler}
                    >
                        {this.state.error?this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props} />

                </Auxilliary>
            

            )
        }
    }
};
export default WithErrorHandler;