var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');
var dbHelper = require('../util/dbHelper');
var Loading = require('./Loading');
var UserTable = require('./UserTable');

var Home = React.createClass({
  getInitialState: function () {
    this.getUsers();
    return {
      isLoading: true,
      users: [],
      showModal: false,
      maxid: 0,
    }
  },
  close() {
    this.setState({ showModal: false });
  },
  open() {
    this.setState({ showModal: true });
  },
  register() {
    id = this.state.maxid + 1;
    var doc = {
      _id: id.toString(),
      name: ReactDOM.findDOMNode(this.refs.name).value,
      email: ReactDOM.findDOMNode(this.refs.email).value,
      addr: ReactDOM.findDOMNode(this.refs.addr).value,
      phone: ReactDOM.findDOMNode(this.refs.phone).value,
    };
    dbHelper.addUser(doc).then(function () {
      
    })
    this.setState({ showModal: false });
    this.getUsers();
  },
  getUsers: function() {
    dbHelper.getUsers().then(function (docs) {
      return docs.map(function (doc) {
        return dbHelper.docToJSON(doc.doc);
      })
    })
    .then(function (users) {
      var maxid = 0;
      users.map(function (user) {
        if (Number(user.id) > maxid) {
          maxid = Number(user.id);
        }
      })
      this.setState({
        isLoading: false,
        users: users,
        showModal: false,
        maxid: maxid,
      })
    }.bind(this));
  },
  componentDidMount: function () {
    dbHelper.localDB.sync(dbHelper.remoteDB, {
      live: true,
      retry: true,
      include_docs: true
    }).on('change',  function () {
      this.getUsers();
    }.bind(this));
  },  
  render: function () {
    var Button = ReactBootstrap.Button;
    var Modal = ReactBootstrap.Modal;
    var FormGroup = ReactBootstrap.FormGroup;
    var FormControl = ReactBootstrap.FormControl;
    var ControlLabel = ReactBootstrap.ControlLabel;
    return this.state.isLoading === true
        ? <Loading />
      : <div ref='root'>
        <h1>Welcome to my PouchDB test page!</h1>
        <Button bsStyle="primary" onClick={this.open}>Register User</Button>
        <UserTable users={this.state.users}/>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>User Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup controlId="formValidationSuccess1" validationState="success">
              <ControlLabel>Input your name:</ControlLabel>
              <FormControl ref="name" type="text" />
            </FormGroup>
            <FormGroup controlId="formValidationSuccess2" validationState="success">
              <ControlLabel>Input your email:</ControlLabel>
              <FormControl ref="email" type="text" />
            </FormGroup>
            <FormGroup controlId="formValidationSuccess3" validationState="success">
              <ControlLabel>Input your address:</ControlLabel>
              <FormControl ref="addr" type="text" />
            </FormGroup>
            <FormGroup controlId="formValidationSuccess4" validationState="success">
              <ControlLabel>Input your phoneNo:</ControlLabel>
              <FormControl ref="phone" type="text" />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" onClick={this.register}>Register</Button>
            <Button bsStyle="warning" onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div> 
  }
});

module.exports = Home;