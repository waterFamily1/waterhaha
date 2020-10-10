import request from '@/plugins/request';

//获取列表
export function getList(data) {
    return request({
        url: 'box/api/terminals?queryName='+data.queryName+'&processIds='+data.processModel+'&pageSize=10&currentPage='+data.pageNum+'',
        method: 'get'
    })
}

//区域位置结构
export function regionalCon() {
    return request({
        url: '/uaa/api/processes/tree',
        method: 'get'
    })
}

//删除
export function deleteList(data) {
    return request ({
        url: '/box/api/terminals?ids='+data,
        method: 'DELETE'
    })
}

//新增=>协议解析方法
export function analyMethod() {
    return request({
        url: '/box/api/terminals/parse-method',
        method: 'get'
    })
}

//新增=>SIM卡号
export function simMethod() {
    return request({
        url: '/box/api/sim-manager/cards/select',
        method: 'get'
    })
}

//新增保存
export function terminalSave(data) {
    return request({
        url: '/box/api/terminals',
        method: 'POST',
        data
    })
}

//配置
export function deployMethod(data) {
    return request({
        url: '/box/api/terminals/'+data,
        method: 'get'
    })
}

//配置=>保存
export function deploySaveMethod(data) {
    return request({
        url: '/box/api/terminals',
        method: 'PUT',
        data
    })
}