import React, { useState, useContext } from 'react';
import AlbumContext from '../AlbumContext';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';
import './SongForm.css';

function SongForm(props) {
    const context = useContext(AlbumContext);

    const initialState = {
        song_id: props.song.song_id || undefined,
        song_name: props.song.song_name || '',
        album: props.song.album || props.album
    };

    const [formData, setFormData] = useState({ ...initialState });

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        });
    }

    const handleSubmit = event => {
        event.preventDefault();
        const { song_id, song_name, album } = formData;

        props.onSubmit(
            {
                song_id,
                song_name,
                album
            }
        );
    }

    const { song_id, song_name, album } = formData;
    const { error, onCancel } = props;

    // create options for album input
    const albumOptions = context.albumsForUser.map(album => {
        return (
            <option key={album.album} value={album.album}>
                {album.album_name}
            </option>
        );
    });

    return (
        <form className='song-form' onSubmit={handleSubmit}>
            {song_id && <input type='hidden' name='song_id' value={song_id} />}
            <div>
                <label htmlFor='song-name'>Name</label>
                <input
                    type='text'
                    name='song_name'
                    id='song_name'
                    required
                    value={song_name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor='album'>Album</label>
                <select 
                    name='album'
                    id='album'
                    required
                    defaultValue={album}
                    onChange={handleChange}
                >
                    {albumOptions}
                </select>
            </div>
            {error && <ValidationError message={error.message} />}
            <div className='song-form-buttons'>
                <button type='submit'>Submit</button>
                {' '}
                <button onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}

SongForm.defaultProps = {
    song: {}
};

SongForm.propTypes = {
    song: PropTypes.shape({
        song_id: PropTypes.number,
        song_name: PropTypes.string,
        album: PropTypes.number
    }),
    album: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    error: PropTypes.object
};

export default SongForm;