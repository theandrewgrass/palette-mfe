import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// Mount function to start up the app
const mount = (el) => {
    ReactDOM.render(
        <App />,
        el
    );
};

// in development and isolation, mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_project_palette_dev_root');

    // we have an element with the id, therefore likely not in the container
    // and can mount
    if (devRoot) {
        mount(devRoot);
    }
}

// we are running through container -- export mount function
export { mount };