import request from '@/plugins/request';

//查询所有用户
export function treeList () {
    return request({
        url: '/uaa/api/processes/tree',
        method:'get'
    })
}