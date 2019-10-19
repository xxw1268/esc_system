import axios from 'axios';

export default {
    namespace: 'bigtable',
    state:{
        current:1,
        columnArr:[],
        results:[]
    },
    reducers:{
        CHANGECOLUMNS (state, {columnArr}){
            return {
                ...state,
                columnArr
            };
        },
        CHANGE (state, {results}){
            return {
                ...state,
                results
            };
        }
    },
    effects:{
        *GETLOCALSTORAGE (action, {put}){
            // 从本地存储度读取列的存储信息
            const localStorageArr = localStorage.getItem('columns');
            console.log(localStorageArr);
            //判断当前的数组是否为空，null表示第一次访问或者清空过缓存,
            //本地存储中并没有默认的项
            if (localStorageArr === null){
                localStorage.setItem('columns', JSON.stringify(['image', 'id', 'brand', 'color']));
            }

            //再次从本地存储读取存储信息并进行转换(字符串转换)
            const columnArr = JSON.parse(localStorage.getItem('columns'));

            yield put({'type':'CHANGECOLUMNS', columnArr});
        },
        *INIT (action, {put}){
            const {results} = yield axios.get('/api/car').then(data=>data.data);
            yield put({'type':'CHANGE', results});
        }
    }
};