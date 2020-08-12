import React, {Component} from 'react';
import AUX from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
class OrderSummary extends Component {
    componentWillUpdate(){
        console.log('[OrderSummary] willupdate');
    }
    render(){
        const summaryIngredients = Object.keys(this.props.ingredients)
    .map(igKey => {
    return (
    <li key={igKey}> <span 
            style={{textTransform: 'capitalize'}}>
             {igKey}
         </span>: {this.props.ingredients[igKey]}
    </li>);
    });
    return(
        <AUX>
            <h3>Your order Summary</h3>
            <p>Your summary contains these ingredients:</p>
            <ul>
                {summaryIngredients}
            </ul>
         <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
        </AUX>
    );
}
}

export default OrderSummary;