const pre = '/systemManage/';

export default {
    path: '/systemManage',
    title: '系统管理',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-xitong',
    children: [
        {
            path: `${pre}rolePermission`,
            title: '角色权限'
        }, {
            path: `${pre}terminalDeploy`,
            title: '终端配置'
        }, {
            path: `${pre}teminal/addUser`,
            title: '新建',
            auth: ['hidden']
        }, {
            path: `${pre}teminal/terminalDetail`,
            title: '配置',
            auth: ['hidden']
        }, {
            path: `${pre}teminal/terminalTest`,
            title: '测试',
            auth: ['hidden']
        }, {
            path: `${pre}SIMManage`,
            title: 'SIM卡管理'
        }, {
            path: `${pre}indexManage`,
            title: '指标管理'
        }, {
            path: `${pre}index/indexAdd`,
            title: '新增指标',
            auth: ['hidden']
        }, {
            path: `${pre}flowAlarm`,
            title: '流量报警设置'
        }, {
            path: `${pre}alarm/addAlarm`,
            title: '新增报警',
            auth: ['hidden']
        }, {
            path: `${pre}handleLog`,
            title: '操作日志'
        }
    ]
}
