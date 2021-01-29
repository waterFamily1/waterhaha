<template>
    <div class="check-wrap" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>报警定义</h3> 
            <div class="c-btns-right">
                <Button type="primary" class="c-btn-back" @click="goBack()">返回</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
            <Row>
                <Col span="12">
                    <div class="item-form">
                        <label>区域位置：</label>
                        <span>{{ receiveObj.siteName }}</span>
                    </div>
                    <div class="item-form">
                        <label>触发时间：</label>
                        <span>{{ touchTime }}</span>
                    </div>
                    <div class="item-form">
                        <label>报警等级：</label>
                        <span>{{ receiveObj.alarmLevel }}</span>
                    </div>
                    <div class="item-form">
                        <label>报警条件：</label>
                        <span>{{ conditionList[Number(receiveObj.alarmCondition)-1] }}</span>
                    </div>
                </Col>
                <Col span="12">
                    <div class="item-form">
                        <label>确认方法：</label>
                        <span>{{ method }}</span>
                    </div>
                    <div class="item-form">
                        <label>报警名称：</label>
                        <span>{{ receiveObj.alarmName }}</span>
                    </div>
                    <div class="item-form">
                        <label>使用状态：</label>
                        <span>{{ receiveObj.enabledStatus=='ON'?'启用':'停用' }}</span>
                    </div>
                </Col>
            </Row>
        </div>
        <div style="padding: 0 20px;">
            <Tabs :animated="false">
                <TabPane label="报警条件">
                    <Table :columns="columns1" :data="data1"></Table>
                </TabPane>
                <TabPane label="报警订阅">
                    <div class="c-table-top-btns">
                        <Checkbox v-model="single" disabled>同步接收报警确认消息</Checkbox>
                    </div>
                    <Table :columns="columns2" :data="data2"></Table>
                </TabPane>
                <TabPane label="处理预案">
                    <Table :columns="columns3" :data="data3"></Table>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script>
// 
import { getDetail} from '@/api/alarm/definition'
export default {
    name: 'definCheck',
    data() {
        return {
            height: '',
            touchTime: '',
            method: '',
            name: '控制柜停机报警',
            state: '启用',
            single: true,
            columns1: [
                {
                    title: '测点名称',
                    key: 'mpointName'
                }, {
                    title: '条件',
                    key: 'symbol'
                }, {
                    title: '阈值',
                    key: 'threshold'
                }, {
                    title: '单位',
                    key: 'unit'
                }, {
                    title: '所属设备',
                    key: 'equipmentName'
                }
            ],
            data1: [],
            columns2: [
                {
                    title: '接收对象',
                    key: 'userName'
                }, {
                    title: '接收方式',
                    key: 'subscribeMode',
                    render: (h, params) => {
                         let a = params.row.subscribeMode
                        const text = a.indexOf(',')!=-1?'短信,在线消息':(a=='SysMsg'?'在线消息':'短信')
                        return h('span', {
                        }, text);
                    }
                }, {
                    title: '推送频率',
                    key: 'pushFrequency',
                     render: (h, params) => {
                        let that = this
                        const text = Number(params.row.pushFrequency)-1
                        return h('span', {}, that.freList[text]);
                    }
                }, {
                    title: '延迟推送时间',
                    key: 'delayPushTime',
                     render: (h, params) => {
                        let that = this
                        const text = Number(params.row.delayPushTime)-1
                        return h('span', {}, that.delayList[text]);
                    }
                }
            ],
            data2: [],
            columns3: [
                {
                    title: '预案内容',
                    key: 'name',
                    width: 800,
                    render: (h, params) => {
                        let that = this
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'textarea',
                                    readonly:true,
                                    value: that.data3[0].processingPlan
                                }
                            })
                        ]);
                    }
                }, {
                    title: '联系人',
                    key: 'name',
                    render: (h, params) => {
                        let that = this
                        return h('div',{},that.data3[0].contactPersonName);
                    }
                }
            ],
            data3: [],
            receiveObj:{},
            conditionList: ['满足其中一条触发规则','满足所有规则后触发'],
            timeList: [
                {
                    value: '0',
                    label: '立即触发'
                }, {
                    value: '1',
                    label: '延迟1分钟触发'
                }, {
                    value: '5',
                    label: '延迟5分钟触发'
                }, {
                    value: '10',
                    label: '延迟10分钟触发'
                }
            ],
            freList:['5分钟','10分钟','15分钟','30分钟','1小时','2小时','12小时','24小时','仅推送1次'],
            delayList :['5分钟','10分钟','15分钟','30分钟','1小时','2小时','12小时','24小时','仅推送1次','不推送'],
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.geDefDetail()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        geDefDetail(){
            getDetail(this.$route.query.id).then(res=>{
                console.log(res)
                if(res.data){
                    let temp = res.data
                    this.receiveObj = res.data
                    this.method = temp.disarmMethod == 'AutoOrManual'?'自动或者人工':(temp.disarmMethod == 'Manual'?'人工':'自动')
                    this.data1 = temp.conditions
                    this.data2 = temp.subscribeList
                    this.data3 = [{
                        processingPlan:temp.processingPlan,
                        contactPersonName:temp.contactPersonName
                    }]
                    this.single = temp.subscribeList[0].pushReleaseMessage == 'Y'?true:false
                    this.timeList.map(item=>{
                        if(item.value == res.data.alarmWaitTime){
                            this.touchTime = item.label
                        }
                    })
                }

            })
        }
    }
}
</script>
<style lang="less" scoped>
.check-wrap {
    margin: 5px;
    background: #fff;
    .c-left-border-blue {
        border-radius: 3px;
        padding: 5px;
        h3 {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            text-indent: 10px;
        }
        .c-btns-right {
            float: right;
            margin-top: 2px;
            .ivu-btn {
                min-width: 70px;
                margin: 0 5px;
                border: none;
                height: 28px;
                background-color: #576374;
            }
            .c-btn-back {
                background: #c8c8c8;
            }
        }
    }
    .c-top-border-gray {
        padding: 20px 0;
        border-top: 5px solid #f0f0f0;
        /deep/.ivu-row {
            padding-left: 20px;
        }
        .item-form {
            min-height: 40px;
            line-height: 24px;
            vertical-align: top;
            padding-left: 10px;
            padding-top: 9px;
            label {
                font-weight: 700;
            }
        }
    }
    .c-table-top-btns {
        overflow: hidden;
        height: 36px;
        border-bottom: 1px solid #EEE;
        /deep/.ivu-checkbox-wrapper {
            float: right;
        }
    }
}
</style>