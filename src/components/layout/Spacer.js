import React, { Component } from 'react';
import styled from 'styled-components';

const Space = styled.div`
height: 20px;
`;

class Spacer extends Component {



    render(){
        return(
            <Space className="d-none d-lg-block" />
        )
    }

}


export default Spacer;
