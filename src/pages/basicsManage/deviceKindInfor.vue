<template>
    <div class="tissue-box" :style="{height: height+'px'}">
        <div class="tissue-tree">
            <div class="tissue-left">
                <div class="tissue-title">
                    <h3>设备类型</h3>
                    <button class="btn">导入设备类型</button>
                </div>
                <div class="search-input">
                    <input type="text" placeholder="输入设备类型以检索">
                </div>
                <div class="title-main" :style="{height: (height-73)+'px'}">
                    <div class="org-tree">
                         <Tree :data="baseData" :render="renderContent" class="demo-tree-render"></Tree>
                    </div>
                    <div class="mg-drag-tree">
                        <div style="text-align:center;margin:30px auto" v-if="listshow">暂无数据</div>
                         <Tree :data="baseDataList" :render="renderContentList" class="demo-tree-render" v-if="!listshow"></Tree>
                    </div>
                </div>
            </div>
            <div class="tissue-right">
                <div class="tissue-title">
                    <h3>设备类型信息</h3> 
                    <span v-if="appear">
                        <Button type="primary">保存</Button>
                        <Button @click="cancel()">取消</Button>
                    </span>
                </div>
                <div class="tissue-content">
                    <Form :model="tissueList" label-position="right"  autocomplete="off">
                        <div class="form-li">
                            <h4>所属组织</h4>
                            <div v-if="appear" style="min-height:40px">联泰潮英智慧水务</div>
                        </div>
                        <div class="form-li">
                            <!-- <h4>设备类型名称</h4> -->
                            <FormItem label="设备类型名称" label-position="top">
                                <Input v-model="tissueList.devicename" v-if="appear"></Input>
                            </FormItem>
                        </div>
                        <div class="form-li">
                            <!-- <h4>设备类型名称</h4> -->
                            <FormItem label="备注" label-position="top">
                                <Input v-model="tissueList.remark" v-if="appear"></Input>
                            </FormItem>
                        </div>
                        <div class="form-li">
                            <h4>默认图片</h4>
                            <div v-if="appear" style="min-height:40px">联泰潮英智慧水务</div>
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
                title: '联泰潮英智慧水务',
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
                                    display: data.is_show ? 'block' : 'none',
                                },
                                on: {
                                    click: () => { 
                                        this.newFun()
                                    }
                                }
                            },'新建')
                        ])
                    ]);
                },
                
            }],
            baseDataList: [{
                expand: true,    

                children: [
                 {
                    title: 'child 1-1',   
                },
                {
                    title: 'child 1-2',
                    
                }
                ]
            }],
            buttonProps: {
                type: 'default',
                size: 'small'
            },
            tissueList: {
                devicename:'',
                remark:''
            },
            appear: false,
            appearOther: false,
            listshow: true,
            height: 0,
            ruleValidate:{
            devicename: [
                { required: true, message: '请输入姓名', trigger: 'blur' }
            ],
            },
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
        renderContentList (h, { root, node, data }) {
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
                            marginRight: '4px',
                            fontSize:'13px',
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
                            marginRight: '4px',
                            fontSize:'13px',
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            // click: () => { this.remove(root, node, data) }
                        }
                    },'删除'),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary'
                        }),
                        style: {
                            fontSize:'13px',
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            // click: () => { this.remove(root, node, data) }
                        }
                    },'新建')
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
            self.listshow = false
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
            padding: 10px 0;
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
            button{
                padding:3px 15px;
                background: #576374;
                border: 0;
                float:right;
                color: #fff;
                font-size: 12px;
                margin: 0 5px;
                border-radius: 3px;
            }
        }
        .search-input{  
            padding: 2px;
            border-bottom: 1px solid #f0f0f0;
            input{
                width: 100%;
                border: 1px solid #eaeaea;
                padding: 0 24px 0 8px;
                color: #495060;
                font-size: 13px;
                 height: 28px;
            }
        }
        .title-main{
            padding-left: 10px;
            .org-tree{
                height: 33%;
                border-bottom: 1px solid #f0f0f0;
                li{
                    margin: 8px 0;
                }
            }
            .mg-drag-tree{
                height: 67%;
                overflow: hidden;
                .ivu-tree{
                    position: relative;
                    top: -30px;
                    left: -8px;
                }
            }
            /deep/.ivu-tree-title {
                    width: 100%;
            }
            /deep/.ivu-tree-arrow{
                width: 0;
                display: none;
            }
        }
        .tissue-left {
            width: 350px;
            background: #FFF;
            height: 100%;
            .tissue-list {
                width: 100%;
                padding: 0 10px;
                
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
                    font-size: 13px;
                    h4 {
                        height: 40px;
                        margin-top: 20px;
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