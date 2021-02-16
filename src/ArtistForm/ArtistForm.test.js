import React from 'react';
import ReactDOM from 'react-dom';
import ArtistForm from './ArtistForm';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        onSubmit: () => {},
        onCancel: () => {}
    };
    ReactDOM.render(<ArtistForm {...props}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});