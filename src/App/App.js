import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
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

function App() {
  const initialState = {
    allAlbums: [],
    albumsForUser: [],
    artistsForUser: [],
    songs: [],
    artists: [],
    usernames: [],
    loggedIn: false,
    userInfo: {},
    checkedIfLoggedIn: false
  };

  const [stateData, setStateData] = useState({ ...initialState });

  useEffect(() => {
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
        setStateData(prevStateData => ({ ...prevStateData, artists, allAlbums, songs, usernames }));
      })
      .catch(err => {
        console.error({ err });
      });
    
    // check if the user is logged in and get users albums and artists if they are
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      loginUser(loggedInUser);

      let userId = loggedInUser.user_id;
      if (!userId) {
        userId = stateData.userInfo.user_id;
      }
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
            getAlbumsForUser(albumsForUser);
            getArtistsForUser(artistsForUser);
        })
        .catch(err => {
            console.error({ err });
        });
    }
    setStateData(prevStateData => ({
      ...prevStateData,
      checkedIfLoggedIn: true
    }));
  }, []);

  const renderRoutes = () => {
    // render routes after checking if user is logged in
    // redirect some paths to login page if the user needs to be logged in to access
    if (stateData.checkedIfLoggedIn) {
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
              render={(props) => (
                !stateData.loggedIn ? (
                  <Redirect to='/login' />
                ) : (
                  <CollectionPage {...props} />
                )
              )}
            />
            <Route
              exact
              path='/collection/:artistId'
              render={(props) => (
                !stateData.loggedIn ? (
                  <Redirect to='/login' />
                ) : (
                  <ArtistPage {...props} />
                )
              )}
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
              render={(props) => (
                !stateData.loggedIn ? (
                  <Redirect to='/login' />
                ) : (
                  <AddArtist {...props} />
                )
              )}
            />
            <Route
              exact
              path='/edit-artist/:artist_id'
              render={(props) => (
                !stateData.loggedIn ? (
                  <Redirect to='/login' />
                ) : (
                  <EditArtist {...props} />
                )
              )}
            />
            <Route 
              exact
              path='/add-album/:artist'
              render={(props) => (
                !stateData.loggedIn ? (
                  <Redirect to='/login' />
                ) : (
                  <AddAlbum {...props} />
                )
              )}
            />
            <Route 
              exact
              path='/edit-album/:album_id'
              render={(props) => (
                !stateData.loggedIn ? (
                  <Redirect to='/login' />
                ) : (
                  <EditAlbum {...props} />
                )
              )}
            /> 
            <Route
              exact
              path='/add-song/:album'
              render={(props) => (
                !stateData.loggedIn ? (
                  <Redirect to='/login' />
                ) : (
                  <AddSong {...props} />
                )
              )}
            />
            <Route
              exact
              path='/edit-song/:song_id'
              render={(props) => (
                !stateData.loggedIn ? (
                  <Redirect to='/login' />
                ) : (
                  <EditSong {...props} />
                )
              )}
            />
          </ErrorBoundary>
          </>
      )
    }
  };

  // functions for updating state and context
  const loginUser = (user) => {
    setStateData(prevStateData => ({
      ...prevStateData,
      userInfo: user,
      loggedIn: true
    }));
  }

  const logoutUser = () => {
    setStateData(prevStateData => ({
      ...prevStateData,
      userInfo: {},
      loggedIn: false,
      albumsForUser: [],
      artistsForUser: []
    }));
  }

  const getAlbumsForUser = (albums) => {
    setStateData(prevStateData => ({
      ...prevStateData,
      albumsForUser: albums
    }));
  }

  const getArtistsForUser = (artists) => {
    setStateData(prevStateData => ({
      ...prevStateData,
      artistsForUser: artists
    }));
  }

  // add functions
  const addArtist = (artist) => {
    setStateData(prevStateData => ({
      ...prevStateData,
      artists: [ ...stateData.artists, artist ]
    }));
  }

  const addAlbum = (album) => {
    setStateData(prevStateData => ({
      ...prevStateData,
      allAlbums: [ ...stateData.allAlbums, album ]
    }));
  }

  const addSong = (song) => {
    setStateData(prevStateData => ({
      ...prevStateData,
      songs: [ ...stateData.songs, song ]
    }));
  }

  const addArtistForUser = (artist) => {
    setStateData(prevStateData => ({
      ...prevStateData,
      artistsForUser: [ ...stateData.artistsForUser, artist ]
    }));
  }

  const addAlbumForUser = (album) => {
    setStateData(prevStateData => ({
      ...prevStateData,
      albumsForUser: [ ...stateData.albumsForUser, album ]
    }));
  }

  // update functions
  const updateArtist = (updatedArtist) => {
    setStateData( prevStateData => ({
      ...prevStateData,
      artists: stateData.artists.map(a => 
        (a.artist_id !== updatedArtist.artist_id) ? a : updatedArtist
      )
    }));
  }

  const updateArtistForUser = (updatedArtist) => {
    setStateData( prevStateData => ({
      ...prevStateData,
      artistsForUser: stateData.artistsForUser.map(a =>
        (a.artist_id !== updatedArtist.artist_id) ? a : {
          ...a,
          ...updatedArtist
        }
      )
    }))
  }

  const updateAlbum = (updatedAlbum) => {
    setStateData( prevStateData => ({
      ...prevStateData,
      allAlbums: stateData.allAlbums.map(a => 
        (a.album_id !== updatedAlbum.album_id) ? a : updatedAlbum
      )
    }));
  }

  const updateAlbumForUser = (updatedAlbum) => {
    setStateData( prevStateData => ({
      ...prevStateData,
      albumsForUser: stateData.albumsForUser.map(a => 
        (a.album !== updatedAlbum.album_id) ? a : {
          ...a,
          album: updatedAlbum.album_id,
          album_name: updatedAlbum.album_name,
          artist: updatedAlbum.artist,
          genre: updatedAlbum.genre
        }
      )
    }));
  }

  const updateSong = (updatedSong) => {
    setStateData( prevStateData => ({
      ...prevStateData,
      songs: stateData.songs.map(s => 
        (s.song_id !== updatedSong.song_id) ? s : {
          ...updatedSong,
          album: parseInt(updatedSong.album)
        }
      )
    }));
  }

  // delete functions
  const deleteArtistForUser = (artistId) => {
    const newArtistsForUser = stateData.artistsForUser.filter(a => (
      a.artist_id !== artistId
    ));
    setStateData( prevStateData => ({
      ...prevStateData,
      artistsForUser: newArtistsForUser
    }));
  }

  const deleteAlbumForUser = (albumId) => {
    const newAlbumsForUser = stateData.albumsForUser.filter(a => (
      a.album !== albumId
    ));
    setStateData( prevStateData => ({
      ...prevStateData,
      albumsForUser: newAlbumsForUser
    }));
  }

  const deleteSong = (songId) => {
    const newSongs = stateData.songs.filter(s => (
      s.song_id !== songId
    ));
    setStateData( prevStateData => ({
      ...prevStateData,
      songs: newSongs
    }));
  }

  const contextValue = {
    artists: stateData.artists,
    allAlbums: stateData.allAlbums,
    albumsForUser: stateData.albumsForUser,
    artistsForUser: stateData.artistsForUser,
    songs: stateData.songs,
    usernames: stateData.usernames,
    loginUser: loginUser,
    userInfo: stateData.userInfo,
    loggedIn: stateData.loggedIn,
    logoutUser: logoutUser,
    getUserAlbums: getAlbumsForUser,
    addArtist: addArtist,
    getUserArtists: getArtistsForUser,
    addArtistForUser: addArtistForUser,
    updateArtist: updateArtist,
    deleteArtist: deleteArtistForUser,
    addAlbum: addAlbum,
    addAlbumForUser: addAlbumForUser,
    updateAlbum: updateAlbum,
    deleteAlbum: deleteAlbumForUser,
    addSong: addSong,
    updateSong: updateSong,
    deleteSong: deleteSong,
    updateAlbumForUser: updateAlbumForUser,
    updateArtistForUser: updateArtistForUser
  }

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
          {renderRoutes()}
        </main>
        <footer>
          <p>© Brendan Loomis</p>
        </footer>
      </div>
    </AlbumContext.Provider>
  );
}

export default App;
