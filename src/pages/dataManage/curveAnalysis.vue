<template>
    <div class="tissue-box" :style="{height: height+'px'}">
        <div class="tissue-tree">
            <div class="tissue-left">
                <div class="search-input">
                    <input type="text" placeholder="输入组合/测点名称以检索">
                    <Dropdown style="margin-left: 10px;display:inline-block" trigger="click"  @on-click="changeItem">
                        <a href="javascript:void(0)">
                            曲线模版
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="choose">选择模板</DropdownItem>
                            <DropdownItem name="save">保存模板</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <group></group>
                <singledata></singledata>
            </div>
            <div class="tissue-right">
                <chartShow></chartShow>
                
            </div>
        </div>
        <Modal v-model="modal2" width="300">
            <p slot="header" style="color:#1c2438;font-size:14px;border-left:7px solid #4b7efe;background:#f8f9fb;height:39px;line-height:39px">
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <span class="rectangle"></span>
                <span style="margin-left:8px">添加曲线模版</span>
            </p>
            <div style="text-align:center">
                <input type="text" style="width:100%">
            </div>
            <div slot="footer" >
                <Button type="primary"  long  @click="save" style="font-size:12px">保存为新模版</Button>
            </div>
        </Modal>
         <Modal v-model="modal1" width="500" footer-hide>
            <p slot="header" style="color:#1c2438;font-size:14px;border-left:7px solid #4b7efe;background:#f8f9fb;height:39px;line-height:39px">
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <span class="rectangle"></span>
                <span style="margin-left:8px">选择曲线模版</span>
            </p>
            <div class="choose-modal">
                <input type="text" style="width:200px;color:#495060;font-size:13px;padding:4px 7px;border:1px solid #eaeaea" placeholder="模版名称">
                <div  style="display:inline-block;height: 28px;border: 0;padding: 4px 7px;background:#eee;border-top-right-radius:3px;border-bottom-right-radius:3px;">
                    <Icon type="ios-search-outline" />
                </div>
                <Table stripe :columns="tableList">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" size="small" style="margin-right: 5px;">选择</Button>
                        <Button class="action" size="small">删除</Button>
                    </template>
                </Table>
                 <Page :total="100" show-elevator show-total size="small" class="page" style="text-align:right;margin-top:20px"  />
            </div>
          
        </Modal>
    </div>
    
</template>
<script>
import group from './analyze/datagroup'
import singledata from './analyze/singleData'
import chartShow from './analyze/chartShow'

export default {
    name: 'curveAnalysis',
    data () {
        return {
            height:0,
           modal2:false,
           modal1:false,
            tableList: [
                {
                    title: '模版名称',
                    key: 'location'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ]
        }
    },
    components: {
        group,
        singledata,
        chartShow
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
        changeItem(name){
            console.log(name)
            if(name=='save'){
              this.modal2 = true
            }else{
                this.modal1 =true
            }
        },
        save(){

        }
        
    }
}
</script>
<style lang="less" scoped>
 /deep/.ivu-modal-header{
        padding: 0;
        border-bottom: 0;
    }
    
.tissue-box {
    margin-top: 5px;
   
    .choose-modal{
        height: 28px;
    }
    input::-webkit-input-placeholder{
        color:#999;
    }
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