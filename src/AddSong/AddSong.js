import React from 'react';
import SongForm from '../SongForm/SongForm';
import AlbumContext from '../AlbumContext';
import config from '../config';
import { findAlbum, findArtist } from '../helper-functions';
import PropTypes from 'prop-types';
import './AddSong.css';

class AddSong extends React.Component {
    state = {
        error: null
    };

    static contextType = AlbumContext;

    handleSubmit = (song) => {
        this.setState({ error: null });

        // get the artist for the song (is used to redirect to artist page after submit)
        const albumForSong = findAlbum(this.context.allAlbums, parseInt(song.album));
        const artistForSong = findArtist(this.context.artists, albumForSong.artist);

        fetch(`${config.API_ENDPOINT}/songs`, {
            method: 'POST',
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
                    })
                }
                return res.json();
            })
            .then(data => {
                this.context.addSong(data);
                this.props.history.push(`/collection/${artistForSong.artist_id}`);
            })
            .catch(error => {
                console.error(error);
                this.setState({ error });
            });
    }

    handleClickCancel = () => {
        this.props.history.goBack();
    }

    render() {
        const { album } = this.props.match.params;
        return (
            <div className='add-song'>
                <h2>Add Song</h2>
                <SongForm 
                    error={this.state.error}
                    onSubmit={this.handleSubmit}
                    onCancel={this.handleClickCancel}
                    album={album}
                />
            </div>
        )
    }
}

AddSong.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired
    }),
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    })
};

export default AddSong;