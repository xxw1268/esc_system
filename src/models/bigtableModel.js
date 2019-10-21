import axios from 'axios';
import querystring from 'querystring';

export default {
    namespace:'bigtable',
    state:{
        results:[],
        columnArr:[],
        total:0,
        current:1,
        pageSize:10,
        color:[],
        engine:[],
        exhaust:[],
        fuel:[]
    },
    reducers:{
        LOCALSTORAGE (state, {columnArr}){
            return {
                ...state,
                columnArr
            };
        },
        CHANGERESULTS (state, {results, total}){
            return {
                ...state,
                results,
                total
            };
        },
        CURRENT (state, {current}){
            return {
                ...state,
                current
            };
        },
        FILTER (state, {k, v}){
            return {
                ...state,
                [k]:v
            };
        }
    },
    effects:{
        *GETLOCALSTPRAGE (action, {put}){
            //从本地存储请求数据
            const columnLocalStorage = localStorage.getItem('columns');
            //判断本地存储中有没有数据，没有就设置
            if (columnLocalStorage === null){
                localStorage.setItem('columns', JSON.stringify(['image', 'id', 'color', 'brand']));
            }
            //再次从本地存储请求数据
            const columnArr = JSON.parse(localStorage.getItem('columns'));
            yield put({'type':'LOCALSTORAGE', columnArr});
        },
        *SETCOLUMNTOTALSTORAGE ({columns}, {put}){
            //重新设置columns数组,转化为字符串存放在本地存储中
            localStorage.setItem('columns', JSON.stringify(columns));
            yield put({'type':'GETLOCALSTPRAGE'});
        },
        *INIT (action, {put, select}){
            const {current, color, engine, exhaust, fuel} = yield select(({bigtable})=>bigtable);
            const {results, total} = yield axios.get('/api/car?' + querystring.stringify({
                'page':current,
                'color':color.join('v'),
                'engine':engine.join('v'),
                'exhaust':exhaust.join('v'),
                'fuel':fuel.join('v')
            })).then(data=>data.data);
            yield put({'type':'CHANGERESULTS', results, total});
        },
        *CURRENTSAGA ({current}, {put}){
            yield put({'type':'CURRENT', current});
            yield put({'type':'INIT'});
        },
        *FILTERSAGA ({k, v}, {put}){
            yield put({'type':'CURRENTSAGA', 'current':1});
            yield put({'type':'FILTER', k, v});
            yield put({'type':'INIT'});
        }
    }
};