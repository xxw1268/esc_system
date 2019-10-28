import React from 'react';
import Dva from 'dva';

import bigtableModel from './models/bigtableModel.js';
import detailModel from './models/detailModel.js';
import salecarModel from './models/salecarModel.js';
import szssModel from './models/szssModel.js';
import route from './route.js';

const app = Dva();

app.model(bigtableModel);
app.model(detailModel);
app.model(salecarModel);
app.model(szssModel);

app.router(route);

app.start('#app');
