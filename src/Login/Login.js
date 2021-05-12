import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import AlbumContext from '../AlbumContext';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';
import './Login.css';

function Login(props) {
    const initialLoginState = {
        username: '',
        password: '',
        error: false
    };

    const context = useContext(AlbumContext);

    const [loginData, setLoginData] = useState({ ...initialLoginState });

    const handleChange = ({ target }) => {
        setLoginData({
            ...loginData,
            [target.name]: target.value
        });
    }

    const handleLogin = event => {
        event.preventDefault();

        fetch(`${config.API_ENDPOINT}/users/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            },
            body: JSON.stringify(loginData)
        })
            .then(res => {
                if(!res.ok) {
                    return res.json().then(error => {
                        throw error;
                    });
                }
                return res.json();
            })
            .then(user => {
                context.loginUser(user);
                localStorage.setItem('user', JSON.stringify(user));
                props.history.push(`/collection`);
                return user.user_id
            })
            .then(userId => {
                return Promise.all([
                    fetch(`${config.API_ENDPOINT}/usersalbums?userId=${userId}`, {
                        method: 'GET',
                        headers: {
                            'content-type': 'application/json',
                            'authorization': `bearer ${config.API_KEY}`
                        }
                    }),
                    fetch(`${config.API_ENDPOINT}/usersartists?userId=${userId}`, {
                        method: 'GET',
                        headers: {
                            'content-type': 'application/json',
                            'authorization': `bearer ${config.API_KEY}`
                        }
                    })
                ])
            })
            .then(([usersAlbumsRes, usersArtistsRes]) => {
                if (!usersAlbumsRes.ok) {
                    return usersAlbumsRes.json().then(error => {
                        throw error;
                    });
                }
                if (!usersArtistsRes.ok) {
                    return usersArtistsRes.json().then(error => {
                        throw error;
                    });
                }
                return Promise.all([usersAlbumsRes.json(), usersArtistsRes.json()]);
            })
            .then(([albumsForUser, artistsForUser]) => {
                context.getUserAlbums(albumsForUser);
                context.getUserArtists(artistsForUser);
            })
            .catch(error => {
                setLoginData({
                    ...loginData,
                    error: true
                })
                console.error(error);
            });
    }

    return (
        <div className='login'>
            <h2>Log In</h2>
            <form className='login-form' onSubmit={handleLogin}>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input 
                        type='text' 
                        name='username' 
                        id='username'
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input 
                        type='password' 
                        name='password' 
                        id='password' 
                        onChange={handleChange}
                        required
                    />
                </div>
                {loginData.error && <ValidationError message='Invalid username or password' />}
                <div className='login-buttons'>
                    <button type='submit'>Log In</button>
                    {' '}
                    <Link to='/'>
                        <button>Cancel</button>
                    </Link>
                </div>
            </form>
            <div className='demo'>
                <p>For demo account (case sensitive):</p> 
                <p>username: demo</p>
                <p>password: password123</p>
            </div>
            <p>
                Don't have an account? 
                <Link to='/signup'>
                    <button className='signup-link'>Sign Up</button>
                </Link>
            </p>
        </div>
    );
}

Login.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

export default Login;