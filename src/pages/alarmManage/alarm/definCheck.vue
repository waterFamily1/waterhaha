<template>
    <div class="check-wrap" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>报警定义</h3> 
            <div class="c-btns-right">
                <Button type="primary" class="c-btn-back" @click="goBack()">返回</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
            <Row>
                <Col span="12">
                    <div class="item-form">
                        <label>区域位置：</label>
                        <span>{{ area }}</span>
                    </div>
                    <div class="item-form">
                        <label>触发时间：</label>
                        <span>{{ touchTime }}</span>
                    </div>
                    <div class="item-form">
                        <label>报警等级：</label>
                        <span>{{ level }}</span>
                    </div>
                    <div class="item-form">
                        <label>报警条件：</label>
                        <span>{{ condition }}</span>
                    </div>
                </Col>
                <Col span="12">
                    <div class="item-form">
                        <label>确认方法：</label>
                        <span>{{ method }}</span>
                    </div>
                    <div class="item-form">
                        <label>报警名称：</label>
                        <span>{{ name }}</span>
                    </div>
                    <div class="item-form">
                        <label>使用状态：</label>
                        <span>{{ state }}</span>
                    </div>
                </Col>
            </Row>
        </div>
        <div style="padding: 0 20px;">
            <Tabs :animated="false">
                <TabPane label="报警条件">
                    <Table :columns="columns1" :data="data1"></Table>
                </TabPane>
                <TabPane label="报警订阅">
                    <div class="c-table-top-btns">
                        <Checkbox v-model="single" disabled>同步接收报警确认消息</Checkbox>
                    </div>
                    <Table :columns="columns2" :data="data2"></Table>
                </TabPane>
                <TabPane label="处理预案">
                    <Table :columns="columns3" :data="data3"></Table>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script>
export default {
    name: 'definCheck',
    data() {
        return {
            height: '',
            area: '西湖村站点1-1',
            touchTime: '立即触发',
            level: '1级',
            condition: '满足其中一条规则触发',
            method: '自动或者人工',
            name: '控制柜停机报警',
            state: '启用',
            single: true,
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
        }
    }
}
</script>
<style lang="less" scoped>
.check-wrap {
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
                background-color: #576374;
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
        .item-form {
            min-height: 40px;
            line-height: 24px;
            vertical-align: top;
            padding-left: 10px;
            padding-top: 9px;
            label {
                font-weight: 700;
            }
        }
    }
    .c-table-top-btns {
        overflow: hidden;
        height: 36px;
        border-bottom: 1px solid #EEE;
        /deep/.ivu-checkbox-wrapper {
            float: right;
        }
    }
}
</style>