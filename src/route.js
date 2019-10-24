import React from 'react';
import {Router, Route, Switch, Redirect} from 'dva/router';

import Bigtable from './views/buycar/bigtable/BigTable.js';
import Detail from './views/buycar/detail/Detail.js';
import PerSonalCar from './views/salecar/personalcar/PerSonalCar.js';

export default ({history})=><Router history={history}>
    <Switch>
        <Route path='/buycar/bigtable' exact component={Bigtable}></Route>
        <Route path='/buycar/bigtable/:id' exact component={Detail}></Route>
        <Route path='/salecar/personalcar' exact component={PerSonalCar}></Route>
        <Redirect from ='/' to='/salecar/personalcar'></Redirect>
    </Switch>
</Router>;