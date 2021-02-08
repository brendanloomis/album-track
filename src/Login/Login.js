import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

class Login extends React.Component {
    render() {
        return (
            <div className='login'>
                <h2>Log In</h2>
                <form className='login-form'>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input type='text' name='username' id='username' />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' id='password' />
                    </div>
                    <div className='login-buttons'>
                        <button type='submit'>Log In</button>
                        <Link to='/'>
                            <button>Cancel</button>
                        </Link>
                    </div>
                </form>
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

export default Login;