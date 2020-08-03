<template>
    <div class="add-box" :style="{height: height+'px'}">
        <div class="add-title">
            <h3>新增报警</h3>
            <div>
                <Button type="info" size="small" style="background:#4b7efe" @click="save()">保存</Button>
                <Button type="info" size="small" style="background:#c8c8c8" @click="goBack()">取消</Button>
            </div>
        </div>
        <div class="add-content">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
                <FormItem label="报警类型:">
                    <Select v-model="formValidate.type">
                        <Option value="0">单卡报警</Option>
                    </Select>
                </FormItem>
                <FormItem label="报警对象:" prop="object">
                    <div @click="objmodel()">
                        <Input v-model="formValidate.object" placeholder="请选择报警对象" readonly></Input>
                    </div>
                </FormItem>
                <FormItem label="订阅方式:">
                    <Select v-model="formValidate.way" multiple>
                        <Option v-for="item in wayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="阈值:" prop="value">
                    <Input v-model="formValidate.value" placeholder="请输入阈值"></Input>
                    <div class="form-tool">
                        %
                        <div class="center-right">
                            <Tooltip content="Right Center text" placement="right">
                                <Icon type="ios-help-circle" 
                                    style="font-size: 20px;color: rgb(0, 151, 207);vertical-align: middle;margin-left: 6px" 
                                    @click="disabled = true" />
                                <div slot="content">
                                    <p>流量剩余百分比小于等于阈值时触发报警</p>
                                    <p>阈值范围值为1~100之间</p>
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                </FormItem>
                <FormItem label="订阅人:" prop="people">
                    <Input v-model="formValidate.people" placeholder="请选择订阅人" readonly></Input>
                    <Button type="primary" class="form-btn" @click="peopleModel = true">选择</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 报警对象 -->
        <Modal
            v-model="objModal"
            title="选择报警对象"
            width="650"
            @on-ok="ok"
            @on-cancel="cancel">
            <div class="model-search">
                <div class="model-search-box">
                    <label>关键字：</label>
                    <Input v-model="keyword" placeholder="ICCID" style="width: 200px" />
                </div>
                <Button type="primary">搜索</Button>
            </div>
            <div class="model-table">
                <Table ref="selection" :columns="columns" :data="data"></Table>
                <div class="model-page">
                    <Page :total="40" size="small" show-total show-elevator style="text-align: right"/>
                </div>
            </div>
        </Modal>
        <!-- 选择订阅人 -->
        <Modal
            v-model="peopleModel"
            title="报警订阅新增对象"
            width="500"
            @on-ok="ok"
            @on-cancel="cancel">
            <div class="people-model">
                <Form ref="peopleForm" :model="peopleForm" :rules="peopleRule" :label-width="80">
                    <FormItem label="所属组织" prop="organization">
                        <Select v-model="peopleForm.organization" placeholder="请选择">
                            <Option value="beijing">New York</Option>
                            <Option value="shanghai">London</Option>
                            <Option value="shenzhen">Sydney</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="用户" prop="user">
                        <Select v-model="peopleForm.user" placeholder="请选择">
                            <Option value="beijing">New York</Option>
                            <Option value="shanghai">London</Option>
                            <Option value="shenzhen">Sydney</Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
    name: 'addAlarm',
    data() {
        return {
            height: '',
            formValidate: {
                type: '',
                object: '',
                way: '',
                value: '',
                people: ''
            },
            ruleValidate: {
                object: [
                    { required: true, message: '请选择报警对象', trigger: 'blur' }
                ],
                value: [
                    { required: true, message: '请输入阈值', trigger: 'blur' }
                ]
            },
            wayList: [
                {
                    value: '0',
                    label: '系统消息'
                },
                {
                    value: '1',
                    label: '短信'
                }
            ],
            objModal: false,
            keyword: '',
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '报警对象',
                    key: 'alarmObject'
                },
                {
                    title: '备注',
                    key: 'remark'
                }
            ],
            data: [
                {
                    alarmObject: '1',
                    remark: '哈哈哈哈哈哈'
                }
            ],
            peopleModel: false,
            peopleForm: {
                organization: '',
                user: ''
            },
            peopleRule: {
                organization: [
                    { required: true, message: '请选择所属组织', trigger: 'blur' }
                ],
                user: [
                    { required: true, message: '请选择用户', trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        this.height = document.body.clientHeight-130
    },
    methods: {
        save() {

        },
        goBack() {
            this.$router.go(-1)
        },
        objmodel() {
            console.log(1111)
            this.objModal = true
        },
        ok () {
            this.$Message.info('Clicked ok');
        },
        cancel () {
            this.$Message.info('Clicked cancel');
        }
    }
}
</script>
<style lang="less" scoped>
.add-box {
    margin: 5px;
    background: #fff;
    .add-title {
        padding: 5px;
        h3{
            display: inline-block;
            line-height: 30px;
            text-indent: 10px;
        }
        div{
            float: right;
            button{
                min-width: 70px;
                margin: 0 5px;
                color: #fff;
                border: 0;
            }
        }
    }
    .add-content {
        border-top: 5px solid #f0f0f0;
        padding: 30px 10px 10px;
        .ivu-form-item {
            width: 35%;
            .form-tool {
                position: absolute;
                top: 0;
                right: -50px;
                .center-right {
                    float: right;
                }
                .ivu-tooltip-inner {
                    p {
                        font-size: 12px;
                    }
                }
            }
            .form-btn {
                position: absolute;
                top: 0;
                right: -70px;
                font-size: 12px;
                height: 24px;
            }
        }
    }
}
.model-search {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
    vertical-align: top;
    zoom: 1;
    /deep/.ivu-input {
        height: 28px;
    }
    /deep/.ivu-btn {
        height: 28px;
        line-height: 25px;
        font-size: 13px;
    }
}
.model-page {
    margin-top: 20px;
}
/deep/.ivu-btn-text {
    border: 1px solid #e3e5e8;
}
</style>