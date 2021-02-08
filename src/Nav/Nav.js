import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

class Nav extends React.Component {
    render() {

        return (
            <div className='nav'>
                <Link to='/' className='nav-item'>Home</Link>
                {' '}
                <Link to='/demo' className='nav-item'>Demo</Link>
                {' '}
                <Link to='/login' className='nav-item'>Log In</Link>
            </div>
        );
    }
};

export default Nav;