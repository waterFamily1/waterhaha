<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="index-search" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>关键字：</label>
                    <Input v-model="searchParams.queryName" placeholder="物料名称或物料编号" style="width: 200px" />
                </div>
                <div class="form-item">
                    <label>所属组织：</label> 
                    <TreeSelect 
                        v-model="searchParams.orgId" 
                        :data="orgList" 
                        v-width="200" 
                        @on-change="orgChange"
                    />
                </div>
                <div class="form-item">
                    <label>物料类别：</label> 
                    <Select v-model="searchParams.materielCategoryId" style="width:200px">
                        <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.categoryName }}</Option>
                    </Select>
                </div>
                <div class="form-search-btn">
                    <a href="javascript:;" @click="higherSearch()">
                        <Icon type="ios-arrow-down" v-if="searchShow" />
                        <Icon type="ios-arrow-up" v-else />
                        高级搜索
                    </a>
                    <Button @click="getTable">搜索</Button>
                    <Button class="reset" @click="resetHandle">重置</Button>
                </div>
            </div>
            <div class="c-adv-search">
                <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>查询时间：</label>
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
                 <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>仓库名称：</label>
                        <Select v-model="searchParams.warehouseNo" style="width:200px">
                            <Option v-for="item in wareList" :value="item.id" :key="item.id">{{ item.warehouseName }}</Option>
                        </Select>
                    </div>
                </div>
                <div class="c-adv-search-row">
                    <div class="form-item" style="display: flex;">
                        <label>ABC类：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="searchParams.abc">
                                <TagSelectOption name="A">A类</TagSelectOption>
                                <TagSelectOption name="B">B类</TagSelectOption>
                                <TagSelectOption name="C">C类</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                </div>
                <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>超出预警查询：</label>
                        <Checkbox v-model="searchParams.outFlag" style="text-align:left"></Checkbox>
                    </div>
                </div>
            </div>
        </div>
        <div class="index-content">
            <div class="c-table-top-btns">
                <Button @click="infoExport()">信息导出</Button>
            </div> 
            <div class="table-wrapper" :style="{height: (height-45)+'px'}">
                <Table stripe :columns="tableList" :data="tableData"></Table>
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
import { tabelMethod, orgMethod, typeMethod, warehouseMethod } from '@/api/store/query'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'

export default {
    name: 'storeQuery',
    data() {
        return {
            height: '',
            searchParams: {
                queryName: '',
                orgId: '',
                materielCategoryId: '',
                warehouseNo: '',
                startTime: '',
                endTime: '',
                abc: [],
                outFlag: false,
                pageSize: 10,
                currentPage: 1
            },
            orgList: [],
            typeList: [],
            searchShow: false, 
            wareList: [],
            startTime: '',
            startDate: {},
            start: '',
            endTime: '',
            endDate: {},
            end: '',
            tableList: [
                {
                    title: '物料编号',
                    key: 'materielNumber',
                    ellipsis: true
                }, {
                    title: '物料名称',
                    key: 'materielName',
                    ellipsis: true
                }, {
                    title: '物料类别',
                    key: 'materielCategory',
                    ellipsis: true
                }, {
                    title: 'ABC分类',
                    key: 'abc'
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
                    key: 'measurementUnit',
                    ellipsis: true
                }, {
                    title: '所属组织',
                    key: 'orgName',
                    ellipsis: true
                }, {
                    title: '仓库',
                    key: 'warehouseName',
                    ellipsis: true
                }, {
                    title: '库存',
                    key: 'amount',
                    ellipsis: true
                }, {
                    title: '备注',
                    key: 'remark',
                    ellipsis: true
                }
            ],
            tableData: [],
            total: 0,
            single: false
        }
    },
    mounted() {
        this.height = document.body.clientHeight-130
        this.getTable()
        this.getOrg()
    },
    methods: {
        getTable() {
            let queryName = this.searchParams.queryName
            let orgId = this.searchParams.orgId
            let currentPage = this.searchParams.currentPage
            let materielCategoryId = this.searchParams.materielCategoryId
            let startTime
            let endTime
            let warehouseNo = this.searchParams.warehouseNo
            let abc = this.searchParams.abc
            let outFlag = this.searchParams.outFlag
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
            this.searchParams.startTime = startTime
            this.searchParams.endTime = endTime
            tabelMethod({
                queryName,
                orgId,
                materielCategoryId,
                warehouseNo,
                startTime,
                endTime,
                abc,
                outFlag,
                currentPage
            }).then(res=> {
                // console.log(res)
                this.tableData = res.data.items
                this.total = res.data.total
            }).catch(err=> {

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
                this.orgList = createTree(treeItem)
            }).catch(err=> {

            })
        },
        orgChange(id) {
            this.typeModel = ''
            this.wareModel = ''
            //物料类别
            typeMethod(id).then(res=> {
                this.typeList = res.data
            }).catch(err=> {

            })
            //仓库名称
            wareMethod(id).then(res=> {
                this.wareList = res.data
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
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        resetHandle() {
            this.orgList = []
            this.typeList = []
            this.wareList = []
            this.startTime = ''
            this.startDate = {}
            this.start = ''
            this.endTime = ''
            this.endDate = {}
            this.end = ''
            const defaultParams = {
                queryName: '',
                orgId: '',
                materielCategoryId: '',
                warehouseNo: '',
                startTime: '',
                endTime: '',
                abc: [],
                outFlag: false,
                pageSize: 10,
                currentPage: 1
            }
            this.searchParams = Object.assign({}, this.searchParams, defaultParams)
        },
        infoExport() {
            util.download('inventory/api/stock/getstock-info-excel-export', this.searchParams)
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
        height: 240px;
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
</style>