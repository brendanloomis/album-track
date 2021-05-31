import React, { useState, useContext, useEffect } from 'react';
import SongForm from '../SongForm/SongForm';
import config from '../config';
import AlbumContext from '../AlbumContext';
import { findAlbum, findArtist } from '../helper-functions';
import PropTypes from 'prop-types';
import './EditSong.css';

function EditSong(props) {
    const context = useContext(AlbumContext);

    const initialState = {
        error: null,
        song_id: null,
        song_name: null,
        album: null,
        infoReady: null
    }

    const [formData, setFormData] = useState({ ...initialState });

    // get the current information for the song
    useEffect(() => {
        const { song_id } = props.match.params;
        
        fetch(`${config.API_ENDPOINT}/songs/${song_id}`, {
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
                    song_id: data.song_id,
                    song_name: data.song_name,
                    album: data.album,
                    infoReady: true
                });
            })
            .catch(error => {
                console.error(error);
                setFormData({ error });
            });
    }, []);

    const handleSubmit = (song) => {
        setFormData({ error: null });

        // get artist for song to be used for redirect after submitting the form
        const albumForSong = findAlbum(context.allAlbums, parseInt(song.album));
        const artistForSong = findArtist(context.artists, albumForSong.artist);

        fetch(`${config.API_ENDPOINT}/songs/${song.song_id}`, {
            method: 'PATCH',
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
                    });
                }
            })
            .then(() => {
                context.updateSong(song);
                props.history.push(`/collection/${artistForSong.artist_id}`);
            })
            .catch(error => {
                console.error(error);
                setFormData({ error });
            });
    }

    const handleClickCancel = () => {
        props.history.goBack();
    }

    // renders the form with the correct values after the get request is done
    const renderForm = (song) => {
        if (formData.infoReady) {
            return (
                <SongForm
                    error={formData.error}
                    onSubmit={handleSubmit}
                    onCancel={handleClickCancel}
                    song={song}
                />
            );
        }
    }

    const { song_id, song_name, album } = formData;
    const song = { song_id, song_name, album};
    return (
        <div className='edit-song'>
            <h2>Edit Song</h2>
            {renderForm(song)}
        </div>
    );
}

EditSong.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired
    }),
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    })
};

export default EditSong;