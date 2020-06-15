import {BrowserRouter as Router, Route} from 'react-router-dom'
import React, {Component} from 'react';
import './App.css';
import Header from './components/layout/header'
import Todos from './components/Todo'
import AddTodo from './components/AddTodo'
import About from './components/pages/about'
import axios from 'axios'


class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('/api/getList')
     .then(res => 
       this.setState({todos: res.data}))
     .catch(error=> console.log(error));  
   }

  markComplete =(id) => {
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
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
      
    })
    .then(res => this.setState({todos: [...this.state.todos, res.data]}));// used spread syntax here because u cant just add a single entry you need to rewrite the entire state with the new entry
  }

  render(){
    
    return (//'this' refers to app.js
    <Router>
    <div className='container'>
      <div className="App">
        <Header/>
        <Route exact path='/' component={props => (
          <React.Fragment>
              <AddTodo addTodo={this.addTodo}/>
              <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/> 
          </React.Fragment>
        )}/>
        <Route path='/about' component = {About}/>
      
      </div>
      </div>
    </Router>
    );
  }
  
}

export default App;
