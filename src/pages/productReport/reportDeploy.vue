<template>
    <div class="deploy-box" :style="{height: height+'px'}">
        <div class="deploy-main">
            <div class="deploy-left">
                <div class="left-box">
                    <AutoComplete
                        v-model="formName"
                        :data="formData"
                        :clearable="true"
                        @on-search="handleSearch"
                        placeholder="输入报表名称以检索"
                        size="small">
                    </AutoComplete>
                    <div class="tree-box">
                        <Tree :data="treeData"></Tree>
                    </div>
                </div>
            </div>
            <div class="deploy-right">
                <div>
                    <div class="right-title">
                        <h3>报表模板</h3>
                        <div class="btns-right">
                            <Button type="primary" size="small">保存</Button>
                            <Button type="primary" size="small">预览</Button>
                        </div>
                    </div>
                    <div class="right-form">
                        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                            <FormItem label="报表模板名称" prop="name">
                                <Input v-model="formValidate.name" style="width: 160px;"></Input>
                            </FormItem>
                            <FormItem label="报表类型" prop="type">
                                <Select v-model="formValidate.type" style="width: 160px;">
                                    <Option value="0">日报</Option>
                                    <Option value="1">月报</Option>
                                </Select>
                            </FormItem>
                        </Form>
                    </div>
                    <h3 class="c-gray-bg-h" style="margin: 0px 10px; text-indent: 10px;">报表数据源</h3>
                    <div class="right-btn">
                        <Button size="small">新增</Button>
                    </div>
                    <Table size="small" :columns="columns" :data="data">
                        <template slot-scope="{ row }" slot="name">
                            <strong>{{ row.name }}</strong>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <Button type="error" size="small" @click="tableRemove(index)">删除</Button>
                        </template>
                    </Table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'reportDeploy',
    data() {
        return {
            height: '',
            formName: '',
            formData: [],
            treeData: [
                {
                    title: 'parent 1',
                    expand: true,
                    children: [
                        {
                            title: 'parent 1-1',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-1-1'
                                },
                                {
                                    title: 'leaf 1-1-2'
                                }
                            ]
                        },
                        {
                            title: 'parent 1-2',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-2-1'
                                },
                                {
                                    title: 'leaf 1-2-1'
                                }
                            ]
                        }
                    ]
                }
            ],
            formValidate: {
                name: '',
                type: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入报表模板名称', trigger: 'blur' }
                ]
            },
            columns: [
                {
                    title: '分组名称',
                    key: 'name'
                }, {
                    title: '分组序号',
                    key: 'number'
                }, {
                    title: '测点',
                    key: 'station'
                }, {
                    title: 'Action',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            data: [

            ]
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
    methods: {
        handleSearch (value) {
            this.formData = !value ? [] : [
                value,
                value + value,
                value + value + value
            ];
        },
        tableRemove(index) {

        }
    }
}
</script>
<style lang="less" scoped>
.deploy-box {
    margin: 5px;
    background: #fff;
    .deploy-main {
        width: 100%;
        height: 100%;
        display: flex;
        .deploy-left {
            width: 300px;
            height: 100%;
            .left-box {
                width: 100%;
                /deep/.ivu-select {
                    padding: 3px;
                }
                .tree-box {
                    border-top: 1px solid rgb(230, 230, 230);
                    width: 100%;
                }
            }
        }
        .deploy-right {
            width: 100%;
            border-left: 5px solid #f0f0f0;
            .right-title {
                border-bottom: 1px solid #f0f0f0;
                height: 50px;
                padding: 10px 0 10px 10px;
                h3 {
                    display: inline-block;
                    font-size: 14px;
                    line-height: 30px;
                }
                .btns-right {
                    float: right;
                    margin-top: 2px;
                    /deep/.ivu-btn-small {
                        font-size: 13px;
                        margin-right: 10px;
                        padding: 1px 20px;
                    }
                }
            }
            .right-form {
                margin-top: 10px;
                /deep/.ivu-form-item {
                    width: 45%;
                    display: inline-block;
                }
            }
            .c-gray-bg-h {
                background-color: #f4f4f4;
                height: 30px;
                line-height: 30px;
                text-indent: 20px;
                font-weight: 100;
                font-size: 13px;
            }
            .right-btn {
                margin: 10px 0px 0px 10px;
                border-bottom: 1px solid rgb(239, 239, 239);
                padding-bottom: 10px;
                /deep/.ivu-btn {
                    background-color: #576374;
                    border: none;
                    color: #fff;
                    font-size: 13px;
                    padding: 4px 12px;
                    height: auto;
                }
            }
        }
    }
}
</style>