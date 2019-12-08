import React, {Component} from 'react';
import TB from '../../layouts/TB.js';
import Tutu1 from './Tutu1.js';

export default class Index extends Component {
    constructor () {
        super();
    }
    render () {
        return (
            <TB>
                <Tutu1 />
            </TB>
        );
    }
}
