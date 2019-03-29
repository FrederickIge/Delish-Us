import { withRouter } from "react-router";
import React, {Component} from "react";

class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
      if (this.props.location.pathname !== prevProps.location.pathname) {
        window.scrollTo(0, 0);
      }
    }
  
    render() {
      return this.props.children;
    }
  }
  
  export default withRouter(ScrollToTop);