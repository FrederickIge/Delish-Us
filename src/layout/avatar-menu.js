import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Dropdown from 'rc-dropdown';
import 'rc-dropdown/assets/index.css';
import Headroom from 'react-headroom';
import Fade from '@material-ui/core/Fade';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  typography: {
    padding: theme.spacing.unit * 2,
  },
});

@inject('routingStore', 'sessionStore', 'spotStore')
@observer
class AvatarMenu extends Component {

    routingStore = this.props.routingStore;
    sessionStore = this.props.sessionStore;
    spotStore = this.props.spotStore;

    state = {
        anchorEl: null,
    };

    handleClick = event => {
        console.log(event.currentTarget)
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

  render() {

    const { anchorEl } = this.state;

    return (
        <span>
            <Button
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
                <MenuItem onClick={this.handleClose}>
                <Link style={{ textDecoration: 'none' }} to="/account">
                    Account
                </Link>
                </MenuItem>

            </Menu>
        </span>
    );
  }
}
export default AvatarMenu;
