import React from 'react';
import AlbumForm from '../AlbumForm/AlbumForm';
import config from '../config';
import AlbumContext from '../AlbumContext';
import PropTypes from 'prop-types';
import './EditAlbum.css';

class EditAlbum extends React.Component {
    state = {
        error: null,
        album_id: null,
        album_name: null,
        genre: null,
        artist: null,
        infoReady: false
    }

    static contextType = AlbumContext;

    componentDidMount() {
        const { album_id } = this.props.match.params;

        fetch(`${config.API_ENDPOINT}/albums/${album_id}`, {
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
                    album_id: data.album_id,
                    album_name: data.album_name,
                    genre: data.genre,
                    artist: data.artist,
                    infoReady: true
                });
            })
            .catch(error => {
                console.error(error);
                this.setState({ error });
            });
    }

    handleSubmit = (album) => {
        this.setState({ error: null });
        
        fetch(`${config.API_ENDPOINT}/albums/${album.album_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            },
            body: JSON.stringify(album)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error;
                    });
                }
            })
            .then(() => {
                this.context.updateAlbum(album);
                this.props.history.push(`/collection/${album.artist}`);
            })
            .catch(error => {
                console.error(error);
                this.setState({ error });
            });
    }

    handleClickCancel = () => {
        this.props.history.goBack();
    }

    renderForm = (album) => {
        if (this.state.infoReady) {
            return (
                <AlbumForm
                    error={this.state.error}
                    onSubmit={this.handleSubmit}
                    onCancel={this.handleClickCancel}
                    album={album}
                />
            );
        }
    }

    render() {
        const { album_id, album_name, genre, artist } = this.state
        const album = { album_id, album_name, genre, artist };
        return (
            <div className='edit-album'>
                <h2>Edit Album</h2>
                {this.renderForm(album)}
            </div>
        );
    }
}

EditAlbum.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired
    }),
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    })
};

export default EditAlbum;