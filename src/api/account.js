import request from '@/plugins/request';

export function AccountLogin (data) {
    return request({
        url: '/auth/login',
        method: 'post',
        data
    });
}

export function AccountRegister (data) {
    return request({
        url: '/api/register',
        method: 'post',
        data
    });
}

export function getUserCurrent () {
    return request({
        url: '/uaa/api/users/current?webOper='+true,
        method: 'get'
    });
}
