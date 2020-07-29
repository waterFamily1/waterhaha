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
            path: `${pre}alarmTake`,
            title: '报警订阅'
        }
    ]
}