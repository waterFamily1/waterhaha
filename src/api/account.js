import request from '@/plugins/request';

//登录
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

//验证手机号
export function verifyPhone (data) {
    return request ({
        url: '/uaa/api/users/validate-tel?tel='+data,
        method: 'get'
    })
}

//发送验证码
export function sendAuthCode (data) {
    return request({
        url: '/message/api/captchas',
        method: 'post',
        data
    })
}

//验证密码强弱
export function verifyCodeRule (data) {
    return request({
        url: '/uaa/api/users/validate-password-strength?password='+data,
        method: 'get'
    })
}

//修改密码
export function alterCode (data) {
    return request({
        url: '/uaa/api/users/forget-password',
        method: 'put',
        data
    })
}

