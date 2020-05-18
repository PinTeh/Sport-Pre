import axios from 'axios'
import Code from './code'
import { Message,MessageBox } from 'element-ui';
import { getToken } from './auth'
import store from '../store';
import router from '../router'

const instance = axios.create({
    baseURL: 'http://129.204.145.147:8080',
    timeout: 20000,
    //20s
    withCredentials: true
})

instance.interceptors.request.use(config => {
    config.headers.Authorization = getToken()
    return config
}, error => {
    Promise.reject(error)
})

instance.interceptors.response.use(res => {
    let ret = res.data;
    if (ret.code == Code.SUCCESS) {
        return res;
    } else if (ret.code == Code.UNAUTH) {
        store.dispatch('logout').then(() => {
            MessageBox.confirm('账号已过期, 点击确定重新登录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                router.push('/login');
              })
        })
    } else if (ret.code == Code.UNAUTHZ) {
        Message.error(ret.msg)
    }
    else if(ret.code == Code.ERROR){
        Message.error(ret.msg)
    }
}, err => {
    Message.warning("请求异常")
    return Promise.reject(err)
})

export default instance