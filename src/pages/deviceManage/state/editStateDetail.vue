<template>
    <div class="edit-state" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>设备状态详情</h3>
            <div class="c-btns-right">
                <Button @click="back()">返回</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
            <Row>
                <Col span="12">
                    <div class="c-form-item">
                        <label>设备名称：</label>
                        <span>{{ name }}</span>
                    </div>
                    <div class="c-form-item">
                        <label>运行状态：</label>
                        <span>{{ maintainState }}</span>
                    </div>
                    <div class="c-form-item">
                        <label>设备类型：</label>
                        <span>{{ typeName }}</span>
                    </div>
                    <div class="c-form-item">
                        <label>所属组织：</label>
                        <span>{{ orgName }}</span>
                    </div>
                </Col>
                <Col span="12">
                    <div class="c-form-item">
                        <label>设备编号：</label>
                        <span>{{ code }}</span>
                    </div>
                    <div class="c-form-item">
                        <label>资产状态：</label>
                        <span>{{ state }}</span>
                    </div>
                    <div class="c-form-item">
                        <label>ABC类：</label>
                        <span>{{ abc }}</span>
                    </div>
                    <div class="c-form-item">
                        <label>区域位置：</label>
                        <span>{{ processName }}</span>
                    </div>
                </Col>
            </Row>
        </div>
        <div class="c-top-border-gray" style="padding-left: 10px;padding-right: 10px;">
            <Tabs :animated="false">
                <TabPane label="相关测点">
                    <Table 
                        size="small" 
                        :columns="mpointColumns" 
                        :data="mpointListData" 
                        :loading="mpointLoading" 
                        stripe
                    ></Table>
                    <Page 
                        :total="mpointTotal" 
                        :page-size="mpointParams.pageSize" 
                        size="small" 
                        :current="mpointParams.currentPage" 
                        class="table-page" 
                        show-total 
                        @on-change="mpointPageChange"
                    ></Page>
                </TabPane>
                <TabPane label="相关报警">
                    <Table 
                        size="small" 
                        :columns="alarmColumns" 
                        :data="alarmListData" 
                        :loading="alarmLoading" 
                        stripe
                    ></Table>
                    <Page 
                        :total="alarmTotal" 
                        :page-size="alarmParams.pageSize" 
                        size="small" 
                        :current="alarmParams.currentPage" 
                        class="table-page" 
                        show-total 
                        @on-change="alarmPageChange"
                    ></Page>
                </TabPane>
                <TabPane label="设备状态">
                    <Row class="tab-row">
                        <Col span="12">
                            <div class="c-form-item">
                                <label>使用时间：</label>
                                <span>{{ usageTime }}</span>
                            </div>
                            <div class="c-form-item">
                                <label>缺陷总数：</label>
                                <span>{{ faultTotal }}次</span>
                            </div>
                            <div class="c-form-item">
                                <label>养护总数：</label>
                                <span>{{ maintainTotal }}次</span>
                            </div>
                        </Col>
                        <Col span="12">
                            <div class="c-form-item">
                                <label>保修年限：</label>
                                <span>{{ warrantyTime }}</span>
                            </div>
                            <div class="c-form-item">
                                <label>维修总数：</label>
                                <span>{{ repairTotal }}次</span>
                            </div>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane label="缺陷历史">
                    <div class="equ-status-tab-select">
                        <Select v-model="faultDateRange.y" @on-change="faultDateChange" placement="bottom" :transfer="true" size="small">
                            <Option v-for="item in year" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Select v-model="faultDateRange.m" @on-change="faultDateChange" placement="bottom" :transfer="true" size="small">
                            <Option v-for="item in month" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                    <Table 
                        size="small" 
                        :columns="faultColumns" 
                        :data="faultListData" 
                        :loading="faultLoading" 
                        stripe
                    ></Table>
                    <Page 
                        size="small" 
                        :total="faultTotal" 
                        :page-size="faultParams.pageSize" 
                        :current="faultParams.currentPage" 
                        class="table-page" 
                        show-total 
                        show-elevator 
                        @on-change="faultPageChange"
                    ></Page>
                </TabPane>
                <TabPane label="维修历史">
                    <div class="equ-status-tab-select">
                        <Select v-model="repairDateRange.y" @on-change="repairDateChange" :transfer="true" size="small">
                            <Option v-for="item in year" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Select v-model="repairDateRange.m" @on-change="repairDateChange" placement="bottom" :transfer="true" size="small">
                            <Option v-for="item in month" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                    <Table 
                        size="small" 
                        :columns="repairColumns" 
                        :data="repairListData" 
                        :loading="repairLoading" 
                        stripe
                    ></Table>
                    <Page 
                        size="small" 
                        :total="repairTotal" 
                        :page-size="repairParams.pageSize" 
                        :current="repairParams.currentPage" 
                        class="table-page" 
                        show-total 
                        show-elevator 
                        @on-change="repairPageChange"
                    ></Page>
                </TabPane>
                <TabPane label="保养历史">
                    <div class="equ-status-tab-select">
                        <Select v-model="maintainDateRange.y" @on-change="maintainDateChange" :transfer="true" size="small">
                            <Option v-for="item in year" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Select v-model="maintainDateRange.m" @on-change="maintainDateChange" placement="bottom" :transfer="true" size="small">
                            <Option v-for="item in month" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                    <Table 
                        size="small"
                        :columns="maintainColumns" 
                        :data="maintainListData" 
                        :loading="maintainLoading" 
                        stripe
                    ></Table>
                    <Page 
                        size="small"
                        :total="maintainTotal" 
                        :page-size="maintainParams.pageSize" 
                        :current="maintainParams.currentPage" 
                        class="table-page" 
                        show-total 
                        show-elevator 
                        @on-change="maintainPageChange"
                    ></Page>
                </TabPane>
                <TabPane label="备注历史">
                    <div class="equ-status-tab-select">
                        <Button @click="addHistory()">新增</Button>
                    </div>
                    <Table 
                        size="small"
                        :columns="historyColumns" 
                        :data="historyListData" 
                        :loading="historyLoading" 
                        stripe
                    ></Table>
                    <Page 
                        size="small"
                        :total="historyTotal" 
                        :page-size="historyParams.pageSize" 
                        :current="historyParams.currentPage" 
                        class="table-page" 
                        show-total 
                        show-elevator 
                        @on-change="historyPageChange"
                    ></Page>
                </TabPane>
            </Tabs>
        </div>
        <!-- 新增备注历史 -->
        <Modal
            v-model="historyModal"
            title="新增备注历史">
            <Form ref="historyValidate" :model="historyValidate" :rules="historyRuleValidate" :label-width="100">
                <FormItem label="备注人：">
                    <span>{{ historyValidate.name }}</span>
                </FormItem>
                <FormItem label="备注内容：" prop="remark">
                    <Input 
                        v-model="historyValidate.remark" 
                        type="textarea" 
                        :autosize="{minRows: 2,maxRows: 5}"
                    ></Input>
                </FormItem>
                <FormItem label="相关人：">
                    <Select v-model="historyValidate.person" style="width:200px">
                        <Option v-for="item in personList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="cancelHistory('historyValidate')">取消</Button>
                <Button type="primary" @click="sureHistory('historyValidate')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { detailMethod, mpointMethod, alarmMethod, faultMethod, repairMethod, mainMethod, hisMethod, personMethod, newHisMethod } from '@/api/deviceManage/deviceDetail'
import util from '@/libs/public_js'
import DTU from '@/libs/datetime'

const year = (function(){
    var cur = new Date().getFullYear(),
        arr = [];
    for (let index = 0; index < cur - 2015 + 1; index++) {
        arr.push({
            label: cur - index + '年',
            value: cur - index
        })
    }
    return arr;
}());

const month = [{
        label: '全年',
        value: '0'
    },{
        label: '12月',
        value: '12'
    },{
        label: '11月',
        value: '11'
    },{
        label: '10月',
        value: '10'
    },{
        label: '9月',
        value: '09'
    },{
        label: '8月',
        value: '08'
    },{
        label: '7月',
        value: '07'
    },{
        label: '6月',
        value: '06'
    },{
        label: '5月',
        value: '05'
    },{
        label: '4月',
        value: '04'
    },{
        label: '3月',
        value: '03'
    },{
        label: '2月',
        value: '02'
    },{
        label: '1月',
        value: '01'
    }];

export default {
    name: 'editStateDetail',
    data() {
        return {
            year: year,
            month: month,
            height: '',
            id: '',
            name: '',
            maintainState: '',
            typeName: '',
            orgName: '',
            tenantId: '',
            code: '',
            state: '',
            abc: '',
            processName: '',
            usageTime: '',
            warrantyTime: '',
            faultTotal: '',
            repairTotal: '',
            maintainTotal: '',
            mpointColumns: [
                { title: '测点编号', key: 'mpointId', width: 120 },
                { title: '测点名称', key: 'mpointName' },
                { title: '数据分类', key: 'categoryName' },
                { title: '当前值', key: 'value' },
                { title: '单位', key: 'unit' , width: 120},
                { title: '业务时间', key: 'datadt', width: 120, 
                    render(h, data) {
                	    return util.tableDatetime(h, data.row.datadt);
                    } 
                },
                { title: '信号类型', key: 'datype', width: 120,
                    render: (h, params) => {
                        let text= params.row.datype =='Digtal'?'A':'D'
                        let color = params.row.datype =='Digtal'?'#7ED321':'#4A90E2'
                        return h('div',{
                            style:{
                                background:color,
                                width:'20px',
                                height:'20px',
                                lineHeight:'20px',
                                color:'#fff',
                                fontSize:'12px',
                                borderRadius:'50%',
                                textAlign:'center'
                            }
                        },text);
                    }
                },
                { title: '数据来源', key: 'datasource', width: 100,
                    render: (h, params) => {
                        let text
                        if(params.row.datasource == 'AUTO') {
                            text = '自动采集'
                        } else if(params.row.datasource == 'INPUT') {
                            text = '人工录入'
                        } else if(params.row.datasource == 'CALC') {
                            text = '数据计算'
                        } else if(params.row.datasource == 'ANALYSIS') {
                            text = '数据分析'
                        }
                        return h('span', text)
                    }
                }
            ],
            mpointListData: [],
            mpointLoading: false,
            mpointTotal: 0,
            mpointParams: {
                equId: this.$route.query.id,
                currentPage: 1,
                pageSize: 10
            },
            alarmColumns: [
                { title: '报警名称', key: 'alarmName'},
                { title: '报警状态', key: 'alarmStatus', width:90,
                    render: (h, data) => {
                        let text = data.row.alarmStatus =='Unremove'?'未解除':'已解除'
                        let cla = data.row.alarmStatus =='Unremove'?'orange':'gray'
                        return h('Tag', {
                            class: [cla]
                        }, text)
                    } },
                { 
                    title: '等级', 
                    key: 'alarmLevel', 
                    width: 60,
                    render: (h, data) => {
                        return h("span", {
                            class: ['alarm-lev-'+data.row.alarmLevel]
                        }, data.row.alarmLevel+'级');
                    }
                },
                {
                    title: '发生时间', 
                    key: 'alarmTriggerTime', 
                    width: 110,
                    render: (h, data) => {
                        return util.tableDatetime(h, data.row.alarmTriggerTime)
                    } 
                },
                {
                    title: '解除时间', 
                    key: 'alarmReleaseTime',
                    width: 110,
                    render: (h, data) => {
                        return util.tableDatetime(h, data.row.alarmReleaseTime)
                    } 
                },
                {title: '持续时间', key: 'duration'},
                {title: '确认人员', key: 'releaseUserName'},
                {title: '订阅状态', key: 'subscribeAlarm', 
                    render: (h, data)=>{
                        var s = (data.row.subscribeAlarm == 0 ? '否' : '是')
                        return h('span', s)
                    }
                },
            ],
            alarmListData: [],
            alarmLoading: false,
            alarmTotal: 0,
            alarmParams: {
                equId: this.$route.query.id,
                currentPage: 1,
                pageSize: 10
            },

            faultDateRange:{
                y: new Date().getFullYear(),
                m: "0"
            },
            faultParams:{
                equId: this.$route.query.id,
                startDate: '',
                endDate: '',
                pageSize: 10,
                currentPage: 1
            },
            faultColumns: [
                { 
                    title: "缺陷类型", 
                    key: "faultTypeName"
                },
                {
                    title: "严重程度",
                    key: "severityType",
                    width:100,
                    render:(h, params) => {
                        return h('span', params.row.severityType)
                    }
                },
                {
                    title: "申报人",
                    key: "createUser",
                },
                {
                    title: "申报时间",
                    key: "createDate",
                    width: 110,
                    render (h, data) {
                        return util.tableDatetime(h, data.row.createDate);
                    }
                },
                 {
                    title: "状态",
                    key: "stateName",
                    width:100
                },
                {
                    title: "缺陷编号",
                    key: "faultNumber",
                    render(h, data) {
                        return h('a', {
                            style: {
                                color: '#0bb1df',
                                textDecoration: 'underline'
                            },
                            // on:{
                            //     click: function() {
                            //         _this.$router.push({name: 'fault-detail', params: {id: data.row.id}})
                            //     }
                            // }
                        }, data.row.faultNumber)
                    }
                },
                {
                    title: "当前处理人",
                    key: "processingPersonName"
                },
                {
                    title: "处理时间",
                    key: "processingDate",
                    width:110,
                    render (h, data) {
                        return util.tableDatetime(h, data.row.processingDate);
                    }
                },
            ], 
            faultListData: [],
            faultLoading: false,
            faultTotal: 0,

            repairDateRange:{
                y: new Date().getFullYear(),
                m: "0"
            },
            repairParams:{
                equId: this.$route.query.id,
                startDate: '',
                endDate: '',
                pageSize: 10,
                currentPage: 1
            },
            repairColumns: [
                    { 
                        title: "维系措施", 
                        key: "repairTypeName"
                    },
                    {
                        title: "维修编号",
                        key: "repairNumber",
                        render(h, data) {
                            return h('a', {
                                style: {
                                    color: '#0bb1df',
                                    textDecoration: 'underline'
                                },
                                // on:{
                                //     click: function() {
                                //         _this.$router.push({name: 'repair-detail', params: {id: data.row.id}})
                                //     }
                                // }
                            }, data.row.repairNumber)
                        }
                    },
                    {
                        title: "报修时间",
                        key: "createDate",
                        width:110,
                        render (h, data) {
                            return util.tableDatetime(h, data.row.createDate);
                        }
                    },
                    {
                        title: "报修人",
                        key: "createUserName"
                    },
                    {
                        title: "状态",
                        key: "stateName"
                    },
                    {
                        title: "缺陷编号",
                        key: "faultNumber"
                    },
                    {
                        title: "当前维修人",
                        key: "processingPersonName"
                    },
                    {
                        title: "处理时间",
                        key: "processingDate",
                        width:110,
                        render (h, data) {
                            return util.tableDatetime(h, data.row.processingDate);
                        }
                    },
            ], 
            repairListData: [],
            repairLoading: false,
            repairTotal: 0,

            maintainDateRange:{
                y: new Date().getFullYear(),
                m: "0"
            },
            maintainParams:{
                equId: this.$route.query.id,
                startDate: '',
                endDate: '',
                pageSize: 10,
                currentPage: 1
            },
            maintainColumns: [
                { 
                    title: "保养任务名称", 
                    key: "taskName",
                    ellipsis: true
                }, 
                { 
                    title: "任务编号", 
                    key: "taskCode",
                    width: 200,
                    render(h, data) {
                        return h('a', {
                            style: {
                                color: '#0bb1df',
                                textDecoration: 'underline'
                            },
                            // on:{
                            //     click: function() {
                            //         _this.$router.push({name: 'maintain-task-detail', params: {id: data.row.id}})
                            //     }
                            // }
                        }, data.row.taskCode)
                    }
                }, 
                { 
                    title: "开始时间", 
                    key: "startDate",
                    width: 110,
                    render(h, data) {
                        return util.tableDatetime(h, data.row.startDate);
                    }
                }, 
                { 
                    title: "结束时间", 
                    key: "endDate",
                    width: 110,
                    render(h, data) {
                        return util.tableDatetime(h, data.row.endDate);
                    }
                }, 
                { 
                    title: "执行人", 
                    key: "executeUserName"
                }, 
                { 
                    title: "状态", 
                    key: "state",
                    width: 100,                    
                    render: (h, params) => {
                        return h(
                            "span",
                            params.row.state
                        );
                    }
                }, 
                { 
                    title: "保养持续时间", 
                    key: "planDuration"
                }, 
                { 
                    title: "保养完成", 
                    key: "contentsItems"
                }, 
                { 
                    title: "缺陷数量", 
                    key: "faults"
                }, 
            ], 
            maintainListData: [],
            maintainLoading: false,
            maintainTotal: 0,

            historyColumns: [
                {
                    title: "日期", 
                    key: 'createTime',
                    width: 140,
                    render(h, data) {
                        return util.tableDatetime(h, data.row.createTime)
                    }
                }, {
                    title: "备注人",
                    key: 'commentUserName',
                    width: 100
                }, {
                    title: "备注内容",
                    key: 'comment',
                    ellipsis: true
                }, {
                    title: "相关人",
                    key: 'relevantUserName',
                    width: 100
                }
            ],
            historyParams: {
                equId: this.$route.query.id,
                pageSize: 10,
                currentPage: 1
            },
            historyListData: [],
            historyLoading: false,
            historyTotal: 0,
            historyModal: false,
            historyValidate: {
                name: '',
                remark: '',
                person: ''
            },
            historyRuleValidate: {
                remark: [
                    { required: true, message: '请输入备注内容', trigger: 'blur' }
                ],
            },
            personList: []
        }
    },
    mounted() {
        this.height = document.body.clientHeight-64
        this.id = this.$route.query.id
        let year = new Date().getFullYear()
        this.faultParams.startDate = year+'-'+'1-1'
        this.faultParams.endDate = year+'-'+'12-31'
        this.repairParams.startDate = year+'-'+'1-1'
        this.repairParams.endDate = year+'-'+'12-31'
        this.maintainParams.startDate = year+'-'+'1-1'
        this.maintainParams.endDate = year+'-'+'12-31'
        this.getDetail()
        this.getMpoints()
        this.getAlarms() 
        this.getFaults()
        this.getRepairs()
        this.getMaintains()
        this.getHistory()
    },
    methods: {
        getDetail() {
            detailMethod(this.id).then(res=> {
                // console.log(res.data)
                this.name = res.data.name
                this.tenantId = res.data.tenantId

                if(res.data.maintainState == 0) {
                    this.maintainState = '正常'
                } else {
                    this.maintainState = '维修中'
                }

                this.typeName = res.data.typeName
                this.orgName = res.data.orgName
                this.code = res.data.code

                if(res.data.state == 1) {
                    this.state = '启用'
                } else if(res.data.state == 2) {
                    this.state = '封存'
                } else if(res.data.state == 3) {
                    this.state = '报废'
                }

                if(res.data.abc == 1) {
                    this.abc = 'A'
                } else if(res.data.abc == 2) {
                    this.abc = 'B'
                } else if(res.data.abc == 3) {
                    this.abc = 'C'
                }

                this.processName = res.data.processName
                this.usageTime = res.data.usageTime
                this.warrantyTime = res.data.warrantyTime
                this.faultTotal = res.data.faultTotal
                this.repairTotal = res.data.repairTotal
                this.maintainTotal = res.data.maintainTotal
            }).catch(err=> {

            })
        },
        getMpoints() {
            this.mpointLoading = true
            let equId = this.mpointParams.equId
            let currentPage = this.mpointParams.currentPage
            mpointMethod({
                equId,
                currentPage
            }).then(res=> {
                this.mpointListData = res.data.items
                this.mpointTotal = res.data.total
                this.mpointLoading = false
            }).catch(err=> {

            })
        },
        mpointPageChange(index) {
            this.mpointParams.currentPage = index
            this.getMpoints();
        },
        getAlarms() {
            this.alarmLoading = true
            let equId = this.alarmParams.equId
            let currentPage = this.alarmParams.currentPage
            alarmMethod({
                equId,
                currentPage
            }).then(res=> {
                this.alarmListData = res.data.items
                this.alarmTotal = res.data.total
                this.alarmLoading = false
            }).catch(err=> {

            })
        },
        alarmPageChange(index) {
            this.alarmParams.currentPage = index
            this.getAlarms()
        },
        getFaults() {
            this.faultLoading = true
            this.faultParams.startDate = util.transDateFromLocale(this.faultParams.startDate)
            this.faultParams.endDate = util.transDateFromLocale(this.faultParams.endDate)

            let equId = this.faultParams.equId
            let startDate = this.faultParams.startDate
            let endDate = this.faultParams.endDate
            let currentPage = this.faultParams.currentPage

            faultMethod({
                equId,
                startDate,
                endDate,
                currentPage
            }).then(res=> {
                this.faultListData = res.data.items
                this.faultTotal = res.data.total
                this.faultLoading = false
            }).catch(err=> {

            })
        },  
        faultDateChange(v) {
            this.dateHandel('faultDateRange', 'faultParams')
            this.getFaults()
        },
        faultPageChange (num) {
            this.faultParams.currentPage = num
            this.getFaults()
        },
        repairDateChange(v) {
            this.dateHandel('repairDateRange', 'repairParams')
            this.getRepairs()
        },
        getRepairs() {
            this.repairLoading = true;
            this.repairParams.startDate = util.transDateFromLocale(this.repairParams.startDate)
            this.repairParams.endDate = util.transDateFromLocale(this.repairParams.endDate)

            let equId = this.repairParams.equId
            let startDate = this.repairParams.startDate
            let endDate = this.repairParams.endDate
            let currentPage = this.repairParams.currentPage
            
            repairMethod({
                equId,
                startDate,
                endDate,
                currentPage
            }).then(res=> {
                this.repairListData = res.data.items
                this.repairTotal = res.data.total
                this.repairLoading = false
            }).catch(err=> {

            })
        },
        repairPageChange(num) {
            this.repairParams.currentPage = num
            this.getRepairs()
        },
        maintainDateChange(v){
            this.dateHandel('maintainDateRange', 'maintainParams')
            this.getMaintains()
        },
        getMaintains() {
            this.maintainLoading = true
            this.maintainParams.startDate = util.transDateFromLocale(this.maintainParams.startDate)
            this.maintainParams.endDate = util.transDateFromLocale(this.maintainParams.endDate)
            
            let equId = this.maintainParams.equId
            let startDate = this.maintainParams.startDate
            let endDate = this.maintainParams.endDate
            let currentPage = this.maintainParams.currentPage
            
            mainMethod({
                equId,
                startDate,
                endDate,
                currentPage
            }).then(res=> {
                this.maintainListData = res.data.items
                this.maintainTotal = res.data.total
                this.maintainLoading = false
            }).catch(err=> {

            })
        },
        maintainPageChange (num) {
            this.maintainParams.currentPage = num
            this.getMaintains()
        },
        dateHandel(select, params){
            var terminals = DTU.getTerminalsByMonth(this[select].y, this[select].m)
            this[params].startDate = terminals.start
            this[params].endDate = terminals.end
            this[params].currentPage = 1           
        },
        getHistory() {
            this.maintainLoading = true

            let equId = this.historyParams.equId
            let currentPage = this.historyParams.currentPage

            hisMethod({
                equId,
                currentPage
            }).then(res=> {
                this.historyListData = res.data.items
                this.historyTotal = res.data.total
                this.historyLoading = false
            }).catch(err=> {

            })
        },
        historyPageChange(num) {
            this.historyParams.currentPage = num
            this.getHistory()
        },
        addHistory() {
            this.historyModal = true
            this.historyValidate.name = this.orgName
            personMethod().then(res=> {
                // console.log(res)
                this.personList = res.data
            }).catch(err=> {

            })
        },
        cancelHistory(name) {
            this.historyModal = false
            this.$refs[name].resetFields()
        },
        sureHistory(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    newHisMethod({
                        comment: this.historyValidate.remark,
                        commentUserId: Number(this.tenantId),
                        commentUserName: this.orgName,
                        equId: Number(this.$route.query.id),
                        relevantUserId: Number(this.historyValidate.person),
                        relevantUserNam: ''
                    }).then(res=> {
                        // console.log(res)
                        if(res.status == 200) {
                            this.historyModal = false
                            this.getHistory()
                        }
                    }).catch(err=> {

                    })
                }
            })
        },
        back() {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="less" scoped>
.edit-state {
    border: 5px solid #f0f0f0;
    background: #fff;
    overflow: auto;
    .c-left-border-blue {
        padding: 5px;
        h3 {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            text-indent: 10px;
            a {
                color: #4b7efe;
                margin-left: 20px;
                display: inline-block;
                font-size: 14px;
            }
        }
        .c-btns-right {
            float: right;
            margin-top: 2px;
            /deep/.ivu-btn {
                height: auto;
                background: #c8c8c8;
                font-size: 12px;
                padding: 4px 0;
                min-width: 70px;
                text-align: center;
                color: #fff;
                border: 0;
                border-radius: 3px;
                margin: 0 5px;
            }
        }
    }
    .c-top-border-gray {
        padding: 20px 0px;
        border-top: 5px solid #f0f0f0;
        .c-form-item {
            line-height: 30px;
            vertical-align: top;
            padding-left: 10px;
            padding-top: 9px;
            display: flex;
            label {
                width: 100px;
                text-align: right;
            }
        }
    }
    .table-page {
        text-align: right;
        margin-top: 10px;
    }
    .equ-status-tab-select {
        height: 40px;
        /deep/.ivu-btn {
            height: auto;
            font-size: 12px;
            color: #fff;
            background: #576374;
            padding: 4px 12px;
            border: none;
        }
    }
    .equ-status-tab-select .ivu-select {
        width: 100px;
        margin-right: 5px;
    }
}
/deep/.alarm-lev-1 {
    color: #F5423F;
}
/deep/.alarm-lev-2 {
    color: #fd7003;
}
/deep/.alarm-lev-3 {
    color: #e2b800;
}
/deep/.ivu-table-cell {
    padding: 0 10px;
}
/deep/.orange {
    background: #fff7e6;
    border-color: #ffd591;
    span {
        color: #fa8c16!important;;
    }
}
</style>