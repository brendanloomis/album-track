import React from 'react';
import ReactDOM from 'react-dom';
import AddAlbum from './AddAlbum';

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
    ReactDOM.render(<AddAlbum {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});