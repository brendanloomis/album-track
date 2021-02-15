import React from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import AlbumContext from '../AlbumContext';
import ValidationError from '../ValidationError';
import './Signup.css';

class Signup extends React.Component {
    state = {
        first_name: {
            value: '',
            touched: false
        },
        last_name: {
            value: '',
            touched: false
        },
        username: {
            value: '',
            touched: false
        },
        password: {
            value: '',
            touched: false
        },
        repeatPassword: {
            value: '',
            touched: false
        },
        error: {
            hasError: false,
            message: ''
        }
    };

    static contextType = AlbumContext;

    updateFirst(first) {
        this.setState({first_name: {
            value: first,
            touched: true
        }});
    }

    updateLast(last) {
        this.setState({last_name: {
            value: last,
            touched: true
        }});
    }

    updateUsername(username) {
        this.setState({username: {
            value: username,
            touched: true
        }});
    }

    updatePassword(password) {
        this.setState({password: {
            value: password,
            touched: true
        }});
    }

    updateRepeatPassword(repeatPassword) {
        this.setState({repeatPassword: {
            value: repeatPassword,
            touched: true
        }});
    }

    // Validation functions for Sign Up form
    validateFirst() {
        const firstName = this.state.first_name.value.trim();
        if (firstName.length === 0) {
            return 'First Name is required';
        }
    }

    validateLast() {
        const lastName = this.state.last_name.value.trim();
        if (lastName.length === 0) {
            return 'Last Name is required';
        }
    }

    validateUsername() {
        const username = this.state.username.value.trim();
        if (username.length === 0) {
            return 'Username is required';
        }
    }

    validatePassword() {
        const password = this.state.password.value.trim();
        if (password.length === 0) {
            return 'Password is required';
        } else if (password.length < 6) {
            return 'Password must be at least 6 characters long';
        } else if (!password.match(/[0-9]/)) {
            return 'Password must contain a number';
        }
    }

    validateRepeatPassword() {
        const repeatPassword = this.state.repeatPassword.value.trim();
        const password = this.state.password.value.trim();
        if (repeatPassword !== password) {
            return 'Passwords do not match';
        }
    }

    // event handler for submitting sign up form
    handleSignup = event => {
        event.preventDefault();
        const userInfo = {
            first_name: this.state.first_name.value,
            last_name: this.state.last_name.value,
            username: this.state.username.value,
            password: this.state.password.value
        };
        const usernames = this.context.usernames;
        if (usernames.filter(un => un.username === userInfo.username).length > 0) {
            this.setState({
                error: {
                    hasError: true,
                    message: 'Username already exists'
                }
            });
        }

        fetch(`${config.API_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error;
                    });
                }
                return res.json();
            })
            .then(user => {
                delete user.password;
                this.context.loginUser(user);
                this.context.loggedIn = true;
                this.props.history.push('/collection');
            })
            .catch(error => {
                console.error({ error });
            })
    }

    render() {
        const firstError = this.validateFirst();
        const lastError = this.validateLast();
        const usernameError = this.validateUsername();
        const passwordError = this.validatePassword();
        const repeatPasswordError = this.validateRepeatPassword();
        return (
            <div className='signup'>
                <h2>Sign Up</h2>
                <form className='signup-form' onSubmit={this.handleSignup}>
                    <div>
                        <label htmlFor='first-name'>First Name</label>
                        <input 
                            type='text' 
                            name='first-name' 
                            id='first-name'
                            onChange={e => this.updateFirst(e.target.value)}
                        />
                        {this.state.first_name.touched && <ValidationError message={firstError} />}
                    </div>
                    <div>
                        <label htmlFor='last-name'>Last Name</label>
                        <input 
                            type='text' 
                            name='last-name'
                            id='last-name'
                            onChange={e => this.updateLast(e.target.value)}
                        />
                        {this.state.last_name.touched && <ValidationError message={lastError} />}
                    </div>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input 
                            type='text' 
                            name='username' 
                            id='username' 
                            onChange={e => this.updateUsername(e.target.value)}
                        />
                        {this.state.username.touched && <ValidationError message={usernameError} />}
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input 
                            type='password' 
                            name='password' 
                            id='password' 
                            onChange={e => this.updatePassword(e.target.value)}
                        />
                        {this.state.password.touched && <ValidationError message={passwordError} />}
                    </div>
                    <div>
                        <label htmlFor='repeat-password'>Repeat Password</label>
                        <input 
                            type='password' 
                            name='repeat-password' 
                            id='repeat-password' 
                            onChange={e => this.updateRepeatPassword(e.target.value)}
                        />
                        {this.state.repeatPassword.touched && <ValidationError message={repeatPasswordError} />}
                    </div>
                    {this.state.error.hasError && <ValidationError message={this.state.error.message} />}
                    <div className='signup-buttons'>
                        <button 
                            type='submit'
                            className='signup-submit'
                            disabled={this.validateFirst() || this.validateLast() || this.validateUsername() || this.validatePassword() || this.validateRepeatPassword()}
                        >
                            Sign Up
                        </button>
                        <Link to='/'>
                            <button>Cancel</button>
                        </Link>
                    </div>
                </form>
                <p>
                    Already have an account? 
                    <Link to='/login'>
                        <button className='login-link'>Log In</button>
                    </Link>
                </p>
            </div>
        );
    }
}

export default Signup;