<template>
    <div class="simple-box" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>自定义型计算任务详情</h3>
            <div>
                <Button type="info" style="background:#4b7efe" @click="saveHandle('pointForm')">保存</Button>
                <Button type="info" style="background:#c8c8c8" @click="goBack('pointForm')">返回</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
            <Form ref="pointForm" :model="point" :rules="ruleValidate" :label-width="130">
                <div class="c-form-common">
                    <div class="c-title-css">基本信息</div>
                </div>
                <Row>
                    <Col span="8">
                        <FormItem label="区域位置:" prop="siteId">
                            <TreeSelect v-model="point.siteId" :data="areaData" @on-change="treeChange" />
                        </FormItem>
                        <FormItem label="测点类别:" prop="mpointType">
                            <Select v-model="point.mpointType" @on-change="changePointType" >
                                <Option v-for="item in mpointType" :value="item.value" :key="item.value">{{item.label}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="信号类型:" prop="datype">
                            <Select v-model="point.datype" @on-change="datyChange">
                                <Option v-for="(item,key) in datypeMap" :value="key" :key="key">{{ item }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="8" offset="3">
                        <FormItem label="测点名称:" prop="mpointName">
                            <Input type="text" v-model="point.mpointName" placeholder="请输入测点名称"></Input>
                        </FormItem>
                        <FormItem label="数据分类:" prop="categoryId">
                            <Select v-model="point.categoryId" @on-change="changeSetUnit" :label-in-value="true">
                                <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{item.categoryName}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="显示小数位:" prop="numtail">
                            <Select v-model="point.numtail" :disabled="point.datype=='State'">
                                <Option v-for="item in numtailMap" :value="item.id" :key="item.numtailName">{{ item.numtailName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <div style="display: flex;">
                            <FormItem label="单位:" prop="unit" v-show="point.datype!='State'" :class="['c-custom-left', point.unit=='-1'?'w65':'w100']">
                                <Select v-model="point.unit">
                                    <Option v-for="(item,key) in unitMap" :value="key" :key="key">{{ item }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem class="form-custom" prop="unitInput" v-if="point.unit == '-1' && point.datype != 'State'" :class="['c-custom-right',point.unit=='-1'?'w35':'w0']">
                                <Input v-model="point.unitInput"></Input>
                            </FormItem>
                        </div>
                        <div style="display: flex;">
                            <FormItem label="状态值:" prop="enumvalue" v-show="point.datype=='State'" :class="['c-custom-left', point.enumvalue=='-1'?'w65':'w100']">
                                <Select v-model="point.enumvalue">
                                    <Option v-for="item in statusMap" :value="item.id" :key="item.statusName">{{ item.statusName }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem class="form-custom" prop="enumvalueInput" v-if="point.enumvalue == '-1' && point.datype == 'State'" :class="['c-custom-right',point.enumvalue=='-1'?'w35':'w0']">
                                <Input v-model="point.enumvalueInput"></Input>
                            </FormItem>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem label="所属设备:" prop="equipmentName" class="equ-btn">
                            <span style="margin-right: 10px;">{{ point.equipmentName }}</span>
                            <Button type="primary" @click="chooseEqu">选择设备</Button>
                            <Button type="primary" @click="point.equipmentName = ''">清除</Button>
                        </FormItem>
                        <FormItem label="备注:" prop="remarks">
                            <Input v-model="point.remarks" type="textarea" :autosize="{minRows: 4,maxRows: 5}"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8" offset="3">
                        <FormItem label="曲线Y轴量程:">
                            <Input v-model="point.curveYaxisLowerRange" placeholder="最小值" style="width: 100px;"></Input>-
                            <Input v-model="point.curveYaxisUpperRange" placeholder="最大值" style="width: 100px;"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <div class="c-form-common">
                    <div class="c-title-css">
                        计算任务
                        <RadioGroup v-model="point.status" style="margin-left:23px;">
                            <Radio label="ON">启用</Radio>
                            <Radio label="OFF">停用</Radio>
                        </RadioGroup>
                    </div>
                </div>
                <div>
                    <Row style="padding-left:20px;padding-top: 20px;">
                        <Col span="8">
                            <FormItem label="任务名称:" prop="taskname">
                                <Input v-model="point.taskname" placeholder="任务名称" :disabled="disabledForSite"></Input>
                            </FormItem>
                        </Col>
                        <Col span="8" offset="3">
                            <FormItem label="计算周期:" prop="cycle">
                                <Select v-model="point.cycle" @on-change="changeCycle" :disabled="disabledForSite">
                                    <Option v-for="item in countCycleList" :value="item.id" :key="item.cycleName" :disabled="item.disabled">{{ item.cycleName }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style="padding-left:20px;">
                        <Col span="8">
                            <FormItem label="任务开始时间" prop="startdt">
                                <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" class="w100" v-model="point.startdt" placement="top-end" :disabled="disabledForSite"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="8" offset="3">
                            <FormItem label="周期开始时间" prop="cycle">
                                <Select v-model="point.cycleDt" :disabled="point.cycle == 1 || disabledForSite" ref="resetSelect">
                                    <Option v-for="item in cycleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <span>{{ cycleStarUnit }}</span>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style="padding-left:20px;">
                        <Col span="8">
                            <FormItem label="计算公式:" prop="expression">
                                <Input v-model="point.expression" type="textarea" :disabled="disabledForSite" :autosize="{minRows: 2,maxRows: 5}" placeholder="仅支持+、-、*、/、括号四则运算公式，例如：(a+b)/c-d*2"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    </Row>
                    <Row style="padding-left:20px;">
                        <Col span="20">
                            <FormItem label="参数设置:">
                                <table class="c-paramter-layout">
                                    <tr v-for="(item, index) in point.parameter" :key="item.id">
                                        <td style="padding-right:20px">参数{{ item.name }}</td>
                                        <td>
                                            <span class="c-form-required">*</span>
                                            <FormItem span="10" :prop="'parameter.' + index + '.pointSelect.title'" :rules="{required: true, message: '测点不能为空'}" style="display:inline-block;">
                                                <div @click="choosePoint(index)">
                                                    <Input v-model="item.pointSelect.title" placeholder="测点" :disabled="disabledForSite" readonly></Input>
                                                </div>
                                            </FormItem>
                                        </td>
                                    </tr>
                                </table>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
        <!-- 所属设备 -->
        <Modal
            v-model="belongModal"
            title="选择所属设备"
            width="750px"
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
        <!-- 数据源测点 -->
        <Modal
            v-model="mpointModal"
            title="测点列表选择"
            width="600">
            <div class="mg-single-select-table">
                <div class="mg-single-select-table-header">
                    <div class="mg-single-select-table-search">
                        <Input v-model="belongName1" style="width: 200px;">
                            <Button slot="append" icon="ios-search" @click="addSearch1"></Button>
                        </Input>
                    </div>
                </div>
                <div class="mg-single-table" style="margin-top: 10px">
                    <Table size="small" :columns="columns1" :data="data1">
                        <template slot-scope="{ row, index }" slot="action">
                            <a href="javascript:;" class="table-icon" @click="chooseHandle1(row)">
                                选择
                            </a>
                        </template>
                    </Table>
                    <Page 
                        :total="allTotal1" 
                        size="small" 
                        @on-change="changePage1" 
                        show-total show-elevator 
                        style="text-align: right;margin-top: 10px;"
                    />
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import { areaMethod, dataMethod, fromEqu, countMethod, countCycleMethod, dataMethod1, saveMethod, editMethod, editMethod1, editMethod2, saveMethod1, gongshiMethod } from '@/api/dataManage/cal'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'
import { mapState } from 'vuex'
import dataList from '@/libs/public-data'

const jsep = require('jsep')

export default {
    data() {
        return {
            height: '',
            areaData: [],
            mpointType: [{label: '工艺测点', value: 1},{label: '设备测点', value: 2}],
            categoryList: [],
            editDisabled: false,
            dmpoint: {
                id: null,
                title: ''
            },
            cycleList: [],
            point: {
                site: {id: null, title: '请选择'},
                siteId: null,
                mpointName:'',
                mpointType: null,
                equipment: '',
                equipmentName: '',
                categoryId: null,
                datype: '',
                enumvalue: '0,关;1,开;',
                enumvalueInput: '',
                unit: '',
                numtail: 2,
                remarks: '',

                status: 'ON',
                taskname: '',
                formulaid: '',
                cycle: '',
                expression: '',
                curveYaxisLowerRange: '',
                curveYaxisUpperRange: '',
                startdt: util.formatDateTime(new Date(), "yyyy-MM-dd hh:mm:ss"),
                parameter: []
            },
            ruleValidate: {
                siteId: [
                    { required: true, message: '请选择区域位置', trigger: 'change', type: 'number' }
                ],
                mpointName: [
                    { required: true, message: '请输入测点名称', trigger: 'blur' },
                    { max: 50, message: '测点名称不能超过50个字符', trigger: 'change' }
                ],
                mpointType: [
                    { required: true, type: 'number', message: '请选择测点类别', trigger: 'change' }
                ],
                categoryId: [{required:true, type: 'number', message:'请选择数据分类'}],
                datype: [{required:true,message:'请选择信号类型'}],
                enumvalueInput: [
                    { required: true, message: '自定义状态值不能为空', trigger: 'blur' },
                    {
                        validator (rule, value, callback) {
                            if(value){
                                var pattern = /^((\d+)(,{1})([\u4e00-\u9fa5]+)(;{1}))*$/;
                                if(pattern.test(value)){
                                    callback();
                                } else {
                                    callback(new Error('自定义格式不对'));
                                }
                            }else{
                                callback();
                            }
                        }
                    }
                ],
                unitInput: [{ required: true, message: '自定义单位不能为空', trigger: 'blur' }],
                remarks: [{ type: 'string', max: 100, message: '备注不能超过100个字符', trigger: 'blur' }],
                taskname: [
                    { required: true, message: '请输入任务名称' },
                    { maxLength: 50, message: '长度限50个字符' }
                ],
                formulaid: [
                    { required: true, message: '请选择计算方法'}
                ],
                cycle: [
                    { required: true, message: '请选择数据周期' }
                ],
                startdt: [
                    { required: true, message: '请选择任务开始时间' }
                ],
                expression: [
                    { 
                        validator:(rule,value,callback) => {
                            if(!value) {
                                console.log(1)
                                callback(new Error('请填写计算公式'));
                                this.point.parameter = [];
                            } else {
                                console.log(2)
                                this.validateExpression(callback);
                            }
                        }
                    }
                ]
            },
            unitMap: {'-2' : '无','-1' : '自定义'},
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
            sitePointName: '',
            equipment: '',
            countCycleList: [],
            cycleStarUnit: '',
            formulaName: '',
            task: '',
            index: 1,
            chooseIndex: 0,
            disabledForSite: false,
            expInfo: '',
            isRule: false,
            mpointModal: false,
            belongName1: '',
            columns1: [
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
            data1: [],
            allTotal1: 0,
            pageNum1: '1',
        }
    },
    computed: mapState({
        datypeMap: (state) => state.map.mpoint.datypeText,
        numtailMap: (state) => state.map.mpoint.numtail,
        statusMap: (state) => state.map.mpoint.status
    }),
    mounted() {
        this.height = document.body.clientHeight+240
        this.getArea()
        // this.getCountMethod()
        this.getCountCycle()
        if(this.$route.query.id) {
            this.getEdit()
            this.disabledForSite = true
        } else {
            console.log(4444)
        }
    },
    methods: {
        getEdit() {
            editMethod(this.$route.query.id).then(res=> {
                // console.log(res)
                this.point.mpointType = Number(res.data.mpointType)
                this.point.categoryId = res.data.categoryId
                this.point.categoryName = res.data.categoryName
                this.point.curveYaxisLowerRange = res.data.curveYaxisLowerRange
                this.point.curveYaxisUpperRange = res.data.curveYaxisUpperRange
                this.point.datasource = res.data.datasource
                this.point.datype = res.data.datype
                this.point.enumvalue = res.data.enumvalue
                this.equipment = res.data.equipment
                this.point.equipmentName = res.data.equipmentName
                this.point.id = res.data.id
                this.point.mpointName = res.data.mpointName
                this.point.numtail = res.data.numtail
                this.point.remarks = res.data.remarks
                this.point.siteId = res.data.siteId
                this.point.siteName = res.data.siteName

                dataMethod(this.point.mpointType).then(res=> {
                    this.categoryList = res.data
                })
            })

            editMethod1(this.$route.query.id).then(res=> {
                // console.log(res.data)
                this.point.startdt = res.data.items.startdt
                this.point.cycle = res.data.items.cycle
                this.point.cycleDt = res.data.items.cycleStart
                this.point.status = res.data.items.status
                this.task = res.data.items.id
                this.point.taskname = res.data.items.taskname

                this.countCycleList.map(item=> {
                    if(item.id == this.point.cycle) {
                        if(this.point.cycle == 2) {
                            this.cycleStarUnit = '时'
                            this.cycleList = dataList.hourList
                        } else if(this.point.cycle == 3) {
                            this.cycleStarUnit = '日'
                            this.cycleList = dataList.dayList
                        } else if(this.point.cycle == 4) {
                            this.cycleStarUnit = '月'
                            this.cycleList = dataList.monthList
                        }
                    }
                })

                editMethod2(this.task).then(res=> {
                    let formPoint = {};
                    formPoint.parameter = [];
                    res.data.items.forEach((item, index) => {
                        formPoint.parameter.push({ 
                            name: item.code,
                            pointSelect: {
                                index: index,
                                id: item.mpointid,
                                title: item.mpointName
                            } 
                        })
                    })
                    this.point.parameter = formPoint.parameter;
                })

                gongshiMethod(res.data.items.formulaid).then(res=> {
                    // console.log(res.data)
                    this.point.expression = res.data.formula.expression
                    // this.point.formula = res.data.formula.expInfo
                    // this.expInfo = res.data.formula.expInfo
                    // this.index = res.data.items.length
                })
            })
        },
        getArea() {
            areaMethod().then(res => {
                let treeItem = []
                let trees = res.data
                this.treeListArr = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].expand = false
                    treeItem.push(trees[i])
                }
                this.areaData = createTree(treeItem, 0)
            }).catch(err => {
                // 异常情况
            })
        },
        validateExpression(callback) {
            var pattern = /^[\u4e00-\u9fa5]+$/;
            if(pattern.test(this.point.expression)){
                this.point.parameter = [];
                callback(new Error('参数限英文字母或数字'));
            } else {
                try {
                    let expression = jsep(this.point.expression);
                    var arrs = this.printAttr(expression);
                    this.addParameter(arrs);
                    callback();
                } catch(err) {
                    callback(new Error('计算公式格式不正确'));
                }
            }
        },
        // 计算公式分割成数组
        printAttr(root) {
            var arr = [],res = []
            if(root!=null) {
                arr.push(root)
            }
            while(arr.length!=0) {
                var temp=arr.pop()
                if(temp.name) {
                    res.push(temp.name)
                }
                //这里先放右边再放左边是因为取出来的顺序相反
                if(temp.right != null) {
                    arr.push(temp.right)
                }
                if(temp.left != null) {
                    arr.push(temp.left)
                }
            }
            var parms= []
            for(let i = 0; i < res.length; i++) {
                parms.push({name:res[i]})
            }
            return parms
        },
        // 添加到参数设置数组中
        addParameter(data) {
            if(!this.$route.query.id && !this.isRule) {
                data.forEach((item,index) => {
                    item.mpointid = 0;
                    item.mpointname = '';
                    item.pointSelect = { index: index, id:0, title:''};
                    item.index = index;
                });
                this.point.parameter = data;
            }
        },
        changePointType(data) {
            //数据分类
            dataMethod(data).then(res=> {
                this.categoryList = res.data
                this.point.categoryId = ''
            })
        },
        datyChange(data) {
            console.log(data)
        },
        changeSetUnit(item) {
            this.point.categoryName = item.label
        },
        treeChange(value) {
            let val = value
            this.point.siteId = val
            let arr = this.treeListArr
            arr.map(item=> {
                if(item.value == val) {
                    this.sitePointName = item.title
                }
            })
        },
        addSearch() {
            let queryName = this.belongName
            let currentPage = this.pageNum
            let processIds = this.point.siteId
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
        chooseHandle(row) {
            // console.log(row)
            this.equipment = row.id
            this.point.equipmentName = row.name
            this.belongModal = false
        },
        chooseEqu() {
            this.belongModal = true
            this.addSearch()
        },
        changePage(index) {
            this.pageNum = index
            this.addSearch()
        },
        changeCycle(value) {
            // console.log(value)
            if(value == 1) {
                this.cycleStarUnit = ''
                this.cycleList = []
                this.$refs.resetSelect.clearSingleSelect()
            } else if(value == 2) {
                this.cycleStarUnit = '时'
                this.cycleList = dataList.hourList
            } else if(value == 3) {
                this.cycleStarUnit = '日'
                this.cycleList = dataList.dayList
            } else if(value == 4) {
                this.cycleStarUnit = '月'
                this.cycleList = dataList.monthList
            }
        },
        //计算周期
        getCountCycle() {
            countCycleMethod().then(res=> {
                // console.log(res)
                this.countCycleList = res.data
            }).catch(err=> {

            })
        },
        choosePoint(index) {
            this.chooseIndex = index
            this.mpointModal = true
            this.addSearch1()
        },
        addSearch1() {
            let queryName = this.belongName1
            let currentPage = this.pageNum1
            dataMethod1({
                queryName,
                currentPage
            }).then(res=> {
                this.data1 = res.data.items
                this.allTotal1 = res.data.total
            })
        },
        changePage1(num) {
            this.pageNum1 = index
            this.addSearch1()
        },
        chooseHandle1(row) {
            let index = this.chooseIndex
            this.point.parameter[index].mpointid = row.mpointId
            this.point.parameter[index].pointSelect.id = row.id
            this.point.parameter[index].pointSelect.title = row.mpointName
            this.point.parameter[index].mpointname = row.mpointName
            this.mpointModal = false
        },
        saveHandle(name) {
            this.isRule = true
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if(this.$route.query.id) {
                        saveMethod1({
                            calcMpoint: {
                                categoryId: this.point.categoryId,
                                categoryName: this.point.categoryName,
                                curveYaxisLowerRange: this.point.curveYaxisLowerRange,
                                curveYaxisUpperRange: this.point.curveYaxisUpperRange,
                                datasource: "CALC",
                                datype: this.point.datype,
                                enumvalue: this.point.enumvalue,
                                equipment: Number(this.equipment),
                                equipmentName: this.point.equipmentName,
                                id: Number(this.point.id),
                                mpointName: this.point.mpointName,
                                mpointType: Number(this.point.mpointType),
                                numtail: Number(this.point.numtail),
                                remarks: this.point.remarks,
                                siteId: Number(this.point.siteId),
                                siteName: this.point.siteName,
                                tenantId: null,
                                unit: this.point.unit
                            },
                            status: this.point.status,
                            task: Number(this.task)
                        }).then(res=> {
                            if(res) {
                                this.$Notice.success({
                                    title: '成功',
                                    desc: '数据保存成功'
                                });
                                this.$router.back()
                            }
                        })
                    } else {
                        let params = this.point.parameter.map((item, index)=> {
                            return {
                                code: item.name,
                                mpointid: item.pointSelect.id
                            }
                        })
                        saveMethod({
                            calcMpoint: {
                                categoryId: this.point.categoryId,
                                curveYaxisLowerRange: this.point.curveYaxisLowerRange,
                                curveYaxisUpperRange: this.point.curveYaxisUpperRange,
                                datasource: "CALC",
                                datype: this.point.datype,
                                enumvalue: this.point.enumvalue,
                                equipment: Number(this.equipment),
                                equipmentName: this.point.equipmentName,
                                mpointName: this.point.mpointName,
                                mpointType: Number(this.point.mpointType),
                                numtail: Number(this.point.numtail),
                                remarks: this.point.remarks,
                                siteId: this.point.siteId.toString(),
                                siteName: this.sitePointName,
                                unit: this.point.unit
                            },
                            calcTask: [
                                {
                                    formula: {
                                        expression: this.point.expression,
                                        ftype: 'Custom',
                                        siteid: this.point.siteId.toString()
                                    },
                                    params: params,
                                    task: {
                                        cycle: Number(this.point.cycle),
                                        cycleStart: Number(this.point.cycleDt),
                                        expression: this.point.expression,
                                        mpointid: -1,
                                        siteid:  this.point.siteId.toString(),
                                        startdt: this.$moment(this.point.startdt).utc().format(),
                                        status: this.point.status,
                                        taskname: this.point.taskname
                                    }
                                }
                            ]
                        }).then(res=> {
                            if(res.data.id) {
                                this.$Notice.success({
                                    title: '成功',
                                    desc: '数据保存成功'
                                });
                                this.$router.back()
                            }
                        })  
                    }
                } 
            })
        },
        goBack(name) {
            this.$refs[name].resetFields()
            this.$router.back()
        }
    }
}
</script>

<style lang="less" scoped>
.simple-box {
    margin: 5px;
    background: #fff;
    .c-left-border-blue {
        border-radius: 3px;
        padding: 5px 5px 5px 20px;
        display: flex;
        justify-content: space-between;
        .ivu-btn {
            border: none;
            height: auto;
            font-size: 13px;
            padding: 4px 12px;
            min-width: 70px;
            margin: 0 5px;
        }
    }
    .c-top-border-gray {
        padding: 20px 14px;
        border-top: 5px solid #f0f0f0;
        .c-form-common {
            .c-title-css {
                height: 40px;
                line-height: 40px;
                background: #f4f4f4;
                font-size: 14px;
                color: #333;
                padding: 0 16px;
                margin-bottom: 20px;
            }
        }
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
}
.c-custom-left{float:left;}
/deep/.form-custom {
    .ivu-form-item-content{
        margin-left: 0!important;
    }
}
.c-custom-right{float:right;padding-left:10px;}
.w0{width: 50%;}
.w35{width: 50%;}
.w65{width: 50%}
.w100{width: 100%}
/deep/.c-form-required{
    position: absolute;
    top: 0;
    left: -10px;
    font-family: SimSun;
    color: #ed3f14;
}
/deep/.c-paramter-layout {
    .ivu-form-item-error-tip {
        top: 5px;
        right: -103px;
        left: auto;
    }
    .c-form-required{
        font-family: SimSun;
        position: relative;
        font-size: 12px;
        top: 4px;
        left: 0;
        color: #ed3f14;
    }
}

</style>