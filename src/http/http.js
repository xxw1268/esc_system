import axios from 'axios';
import mockstategies from './mockstategies.js';
import url from 'url';

const http = axios.create({
});

// 拦截器
http.interceptors.response.use(function (response) {
    // 成功回调
    return response;
}, function (error) {
    // 失败回调
    if (error.response.status === 401) {
        // 如果是401错误（unhourizried）
        // 路由跳转到登录
        window.location = '/#/login';
    } else if (error.response.status === 404) {
        const pathname = url.parse(error.config.url, true).pathname;
        const queryobj = url.parse(error.config.url, true).query;
        console.log(pathname);
        // 检查是否有这个策略键
        if (pathname in mockstategies) {
            return mockstategies[pathname](queryobj);
        }
    }
    return;
});

export default http;
