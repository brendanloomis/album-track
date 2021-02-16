import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Song from './Song';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        id: 1,
        name: 'name'
    };
    ReactDOM.render(
        <BrowserRouter>
            <Song {...props} />
        </BrowserRouter>, 
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});