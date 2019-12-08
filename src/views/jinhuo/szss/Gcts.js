import React, {Component} from 'react';
import {connect} from 'dva';

@connect(
    ({szss}) => ({
        ...szss
    })
)
export default class Gcts extends Component {
    render () {
        const obj = {};
        // 遍历
        for (let i = 0; i < this.props.things.length; i++) {
            let pfactory = this.props.things[i].pfactory;
            if (pfactory in obj) {
                obj[pfactory].push(this.props.things[i]);
            } else {
                obj[pfactory] = [this.props.things[i]];
            }
        }
        console.log(obj);
        return (
            <div>
                {
                    Object.keys(obj).map(pfactory => {
                        let benxiangxiaoji = 0;
                        return <div key={pfactory}>
                            <h3>工厂<span>{pfactory}</span>将发以下货：</h3>
                            {
                                obj[pfactory].map(thing => {
                                    benxiangxiaoji += thing.pprice * thing.pnumber;
                                    return <div className="rrrbox" key={thing.pname}>
                                        <b>{thing.pname}产品</b>
                                        发
                                        <b>{thing.pnumber}</b>
                                        箱，
                                        小计
                                        {thing.pprice * thing.pnumber}
                                        元
                                    </div>;
                                })
                            }
                            <h4>本工厂发货总值{benxiangxiaoji}元</h4>
                        </div>;
                    })
                }
            </div>
        );
    }
}
