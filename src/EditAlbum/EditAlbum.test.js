import React from 'react';
import ReactDOM from 'react-dom';
import EditAlbum from './EditAlbum';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        history: {
            push: () => {},
            goBack: () => {}
        },
        match: {
            params: {}
        }
    };
    ReactDOM.render(<EditAlbum {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});