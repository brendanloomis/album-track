import React from 'react';
import Album from '../Album/Album';
import { findArtist, getAlbumsForArtist, getOwnedAlbums } from '../helper-functions';
import AlbumContext from '../AlbumContext';
import { Link } from 'react-router-dom';
import './ArtistPage.css';

class ArtistPage extends React.Component {
    static contextType = AlbumContext;

    render() {
        const { artistId } = this.props.match.params;
        const artist = findArtist(this.context.artists, parseInt(artistId)) || {};
        const albumsForArtist = getAlbumsForArtist(this.context.allAlbums, parseInt(artistId));
        const ownedAlbumsForArtist = getOwnedAlbums(albumsForArtist, this.context.albumsForUser);
        const albums = ownedAlbumsForArtist.sort((a, b) => a.album - b.album).map(album => (
            <li key={album.album_id}>
                <Album
                    id={album.album_id}
                    name={album.album_name}
                    genre={album.genre}
                />
            </li>
        ));
        return (
            <div className='artist-page'>
                <h2>{artist.artist_name}</h2>
                <div className='artist-page-buttons'>
                    <Link to={`/add-album/${artistId}`}>
                        <button>Add Album</button>
                    </Link>
                    {' '}
                    <button onClick={() => this.props.history.push('/collection')} className='back'>Back</button>
                </div>
                <ul>{albums}</ul>
                <div className='artist-page-buttons'>
                    <Link to='/add-album'>
                        <button>Add Album</button>
                    </Link>
                    {' '}
                    <button onClick={() => this.props.history.push('/collection')} className='back'>Back</button>
                </div>
            </div>
        );
    }
};



export default ArtistPage;