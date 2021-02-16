import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Artist from './Artist';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        artist_id: 1,
        artist_name: 'name'
    };
    ReactDOM.render(
        <BrowserRouter>
            <Artist {...props} />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});