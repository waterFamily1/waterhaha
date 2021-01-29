<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="index-search" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>关键字：</label>
                    <Input v-model="searchParams.queryName" placeholder="盘点单号" style="width: 300px" />
                </div>
                <div class="form-item">
                    <label>所属组织：</label> 
                    <TreeSelect 
                        v-model="searchParams.orgId" 
                        multiple 
                        :data="orgList" 
                        :max-tag-count="2"
                        v-width="300" 
                    />
                </div>
                <div class="form-search-btn">
                    <a href="javascript:;" @click="higherSearch()">
                        <Icon type="ios-arrow-up" v-if="searchShow"/>
                        <Icon type="ios-arrow-down" v-else />
                        高级搜索
                    </a>
                    <Button @click="getTabel">搜索</Button>
                    <Button class="reset" @click="resetHandle()">重置</Button>
                </div>
            </div>
            <div class="c-adv-search">
                <div class="c-adv-search-row">
                    <div class="form-item" style="display: flex">
                        <label>审核状态：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="searchParams.auditedFlag">
                                <TagSelectOption name="1">已审核</TagSelectOption>
                                <TagSelectOption name="2">未审核</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                </div>
                 <div class="c-adv-search-row">
                    <div class="form-item" style="display: flex">
                        <label>盘点仓库：</label>
                        <Select v-model="searchParams.warehouseId" style="width: 200px;">
                            <Option v-for="item in depots" :value="item.id" :key="item.id">{{ item.warehouseName }} - {{item.warehouseNo}}</Option>
                        </Select>
                    </div>
                </div>

                <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>创建时间：</label>
                        <DatePicker 
                            type="date" 
                            placeholder="开始日期" 
                            style="width: 200px"
                            :options="startDate"
                            v-model="startTime"
                            format="yyyy-MM-dd"
                            @on-change="startTimeChange"
                        ></DatePicker> - 
                        <DatePicker 
                            type="date" 
                            placeholder="结束日期" 
                            style="width: 200px"
                            @on-change="endTimeChange" 
                            v-model="endTime"
                            format="yyyy-MM-dd"
                            :options="endDate"
                        ></DatePicker>
                    </div>
                </div>
            </div>
        </div>
        <div class="index-content">
            <div class="c-table-top-btns">
                <Button @click="linkToAdd()">盘点新增</Button>
            </div> 
            <div class="table-wrapper" :style="{height: (height-45)+'px'}">
                <Table stripe :columns="tableList" :data="listData" :loading="loading">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" size="small" @click="detailHandle(row.id)">查看</Button>
                        <Button class="action" size="small" v-if="row.auditedFlag == 0" @click="cancleHandle(row.id)">删除</Button>
                    </template>
                </Table>
                <Page 
                    :total="total" 
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
import { tableMethod, orgMethod, wareMethod, deleteMethod } from '@/api/store/check'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'
import { mapState } from 'vuex'

export default {
    name: 'checkManage',
    data() {
        var _self = this
        return {
            height: '',
            searchParams: {
                queryName: '',
                orgId: '',
                warehouseId: '',
                auditedFlag: [],
                startDate: '',
                endDate: '',
                pageSize: 10,
                currentPage: 1
            },
            orgList: [],
            depots: [],
            startTime: '',
            startDate: {},
            start: '',
            endTime: '',
            endDate: {},
            end: '',
            searchShow: false, 
            tableList: [
                {
                    title: '盘点单号',
                    key: 'materielInventoryNumber',
                    ellipsis: true
                }, {
                    title: '所属组织',
                    key: 'orgName',
                    ellipsis: true
                }, {
                    title: '仓库名称',
                    key: 'warehouseName',
                    ellipsis: true
                }, {
                    title: '盘点人员',
                    key: 'userName',
                    ellipsis: true
                }, {
                    title: '创建时间',
                    key: 'createDate',
                    width: 110,
                    render (h, data) {
                        return util.tableDatetime(h, data.row.createDate);
                    }
                }, {
                    title: '审核状态',
                    key: 'auditedFlag',
                    render(h,data) {
                        return h('span', _self.auditStateText[data.row.auditedFlag])
                    }
                }, {
                    title: '备注',
                    key: 'remark',
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
        }
    },
    computed: mapState({
        auditState: state => state.map.storage.inventory.auditState,
        auditStateText: state => state.map.storage.inventory.auditStateText,
    }),
    mounted() {
        this.height = document.body.clientHeight-130
        this.getTabel()
        this.getOrg()
        this.getWare()
    },
    methods: {
        getTabel() {
            this.loading = true
            let queryName = this.searchParams.queryName
            let orgId = this.searchParams.orgId
            let warehouseId = this.searchParams.warehouseId
            let auditedFlag = this.searchParams.auditedFlag
            let currentPage = this.searchParams.currentPage
            let startDate
            let endDate
            if(this.startTime == '') {
                startDate = ''
            } else {
                startDate = this.$moment(this.startTime).utc().format()
            }
            if(this.endTime == '') {
                endDate = ''
            } else {
                endDate = this.$moment(this.endTime).utc().format()
            }
            this.searchParams.startDate = startDate
            this.searchParams.endDate = endDate
            tableMethod({
                queryName,
                orgId,
                warehouseId,
                auditedFlag,
                startDate,
                endDate,
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
        getWare() {
            wareMethod().then(res=> {
                this.depots = res.data
            }).catch(err=> {

            })
        },
        startTimeChange(day) {
            this.start = day
            this.endDate = {
                disabledDate (date) {
                    return date && date.valueOf() <=new Date(day).getTime()- 86400000
                }
            }
        },
        endTimeChange(day) {
            this.end = day
            this.startDate = {
                disabledDate (date) {
                    return date && date.valueOf() >=new Date(day)
                }
            }
        },
        resetHandle() {
            this.searchParams = {
                queryName: '',
                orgId: '',
                warehouseId: '',
                auditedFlag: [],
                startDate: '',
                endDate: '',
                pageSize: 10,
                currentPage: 1
            }
        },
        detailHandle(id) {
            this.$router.push({
                path:'/childPage/checkDetail',
                query: {
                    id: id
                }
            })
        },
        cancleHandle(id) {
            this.$Modal.confirm({
                title: '删除',
                content: '确定要删除吗？',
                onOk: () => {
                    deleteMethod(id).then(res=> {
                        this.$Notice.success({title: '删除成功'})
                        this.getTabel()
                    })
                }
            })
        },
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        linkToAdd() {
            this.$router.push({
                path:'/childPage/checkAdd'
            })
        },
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
                margin: 10px 0;
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
                    /deep/.ivu-tag-text {
                        font-size: 14px;
                    }
                }
            }
        }
    }
    .searchTrans {
        height: 200px;
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