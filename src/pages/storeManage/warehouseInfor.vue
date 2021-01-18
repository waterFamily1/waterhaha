<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="index-search" >
            <div class="search-main">
                <div class="form-item">
                    <label>关键字：</label>
                    <Input v-model="searchParams.queryName" placeholder="仓库名称或仓库编号" style="width: 300px" />
                </div>
                <div class="form-item">
                    <label>所属组织：</label> 
                    <TreeSelect 
                        v-model="searchParams.orgIds" 
                        multiple 
                        :data="orgList" 
                        :max-tag-count="2"
                        v-width="300" 
                    />
                </div>
                <div class="form-search-btn">
                    <Button @click="search">搜索</Button>
                    <Button class="reset" @click="searchParamsClean">重置</Button>
                </div>
            </div>
        </div>
        <div class="index-content">
            <div class="c-table-top-btns">
                <Button @click="add()">仓库新增</Button>
                <Button @click="msgExport()">信息导出</Button>
            </div> 
            <div class="table-wrapper" :style="{height: (height-45)+'px'}">
                <Table stripe :columns="tableList" :data="listData" :loading="loading">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" size="small" @click="detailHandle(row.id)">查看</Button>
                        <Button class="action" size="small" @click="cancleHandle(row.id)">删除</Button>
                    </template>
                </Table>
                <Page :total="total" :page-size="searchParams.pageSize" :current="searchParams.currentPage" class="page" show-total show-elevator @on-change="pageChange"></Page>
            </div>
        </div>
         
    </div>
</template>
<script>
import { tableMethod, orgMethod, deleteMethod } from '@/api/store/ware'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'
import { mapState } from 'vuex'

export default {
    name: 'warehouseInfor',
    data() {
        return {
            height: '',
            searchParams: {
                queryName: '',
                orgIds: '',
                pageSize: 10,
                currentPage: 1
            },
            orgList: [],
            tableList: [
                {
                    title: '仓库编号',
                    key: 'no',
                    ellipsis: true
                }, {
                    title: '所属组织',
                    key: 'orgName',
                    ellipsis: true
                }, {
                    title: '仓库名称',
                    key: 'name',
                    ellipsis: true
                }, {
                    title: '仓库地址',
                    key: 'address',
                    ellipsis: true
                }, {
                    title: '负责人',
                    key: 'personInChargeName',
                    ellipsis: true
                }, {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            listData: [],
            loading: false,
            total: 0,
            modal:false
        }
    },
    mounted() {
        this.height = document.body.clientHeight-130
        this.getTable()
        this.getOrg()
    },
    methods: {
        getTable() {
            this.loading = true
            let queryName = this.searchParams.queryName
            let orgIds = this.searchParams.orgIds
            let currentPage = this.searchParams.currentPage
            tableMethod({
                queryName,
                orgIds,
                currentPage
            }).then(res=> {
                this.listData = res.data.items
                this.total = res.data.total
                this.loading = false
            })
        },
        pageChange(index) {
            this.searchParams.currentPage = index
            this.getTable()
        },
        search() {
            this.searchParams.currentPage = 1
            this.getTable()
        },
        getOrg() {
            orgMethod().then(res=> {
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    treeItem.push(trees[i])
                }
                this.orgList = createTree(treeItem, 0)
            }).catch(err=> {

            })
        },
        searchParamsClean() {
            const defaultParams = {
                queryName: '',
                orgIds: '',
                pageSize: 10,
                currentPage: 1
            };
            this.searchParams = Object.assign({}, this.searchParams, defaultParams);
        },      
        detailHandle(id) {
            this.$router.push({
                path: '/childPage/warehouseDetail',
                query: { id: id }
            })
        },
        cancleHandle(id) {
            this.$Modal.confirm({
                title:'确认删除',
                content:'是否确认删除仓库信息',
                onOk:()=>{
                    deleteMethod(id).then(res => {
                        this.$Notice.success({
                            title: '成功',
                            desc: '删除仓库信息成功！'
                        });
                        this.getTable()
                    })
                }
            })
        },
        add() {
            this.$router.push({
                path:'/childPage/warehouseAdd'
            })
        },
        msgExport() {
            util.download('inventory/api/warehouse/excel-export', this.searchParams)
        }
    }
}
</script>
<style lang="less" scoped>
.index-box {
    margin: 5px;
    background: #fff;
    .index-search {
        padding: 5px;
        height: 43px;
        .search-main {
            height: 33px;
            .form-item {
                display: inline-block;
                min-height: 33px;
                label {
                    display: inline-block;
                    width: 100px;
                    line-height: 35px;
                    text-align: right;
                    color: #576374;
                }
            }
            .form-search-btn {
                float: right;
                margin-top: 4px;
                a {
                    margin: 0 10px 0 0;
                    color: #576374;
                    font-size: 12px;
                }
                .ivu-btn{
                    height: auto;
                    background: #4b7efe;
                    font-size: 12px;
                    padding: 4px 12px;
                    color: #fff;
                    border: 0;
                    border-radius: 3px;
                    margin: 0 5px;

                }
                .reset{
                    background: #495566;
                }
            }
        }
    }
    .index-content {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .c-table-top-btns {
            height: 36px;
            border-bottom: 1px solid #EEE;
            .ivu-btn{
                height: auto;
                min-width: 50px;
                background: #576374;
                font-size: 12px;
                padding: 4px 12px;
                color: #fff;
                border: 0;
                border-radius: 3px;
                margin-right: 10px;
            }
        }
        .table-wrapper{
            .action{
                color:rgb(75, 126, 254);
                border:0;
                font-size:12px;
                background:transparent
            }
            .page{
                text-align: right;
                margin-top: 10px;
            }
        }
    }
}
/deep/.ivu-modal-header{
    padding: 0;
    border-bottom: 0;
}
.model-table{
    margin-top: 20px;
    .form-line{
        margin-bottom: 30px;
        label{
            display: inline-block;
            width:100px;
            text-align: right;
            font-size: 12px;
        }
    }
    .btn-group{
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
}
/deep/.ivu-tag .ivu-icon-ios-close {
    display: none;
}
/deep/.ivu-select-multiple .ivu-tag span:not(.ivu-select-max-tag) {
    margin: 0;
}
</style>