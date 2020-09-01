<template>
    <div class="declare-wrap" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>缺陷申报</h3> 
            <div class="c-btns-right">
                <Button type="primary" @click="saveHandle()">保存</Button>
                <Button type="primary" class="c-btn-back" @click="goBack()">取消</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <Row>
                    <Col span="12">
                        <FormItem label="组织：">
                            <span>联泰潮英智慧水务</span>
                        </FormItem>
                        <FormItem label="缺陷类型：" prop="type">
                            <Select v-model="formValidate.type" placeholder="请选择缺陷类型" style="width: 200px;">
                                <Option value="0">工艺缺陷</Option>
                                <Option value="1">设备缺陷</Option>
                                <Option value="2">管理缺陷</Option>
                                <Option value="3">其他缺陷</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="区域位置：" prop="area">
                            <TreeSelect v-model="formValidate.area" multiple :data="areaData" v-width="300" />
                        </FormItem>
                        <FormItem label="处理人：" class="special">
                            <Select v-model="formValidate.handler" style="width:200px">
                                <Option value="0">联泰潮英智慧水务</Option>
                            </Select>
                            <Select v-model="formValidate.handlerName" style="width:200px" placeholder="请选择人员">
                                <Option v-for="item in handlerList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            <a href="javascript:;" @click="peoModal = true">[在勤人员]</a>
                        </FormItem>
                        <FormItem label="备注：">
                            <Input v-model="formValidate.remark" type="textarea" />
                        </FormItem>
                        <FormItem label="附件上传：" class="special">
                            <Upload action="//jsonplaceholder.typicode.com/posts/">
                                <Button>点击上传</Button>
                            </Upload>
                            <Tooltip placement="top" class="spec-tip">
                                <Icon type="md-help-circle" />
                                <div slot="content" class="inner">
                                    <p>1、可上传图片，格式如：png，jpg，jpeg；</p>
                                    <p>2、小视频，格式如： mp4，单个视频不超过5M</p>
                                </div>
                            </Tooltip>
                        </FormItem>
                    </Col>

                    <Col span="12">
                        <FormItem label="申报人：">
                            <span>deth</span>
                        </FormItem>
                        <FormItem label="严重程度：" prop="extent">
                            <Select v-model="formValidate.extent" placeholder="请选择严重程度" style="width: 200px;">
                                <Option value="0">严重</Option>
                                <Option value="1">一般</Option>
                                <Option value="2">轻微</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="相关设备：" class="special">
                            <span>
                                <a href="javascript:;" @click="equModal = true">[选择设备]</a>
                                <a href="javascript:;">[清除]</a>
                            </span>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
        <!-- 选择相关设备 -->
        <Modal
            v-model="equModal"
            title="选择相关设备"
            width="600"
            :footer-hide="true"
            @on-ok="equOk"
            @on-cancel="equCancel">
            <div class="que-search">
                <Input v-model="equName" style="width: 200px" placeholder="输入设备名称以检索">
                    <Button slot="append" icon="ios-search"></Button>
                </Input>
            </div>
            <Table :columns="equColumns" :data="equData"></Table>
            <Page :total="100" show-elevator show-total size="small" class="page"/>
        </Modal>
        <!-- 选择在勤人员 -->
        <Modal
            v-model="peoModal"
            title="选择在勤人员"
            width="600"
            :footer-hide="true"
            @on-ok="peoOk"
            @on-cancel="peoCancel">
            <div class="que-search">
                <Input v-model="peoName" style="width: 200px" placeholder="输入姓名以检索">
                    <Button slot="append" icon="ios-search"></Button>
                </Input>
            </div>
            <Table :columns="peoColumns" :data="peoData"></Table>
            <Page :total="100" show-elevator show-total size="small" class="page"/>
        </Modal>
    </div>
</template>
<script>
export default {
    name: 'declare',
    data() {
        return {
            height: '',
            formValidate: {
                type: '',
                extent: '',
                area: [],
                handler: '0',
                handlerName: '',
                remark: ''
            },
            ruleValidate: {
                type: [
                    { required: true, message: '请选择缺陷类型', trigger: 'blur' }
                ],
                extent: [
                    { required: true, message: '请选择严重程度', trigger: 'blur' }
                ],
                area: [
                    { required: true, message: '请选择区域位置', trigger: 'blur' }
                ]
            },
            areaData: [
                {
                    title: 'parent1',
                    expand: true,
                    value: 'parent1',
                    selected: false,
                    checked: false,
                    children: [
                        {
                            title: 'parent 1-1',
                            expand: true,
                            value: 'parent1-1',
                            selected: false,
                            checked: false,
                            children: [
                                {
                                    title: 'leaf 1-1-1',
                                    value: 'leaf1',
                                    selected: false,
                                    checked: false,
                                }
                            ]
                        }
                    ]
                }
            ],
            handlerList: [
                {
                    value: '0',
                    label: '张三'
                }
            ],
            equModal: false,
            equName: '',
            equColumns: [
                {
                    title: '设备名称',
                    key: 'name'
                }, {
                    title: '设备编号',
                    key: 'name'
                }, {
                    title: '设备类型',
                    key: 'name'
                }, {
                    title: '型号',
                    key: 'name'
                }, {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            equData: [],
            peoModal: false,
            peoName: '',
            peoColumns: [
                {
                    title: '所属组织',
                    key: 'name'
                }, {
                    title: '姓名',
                    key: 'name'
                }, {
                    title: '手机号',
                    key: 'name'
                }, {
                    title: '签到时间',
                    key: 'name'
                }, {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            peoData: [],
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        saveHandle() {
            
        },
        equOk() {

        },
        equCancel() {

        },
        peoOk() {

        },
        peoCancel() {

        }
    }
}
</script>
<style lang="less" scoped>
.declare-wrap {
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
            button {
                min-width: 70px;
                margin: 0 5px;
                border: none;
                height: 28px;
            }
            .c-btn-back {
                background: #c8c8c8;
            }
        }
    }
    .c-top-border-gray {
        padding: 20px 0;
        border-top: 5px solid #f0f0f0;
        /deep/.ivu-row {
            padding-left: 20px;
        }
        .special {
            a {
                display: inline-block;
                margin-right: 10px;
            }
            /deep/.ivu-select {
                margin-right: 10px;
            }
            button {
                background: #d8d5d5;
                border: none;
                color: #fff;
                height: auto;
                padding: 4px 12px;
                font-size: 13px;
            }
        }
        /deep/.ivu-upload {
            display: inline-block;
        }
        .spec-tip {
            display: inline-block;
            margin-left: 10px;
            /deep/.ivu-icon {
                font-size: 20px;
                color: rgb(173, 173, 173);
                vertical-align: middle;
            }
        }
    }
    /deep/.ivu-tooltip-popper {
        padding: 0 5px 0 8px;
        .inner {
            white-space: normal;
            padding-left: 15px;
            font-size: 13px;
        }
    }
}
.que-search {
    margin-bottom: 10px;
}
.page {
    text-align: right;
    margin-top: 10px;
}
</style>