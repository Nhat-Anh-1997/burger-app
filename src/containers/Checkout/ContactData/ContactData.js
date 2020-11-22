import React,{useState} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import *as actionCreators from '../../../store/action/index';


const ContactData =(props)=>{
  const [orderForm,setOrderForm]=useState({
    name:{
      elementType:'input',
      elementConfig:{
        type:'text',
        placeholder:'Your Name'
      },
      value:'',
      validation:{
        required:true,
        minLength:5,
        maxLength:20
      },
      valid:false,
      touched:false,
      
    },
    email:{
      elementType:'input',
      elementConfig:{
        type:'email',
        placeholder:'Your Email'
      },
      value:'',
      validation:{
        required:true
      },
      valid:false,
      touched:false,
    },
    address:{
      elementType:'input',
      elementConfig:{
        type:'text',
        placeholder:'Your Address'
      },
      value:'',
      validation:{
        required:true
      },
      valid:false,
      touched:false,
    
    },
    deliver:{
      elementType:'select',
      elementConfig:{
        options:[
          
          {value:'cheapest', displayValue:'Cheapest'}, 
          {value:'fastest', displayValue:'Fastest'},
        ]
      },
      value:'cheapest', 
      validation:{
      },
      valid:true
    }
  })

  const [formIsValid,setFormIsValid]=useState(false);

 

  const orderHandler=(event)=>{
    event.preventDefault(); //không gửi form đến nơi cần xử lý khi click button Order
    const formData={};
    for(let formElementIdenti in orderForm)
    {
      formData[formElementIdenti]=orderForm[formElementIdenti].value; 
    }//formData{} include value of value property trong state
    const order={
      ingredients:props.ings,
      price:props.price.toFixed(2),
      orderData:formData,
      userId:props.userId
    }
    props.onPostOrderData(order,props.token);
    
     
  }
  //send "order" data to server/order.json
 
  const  inputChangeHandler=(event,inputId)=>{
    
    const updateOrderForm={
      ...orderForm
    };
    const updateFormElement={
      ...updateOrderForm[inputId]
    }
    updateFormElement.value=event.target.value; //onChange value = change
    updateFormElement.valid=checkValidation(updateFormElement.value,updateFormElement.validation);
    updateFormElement.touched=true;
    updateOrderForm[inputId]=updateFormElement;
    let formIsValid=false;
    for (let key in updateOrderForm)
    {
      formIsValid=updateOrderForm[key].valid&&formIsValid; //result????????????
    }
    console.log(formIsValid);
    setOrderForm(updateOrderForm);
    setFormIsValid(formIsValid)

  }

  const  checkValidation=(value, rules)=>{ //input dynamic theo điêu kiện
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
  
 
  
  
  const formElementArray=[];
  for(let key in orderForm){
    formElementArray.push({
      id:key,
      config:orderForm[key]
    })
  }
  /// chuyển state.orderForm thành Array
  
  let form=(
  <form onSubmit={orderHandler}>
    {formElementArray.map(formElement=>{
      return <Input 
        key={formElement.id}
        elementType={formElement.config.elementType}
        value={formElement.config.value}  
        elementConfig={formElement.config.elementConfig}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched ={formElement.config.touched}
        changed={(event)=>inputChangeHandler(event,formElement.id)}/>
    })}
    <Button buttontype='success'  /* disabled={!state.formIsValid} */ >Order</Button> {/* vì Button inside form so không load được phải dùng event */}
  </form>);
  if(props.loading)
  {
    form=<Spinner/>
  }
  return(
    
  <div className={classes.contactData}>
    <h4>Enter your contact data</h4>
    {form}
    
  </div>
  )
}
const mapStateToProps = state =>{
  return{
    ings:state.bur.ingredients,
    price:state.bur.totalPrice,
    loading:state.ord.loading,
    token:state.auth.token,
    userId:state.auth.userId
  }
}
const mapDispatchToProps=dispatch=>{
  return{
    onPostOrderData:(orderData,token)=>dispatch(actionCreators.purchaseBurger(orderData,token))

  }
  
}

export default connect(mapStateToProps,mapDispatchToProps) (WithErrorHandler(ContactData,axios));