import React from 'react';
import ArtistForm from '../ArtistForm/ArtistForm';
import config from '../config';
import AlbumContext from '../AlbumContext';
import PropTypes from 'prop-types';
import './EditArtist.css';

class EditArtist extends React.Component {
    state = {
        error: null,
        artist_id: null,
        artist_name: null,
        infoReady: false
    };

    static contextType = AlbumContext;

    // get the current information for the artist
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

    // renders the form with the correct values after the get request is done
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

EditArtist.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    })
};

export default EditArtist;