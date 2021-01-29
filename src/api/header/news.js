import request from '@/plugins/request';

// 获取是否有未读消息  
export function getHasRead () {
    return request({
        url: 'message/api/messages/unread-flag',
        method: 'get'
    });
}

export function getList () {
    return request({
        url: 'message/api/messages?type=web&category=1&currentPage=1&pageSize=10',
        method: 'get'
    });
}
// 
export function getListCat (flag) {
    return request({
        url: 'message/api/messages?type=web&category=1&currentPage=1&pageSize=10&readFlag='+flag,
        method: 'get'
    });
}

