<template>
    <div class="plan-box" :style="{height: height+'px'}">
        <div class="index-search" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>起止时间：</label>
                    <DatePicker type="date" placement="bottom-end" @on-change="startTimeChange" :options="startDate" format="yyyy-MM-dd" v-model="startTime" placeholder="开始日期" style="width: 190px"></DatePicker> - 
                    <DatePicker type="date" placement="bottom-end" @on-change="endTimeChange" :options="endDate" format="yyyy-MM-dd" v-model="endTime" placeholder="结束日期" style="width: 190px"></DatePicker>
                </div>
                <div class="form-item">
                    <label>区域位置：</label> 
                    <TreeSelect 
                        v-model="searchParams.processIds" 
                        multiple 
                        :data="areaData" 
                        v-width="350" 
                        :max-tag-count="2"
                    />
                </div>
                <div class="form-search-btn">
                    <a href="javascript:;" @click="higherSearch()">
                        <Icon type="ios-arrow-up" v-if="searchShow"/>
                        <Icon type="ios-arrow-down" v-else />
                        高级搜索
                    </a>
                    <Button @click="getData">搜索</Button>
                    <Button class="reset" @click="searchParamsClean">重置</Button>
                </div>
            </div>
            <div class="c-adv-search">
                <div class="c-adv-search-row">
                    <div class="form-item" style="display: flex;">
                        <label>巡检状态：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="searchParams.states">
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
            <div class="title">
                <Button @click="exportTable">导出表格</Button>
            </div>
            <Table stripe :columns="tableList" :data="tableData" :loading="loading" >
            </Table>
            <Page 
                :total="total" 
                :page-size="searchParams.pageSize" 
                :current="searchParams.currentPage" 
                show-total 
                show-elevator 
                @on-change="pageChange"
                style="text-align: right;margin-top: 20px;"
            ></Page>
        </div>
    </div>
</template>
<script>
import { tableMethod, regionalCon } from '@/api/service/state'
import util from '@/libs/public_js'
import createTree from '@/libs/public-util'

export default {
    data(){
        return {
            searchShow: false,
            height: '',
            startDate: {
                disabledDate (date) {
                    return date && date.valueOf() >= Date.now();
                }
            },
            endDate: {
                disabledDate (date) {
                    return date && date.valueOf() <= Date.now()- 86400000
                }
            },
            startTime: '',
            start: '',
            endTime: '',
            end: '',
            areaData: [],
            modal:false,
            keyword:'',
            tableList: [
                {
                    title: '序号',
                    key: 'index',
                    width: 70,
                    align: 'center'
                }, {
                    title: '故障设备',
                    key: 'equName'
                }, {
                    title: '保修日期',
                    key: 'createDate',
                    render (h, data) {
                        return h('span', [util.transDateFromServer(data.row.createDate)])
                    }
                }, {
                    title: '报修人',
                    key: 'createUserName',
                    width: 120
                }, {
                    title: '状态',
                    key: 'stateName',
                    width: 90
                }, {
                    title: '当前处理人',
                    key: 'processingPersonName',
                     width: 120
                }, {
                    title: '紧急程度',
                    key: 'severityName',
                    width: 90
                }, {
                    title: '区域位置',
                    key: 'processName'
                }, {
                    title: '故障原因',
                    key: 'faultReason'
                }
            ],
            tableData: [],
            loading: false,
            total: 0,
            searchParams: {
                processIds: [],
                states: [],
                startDate: '',
                endDate: '',
                pageSize: 10,
                currentPage: 1
            },
        }
    },
    mounted() {
        this.height = document.body.clientHeight-70
        this.getTime()
        this.getData()
        this.getRegional()
    },
    methods: {
        getData() {
            this.loading = true
            let processIds = this.searchParams.processIds
            let states = this.searchParams.states
            let startDate = this.$moment(this.startTime).utc().format()
            let endDate = this.$moment(this.endTime).utc().format()
            let currentPage = this.searchParams.currentPage
            this.searchParams.startDate = startDate
            this.searchParams.endDate = endDate
            // console.log(this.startTime)
            tableMethod({
                processIds,
                states,
                startDate,
                endDate,
                currentPage
            }).then(res=> {
                this.listData = res.data.items
                this.total = res.data.total
                this.loading = false
            }).catch(err=> {

            })
        },
        pageChange (num) {
            this.searchParams.currentPage = num
            this.getData()
        },
        getRegional() {
            regionalCon().then(res => {
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].expand = false
                    trees[i].value = trees[i].id
                    treeItem.push(trees[i])
                }
                this.areaData= createTree(treeItem,0)
            }).catch(err => {
                // 异常情况
            })
        },
        getTime() {
            let now  = new Date()
            let year = now.getFullYear()
            let month = now.getMonth()+1
            month = month<10?'0'+month:month
            let day = now.getDate()
            day = day<10?'0'+day:day
            let today = year+"-"+month+"-"+day
            let dayPre = now.getDate()-1
            let dayNext = now.getDate()+1
            dayPre = dayPre<10?'0'+ dayPre:dayPre
            dayNext = dayNext<10?'0'+ dayNext:dayNext
            let pre = year+"-"+month+"-"+dayPre
            let next = year+"-"+month+"-"+dayNext
            this.startTime = today
            this.endTime = today
            this.start = today
            this.end = next
            let begin = this.$moment(today).utc().format()
            let end  = this.$moment(next).utc().format()
        },
        endTimeChange(day) {
            this.end = day
            this.startDate = {
                disabledDate (date) {
                    return date && date.valueOf() >=new Date(day)
                }
            }
        },
        startTimeChange(day){
            this.start = day
            this.endDate = {
                disabledDate (date) {
                    return date && date.valueOf() <=new Date(day).getTime()- 86400000
                }
            }
        },
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        searchParamsClean () {
            this.startTime = util.transDateFromLocale(util.formatDateTime(new Date(),'yyyy-MM-dd')+' 23:59:59')
            this.endTime = util.transDateFromLocale(util.formatDateTime(new Date(),'yyyy-MM-dd')+' 23:59:59') 
            let startDate = this.$moment(this.startTime).utc().format()
            let endDate = this.$moment(this.endTime).utc().format()
            const defaultParams = {
                processIds: '',
                states: '',
                startDate: startDate,
                endDate: endDate,
                pageSize: 10,
                currentPage: 1
            };
            this.searchParams = Object.assign({}, this.searchParams, defaultParams);
        },
        exportTable () {
            util.download( '/equipment/api/repairs/statistics-export', this.searchParams)
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
                .reset {
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
                    /deep/.ivu-tag-text {
                        font-size: 14px;
                    }
                }
            }
        }
    }
    .searchTrans {
        height: 100px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .searchPack {
        height: 43px;
        overflow: hidden;
        transition: 0.5s height;
    }
   .task-content {
       border-top: 5px solid #f0f0f0;
       padding: 10px;
       .title {
            height: 36px;
            border-bottom: 1px solid #EEE;
            .ivu-btn {
                height: auto;
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
</style>