import React from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import AlbumContext from '../AlbumContext';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';
import './Login.css';

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        error: false
    };

    static contextType = AlbumContext;

    updateUsername(username) {
        this.setState({ username });
    }

    updatePassword(password) {
        this.setState({ password });
    }
    
    handleLogin = event => {
        event.preventDefault();
        const login = {
            username: this.state.username,
            password: this.state.password
        };

        fetch(`${config.API_ENDPOINT}/users/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            },
            body: JSON.stringify(login)
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
                this.context.loginUser(user);
                this.props.history.push(`/collection`);
            })
            .catch(error => {
                this.setState({
                    error: true
                });
                console.error(error);
            })
    }

    render() {
        return (
            <div className='login'>
                <h2>Log In</h2>
                <form className='login-form' onSubmit={this.handleLogin}>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input 
                            type='text' 
                            name='username' 
                            id='username'
                            onChange={e => this.updateUsername(e.target.value)} 
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input 
                            type='password' 
                            name='password' 
                            id='password' 
                            onChange={e => this.updatePassword(e.target.value)}
                            required
                        />
                    </div>
                    {this.state.error && <ValidationError message='Invalid username or password' />}
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
};

Login.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

export default Login;