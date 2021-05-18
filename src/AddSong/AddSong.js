import React, { useState, useContext } from 'react';
import SongForm from '../SongForm/SongForm';
import AlbumContext from '../AlbumContext';
import config from '../config';
import { findAlbum, findArtist } from '../helper-functions';
import PropTypes from 'prop-types';
import './AddSong.css';

function AddSong(props) {
    const context = useContext(AlbumContext);

    const initialState = {
        error: null
    };

    const [error, setError] = useState({ ...initialState });

    const handleSubmit = (song) => {
        setError({ ...initialState });

        // get the artist for the song (is used to redirect to artist page after submit)
        const albumForSong = findAlbum(context.allAlbums, parseInt(song.album));
        const artistForSong = findArtist(context.artists, albumForSong.artist);

        fetch(`${config.API_ENDPOINT}/songs`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            },
            body: JSON.stringify(song)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error;
                    })
                }
                return res.json();
            })
            .then(data => {
                context.addSong(data);
                props.history.push(`/collection/${artistForSong.artist_id}`);
            })
            .catch(error => {
                console.error(error);
                setError({ error });
            });
    }

    const handleClickCancel = () => {
        props.history.goBack();
    }

    const { album } = props.match.params;

    return (
        <div className='add-song'>
            <h2>Add Song</h2>
            <SongForm 
                error={error}
                onSubmit={handleSubmit}
                onCancel={handleClickCancel}
                album={album}
            />
        </div>
    )
}

AddSong.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired
    }),
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    })
};

export default AddSong;