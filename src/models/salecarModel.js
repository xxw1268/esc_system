import axios from 'axios';
import querystring from 'querystring';

export default {
    namespace:'salecar',
    state:{
        token: '',
        options:[]
    },
    reducers:{
        CHANGETOKEN (state, {token}){
            return {
                ...state,
                token
            };
        },
        OPTIONS (state, {options}){
            return {
                ...state,
                options
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
        *OPTIONSSAGA ({options}, {put}){
            yield put({'type': 'OPTIONS', options});
            console.log(options);
        }
    }
};