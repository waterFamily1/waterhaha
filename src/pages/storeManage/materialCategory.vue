<template>
    <div class="tissue-box" :style="{height: height+'px'}">
        <div class="tissue-tree">
            <div class="tissue-left">
                <div class="tissue-title">
                    <h3>物料类别管理</h3>
                </div>
                <div class="search-input">
                    <Select
                        v-model="queryName"
                        filterable
                        :clearable="true"
                        placeholder="输入物料类别以检索"
                        @on-change="searchChange"
                        :remote-method="remoteMethod"
                        :loading="searchLoading">
                        <Option v-for="(option, index) in searchOptions" :value="Math.abs(option.id)" :key="index">{{option.name}}</Option>
                    </Select>
                </div>
                <div class="title-main" >
                    <div class="org-tree">
                        <Tree :data="treeData" :render="renderContent" class="demo-tree-render"></Tree>
                    </div>
                </div>
            </div>
            <div class="tissue-right">
                <div class="tissue-title">
                    <h3>物料类别信息</h3> 
                    <span v-if="status != 'info'">
                        <Button type="primary" style="background:#4b7efe" :loading="loading" @click="save()">保存</Button>
                        <Button @click="cancel()" style="background:#c8c8c8">取消</Button>
                    </span>
                </div>
                <div class="tissue-content">
                    <Form ref="materialForm" :model="params" :rules="rules" label-position="right" autocomplete="off">
                        <div class="form-li">
                            <h4>所属组织</h4>
                            <div style="min-height:40px">{{ params.orgName }}</div>
                        </div>
                        <div class="form-li" v-if="status != 'add'">
                            <h4>类别编码：</h4>
                            <div>{{ params.categoryNumber }}</div>
                        </div>
                        <div class="form-li">
                            <FormItem 
                                label="类别名称：" 
                                label-position="top" 
                                prop="categoryName" 
                                v-if="status == 'add' || status == 'edit'"
                            >
                                <Input v-model="params.categoryName"></Input>
                            </FormItem>
                            <div v-if="status == 'info'">
                                <h4>类别名称：</h4>
                                <div>{{ params.categoryName }}</div>
                            </div>
                        </div>
                        <div class="form-li">
                            <h4>上级类别：</h4>
                            <div 
                                v-if="status == 'add' || status == 'edit'" 
                                style="min-height:40px"
                            >{{ params.parentName }}</div>
                        </div>
                        <div class="form-li">
                            <FormItem 
                                label="备注：" 
                                label-position="top" 
                                v-if="status == 'add' || status == 'edit'"
                            >
                                <Input v-model="params.remark" type="textarea"></Input>
                            </FormItem>
                            <div v-if="status == 'info'">
                                <h4>上级类别：</h4>
                                <div>{{ params.remark }}</div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { treeMethod, saveMethod, removeMethod, searchMethod } from '@/api/store/cate'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'
import { mapState } from 'vuex'
var _NOOP = function() {}

export default {
    name: 'materialCategory',
    data () {
        return {
            treeData: [],
            status: 'info',
            buttonProps: {
                type: 'default',
                size: 'small'
            },
            params: {
        		categoryName: '',
                categoryNumber: '',
				id: '',
				orgId: 0,
                orgName: '',
                parentName: '',
				parentId: '',
                remark: ''
        	},
        	rules: {
        		categoryName: [{ required: true, message: '请输入类别名称', trigger: 'blur' }]
            },
            loading: false,
            data: {},
            height: 0,
            queryName: '',
            searchLoading: false,
            searchOptions: [],
            trees: []
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getTree()
    },
    methods: {
        remoteMethod(query) {
            if(query != '') {
                this.searchLoading = true
                searchMethod(query).then(res=> {
                    this.searchLoading = false
                    this.searchOptions = res.data
                })
            } else {
                this.searchOptions = []
            }
        },
        searchChange(id) {
            this.trees.map(item=> {
                if(Math.abs(item.id) == id) {
                    this.show(item)
                }
            })
        },  
        getTree() {
            treeMethod().then(res=> {
                let treeItem = []
                let trees = res.data
                this.trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].expand = true
                    treeItem.push(trees[i])
                }
                this.treeData = createTree(treeItem,0)
            })
        },
        renderContent (h, { root, node, data }) {
            var self = this
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                },
                on: {
                    //鼠标进入
                    mouseover: () => {
                        this.$set(data,'is_show', true)
                    },
                    //鼠标离开
                    mouseout: () => {
                        this.$set(data,'is_show', false)
                    }
                }
            }, [
                h('span', [
                    h('span', {
                        on: {
                            'click':()=> {
                                if(data.type == 20) {
                                    this.show(data)
                                }
                            }
                        }
                    },data.title),
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
                            fontSize:'12px',
                            height: '18px',
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            click: () => { this.addNew(data) }
                        }
                    },'新建'),
                    (data.type == 20) && h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary'
                        }),
                        style: {
                            marginRight: '4px',
                            fontSize:'12px',
                            height: '18px',
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            click: () => { this.edit(data) }
                        }
                    },'编辑'),
                    (data.type == 20) && h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary'
                        }),
                        style: {
                            fontSize:'12px',
                            height: '18px',
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            click: () => { this.remove(data) }
                        }
                    },'删除')
                ])
            ]);
        },
        addNew(data) {
            this.data = data
            this.status = 'add'
            this.params.orgName = data.orgName
            this.params.orgId = data.id
            this.params.parentName = '无'
            this.params.remark = ''
            this.params.categoryNumber = ''
            this.params.categoryName = ''
            this.params.id = ''
        },
        save() {
            this.loading = true
            let orgName = this.this.params.orgName
            this.$refs['materialForm'].validate((valid) => {
                if(valid) {
                    saveMethod(this.params).then(res=> {
                        this.$Notice.success({title: '操作成功！'})
                        this.getTree()
                        this.loading = false
                        this.status = 'info'
                        this.params = res.data
                        this.params.orgName = orgName
                    }).catch((res)=>{
                        this.loading = false
                    })
                }
            })
        },
        edit(data) {
            this.data = data
            this.status = 'edit'
            this.params.orgName = data.orgName
            this.params.orgId = data.id
            this.params.parentName = '无'
            this.params.categoryNumber = data.no
            this.params.remark = data.remark
            this.params.categoryName = data.name
            this.params.id = Math.abs(data.id)
        },
        remove(data) {
            let id = Math.abs(data.id)
            this.$Modal.confirm({
                title: '你确定要删除吗？',
                onOk: () => {
                    removeMethod(id).then(res=> {
                        this.$Notice.success({title: '删除成功！'})
                        this.getTree()
                    })
                },
                onCancel: () => {

                }
            });
        },
        show(data) {
            this.data = data
            this.status = 'info'
            this.params.orgName = data.orgName
            this.params.orgId = data.id
            this.params.parentName = '无'
            this.params.categoryNumber = data.no
            this.params.remark = data.remark
            this.params.categoryName = data.name
            this.params.id = Math.abs(data.id)
        },
        cancel() {
            this.status = 'info'
            if(this.data.type == 20) {
                this.params.orgName = this.data.orgName
                this.params.orgId = this.data.id
                this.params.parentName = '无'
                this.params.categoryNumber = this.data.no
                this.params.remark = this.data.remark
                this.params.categoryName = this.data.name
                this.params.id = Math.abs(this.data.id)
            } else {
                this.params.orgName = ''
                this.params.orgId = 0
                this.params.parentName = '无'
                this.params.categoryNumber = ''
                this.params.remark = ''
                this.params.categoryName = this.data.name
                this.params.id = ''
            }
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
            .ivu-btn {
                height: auto;
                font-size: 12px;
                color: #fff;
                padding: 4px 12px;
                min-width: 70px;
                margin: 0 5px;
            }
        }
        .search-input{  
            padding: 12px 14px;
            border-bottom: 1px solid #f0f0f0;
            input {
                width: 100%;
                border: 1px solid #eaeaea;
                padding: 0 24px 0 8px;
                color: #495060;
                font-size: 13px;
                 height: 28px;
            }
        }
        .title-main{
            padding: 10px 0px 10px 20px;
            .org-tree{
                li{
                    margin: 8px 0;
                }
            }
            /deep/.ivu-tree-title {
                    width: 95%;
            }
            /deep/.ivu-tree-arrow{
                width: 10px;
            }
            /deep/.ivu-btn-small {
                height: 22px;
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
                padding: 20px 50px 20px 10px;
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
/deep/.ivu-form .ivu-form-item-label{
    font-size: 13px;
    font-weight: bold;
    margin-top: 10px;
}
</style>