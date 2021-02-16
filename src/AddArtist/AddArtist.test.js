import React from 'react';
import ReactDOM from 'react-dom';
import AddArtist from './AddArtist';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        history: {
            push: () => {}
        }
    };
    ReactDOM.render(<AddArtist {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});