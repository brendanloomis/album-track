import React, { useState, useContext, useEffect } from 'react';
import AlbumForm from '../AlbumForm/AlbumForm';
import config from '../config';
import AlbumContext from '../AlbumContext';
import PropTypes from 'prop-types';
import './EditAlbum.css';

function EditAlbum(props) {
    const context = useContext(AlbumContext);

    const initialState = {
        error: null,
        album_id: null,
        album_name: null,
        genre: null,
        artist: null,
        infoReady: false
    };

    const [formData, setFormData] = useState({...initialState});

    // get the information for the album
    useEffect(() => {
        const { album_id } = props.match.params;

        fetch(`${config.API_ENDPOINT}/albums/${album_id}`, {
            method: 'GET',
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
                return res.json();
            })
            .then(data => {
                setFormData({
                    album_id: data.album_id,
                    album_name: data.album_name,
                    genre: data.genre,
                    artist: data.artist,
                    infoReady: true
                });
            })
            .catch(error => {
                console.error(error);
                setFormData({ error });
            });
    }, []);

    const handleSubmit = (album) => {
        setFormData({ error: null });
        
        fetch(`${config.API_ENDPOINT}/albums/${album.album_id}`, {
            method: 'PATCH',
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
            })
            .then(() => {
                context.updateAlbum(album);
                context.updateAlbumForUser(album);
                props.history.push(`/collection/${album.artist}`);
            })
            .catch(error => {
                console.error(error);
                setFormData({ error });
            });
    }

    const handleClickCancel = () => {
        props.history.goBack();
    }

    const renderForm = (album) => {
        if (formData.infoReady) {
            return (
                <AlbumForm
                    error={formData.error}
                    onSubmit={handleSubmit}
                    onCancel={handleClickCancel}
                    album={album}
                />
            );
        }
    }

    const { album_id, album_name, genre, artist } = formData
    const album = { album_id, album_name, genre, artist };
    return (
        <div className='edit-album'>
            <h2>Edit Album</h2>
            {renderForm(album)}
        </div>
    );
}

EditAlbum.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired
    }),
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    })
};

export default EditAlbum;