import request from '@/plugins/request'

//保存
export function saveMethod(data) {
    return request({
        url: '/uaa/api/excel/import',
        method: 'post',
        data
    })
}