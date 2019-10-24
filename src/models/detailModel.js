import axios from 'axios';
import querystring from 'querystring';

export default {
    namespace:'detail',
    state:{
        id:0,
        result:[]
    },
    reducers:{
        CHANGE (state, {result}){
            return {
                ...state,
                result
            };
        },
        CHANGEID (state, {id}){
            return {
                ...state,
                id
            };
        }
    },
    effects:{
        *INIT ({id}, {put}){
            const {result} = yield axios.get('/api/car/' + id).then(data=>data.data);
            yield put({'type': 'CHANGE', result});
            yield put({'type': 'CHANGEID', id});
        }
    }
};