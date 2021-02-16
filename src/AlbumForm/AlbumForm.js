import React from 'react';
import AlbumContext from '../AlbumContext';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';
import './AlbumForm.css';

class AlbumForm extends React.Component {
    state = {
        album_id: this.props.album.album_id || undefined,
        album_name: this.props.album.album_name || '',
        genre: this.props.album.genre || '',
        artist: this.props.album.artist || this.props.artist
    }

    static defaultProps = {
        album: {}
    };

    static contextType = AlbumContext;

    updateAlbumName(album_name) {
        this.setState({ album_name });
    }

    updateGenre(genre) {
        this.setState({ genre });
    }

    updateArtist(artist) {
        this.setState({ artist });
    }

    handleSubmit = event => {
        event.preventDefault();
        const { album_id, album_name, genre, artist } = this.state;

        this.props.onSubmit(
            {
                album_id,
                album_name,
                genre,
                artist
            }
        );
    }

    render() {
        const { album_id, album_name, genre, artist } = this.state;
        const { error, onCancel } = this.props;
        const artistOptions = this.context.artistsForUser.map(artist => {
            return (
                <option key={artist.artist_id} value={artist.artist_id}>
                    {artist.artist_name}
                </option>
            );
        });
        return (
            <form className='album-form' onSubmit={this.handleSubmit}>
                {album_id && <input type='hidden' name='album_id' value={album_id} />}
                <div>
                    <label htmlFor='album-name'>Name</label>
                    <input
                        type='text'
                        name='album-name'
                        id='album-name'
                        required
                        value={album_name}
                        onChange={e => this.updateAlbumName(e.target.value)}
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
                        onChange={e => this.updateGenre(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='artist'>Artist</label>
                    <select 
                        name='artist'
                        id='artist'
                        required
                        defaultValue={artist}
                        onChange={e => this.updateArtist(e.target.value)}
                    >
                        {artistOptions}
                    </select>
                </div>
                {error && <ValidationError message={error.message} />}
                <div className='album-form-buttons'>
                    <button type='submit'>Submit</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </form>
        );
    }
}

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