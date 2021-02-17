import React from 'react';
import { Link } from 'react-router-dom';
import AlbumContext from '../AlbumContext';
import './Nav.css';

class Nav extends React.Component {
    static contextType = AlbumContext;

    // if user is logged in render a log out link in the Nav bar
    // if user is not logged in render a log in link in the Nav bar and My Collection links to login
    checkLoggedIn() {
        if (this.context.loggedIn) {
            return (
                <>
                    <Link to='/collection' className='nav-item'>My Collection</Link>
                    {' '}
                    <Link to='/' className='nav-item' onClick={this.handleLogout}>Log Out</Link>
                </>
            );
        }
        return (
            <>
                <Link to='/login' className='nav-item'>My Collection</Link>
                {' '}
                <Link to='/login' className='nav-item'>Log In</Link>
            </>
        );
    }

    handleLogout = () => {
        this.context.logoutUser();
        localStorage.clear();
    };

    render() {
        return (
            <div className='nav'>
                <Link to='/' className='nav-item'>Home</Link>
                {' '}
                {this.checkLoggedIn()}
            </div>
        );
    }
};

export default Nav;