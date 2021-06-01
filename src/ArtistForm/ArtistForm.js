import React, { useState } from 'react';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';
import './ArtistForm.css';

function ArtistForm(props) {
    const initialState = {
        artist_id: props.artist.artist_id || undefined,
        artist_name: props.artist.artist_name || ''
    }

    const [formData, setFormData] = useState({ ...initialState });

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        });
    }

    const handleSubmit = event => {
        event.preventDefault();
        const { artist_id, artist_name } = formData;

        props.onSubmit(
            {
                artist_id,
                artist_name
            }
        );
    }

    const { artist_id, artist_name } = formData;
    const { error, onCancel } = props;

    return (
        <form className='artist-form' onSubmit={handleSubmit}>
            {artist_id && <input type='hidden' name='artist_id' value={artist_id} />}
            <div>
                <label htmlFor='artist-name'>Name</label>
                <input
                    type='text'
                    name='artist_name'
                    id='artist_name'
                    required
                    value={artist_name}
                    onChange={handleChange}
                />
            </div>
            {error && <ValidationError message={error.message} />}
            <div className='artist-form-buttons'>
                <button type='submit'>Submit</button>
                {' '}
                <button onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}

ArtistForm.defaultProps = {
    artist: {}
};

ArtistForm.propTypes = {
    artist: PropTypes.shape({
        artist_id: PropTypes.number,
        artist_name: PropTypes.string
    }),
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    error: PropTypes.object
};

export default ArtistForm;