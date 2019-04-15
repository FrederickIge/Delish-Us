import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

const UserCard = styled.div`
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
transition: all 0.3s cubic-bezier(.25,.8,.25,1);
padding: 8px;
border-radius: 11px;
background-color: white;
min-height:120px;
margin-top:10px;
word-wrap: break-word;
&:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
`;

@inject('sessionStore', 'spotStore', 'uiStore', 'fireStore', 'userStore')
@observer
class MobileUserList extends Component {

    sessionStore = this.props.sessionStore;
    userStore = this.props.userStore;

    handleClick(user){
        this.props.history.push({
            pathname: '/users/' + user.userId,
            state: { prevPath: "users" }
        });
        this.userStore.selectedUser = {
            username: user.username,
            email: user.email
        }
    }

    handleBack = () => {
        this.props.history.push('/dashboard');
      };

    render() {
        return (


            <div className="container d-lg-none position-relative" >
             <div style={{height: '20px'}} />
            <div onClick={this.handleBack} style={{ fontSize: "20px", cursor: "pointer", color:"black"  }}>
                        <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                    </div>
                <div className="row row-eq-height">
                    {this.userStore.allUsers.map(user => (
                        <React.Fragment key={user.userId}>
                            <div className="col-sm-4">
                                <UserCard className="pl-3" onClick={() => this.handleClick(user)} >
                                    <h3>{user.username}</h3>
                                    <div>{user.email}</div>                               
                                </UserCard>
                            </div>
                        </React.Fragment>
                    ))}
                    <div style={{height:"100px"}}></div>
                </div>
                <div style={{height:"100px"}}></div>
            
            </div>



        )
    }
}

export default MobileUserList;
