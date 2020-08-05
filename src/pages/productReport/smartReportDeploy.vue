<template>
    <div class="smart-box" :style="{height: height+'px'}">
        <div class="smart-main">
            <div class="smart-left">
                <div class="left-box">
                    <AutoComplete
                        v-model="formName"
                        :data="formData"
                        :clearable="true"
                        @on-search="handleSearch"
                        placeholder="输入智能报表名称以检索"
                        size="small">
                    </AutoComplete>
                    <div class="tree-box">
                        <Tree :data="treeData"></Tree>
                    </div>
                </div>
            </div>
            <div class="smart-right">
                <!-- <div>
                    <div class="right-title">
                        <h3>智能报表目录</h3>
                        <div class="btns-right">
                            <Button type="primary" size="small">保存</Button>
                        </div>
                    </div>
                    <div class="right-form">
                        <Form ref="form1" :model="form1" :rules="rule1" :label-width="120">
                            <FormItem label="目录名称：" prop="name">
                                <Input v-model="form1.name" placeholder="目录名称" style="width: 200px"></Input>
                            </FormItem>
                        </Form>
                    </div>
                </div> -->
                <div>
                    <div class="right-title">
                        <h3>智能报表模板</h3>
                        <div class="btns-right">
                            <Button type="primary" size="small">保存</Button>
                            <Button type="primary" size="small">预览</Button>
                        </div>
                    </div>
                    <div class="right-form">
                        <Form ref="form2" :model="form2" :rules="rule2" :label-width="130">
                            <FormItem label="报表模板名称：" prop="name">
                                <Input v-model="form2.name" style="width: 400px"></Input>
                            </FormItem>
                            <FormItem label="报表路径：" prop="url">
                                <Input v-model="form2.url" style="width: 400px"></Input>
                            </FormItem>
                            <FormItem label="备注：">
                                <Input v-model="form2.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" style="width: 400px"></Input>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'smartReportDeploy',
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
                        }
                    ]
                }
            ],
            form1: {
                name: ''
            },
            rule1: {
                name: [
                    { required: true, message: '请输入目录名称', trigger: 'blur' }
                ]
            },
            form2: {
                name: '',
                url: '',
                remark: ''
            },
            rule2: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                url: [
                    { required: true, message: '请输入路径', trigger: 'blur' }
                ]
            },
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
        }
    }
}
</script>
<style lang="less" scoped>
.smart-box {
    margin: 5px;
    background: #fff;
    .smart-main {
        width: 100%;
        height: 100%;
        display: flex;
        .smart-left {
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
        .smart-right {
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
                margin: 20px;
            }
        }
    }
}
</style>