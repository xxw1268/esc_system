import React from 'react';
import {Router, Route, Switch, Redirect} from 'dva/router';

import BigTable from './views/buycar/bigtable/BigTable.js';
import Qjmc from './views/buycar/qjmc/Qjmc.js';
import Dkmc from './views/buycar/dkmc/Dkmc.js';
import Detail from './views/buycar/detail/Detail.js';
import PersonalCar from './views/salecar/personalCar/PersonalCar.js';
import Gsmc from './views/salecar/gsmc/Gsmc.js';
import Szss from './views/jinhuo/szss/Szss.js';
import Jhgs from './views/jinhuo/jhgs/Jhgs.js';
import Login from './views/login/Login.js';
import Index from './views/index/Index.js';

export default ({history}) => <Router history={history}>
    <Switch>
        <Route path="/buycar/bigtable" exact component={BigTable}></Route>
        <Route path="/buycar/bigtable/:id" exact component={Detail}></Route>
        <Route path="/buycar/qjmc" exact component={Qjmc}></Route>
        <Route path="/buycar/dkmc" exact component={Dkmc}></Route>
        <Route path="/salecar/personalcar" exact component={PersonalCar}></Route>
        <Route path="/salecar/gsmc" exact component={Gsmc}></Route>
        <Route path="/jinhuo/szss" exact component={Szss}></Route>
        <Route path="/jinhuo/jhgs" exact component={Jhgs}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/" exact component={Index}></Route>
    </Switch>
</Router>;
