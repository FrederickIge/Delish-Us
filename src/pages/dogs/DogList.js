import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {compose} from 'recompose';
import posed from 'react-pose';
import firebase from 'firebase';
import { faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/lib/Modal'

import withAuthorization from '../../components/hoc/withAuthorization';

const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});

const Slide = posed.div({
  enter: {x: 0, opacity: 1},
  exit: {x: -50, opacity: 0}
});

class Dogs extends Component {
  onClick = this.props.handleShow
  render() {
   

    return (
      <div>
        {this.props.dogs.map((dog) => (
        <div key={dog.key} className="col-md-4 hvr-grow ">
          <div className="card shadow-lg mb-3 quote-card ">
          
            <div className="card-body text-dark">
            <div className="d-flex flex-row-reverse">
           
        {this.props.editable ? <FontAwesomeIcon className="icon-layers text-primary fa-lg ml-auto" onClick={() => this.onClick(dog)} icon={faPencilAlt} /> : null }   

            </div>         
              <h5 className="card-title">{dog.name}</h5>
              <img src={dog.picture} className="img-fluid rounded mx-auto d-block my-dog" />
              <p>{dog.description}</p>
            </div>
          </div>
        </div>
        ))}
    </div>
    );
  }
};

@inject('routingStore','sessionStore')
@observer
class DogList extends Component {

  sessionStore = this.props.sessionStore;
  routingStore = this.props.routingStore;

  userId = null

  state = {
    dogs: [],
    userName: null,
    show: false,
    selectedDogName: "",
    selectedDogDescription: "",
    id: null,
    editable: false
  };



  handleShow = (dog) => {
    if(!dog.description){
      dog.description = ""
    }
    this.setState({ show: true, selectedDogName:dog.name, selectedDogDescription:dog.description, id: dog.key});
  };

  handleHide = () => {
    this.setState({ show: false });
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  getMyDogs = (event) => {
    const dogs = [];
    db.collection('dogs')
      .where('owner', '==', this.userId )
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const {picture, name, owner, description} = doc.data();
          dogs.push({
            key: doc.id,
            picture,
            owner,
            name,
            description
          });
        });
        this.setState({dogs: dogs});
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error);
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    db.collection('dogs').doc(this.state.id).update({
      name: this.state.selectedDogName,
      description:this.state.selectedDogDescription
    }).then( data =>{
      console.log('dog updated')
      this.setState({ show: false });
      this.getMyDogs();
    })
    .catch(data=>{
      console.log("error updating dog")
    })
  };

  componentDidMount() {
    this.userId = this.props.match.params.id
    if(this.userId != this.sessionStore.authUser.uid){

      var docRef = db.collection("users").doc(this.userId).get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data().displayName);
            let displayName =  doc.data().displayName
            this.setState({userName: displayName})
        } else {
          
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    }
    else{
      this.setState({editable:true})
    }
    this.getMyDogs();
  }

  render() {

    const title = this.userId == this.sessionStore.authUser.uid ? <h2 className="text-center dashboard-header">My Dogs</h2> : <h2 className="text-center dashboard-header">{this.state.userName}'s Dogs</h2>;

    return <Slide>
        <div className="container container-dashboard ">
          <div className="spacer" />
          <div className="search-container">
            {title}
            <div className="spacer" />

            <Dogs dogs={this.state.dogs} handleShow={(dog)=>this.handleShow(dog)} editable={this.state.editable} />
          </div>
        </div>

      <Modal show={this.state.show} onHide={this.handleHide} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {this.state.selectedDogName}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <input
                className="form-control form-control-lg"
                placeholder="Doggie Name"
                type="text"
                value={this.state.selectedDogName}
                name="selectedDogName"
                onChange={this.handleChange}
              />
            </div>
            <br></br>
            <div className="row">
              <textarea onChange={this.handleChange} value={this.state.selectedDogDescription} className="form-control" name="selectedDogDescription" rows="3" placeholder="Doggie Description (Optional)"></textarea>
            </div>
            <br></br>
            <div className="row">
              <button type="submit" className="btn btn-success btn-block" >
                Save
            </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>


      </Slide>;
  }
}
const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition))(DogList);
