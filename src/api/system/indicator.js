import request from '@/plugins/request';

//获取列表
export function getListMethod(data) {
    return request({
        url: '/loong/api/indexes?queryName=&processId=&indexType=&pageSize=10&currentPage=1',
        method: 'get'
    })
}