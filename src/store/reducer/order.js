import *as actionTypes from '../action/actionTypes';
import {updateObject} from '../utility';
const initialState={
  orders:[],
  loading:false,
  purchase:false
}

const purchaseInit=(state,action)=>{
  return updateObject(state,{purchase:false})

}

const purchaseBurgerStart=(state,action)=>{
  return updateObject(state,{loading:true})
}

const purchaseBurgerSuscess=(state,action)=>{
  const newOrder=updateObject(action.orderData,{id:action.orderId})
    return updateObject(state,{    
      loading:false,
      purchase:true,
      orders:state.orders.concat(newOrder)})

}
const purchaseBurgerFail=(state,action)=>{
  return updateObject(state,{loading:false})
}
const orderStart=(state,action)=>{
  return updateObject(state,{loading:true})
    

}
const orderFail=(state,action)=>{
  return updateObject(state,{loading:false})

}
const orderSuccess=(state,action)=>{
  return updateObject(state,{
    orders:action.orders,
    loading:false
  })

}
const reducer =(state=initialState,action)=>{
  switch(action.type)
  { case actionTypes.PURCHASR_INIT:return purchaseInit(state,action);
    case actionTypes.PURCHASE_BURGER_START:return purchaseBurgerStart(state,action);
    case actionTypes.PURCHASE_BURGER_SUSCESS:return purchaseBurgerSuscess(state,action);
    case actionTypes.PURCHASE_BURGER_FAIL:return purchaseBurgerFail(state,action);
    case actionTypes.ORDER_START:return orderStart(state,action);
    case actionTypes.ORDER_FAIL:return orderFail(state,action);
    case actionTypes.ORDER_SUCCESS:return orderSuccess(state,action);
    default:return state;
  }
}
export default reducer;