import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Redirect, Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

const Checkout=(props)=>{

  const checkoutCancel =()=>{
    props.history.goBack();
  }

  
  const checkoutContinue =()=>{
    props.history.replace('/checkout/contact-data')
  }
  /* componentWillMount(){
    const query=new URLSearchParams(this.props.location.search);
    const ingredients={};
    let price=0;  
    for(let param of query.entries()){
      if(param[0]==='price')
      {
        price=param[1];

      }else{
        ingredients[param[0]]= +param[1];

      }
      

    }
    this.setState({ingredients:ingredients,totalPrice:price});
  } //????? */

 
  let sumary=<Redirect to='/'/>
  if(props.ings)
  
  { const purchaseRedirect=props.purchase? <Redirect to='/'/>:null
    sumary= (
      <div>
        {purchaseRedirect}
      <CheckoutSummary 
        ingredients={props.ings}
        checkoutCancel={checkoutCancel}
        checkoutContinue={checkoutContinue}
      
      />
      <Route 
        path={props.match.path+'/contact-data'} 
        component={ContactData}/>
      </div>)

      
  }

  return(
    <div>
      {sumary}
      
    </div>
  );

  
}
const mapStateToProps=state=>{
  return{
    ings:state.bur.ingredients,
    purchase:state.ord.purchase
  }

}


export default connect(mapStateToProps)(Checkout);   