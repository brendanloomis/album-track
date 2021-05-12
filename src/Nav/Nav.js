import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AlbumContext from '../AlbumContext';
import './Nav.css';

function Nav() {
    const context = useContext(AlbumContext);

    // if user is logged in, render a log out link in the Nav bar
    // if user is not logged in, render a log in link in the Nav bar and My collection linkes to logged in
    const checkLoggedIn = () => {
        if (context.loggedIn) {
            return (
                <>
                    <Link to='/collection' className='nav-item'>My Collection</Link>
                    {' '}
                    <Link to='/' className='nav-item' onClick={handleLogout}>Log Out</Link>
                </>
            )
        };
        return (
            <>
                <Link to='/login' className='nav-item'>My Collection</Link>
                {' '}
                <Link to='/login' className='nav-item'>Log In</Link>
            </>
        );
    }

    const handleLogout = () => {
        context.logoutUser();
        localStorage.clear();
    };

    return (
        <div className='nav'>
            <Link to='/' className='nav-item'>Home</Link>
            {' '}
            {checkLoggedIn()}
        </div>
    );
}

export default Nav;