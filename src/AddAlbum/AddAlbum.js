import React, { useState, useContext } from 'react';
import AlbumForm from '../AlbumForm/AlbumForm';
import AlbumContext from '../AlbumContext';
import config from '../config';
import { findAlbumByName } from '../helper-functions';
import PropTypes from 'prop-types';
import './AddAlbum.css';

function AddAlbum(props) {
    const context = useContext(AlbumContext);

    const initialState = {
        error: null
    };

    const [error, setError] = useState({ ...initialState });

    const handleSubmit = (album) => {
        setError({ ...initialState });
        const userId = context.userInfo.user_id;
        
        // check if the album already exists in the database
        let albumFound = findAlbumByName(context.allAlbums, album.album_name, parseInt(album.artist));
        
        // if the album doesn't exist, add the album into the database and then add to user's albums
        if (!albumFound) {
            fetch(`${config.API_ENDPOINT}/albums`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${config.API_KEY}`
                },
                body: JSON.stringify(album)
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
                    context.addAlbum(data);
                    return data.album_id;
                })
                .then(album_id => {
                    return fetch(`${config.API_ENDPOINT}/usersalbums`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            'authorization': `bearer ${config.API_KEY}`
                        },
                        body: JSON.stringify({
                            user_id: userId,
                            album: album_id
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
                    const albumToAdd = {
                        album: data.album,
                        album_name: album.album_name,
                        artist: album.artist,
                        genre: album.genre,
                        usersalbums_id: data.usersalbums_id
                    };
                    context.addAlbumForUser(albumToAdd);
                    props.history.push(`/collection/${album.artist}`)
                })
                .catch(error => {
                    console.error(error);
                    setError({ error });
                });
        } else {
            // if album is already in the database, add it to the user's albums
            fetch(`${config.API_ENDPOINT}/usersalbums`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${config.API_KEY}`
                },
                body: JSON.stringify({
                    user_id: userId,
                    album: albumFound.album_id
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
                const albumToAdd = {
                    album: data.album,
                    album_name: album.album_name,
                    artist: album.artist,
                    genre: album.genre,
                    usersalbums_id: data.usersalbums_id
                };
                context.addAlbumForUser(albumToAdd);
                props.history.push(`/collection/${album.artist}`)
            })
            .catch(error => {
                console.error(error);
                setError({ error });
            });
        }
    }

    const handleClickCancel = () => {
        props.history.goBack();
    }

    const { artist } = props.match.params;
    
    return (
        <div className='add-album'>
            <h2>Add Album</h2>
            <AlbumForm 
                error={error}
                onSubmit={handleSubmit}
                onCancel={handleClickCancel}
                artist={artist}
            />
        </div>
    );
}

AddAlbum.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    })
};

export default AddAlbum;