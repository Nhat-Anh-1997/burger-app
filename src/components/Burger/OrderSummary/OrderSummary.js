import React, { Component } from 'react';

import Auxilliary from '../../../hoc/Auxilliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    componentWillUpdate(){
        console.log("[OrderSummary] componentWillUpdate");
    }
    render(){
        const burgerIngredient=Object.keys(this.props.ingredients).map(igKey=>{
            return <li key={igKey}>{igKey}:{this.props.ingredients[igKey]}</li>
        });

        return( 
            <Auxilliary >
               
                <h3>Order Burger</h3>
                <p>A delicious burger with the following ingredients:</p>
                
                <ul>
                    {burgerIngredient}
                </ul>

                <p><strong>Total Price:{this.props.price.toFixed(2)}</strong></p>
                <Button buttontype="danger" clicked={this.props.cancel}>Cancel</Button>
                <Button buttontype="success" clicked={this.props.continue}>Continue</Button>
  
            </Auxilliary>
        );
       

    }
   


}
export default OrderSummary;