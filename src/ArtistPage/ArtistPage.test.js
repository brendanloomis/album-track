import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ArtistPage from './ArtistPage';

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
    ReactDOM.render(
        <BrowserRouter>
            <ArtistPage {...props} />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});