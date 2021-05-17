import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

function Landing() {
    return (
        <div className='landing'>
            <section className='about'>
                <h2>What is Album Track?</h2>
                <p>Album Track is an app that lets you keep an inventory of your album collection. You can add artists, albums, and songs to your collection.</p>
            </section>
            <section className='features'>
                <h2>Keep your collection organized</h2>
                <p>Album Track groups your albums into artist pages which allows you to keep everything organized.</p>
            </section>
            <section className='get-started'>
                <h2>Get started today!</h2>
                <p>Create a <Link to='/signup' className='landing-signup'>new account</Link> or log in with the demo account to get started with Album Track!</p>
            </section>
        </div>
    );
}

export default Landing;