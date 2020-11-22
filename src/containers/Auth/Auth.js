import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import *as actionCreators from '../../store/action/index';
import {connect}from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
class Auth extends Component{
  state={
    controls:{
      email:{
        elementType:'input',
        elementConfig:{
          type:'email',
          placeholder:'Mail Address'
        },
        value:'',
        validation:{
          required:true,
          isEmail:true
        },
        valid:false,
        touched:false,
        
      },
      password:{
        elementType:'input',
        elementConfig:{
          type:'password',
          placeholder:'Password'
        },
        value:'',
        validation:{
          required:true,
          minLength:7
        },
        valid:false,
        touched:false,
        
      },
     

    },
    isSignup:true
  }
  componentDidMount(){
    if(!this.props.building&&this.props.authRedirectPath!=='/')
    {
      this.props.onSetAuthRedirectPath(); 
    }
  }

  switchAuthModeHandler=()=>{
    this.setState(prevState=>{
      return{
        isSignup:!prevState.isSignup
      }
    })
  }

  
  inputChangeHandler=(event,controlName)=>{
    
    const updatedControls={
      ...this.state.controls,
      [controlName]:{
        ...this.state.controls[controlName],
        value:event.target.value,
        valid:this.checkValidation(event.target.value,this.state.controls[controlName].validation),
        touched:true

      }
    };
    this.setState({controls:updatedControls});
 
  
   

  }

  checkValidation=(value, rules)=>{ //input dynamic theo điêu kiện
    let isValid=true;
    if(!rules)
    {
      return true;
    }
    if(rules.required){
      isValid=value.trim() !== '' &&isValid ;
    }
    if(rules.minLength)
    {
      isValid=value.length >=rules.minLength&& isValid;
    }
    if(rules.maxLength)
    {
      isValid=value.length <=rules.maxLength&&isValid;
    }
    return isValid;

  }

  submitHandler=(event)=>{
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
  }
  render(){
    const formElementArray=[];
    for(let key in this.state.controls){
      formElementArray.push({
        id:key,
        config:this.state.controls[key]
      })
    
    }
    


    let form=formElementArray.map(formElement=>(
        <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        value={formElement.config.value}  
        elementConfig={formElement.config.elementConfig}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched ={formElement.config.touched}
        changed={(event)=>this.inputChangeHandler(event,formElement.id)}
      />
     
    ))

 
    if(this.props.loading)
    {
      form=<Spinner/>
    }
    let errorMessage=null;
    if(this.props.error){
      errorMessage=(<p>{this.props.error.message}</p>)
    }
    
    let authRedirect=null;
    if(this.props.isAuthed){
      authRedirect=<Redirect to ={this.props.authRedirectPath}/>
    }
    return(
      <div className={classes.auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
        {form}
        <Button buttontype="success" type='submit'>SUBMIT</Button>
       
        </form>
        <Button 
          buttontype="danger"
          clicked={this.switchAuthModeHandler}
          >SWITCH TO {this.state.isSignup?'SIGNIN':'SIGNUP'}
        </Button>
       

      </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    loading:state.auth.loading,
    error:state.auth.error,
    isAuthed:state.auth.token!==null,
    building:state.bur.building,
    authRedirectPath:state.auth.authRedirect
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    onAuth:(email,password,isSignup)=>dispatch(actionCreators.auth(email,password,isSignup)),
    onSetAuthRedirectPath:()=>dispatch(actionCreators.setAuthRedirectPath('/'))
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (Auth);