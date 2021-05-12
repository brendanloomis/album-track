import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import AlbumContext from '../AlbumContext';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';
import './Signup.css';

function Signup(props) {
    const initialSignupState = {
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

    const [signupData, setSignupData] = useState({ ...initialSignupState });

    const context = useContext(AlbumContext);

    const handleChange = ({ target }) => {
        setSignupData({
            ...signupData,
            [target.name]: {
                value: target.value,
                touched: true
            }
        });
    }

    // Validation functions for Sign Up form
    const validateFirst = () => {
        const firstName = signupData.first_name.value.trim();
        if (firstName.length === 0) {
            return 'First Name is required';
        }
    }

    const validateLast = () => {
        const lastName = signupData.last_name.value.trim();
        if (lastName.length === 0) {
            return 'Last Name is required';
        }
    }

    const validateUsername = () => {
        const username = signupData.username.value.trim();
        if (username.length === 0) {
            return 'Username is required';
        }
    }

    const validatePassword = () => {
        const password = signupData.password.value.trim();
        if (password.length === 0) {
            return 'Password is required';
        } else if (password.length < 6) {
            return 'Password must be at least 6 characters long';
        } else if (!password.match(/[0-9]/)) {
            return 'Password must contain a number';
        }
    }

    const validateRepeatPassword = () => {
        const repeatPassword = signupData.repeatPassword.value.trim();
        const password = signupData.password.value.trim();
        if (repeatPassword !== password) {
            return 'Passwords do not match';
        }
    }

    // event handler for submitting sign up form
    const handleSignup = event => {
        event.preventDefault();
        const userInfo = {
            first_name: signupData.first_name.value,
            last_name: signupData.last_name.value,
            username: signupData.username.value,
            password: signupData.password.value
        };
        const usernames = context.usernames;
        if (usernames.filter(un => un.username === userInfo.username).length > 0) {
            setSignupData({
                ...signupData,
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
                context.loginUser(user);
                context.loggedIn = true;
                props.history.push('/collection');
            })
            .catch(error => {
                console.error({ error });
            })
    }
    
    const firstError = validateFirst();
    const lastError = validateLast();
    const usernameError = validateUsername();
    const passwordError = validatePassword();
    const repeatPasswordError = validateRepeatPassword();
    return (
        <div className='signup'>
            <h2>Sign Up</h2>
            <form className='signup-form' onSubmit={handleSignup}>
                <div>
                    <label htmlFor='first_name'>First Name</label>
                    <input 
                        type='text' 
                        name='first_name' 
                        id='first_name'
                        onChange={handleChange}
                    />
                    {signupData.first_name.touched && <ValidationError message={firstError} />}
                </div>
                <div>
                    <label htmlFor='last_name'>Last Name</label>
                    <input 
                        type='text' 
                        name='last_name'
                        id='last_name'
                        onChange={handleChange}
                    />
                    {signupData.last_name.touched && <ValidationError message={lastError} />}
                </div>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input 
                        type='text' 
                        name='username' 
                        id='username' 
                        onChange={handleChange}
                    />
                    {signupData.username.touched && <ValidationError message={usernameError} />}
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input 
                        type='password' 
                        name='password' 
                        id='password' 
                        onChange={handleChange}
                    />
                    {signupData.password.touched && <ValidationError message={passwordError} />}
                </div>
                <div>
                    <label htmlFor='repeatPassword'>Repeat Password</label>
                    <input 
                        type='password' 
                        name='repeatPassword' 
                        id='repeatPassword' 
                        onChange={handleChange}
                    />
                    {signupData.repeatPassword.touched && <ValidationError message={repeatPasswordError} />}
                </div>
                {signupData.error.hasError && <ValidationError message={signupData.error.message} />}
                <div className='signup-buttons'>
                    <button 
                        type='submit'
                        className='signup-submit'
                        disabled={validateFirst() || validateLast() || validateUsername() || validatePassword() || validateRepeatPassword()}
                    >
                        Sign Up
                    </button>
                    {' '}
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

Signup.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

export default Signup;