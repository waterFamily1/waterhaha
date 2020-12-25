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
}

export default {
	state
}