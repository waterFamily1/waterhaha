<template>
    <div class="syn-box" :style="{height: height+'px'}">
        <div class="syn-title">
            <h3>人工录入型测点详情</h3>
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
                            <Select v-model="formValidate.dataKind" @on-change="dataKindChange" style="width: 210px">
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
                                <Option 
                                    v-for="(item, key) in unitList" 
                                    :value="key" 
                                    :key="key"
                                >
                                    {{ item }}
                                </Option>
                            </Select>
                            <Input v-model="unitValue" style="width: 100px;margin-left: 10px;" v-if="formValidate.unit == -1" />
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
    </div>
</template>

<script>
import { editMethod, areaMethod, dataKindTypeMethod, fromEqu, add2 } from '@/api/dataManage/siteManage'
import createTree from '@/libs/public-util'

export default {
    data() {
        return {
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
                belongEqu: ''
            },
            equipment: '',
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
                ]
            },
            ids: '',
            limit: [],
            limitList: [],
            changeDis: true,
            pushDis: true,
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
            sitePointName: '',
            unitList: [],
            unitDefalutMap: {'-2' : '无','-1' : '自定义'},
        }
    },
    created() {
        this.ids = this.$route.query.ids
        this.getRegional()
        this.getDetail()
        this.unitList = this.unitDefalutMap
    },
    mounted() {
        this.height = document.body.clientHeight
    },
    methods: {
        getDetail() {
            let ids = this.ids
            editMethod(ids).then(res=> {
                console.log(res)
                this.formValidate.areaLocation = res.data.siteId //区域位置
                this.formValidate.siteLabel = res.data.mpointName //测点名称
                this.formValidate.decimal = res.data.numtail.toString() //显示小数位
                this.formValidate.remark = res.data.remarks //备注
                this.formValidate.yMin = res.data.curveYaxisLowerRange //最小值
                this.formValidate.yMax = res.data.curveYaxisUpperRange //最大值
                this.formValidate.siteType = res.data.mpointType //测点类别
                this.formValidate.signalType = res.data.datype //信号类型
                this.signalKind = res.data.datype
                let categoryId = res.data.categoryId
                if(res.data.unit == '') {
                    this.formValidate.unit = '-2'
                    this.unitValue = ''
                } else {
                    this.formValidate.unit = '-1'
                    this.unitValue = res.data.unit
                }
                let id = res.data.mpointType
                dataKindTypeMethod(id).then(res=> {
                    // console.log(res.data)
                    this.dataKindList = res.data
                    this.formValidate.dataKind = categoryId
                    
                    console.log(this.formValidate.dataKind)
                }).catch(err=> {

                })
            }).catch(err=> {

            })
        },
        dataKindChange(val) {
            let currentUnit = this.dataKindList.filter(v => v.id == value)[0].unit
            let currentUnitArray = currentUnit == null ? [] : currentUnit.split(';');
            let newUnitObj = {};
            currentUnitArray.forEach(v => newUnitObj[v] = v);
            this.unitList = Object.assign({}, newUnitObj, this.unitDefalutMap)
            console.log(this.unitList)
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
        addSearch() {
            let queryName = this.belongName
            let currentPage = this.pageNum
            let processIds = this.formValidate.areaLocation
            fromEqu({
                queryName,
                currentPage,
                processIds
            }).then(res=> {
                this.data = res.data.items
                this.allTotal = res.data.total
            }).catch(err=> {

            })
        },
        changePage(index) {
            this.pageNum = index
            this.addSearch()
        },
        chooseHandle(row) {
            console.log(row)
            this.equipment = row.id
            this.formValidate.belongEqu = row.name
            this.belongModal = false
        },
        chooseEqu() {
            this.belongModal = true
            this.addSearch()
        },
        saveHandle(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    add2({
                        categoryId: Number(this.formValidate.dataKind),
                        datasource: "INPUT",
                        datype: this.formValidate.signalType,
                        enumvalue: this.formValidate.state,
                        equipment: "",
                        equipmentName: "",
                        mpointName: this.formValidate.siteLabel,
                        mpointType: Number(this.formValidate.siteType),
                        numtail: Number(this.formValidate.decimal),
                        remarks: this.formValidate.remark,
                        siteId: this.formValidate.areaLocation.toString(),
                        siteName: this.sitePointName,
                        unit: this.unitValue
                    }).then(res=> {
                        console.log(res)
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