import React from 'react';

const AlbumContext = React.createContext({
    allAlbums: [],
    albumsForUser: [],
    artistsForUser: [],
    songs: [],
    artists: [],
    usernames: [],
    deleteArtist: () => {},
    deleteAlbum: () => {},
    deleteSong: () => {},
    loginUser: () => {},
    logoutUser: () => {},
    userInfo: {},
    loggedIn: false,
    getUserAlbums: () => {},
    getUserArtists: () => {},
    addArtist: () => {},
    addArtistForUser: () => {},
    updateArtist: () => {},
    addAlbum: () => {},
    addAlbumForUser: () => {},
    updateAlbum: () => {},
    addSong: () => {},
    updateSong: () => {},
    deleteSong: () => {},
});

export default AlbumContext;