<template>
    <div class="task-div" :style="{height: height+'px'}">
        <div class="task-title">
            <h3>{{ title }}</h3>
            <div>
                <Button type="info" size="small" style="background:#c8c8c8" @click="goBack()">返回</Button>
            </div>
        </div>
        <div class="task-detail">
            <div class="detail-box">
                <div class="detail-title">基本信息</div>
                <Row style="padding-top: 25px;">
                    <Col span="12">
                        <div class="form-item">
                            <label>区域位置:</label>
                            <span>{{ siteName }}</span>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="form-item">
                            <label>测点名称:</label>
                            <span>{{ mpointName }}</span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <div class="form-item">
                            <label>测点类别:</label>
                            <span>{{ mpointType }}</span>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="form-item">
                            <label>数据分类:</label>
                            <span>{{ categoryName }}</span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <div class="form-item">
                            <label>信号类型:</label>
                            <span>{{ datype }}</span>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="form-item">
                            <label>显示小数位:</label>
                            <span>{{ numtail }}</span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <div class="form-item">
                            <label>状态值:</label>
                            <span>{{ enumvalue }}</span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <div class="form-item">
                            <label>所属设备:</label>
                            <span>{{ equipmentName }}</span>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="form-item">
                            <label>备注:</label>
                            <span>{{ remarks }}</span>
                        </div>
                    </Col>
                </Row>
            </div>
            <div class="detail-box">
                <div class="detail-title">
                    计算任务
                    <RadioGroup v-model="countType" style="margin-left: 20px">
                        <Radio label="ON" disabled>启用</Radio>
                        <Radio label="OFF" disabled>停用</Radio>
                    </RadioGroup>
                </div>
                <!-- 自定义型 -->
                <div v-if="this.$route.query.type == 'Custom'">
                    <Row style="padding-top: 40px;">
                        <Col span="12">
                            <div class="form-item">
                                <label>任务名称:</label>
                                <span>{{ taskname }}</span>
                            </div>
                        </Col>
                        <Col span="12">
                            <div class="form-item">
                                <label>计算周期:</label>
                                <span>{{ cycleName }}</span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <div class="form-item">
                                <label>任务开始时间:</label>
                                <span>{{ startdt }}</span>
                            </div>
                        </Col>
                        <Col span="12">
                            <div class="form-item">
                                <label>周期开始时间:</label>
                                <span>{{ cycleStart }}{{ cycleStarUnit }}</span>
                            </div>
                        </Col>
                    </Row>  
                    <Row>
                        <Col span="12">
                            <div class="form-item">
                                <label>计算公式:</label>
                                <span>{{ expression }}</span>
                            </div>
                        </Col>
                    </Row>  
                    <Row>
                        <Col span="12">
                            <div class="form-item" style="display: flex">
                                <label>参数设置:</label>
                                <div>
                                    <div v-for="(item, index) in parameter" :key="index">
                                        <span style="margin-right: 20px">参数: {{ item.code }}</span>
                                        <span>对应测点: {{ item.mpointName }}</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>  
                </div>
                <!-- 多测点 -->
                <div v-if="this.$route.query.type == 'Complex'">
                    <Row style="padding-top: 40px;">
                        <Col span="12">
                            <div class="form-item">
                                <label>任务名称:</label>
                                <span>{{ taskname }}</span>
                            </div>
                        </Col>
                        <Col span="12">
                            <div class="form-item">
                                <label>计算周期:</label>
                                <span>{{ cycleName }}</span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <div class="form-item">
                                <label>计算方法:</label>
                                <span>{{ fname }}</span>
                            </div>
                        </Col>
                        <Col span="12">
                            <div class="form-item">
                                <label>周期开始时间:</label>
                                <span>{{ cycleStart }}{{ cycleStarUnit }}</span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <div class="form-item">
                                <label>公式说明:</label>
                                <span>{{ expression }}</span>
                            </div>
                        </Col>
                        <Col span="12">
                            <div class="form-item">
                                <label>任务开始时间:</label>
                                <span>{{ startdt }}</span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <div class="form-item" style="display: flex">
                                <label>参数设置:</label>
                                <div>
                                    <div>
                                        <span style="margin-right: 25px;">类型</span>
                                        <span style="width: 100px;text-align: right;margin-right: 25px">名称</span>
                                        <span>常量值/变量对应测点</span>
                                    </div>
                                    <div v-for="(item,index) in parameter" :key="index">
                                        <span style="margin-right: 25px;">变量</span>
                                        <span style="width: 100px;text-align: right;margin-right: 25px">{{ item.varName }}</span>
                                        <span>{{ item.mpointName }}</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <!-- 单侧点 -->
                <div v-if="this.$route.query.type == 'Simple'">
                    <Row style="padding-top: 40px;">
                        <Col span="12">
                            <div class="form-item">
                                <label>任务名称:</label>
                                <span>{{ taskname }}</span>
                            </div>
                        </Col>
                        <Col span="12">
                            <div class="form-item">
                                <label>数据源测点:</label>
                                <span>{{ mpointName1 }}</span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <div class="form-item">
                                <label>计算方法:</label>
                                <span>{{ fname }}</span>
                            </div>
                        </Col>
                        <Col span="12">
                            <div class="form-item">
                                <label>计算周期:</label>
                                <span>{{ cycleName }}</span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <div class="form-item">
                                <label>任务开始时间:</label>
                                <span>{{ startdt }}</span>
                            </div>
                        </Col>
                        <Col span="12">
                            <div class="form-item">
                                <label>周期开始时间:</label>
                                <span>{{ cycleStart }}{{ cycleStarUnit }}</span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { detailBasicMethod, detailCountMethod1 } from '@/api/dataManage/taskCalc'
import { countCycleMethod, gongshiMethod, editMethod2, method1, editMethod1 } from '@/api/dataManage/cal'
import util from '@/libs/public_js'

export default {
    data(){
        return {
            height:'',
            title: '',
            mpointid: '',
            id: '',
            siteName: '',
            mpointName: '',
            datype: '',
            numtail: '',
            enumvalue: '',
            mpointType: '',
            remarks: '',
            equipmentName: '',
            categoryName: '',
            countType: '',
            taskname: '',
            startdt: '',
            countCycleList: [],
            cycleStart: '',
            cycleStarUnit: '',
            cycleName: '',
            expression: '',
            parameter: [],

            complexList: [],
            fname: '',
            mpointName1: ''
        }
    },
    mounted() {
        this.height = document.body.clientHeight - 80
        this.mpointid = this.$route.query.mpointid
        this.id = this.$route.query.id
        if(this.$route.query.type == 'Custom') {
            this.title = '查看自定义型计算任务'
        } else if(this.$route.query.type == 'Simple') {
            this.title = '查看单测点计算任务'
        } else if(this.$route.query.type == 'Complex') {
            this.title = '查看多测点计算任务'
            method1('Complex').then(res=> {
                this.complexList = res.data.items
            })
        }
        this.getCountCycle()
        this.getBasicDetail()
        this.getCountDetail1()
    },
    methods: {
        getCountCycle() {
            countCycleMethod().then(res=> {
                // console.log(res)
                this.countCycleList = res.data
            }).catch(err=> {

            })
        },
        getBasicDetail() {
            let mpointid = this.mpointid
            detailBasicMethod(mpointid).then(res=> {
                if(res.status == 200) {
                    this.siteName = res.data.siteName
                    this.mpointName = res.data.mpointName
                    if(res.data.datype == 'State') {
                        this.datype = '状态信号'
                    } else if(res.data.datype == 'Digtal') {
                        this.datype = '数值信号'
                    }

                    if(res.data.mpointType == '1') {
                        this.mpointType = '工艺测点'
                    } else if(res.data.mpointType == '2') {
                        this.mpointType = '设备测点'
                    }
                    this.numtail = res.data.numtail
                    this.enumvalue = res.data.enumvalue
                    this.remarks = res.data.remarks
                    this.equipmentName = res.data.equipmentName
                    this.categoryName = res. data.categoryName
                }
            }).catch(err=> {

            })
        },
        getCountDetail1() {
            let mpointid = this.mpointid
            detailCountMethod1(mpointid).then(res=> {
                // console.log(res)
                this.countType = res.data.items.status
                this.taskname = res.data.items.taskname
                this.startdt = util.formatDateTime(res.data.items.startdt, "yyyy-MM-dd hh:mm:ss")
                this.cycleStart = res.data.items.cycleStart
                this.countCycleList.map(item=> {
                    if(item.id == res.data.items.cycle) {
                        this.cycleName = item.cycleName
                        if(res.data.items.cycle == 2) {
                            this.cycleStarUnit = '时'
                        } else if(res.data.items.cycle) {
                            this.cycleStarUnit = '日'
                        } else if(res.data.items.cycle) {
                            this.cycleStarUnit = '月'
                        }
                    }
                })

                gongshiMethod(res.data.items.formulaid).then(res=> {
                    console.log(res.data.items)
                    if(this.$route.query.type == 'Complex') {
                        this.expression = res.data.formula.fname+' = '+res.data.formula.expInfo
                        this.parameter = res.data.items.map(item=> {
                            return {
                                varName: item.varName,
                                mpointName: ''
                            }
                        })
                    } else if(this.$route.query.type == 'Custom') {
                        this.expression = res.data.formula.expression
                    } else {
                        this.fname = res.data.formula.fname
                    }
                })
                
                editMethod2(res.data.items.id).then(res=> {
                    if(this.$route.query.type == 'Custom') {
                        this.parameter = res.data.items
                    } else if(this.$route.query.type == 'Complex') {
                        res.data.items.map((item,index)=> {
                            this.parameter[index].mpointName = item.mpointName
                        })
                    } else {
                        this.mpointName1 = res.data.items[0].mpointName
                    }
                })

                if(this.$route.query.type == 'Complex') {
                    editMethod1(this.mpointid).then(res=> {
                        this.complexList.map(item=> {
                            if(item.id == res.data.items.formulaid) {
                                this.fname = item.fname
                            }
                        })
                    })
                }
            }).catch(err=> {

            })
        },
        goBack() {
            this.$router.back()
        }
    }
}
</script>

<style lang="less" scoped>
.task-div {
    margin: 5px;
    background: #fff;
    .task-title {
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
            }
        }
    }
    .task-detail {
        width: 100%;
        border-top: 5px solid #f0f0f0;
        padding: 20px 14px;
        .detail-box {
            .detail-title {
                height: 40px;
                line-height: 40px;
                background: #f4f4f4;
                font-size: 14px;
                color: #333;
                padding: 0 16px;
            }
            /deep/.ivu-row {
                padding-left: 20px;
                margin-bottom: 26px;
                label {
                    width: 120px;
                    text-align: right;
                    vertical-align: middle;
                    float: left;
                    font-size: 13px;
                    color: #495060;
                }
                span {
                    display: inline-block;
                    margin-left: 10px;
                    font-size: 13px;
                    color: #495060;
                }
            }
        }
    }
}
</style>