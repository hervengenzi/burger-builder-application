import React from 'react';
import burgerLogo from '../../assets/Images/burger.png';
import classes from './Logo.css';
const logo = (props) => (

    <div className={classes.Logo}>
        <img src={burgerLogo} alt="My burger" className={classes.img}/>
    </div>
);

export default logo;