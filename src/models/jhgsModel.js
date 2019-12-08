import axios from 'axios';

export default {
    namespace: 'jhgs',
    state: {
        'results': []
    },
    reducers: {
        CHANGERESULTS (state, {results}) {
            return {
                ...state,
                results
            };
        }
    },
    effects: {
        *INIT (action, {put}) {
            const {results} = yield axios.get('http://192.168.2.250:8922/purchlist').then(data => data.data);
            yield put({'type': 'CHANGERESULTS', results});
        }
    }
};