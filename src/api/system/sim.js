import request from '@/plugins/request';

//获取列表
export function getListMethod(data) {
    return request({
        url: '/box/api/sim-manager/cards?queryName=&pageSize=10&currentPage=1&iccidStart=&iccidEnd=&cardStatus=&operator=&percentage=',
        method: 'get'
    })
}

//租户名称
export function nameMethod() {
    return request({
        url: '/uaa/api/speed/users/admin',
        method: 'get'
    })
}

//删除
export function deleteList(data) {
    return request({
        url: '/box/api/sim-manager/cards?iccids='+data,
        method: 'DELETE'
    })
}

//添加SIM卡
export function addSim(data) {
    return request({
        url: '/box/api/sim-manager/cards?iccids=8986111921103970586;&userid=11&remark=1111111',
        method: 'post',
        data
    })
}

//查看详情
export function checkDetail(data) {
    return request({
        url: 'box/api/sim-manager/cards/detail/'+data,
        method: 'get'
    })
}

//查看详情=>选择年月
export function getDateMethod(data) {
    return request({
        url: 'box/api/sim-manager/card/flow?iccid='+data.iccid+'&queryTime='+data.dateVal+'&flowType='+data.flowType+'',
        method: 'get'
    })
}