<template>
    <div class="syn-box" :style="{height: height+'px'}">
        <div class="syn-title">
            <h3>多测点计算任务详情</h3>
            <div>
                <Button type="info" size="small" style="background:#4b7efe" @click="saveHandle('formValidate')">保存</Button>
                <Button type="info" size="small" style="background:#c8c8c8" @click="goBack('formValidate')">返回</Button>
            </div>
        </div>
        <div class="syn-table">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140">
                <div class="c-title-css">基本信息</div>
                <Row>
                    <Col span="12">
                        <FormItem label="区域位置：" prop="areaLocation">
                            <TreeSelect 
                                v-model="formValidate.areaLocation" 
                                :data="areaTree" 
                                @on-change="treeChange"
                                v-width="210"
                            />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="测点名称：" prop="siteLabel">
                            <Input v-model="formValidate.siteLabel" style="width: 210px;" />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="测点类别：" prop="siteType">
                            <Select 
                                v-model="formValidate.siteType" 
                                placeholder="请选择" 
                                style="width: 210px"
                                @on-change="siteChange"
                            >
                                <Option value="1">工艺测点</Option>
                                <Option value="2">设备测点</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="数据分类：" prop="dataKind">
                            <Select v-model="formValidate.dataKind" style="width: 210px">
                                <Option 
                                    v-for="(item, index) in dataKindList"
                                    :value="item.id"
                                    :key="index"
                                >
                                    {{ item.categoryName }}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="信号类型：" prop="signalType">
                            <Select 
                                v-model="formValidate.signalType" 
                                placeholder="请选择" 
                                style="width: 210px"
                                @on-change="signalChange"
                            >
                                <Option value="State">状态信号</Option>
                                <Option value="Digtal">数值信号</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="显示小数位：" prop="decimal">
                            <Select v-model="formValidate.decimal" style="width: 210px" :disabled="signalKind == 'State'">
                                <Option value="0">0</Option>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="单位：" prop="unit" v-if="signalKind == 'Digtal'">
                            <Select v-model="formValidate.unit" placeholder="请选择" style="width: 210px">
                                <Option value="0">无</Option>
                                <Option value="1">自定义</Option>
                            </Select>
                            <Input v-model="unitValue" style="width: 100px;margin-left: 10px;" v-if="formValidate.unit == 1" />
                        </FormItem>
                        <FormItem label="状态值：" prop="state" v-if="signalKind == 'State'">
                            <Select v-model="formValidate.state" placeholder="请选择" style="width: 210px">
                                <Option value="0,关;1,开;">0,关;1,开;</Option>
                                <Option value="0,关;1,开;2,自动;">0,关;1,开;2,自动;</Option>
                                <Option value="自定义">自定义</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="所属设备：" class="equ-btn">
                            <span style="margin-right: 10px;">{{ formValidate.belongEqu }}</span>
                            <Button type="primary" @click="chooseEqu">选择设备</Button>
                            <Button type="primary" @click="formValidate.belongEqu = ''">清除</Button>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="曲线Y轴量程：">
                            <Input v-model="formValidate.yMin" placeholder="最小值" style="width: 80px;" /> -
                            <Input v-model="formValidate.yMax" placeholder="最大值" style="width: 80px;" />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="备注：">
                            <Input v-model="formValidate.remark" type="textarea" style="width: 310px;" />
                        </FormItem>
                    </Col>
                </Row>
                <div class="c-title-css">
                    计算任务
                    <RadioGroup v-model="figureUp">
                        <Radio label="ON"><span>启用</span></Radio>
                        <Radio label="OFF"><span>停用</span></Radio>
                    </RadioGroup>
                </div>
                <Row>
                    <Col span="12">
                        <FormItem label="任务名称：" prop="taskName">
                            <Input 
                                v-model="formValidate.taskName" 
                                placeholder="任务名称" 
                                style="width: 210px;" 
                            />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="计算周期：" prop="countCycle">
                            <Select 
                                v-model="formValidate.countCycle" 
                                style="width:210px"
                                placeholder="请选择" 
                                :label-in-value="true"
                                @on-change="countCycleChange"
                            >
                                <Option v-for="item in countCycleList" :value="item.id" :key="item.id">{{ item.cycleName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="任务开始时间：" prop="taskTime">
                            <DatePicker 
                                :value="formValidate.taskTime" 
                                v-model="formValidate.taskTime"
                                type="datetime" 
                                style="width: 210px"
                                @on-change="taskTimeChange"
                            >
                            </DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="周期开始时间：" prop="cycleStar">
                            <Select 
                                v-model="formValidate.cycleStar" 
                                style="width:210px"
                                placeholder="请选择" 
                                :disabled="cycleStarDis"
                                @on-change="cycleStarChange"
                            >
                                <Option v-for="item in cycleStarList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            <span>{{ cycleStarUnit }}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="计算方法：" prop="countMethod">
                            <Select 
                                v-model="formValidate.countMethod" 
                                style="width:210px"
                                placeholder="请选择" 
                                :label-in-value="true"
                                @on-change="countMethodChange"
                            >
                                <Option v-for="item in countMethodList" :value="item.id" :key="item.id">{{ item.fname }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="公式说明：">
                            <Input 
                                v-model="formValidate.formula" 
                                disabled 
                                type="textarea" 
                                placeholder="SS合格次数/取样次数" 
                                style="width: 700px;"
                            />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="参数设置：" prop="site">
                            <div class="set-row-item">
                                <div class="set-row-item-div">
                                    <span>类型</span>
                                    <span>名称</span>
                                    <span>常量值/变量对应测点</span>
                                </div>
                                <div class="set-row-item-div" v-show="ifSite">
                                    <span>变量</span>
                                    <span>取样测点</span>
                                    <span>
                                        <div @click="dataModal = true">
                                            <Input 
                                                v-model="formValidate.site" 
                                                placeholder="测点" 
                                                style="width: 210px;"
                                            />
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>

        <!-- 所属设备 -->
        <Modal
            v-model="belongModal"
            title="选择所属设备"
            width="600px"
            :footer-hide="true"
        >
            <div class="mg-single-select-table">
                <div class="mg-single-select-table-header">
                    <div class="mg-single-select-table-search">
                        <Input v-model="belongName" style="width: 200px;">
                            <Button slot="append" icon="ios-search" @click="addSearch"></Button>
                        </Input>
                    </div>
                </div>
                <div class="mg-single-table" style="margin-top: 10px">
                    <Table size="small" :columns="columns" :data="data">
                        <template slot-scope="{ row, index }" slot="action">
                            <a href="javascript:;" class="table-icon" @click="chooseHandle(row)">
                                <Icon type="md-checkmark-circle-outline" style="font-size: 22px;color: #999;" />
                            </a>
                        </template>
                    </Table>
                    <Page 
                        :total="allTotal" 
                        size="small" 
                        @on-change="changePage" 
                        show-total show-elevator 
                        style="text-align: right;margin-top: 10px;"
                    />
                </div>
            </div>
        </Modal>
        <!-- 测点modal -->
        <Modal
            v-model="dataModal"
            title="测点列表选择"
            width="600px"
            :footer-hide="true"
        >
            <div class="mg-single-select-table">
                <div class="mg-single-select-table-header">
                    <div class="mg-single-select-table-search">
                        <Input v-model="siteDataName" style="width: 200px;" placeholder="测点编号/名称">
                            <Button slot="append" icon="ios-search" @click="getdataSite"></Button>
                        </Input>
                    </div>
                </div>
                <div class="mg-single-table" style="margin-top: 10px">
                    <Table size="small" :columns="siteColumns" :data="siteData">
                        <template slot-scope="{ row, index }" slot="action">
                            <a href="javascript:;" class="table-icon" @click="chooseSiteHandle(row)">
                                选择
                            </a>
                        </template>
                    </Table>
                    <Page 
                        :total="siteAllTotal" 
                        size="small" 
                        @on-change="siteChangePage" 
                        show-total show-elevator 
                        style="text-align: right;margin-top: 10px;"
                    />
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import { dataKindTypeMethod, fromEqu, areaMethod, addSave, countCycleMethod, countMoreMethod, dataSiteMethod } from '@/api/dataManage/siteManage'
import createTree from '@/libs/public-util'
import dataList from '@/libs/public-data'

export default {
    data() {
        return {
            ifSite: false,
            height: '',
            formValidate: {
                areaLocation: '',
                siteLabel: '',
                siteType: '',
                signalType: '',
                dataKind: '',
                unit: '',
                state: '0,关;1,开;',
                decimal: '2',
                remark: '',
                yMin: '',
                yMax: '',
                taskName: '',
                countMethod: '',
                countCycle: '',
                cycleStar: '',
                taskTime: '',
                belongEqu: '',
                formula: '',
                site: ''
            },
            areaTree: [],
            unitValue: '',
            signalKind: 'Digtal',
            ruleValidate: {
                areaLocation: [
                    { required: true, message: '请选择区域位置', trigger: 'blur', type: 'number' }
                ],
                siteLabel: [
                    { required: true, message: '请输入测点名称', trigger: 'blur' }
                ],
                siteType: [
                    { required: true, message: '请选择测点类别', trigger: 'change' }
                ],
                signalType: [
                    { required: true, message: '请选择信号类型', trigger: 'change' }
                ],
                state: [
                    { required: true, message: '请选择状态值', trigger: 'change' }
                ],
                taskName: [
                    { required: true, message: '请输入任务名称', trigger: 'blur' }
                ],
                countMethod: [
                    { required: true, message: '请选择计算方法', trigger: 'blur', type: 'number' }
                ],
                countCycle: [
                    { required: true, message: '请选择数据周期', trigger: 'blur', type: 'number' }
                ],
                cycleStar: [
                    { required: true, message: '请选择周期开始时间', trigger: 'blur' }
                ],
                taskTime: [
                    { required: true, message: '请选择任务开始时间', trigger: 'blur', type: 'date' }
                ],
                site: [
                    { required: true, message: '测点不能为空', trigger: 'blur' }
                ]
            },
            type: '',
            ids: '',
            dataKindList: [],
            belongModal: false,
            belongName: '',
            allTotal: 0,
            pageNum: '1',
            columns: [
                {
                    title: '设备编号',
                    key: 'code'
                }, {
                    title: '设备类型',
                    key: 'typeName'
                }, {
                    title: '设备名称',
                    key: 'name'
                }, {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            data: [],
            treeListArr: [],
            figureUp: 'ON',
            countCycleList: [],
            countMethodList: [],
            equipment: '',
            cycleStarList: [],
            cycleStarUnit: '',
            countCycleLabel: '',
            countMethodLabel: '',
            mpointNameVal: null,
            mpointidVal: '',
            startdt: '',
            sitePointName: '',
            dataModal: false,
            siteColumns: [
                {
                    title: '测点编号',
                    key: 'mpointId'
                }, {
                    title: '区域位置',
                    key: 'siteName'
                }, {
                    title: '测点名称',
                    key: 'mpointName'
                }, {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            siteData: [],
            siteDataName: '',
            siteAllTotal: 0,
            sitePageNum: '1',
            cycleStarDis: false
        }
    },
    created() {
        this.type = this.$route.query.type
        let ids = ''
        if(this.$route.query.ids == undefined || this.$route.query.ids == null || this.$route.query.ids == '') {
            ids = sessionStorage.getItem('ids')
        } else {
            ids = this.$route.query.ids
        }
        this.ids = ids
        this.getRegional()
    },
    mounted() {
        this.height = document.body.clientHeight+250
        let date = new Date();
        this.formValidate.taskTime = date
        console.log(typeof(this.formValidate.taskTime))
        this.startdt = this.$moment(date).utc().format()
        this.getCountCycle()
        this.getCountMethod()
        this.getdataSite()
    },
    methods: {
        getCountMethod() {
            countMoreMethod().then(res=> {
                this.countMethodList = res.data.items
            }).catch(err=> {

            })
        },
        getdataSite() {
            let queryName = this.siteDataName
            let siteId = ''
            let currentPage = this.sitePageNum
            dataSiteMethod({
                queryName,
                siteId,
                currentPage
            }).then(res=> {
                console.log(res.data.items)
                this.siteData = res.data.items
                this.siteAllTotal = res.data.total
            }).catch(err=> {

            })
        },
        chooseSiteHandle(row) {
            this.formValidate.site = row.mpointName
            console.log(typeof(this.formValidate.site))
            this.dataModal = false
            let id = row.id
            this.mpointNameVal = row.mpointName
            this.mpointidVal = row.id
        },
        siteChangePage(index) {
            this.sitePageNum = index
            this.getdataSite()
        },
        getRegional() {
            areaMethod().then(res => {
                // console.log(JOSN.stringify(res.data))
                this.treeListArr = res.data
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].expand = true
                    treeItem.push(trees[i])
                }
                this.areaTree = createTree(treeItem)
            }).catch(err => {
                // 异常情况
            })
        },
        treeChange(value) {
            let val = value
            this.formValidate.areaLocation = val
            let arr = this.treeListArr
            arr.map(item=> {
                if(item.value == val) {
                    this.sitePointName = item.title
                }
            })
        },
        getCountCycle() {
            countCycleMethod().then(res=> {
                // console.log(res)
                this.countCycleList = res.data
            }).catch(err=> {

            })
        },
        countMethodChange(val) {
            // console.log(val)
            this.formValidate.countMethod = val.value
            this.countMethodLabel = val.label
            this.ifSite = true
        },
        countCycleChange(val) {
            console.log(val)
            this.formValidate.countCycle = val.value
            this.countCycleLabel = val.label
            if(val.value == 1) {
                this.cycleStarDis = true
            } else {
                this.cycleStarDis = false
                if(val.value == 2) {
                    this.cycleStarUnit = '时'
                    this.cycleStarList = dataList.hourList
                } else if(val.value == 3) {
                    this.cycleStarUnit = '日'
                    this.cycleStarList = dataList.dayList
                } else if(val.value == 13) {
                    this.cycleStarUnit = '月'
                    this.cycleStarList = dataList.monthList
                }
            }
        },
        cycleStarChange(val) {
            console.log(val)
            this.formValidate.cycleStar = val
            console.log(typeof(this.formValidate.cycleStar))
        },
        signalChange(val) {
            this.signalKind = val
        },
        siteChange(val) {
            let id = val
            dataKindTypeMethod(id).then(res=> {
                // console.log(res.data)
                this.dataKindList = res.data
            }).catch(err=> {

            })
        },
        chooseHandle(row) {
            this.equipment = row.id
            this.formValidate.belongEqu = row.name
            this.belongModal = false
        },
        chooseEqu() {
            this.belongModal = true
            this.addSearch()
        },
        addSearch() {
            let queryName = this.belongName
            let currentPage = this.pageNum
            let processIds = this.formValidate.areaLocation
            fromEqu({
                queryName,
                currentPage,
                processIds
            }).then(res=> {
                // console.log(res)
                this.data = res.data.items
                this.allTotal = res.data.total
            }).catch(err=> {

            })
        },
        changePage(index) {
            this.pageNum = index
            this.addSearch()
        },
        taskTimeChange(val) {
            this.startdt = this.$moment(val).utc().format()
        },
        saveHandle(name) {
            console.log(this.figureUp)
            this.$refs[name].validate((valid) => {
                if (valid) {
                    addSave({
                        calcMpoint:{
                            categoryId: Number(this.level),
                            curveYaxisLowerRange: this.formValidate.yMin,
                            curveYaxisUpperRange: this.formValidate.yMax,
                            datasource: "CALC",
                            datype: this.formValidate.signalType,
                            enumvalue: this.formValidate.state,
                            equipment: this.equipment,
                            equipmentName: this.formValidate.belongEqu,
                            mpointName: this.formValidate.siteLabel,
                            mpointType: Number(this.formValidate.siteType),
                            numtail: Number(this.formValidate.decimal),
                            remarks: this.formValidate.remark,
                            siteId: this.formValidate.areaLocation.toString(),
                            unit: this.unitValue
                        },
                        calcTask: [
                            {
                                params: [{
                                    code: 'mpoint',
                                    mpointid: this.mpointidVal
                                }],
                                task: {
                                    cycle: Number(this.formValidate.countCycle),
                                    cycleStart: Number(this.formValidate.cycleStar),
                                    formulaid: Number(this.formValidate.countMethod),
                                    mpointid: -1,
                                    mpointname: this.mpointNameVal,
                                    siteid:  Number(this.formValidate.areaLocation),
                                    startdt: this.startdt,
                                    status: this.figureUp,
                                    taskname: this.formValidate.taskName
                                }
                            }
                        ]
                    }).then(res=> {
                        // console.log(res)
                        if(res.status == 200) {
                            this.$router.push({
                                path: '/mpoint',
                                query: {
                                    goBack: '1'
                                }
                            })
                        }
                    }).catch(err=> {

                    })
                }
            })
        },
        goBack(name) {
            this.$refs[name].resetFields()
            this.$router.push({
                path: '/mpoint'
            })
        }
    }
}
</script>

<style lang="less" scoped>
.syn-box {
    margin: 5px;
    background: #fff;
    .syn-title {
        background: #fff;
        padding: 5px;
        h3{
            display: inline-block;
            line-height: 30px;
            text-indent: 10px;
        }
        div{
            float: right;
            /deep/.ivu-btn {
                min-width: 70px;
                margin: 0 5px;
                color: #fff;
                border: 0;
                height: auto;
            }
        }
    }
    .syn-table {
        width: 100%;
        border-top: 5px solid #f0f0f0;
        padding: 20px 14px;
        .c-title-css {
            height: 40px;
            line-height: 40px;
            background: #f4f4f4;
            font-size: 14px;
            color: #333;
            padding: 0 16px;
            margin-bottom: 30px;
            /deep/.ivu-radio-group {
                margin-left: 30px;
            }
        }
        /deep/.ivu-row {
            padding-left: 20px;
            .equ-btn {
                /deep/.ivu-btn {
                    margin-right: 10px;
                    height: auto;
                    padding: 2px 15px;
                    font-size: 13px;
                    height: auto;
                }
            }
        }
        /deep/.ivu-tabs-tabpane {
            .row-item {
                margin-bottom: 20px;
                position: relative;
                .label {
                    display: inline-block;
                    width: 140px;
                    text-align: right;
                    font-size: 14px;
                    color: #333;
                    padding: 10px 12px 10px 0;
                    vertical-align: top;
                }
                .row-item-content {
                    display: inline-block;
                    .item-content {
                        display: flex;
                    }
                }
                /deep/.ivu-radio-wrapper {
                    margin-bottom: 10px;
                }
            }
            .tab-select {
                margin-left: 30px;
            }
        }
    }
    .row-block {
        padding: 20px 0 0 30px!important;
        border-bottom: 1px solid #e6e6e6;
        .row-item-form {
            display: flex;
            margin-bottom: 25px;
            label {
                width: 140px;
                text-align: right;
                line-height: 32px;
            }
            div {
                line-height: 32px;
            }
        }
    }
    .set-row-item {
        .set-row-item-div {
            span {
                display: inline-block;
            }
            span:nth-of-type(1) {
                width: 50px;
            }
            span:nth-of-type(2) {
                width: 100px;
            }
        }
    }
}
.mg-single-select-table {
    .mg-single-select-table-header {
        min-height: 40px;
        .mg-single-select-table-search {
            width: 250px;
        }
    }
}
</style>