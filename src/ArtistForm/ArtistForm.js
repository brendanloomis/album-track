import React from 'react';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';
import './ArtistForm.css';

class ArtistForm extends React.Component {
    state = {
        artist_id: this.props.artist.artist_id || undefined,
        artist_name: this.props.artist.artist_name || ''
    };

    static defaultProps = {
        artist: {}
    }

    updateArtistName(artist_name) {
        this.setState({ artist_name });
    }

    handleSubmit = event => {
        event.preventDefault();
        const { artist_id, artist_name } = this.state;

        this.props.onSubmit(
            {
                artist_id,
                artist_name
            }
        );
    }

    render() {
        const { artist_id, artist_name } = this.state;
        const { error, onCancel } = this.props;
        return (
            <form className='artist-form' onSubmit={this.handleSubmit}>
                {artist_id && <input type='hidden' name='artist_id' value={artist_id} />}
                <div>
                    <label htmlFor='artist-name'>Name</label>
                    <input
                        type='text'
                        name='artist-name'
                        id='artist-name'
                        required
                        value={artist_name}
                        onChange={e => this.updateArtistName(e.target.value)}
                    />
                </div>
                {error && <ValidationError message={error.message} />}
                <div className='artist-form-buttons'>
                    <button type='submit'>Submit</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </form>
        );
    }
}

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