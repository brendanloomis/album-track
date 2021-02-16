import React from 'react';
import { Link } from 'react-router-dom';
import AlbumContext from '../AlbumContext';
import config from '../config';
import { findUsersArtistsId } from '../helper-functions';
import PropTypes from 'prop-types';
import './Artist.css';

class Artist extends React.Component {
    static contextType = AlbumContext;

    handleDelete = (artist_id) => {
        const user_id = this.context.userInfo.user_id;
        const usersartists_id = findUsersArtistsId(this.context.artistsForUser, artist_id);
        fetch(`${config.API_ENDPOINT}/usersartists/${usersartists_id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error;
                    });
                }
            })
            .then(() => {
                this.context.deleteArtist(artist_id);
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        return (
            <div className='artist'>
                <h3>
                    <Link to={`/collection/${this.props.artist_id}`} className='artist-link'>
                        {this.props.artist_name}
                    </Link>
                </h3>
                <div className='artist-buttons'>
                    <Link to={`/edit-artist/${this.props.artist_id}`}>
                        <button id='edit-artist'>Edit</button>
                    </Link>
                    {' '}
                    <button 
                        id='delete-artist'
                        onClick={() => this.handleDelete(this.props.artist_id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    }
};

Artist.propTypes = {
    artist_id: PropTypes.number.isRequired,
    artist_name: PropTypes.string.isRequired
};

export default Artist;