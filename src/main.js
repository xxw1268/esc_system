import React from 'react';
import Dva from 'dva';
import dynamic from 'dva/dynamic';

import bigtableModel from './models/bigtableModel.js';
import detailModel from './models/detailModel.js';
import salecarModel from './models/salecarModel.js';
import szssModel from './models/szssModel.js';
import jhgsModel from './models/jhgsModel.js';
import userModel from './models/userModel.js';

import route from './route.js';

const app = Dva();

// 模型列表
app.model(bigtableModel);
app.model(detailModel);
app.model(salecarModel);
app.model(szssModel);
app.model(jhgsModel);
app.model(userModel);

// 路由
app.router(route);

app.start('#app');
