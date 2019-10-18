import React from 'react';
import Dva from 'dva';

import App from './App.js';
import bigtableModel from './models/bigtableModel.js';

const app = Dva();

app.model(bigtableModel);

app.router(() => {
    return <App />;
});

app.start('#app');
