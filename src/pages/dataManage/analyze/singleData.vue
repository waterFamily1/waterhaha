<template>
  <div>
       <div class="title">
            <div style="display:inline-block">
                <span>单数据</span>
                <a href="javascript:;" @click="higherSearch()"  >
                    <Icon type="ios-arrow-down" v-if="searchShow" />
                    <Icon type="ios-arrow-up" v-else />
                </a>
            </div>
            <Icon type="ios-add-circle" style="color:rgb(162, 162, 162);font-size:20px;float:right;margin-top:10px" @click="add()" />
        </div>
        <div class="con">
            <Tree :data="datatree" :render="renderContent" class="demo-tree-render" v-if="searchShow"></Tree>
        </div>
        <Modal v-model="modal" width="600" class="model-box"> 
            <p slot="header" style="color:#1c2438;font-size:14px;border-left:7px solid #4b7efe;background:#f8f9fb;height:39px;line-height:39px">
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <span class="rectangle"></span>
                <span style="margin-left:8px">添加数据组合</span>
            </p>
            <div>
                <div>
                    <div class="key-item">
                        <label>关键字：</label>
                        <Input  placeholder="用户名称/手机号" size="small" style="width: 150px" />
                    </div>
                    <div class="key-item">
                        <label>区域位置：</label>
                        <Select v-model="tissue" style="width:180px" size="small">
                            <Option v-for="item in tissueList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                    <div class="search-btn">
                        <Button size="small">搜索</Button>
                        <Button size="small" class="reset">重置</Button>
                    </div>
                    
                </div>
                <div class="tabel-num">
                        已选择<strong>{{ selectedData.length }}</strong>个
                        <a href="" @click="handleClearSelect(false)">[清空]</a>
                    </div>
                     <div class="model-table">
                    <Table size="small" ref="selection" :columns="modelColumns" :data="modelData"
                        @on-select="handleSelect"
                        @on-select-cancel="handleSelectCancel"
                        @on-select-all="handleSelectAll"
                        @on-select-all-cancel="handleSelectAllCancel">
                    </Table>
                    <Page :total="100" show-elevator size="small" class="page" style="text-align:right;margin-top:20px"  />
                     <div class="action-btn">
                        <span>取消</span>
                        <span style="background: #4b7efe;">确定</span>
                     </div>
                </div>
            </div>
            <div slot="footer" >
                <!-- <Button type="primary"  long  @click="save" style="font-size:12px">保存为新模版</Button> -->
            </div>
        </Modal>
  </div>
</template>    
<script>
export default {
    name: 'singleData',
    data(){
        return{
           searchShow:true, 
           modal:false,
           tissueList: [
                {
                    value: 'New York',
                    label: 'New York'
                }
            ],
            modelColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '测点编号',
                    key: 'number'
                },
                {
                    title: '区域位置',
                    key: 'location'
                },
                {
                    title: '测点名称',
                    key: 'name'
                }
            ],
            modelData: [
                {
                    number: '吴镕譞0',
                    location: '技术部0',
                    name: '易烊千玺老婆团'
                },
                {
                    number: '吴镕譞1',
                    location: '技术部1',
                    name: '易烊千玺老婆团'
                },
                {
                    number: '吴镕譞2',
                    location: '技术部2',
                    name: '易烊千玺老婆团'
                }
            ],
            selectedData: [],
            datatree: [{
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
                        })
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
        }
    },
    methods:{
        higherSearch(){
                    this.searchShow=!this.searchShow
        },
         add(){
            this.modal=true
        },
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
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            // click: () => { this.remove(root, node, data) }
                        }
                    },'删除')
                ])
            ]);
        },
    }
}
</script>
<style lang="less" scoped>
/deep/.ivu-modal-header{
    padding: 0;
    border-bottom: 0;
}
.title{
    height: 40px;
    line-height: 40px;
    background: #F4F4F4;
    padding: 0 10px;
    a{
         color:#333;
    }
}
.demo-tree-render .ivu-tree-title{
    width: 100%;
}
/deep/.ivu-tree-title {
    width: 93%;
}
.search-item{
    font-size: 12px;
    height: 40px;
    input::-webkit-input-placeholder{
        color:#999;
        font-size: 13px;
    }
    label{
        font-size: 12px;
    }
}
.key-item{
    display: inline-block;
    label{
        font-size: 12px;
    }
}
.search-btn{
    display: inline-block;
    /deep/.ivu-btn {
        height: auto;
        font-size: 12px;
        background: #838A95;
        color: #fff;
        margin-right: 10px;
        border-radius: 1px;
        padding: 4px 12px;
    }
    .reset {
        background: #aaafb8;
    }
}
.tabel-num {
    text-align: right;
    font-size: 12px;
    color: #999;
    line-height: 30px;
    margin-top: 10px;
    /deep/.ivu-btn {
        font-size: 12px;
        background: #57a3f3;
        color: #fff;
    }
}
.action-btn{
    margin-top: 20px;
    text-align:center;
    span{
        display: inline-block;
        min-width: 130px;
        margin: 0 15px;
        padding: 4px 12px;
        font-size: 12px;
        background: #c8c8c8;
        color: #fff;
        border-radius: 3px;
    }
}
</style>