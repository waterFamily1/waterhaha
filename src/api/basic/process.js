import request from '@/plugins/request';

//区域位置结构
export function regionalCon () {
    return request({
        url: '/uaa/api/processes/tree',
        method: 'get'
    })
}

//导出二维码
export function exportcode1 () {
    return request({
        url: '/uaa/api/process/qrcode-export',
        method: 'get'
    })
}
export function exportcode2 (data) {
    return request({
        url: '/uaa/api/processes/qrcode-export/progress?key='+data,
        method: 'get'
    })
}

//区域位置
export function getlocationInfor(data) {
    return request({
        url: 'uaa/api/processes/'+ data +'?detail=true',
        method: 'get'
    })
}

//新增
export function appendLocation(data) {
    return request({
        url: '/uaa/api/processes',
        method: 'post',
        data
    })
}

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

//删除
export function cancleLocation(data) {
    return request({
        url: '/uaa/api/processes/'+data,
        method: 'delete'
    })
}

//编辑
export function editLocation(data) {
    return request({
        url: '/uaa/api/processes',
        method: 'put',
        data
    })
}