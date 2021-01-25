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
        url: 'uaa/api/users',
        method:'put',
        data
    })
}