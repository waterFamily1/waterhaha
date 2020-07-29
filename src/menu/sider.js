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

// 系统
import log from './modules/log'

export default [
    dashboard,
    supervise,
    dataManage,
    dataQuality,
    productReport,
    videoManage,
    alarmManage,
    deviceManage,
    pollingManage,
    defectManage,
    serviceManage,
    upkeepManage,
    storeManage,
    knowledgeManage,
    basicsManage,
    systemManage,
    log
];
