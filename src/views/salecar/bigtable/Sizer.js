import React, {Component} from 'react';
import {connect} from 'dva';

import OneSizer from './OneSizer.js';
import Tags from './Tags.js';
import BuyDate from './BuyDate.js';
import BSFilter from './BSFilter.js';
import PriceKm from './PriceKm.js';

@connect(
    ({bigtable})=>({
        ...bigtable
    })
)
export default class Sizer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            buydate: []
        };
    }
    render () {
        return (
            <div>
                <Tags/>
                <BSFilter/>
                <OneSizer
                    e={'color'}
                    c={'颜色'}
                    options={['红', '橙', '黄', '绿', '蓝', '紫', '黑', '白', '灰', '银灰', '香槟', '咖啡', '其他']}
                />
                <OneSizer
                    e={'exhaust'}
                    c={'发动机'}
                    options={['1.0L', '1.2L', '1.4L', '1.6L', '1.8L', '2.0L', '3.0L', '5.0L', '1.6T']}
                />
                <OneSizer
                    e={'engine'}
                    c={'尾气'}
                    options={['国一', '国二', '国三', '国四', '国五']}
                />
                <OneSizer
                    e={'fuel'}
                    c={'燃料'}
                    options={['柴油', '汽油', '油电混合', '纯电动']}
                />
                <BuyDate/>
                <PriceKm/>
            </div>
        );
    }
}
