const pre = '/alarmManage/';

export default {
    path: '/alarmManage',
    title: '报警管理',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-zuoyebaojing',
    children: [
        {
            path: `${pre}alarmHistory`,
            title: '报警历史'
        }, {
            path: `${pre}alarmDefinition`,
            title: '报警定义'
        }, {
            path: `${pre}alarm/definAdd`,
            title: '新增报警定义',
            auth: ['hidden']
        }, {
            path: `${pre}alarm/definCheck`,
            title: '查看报警定义',
            auth: ['hidden']
        }, {
            path: `${pre}alarm/definEdit`,
            title: '编辑报警定义',
            auth: ['hidden']
        }, {
            path: `${pre}alarmTake`,
            title: '报警订阅'
        }, {
            path: `${pre}alarm/takeAdd`,
            title: '新增报警订阅',
            auth: ['hidden']
        }
    ]
}