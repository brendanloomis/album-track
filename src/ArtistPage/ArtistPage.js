import React, { useContext } from 'react';
import Album from '../Album/Album';
import { findArtist, getAlbumsForArtist, getOwnedAlbums } from '../helper-functions';
import AlbumContext from '../AlbumContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ArtistPage.css';

function ArtistPage(props) {
    const context = useContext(AlbumContext);

    // get the artist information
    const { artistId } = props.match.params;
    const artist = findArtist(context.artists, parseInt(artistId)) || {};

    // get the list of albums the user owns for the artist and create a list of Album components
    const albumsForArtist = getAlbumsForArtist(context.allAlbums, parseInt(artistId));
    const ownedAlbumsForArtist = getOwnedAlbums(albumsForArtist, context.albumsForUser);
    const albums = ownedAlbumsForArtist.sort((a, b) => a.album_id - b.album_id).map(album => (
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
                <button onClick={() => props.history.push('/collection')} className='back'>Back</button>
            </div>
            <ul>{albums}</ul>
            <div className='artist-page-buttons'>
                <Link to={`/add-album/${artistId}`}>
                    <button>Add Album</button>
                </Link>
                {' '}
                <button onClick={() => props.history.push('/collection')} className='back'>Back</button>
            </div>
        </div>
    );
}

ArtistPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    })
};

export default ArtistPage;