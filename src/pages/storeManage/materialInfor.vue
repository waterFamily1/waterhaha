<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="index-search" >
            <div class="search-main">
                <div class="form-item">
                    <label>关键字：</label>
                    <Input v-model="searchParams.queryName" placeholder="仓库名称或仓库编号" style="width: 200px" />
                </div>
                <div class="form-item">
                    <label>所属组织：</label> 
                    <TreeSelect 
                        v-model="searchParams.orgIds" 
                        :data="orgList" 
                        v-width="200" 
                        @on-change="orgChange"
                    />
                </div>
                <div class="form-item">
                    <label>物料类别：</label> 
                    <Select v-model="searchParams.materielCategoryId" style="width:200px">
                        <Option v-for="item in materielCategoryArr" :value="item.id" :key="item.id">{{ item.categoryName }}</Option>
                    </Select>
                </div>
                <div class="form-search-btn">
                    <Button @click="search">搜索</Button>
                    <Button class="reset" @click="searchParamsClean">重置</Button>
                </div>
            </div>
        </div>
        <div class="index-content">
            <div class="c-table-top-btns">
                <Button @click="toAddMaterial()">物料新增</Button>
                <Button @click="infoExport()">信息导出</Button>
                <Button @click="toInfoImport()">信息导入</Button>
            </div> 
            <div class="table-wrapper" :style="{height: (height-45)+'px'}">
                <Table stripe :columns="tableList" :data="listData" :loading="loading">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" size="small" @click="checkHandle(row.id)">查看</Button>
                        <Button class="action" size="small" @click="delHandle(row.id)">删除</Button>
                    </template>
                </Table>
                <Page 
                    :total="total" 
                    :page-size="searchParams.pageSize" 
                    :current="searchParams.currentPage" 
                    show-total 
                    show-elevator 
                    @on-change="pageChange"
                    class="page" 
                />
            </div>
        </div>
    </div>
</template>
<script>
import { tableMethod, orgMethod, materielMethod, deleteMethod } from '@/api/store/materialInfor'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'
import { mapState } from 'vuex'

export default {
    name: 'materialInfor',
    data() {
        return {
            height: '',
            searchParams: {
                queryName: '',
                orgIds: '',
                materielCategoryId: '',
                pageSize: 10,
                currentPage: 1
            },
            orgList: [],
            materielCategoryArr: [],
            tableList: [
                {
                    title: '物料编号',
                    key: 'materielNumber',
                    width: 200,
                    ellipsis: true
                }, {
                    title: '所属组织',
                    key: 'orgName',
                    width: 200,
                    ellipsis: true
                }, {
                    title: '物料名称',
                    key: 'materielName',
                    ellipsis: true
                }, {
                    title: '物料类别',
                    key: 'categoryName',
                    ellipsis: true
                }, {
                    title: 'ABC分类',
                    key: 'abc',
                    ellipsis: true
                }, {
                    title: '品牌',
                    key: 'brand',
                    ellipsis: true
                }, {
                    title: '型号',
                    key: 'model',
                    ellipsis: true
                }, {
                    title: '规格',
                    key: 'standard',
                    ellipsis: true
                }, {
                    title: '计量单位',
                    key: 'unmeasurementUnitit',
                    width: 90,
                    ellipsis: true
                }, {
                    title: '操作',
                    slot: 'action',
                    width: 120,
                    align: 'center'
                }
            ],
            listData: [],
            loading: false,
            total: 0
        }
    },
    mounted() {
        this.height = document.body.clientHeight-130
        this.getOrg()
        this.getTable()
    },
    methods: {
        getTable() {
            this.loading = true
            let queryName = this.searchParams.queryName
            let orgIds = this.searchParams.orgIds
            let materielCategoryId = this.searchParams.materielCategoryId
            let currentPage = this.searchParams.currentPage
            tableMethod({
                queryName,
                orgIds,
                materielCategoryId,
                currentPage
            }).then(res=> {
                this.listData = res.data.items
                this.total = res.data.total
                this.loading = false
            })
        },
        pageChange(num) {
            this.searchParams.currentPage = num
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
        orgChange(id) {
            this.materielCategoryArr = []
            this.searchParams.materielCategoryId = ''

            materielMethod(id).then(res=> {
                this.materielCategoryArr = res.data
            })
        },
        search() {
            this.searchParams.currentPage = 1
            this.getTable()
        },
        searchParamsClean() {
            this.materielCategoryArr = []
            const defaultParams = {
                queryName: '',
                orgIds: '',
                materielCategoryId:'',
                pageSize: 10,
                currentPage: 1
            }
            this.searchParams = Object.assign({}, this.searchParams, defaultParams);
        },
        delHandle(id) {
            this.$Modal.confirm({
                title:'确认删除',
                content:'是否确认删除物料信息',
                onOk:()=>{
                    deleteMethod(id).then(res => {
                        this.$Notice.success({
                            title: '成功',
                            desc: '删除物料信息成功！'
                        })
                        this.getTable()
                    })
                }
            })
        },
        checkHandle(id) {
            this.$router.push({
                path: '/childPage/materialDetail',
                query: { 
                    id: id
                }
            });
        },
        toAddMaterial() {
            this.$router.push({
                path:'/childPage/materialAdd'
            })
        },
        toInfoImport(){
             this.$router.push({
                path:'/other/areaUpload',
                query: {
                    uploadName: '物料导入'
                }
            })
        },
        infoExport(){
            util.download('/inventory/api/materiels/excel-export', this.searchParams)
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
                .ivu-btn {
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
        .c-adv-search {
            margin-top: 10px;
            padding-top: 5px;
            border-top: 1px solid #ececec;
            .c-adv-search-row {
                margin: 5px 0;
                .form-item {
                    display: inline-block;
                    height: 33px;
                    label {
                        display: inline-block;
                        width: 100px;
                        line-height: 35px;
                        text-align: right;
                        color: #576374;
                    }
                }
                .cmp-tab {
                    display: inline-block;
                    a {
                        margin-right: 20px;
                        color: #576374;
                    }
                    .checked {
                        color: #4B7EFE;
                    }
                }
            }
        }
    }
    .searchTrans {
        height: 220px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .searchPack {
        height: 43px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .index-content {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .c-table-top-btns {
            height: 36px;
            border-bottom: 1px solid #EEE;
            .ivu-btn {
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
</style>