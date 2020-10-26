<template>
    <div class="syn-box" :style="{height: height+'px'}">
        <div class="syn-title">
            <h3>批量配置综合测点</h3>
            <div>
                <Button type="info" size="small" style="background:#4b7efe" @click="saveHandle('formValidate')">保存</Button>
                <Button type="info" size="small" style="background:#c8c8c8" @click="goBack('formValidate')">返回</Button>
            </div>
        </div>
        <div class="syn-table">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140">
                <div class="c-title-css">基本信息</div>
                <Row style="padding-top: 30px;">
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
                        <FormItem label="数据分类：" prop="dataKind">
                            <Select v-model="formValidate.dataKind" style="width: 210px">
                                <Option value="0">水位</Option>
                                <Option value="1">水质</Option>
                                <Option value="2">水量</Option>
                                <Option value="3">能耗</Option>
                                <Option value="4">物耗</Option>
                                <Option value="5">药耗</Option>
                                <Option value="6">压力</Option>
                                <Option value="7">消防</Option>
                                <Option value="8">电流</Option>
                                <Option value="9">电压</Option>
                                <Option value="10">温度</Option>
                                <Option value="11">震动</Option>
                                <Option value="12">状态</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
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
            </Form>
        </div>
    </div>
</template>

<script>
import { batchMethod } from '@/api/dataManage/siteManage'

export default {
    data() {
        return {
            height: '',
            formValidate: {
                signalType: '',
                dataKind: '0',
                unit: '',
                state: '0,关;1,开;',
                decimal: '2'
            },
            unitValue: '',
            signalKind: 'Digtal',
            ruleValidate: {
                signalType: [
                    { required: true, message: '请选择信号类型', trigger: 'change' }
                ]
            },
            type: '',
            ids: ''
        }
    },
    created() {
        this.type = this.$route.query.type
        if(this.$route.query.ids == undefined || this.$route.query.ids == null || this.$route.query.ids == '') {
            this.ids = sessionStorage.getItem('ids')
        } else {
            this.ids = this.$route.query.ids
        }
        console.log(this.ids)
    },
    mounted() {
        this.height = document.body.clientHeight - 80
    },
    methods: {
        signalChange(val) {
            this.signalKind = val
        },
        saveHandle(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    batchMethod({
                        bmpoint: {
                            categoryId: Number(this.formValidate.dataKind),
                            datype: this.formValidate.signalType,
                            enumvalue: this.formValidate.state,
                            numtail: Number(this.formValidate.decimal),
                            unit: this.unitValue,
                        },
                        ids: this.ids,
                        type: this.type
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
            this.$router.go(-1)
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
        }
        /deep/.ivu-row {
            padding-left: 20px;
        }
    }
}
</style>