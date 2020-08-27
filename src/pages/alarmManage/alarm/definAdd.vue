<template>
    <div class="defin-wrap" :style="{height: height+'px'}">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <div class="c-left-border-blue">
                <h3>报警定义</h3> 
                <div class="c-btns-right">
                    <Button type="primary" @click="saveHandle()">保存</Button>
                    <Button type="primary" class="c-btn-back" @click="goBack()">取消</Button>
                </div>
            </div>
            <div class="c-top-border-gray">
                <Row>
                    <Col span="12">
                        <FormItem label="区域位置：">
                            <TreeSelect v-model="formValidate.area" multiple :data="areadData" v-width="250" />
                        </FormItem>
                        <FormItem label="确认方法：">
                            <Select v-model="formValidate.confirmWay" style="width:250px">
                                <Option v-for="item in wayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="触发时间：">
                            <Select v-model="formValidate.time" style="width:250px">
                                <Option v-for="item in timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="报警条件：">
                            <Select v-model="formValidate.condition" style="width:250px">
                                <Option v-for="item in conditionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="报警名称：" prop="name">
                            <Input v-model="formValidate.name" style="width: 250px;"></Input>
                        </FormItem>
                        <FormItem label="报警等级：">
                            <Select v-model="formValidate.alarmLevel" style="width:250px">
                                <Option v-for="item in levelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="使用状态：">
                            <RadioGroup v-model="formValidate.state">
                                <Radio label="启用"></Radio>
                                <Radio label="停用"></Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>
                </Row>
            </div>
            <div style="padding: 0 20px;">
                <Tabs :animated="false">
                    <TabPane label="报警条件">
                        <div class="c-table-top-btns">
                            <Button>新增</Button>
                        </div>
                        <Table :columns="columns1" :data="data1"></Table>
                    </TabPane>
                    <TabPane label="报警订阅">
                        <div class="c-table-top-btns">
                            <Button>新增</Button>
                            <Checkbox v-model="formValidate.single">同步接收报警确认消息</Checkbox>
                        </div>
                        <Table :columns="columns2" :data="data2"></Table>
                    </TabPane>
                    <TabPane label="处理预案">
                        <Table :columns="columns3" :data="data3"></Table>
                    </TabPane>
                </Tabs>
            </div>
        </Form>
    </div>
</template>
<script>
export default {
    name: 'definAdd',
    data() {
        return {
            height: '',
            formValidate: {
                area: [],
                name: '',
                confirmWay: '',
                time: '',
                alarmLevel: '',
                condition: '',
                state: '启用',
                single: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ]
            },
            areadData: [
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
            wayList: [
                {
                    value: '0',
                    label: '自动'
                }, {
                    value: '1',
                    label: '自动或者人工'
                }, {
                    value: '2',
                    label: '人工'
                }
            ],
            levelList: [
                {
                    value: '1',
                    label: '一级'
                }, {
                    value: '2',
                    label: '二级'
                }, {
                    value: '3',
                    label: '三级'
                }
            ],
            timeList: [
                {
                    value: '0',
                    label: '立即触发'
                }, {
                    value: '1',
                    label: '延迟1分钟触发'
                }, {
                    value: '2',
                    label: '延迟5分钟触发'
                }, {
                    value: '3',
                    label: '延迟10分钟触发'
                }
            ],
            conditionList: [
                {
                    value: '0',
                    label: '满足其中一条触发规则'
                }, {
                    value: '1',
                    label: '满足所有规则后触发'
                }
            ],
            columns1: [
                {
                    title: '测点名称',
                    key: 'name'
                }, {
                    title: '条件',
                    key: 'name'
                }, {
                    title: '阈值',
                    key: 'name'
                }, {
                    title: '单位',
                    key: 'name'
                }, {
                    title: '所属设备',
                    key: 'name'
                }, {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            data1: [],
            columns2: [
                {
                    title: '接收对象',
                    key: 'name'
                }, {
                    title: '接收方式',
                    key: 'name'
                }, {
                    title: '推送频率',
                    key: 'name'
                }, {
                    title: '延迟推送时间',
                    key: 'name'
                }, {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            data2: [],
            columns3: [
                {
                    title: '预案内容',
                    key: 'name',
                    width: 800,
                    render: (h, params) => {
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'textarea',
                                }
                            })
                        ]);
                    }
                }, {
                    title: '联系人',
                    key: 'name',
                    render: (h, params) => {
                        return h('div', [
                            h('Select', {
                                // props: {
                                //     type: 'textarea',
                                // }
                            })
                        ]);
                    }
                }
            ],
            data3: []
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
            
        }
    }
}
</script>
<style lang="less" scoped>
.defin-wrap {
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
    }
    .c-table-top-btns {
        height: 36px;
        border-bottom: 1px solid #EEE;
        display: flex;
        justify-content: space-between;
        button {
            min-width: 50px;
            background-color: #576374;
            border: none;
            color: #fff;
            height: 26px;
            font-size: 12px;
            padding: 4px 12px;
        }
    }
}
</style>