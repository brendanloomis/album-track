export const findArtist = (artists, artistId) => 
    artists.find(artist => artist.artist_id === artistId);

export const findAlbum = (albums, albumId) => 
    albums.find(album => album.album_id === albumId);

export const getAlbumsForArtist = (albums, artistId) => (
    (!artistId)
        ? albums
        : albums.filter(album => album.artist === artistId)
);

export const getSongsForAlbum = (songs, albumId) => (
    (!albumId)
        ? songs
        : songs.filter(song => song.album === albumId)
);

export const getOwnedAlbums = (albums, userAlbums) => {
    const albumIds = [];
    for (let i = 0; i < userAlbums.length; i++) {
        if (!albumIds.includes(userAlbums[i].album)) {
            albumIds.push(userAlbums[i].album);
        }
    }
    const ownedAlbums = albums.filter(al => albumIds.includes(al.album_id));
    return ownedAlbums;
}

export const findArtistByName = (artists, artistName) => {
    return artists.find(artist => artist.artist_name === artistName);
}

export const findUsersArtistsId = (artistsForUser, artistId) => {
    const userArtist = artistsForUser.find(artist => artist.artist_id === artistId);
    return userArtist.usersartists_id;
}

export const findAlbumByName = (albums, albumName, artistId) => {
    return albums.find(album => album.album_name === albumName && album.artist === artistId);
}

export const findUsersAlbumsId = (albumsForUser, albumId) => {
    const userAlbum = albumsForUser.find(album => album.album === albumId);
    return userAlbum.usersalbums_id;
}