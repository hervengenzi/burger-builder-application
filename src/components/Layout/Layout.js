import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showClosed: true,
    };
    showClosedHandler = () => {
        this.setState({showClosed: false});
    }

    render(){
        return(
            <Aux>
            <Toolbar />
            <SideDrawer open={this.state.showClosed} closed={this.showClosedHandler} />
                  <main className={classes.Content}>
                     {this.props.children}
                  </main>
        </Aux>
        );
    }
}

export default Layout;