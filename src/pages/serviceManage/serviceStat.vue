<template>
    <div class="plan-box" :style="{height: height+'px'}">
        <div class="index-search" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>起止时间：</label>
                    <DatePicker type="date"  placement="bottom-end"  @on-change="startTimeChange" :options="startDate" format="yyyy-MM-dd"  v-model="startTime" placeholder="开始日期" style="width: 190px"></DatePicker> - 
                    <DatePicker type="date"  placement="bottom-end"  @on-change="endTimeChange" :options="endDate" format="yyyy-MM-dd"  v-model="endTime" placeholder="结束日期" style="width: 190px"></DatePicker>
                </div>
                <div class="form-item">
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
                    <button type="button">搜索</button>
                    <button type="button" class="reset">重置</button>
                </div>
            </div>
            <div class="c-adv-search">
                <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>巡检状态：</label>
                        <div class="cmp-tab">
                            <a href="javascript:;" @click="typeCheckAll()" :class="{checked:typeCheckedAll}">全部</a>
                            <a href="javascript:;" v-for="(item, index) in stateList" 
                            :key="index" @click="typeCheck(item.id)" 
                            :class="{checked:typeBox.includes(item.id)}">{{ item.label }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="task-content"> 
            <div class="title">
                <button>导出表格</button>
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
import { mapState } from 'vuex'

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
            area: [],
            areaData: [],
            stateList: [
                {label: '待处理',id: 1},
                {label: '处理中',id: 2},
                {label: '挂起',id: 3},
                {label: '关闭',id: 4},
                {label: '完成',id: 5},
                {label: '未分配',id: 6}
            ],
            typeCheckedAll: false,
            typeBox: [],
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
                processIds: '',
                states: '',
                startDate: '',
                endDate: '',
                pageSize: 10,
                currentPage: 1
            },
        }
    },
    computed : mapState({
        maintainState : (state) => state.map.maintain.state
    }),
    mounted() {
        console.log(33333333333333333333333)
        this.getData()
        this.getRegional()
        this.getTime()
    },
    methods: {
        getData() {
            console.log(4333252)
            this.loading = true
            tableMethod().then(res=> {
                this.listData = res.data.items
                this.total = res.data.total
                this.loading = false
            }).catch(err=> {

            })
            this.$http.get(api.getRepairStatistics, this.searchParams).then((res) => {
                this.listData = res.items;
                this.total = res.total;
                this.loading = false;
            })
        },
        pageChange (num) {
            this.searchParams.currentPage = num
            this.getData()
        },
        getRegional() {
            console.log(333)
            regionalCon().then(res => {
                console.log(1111111)
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
            //  this.url= this.ip+'/equipment/api/faults/statistics-export?severityTypes=&processIds=&orgIds=&faultTypes=&states=&startDate='+begin+'&endDate='+end+'&pageSize=10&currentPage=1'
        },
        endTimeChange(){
         
        },
        startTimeChange(day){
            // this.start = day
            // this.endDate = {
            //     disabledDate (date) {
            //         return date && date.valueOf() <=new Date(day).getTime()- 86400000;
            //     }
            // }
        },
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        typeCheckAll() {
            this.typeBox = []
            this.typeCheckedAll = true
        },
        typeCheck(i) {
            this.typeCheckedAll = false
            if(this.typeBox.includes(i)) {
                this.typeBox = this.typeBox.filter((ele) => {
                    return ele != i
                });
            } else {
                this.typeBox.push(i);
            }
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
    },
    mounted() {
        this.height = document.body.clientHeight-130
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
                button{
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
        height: 100px;
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
</style>