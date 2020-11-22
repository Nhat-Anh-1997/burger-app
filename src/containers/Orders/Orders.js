import React ,{useEffect} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import *as actionCreators from '../../store/action/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
const Orders=(props)=>{

  useEffect(()=>{
    props.onOrders(props.token,props.userId);
  },[]);
  
  let order=<Spinner/>;
  if(!props.loading)
  {
    order=props.orders.map(order => {
      return <Order 
        key={order.id+1}
        ingredients={order.ingredients}
        price={order.price}/>
    })
  }

  return(
    <div>
      {order}
    </div>
    
  );
  

}
const mapStateToProps=state=>{
  return{
    loading:state.ord.loading,
    orders:state.ord.orders,
    token:state.auth.token,
    userId:state.auth.userId
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    onOrders:(token,userId)=>dispatch(actionCreators.orders(token,userId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (WithErrorHandler(Orders,axios))  ;
