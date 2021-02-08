import React from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

class Signup extends React.Component {
    render() {
        return (
            <div className='signup'>
                <h2>Sign Up</h2>
                <form className='signup-form'>
                    <div>
                        <label htmlFor='first-name'>First Name</label>
                        <input type='text' name='first-name' id='first-name' />
                    </div>
                    <div>
                        <label htmlFor='last-name'>Last Name</label>
                        <input type='text' name='last-name' id='last-name' />
                    </div>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input type='text' name='username' id='username' />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' id='password' />
                    </div>
                    <div>
                        <label htmlFor='repeat-password'>Repeat Password</label>
                        <input type='password' name='repeat-password' id='repeat-password' />
                    </div>
                    <div className='signup-buttons'>
                        <button type='submit'>Sign Up</button>
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