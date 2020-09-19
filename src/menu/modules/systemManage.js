const pre = '/systemManage/';

export default {
    path: '/system',
    title: '系统管理',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-xitong',
    children: [
        {
            path: `/system/role`,
            title: '角色权限'
        }, {
            path: `/terminal-setting`,
            title: '终端配置'
        }, {
            path: `/teminal/addUser`,
            title: '新建',
            auth: ['hidden']
        }, {
            path: `/teminal/terminalDetail`,
            title: '配置',
            auth: ['hidden']
        }, {
            path: `/teminal/terminalTest`,
            title: '测试',
            auth: ['hidden']
        }, {
            path: `/sim/sim-manager`,
            title: 'SIM卡管理'
        }, {
            path: `/indicator`,
            title: '指标管理'
        }, {
            path: `/index/indexAdd`,
            title: '新增指标',
            auth: ['hidden']
        }, {
            path: `/sim/sim-alarm`,
            title: '流量报警设置'
        }, {
            path: `/alarm/addAlarm`,
            title: '新增报警',
            auth: ['hidden']
        }, {
            path: `/system/logs`,
            title: '操作日志'
        }
    ]
}
