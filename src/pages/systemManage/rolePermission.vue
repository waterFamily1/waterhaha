<template>
    <div class="role-box" :style="{height: height+'px'}">
        <div class="role-main">
            <div class="role-left">
                <h3>角色</h3>
                <div class="left-tree ivu-p-8">
                    <Tree :data="baseData" :render="renderContent" class="demo-tree-render"></Tree>
                </div>
            </div>
            <div class="role-right">
                <div class="right-title">
                    <h3>权限设置</h3>
                    <Button type="primary">提交</Button>
                </div>
                <div class="right-box">
                    <div class="user-box">
                        <role-user></role-user>
                    </div>
                    <div class="tab-box">
                        <tab-user></tab-user>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import roleUser from './role/user'
import tabUser from './role/tab'

export default {
    name: 'rolePermission',
    data() {
        return {
            height: '',
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
            }
        }
    },
    components: {
        roleUser,
        tabUser
    },
    mounted() {
        this.height = document.body.clientHeight-80
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
        }
    }
}
</script>
<style lang="less" scoped>
.role-box {
    margin: 5px;
    background: #fff;
    .role-main {
        width: 100%;
        height: 100%;
        display: flex;
        .role-left {
            width: 350px;
            h3 {
                border-bottom: 1px solid #f0f0f0;
                height: 40px;
                line-height: 40px;
                text-indent: 10px;
            }
            .left-tree {
                /deep/.ivu-tree-title {
                    width: 100%;
                }
            }
        }
        .role-right {
            flex: 1;
            border-left: 5px solid #f0f0f0;
            min-height: 100%;
            width: 100%;
            .right-title {
                padding: 5px;
                h3 {
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                    text-indent: 10px;
                }
                /deep/.ivu-btn {
                    float: right;
                    min-width: 70px;
                    margin: 0 5px;
                    height: 28px;
                }
            }
            .right-box {
                border-top: 5px solid #f0f0f0;
                display: flex;
                height: 100%;
                .user-box {
                    width: 49%;
                }
                .tab-box {
                    width: 50%;
                    float: right;
                    border-left: 5px solid #f0f0f0;
                }
            }
        }
    }
}
</style>