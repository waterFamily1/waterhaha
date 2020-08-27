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

export function getUserAccount () {
    return request({
        url: '/uaa/api/account',
        method: 'get'
    });
}

//验证手机号
export function verifyPhone (data) {
    return request({
        url: '/uaa/api/users/validate-tel?tel:'+ data,
        method: 'get'
    });
}