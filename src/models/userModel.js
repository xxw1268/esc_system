import axios from 'axios';
import {message} from 'antd';

export default {
    namespace: 'user',
    state: {
        username: '',
        nickname: '',
        avatar: '',
        role: ''
    },
    reducers: {
        LOGINSUCCESS (state, {nickname, avatar, role, username}) {
            return {
                ...state,
                nickname,
                avatar,
                role,
                username
            };
        }
    },
    effects: {
        *LOGIN ({username, password}, {put}) {
            // 执行登录
            const data = yield axios.post('/api/login', {username, password}).then(data => data.data);
            if (data.result === 1) {
                // 存本地存储
                localStorage.setItem('token', data.token);
                // 查询/me接口，得到用户的姓名、权限、头像等等
                const {nickname, avatar, role} = yield axios.get('/api/me?token=' + data.token).then(data => data.data);
                yield put({'type': 'LOGINSUCCESS', nickname, avatar, role, username});
            } else {
                message.error('请输入正确的用户名和密码');
            }
        },
        *README (action, {put}) {
            // 读取token
            let token = localStorage.getItem('token');
            // 判断
            if (token === null) {
                window.location = '/#/login';
                return;
            }
            // 查询/me接口，得到用户的姓名、权限、头像等等
            const {nickname, avatar, role, username} = yield axios.get('/api/me?token=' + token).then(data => data.data);
            yield put({'type': 'LOGINSUCCESS', nickname, avatar, role, username});
        }
    }
};