import axios from 'axios';

export default {
    namespace: 'szss',
    state: {
        // 全部三只松鼠产品
        'products': {},
        // 要发的东西，给服务器的
        'things': [
        ]
    },
    reducers: {
        // 改变全部产品
        CHANGEPRODUCTS (state, {products}) {
            return {
                ...state,
                products
            };
        },
        // 增加things数组，接收的载荷不是数组是一个JSON！！！thing不是things
        ADDTHING (state, {thing}) {
            return {
                ...state,
                'things': [...state.things, thing]
            };
        },
        // 改变things数组，接收的载荷不是数组是一个JSON！！！thing不是things
        UPDATETHING (state, {thing}) {
            return {
                ...state,
                'things': state.things.map(item => item.pname === thing.pname && item.pfactory === thing.pfactory ? thing : item)
            };
        },
        // 删除某个thing
        DELTHING (state, {thing}) {
            return {
                ...state,
                'things': state.things.filter(item => item.pname !== thing.pname || item.pfactory !== thing.pfactory)
            };
        }
    },
    effects: {
        *LOADPRODUCTS (action, {put}) {
            const {products} = yield axios.get('http://192.168.2.250:8922/product').then(data => data.data);
            yield put({'type': 'CHANGEPRODUCTS', products});
        },
        // 这里判断是增还是改
        *CHANGETHINGS ({things}, {put, select}) {
            const state = yield select(({szss}) => szss);
            // 遍历载荷的things，分别决定他们的put
            for (let i = 0; i < things.length; i++) {
                let isExist = false;
                for (let j = 0; j < state.things.length; j++) {
                    if (things[i].pname === state.things[j].pname && things[i].pfactory === state.things[j].pfactory) {
                        isExist = true;
                        if (things[i].pnumber === 0) {
                            yield put({'type': 'DELTHING', 'thing': things[i]});
                        } else {
                            yield put({'type': 'UPDATETHING', 'thing': things[i]});
                        }
                    }
                }
                if (!isExist) {
                    yield put({'type': 'ADDTHING', 'thing': things[i]});
                }
            }
        },
        *FAHUO (action, {select}) {
            const {things} = yield select(({szss}) => szss);
            // 向服务器发起猛攻
            yield axios.post('http://192.168.2.250:8922/addpurchlist', {
                shop: '京东商城',
                storage: '京东罗韬仓',
                things
            }).then(data => {
                console.log(data.data);
            });
        }
    }
};