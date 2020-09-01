import React, { Component } from 'react';
import Hux from '../Hux/Hux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showClosed: false,
    };
    showClosedHandler = () => {
        this.setState({showClosed: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showClosed: !prevState.showClosed};
        });
    }

    render(){
        return(
            <Hux>
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer open={this.state.showClosed} closed={this.showClosedHandler} />
                  <main className={classes.Content}>
                     {this.props.children}
                  </main>
        </Hux>
        );
    }
}

export default Layout;