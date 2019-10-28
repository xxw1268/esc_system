import axios from 'axios';
import querystring from 'querystring';

export default {
    namespace:'salecar',
    state:{
        'token': '',
        'step': 3,
        'step1data': {}
    },
    reducers:{
        CHANGETOKEN (state, {token}){
            return {
                ...state,
                token
            };
        },
        CHANGESTEP (state, {step, step1data}) {
            return {
                ...state,
                step,
                step1data: step1data !== undefined ? step1data : state.step1data
            };
        }
    },
    effects:{
        *SENDMSGSAGA ({phone}, {put}){
            const token = yield axios.get('http://192.168.2.250:8949/sendmsg.php?' + querystring.stringify({
                'phone' : phone
            })).then(data=>data.data);
            yield put({'type': 'CHANGETOKEN', token});
        },
        *ADDCAR ({views, inner, more, engine}, {put}){
            yield put({'type': 'CHANGESTEP', 'step': 3});
        }
    }
};