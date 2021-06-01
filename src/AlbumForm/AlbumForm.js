import React, { useState, useContext } from 'react';
import AlbumContext from '../AlbumContext';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';
import './AlbumForm.css';

function AlbumForm(props) {
    const context = useContext(AlbumContext);

    const initialState = {
        album_id: props.album.album_id || undefined,
        album_name: props.album.album_name || '',
        genre: props.album.genre || '',
        artist: props.album.artist || props.artist
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
        const { album_id, album_name, genre, artist } = formData;

        props.onSubmit(
            {
                album_id,
                album_name,
                genre,
                artist
            }
        );
    }

    const { album_id, album_name, genre, artist } = formData;
    const { error, onCancel } = props;

    // create options for the artist select input
    const artistOptions = context.artistsForUser.map(artist => {
        return (
            <option key={artist.artist_id} value={artist.artist_id}>
                {artist.artist_name}
            </option>
        );
    });

    return (
        <form className='album-form' onSubmit={handleSubmit}>
            {album_id && <input type='hidden' name='album_id' value={album_id} />}
            <div>
                <label htmlFor='album-name'>Name</label>
                <input
                    type='text'
                    name='album_name'
                    id='album_name'
                    required
                    value={album_name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor='genre'>Genre</label>
                <input 
                    type='text'
                    name='genre'
                    id='genre'
                    required
                    value={genre}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor='artist'>Artist</label>
                <select 
                    name='artist'
                    id='artist'
                    required
                    defaultValue={artist}
                    onChange={handleChange}
                >
                    {artistOptions}
                </select>
            </div>
            {error && <ValidationError message={error.message} />}
            <div className='album-form-buttons'>
                <button type='submit'>Submit</button>
                {' '}
                <button onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}

AlbumForm.defaultProps = {
    album: {}
};

AlbumForm.propTypes = {
    album: PropTypes.shape({
        album_id: PropTypes.number,
        album_name: PropTypes.string,
        genre: PropTypes.string,
        artist: PropTypes.number
    }),
    artist: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    error: PropTypes.object
};

export default AlbumForm;