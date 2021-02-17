import React from 'react';
import Artist from '../Artist/Artist';
import AlbumContext from '../AlbumContext';
import config from '../config';
import { Link } from 'react-router-dom';
import './CollectionPage.css';

class CollectionPage extends React.Component {
    static contextType = AlbumContext;

    render() {
        // create a list of Artist components that the user owns
        const artists = this.context.artistsForUser.sort((a, b) => a.artist_id - b.artist_id).map(artist => (
            <li key={artist.artist_id}>
                <Artist
                    artist_id={artist.artist_id}
                    artist_name={artist.artist_name}
                />
            </li>
        ));
        return (
            <div className='collection-page'>
                <h2>My Collection</h2>
                <Link to='/add-artist' className='add-artist-link'>
                    <button id='add-artist-button'>
                        Add Artist
                    </button>
                </Link>
                <ul>
                    {artists}
                </ul>
            </div>
        );
    }
};

export default CollectionPage;