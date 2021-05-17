import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AlbumContext from '../AlbumContext';
import config from '../config';
import { findUsersArtistsId } from '../helper-functions';
import PropTypes from 'prop-types';
import './Artist.css';

function Artist(props) {
    const context = useContext(AlbumContext);

    const handleDelete = (artist_id) => {
        // find the usersartists_id to delete from user's artist list
        // will not delete artist from database completely
        const usersartists_id = findUsersArtistsId(context.artistsForUser, artist_id);
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
                context.deleteArtist(artist_id);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className='artist'>
            <h3>
                <Link to={`/collection/${props.artist_id}`} className='artist-link'>
                    {props.artist_name}
                </Link>
            </h3>
            <div className='artist-buttons'>
                <Link to={`/edit-artist/${props.artist_id}`}>
                    <button id='edit-artist'>Edit</button>
                </Link>
                {' '}
                <button 
                    id='delete-artist'
                    onClick={() => handleDelete(props.artist_id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

Artist.propTypes = {
    artist_id: PropTypes.number.isRequired,
    artist_name: PropTypes.string.isRequired
};

export default Artist;