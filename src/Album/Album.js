import React, { useContext } from 'react';
import Song from '../Song/Song';
import { getSongsForAlbum, findUsersAlbumsId } from '../helper-functions';
import AlbumContext from '../AlbumContext';
import { Link } from 'react-router-dom';
import config from '../config';
import PropTypes from 'prop-types';
import './Album.css';

function Album(props) {
    const context = useContext(AlbumContext);

    const handleDelete = (album_id) => {
        // find the usersalbums_id to delete from user's albums list
        // will not delete album from database completely
        const usersalbums_id = findUsersAlbumsId(context.albumsForUser, album_id);
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
                context.deleteAlbum(album_id);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const songsForAlbum = getSongsForAlbum(context.songs, props.id);
    const songs = songsForAlbum.sort((a, b) => a.song_id - b.song_id).map(song => (
        <li key={song.song_id}>
            <Song
                id={song.song_id}
                name={song.song_name}
            />
        </li>
    ));
    
    return (
        <div className='album'>
            <h3>{props.name}</h3>
            <p>Genre: {props.genre}</p>
            <div className='album-buttons'>
                <Link to={`/edit-album/${props.id}`}>
                    <button>Edit</button>
                </Link>
                {' '}
                <button
                    onClick={() => handleDelete(props.id)}
                >
                    Delete
                </button>
                {' '}
                <Link to={`/add-song/${props.id}`}>
                    <button>Add Song</button>
                </Link>
            </div>
            <h4>Tracklist</h4>
            <ul>{songs}</ul>
        </div>
    );
}

Album.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired
};

export default Album;