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