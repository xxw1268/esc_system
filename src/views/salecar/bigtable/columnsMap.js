import React from 'react';
import moment from 'moment';

export default {
    'price': {
        'title': '价格'
    },
    'image': {
        'title': '图片',
        'render': (txt, {id})=>{
            return <div>
                <img width={80} src={`/api/images/carimages_small/${id}/view/${txt}`} alt=""/>
            </div>;
        }
    },
    'id': {
        'title': '编号'
    },
    'brand': {
        'title': '品牌'
    },
    'series': {
        'title': '车系'
    },
    'color': {
        'title': '颜色'
    },
    'km': {
        'title': '里程',
        'render':(txt)=>{
            return <div>
                {txt.toString().replace(/\B(?=(...)+$)/g, ',')}
            </div>;
        }
    },
    'engine': {
        'title': '发动机'
    },
    'buydate': {
        'title': '购买日期',
        'render':(txt)=>{
            return <div>
                {moment(txt).format('YYYY年MM月DD日')}
            </div>;
        }
    },
    'exhaust': {
        'title': '排放'
    },
    'fuel': {
        'title': '燃料'
    }
};
