import React, {Component} from 'react';
import PropTypes from 'prop-types'


export class TodoItem extends Component {
    getStyle = () => {
        return {
            backgroundColor: '#f4f4f4',
            padding: '10px',
            textDecoration: this.props.todo.completed ? 'line-through' : 'none',
            borderBottom: '1px #ccc dotted',

        }
    }
    
render() {
    const {id, title} = this.props.todo
  return (
      <div style={this.getStyle()}>
          <p>
            <input type="checkbox" onChange={this.props.markComplete.bind(this, id)}/>
            {title}
            <button onClick = {this.props.delTodo.bind(this, id)} style={btnstyle}>x</button>
          </p>
      </div>
  )//pass the id of the todo to the mark complete method
}
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}

const btnstyle = {
    background: '#ff0000',
    color: 'white',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}
export default TodoItem;
