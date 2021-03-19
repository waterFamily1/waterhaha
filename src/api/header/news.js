import request from '@/plugins/request';

// 获取是否有未读消息  
export function getHasRead() {
    return request({
        url: '/message/api/messages/unread-flag',
        method: 'get'
    });
}

export function getList(data) {
    return request({
        url: '/message/api/messages?type=web&category='+data.category+'&currentPage='+data.currentPage+'&pageSize=10',
        method: 'get'
    });
}
// 
export function getListCat(data) {
    return request({
        url: '/message/api/messages?type=web&category='+data.category+'&currentPage='+data.currentPage+'&pageSize=10&readFlag='+data.readFlag,
        method: 'get'
    });
}

//全部已读
export function readMethod(data) {
    return request({
        url: '/message/api/messages/read-all',
        method: 'put',
        data
    })
}

export function getDetail(data) {
    return request({
        url: '/message/api/messages/detail?id='+data,
        method: 'get'
    })
}

//上一条,下一条
export function onDetail(data) {
    return request({
        url: '/message/api/messages/detail?id='+data.id+'&pageTurn='+data.pageTurn+'&readFlag=read',
        method: 'get'
    })
}