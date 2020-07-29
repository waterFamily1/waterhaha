<template>
    <div class="tissue-box" :style="{height: height+'px'}">
        <div class="tissue-tree">
            <div class="tissue-left">
                <div class="tissue-title">
                    <h3>组织结构</h3>
                </div>
                <div class="tissue-list">
                    <Tree :data="baseData" :render="renderContent" class="demo-tree-render"></Tree>
                </div>
            </div>
            <div class="tissue-right">
                <div class="tissue-title">
                    <h3>组织信息</h3> 
                    <span v-if="appear">
                        <Button type="primary">保存</Button>
                        <Button @click="cancel()">取消</Button>
                    </span>
                </div>
                <div class="tissue-content">
                    <Form :model="tissueList" label-position="right" :label-width="80" autocomplete="off">
                        <div class="form-li">
                            <h4>组织名称</h4>
                            <FormItem :label-width="0" v-if="appear">
                                <Input v-model="tissueList.name"></Input>
                            </FormItem v-if="appearOther"rmItem>
                            <div v-if="appearOther">联泰潮英智慧水务</div>
                        </div>
                        <div class="form-li">
                            <h4>组织类别</h4>
                            <FormItem :label-width="0" v-if="appear">
                                <RadioGroup v-model="tissueList.type">
                                    <Radio label="company">公司</Radio>
                                    <Radio label="plant">工厂</Radio>
                                    <Radio label="department">部门</Radio>
                                    <Radio label="班组">班组</Radio>
                                </RadioGroup>
                            </FormItem>
                        </div>
                        <div class="form-box" v-if="appear">
                            <div class="form-title">公司信息</div>
                            <FormItem label="公司全称：">
                                <Input v-model="tissueList.fullName"></Input>
                            </FormItem>
                            <FormItem label="负责人：">
                                <Input v-model="tissueList.principal"></Input>
                            </FormItem>
                            <FormItem label="手机：">
                                <Input v-model="tissueList.phone"></Input>
                            </FormItem>

                            <FormItem label="地址：">
                                <Input v-model="tissueList.site"></Input>
                            </FormItem>
                            <FormItem label="附属信息：">
                                <Input v-model="tissueList.other"></Input>
                            </FormItem>
                        </div>
                        <div class="form-box form-other" v-if="appearOther">
                            <div class="form-title">公司信息</div>
                            <div class="other-li">
                                <span>公司全称：</span>
                                <span>联泰潮英智慧水务</span>
                            </div> 
                            <div class="other-li">
                                <span>负责人：</span>
                                <span>deht</span>
                            </div>
                            <div class="other-li">
                                <span>手机：</span>
                                <span>17180654515</span>
                            </div>
                            <div class="other-li">
                                <span>地址：</span>
                                <span></span>
                            </div>
                            <div class="other-li">
                                <span>附属信息：</span>
                                <span></span>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'tissueInfor',
    data () {
        return {
            baseData: [{
                title: 'parent 1',
                expand: true,
                render: (h, { root, node, data }) => {
                    return h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%'
                        },
                        on: {
                            'mouseenter': () => {
                                data.is_show = true
                            },
                            'mouseleave': () => {
                                data.is_show = false
                            }
                        }
                    }, [
                        h('span', [
                            h('span', data.title),
                        ]),
                        h('span', {
                            style: {
                                display: 'inline-block',
                                float: 'right'
                            }
                        }, [
                            h('Button', {
                                props: Object.assign({}, this.buttonProps, {
                                    type: 'primary'
                                }),
                                style: {
                                    display: data.is_show ? 'block' : 'none'
                                },
                                on: {
                                    click: () => { 
                                        this.newFun()
                                    }
                                }
                            },'新增')
                        ])
                    ]);
                },
                children: [
                    {
                        title: 'child 1-1',
                        expand: true,
                        children: [
                            {
                                title: 'leaf 1-1-1',
                                expand: true
                            },
                            {
                                title: 'leaf 1-1-2',
                                expand: true
                            }
                        ]
                    },
                    {
                        title: 'child 1-2',
                        expand: true,
                        children: [
                            {
                                title: 'leaf 1-2-1',
                                expand: true
                            },
                            {
                                title: 'leaf 1-2-1',
                                expand: true
                            }
                        ]
                    }
                ]
            }],
            buttonProps: {
                type: 'default',
                size: 'small'
            },
            tissueList: {
                name: '',
                type: 'company',
                fullName: '',
                principal: '',
                phone: '',
                site: '',
                other: ''
            },
            appear: false,
            appearOther: false,
            height: ''
        }
    },
    mounted() {
        this.height = document.body.clientHeight-70
    },
    methods: {
        renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                },
                on: {
                    //鼠标进入
                    'mouseenter': () => {
                        data.is_show = true;
                    },
                    //鼠标离开
                    'mouseleave': () => {
                        data.is_show = false;
                    }
                }
            }, [
                h('span', [
                    h('span', data.title)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right'
                    }
                }, [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary'
                        }),
                        style: {
                            marginRight: '4px',
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            // click: () => { this.append(data) }
                        }
                    },'编辑'),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary'
                        }),
                        style: {
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            // click: () => { this.remove(root, node, data) }
                        }
                    },'删除')
                ])
            ]);
        },
        append (data) {
            const children = data.children || [];
            children.push({
                title: 'appended node',
                expand: true
            });
            this.$set(data, 'children', children);
        },
        remove (root, node, data) {
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
        },
        newFun() {
            let self = this
            self.appear = true
        },
        cancel() {
            let self = this
            self.appear = false
            self.appearOther = true
        }
    }
}
</script>
<style lang="less" scoped>
.tissue-box {
    margin-top: 5px;
    .tissue-tree {
        display: flex;
        min-height: 100%;
        height: 100%;
        .tissue-title {
            border-bottom: 1px solid #f0f0f0;
            height: 40px;
            line-height: 40px;
            text-indent: 10px;
            color: #495060;
            h3 {
                display: inline;
                font-size: 14px;
            }
            span {
                display: inline;
                float: right;
            }
            .ivu-btn {
                height: 25px;
                font-size: 12px;
                padding: 0 20px;
            }
            .ivu-btn-primary {
                margin-right: 15px;
            }
        }
        .tissue-left {
            width: 350px;
            background: #FFF;
            height: 100%;
            .tissue-list {
                width: 100%;
                padding: 0 10px;
                /deep/.ivu-tree-title {
                    width: 100%;
                }
            }
        }
        .tissue-right {
            flex: 1;
            min-height: 100%;
            height: 100%;
            width: 100%;
            background: #FFF;
            border-left: 5px solid #f5f7f9;
            border-right: 5px solid #f5f7f9;
            .tissue-content {
                padding: 20px 50px;
                /deep/.ivu-input {
                    width: 300px;
                }
                /deep/.ivu-form .ivu-form-item-label {
                    padding-right: 0;
                }
                .form-li {
                    border-bottom: 1px dashed #f0f0f0;
                    h4 {
                        height: 30px;
                        margin-top: 10px;
                    }
                    /deep/.ivu-form-item {
                        margin-bottom: 14px;
                    }
                }
                .form-box {
                    .form-title {
                        background-color: #f4f4f4;
                        height: 30px;
                        line-height: 30px;
                        text-indent: 20px;
                        font-weight: 100;
                        font-size: 13px;
                        margin: 10px 0px;
                    }
                }
                .form-other {
                    .other-li {
                        display: flex;
                        font-size: 13px;
                        line-height: 30px;
                        span:nth-of-type(1) {
                            width: 70px;
                            text-align: right;
                        }
                    }
                }
            }
        }
    }
    /deep/.ivu-row {
        margin: 0!important;
        /deep/.ivu-col{
            background: #fff;
            padding: 0!important;
        }
        /deep/.ivu-col-span-xl-6 {
            width: 24%;
            margin-right: 1%;
        }
    }
}
</style>