import React from 'react';
import Artist from '../Artist/Artist';
import AlbumContext from '../AlbumContext';
import config from '../config';
import { Link } from 'react-router-dom';
import './CollectionPage.css';

class CollectionPage extends React.Component {
    static contextType = AlbumContext;

    componentDidMount() {
        const userId = this.context.userInfo.user_id;

        Promise.all([
            fetch(`${config.API_ENDPOINT}/usersalbums?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${config.API_KEY}`
                }
            }),
            fetch(`${config.API_ENDPOINT}/usersartists?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${config.API_KEY}`
                }
            })
        ])
            .then(([usersAlbumsRes, usersArtistsRes]) => {
                if (!usersAlbumsRes.ok) {
                    return usersAlbumsRes.json().then(error => {
                        throw error;
                    });
                }
                if (!usersArtistsRes.ok) {
                    return usersArtistsRes.json().then(error => {
                        throw error;
                    });
                }
                return Promise.all([usersAlbumsRes.json(), usersArtistsRes.json()]);
            })
            .then(([albumsForUser, artistsForUser]) => {
                this.context.getUserAlbums(albumsForUser);
                this.context.getUserArtists(artistsForUser);
            })
            .catch(err => {
                console.error({ err });
            });
    }

    render() {
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
                <ul>
                    {artists}
                </ul>
                <Link to='/add-artist'>
                    <button id='add-artist-button'>
                        Add Artist
                    </button>
                </Link>
            </div>
        );
    }
};

export default CollectionPage;