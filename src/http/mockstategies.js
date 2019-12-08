import mockjs from 'mockjs';
let Random = mockjs.Random;

export default {
    '/api/people/users': () => {
        return {
            'data': {
                'results': [
                    {'id': 1001, 'name': '罗韬'},
                    {'id': 1002, 'name': '朱德强'}
                ]
            }
        };
    },
    '/api/people/dingdans': (queryobj) => {
        console.log('我是策略，我找到你了');
        let results = [];
        for (let i = 1; i < 10; i++) {
            results.push({
                'id': 1000 + i + (queryobj.page - 1) * 10,
                'name': Random.cname()
            });
        }
        return {
            'data': {
                results
            }
        };
    }
};
