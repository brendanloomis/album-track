import React from 'react';
import ReactDOM from 'react-dom';
import EditArtist from './EditArtist';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        history: {
            push: () => {}
        },
        match: {
            params: {}
        }
    };
    ReactDOM.render(<EditArtist {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});