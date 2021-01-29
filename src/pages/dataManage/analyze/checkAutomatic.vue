<template >
    <div class="data-div" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>查看自动采集型测点</h3> 
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
                    <div class="item-form">
                        <label>测点类别：</label>
                        <span>{{ mpointType }}</span>
                    </div>
                    <div class="item-form">
                        <label>信号类型：</label>
                        <span>{{ datype }}</span>
                    </div>
                    <div class="item-form" v-if="datype == '数值信号'">
                        <label>单位：</label>
                        <span>{{ unit }}</span>
                    </div>
                    <div class="item-form" v-if="datype == '状态信号'">
                        <label>状态值：</label>
                        <span>{{ enumvalue }}</span>
                    </div>
                    <div class="item-form">
                        <label>所属设备：</label>
                        <span>{{ equipmentName }}</span>
                    </div>
                </Col>
                <Col span="12">
                    <div class="item-form">
                        <label>测点名称：</label>
                        <span>{{ mpointName }}</span>
                    </div>
                    <div class="item-form">
                        <label>数据分类：</label>
                        <span>{{ categoryName }}</span>
                    </div>
                    <div class="item-form">
                        <label>显示小数位：</label>
                        <span>{{ numtail }}</span>
                    </div>
                    <div class="item-form">
                        <label>点位：</label>
                        <span>{{ point }}</span>
                    </div>
                    <div class="item-form">
                        <label>备注：</label>
                        <span>{{ remarks }}</span>
                    </div>
                </Col>
            </Row>
            <Tabs value="name1" v-if="datype == '数值信号'">
                <TabPane label="预处理方式" name="name1">
                    <div class="c-adv-search">
                        <Row>
                            <Col span="24">
                                公式计算
                            </Col>
                            <Col span="24">
                                <div class="item-form">
                                    <label>公式：</label>
                                    <div class="item-form-div">
                                        测点值＝ 采集值 x 倍数 + 基数
                                    </div>
                                </div>
                            </Col>
                            <Col span="12">
                                <div class="item-form">
                                    <label>倍数：</label>
                                    <span>{{ magnification }}</span>
                                </div>
                            </Col>
                            <Col span="12">
                                <div class="item-form">
                                    <label>基数：</label>
                                    <span>{{ cardinality }}</span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24">
                                合理性判断
                            </Col>
                            <Col span="12">
                                <div class="item-form">
                                    <label>上限：</label>
                                    <span>{{ upperRange }}</span>
                                </div>
                            </Col>
                            <Col span="12">
                                <div class="item-form">
                                    <label>下限：</label>
                                    <span>{{ lowerRange }}</span>
                                </div>
                            </Col>
                            <Col span="24">
                                <div class="item-form">
                                    <label>单调递增：</label>
                                    <span>
                                        <Checkbox v-model="increase" disabled>启用</Checkbox>
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24">
                                平滑
                            </Col>
                            <Col span="24">
                                <div class="item-form">
                                    <label>公式：</label>
                                    <span>测点值＝前测点值 x 系数 + 当前采集值 x (1-系数)</span>
                                </div>
                            </Col>
                            <Col span="12">
                                <div class="item-form">
                                    <label>等级：</label>
                                    <span>{{ categoryId }}</span>
                                </div>
                            </Col>
                            <Col span="12">
                                <div class="item-form">
                                    <label>系数：</label>
                                    <span>{{ coefficient }}</span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </TabPane>
                <TabPane label="测点设置" name="name2">
                    <Row>
                        <Col span="24">
                            <div class="item-form">
                                <label>读写设置：</label>
                                <div class="item-form-div">
                                    <div class="item-form-flex">
                                        <RadioGroup v-model="readWriteSet" vertical>
                                            <Radio label="只读" disabled>
                                                <span>只读</span>
                                            </Radio>
                                            <Radio label="读写" disabled>
                                                <span>读写</span>
                                            </Radio>
                                        </RadioGroup>
                                        <div>权限：</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <div class="item-form">
                                <label>推送设置：</label>
                                <div class="item-form-div">
                                    <div class="item-form-flex">
                                        <RadioGroup v-model="pushSet" vertical>
                                            <Radio label="变化" disabled>
                                                <span>变化</span>
                                            </Radio>
                                            <Radio label="周期" disabled>
                                                <span>周期</span>
                                            </Radio>
                                        </RadioGroup>
                                        <div>
                                            <Input v-model="cycle" style="width: 100px" disabled />
                                            <Input v-model="cycle1" style="width: 100px" disabled />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
            <Tabs value="name1" v-if="datype == '状态信号'">
                <TabPane label="测点设置" name="name1">
                    <Row>
                        <Col span="24">
                            <div class="item-form">
                                <label>读写设置：</label>
                                <div class="item-form-div">
                                    <div class="item-form-flex">
                                        <RadioGroup v-model="readWriteSet" vertical>
                                            <Radio label="只读" disabled>
                                                <span>只读</span>
                                            </Radio>
                                            <Radio label="读写" disabled>
                                                <span>读写</span>
                                            </Radio>
                                        </RadioGroup>
                                        <div>权限：{{ roleName }}</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <div class="item-form">
                                <label>推送设置：</label>
                                <div class="item-form-div">
                                    <div class="item-form-flex">
                                        <RadioGroup v-model="pushSet" vertical>
                                            <Radio label="变化" disabled>
                                                <span>变化</span>
                                            </Radio>
                                            <Radio label="周期" disabled>
                                                <span>周期</span>
                                            </Radio>
                                        </RadioGroup>
                                        <div>
                                            <Input v-model="cycle" style="width: 100px" disabled />
                                            <Input v-model="cycle1" style="width: 100px" disabled />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
        </div>  
    </div>
</template>

<script>
import { detailMethod1 } from '@/api/dataManage/siteManage'

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
            enumvalue: '',
            point: '',
            equipmentName: '',
            remarks: '',
            cardinality: '',
            upperRange: '',
            lowerRange: '',
            coefficient: '',
            magnification: '',
            increase: '',
            readWriteSet: '',
            pushSet: '',
            cycle: '',
            cycle1: '',
            categoryId: '',
            roleName: ''
        }
    },
    created() {
        this.ids = this.$route.query.ids
    },
    mounted() {
        this.height = document.body.clientHeight
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
            detailMethod1(ids).then(res=> {
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
                this.cardinality = res.data.cardinality
                this.upperRange = res.data.upperRange
                this.lowerRange = res.data.lowerRange
                this.coefficient = res.data.coefficient
                this.magnification = res.data.magnification
                this.categoryId = res.data.categoryId
                this.roleName = res.data.roleName
                if(res.data.increase == 1) {
                    this.increase = true
                } else {
                    this.increase = false
                }

                if(res.data.readWriteSet == 1) {
                    this.readWriteSet = '只读'
                } else if(res.data.readWriteSet == 2) {
                    this.readWriteSet = '读写'
                } else {
                    this.readWriteSet = ''
                }

                if(res.data.pushSet == 1) {
                    this.pushSet = '变化'
                    this.cycle = res.data.cycle
                    this.cycle1 = null
                } else if(res.data.pushSet = 2) {
                    this.pushSet = '周期'
                    this.cycle1 = res.data.cycle
                    this.cycle = null
                } else {
                    this.pushSet = ''
                    this.cycle = null
                    this.cycle1 = null
                }
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
                    vertical-align: top;
                }
                .item-form-div {
                    display: inline-block;
                    .item-form-flex {
                        display: flex;
                        /deep/.ivu-radio-group {
                            margin: 0 30px 0 10px;
                            label {
                                display: block;
                                width: auto;
                            }
                        }
                        div {
                            display: inline-block;
                        }
                        .ivu-input-wrapper {
                            display: block;
                            margin-bottom: 5px;
                            /deep/.ivu-input {
                                height: auto;
                            }
                        }
                    }
                }
            }
        }
    }
    .c-adv-search {
        padding-top: 10px;
        /deep/.ivu-row {
            padding: 10px 0 0 20px;
            border-bottom: 1px solid #e6e6e6;
            .item-form {
                margin-bottom: 15px;
                /deep/.ivu-checkbox-wrapper {
                    width: auto;
                }
            }
        }
    }
}
</style>
