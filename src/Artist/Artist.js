import React from 'react';
import { Link } from 'react-router-dom';
import './Artist.css';

class Artist extends React.Component {
    render() {
        return (
            <div className='artist'>
                <h3>
                    <Link to={`/demo/${this.props.artist_id}`} className='artist-link'>
                        {this.props.artist_name}
                    </Link>
                </h3>
                <div className='artist-buttons'>
                    <button id='edit-artist'>Edit</button>
                    {' '}
                    <button id='delete-artist'>Delete</button>
                </div>
            </div>
        );
    }
};

export default Artist;