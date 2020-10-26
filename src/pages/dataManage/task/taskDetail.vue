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
                    <RadioGroup v-model="countType">
                        <Radio label="启用" disabled></Radio>
                        <Radio label="停用" disabled></Radio>
                    </RadioGroup>
                </div>
                <Row style="padding-top: 40px;">
                    <Col span="12">
                        <div class="form-item">
                            <label>区域位置:</label>
                            <span>哈哈</span>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="form-item">
                            <label>测点名称:</label>
                            <span></span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <div class="form-item">
                            <label>测点类别:</label>
                            <span></span>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="form-item">
                            <label>数据分类:</label>
                            <span></span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <div class="form-item">
                            <label>信号类型:</label>
                            <span></span>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="form-item">
                            <label>显示小数位:</label>
                            <span></span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <div class="form-item">
                            <label>状态值:</label>
                            <span></span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <div class="form-item">
                            <label>所属设备:</label>
                            <span></span>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="form-item">
                            <label>备注:</label>
                            <span></span>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>
<script>
import { detailBasicMethod, detailCountMethod1 } from '@/api/dataManage/taskCalc'
export default {
    data(){
        return {
            height:'',
            title: '查看多测点计算任务',
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
            countType: ''
        }
    },
    mounted() {
        this.height = document.body.clientHeight - 80
        this.mpointid = this.$route.query.mpointid
        this.id = this.$route.query.id
        this.getBasicDetail()
        this.getCountDetail1()
    },
    methods: {
        getBasicDetail() {
            let mpointid = this.mpointid
            detailBasicMethod(mpointid).then(res=> {
                // console.log(res)
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
                console.log(res)
            }).catch(err=> {

            })
        },
        goBack() {
            this.$router.go(-1)
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