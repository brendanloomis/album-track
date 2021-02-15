import React from 'react';
import { Link } from 'react-router-dom';
import AlbumContext from '../AlbumContext';
import config from '../config';
import './Song.css';

class Song extends React.Component {
    static contextType = AlbumContext;

    handleDelete = (song_id) => {
        fetch(`${config.API_ENDPOINT}/songs/${song_id}`, {
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
                this.context.deleteSong(song_id);
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        return (
            <div className='song'>
                <p>{this.props.name}</p>
                <div className='song-buttons'>
                    <Link to={`/edit-song/${this.props.id}`}>
                        <button>Edit</button>
                    </Link>
                    <button 
                        onClick={() => this.handleDelete(this.props.id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    }
};

export default Song;