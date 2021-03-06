import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AlbumContext from '../AlbumContext';
import config from '../config';
import PropTypes from 'prop-types';
import './Song.css';

function Song(props) {
    const context = useContext(AlbumContext);

    const handleDelete = (song_id) => {
        fetch(`${config.API_ENDPOINT}/songs/${song_id}`, {
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
                context.deleteSong(song_id);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className='song'>
            <p>{props.name}</p>
            <div className='song-buttons'>
                <Link to={`/edit-song/${props.id}`}>
                    <button>Edit</button>
                </Link>
                {' '}
                <button 
                    onClick={() => handleDelete(props.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

Song.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
};

export default Song;