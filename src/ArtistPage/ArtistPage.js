import React from 'react';
import Album from '../Album/Album';
import { findArtist, getAlbumsForArtist } from '../helper-functions';
import './ArtistPage.css';

class ArtistPage extends React.Component {
    render() {
        const { artistId } = this.props.match.params;
        const artist = findArtist(this.props.artists, artistId);
        const albumsForArtist = getAlbumsForArtist(this.props.albums, artistId);
        console.log(albumsForArtist);
        const albums = albumsForArtist.map(album => (
            <li key={album.album_id}>
                <Album
                    id={album.album_id}
                    name={album.album_name}
                    genre={album.genre}
                    songs={this.props.songs}
                />
            </li>
        ));
        return (
            <div className='artist-page'>
                <h2>{artist.artist_name}</h2>
                <ul>{albums}</ul>
                <div className='artist-page-buttons'>
                    <button>Add Album</button>
                    {' '}
                    <button onClick={() => this.props.history.goBack()} className='back'>Back</button>
                </div>
            </div>
        );
    }
};



export default ArtistPage;