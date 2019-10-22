import React, {Component} from 'react';
import {connect} from 'dva';
import {Row, Col, Button, Tabs} from 'antd';
import classnames from 'classnames';

const {TabPane} = Tabs;

@connect(
    ({bigtable})=>({
        ...bigtable
    })
)
export default class BSFilter extends Component {
    constructor (props) {
        super(props);
        this.state = {
            nowzimu: ''
        };
    }
    componentWillMount (){
        this.props.dispatch({'type':'bigtable/ALLBSSAGA'});
    }
    render () {
        if (Object.keys(this.props.allbs).length === 0) return <div></div>;
        return (
            <div>
                <Row>
                    <Col span={2}>
                        <b>品牌：</b>
                    </Col>
                    <Col span={16}>
                        <Tabs defaultActiveKey='1'>
                            {
                                Object.keys(this.props.allbs).map(zimu=>{
                                    return <TabPane tab={zimu} key={zimu}>
                                        {
                                            Object.keys(this.props.allbs[zimu]).map(brand=>{
                                                return <a className={classnames(['allbs', {
                                                    'cur':this.props.brand === brand
                                                }])} key={brand} onClick={()=>{
                                                    this.props.dispatch({'type':'bigtable/FILTERSAGA', 'k': 'brand', 'v': brand});
                                                    this.setState({
                                                        nowzimu:zimu
                                                    });
                                                }}
                                                >{brand}</a>;
                                            })
                                        }
                                    </TabPane>;
                                })
                            }
                        </Tabs>
                    </Col>
                    <Col span={2} offset={2}>
                    </Col>
                </Row>
                <Row className='myrow'>
                    <Col span={2}>
                        <b>车系：</b>
                    </Col>
                    <Col span={16}>
                        {
                            (()=>{
                                if (this.state.nowzimu !== '' && this.props.brand !== ''){
                                    return this.props.allbs[this.state.nowzimu][this.props.brand].map(series=>{
                                        return <a className={classnames(['allbs', {
                                            'cur':this.props.series === series
                                        }])} key={series} onClick={()=>{
                                            this.props.dispatch({'type':'bigtable/FILTERSAGA', 'k': 'series', 'v': series});
                                        }}
                                        >{series}</a>;
                                    });
                                }
                            })()
                        }
                    </Col>
                    <Col span={2} offset={2}>
                    </Col>
                </Row>
            </div>
        );
    }
}
