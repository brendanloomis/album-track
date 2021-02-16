import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Signup from './Signup';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        history: {
            push: () => {}
        }
    };
    ReactDOM.render(
        <BrowserRouter>
            <Signup {...props} />
        </BrowserRouter>, 
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});