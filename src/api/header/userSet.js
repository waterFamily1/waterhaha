import request from '@/plugins/request';

//上传图片
export function uploadFun(data) {
    return request({
        url: '/zuul/base/api/files/upload',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}
// 用户设置 
export function userSetting (data) {
    return request({
        url: '/uaa/api/users',
        method:'put',
        data
    })
}
export function getUserCurrent () {
    return request({
        url: '/uaa/api/users/current?webOper='+true,
        method: 'get'
    });
}

//获取验证码
export function codeMethod(data) {
    return request({
        url: '/message/api/captchas',
        method: 'post',
        data
    })
}

//修改密码保存
export function pswMethod(data) {
    return request({
        url: '/uaa/api/users/forget-password',
        method: 'put',
        data
    })
}

//用户反馈
export function feedbackMethod(data) {
    return request({
        url: '/base/api/feedbacks',
        method: 'post',
        data
    })
}