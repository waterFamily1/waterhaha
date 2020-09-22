<template>
    <div class="document-box" :style="{height: height+'px'}">
        <div class="c-tree-left">
            <div class="c-plain-bg-h">
                <h3>标签中心</h3>  
            </div>
            <div class="serach-box">
                <Input v-model="value" placeholder="输入标签名称以检索" style="width: 100%" />
            </div>
            <div class="z-tree">
                <Tree :data="data1" :render="renderContent"></Tree>
            </div>
        </div>
        <div class="c-tree-right">
            <div class="c-main-border">
                <div class="c-left-border-blue">
                    <div class="c-plain-bg-h">
                        <h3>标签信息</h3>  
                    </div>
                    <div class="action-btn" v-if="appear">
                        <button>保存</button>
                        <button class="reset">取消</button>
                    </div>
                </div>
                <div class="base-org-detail" v-if="appear">
                    <Form>
                        <div class="form-line">
                            <h4>当前标签</h4>
                            <div class="base-org-border"> 
                               <Input v-model="value" style="width: 300px" />
                            </div>
                        </div>
                        <div class="form-line">
                            <h4>当前类别</h4>
                            <div class="base-org-border"> 
                                <Input v-model="value" placeholder="管理制度" style="width: 300px" disabled />
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
    name:'tagManage',
    data (){
        return {
            height:'',
            value:'',
            tableList: [
                {
                    type: 'selection',
                    width: 50,
                    align: 'center'
                },
                {
                    title: '文档名称',
                    key: 'name'
                },
                {
                    title: '文档路径',
                    key: 'path'
                },
                {
                    title: '文档标签',
                    key: 'tags'
                },
                {
                    title: '文档大小',
                    key: 'small'
                },
                {
                    title: '上传人员',
                    key: 'person'
                },
                {
                    title: '上传时间',
                    key: 'time'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            data1: [{
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
                                    type: 'primary',
                                    size:'small'
                                }),
                                style: {
                                    display: data.is_show ? 'block' : 'none'
                                },
                                on: {
                                    click: () => { 
                                        
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
            appear:false
        }
    },

    methods:{
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
                            type: 'primary',
                            size:'small'
                        }),
                        style: {
                            marginRight: '4px',
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            // click: () => { this.append(data) }
                        }
                    },'新建'),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size:'small'
                        }),
                        style: {
                            marginRight: '4px',
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            click: () => { 
                                this.newFun()
                             }
                        }
                    },'编辑'),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size:'small'
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
    },
     mounted() {
        this.height = document.body.clientHeight-46
    },

}
</script>
<style lang="less" scoped>
.document-box{
    display: flex;
    min-height: 100%;
    .c-tree-left{
        width: 350px;
        background-color: #FFF;
        border-top: 3px solid #f0f0f0;
        .c-plain-bg-h{
            border-bottom: 1px solid #f0f0f0;
            height: 50px;
            padding: 10px 0 10px 10px;
            h3{
                font-size: 14px;
            } 
        }
        .serach-box{
            padding: 2px;
            /deep/.ivu-input{
                height: 28px;
                line-height: 28px;
                padding: 0 24px 0 8px;
                font-size: 13px;
                outline: none;
                box-sizing: border-box;
                color: #495060;
                background-color: transparent;
                position: relative;
                cursor: pointer;
            }
        }
        .z-tree{
            padding-left: 10px;
            /deep/.ivu-icon{
                color: #4b7efe;
            }
            /deep/.ivu-tree-title{
                width: 93%;
            }
        }
    }
    .c-tree-right{
        flex: 1;
        .c-main-border{
            border: 5px solid #f0f0f0;
            min-height: 100%;
            width: 100%;
            background: #fff;
            .c-left-border-blue{
                border-radius: 3px;
                height: 50px;
                font-size: 13px;
                border-bottom: 1px solid #f0f0f0;
                display: flex;
                justify-content: space-between;
                align-items:  center;
               .c-plain-bg-h{
                    
                    height: 50px;
                    padding: 10px 0 10px 10px;
                    display: inline-block;
                    h3{
                        font-size: 14px;
                    } 
                }
                .action-btn{
                    button{
                        background: #4b7efe;
                        font-size: 12px;
                        padding: 4px 12px;
                        color: #fff;
                        border: 0;
                        border-radius: 3px;
                        margin: 0 5px;
                        min-width: 70px;
                    }
                    .reset{
                        background: #c8c8c8;
                    }
                }
            }
            .base-org-detail{
                padding: 20px 50px;
                .form-line{
                    margin-bottom: 20px;
                    h4{
                        height: 30px;
                        margin-top: 10px;
                        font-size: 13px;
                    }
                    .base-org-border{
                        border-bottom: 1px dashed #f0f0f0;
                        padding-bottom: 10px;
                    }
                }
            }
        }
    }
}
</style>