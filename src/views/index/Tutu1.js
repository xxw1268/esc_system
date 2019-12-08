import React, {Component} from 'react';
import TB from '../../layouts/TB.js';
import http from '../../http/http.js';
import {Pagination} from 'antd';
import echarts from 'echarts';

export default class Tutu1 extends Component {
    constructor () {
        super();
    }
    componentDidMount () {
        let tutu1 = echarts.init(this.refs.tutu1);
        tutu1.setOption({
            title: {
                text: 'ECharts 入门示例',
                textStyle: {
                    color: 'blue'
                }
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
    render () {
        return (
            <div ref="tutu1" style={{'width': '400px', 'height': '300px'}}></div>
        );
    }
}
