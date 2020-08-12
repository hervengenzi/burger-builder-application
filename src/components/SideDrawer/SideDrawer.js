import React from 'react';
import Logo from '../Logo/Logo';
import classes from './SideDrawer.css';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import Aux from '../../hoc/Aux/Aux';
import BackDrop from '../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.open];
    }
    return(
        <Aux>
            <BackDrop show={props.open} clicked={props.closed}/>
           <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                   <Logo />
               </div>
               <nav>
                  <NavigationItems />
              </nav>
          </div>
        </Aux>
    );
}
export default sideDrawer;