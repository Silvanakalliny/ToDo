import React from 'react';
//functional component - return works the same way render does
import {Link} from 'react-router-dom';
import SignOutButton from '../SignOut'
import {AuthUserContext} from '../session'

const Navigation = () => (
    <div>
    <AuthUserContext.Consumer>
    {authUser => authUser ? <HeaderAuth /> : <HeaderNonAuth />}
    </AuthUserContext.Consumer>
    </div>
  );

function HeaderAuth() {
    return (
    <header style={headerStyle}>
        <h1> Todo List </h1>
        <Link style={linkStyle} to='/mylist'>Home</Link> | <Link style={linkStyle} to='/about'>About</Link> | 
        <SignOutButton />
    </header>
    )
}

function HeaderNonAuth() {
    return (
    <header style={headerStyle}>
        <h1> Todo List </h1>
        <Link style={linkStyle} to='/mylist'>Home</Link> | <Link style={linkStyle} to='/about'>About</Link> | <Link style={linkStyle} to='/'>Sign Up</Link>| <Link style={linkStyle} to='/signin'>Log In</Link> 
    </header>
    )
}


const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
}

const headerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'

}

export default Navigation