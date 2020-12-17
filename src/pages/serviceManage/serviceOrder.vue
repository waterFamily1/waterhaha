<template>
    <div class="plan-box" :style="{height: height+'px'}">
        <div class="index-search" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>关键词：</label>
                    <Input v-model="keyword" placeholder="故障设备" style="width: 250px" />
                </div>
                <div class="form-item form-tag">
                    <label>区域位置：</label> 
                    <TreeSelect 
                        v-model="area" 
                        multiple 
                        :data="areaData" 
                        v-width="350" 
                        :max-tag-count="2"
                    />
                </div>
                <div class="form-search-btn">
                    <a href="javascript:;" @click="higherSearch()">
                        <Icon type="ios-arrow-down" v-if="searchShow" />
                        <Icon type="ios-arrow-up" v-else />
                        高级搜索
                    </a>
                    <Button @click="getTable()">搜索</Button>
                    <Button class="reset">重置</Button>
                </div>
            </div>
            <div class="c-adv-search">
                <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>报修时间：</label>
                        <div class="cmp-tab">
                            <DatePicker 
                                type="date" v-model="startTime" :editable="false"
                                 placeholder="开始日期"
                                format="yyyy-MM-dd" 
                                @on-change="handleChange" style="width: 200px">
                            </DatePicker> 
                            -
                            <DatePicker 
                                type="date" v-model="endTime" :editable="false" 
                                :options="endDate" placeholder="结束日期"
                                format="yyyy-MM-dd"
                                @on-change="endTimeChange" style="width: 200px"
                            >
                            </DatePicker>
                        </div>
                    </div>
                </div>
                <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>巡检状态：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="states">
                                <TagSelectOption name="tag1">选项一</TagSelectOption>
                                <TagSelectOption name="tag2">选项二</TagSelectOption>
                                <TagSelectOption name="tag3">选项三</TagSelectOption>
                                <TagSelectOption name="tag4">选项四</TagSelectOption>
                                <TagSelectOption name="tag5">选项五</TagSelectOption>
                                <TagSelectOption name="tag6">选项六</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="task-content">
             <Table 
                stripe 
                :columns="tableList" 
                :data="tableData"
            >
                <template slot-scope="{ row, index }" slot="action">
                    <Button class="action" size="small">查看</Button>
                </template>
            </Table>
            <Page 
                :total="allTotal" 
                @on-change="changePage"
                show-elevator 
                show-total
                class="page" 
                style="text-align: right;margin-top: 20px" 
            />
        </div>
    </div>
</template>
<script>
import { tableMethod, regionalCon } from '@/api/service/order'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'

export default {
    name: 'serviceOrder',
    data(){
        return {
            searchShow: false,
            height: '',
            area: [],
            areaData: [],
            endDate: {},
            startTime: '',
            endTime: '',
            modal: false,
            keyword: '',
            states: [],
            tableList: [
                {
                    title: '故障设备',
                    key: 'equName'
                }, {
                    title: '维修编号',
                    key: 'repairNumber'
                }, {
                    title: '报修人',
                    key: 'createUserName'
                }, {
                    title: '报修时间',
                    key: 'createDate',
                    render(h, data) {
                	    return util.tableDatetime(h, data.row.createDate)
                    } 
                }, {
                    title: '完成时间',
                    key: 'finishTime',
                    render(h, data) {
                	    return util.tableDatetime(h, data.row.finishTime)
                    } 
                }, {
                    title: '区域位置',
                    key: 'processName'
                }, {
                    title: '当前状态',
                    key: 'stateName'
                }, {
                    title: '当前处理人',
                    key: 'processingPersonName'
                }, {
                    title: '操作',
                    width: 80,
                    align: 'center',
                    slot: 'action'
                }
            ],
            tableData:[],
            allTotal: 0,
            pageNum: '1'
        }
    },
    mounted() {
        this.height = document.body.clientHeight - 75
        this.getTable()
        this.getRegional()
    },
    methods :{
        getTable() {
            let queryName = this.keyword
            let processIds = this.area
            let startDate = this.$moment(this.startTime).utc().format()
            let endDate = this.$moment(this.endTime).utc().format()
            let currentPage = this.pageNum
            tableMethod({
                queryName,
                processIds,
                startDate,
                endDate,
                currentPage
            }).then(res=> {
                console.log(res)
                this.tableData = res.data.items
                this.allTotal = res.data.total
            }).catch(err=> {

            })
        },
        changePage(index) {
            this.pageNum = index
            this.getTable()
        },
        getRegional() {
            regionalCon().then(res => {
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].expand = true
                    trees[i].value = trees[i].id
                    treeItem.push(trees[i])
                }
                this.areaData= createTree(treeItem)
            }).catch(err => {
                // 异常情况
            })
        },
        handleChange(date) {
            let startValue = this.startTime
            startValue = new Date(date).getTime()
            this.endDate = {
                disabledDate(date) {
                    return date && date.valueOf() < startValue - 86400000
                }
            }
        },
        endTimeChange(date) {
            this.endTime = date
        },  
        higherSearch() {
            this.searchShow = !this.searchShow
        },
         higherSearch() {
            this.searchShow = !this.searchShow
        },
        mapClick(){
            console.log("1111")
            this.$router.push({
                path:'/pollingManage/plan/add',
                query: {
                    type: 'map'
                }
            })
        },
        customClick(){
            this.$router.push({
                path:'/pollingManage/plan/add',
                query: {
                    type: 'normal'
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
/deep/.ivu-col-span-12{
    width: 47%;
}
.plan-box{
    margin: 5px;
    background: #fff;
    overflow: auto;
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
                }
            }
        }
    }
    .searchTrans {
        height: 140px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .searchPack {
        height: 43px;
        overflow: hidden;
        transition: 0.5s height;
    }
   .task-content{
       border-top: 5px solid #f0f0f0;
       padding: 10px;
       .title{
            height: 36px;
            border-bottom: 1px solid #EEE;
            button{
                background: #576374;
                font-size: 12px;
                padding: 4px 12px;
                color: #fff;
                border: 0;
                border-radius: 3px;
                margin: 0 5px;
            }
       }
   }
}
.form-tag {
    /deep/.ivu-tag {
        span:not(.ivu-select-max-tag) {
            margin-right: 0!important;
        }
    }
}
</style>