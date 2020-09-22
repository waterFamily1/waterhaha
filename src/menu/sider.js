// 菜单，侧边栏
import dashboard from './modules/dashboard'
import supervise from './modules/supervise'              //实时监管
import dataManage from './modules/dataManage'            //数据管理
import dataQuality from './modules/dataQuality'          //数据质量
import productReport from './modules/productReport'      //生产报表
import videoManage from './modules/videoManage'          //视频管理
import alarmManage from './modules/alarmManage'          //报警管理
import deviceManage from './modules/deviceManage'        //设备管理
import pollingManage from './modules/pollingManage'      //巡检管理
import defectManage from './modules/defectManage'        //缺陷管理
import serviceManage from './modules/serviceManage'      //维修管理
import upkeepManage from './modules/upkeepManage'        //保养管理
import storeManage from './modules/storeManage'          //库存管理
import knowledgeManage from './modules/knowledgeManage'  //知识管理
import basicsManage from './modules/basicsManage'        //基础管理 
import systemManage from './modules/systemManage'        //系统管理

import other from './modules/other' //基础管理 => 导入

// 系统
import log from './modules/log'

// export default [
//     dashboard,
//     supervise,
//     dataManage,
//     dataQuality,
//     productReport,
//     videoManage,
//     alarmManage,
//     deviceManage,
//     pollingManage,
//     defectManage,
//     serviceManage,
//     upkeepManage,
//     storeManage,
//     knowledgeManage,
//     basicsManage,
//     systemManage,
//     log,
//     other
// ];

export default [
    // {
    //     path: '/log',
    //     title: '前端日志',
    //     header: 'system',
    //     icon: 'md-locate'
    // }, {
    //     path: '/dashboard',
    //     title: 'Dashboard',
    //     header: 'home',
    //     icon: 'md-speedometer',
    //     children: [
    //         {
    //             path: `/dashboard/console`,
    //             title: '主控台'
    //         }
    //     ]
    // }, {
    //     path: '/other',
    //     title: '导入',
    //     header: 'home',
    //     auth: ['hidden'],
    //     children: [
    //         {
    //             path: `/other/areaUpload`
    //         }
    //     ]
    // }, {
    //     path: '/process-view',
    //     title: '实时监管',
    //     header: 'home',
    //     custom: 'icon iconfont i-icon-demo icon-jianguan',
    //     children: [
    //         {
    //             path: `/dispatch/map`,
    //             title: '调度中心'
    //         }, {
    //             path: `/process-view/monitor`,
    //             title: '监视画面'
    //         }, {
    //             path: `/process-view/setting/2d`,
    //             title: '监视画面配置'
    //         }, {
    //             path: `/process-view/setting/3d`,
    //             title: '监视画面配置3D'
    //         }
    //     ]
    // }, {
    //     path: '/data',
    //     title: '数据管理',
    //     header: 'home',
    //     custom: 'icon iconfont i-icon-demo icon-wulumuqishigongandashujuguanlipingtai-ico-',
    //     children: [
    //         {
    //             path: `/data-analysis`,
    //             title: '数据曲线分析'
    //         }, {
    //             path: `/data-input/hour`,
    //             title: '人工数据采集'
    //         }, {
    //             path: `/data-input/brief`,
    //             title: '简报数据采集'
    //         }, {
    //             path: `/mpoint`,
    //             title: '测点管理'
    //         }, {
    //             path: `/mpoint/data-import`,
    //             title: '测点数据导入'
    //         }, {
    //             path: `/task-calc`,
    //             title: '计算任务'
    //         },{
    //             path: `/analyze/labourAdd`,
    //             title: '新增人工数据采集',
    //             auth: ['hidden']
    //         },
    //         {
    //             path: `/analyze/bulletinAdd`,
    //             title: '新增简报',
    //             auth: ['hidden']
    //         },
    //         {
    //             path: `/analyze/addAutomatic`,
    //             title: '新增自动采集测点',
    //             auth: ['hidden']
    //         }
    //     ]
    // }, {
    //     path: '/data-quality',
    //     title: '数据质量',
    //     header: 'home',
    //     custom: 'icon iconfont i-icon-demo icon-zhiliang',
    //     children: [
    //         {
    //             path: `/data-quality/statistics`,
    //             title: '质量统计'
    //         }, {
    //             path: `/stat/recountLog`,
    //             title: '重算日志',
    //             auth: ['hidden']
    //         }, {
    //             path: `/data-quality/setting`,
    //             title: '样本配置'
    //         }, {
    //             path: `/data-quality/standard`,
    //             title: '质量标准'
    //         }
    //     ]
    // }, {
    //     path: '/reportR',
    //     title: '生产报表',
    //     header: 'home',
    //     custom: 'icon iconfont i-icon-demo icon-icon',
    //     children: [
    //         {
    //             path: `/report`,
    //             title: '报表浏览'
    //         }, {
    //             path: `/report/brief`,
    //             title: '简报浏览'
    //         }, {
    //             path: `/report/setting/normal`,
    //             title: '报表配置'
    //         }, {
    //             path: `/report/setting/smart`,
    //             title: '智能报表配置'
    //         }
    //     ]
    // }, {
    //     path: '/monitor',
    //     title: '视频管理',
    //     header: 'home',
    //     custom: 'icon iconfont i-icon-demo icon-shipinzixun',
    //     children: [
    //         {
    //             path: `/monitor-screen/monitor`,
    //             title: '实时视频'
    //         }, {
    //             path: `/monitor-screen/capture`,
    //             title: '视频抓拍'
    //         }, {
    //             path: `/video`,
    //             title: '视频配置'
    //         }, {
    //             path: `/videoD/addVideo`,
    //             title: '视频添加',
    //             auth: ['hidden']
    //         }, {
    //             path: `/videoD/editVideo`,
    //             title: '视频编辑',
    //             auth: ['hidden']
    //         }, {
    //             path: `/videoD/checkVideo`,
    //             title: '视频详情',
    //             auth: ['hidden']
    //         }
    //     ]
    // }, {
    //     path: '/alarm',
    //     title: '报警管理',
    //     header: 'home',
    //     custom: 'icon iconfont i-icon-demo icon-zuoyebaojing',
    //     children: [
    //         {
    //             path: `/alarm/history`,
    //             title: '报警历史'
    //         }, {
    //             path: `/alarm/define`,
    //             title: '报警定义'
    //         }, {
    //             path: `/alarm/alarm/definAdd`,
    //             title: '新增报警定义',
    //             auth: ['hidden']
    //         }, {
    //             path: `/alarm/alarm/definCheck`,
    //             title: '查看报警定义',
    //             auth: ['hidden']
    //         }, {
    //             path: `/alarm/alarm/definEdit`,
    //             title: '编辑报警定义',
    //             auth: ['hidden']
    //         }, {
    //             path: `/alarm/subscribe`,
    //             title: '报警订阅'
    //         }, {
    //             path: `/alarm/alarm/takeAdd`,
    //             title: '新增报警订阅',
    //             auth: ['hidden']
    //         }, {
    //             path: `/alarm/alarm/takeEdit`,
    //             title: '编辑报警订阅',
    //             auth: ['hidden']
    //         }, {
    //             path: `/alarm/alarm/takeCheck`,
    //             title: '报警订阅详细',
    //             auth: ['hidden']
    //         }
    //     ]
    // }, {
    //     path: '/equU',
    //     title: '设备管理',
    //     header: 'home',
    //     custom: 'icon iconfont i-icon-demo icon-shebeiguanli',
    //     children: [
    //         {
    //             path: `/equ`,
    //             title: '设备台账'
    //         }, {
    //             path: `/equ/status/list`,
    //             title: '设备状态'
    //         },
    //         {
    //             path: `/addBook`,
    //             title: '添加设备',
    //             auth: ['hidden']
    //         }
    //     ]
    // }, {
    //     path: '/patrol',
    //     title: '巡检管理',
    //     header: 'home',
    //     custom: 'icon iconfont i-icon-demo icon-ditu',
    //     children: [
    //         {
    //             path: `/patrol/plan`,
    //             title: '巡检计划'
    //         }, {
    //             path: `/patrol/task`,
    //             title: '巡检任务'
    //         }, {
    //             path: `/patrol/trace`,
    //             title: '地图巡检跟踪'
    //         }, {
    //             path: `/patrol/statistics`,
    //             title: '巡检统计'
    //         }, {
    //             path: `/patrol/point`,
    //             title: '巡检点管理'
    //         },
    //         {
    //             path: `/plan/add`,
    //             title: '巡检计划新增',
    //             auth: ['hidden']
    //         },
    //         {
    //             path: `/addPoint`,
    //             title: '巡检点新增',
    //             auth: ['hidden']
    //         }
    //     ]
    // }, {
    //     path: '/faultD',
    //     title: '缺陷管理',
    //     header: 'home',
    //     custom: 'icon iconfont i-icon-demo icon-zhuyi',
    //     children: [
    //         {
    //             path: `/fault`,
    //             title: '消缺任务'
    //         }, {
    //             path: `/defect/declare`,
    //             title: '缺陷申报',
    //             auth: ['hidden']
    //         }, {
    //             path: `/defect/detail`,
    //             title: '缺陷详情',
    //             auth: ['hidden']
    //         }, {
    //             path: `/fault/statistics`,
    //             title: '缺陷统计'
    //         }
    //     ]
    // }, {
    //     path: '/repaiR',
    //     title: '维修管理',
    //     header: 'home',
    //     custom: 'icon iconfont i-icon-demo icon-weixiu',
    //     children: [
    //         {
    //             path: `/repair`,
    //             title: '维修工单'
    //         }, {
    //             path: `/repair/statistics`,
    //             title: '维修统计'
    //         },
    //         {
    //             path: `/serviceDetail`,
    //             title: '维修详情',
    //             auth: ['hidden']
    //         }
    //     ]
    // }, {
    //     path: '/maintain',
    //     title: '保养管理',
    //     header: 'home',
    //     custom: 'icon iconfont i-icon-demo icon-gongren',
    //     children: [
    //         {
    //             path: `/maintain/plan`,
    //             title: '保养计划'
    //         }, {
    //             path: `/upkeep/planDetail`,
    //             title: '保养计划详情',
    //             auth: ['hidden']
    //         }, {
    //             path: `/upkeep/planAllot`,
    //             title: '保养计划分配',
    //             auth: ['hidden']
    //         }, {
    //             path: `/maintain/task`,
    //             title: '保养任务'
    //         }, {
    //             path: `/maintain/statistics`,
    //             title: '保养统计'
    //         }
    //     ]
    // }, {
    //     path: '/knowledge',
    //     title: '知识管理',
    //     header: 'home',
    //     custom: 'icon iconfont i-icon-demo icon-zhishi',
    //     children: [
    //         {
    //             path: `/knowledge/overview`,
    //             title: '知识总览'
    //         }, {
    //             path: `/knowledge/doc`,
    //             title: '文档管理'
    //         }, {
    //             path: `/knowledge/label`,
    //             title: '标签管理'
    //         }, {
    //             path: `/knowledge/personal`,
    //             title: '我的知识'
    //         }
    //     ]
    // }, {
    //     path: '/basic',
    //     title: '基础管理',
    //     header: 'home',
    //     custom: 'icon iconfont i-icon-demo icon-jichuxinxi',
    //     children: [
    //         {
    //             path: `/basic/org`,
    //             title: '组织信息'
    //         }, {
    //             path: `/basic/user`,
    //             title: '用户信息'
    //         }, {
    //             path: `/basic/process`,
    //             title: '区域位置信息'
    //         }, {
    //             path: `/basic/equ`,
    //             title: '设备类型信息'
    //         }, {
    //             path: `/basic/user/checkUserInfor`,
    //             title: '用户详情',
    //             auth: ['hidden'] 
    //         }, {
    //             path: `/basic/user/editUserInfor`,
    //             title: '用户编辑',
    //             auth: ['hidden']
    //         }
    //     ]
    // }, {
    //     path: '/system',
    //     title: '系统管理',
    //     header: 'home',
    //     custom: 'icon iconfont i-icon-demo icon-xitong',
    //     children: [
    //         {
    //             path: `/system/role`,
    //             title: '角色权限'
    //         }, {
    //             path: `/terminal-setting`,
    //             title: '终端配置'
    //         }, {
    //             path: `/teminal/addUser`,
    //             title: '新建',
    //             auth: ['hidden']
    //         }, {
    //             path: `/teminal/terminalDetail`,
    //             title: '配置',
    //             auth: ['hidden']
    //         }, {
    //             path: `/teminal/terminalTest`,
    //             title: '测试',
    //             auth: ['hidden']
    //         }, {
    //             path: `/sim/sim-manager`,
    //             title: 'SIM卡管理'
    //         }, {
    //             path: `/indicator`,
    //             title: '指标管理'
    //         }, {
    //             path: `/index/indexAdd`,
    //             title: '新增指标',
    //             auth: ['hidden']
    //         }, {
    //             path: `/sim/sim-alarm`,
    //             title: '流量报警设置'
    //         }, {
    //             path: `/alarm/addAlarm`,
    //             title: '新增报警',
    //             auth: ['hidden']
    //         }, {
    //             path: `/system/logs`,
    //             title: '操作日志'
    //         }
    //     ]
    // }
]
