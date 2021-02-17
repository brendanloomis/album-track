import React from 'react';
import SongForm from '../SongForm/SongForm';
import config from '../config';
import AlbumContext from '../AlbumContext';
import { findAlbum, findArtist } from '../helper-functions';
import PropTypes from 'prop-types';
import './EditSong.css';

class EditSong extends React.Component {
    state = {
        error: null,
        song_id: null,
        song_name: null,
        album: null,
        infoReady: false
    };

    static contextType = AlbumContext;

    // get the current information for the song
    componentDidMount() {
        const { song_id } = this.props.match.params;
        
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
                this.setState({
                    song_id: data.song_id,
                    song_name: data.song_name,
                    album: data.album,
                    infoReady: true
                });
            })
            .catch(error => {
                console.error(error);
                this.setState({ error });
            });
    }

    handleSubmit = (song) => {
        this.setState({ error: null });

        // get artist for song to be used for redirect after submitting the form
        const albumForSong = findAlbum(this.context.allAlbums, parseInt(song.album));
        const artistForSong = findArtist(this.context.artists, albumForSong.artist);

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
                this.context.updateSong(song);
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

    // renders the form with the correct values after the get request is done
    renderForm = (song) => {
        if (this.state.infoReady) {
            return (
                <SongForm
                    error={this.state.error}
                    onSubmit={this.handleSubmit}
                    onCancel={this.handleClickCancel}
                    song={song}
                />
            );
        }
    }

    render() {
        const { song_id, song_name, album } = this.state;
        const song = { song_id, song_name, album};
        return (
            <div className='edit-song'>
                <h2>Edit Song</h2>
                {this.renderForm(song)}
            </div>
        );
    }
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