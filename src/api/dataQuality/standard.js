import request from '@/plugins/request';

//获取标准数据
export function getData () {
    return request({
        url: '/loong/api/data-quality/standard'
    })
}

// 回复默认
export function recover () {
    return request({
        url: '/loong/api/data-quality/standard-to-default',
        method: 'PUT',
        data:{}
    })
}
// 
export function saveEdit (data) {
    return request({
        url: '/loong/api/data-quality/standard',
        method: 'PUT',
        data
    })
}