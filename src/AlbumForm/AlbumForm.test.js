import React from 'react';
import ReactDOM from 'react-dom';
import AlbumForm from './AlbumForm';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        onSubmit: () => {},
        onCancel: () => {},
    }
    ReactDOM.render(<AlbumForm {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});