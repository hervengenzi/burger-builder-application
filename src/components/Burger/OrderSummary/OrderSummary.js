import React from 'react';
import AUX from '../../../hoc/Aux';
const orderSummary = (props) => {
    const summaryIngredients = Object.keys(props.ingredients)
    .map(igKey => {
    return (
    <li key={igKey}> <span 
            style={{textTransform: 'capitalize'}}>
             {igKey}
         </span>: {props.ingredients[igKey]}
    </li>);
    });
    return(
        <AUX>
            <h3>Your order Summary</h3>
            <p>Your summary contains these ingredients:</p>
            <ul>
                {summaryIngredients}
            </ul>
            <p>Continue to checkout?</p>
            <button>CANCEL</button>
            <button>CONTINUE</button>
        </AUX>
    );
    };

export default orderSummary;