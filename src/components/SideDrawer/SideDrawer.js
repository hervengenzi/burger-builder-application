import React from 'react';
import Logo from '../Logo/Logo';
import classes from './SideDrawer.css';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import Hux from '../../hoc/Aux/Hux';
import BackDrop from '../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.open];
    }
    return(
        <Hux>
            <BackDrop show={props.open} clicked={props.closed}/>
           <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                   <Logo />
               </div>
               <nav>
                  <NavigationItems />
              </nav>
          </div>
        </Hux>
    );
}
export default sideDrawer;