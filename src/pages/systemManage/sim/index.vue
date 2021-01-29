<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="index-title">
            <h3>SIM卡详情</h3>
             <div>
                <Button type="info" size="small" style="background:#c8c8c8" @click="goBack()">返回</Button>
            </div>
        </div>
        <div class="index-detail">
            <div class="detail-row">
                <Row>
                    <Col span="12">
                        <div class="row-item">
                            <label>租户名称:</label>
                            <div class="row-item-content">{{ userName }}</div>
                        </div>
                        <div class="row-item">
                            <label>ICCID:</label>
                            <div class="row-item-content">{{ iccId }}</div>
                        </div>
                        <div class="row-item">
                            <label>MSISDN:</label>
                            <div class="row-item-content">{{ msisdn }}</div>
                        </div>
                        <div class="row-item">
                            <label>SIM卡状态:</label>
                            <div class="row-item-content">{{ cardStatus }}</div>
                        </div>
                        <div class="row-item">
                            <label>流量套餐:</label>
                            <div class="row-item-content">{{ pkgname }}</div>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="row-item">
                            <label>总流量（MB）:</label>
                            <div class="row-item-content">{{ totalFlow }}</div>
                        </div>
                        <div class="row-item">
                            <label>已用流量（MB）:</label>
                            <div class="row-item-content">{{ usedFlow }}</div>
                        </div>
                        <div class="row-item">
                            <label>剩余流量（MB）:</label>
                            <div class="row-item-content">{{ leftFlow }}</div>
                        </div>
                        <div class="row-item">
                            <label>运营商:</label>
                            <div class="row-item-content">{{ operator }}</div>
                        </div>
                        <div class="row-item">
                            <label>数据更新时间:</label>
                            <div class="row-item-content">{{ updateTime }}</div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <div class="row-item">
                            <label>备注:</label>
                            <div class="row-item-content">{{ remark }}</div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div class="c-gray-bg-h">
                <span>时效选择 </span>
                <RadioGroup v-model="pickerType" @on-change="radioChange">
                    <Radio label="month">日统计</Radio>
                    <Radio label="year">月统计</Radio>
                </RadioGroup>
            </div>
            <div class="detail-picker">
                <Row>
                    <Col span="12">
                        <div class="picker-item">
                            <label>选择月份：</label>
                            <DatePicker 
                                :type="pickerType" 
                                :options="dateOpiton" 
                                :value="dateVal"
                                @on-change="dateChange"
                                style="width: 220px"
                            ></DatePicker>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span="24" class="container-div">

                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>

<script>
import { checkDetail, getDateMethod } from '@/api/system/sim'
import { formatTime } from '@/libs/public'

export default {
    data() {
        return {
            height: '',
            iccid: '',
            userName: '',
            iccId: '',
            msisdn: '',
            pkgname: '',
            cardStatus: '',
            operator: '',
            totalFlow: '',
            usedFlow: '',
            leftFlow: '',
            updateTime: '',
            remark: '',
            pickerType: 'month',
            dateVal: '',
            dateOpiton: {
                disabledDate(date) {
                    return date && date.valueOf() >= new Date()
                }
            }
        }
    },
    mounted() {
        this.height = document.body.clientHeight - 75
        this.iccid = this.$route.query.iccid
        this.detailMethod()
        this.getDate()
        this.getPicker()
    },
    methods: {
        detailMethod() {
            let iccid = this.iccid
            checkDetail(iccid).then(res=> {
                // console.log(JSON.stringify(res))
                this.userName = res.data.userName
                this.iccId = res.data.iccid
                this.msisdn = res.data.msisdn
                this.pkgname = res.data.pkgname
                this.totalFlow = res.data.totalFlow
                this.usedFlow = res.data.usedFlow
                this.leftFlow = res.data.leftFlow
                this.updateTime = formatTime(res.data.updateTime, 'yyyy-MM-dd HH:mm:ss')
                this.remark = res.data.remark

                if(res.data.cardStatus == '0') {
                    this.cardStatus = '在用'
                } else if(res.data.cardStatus == '1') {
                    this.cardStatus = '停机'
                } else if(res.data.cardStatus == '2') {
                    this.cardStatus = '待激活'
                } else if(res.data.cardStatus == '3') {
                    this.cardStatus = '销户'
                } else if(res.data.cardStatus == '4') {
                    this.cardStatus = '未知'
                }

                if(res.data.operator == 'telcom') {
                    this.operator = '电信'
                } else if(res.data.operator == 'cmcc') {
                    this.operator = '移动'
                } else if(res.data.operator == 'unicom') {
                    this.operator = '联通'
                }
            }).catch(err => {
                // 异常情况
            })
        },
        getDate() {
            this.dateVal = new Date()
        },
        radioChange(val) {
            this.getPicker()
        },
        dateChange(date) {
            console.log(date)
        },
        getPicker() {
            let iccid = this.iccid
            let dateVal = this.dateVal
            let flowType
            if(this.pickerType == 'month') {
                flowType = 'DAY'
            } else {
                flowType = 'MONTH'
            }
            // getDateMethod({
            //     iccid,
            //     dateVal,
            //     flowType
            // }).then(res=> {
            //     console.log(res)
            // }).catch(err => {
            //     // 异常情况
            // })
        },
        goBack() {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="less" scoped>
.index-box {
    margin: 5px;
    background: #fff;
    .index-title {
        background: #fff;
        padding: 5px;
        h3{
            display: inline-block;
            line-height: 30px;
            text-indent: 10px;
        }
        div{
            float: right;
            .ivu-btn{
                min-width: 70px;
                margin: 0 5px;
                color: #fff;
                border: 0;
            }
        }
    }
    .index-detail {
        width: 100%;
        border-top: 5px solid #f0f0f0;
        .detail-row {
            padding: 20px 0;
            background: #fff;
            /deep/.ivu-row {
                padding-left: 20px;
                .row-item {
                    width: 100%;
                    margin-bottom: 15px;
                    vertical-align: top;
                    display: block;
                    zoom: 1;
                    overflow: hidden;
                    label {
                        width: 150px;
                        text-align: right;
                        vertical-align: middle;
                        float: left;
                        font-size: 13px;
                        color: #495060;
                        line-height: 1;
                        padding: 10px 12px 10px 0;
                        box-sizing: border-box;
                    }
                    .row-item-content {
                        margin-left: 150px;
                        // position: relative;
                        line-height: 32px;
                        font-size: 13px;
                    }
                }
            }
        }
    }
    .c-gray-bg-h {
        background-color: #f4f4f4;
        height: 30px;
        span {
            display: inline-block;
            text-indent: 20px;
            font-weight: 100;
            font-size: 13px;
            line-height: 30px;
        }
        /deep/.ivu-radio-group {
            margin-left: 23px;
            /deep/.ivu-radio-wrapper {
                width: 110px;
                text-align: right;
                font-size: 13px;
            }
        }
    }
    .detail-picker {
        background: #fff;
        /deep/.ivu-row {
            padding: 20px 0;
            .picker-item {
                margin-bottom: 15px;
                vertical-align: top;
                zoom: 1;
                overflow: hidden;
                label {
                    text-align: right;
                    vertical-align: middle;
                    float: left;
                    font-size: 13px;
                    color: #495060;
                    line-height: 1;
                    padding: 10px 12px 10px 0;
                    box-sizing: border-box;
                    width: 150px;
                }
            }
        }
        .container-div {
            padding: 20px;
            position: relative;

        }
    }
}
</style>