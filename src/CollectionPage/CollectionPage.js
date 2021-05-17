import React, { useContext } from 'react';
import Artist from '../Artist/Artist';
import AlbumContext from '../AlbumContext';
import { Link } from 'react-router-dom';
import './CollectionPage.css';

function CollectionPage() {
    const context = useContext(AlbumContext);

    const artists = context.artistsForUser.sort((a, b) => a.artist_id - b.artist_id).map(artist => (
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

export default CollectionPage;