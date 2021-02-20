const state = {
    // 缺陷管理
    fault: {
        level: [
            { label: "严重", value: 1 },
            { label: "一般", value: 2 },
            { label: "轻微", value: 3 }
        ],
        levelText: {
            "1": "严重",
            "2": "一般",
            "3": "轻微"
        },
        state: [
            { label: "待处理", value: 0 },
            { label: "处理中", value: 1 },
            { label: "挂起", value: 2 },
            { label: "关闭", value: 3 },
            { label: "完成", value: 4 },
            { label: "未分配", value: 5 }
        ],
        stateText: {
            "0": "待处理",
            "1": "处理中",
            "2": "挂起",
            "3": "关闭",
            "4": "完成",
            "5": "未分配"
        },
        type: [
            { label: "工艺缺陷", value: 1 },
            { label: "设备缺陷", value: 2 },
            { label: "管理缺陷", value: 3 },
            { label: "其他缺陷", value: 4 }
        ],
        typeText: {
            "1": "工艺缺陷",
            "2": "设备缺陷",
            "3": "管理缺陷",
            "4": "其他缺陷"
        },
        handleState: [{ label: "挂起", value: 2 }, { label: "关闭", value: 3 }],
        handleStateText: {
            "2": "挂起",
            "3": "关闭"
        },
        handleReason: {
            "2": [
                { label: "缺少备品", value: 1 },
                { label: "等待整改", value: 2 },
                { label: "统一规划", value: 3 },
                { label: "其他原因", value: 4 }
            ],
            "3": [
                { label: "重复填报", value: 1 },
                { label: "误报", value: 2 },
                { label: "其他原因", value: 3 }
            ]
        },
        handleReasonText: {
            "2": {
                "1": "缺少备品",
                "2": "等待整改",
                "3": "统一规划",
                "4": "其他原因"
            },
            "3": {
                "1": "重复填报",
                "2": "误报",
                "3": "其他原因"
            }
        }
    },
    // 维修管理
    maintain: {
        type: [{ label: "维修", value: 1 }, { label: "更换", value: 2 }],
        typeText: {
            "1": "维修",
            "2": "更换"
        },
        state: [
            { label: "待处理", value: 0 },
            { label: "处理中", value: 1 },
            { label: "挂起", value: 2 },
            { label: "关闭", value: 3 },
            { label: "完成", value: 4 },
            { label: "未分配", value: 5 }
        ],
        stateText: {
            "0": "待处理",
            "1": "处理中",
            "2": "挂起",
            "3": "关闭",
            "4": "完成",
            "5": "未分配"
        },
        handleReason: {
            "2": [
                { label: "缺少备品", value: 1 },
                { label: "等待整改", value: 2 },
                { label: "统一规划", value: 3 },
                { label: "其他原因", value: 4 }
            ],
            "3": [
                { label: "重复填报", value: 1 },
                { label: "误报", value: 2 },
                { label: "其他原因", value: 3 }
            ]
        },
        handleReasonText: {
            "2": {
                "1": "缺少备品",
                "2": "等待整改",
                "3": "统一规划",
                "4": "其他原因"
            },
            "3": {
                "1": "重复填报",
                "2": "误报",
                "3": "其他原因"
            }
        },
        statusText: {
            "1": "待执行",
            "2": "执行中",
            "3": "已完成",
            "4": "转派中",
            "5": "逾期",
            "6": "待审核",
            "7": "物业已审核",
            "8": "消防已审核"
        }
    },
    storage: {
		inventory: {
			auditState: [ {label: '已审核', value: 1}, {label: '未审核', value: 0} ],
			auditStateText: {'1': '已审核', '0': '未审核'}
		}
    },
    // 视频管理
    video: {
        secondCount: {
            "3": "3",
            "4": "4",
            "5": "5",
            "6": "6",
            "7": "7",
            "8": "8",
            "9": "9",
            "10": "10"
        },
        minCount: {
            "0": "0",
            "1": "1",
            "2": "2",
            "3": "3",
            "4": "4",
            "5": "5",
            "6": "6",
            "7": "7",
            "8": "8",
            "9": "9",
            "10": "10"
        },
        tenMinCount: {
            "0": "0",
            "1": "1",
            "2": "2",
            "3": "3",
            "4": "4",
            "5": "5",
            "6": "6"
        }
    },
    // 区域位置
    process: {
        type: [{ label: "区域", value: 1 }, { label: "位置", value: 2 }],
        typeText: {
            "1": "区域",
            "2": "位置"
        }
    },
     // 巡检管理
    patrol: {
        // 巡检任务管理
        task: {
            type: [
                {
                    label: "普通巡检",
                    value: "inside"
                }, {
                    label: "地图巡检",
                    value: "outside"
                }
            ],
            state: {
                unallocated: "未分配",

                toBeExecuted: "待执行",

                executing: "执行中",

                finished: "已完成",

                abnormal: "异常",

                interrupt: "已终止"
            }
        },
        // 巡检计划
        plan: {
        planStates: {
            New: "新建",
            Ing: "执行中",
            Interrupt: "已终止",
            Finish: "已完成"
        },
        weeks: [
            { id: 1, name: "星期一" },
            { id: 2, name: "星期二" },
            { id: 3, name: "星期三" },
            { id: 4, name: "星期四" },
            { id: 5, name: "星期五" },
            { id: 6, name: "星期六" },
            { id: 7, name: "星期日" }
        ],
        weeksText: {
            "1": "星期一",
            "2": "星期二",
            "3": "星期三",
            "4": "星期四",
            "5": "星期五",
            "6": "星期六",
            "7": "星期日"
        },
        statesMap: [
            {
                label: "新建",
                value: "New"
            }, {
                label: "执行中",
                value: "Ing"
            }, {
                label: "已终止",
                value: "Interrupt"
            }, {
                label: "已完成",
                value: "Finish"
            }
        ],
        stateTexts: {
            New: "新建",
            Ing: "执行中",
            Interrupt: "已终止",
            Finish: "已完成"
        },
        clockMap: [
            {
                label: "正常",
                value: "1"
            }, {
                label: "异常",
                value: "2"
            }, {
                label: "未完成",
                value: "3"
            }
        ],
        clockTexts: {
            "1": "正常",
            "2": "异常",
            "3": "未完成"
        }
    },
        // 巡检统计
    statistics: {
        state: [
            {
                label: "未分配",
                value: "unallocated"
            },
            {
                label: "待执行",
                value: "toBeExecuted"
            },
            {
                label: "执行中",
                value: "executing"
            },
            {
                label: "已完成",
                value: "finished"
            },
            {
                label: "异常",
                value: "abnormal"
            },
            {
                label: "已终止",
                value: "interrupt"
            }
        ]
    }
    },
    // 测点管理
  mpoint: {
    type: [
      { label: "状态信号", value: "State" },
      { label: "数值信号", value: "Digtal" }
    ],
    source: [
      { label: "自动采集", value: "AUTO" },
      { label: "人工录入", value: "INPUT" },
      { label: "数据计算", value: "CALC" }
    ],
    sourceText: {
      AUTO: "自动采集",
      INPUT: "人工录入",
      CALC: "数据计算"
    },
    datype: [
      { datypeName: "状态信号", id: "State" },
      { datypeName: "数值信号", id: "Digtal" }
    ],
    datypeText: {
      State: "状态信号",
      Digtal: "数值信号"
    },
    // 信号类型
    status: [
      { statusName: "0,关;1,开;", id: "0,关;1,开;" },
      { statusName: "0,关;1,开;2,自动;", id: "0,关;1,开;2,自动;" },
      { statusName: "自定义", id: "-1" }
    ], // 状态值
    numtail: [
      { numtailName: "0", id: 0 },
      { numtailName: "1", id: 1 },
      { numtailName: "2", id: 2 },
      { numtailName: "3", id: 3 },
      { numtailName: "4", id: 4 },
      { numtailName: "5", id: 5 }
    ] // 小数位
  },
}

export default {
	state
}