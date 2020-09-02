import {BrowserRouter as Router, Route} from 'react-router-dom'
import React, {Component} from 'react';
import './App.css';
import Header from './components/layout/header'
import Todos from './components/Todo'
import AddTodo from './components/AddTodo'
import About from './components/pages/about'
import axios from 'axios'
import signUp from './components/pages/signUp'
import logIn from './components/SignIn/index'
import * as ROUTES from './constants/routes'
import Firebase, {withFirebase} from './components/firebase'
import { AuthUserContext } from './components/session'
import { app } from 'firebase';
import {v4 as uuidv4} from 'uuid'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {todos: [],
    authUser: null}
  }
  
  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
        if (this.state.authUser) {
        this.props.firebase.db.collection(this.state.authUser.uid).doc('todos').get()
        .then(doc => this.setState({todos: doc.data().todos}))
        } else {
          console.log("ormygod")//need to figure out what to do if they sign out, etc
        }
    })
   
   }

   componentWillUnmount() {
     this.listener()
   }

  markComplete =(id) => {
    let docRef = this.props.firebase.db.collection(this.state.authUser.uid).doc('todos')
    docRef.update()
    this.setState({todos: this.state.todos.map(todo=> {
      if(todo.id === id) {
        todo.completed = !todo.completed
      
      }
      return todo
    })})
  }

  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res=> this.setState({todos: this.state.todos.filter(todo => todo.id !== id)}))
      
  }

  addTodo = (title) => {
    let docRef = this.props.firebase.db.collection(this.state.authUser.uid).doc('todos')
    docRef.update(
      {
        todos: [...this.state.todos, {
          id: uuidv4(),
          title,
          completed: false
        }]
      }
    )
    .then(docRef.get().then(doc => this.setState({todos: doc.data().todos})));// used spread syntax here because u cant just add a single entry you need to rewrite the entire state with the new entry
  }

  render(){
    
    return (//'this' refers to app.js
    <AuthUserContext.Provider value={this.state.authUser}>
    <Router>
    <div className='container'>
      <div className="App">
        <Header />
        <Route exact path='/mylist' component={props => (
          <React.Fragment>
              <AddTodo addTodo={this.addTodo}/>
              <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/> 
          </React.Fragment>
        )}/>
        <Route path='/about' component = {About}/>
        <Route exact path={ROUTES.LANDING} component = {signUp}/>
        <Route path={ROUTES.SIGN_IN} component = {logIn}/>
      
      </div>
      </div>
    </Router>
    </AuthUserContext.Provider>
    );
  }
  
}

export default withFirebase(App);
