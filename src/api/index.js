import request from '@/utils/request'

export default {
    login(username, password) {
        const data = {
            username,
            password
        }
        return request({
            url: '/staff/login',
            method: 'post',
            data
        })
    },
    logout() {
        return request.post('/logout')
    },
    userList(params) {
        return request({
            url: '/user/list',
            method: 'get',
            params
        })
    },
    saveUser(data) {
        return request({
            url: '/user/insert',
            method: 'post',
            data
        })
    },
    updateUser(data) {
        return request({
            url: '/user/update',
            method: 'post',
            data
        })
    },
    deleteUser(id) {
        return request({
            url: '/user/' + id,
            method: 'delete',
        })
    },
    gymList(params) {
        return request({
            url: '/gym/list',
            method: 'get',
            params
        })
    },
    saveGym(data) {
        return request({
            url: '/gym/insert',
            method: 'post',
            data
        })
    },
    updateGym(data) {
        return request({
            url: '/gym/update',
            method: 'post',
            data
        })
    },
    deleteGym(id) {
        return request({
            url: '/gym/' + id,
            method: 'delete',
        })
    },
    placeList(params) {
        return request({
            url: '/place/list',
            method: 'get',
            params
        })
    },
    updatePlace(params) {
        return request({
            url: '/place/update',
            method: 'post',
            params
        })
    },
    orderList(params) {
        return request({
            url: '/order/listall',
            method: 'get',
            params
        })
    },
    updateOrder(params) {
        return request({
            url: '/order/update',
            method: 'post',
            params
        })
    },
    deleteOrder(id) {
        return request({
            url: '/order/' + id,
            method: 'delete',
        })
    },
    storeList(params) {
        return request({
            url: '/store/list',
            method: 'get',
            params
        })
    },
    deleteStore(id){
        return request({
            url: '/store/' + id,
            method: 'delete',
        })
    },
    cityList(params) {
        return request({
            url: '/city/list',
            method: 'get',
            params
        })
    },
    saveCity(data) {
        return request({
            url: '/city/insert',
            method: 'post',
            data
        })
    },
    register(data) {
        return request({
            url: '/register',
            method: 'post',
            data
        })
    },

    number1() {
        return request({
            url: '/order/number1',
            method: 'get',
        })
    },
    
    number2() {
        return request({
            url: '/order/number2',
            method: 'get',
        })
    },
    
    number3() {
        return request({
            url: '/order/number3',
            method: 'get',
        })
    },
    
    number4() {
        return request({
            url: '/order/number4',
            method: 'get',
        })
    },
    
    number5() {
        return request({
            url: '/order/number5',
            method: 'get',
        })
    },
}