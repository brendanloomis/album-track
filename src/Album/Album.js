import React from 'react';
import Song from '../Song/Song';
import { getSongsForAlbum, findUsersAlbumsId } from '../helper-functions';
import AlbumContext from '../AlbumContext';
import { Link } from 'react-router-dom';
import config from '../config';
import PropTypes from 'prop-types';
import './Album.css';

class Album extends React.Component {
    static contextType = AlbumContext;

    handleDelete = (album_id) => {
        // find the usersalbums_id to delete from user's albums list
        // will not delete album from database completely
        const usersalbums_id = findUsersAlbumsId(this.context.albumsForUser, album_id);
        fetch(`${config.API_ENDPOINT}/usersalbums/${usersalbums_id}`, {
            method: 'DELETE',
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
            })
            .then(() => {
                this.context.deleteAlbum(album_id);
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        // get the songs that are on the album, and create a list of Song components
        const songsForAlbum = getSongsForAlbum(this.context.songs, this.props.id);
        const songs = songsForAlbum.sort((a, b) => a.song_id - b.song_id).map(song => (
            <li key={song.song_id}>
                <Song
                    id={song.song_id}
                    name={song.song_name}
                />
            </li>
        ))
        return (
            <div className='album'>
                <h3>{this.props.name}</h3>
                <p>Genre: {this.props.genre}</p>
                <div className='album-buttons'>
                    <Link to={`/edit-album/${this.props.id}`}>
                        <button>Edit</button>
                    </Link>
                    {' '}
                    <button
                        onClick={() => this.handleDelete(this.props.id)}
                    >
                        Delete
                    </button>
                    {' '}
                    <Link to={`/add-song/${this.props.id}`}>
                        <button>Add Song</button>
                    </Link>
                </div>
                <h4>Tracklist</h4>
                <ul>{songs}</ul>
            </div>
        );
    }
};

Album.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired
};

export default Album;