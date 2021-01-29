<template >
    <div class="data-div" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>查看人工录入测点</h3> 
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
        </div>  
    </div>
</template>

<script>
import { detailMethod3 } from '@/api/dataManage/siteManage'

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
            unit: '',
            point: '',
            equipmentName: '',
            remarks: '',
            enumvalue: ''
        }
    },
    created() {
        this.ids = this.$route.query.ids
    },
    mounted() {
        this.height = document.body.clientHeight - 80
        this.getDetail()
    },
    methods: {
        goBack() {
            this.$router.push({
                path: '/mpoint'
            })
        },
        getDetail() {
            let ids = this.ids
            detailMethod3(ids).then(res=> {
                console.log(JSON.stringify(res.data))
                this.siteName = res.data.siteName
                this.mpointName = res.data.mpointName
                this.point = res.data.point
                this.remarks = res.data.remarks
                this.unit = res.data.unit
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
                height: auto;
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
                margin-bottom: 24px;
                line-height: 30px;
                label {
                    display: inline-block;
                    width: 140px;
                    text-align: right;
                }
            }
        }
    }
}
</style>