import React from 'react';
import ArtistForm from '../ArtistForm/ArtistForm';
import config from '../config';
import AlbumContext from '../AlbumContext';
import './EditArtist.css';

class EditArtist extends React.Component {
    state = {
        error: null,
        artist_id: null,
        artist_name: null,
        infoReady: false
    };

    static contextType = AlbumContext;

    componentDidMount() {
        const { artist_id } = this.props.match.params;

        fetch(`${config.API_ENDPOINT}/artists/${artist_id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error;
                    });
                }
                return res.json();
            })
            .then(data => {
                this.setState({
                    artist_id: data.artist_id,
                    artist_name: data.artist_name,
                    infoReady: true
                })
            })
            .catch(error => {
                console.error(error);
                this.setState({ error });
            })
    }

    handleSubmit = (artist) => {
        this.setState({ error: null });
        
        fetch(`${config.API_ENDPOINT}/artists/${artist.artist_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            },
            body: JSON.stringify(artist)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error;
                    });
                }
            })
            .then(() => {
                this.context.updateArtist(artist)
                this.props.history.push('/collection')
            })
            .catch(error => {
                console.error(error);
                this.setState({ error });
            });
    }

    handleClickCancel = () => {
        this.props.history.push('/collection');
    }

    renderForm = (artist) => {
        if(this.state.infoReady) {
            return (
                <ArtistForm
                    error={this.state.error}
                    onSubmit={this.handleSubmit}
                    onCancel={this.handleClickCancel}
                    artist={artist}
                />
            );
        }
    }

    render() {
        const artist = {
            artist_id: this.state.artist_id,
            artist_name: this.state.artist_name
        };
        return (
            <div className='edit-artist'>
                <h2>Edit Artist</h2>
                {this.renderForm(artist)}
            </div>
        );
    }
}

export default EditArtist;