import React from 'react';
import ReactDOM from 'react-dom';
import SongForm from './SongForm';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        onSubmit: () => {},
        onCancel: () => {}
    };
    ReactDOM.render(<SongForm {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});