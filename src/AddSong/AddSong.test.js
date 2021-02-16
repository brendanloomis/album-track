import React from 'react';
import ReactDOM from 'react-dom';
import AddSong from './AddSong';

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
    ReactDOM.render(<AddSong {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
})