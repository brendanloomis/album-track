import React from 'react';
import { Route } from 'react-router-dom';
import store from '../store';
import Nav from '../Nav/Nav';
import Landing from '../Landing/Landing';
import CollectionPage from '../CollectionPage/CollectionPage';
import './App.css';
import ArtistPage from '../ArtistPage/ArtistPage';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import config from '../config';
import AlbumContext from '../AlbumContext';
import AddArtist from '../AddArtist/AddArtist';
import EditArtist from '../EditArtist/EditArtist';
import AddAlbum from '../AddAlbum/AddAlbum';
import EditAlbum from '../EditAlbum/EditAlbum';
import AddSong from '../AddSong/AddSong';
import EditSong from '../EditSong/EditSong';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

class App extends React.Component{
  state = {
    allAlbums: [],
    albumsForUser: [],
    artistsForUser: [],
    songs: [],
    artists: [],
    usernames: [],
    loggedIn: false,
    userInfo: {}
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/artists`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${config.API_KEY}`
        }
      }),
      fetch(`${config.API_ENDPOINT}/albums`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${config.API_KEY}`
        }
      }),
      fetch(`${config.API_ENDPOINT}/songs`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${config.API_KEY}`
        }
      }),
      fetch(`${config.API_ENDPOINT}/users/usernames`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${config.API_KEY}`
        }
      })
    ])
      .then(([artistsRes, albumsRes, songsRes, usernameRes]) => {
        if (!artistsRes.ok) {
          return artistsRes.json().then(error => {
            throw error;
          });
        }
        if (!albumsRes.ok) {
          return albumsRes.json().then(error => {
            throw error;
          });
        }
        if (!songsRes.ok) {
          return songsRes.json().then(error => {
            throw error;
          });
        }
        if (!usernameRes.ok) {
          return usernameRes.json().then(error => {
            throw error;
          });
        }
        return Promise.all([artistsRes.json(), albumsRes.json(), songsRes.json(), usernameRes.json()]);
      })
      .then(([artists, allAlbums, songs, usernames]) => {
        this.setState({ artists, allAlbums, songs, usernames });
      })
      .catch(err => {
        console.error({ err });
      });
  }

  renderRoutes() {
    const { artists, albums, songs } = store;
    return (
      <>
        <ErrorBoundary>
          <Route 
            exact 
            path='/'
            component={Landing}
          />
          <Route
            exact
            path='/collection'
            component={CollectionPage}
          />
          <Route
            exact
            path='/collection/:artistId'
            component={ArtistPage}
          />
          <Route
            exact
            path='/login'
            component={Login}
          />
          <Route
            exact
            path='/signup'
            component={Signup}
          />
          <Route 
            exact
            path='/add-artist'
            component={AddArtist}
          />
          <Route
            exact
            path='/edit-artist/:artist_id'
            component={EditArtist}
          />
          <Route 
            exact
            path='/add-album/:artist'
            component={AddAlbum}
          />
          <Route 
            exact
            path='/edit-album/:album_id'
            component={EditAlbum}
          /> 
          <Route
            exact
            path='/add-song/:album'
            component={AddSong}
          />
          <Route
            exact
            path='/edit-song/:song_id'
            component={EditSong}
          />
        </ErrorBoundary>
        </>
    )
  }

  loginUser = user => {
    this.setState({
      userInfo: user,
      loggedIn: true
    });
  }

  logoutUser = () => {
    this.setState({
      userInfo: {},
      loggedIn: false,
      albumsForUser: []
    });
  }

  getAlbumsForUser = (albums) => {
    this.setState({
      albumsForUser: albums
    });
  }

  getArtistsForUser = (artists) => {
    this.setState({
      artistsForUser: artists
    });
  }

  addArtist = (artist) => {
    this.setState({
      artists: [ ...this.state.artists, artist ]
    });
  }

  addAlbum = (album) => {
    this.setState({
      allAlbums: [ ...this.state.allAlbums, album ]
    });
  }

  addSong = (song) => {
    this.setState({
      songs: [ ...this.state.songs, song ]
    });
  }

  addArtistForUser = (artist) => {
    this.setState({
      artistsForUser: [ ...this.state.artistsForUser, artist ]
    });
  }

  addAlbumForUser = (album) => {
    this.setState({
      albumsForUser: [ ...this.state.albumsForUser, album ]
    });
  }

  updateArtist = (updatedArtist) => {
    this.setState({
      artists: this.state.artists.map(a => 
        (a.artist_id !== updatedArtist.artist_id) ? a : updatedArtist
      )
    });
  }

  updateAlbum = (updatedAlbum) => {
    this.setState({
      allAlbums: this.state.allAlbums.map(a => 
        (a.album_id !== updatedAlbum.album_id) ? a : updatedAlbum
      )
    });
  }

  updateSong = (updatedSong) => {
    this.setState({
      songs: this.state.songs.map(s => 
        (s.song_id !== updatedSong.song_id) ? s : updatedSong
      )
    });
  }

  deleteArtistForUser = (artistId) => {
    const newArtistsForUser = this.state.artistsForUser.filter(a => (
      a.artist_id !== artistId
    ));
    this.setState({
      artistsForUser: newArtistsForUser
    });
  }

  deleteAlbumForUser = (albumId) => {
    const newAlbumsForUser = this.state.albumsForUser.filter(a => (
      a.album !== albumId
    ));
    this.setState({
      albumsForUser: newAlbumsForUser
    });
  }

  deleteSong = (songId) => {
    const newSongs = this.state.songs.filter(s => (
      s.song_id !== songId
    ));
    this.setState({
      songs: newSongs
    });
  }

  render(){
    const contextValue = {
      artists: this.state.artists,
      allAlbums: this.state.allAlbums,
      albumsForUser: this.state.albumsForUser,
      artistsForUser: this.state.artistsForUser,
      songs: this.state.songs,
      usernames: this.state.usernames,
      loginUser: this.loginUser,
      userInfo: this.state.userInfo,
      loggedIn: this.state.loggedIn,
      logoutUser: this.logoutUser,
      getUserAlbums: this.getAlbumsForUser,
      addArtist: this.addArtist,
      getUserArtists: this.getArtistsForUser,
      addArtistForUser: this.addArtistForUser,
      updateArtist: this.updateArtist,
      deleteArtist: this.deleteArtistForUser,
      addAlbum: this.addAlbum,
      addAlbumForUser: this.addAlbumForUser,
      updateAlbum: this.updateAlbum,
      deleteAlbum: this.deleteAlbumForUser,
      addSong: this.addSong,
      updateSong: this.updateSong,
      deleteSong: this.deleteSong
    }
    const users = store.users;
    return (
      <AlbumContext.Provider value={contextValue}>
        <div className='App'>
          <header>
            <h1>Album Track</h1>
          </header>
          <ErrorBoundary>
            <Nav />
          </ErrorBoundary>
          <main className='main'>
            {this.renderRoutes()}
          </main>
          <footer>
            <p>© Brendan Loomis</p>
          </footer>
        </div>
      </AlbumContext.Provider>
    );
  }
}

export default App;
