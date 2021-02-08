import React from 'react';
import './Song.css';

class Song extends React.Component {
    render() {
        return (
            <div className='song'>
                <p>{this.props.name}</p>
                <div className='song-buttons'>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        );
    }
};

export default Song;