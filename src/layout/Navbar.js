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
import AvatarMenu from './avatar-menu'
const styles = theme => ({
  typography: {
    padding: theme.spacing.unit * 2,
  },
});

@inject('routingStore', 'sessionStore', 'spotStore')
@observer
class Navbar extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  routingStore = this.props.routingStore;
  sessionStore = this.props.sessionStore;
  spotStore = this.props.spotStore;

  onSelect = ({key}) => {
    let uid = this.sessionStore.authUser.uid
    if(key == "/doglist"){
     this.routingStore.push('/doglist/' + uid)
    }
    else{
      this.routingStore.push(key);
    }
  };

  componentDidMount(){
    console.log(this.spotStore)
  }

  render() {

    const { anchorEl } = this.state;

    const NavigationNonAuth = () => (
      <nav  className="navbar navbar-expand-lg py-3">
        <div className="container">

        <Link style={{ textDecoration: 'none' }} to="/dashboard">
            {/* <FontAwesomeIcon className="icon-layers  fa-2x globe" icon={faGlobeAfrica} /> */}
            <img style={{ height: '25px', paddingBottom:"3px" }} className="img-fluid" src={require("../img/compass.png")} alt="Logo" />

          <b style={{  marginLeft:"10px" }}>DELISH-US</b>  
          </Link>

          <div>

          <Link style={{ textDecoration: 'none' }} to = "/login" className="ml-auto mr-3 nav-text-style">   
                <b>LOGIN</b>     
          </Link>

          </div>
        </div>
      </nav>
    );

    const NavigationAuth = (props) => (
      <nav className="navbar navbar-expand-lg py-3">
        <div className="container">
        
          <Link style={{ textDecoration: 'none' }} to="/dashboard">
            <img style={{ height: '25px', paddingBottom:"3px" }} className="img-fluid" src={require("../img/compass.png")} alt="Logo" />
            <b style={{  marginLeft:"10px" }}>DELISH-US</b>  
          </Link>
          <div>

            <span style={{ textDecoration: 'none', color:"#1890ff" }} onClick={this.spotStore.toggleView} className="ml-auto mr-3 nav-text-style">
              {props.mapView ? <b>LIST VIEW</b> : <b>MAP VIEW</b>} 
            </span>



            <AvatarMenu/>



          </div>

        </div>
      </nav>
    );

    return (
      <Headroom>
        <div id="app-navbar" className="doggo-nav">
          {this.sessionStore.authUser ? <NavigationAuth mapView = {this.spotStore.mapView } photoURL={this.sessionStore.authUser.photoURL} /> : <NavigationNonAuth />}
        </div>
      </Headroom>
    );
  }
}
export default Navbar;
