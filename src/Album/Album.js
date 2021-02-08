import React from 'react';
import Song from '../Song/Song';
import { getSongsForAlbum } from '../helper-functions';
import './Album.css';

class Album extends React.Component {
    render() {
        const songsForAlbum = getSongsForAlbum(this.props.songs, this.props.id);
        const songs = songsForAlbum.map(song => (
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
                    <button>Edit</button>
                    <button>Delete</button>
                    <button>Add Song</button>
                </div>
                <h4>Tracklist</h4>
                <ul>{songs}</ul>
            </div>
        );
    }
};

export default Album;