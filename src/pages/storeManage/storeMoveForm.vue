<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="index-search" >
            <div class="search-main">
                <div class="form-item">
                    <label>所属组织：</label> 
                    <TreeSelect 
                        v-model="searchParams.orgId" 
                        :data="orgList" 
                        @on-change="orgChange"
                        v-width="200" 
                    />
                </div>
                <div class="form-item">
                    <label>仓库名称：</label> 
                    <Select v-model="searchParams.warehouseNo" style="width:150px">
					    <Option v-for="item in warehouseCombo" :value="item.warehouseNo" :key="item.warehouseNo">{{ item.warehouseName }}</Option>
					</Select>
                </div>
                <div class="form-item">
                    <label>查询时间：</label> 
                    <DatePicker 
                        type="date" 
                        placeholder="开始日期" 
                        style="width: 130px"
                        :options="startDate"
                        v-model="startTime"
                        format="yyyy-MM-dd"
                        @on-change="startTimeChange"
                    ></DatePicker> - 
                    <DatePicker 
                        type="date" 
                        placeholder="结束日期" 
                        style="width: 130px"
                        @on-change="endTimeChange" 
                        v-model="endTime"
                        format="yyyy-MM-dd"
                        :options="endDate"
                    ></DatePicker>
                </div>
                <div class="form-search-btn">
                    <Button @click="search">搜索</Button>
                    <Button class="reset" @click="searchParamsClean">重置</Button>
                </div>
            </div>
        </div>
        <div class="index-content">
            <div class="c-table-top-btns">
                <Button @click="msgExport()">信息导出</Button>
            </div> 
            <div class="table-wrapper" :style="{height: (height-45)+'px'}">
                <Table :columns="columns" :data="listData" :loading="loading" stripe></Table>
                <Page :total="total" :page-size="searchParams.pageSize" :current="searchParams.currentPage" class="page" show-total show-elevator @on-change="pageChange"></Page>
            </div>
        </div>
    </div>
</template>
<script>
import { tableMethod, orgMethod, wareMethod } from '@/api/store/move'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'
import { mapState } from 'vuex'

export default {
    name: 'storeMoveForm',
    data() {
        return {
            height: '',
            searchParams: {
                orgId: '',
                warehouseNo: '',
                startTime: '',
                endTime: '',
                pageSize: 10,
                currentPage: 1
            },
            orgList: [],
            warehouseCombo: [],
            startTime: '',
            startDate: {},
            start: '',
            endTime: '',
            endDate: {},
            end: '',
            columns: [
                {
                    title: '单据编号',
                    key: 'documentNo',
                    width: 200,
                    ellipsis: true
                }, {
                    title: '审核时间',
                    key: 'auditedDate',
                    width:140,
                    render (h, data) {
                        return h('span', [util.transDateFromServer(data.row.auditedDate)])
                    },
                    ellipsis: true
                }, {
                    title: '单据类型',
                    key: 'documentType',
                    ellipsis: true
                }, {
                    title: '物料编号',
                    key: 'materielNumber',
                    width: 200,
                    ellipsis: true
                }, {
                    title: '物料名称',
                    key: 'materielName',
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
                    key: 'measurementUnit',
                    width:90
                }, {
                    title: '变更数量',
                    key: 'changeAmount',
                    ellipsis: true
                }, {
                    title: '库存数量',
                    key: 'amount',
                    ellipsis: true
                }
            ],
            warehouseCombo: [],
            listData: [],
            loading: false,
            total: 0,
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getTable()
        this.getOrg()
    },
    methods: {
        getTable() {
            this.loading = true
            let orgId = this.searchParams.orgId
            let warehouseNo = this.searchParams.warehouseNo
            let currentPage = this.searchParams.currentPage
            let startTime
            let endTime
            if(this.startTime == '') {
                startTime = ''
            } else {
                startTime = this.$moment(this.startTime).utc().format()
            }
            if(this.endTime == '') {
                endTime = ''
            } else {
                endTime = this.$moment(this.endTime).utc().format()
            }
            this.searchParams.startDate = startTime
            this.searchParams.endDate = endTime

            tableMethod({
                orgId,
                warehouseNo,
                startTime,
                endTime,
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
            wareMethod(id).then(res=> {
                this.warehouseCombo = res.data
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
        searchParamsClean() {
            this.warehouseCombo = []
            const defaultParams = {
                orgId: '',
                warehouseNo: '',
                startTime:'',
                endTime:'',
                pageSize: 10,
                currentPage: 1
            }
            this.searchParams = Object.assign({}, this.searchParams, defaultParams)
        },
        search() {
            this.searchParams.currentPage = 1
            this.getTable()
        },
        msgExport(){
            let startTime
            let endTime
            if(this.startTime == '') {
                startTime = ''
            } else {
                startTime = this.$moment(this.startTime).utc().format()
            }
            if(this.endTime == '') {
                endTime = ''
            } else {
                endTime = this.$moment(this.endTime).utc().format()
            }
            this.searchParams.startDate = startTime
            this.searchParams.endDate = endTime
            util.download('/inventory/api/stock/get-inventory-mobility-report-excel-export', this.searchParams)
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