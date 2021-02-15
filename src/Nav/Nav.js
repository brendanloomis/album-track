import React from 'react';
import { Link } from 'react-router-dom';
import AlbumContext from '../AlbumContext';
import './Nav.css';

class Nav extends React.Component {
    static contextType = AlbumContext;

    checkLoggedIn() {
        if (this.context.loggedIn) {
            return (
                <>
                    <Link to='/collection' className='nav-item'>My Collection</Link>
                    {' '}
                    <Link to='/' className='nav-item' onClick={e => this.context.logoutUser()}>Log Out</Link>
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