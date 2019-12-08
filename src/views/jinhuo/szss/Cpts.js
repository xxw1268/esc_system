import React, {Component} from 'react';
import {connect} from 'dva';

@connect(
    ({szss}) => ({
        ...szss
    })
)
export default class Cpts extends Component {
    render () {
        const obj = {};
        // 遍历
        for (let i = 0; i < this.props.things.length; i++) {
            let pname = this.props.things[i].pname;
            if (pname in obj) {
                obj[pname].push(this.props.things[i]);
            } else {
                obj[pname] = [this.props.things[i]];
            }
        }
        return (
            <div>
                {
                    Object.keys(obj).map(pname => {
                        let benxiangxiaoji = 0;
                        return <div key={pname}>
                            <h3>产品<span>{pname}</span>将由以下工厂发货：</h3>
                            {
                                obj[pname].map(thing => {
                                    benxiangxiaoji += thing.pprice * thing.pnumber;
                                    return <div className="rrrbox" key={thing.pfactory}>
                                        <b>{thing.pfactory}工厂</b>
                                        发
                                        <b>{thing.pnumber}</b>
                                        箱，
                                        小计
                                        {thing.pprice * thing.pnumber}
                                        元
                                    </div>;
                                })
                            }
                            <h4>本产品小计：{benxiangxiaoji}元</h4>
                        </div>;
                    })
                }
            </div>
        );
    }
}
