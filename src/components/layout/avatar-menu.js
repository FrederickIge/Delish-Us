import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import {auth} from '../../firebase';

const styles = theme => ({
  typography: {
    padding: theme.spacing.unit * 2,
  },
});

@inject('routingStore', 'sessionStore', 'spotStore','uiStore')
@observer
class AvatarMenu extends Component {

    routingStore = this.props.routingStore;
    sessionStore = this.props.sessionStore;
    spotStore = this.props.spotStore;
    uiStore = this.props.uiStore;
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    goToMyProfile = () => {
        this.routingStore.history.push({pathname: '/users/' + this.sessionStore.authUser.uid});
    }

  render() {

    const { anchorEl } = this.state;

    return (
        <span>
            <Button
                style ={{ }}
                id ="avatar"
                disableRipple={true}
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
            >
                {this.sessionStore.authUser.photoURL ?
                    <img className="rounded-circle avatar-image--icon" src={this.sessionStore.authUser.photoURL} alt="Logo" />
                    : <i class="fa fa-user fa-2x" aria-hidden="true"></i>}
                
            </Button>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
            >

<MenuItem onClick={this.goToMyProfile}>
                
                My Profile
           
                </MenuItem>
                <MenuItem onClick={this.handleClose}>

                <Link style={{ textDecoration: 'none' }} to="/account">
                    Settings
                </Link>
                </MenuItem>

                <MenuItem onClick={auth.doSignOut}>
                
                    Sign Out
               
                </MenuItem>



            </Menu>
        </span>
    );
  }
}
export default AvatarMenu;
