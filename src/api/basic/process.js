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
        url: '/uaa/api/processes/qrcode-export/generate',
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