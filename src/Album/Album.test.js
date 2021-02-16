import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Album from './Album';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        id: 1,
        name: 'name',
        genre: 'Pop'
    };
    ReactDOM.render(
        <BrowserRouter>
            <Album {...props} />
        </BrowserRouter>, 
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});