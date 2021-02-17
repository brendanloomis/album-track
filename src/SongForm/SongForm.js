import React from 'react';
import AlbumContext from '../AlbumContext';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';
import './SongForm.css';

class SongForm extends React.Component {
    state = {
        song_id: this.props.song.song_id || undefined,
        song_name: this.props.song.song_name || '',
        album: this.props.song.album || this.props.album
    };

    static defaultProps = {
        song: {}
    };

    static contextType = AlbumContext;

    // functions to update state for form inputs
    updateSongName(song_name) {
        this.setState({ song_name });
    }

    updateAlbum(album) {
        this.setState({ album });
    }

    handleSubmit = event => {
        event.preventDefault();
        const { song_id, song_name, album } = this.state;

        this.props.onSubmit(
            {
                song_id,
                song_name,
                album
            }
        );
    }

    render() {
        const { song_id, song_name, album } = this.state;
        const { error, onCancel } = this.props;
        // create options for album input
        const albumOptions = this.context.albumsForUser.map(album => {
            return (
                <option key={album.album} value={album.album}>
                    {album.album_name}
                </option>
            );
        });
        return (
            <form className='song-form' onSubmit={this.handleSubmit}>
                {song_id && <input type='hidden' name='song_id' value={song_id} />}
                <div>
                    <label htmlFor='song-name'>Name</label>
                    <input
                        type='text'
                        name='song-name'
                        id='song-name'
                        required
                        value={song_name}
                        onChange={e => this.updateSongName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='album'>Album</label>
                    <select 
                        name='album'
                        id='album'
                        required
                        defaultValue={album}
                        onChange={e => this.updateAlbum(e.target.value)}
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
}

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