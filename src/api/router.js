import request from '@/plugins/request';

export function getRouter () {
    return request({
        url: '/uaa/api/web-menus',
        method: 'get'
    });
}