<template>
    <div class="tissue-box" :style="{height: height+'px'}">
        <div class="tissue-tree">
            <div class="tissue-left">
                <div class="search-input">
                    <input type="text" placeholder="输入组合/测点名称以检索">
                    <Dropdown style="margin-left: 10px;display:inline-block" trigger="click" :on-click="changeItem(el)">
                        <a href="javascript:void(0)">
                            曲线模版
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem>选择模板</DropdownItem>
                            <DropdownItem>保存模板</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                
            </div>
            <div class="tissue-right">
                右边
                
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'tissueInfor',
    data () {
        return {
           
            
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
            
        },
        changeItem(e){
            console.log(e)
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
        .search-input{   
            padding: 2px;
            border-bottom: 1px solid #f0f0f0;
            input{
                width: 195px;
                border: 1px solid #eaeaea;
                padding: 0 24px 0 8px;
                color: #495060;
                font-size: 13px;
                 height: 28px;
                 vertical-align: middle;
            }
            a{
                font-size:12px;
                height:28px;
                line-height: 28px;
                background:#576374;
                color: #fff;
                margin-left: 5px;
                vertical-align: middle;
                display: inline-block;
                padding: 0 10px;
                border-radius: 3px;
            }
        }
        
        .tissue-left {
            width: 300px;
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