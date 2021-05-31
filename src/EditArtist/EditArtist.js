import React, { useState, useContext, useEffect } from 'react';
import ArtistForm from '../ArtistForm/ArtistForm';
import config from '../config';
import AlbumContext from '../AlbumContext';
import PropTypes from 'prop-types';
import './EditArtist.css';

function EditArtist(props) {
    const context = useContext(AlbumContext);

    const initialState = {
        error: null,
        artist_id: null,
        artist_name: null,
        infoReady: false
    };

    const [formData, setFormData] = useState({ ...initialState });

    // get the current information for the artist
    useEffect(() => {
        const { artist_id } = props.match.params;

        fetch(`${config.API_ENDPOINT}/artists/${artist_id}`, {
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
                    artist_id: data.artist_id,
                    artist_name: data.artist_name,
                    infoReady: true
                })
            })
            .catch(error => {
                console.error(error);
                setFormData({ error });
            })
    }, []);

    const handleSubmit = (artist) => {
        setFormData({ error: null });
        
        fetch(`${config.API_ENDPOINT}/artists/${artist.artist_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            },
            body: JSON.stringify(artist)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error;
                    });
                }
            })
            .then(() => {
                context.updateArtist(artist);
                context.updateArtistForUser(artist);
                props.history.push('/collection');
            })
            .catch(error => {
                console.error(error);
                setFormData({ error });
            });
    }

    const handleClickCancel = () => {
        props.history.push('/collection');
    }

    // renders the form with the correct values after the get request is done
    const renderForm = (artist) => {
        if(formData.infoReady) {
            return (
                <ArtistForm
                    error={formData.error}
                    onSubmit={handleSubmit}
                    onCancel={handleClickCancel}
                    artist={artist}
                />
            );
        }
    }

    const artist = {
        artist_id: formData.artist_id,
        artist_name: formData.artist_name
    };

    return (
        <div className='edit-artist'>
            <h2>Edit Artist</h2>
            {renderForm(artist)}
        </div>
    );
}

EditArtist.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    })
};

export default EditArtist;