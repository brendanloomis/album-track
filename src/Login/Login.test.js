import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        history: {
            push: () => {},
        }
    };
    ReactDOM.render(
        <BrowserRouter>
            <Login {...props} />
        </BrowserRouter>, 
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});