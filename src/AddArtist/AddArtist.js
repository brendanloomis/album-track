import React, { useState, useContext } from 'react';
import ArtistForm from '../ArtistForm/ArtistForm';
import config from '../config';
import AlbumContext from '../AlbumContext';
import { findArtistByName } from '../helper-functions';
import PropTypes from 'prop-types';
import './AddArtist.css';

function AddArtist(props) {
    const context = useContext(AlbumContext);

    const initialState = {
        error: null
    };

    const [error, setError] = useState({ ...initialState });

    const handleSubmit = (artist) => {
        setError({ ...initialState });
        const userId = context.userInfo.user_id;

        // check if the artist already exists in the database
        let artistFound = findArtistByName(context.artists, artist.artist_name)

        // if the artist doesn't exist, add it to the database, then add it to the user's albums
        if (!artistFound) {
            fetch(`${config.API_ENDPOINT}/artists`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${config.API_KEY}`
                },
                body: JSON.stringify(artist)
            })
                .then(res => {
                    if(!res.ok) {
                        return res.json().then(error => {
                            throw error;
                        });
                    }
                    return res.json();
                })
                .then(data => {
                    context.addArtist(data);
                    return data.artist_id;
                })
                .then(artist_id => {
                    return fetch(`${config.API_ENDPOINT}/usersartists`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            'authorization': `bearer ${config.API_KEY}`
                        },
                        body: JSON.stringify({
                            user_id: userId,
                            artist: artist_id
                        })
                    })
                })
                .then(res => {
                    if (!res.ok) {
                        return res.json().then(error => {
                            throw error;
                        });
                    }
                    return res.json();
                })
                .then(data => {
                    const artistToAdd = {
                        artist_id: data.artist,
                        artist_name: artist.artist_name,
                        usersartists_id: data.usersartists_id
                    };
                    context.addArtistForUser(artistToAdd);
                    props.history.push(`/collection/${data.artist}`);
                })
                .catch(error => {
                    console.error(error);
                    setError({ error });
                });
        } else {
            // if the album is in the database, add to the user's albums
            fetch(`${config.API_ENDPOINT}/usersartists`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${config.API_KEY}`
                },
                body: JSON.stringify({
                    user_id: userId,
                    artist: artistFound.artist_id
                })
            })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error;
                    });
                }
                return res.json();
            })
            .then(data => {
                const artistToAdd = {
                    artist_id: data.artist,
                    artist_name: artist.artist_name,
                    usersartists_id: data.usersartists_id
                };
                context.addArtistForUser(artistToAdd);
                props.history.push(`/collection/${data.artist}`);
            })
            .catch(error => {
                console.error(error);
                setError({ error });
            });
        }
    }

    const handleClickCancel = () => {
        props.history.push('/collection')
    }

    return (
        <div className='add-artist'>
            <h2>Add Artist</h2>
            <ArtistForm
                error={error}
                onSubmit={handleSubmit}
                onCancel={handleClickCancel}
            />
        </div>
    );
}

AddArtist.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

export default AddArtist;
