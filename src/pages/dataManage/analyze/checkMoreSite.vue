<template >
    <div class="data-div" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>查看多测点计算任务</h3> 
            <div class="c-btns-right">
                <Button type="primary" class="c-btn-back" @click="goBack()">返回</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
            <div class="c-title-css">基本信息</div>
            <Row>
                <Col span="12">
                    <div class="item-form">
                        <label>区域位置：</label>
                        <span>{{ siteName }}</span>
                    </div>
                </Col>
                <Col span="12">
                    <div class="item-form">
                        <label>测点名称：</label>
                        <span>{{ mpointName }}</span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <div class="item-form">
                        <label>测点类别：</label>
                        <span>{{ mpointType }}</span>
                    </div>
                </Col>
                <Col span="12">
                    <div class="item-form">
                        <label>数据分类：</label>
                        <span>{{ categoryName }}</span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <div class="item-form">
                        <label>信号类型：</label>
                        <span>{{ datype }}</span>
                    </div>
                </Col>
                <Col span="12">
                    <div class="item-form">
                        <label>显示小数位：</label>
                        <span>{{ numtail }}</span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span="24" v-if="datype == '状态信号'">
                    <div class="item-form">
                        <label>状态值：</label>
                        <span>{{ enumvalue }}</span>
                    </div>
                </Col>
                <Col span="24" v-if="datype == '数值信号'">
                    <div class="item-form">
                        <label>单位：</label>
                        <span>{{ unit }}</span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <div class="item-form">
                        <label>所属设备：</label>
                        <span>{{ equipmentName }}</span>
                    </div>
                </Col>
                <Col span="12">
                    <div class="item-form">
                        <label>备注：</label>
                        <span>{{ remarks }}</span>
                    </div>
                </Col>
            </Row>
            <div class="c-title-css">
                计算任务
                <RadioGroup v-model="status" style="margin-left: 20px">
                    <Radio label="ON" disabled>
                        <span>启用</span>
                    </Radio>
                    <Radio label="OFF" disabled>
                        <span>停用</span>
                    </Radio>
                </RadioGroup>
            </div>
            <Row>
                <Col span="12">
                    <div class="item-form">
                        <label>任务名称：</label>
                        <span>{{ taskname }}</span>
                    </div>
                </Col>
                <Col span="12">
                    <div class="item-form">
                        <label>计算周期：</label>
                        <span>{{ cycle }}</span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <div class="item-form">
                        <label>计算方法：</label>
                        <span>{{ fname }}</span>
                    </div>
                </Col>
                <Col span="12">
                    <div class="item-form">
                        <label>周期开始时间：</label>
                        <span>{{ cycleStart }}</span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <div class="item-form">
                        <label>公式说明：</label>
                        <span>{{ expInfo }}</span>
                    </div>
                </Col>
                <Col span="12">
                    <div class="item-form">
                        <label>任务开始时间：</label>
                        <span>{{ startdt }}</span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <div class="item-form">
                        <label>参数设置：</label>
                        <div class="item-form-div">
                            <div class="item-form-list">
                                <span>类型</span>
                                <span>名称</span>
                                <span>常量值/变量对应测点</span>
                            </div>
                            <div class="item-form-list">
                                <span>变量</span>
                                <span>{{ varName }}</span>
                                <span>{{ mpointNameType }}</span>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>  
    </div>
</template>

<script>
import { detailMethod2, detailMethod4, detailMethod5, detailMethod6 } from '@/api/dataManage/siteManage'
import { formatTime } from '@/libs/public'

export default {
    data() {
        return {
            height: '',
            ids: '',
            siteName: '',
            mpointName: '',
            mpointType: '',
            categoryName: '',
            datype: '',
            numtail: '',
            equipmentName: '',
            remarks: '',
            enumvalue: '',
            unit: '',
            status: '',
            taskname: '',
            cycle: '',
            formulaid: '',
            fname: '',
            expInfo: '',
            startdt: '',
            taskid: '',
            varName: '',
            mpointNameType: '',
            cycleStart: ''
        }
    },
    created() {
        this.ids = this.$route.query.ids
    },
    mounted() {
        this.height = document.body.clientHeight
        this.getDetail()
        this.getDetail1()
    },
    methods: {
        goBack() {
            this.$router.push({
                path: '/mpoint'
            })
        },
        getDetail() {
            let ids = this.ids
            detailMethod2(ids).then(res=> {
                // console.log(JSON.stringify(res.data))
                this.siteName = res.data.siteName
                this.mpointName = res.data.mpointName
                this.remarks = res.data.remarks
                if(res.data.datype == 'State') {
                    this.datype = '状态信号'
                } else if(res.data.datype == 'Digtal') {
                    this.datype = '数值信号'
                }
                if(res.data.mpointType == 1) {
                    this.mpointType = '工艺测点'
                } else if(res.data.mpointType == 2) {
                    this.mpointType = '设备测点'
                } else if(res.data.mpointType == 3) {
                    this.mpointType = '系统测点'
                }
                this.categoryName = res.data.categoryName
                this.numtail = res.data.numtail
                this.equipmentName = res.data.equipmentName
                this.enumvalue = res.data.enumvalue
                this.unit = res.data.unit
            }).catch(err=> {

            })
        },
        getDetail1() {
            let ids = this.ids
            detailMethod4(ids).then(res=> {
                // console.log(JSON.stringify(res.data.items))
                this.status = res.data.items.status
                this.taskname = res.data.items.taskname
                if(res.data.items.cycle == 1) {
                    this.cycle = '1小时'
                    this.cycleStart = ''
                } else if(res.data.items.cycle == 2) {
                    this.cycle = '天'
                    this.cycleStart = res.data.items.cycleStart+'时'
                } else if(res.data.items.cycle == 3) {
                    this.cycle = '月'
                    this.cycleStart = res.data.items.cycleStart+'日'
                } else if(res.data.items.cycle == 13) {
                    this.cycle = '年'
                    this.cycleStart = res.data.items.cycleStart+'月'
                }
                this.formulaid = res.data.items.formulaid
                this.getDetail2()
                this.startdt = formatTime(res.data.items.startdt, 'yyyy-MM-dd HH:mm:ss')
                this.taskid = res.data.items.id
                this.getDetail3()
            }).catch(err=> {
                
            })
        },
        getDetail2() {
            let ids = this.formulaid
            detailMethod5(ids).then(res=> {
                // console.log(JSON.stringify(res.data))
                this.fname = res.data.formula.fname
                this.expInfo = res.data.formula.fname+'='+res.data.formula.expInfo
                this.varName = res.data.items[0].varName
            }).catch(err=> {

            })
        },
        getDetail3() {
            let ids = this.taskid
            detailMethod6(ids).then(res=> {
                // console.log(JSON.stringify(res.data))
                this.mpointNameType = res.data.items[0].mpointName
            }).catch(err=> {

            })
        }
    }
}
</script>

<style lang="less" scoped>
.data-div {
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
        padding: 20px 14px;
        border-top: 5px solid #f0f0f0;
        .c-title-css {
            height: 40px;
            line-height: 40px;
            background: #f4f4f4;
            font-size: 14px;
            color: #333;
            padding: 0 16px;
        }
        /deep/.ivu-row {
            padding: 20px 0 0 20px;
            .item-form {
                margin-bottom: 20px;
                line-height: 16px;
                label {
                    display: inline-block;
                    width: 140px;
                    text-align: right;
                    vertical-align: top;
                }
                .item-form-div {
                    display: inline-block;
                    .item-form-list {
                        display: block;
                        line-height: 16px;
                        margin-bottom: 15px;
                        span {
                            display: inline-block;
                        }
                        span:nth-of-type(1) {
                            width: 50px;
                            text-align: left;
                        }
                        span:nth-of-type(2) {
                            width: 100px;
                            text-align: right;
                            margin: 0 20px;
                        }
                    }
                }
            }
        }
    }
}
</style>