import *as actionTypes from './actionTypes';
import axios from '../../axios-order';
export const purchaseBurgerSuscess=(id,orderData)=>{
  return{
    type:actionTypes.PURCHASE_BURGER_SUSCESS,
    orderId:id,
    orderData:orderData

  }

}

export const purchaseBurgerFail=(error)=>{
  return{
    type:actionTypes.PURCHASE_BURGER_FAIL,
    error:error
  }
}

export const purchaseBurgerStart=()=>{
  return{
    type:actionTypes.PURCHASE_BURGER_START
  }
}
export const purchaseBurger=(orderData,token)=>{
  return dispatch=>{
    dispatch(purchaseBurgerStart())
    axios.post('/orders.json?auth='+token,orderData)
    .then(response=>
    {console.log(response.data)
     dispatch(purchaseBurgerSuscess(response.data,orderData));
    })
    .catch(error=>
    {
      dispatch(purchaseBurgerFail(error));
    });  
  }

  
}

export const purchaseInit=()=>{
  return{
    type:actionTypes.PURCHASR_INIT
  }
}

export const orderSuccess=(orders)=>{
  return{
    type:actionTypes.ORDER_SUCCESS,
    orders:orders
  }
}
export const orderFail=(error)=>{
  return{
    type:actionTypes.ORDER_FAIL,
    error:error
  }
}
export const orderStart=()=>{
  return{
    type:actionTypes.ORDER_START
  }
}
export const orders=(token,userId)=>{
  return dispatch=>{
    dispatch(orderStart());
    const queryParams='?auth='+token+'&orderBy="userId"&equalTo='+userId+'"';
    axios.get('/orders.json?auth='+ queryParams)
    .then(response=>{
      
      const fecthOrder=[];
      for(let key in response.data)
      {
        fecthOrder.push({...response.data[key],id:key})
        
      }//???????????????????
      dispatch(orderSuccess(fecthOrder))

      

    }).catch(er=>{
      dispatch(orderFail(er))
    })

  }
}