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
                        <div class="cmp-tab" style="margin-left: 10px">
                            <TagSelect v-model="states">
                                <TagSelectOption name="0">待处理</TagSelectOption>
                                <TagSelectOption name="1">处理中</TagSelectOption>
                                <TagSelectOption name="2">挂起</TagSelectOption>
                                <TagSelectOption name="3">关闭</TagSelectOption>
                                <TagSelectOption name="4">完成</TagSelectOption>
                                <TagSelectOption name="5">未分配</TagSelectOption>
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
                    <a href="javascript:;" style="color: rgb(75, 126, 254)" @click="detailHandle(row.id)">查看</a>
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
            states: [0,1,2,5],
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
                    key: 'processName',
                    ellipsis: true
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

            let startDate 
            let endDate
            if(this.startTime == '') {
                startDate = ''
            } else {
                startDate = this.$moment(this.startTime).utc().format()
            }
            if(this.endDate == '') {
                endDate = ''
            } else {
                endDate = this.$moment(this.endDate).utc().format()
            }
            
            let currentPage = this.pageNum
            tableMethod({
                queryName,
                processIds,
                startDate,
                endDate,
                currentPage
            }).then(res=> {
                // console.log(res)
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
        detailHandle(id) {
            this.$router.push({
                path: '/serviceDetail',
                query: {
                    id: id
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
                margin: 10px 0;
                .form-item {
                    display: flex;
                    height: 33px;
                    label {
                        display: inline-block;
                        width: 100px;
                        line-height: 35px;
                        text-align: right;
                        color: #576374;
                    }
                    /deep/.ivu-tag-text {
                        font-size: 14px;
                    }
                }
                .cmp-tab {
                    display: inline-block;
                }
            }
        }
    }
    .searchTrans {
        height: 150px;
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
    .action {
        border: none;
        background: transparent;
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