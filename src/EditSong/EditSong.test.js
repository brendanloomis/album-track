import React from 'react';
import ReactDOM from 'react-dom';
import EditSong from './EditSong';

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
    ReactDOM.render(<EditSong {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});