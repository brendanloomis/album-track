import React from 'react';
import Artist from '../Artist/Artist';
import './CollectionPage.css';

class CollectionPage extends React.Component {
    render() {
        const artists = this.props.artists.map(artist => (
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
                <ul>
                    {artists}
                </ul>
                <button id='add-artist-button'>Add Artist</button>
            </div>
        );
    }
};

export default CollectionPage;