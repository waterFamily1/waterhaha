import request from '@/plugins/request';

//查询所有组织
export function getAllOrg (data) {
    return request({
        url: '/uaa/api/organizations?exNoAuth='+data,
        method: 'get'
    })
}