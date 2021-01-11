<template>
    <div class="plan-box" :style="{height: height+'px'}">
        <div class="index-search" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>起止日期：</label>
                     <DatePicker type="date"  placement="bottom-end"  @on-change="startTimeChange" :options="startDate" format="yyyy-MM-dd"  v-model="startTime" placeholder="开始日期" style="width: 120px"></DatePicker> -
                    <DatePicker type="date"  placement="bottom-end"  @on-change="endTimeChange" :options="endDate" format="yyyy-MM-dd"  v-model="endTime" placeholder="结束日期" style="width: 120px"></DatePicker>
                </div>
                <div class="form-item">
                    <label>所属组织：</label> 
                    <TreeSelect v-model="area"  :data="processList"  v-width="200" @on-change="changeArea"  />
                </div>
                <div class="form-item">
                    <label>执行人员：</label> 
                    <Select v-model="personId" style="width:150px" size="small">
                        <Option v-for="item in userList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="form-search-btn">
                    <a href="javascript:;" @click="higherSearch()">
                        <Icon type="ios-arrow-down" v-if="searchShow" />
                        <Icon type="ios-arrow-up" v-else />
                        高级搜索
                    </a>
                    <button type="button" @click="search()">搜索</button>
                    <button type="button" class="reset" @click="reset()">重置</button>
                </div>
            </div>
            <div class="c-adv-search">
                <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>巡检状态：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="status" >
                                <TagSelectOption :name="item.id" v-for="(item, index) in stateList"  :key="index">{{ item.label }}</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="task-content">
            <div class="title">
                <button @click="exportTable()">导出表格</button>
            </div>
             <Table stripe :columns="tableList" :data="tableData">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <!-- <Button class="action" size="small" style="margin-right: 5px;">配置</Button> -->
                    <Button class="action" size="small">查看</Button>
                </template>
            </Table>
            <Page :total="total" show-elevator size="small" class="page" style="text-align:right;margin-top:20px" @on-change="changeSize" />
        </div>
    </div>
</template>
<script>
import { getOrganizations,getList,getUsers } from '@api/pollingManage/stat';
import createTree from '@/libs/public-util'
import {formatTime} from '@/libs/public'
import util from '@/libs/public_js'
export default {
    name:"pollingStat",
    data(){
        return {
            searchShow: false,
            height:"",
            cityList: [
                {
                    value: 'New York',
                    label: 'New York'
                }
            ],
            stateList: [
                {label: '未分配',id: 'unallocated'},
                {label: '待执行',id: 'toBeExecuted'},
                {label: '执行中',id: 'executing'},
                {label: '已完成',id: 'finished'},
                {label: '异常',id: 'abnormal'},
                {label: '已终止',id: 'interrupt'}
            ],
            status: [],
            area:'',
            modal:false,
            keyword:'',
            tableList: [
                {
                    title: '巡检任务名称',
                    key: 'name',
                    width:160
                },
                {
                    title: '状态',
                    key: 'executeStatus',
                    render: (h, params) => {
                        let text = params.row.executeStatus
                        text=text=='unallocated'?'未分配':(text=='toBeExecuted'?'待执行':(text=='executing'?'执行中':(text=='finished'?'已完成':(text=='abnormal'?'异常':'已终止'))))
                        return h('span', {
                        }, text);
                    }
                },
                {
                    title: '执行人',
                    key: 'executorName'
                },
                {
                    title: '开始时间',
                    key: 'startTime',
                    width:110,
                    render: (h, params) => {
                        return h('span', {
                        }, formatTime(params.row.startTime, 'yyyy-MM-dd HH:mm:ss'));
                    }
                },
                {
                    title: '结束时间',
                    key: 'endTime',
                    width:110,
                     render: (h, params) => {
                        return h('span', {
                        }, formatTime(params.row.endTime, 'yyyy-MM-dd HH:mm:ss'));
                    }
                },
                {
                    title: '所属组织',
                    key: 'orgName',
                    width:110,
                    ellipsis: true
                },
                {
                    title: '巡检点',
                    key: 'point',
                    render:(h,params)=>{
                        // 
                        let text = params.row.inspectedCount+"/"+ params.row.patrolPointCount
                        return h('span',{},text)
                    }
                },
                {
                    title: '巡检项',
                    key: 'point',
                    render:(h,params)=>{
                        let text =params.row.hasResultCount +"/"+ params.row.stepCount
                        return h('span',{},text)
                    }
                    // 
                },
                {
                    title: '缺陷申报',
                    key: 'faultCount'
                },
                {
                    title: '计划距离',
                    key: 'distance'
                },
                {
                    title: '实际距离',
                    key: 'realDistance'
                },	
                {
                    title: '巡检耗时',
                    key: 'elapsedTime'
                }
            ],
            personId:'',
            userList:[],
            processList:[],
            startTime:'',
            start:'',
            endTime:'',
            end:'',
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
            page:1,
            baseData:[],
            tableData:[],
            total:0
        }
    },
    methods :{
        exportTable(){
            let begin = this.start?this.$moment(this.start).utc().format():''
            let end  = this.end?this.$moment(this.end).utc().format():''
            let state = this.status.length!=0?this.status.join(','):''
            const defaultParams = {
                orgId: this.area,
                queryName: '',
                executorId: this.personId,
                executeDateStart: begin,
                executeDateEnd:this.end?this.start+"T15:59:59.000Z":'',
                executeStatus:state,
                pageSize:10,
                currentPage:this.page
            };
            util.download( '/patrol/api/tasks/statistics-export', defaultParams)
           
        },
        search(){
            this.getStatList()
        },
        changeSize(size){
            this.page = size
            this.getStatList()
        },
        reset(){
            this.status=[]
            this.area =""
            this.personId=""
            this.page = 1
            this.start = this.getTime().split(',')[1]
            this.end = this.getTime().split(',')[0]
            this.startTime = this.getTime().split(',')[1]
            this.endTime = this.getTime().split(',')[1]
            this.getStatList()
        },
        getTime(){
            let now  = new Date()
            let year = now.getFullYear()
            let month = now.getMonth()+1
            month=month<10?'0'+month:month
            let day = now.getDate()
            let dayPre = now.getDate()+1
            day = day<10?'0'+day:day
            dayPre = dayPre<10?'0'+ dayPre:dayPre
            let pre = year+"-"+month+"-"+dayPre
            let today = year+"-"+month+"-"+day
            return  pre+","+today
        },
         endTimeChange(day){
          this.end = day
            this.startDate = {
                disabledDate (date) {
                    return date && date.valueOf() >new Date(day).getTime();
                }
           }
        },
        startTimeChange(day){
            this.start = day
            this.endDate = {
                disabledDate (date) {
                    return date && date.valueOf() <=new Date(day).getTime()- 86400000;
                }
            }
        },
        getOrg(){
            getOrganizations().then(res=>{
                console.log(res)
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    treeItem.push(trees[i])
                }
                this.baseData = treeItem
                this.processList = createTree(treeItem,0)
             })
        },
        getStatList(){
            let begin = this.start?this.$moment(this.start).utc().format():''
            let end  = this.end?this.start+"T15:59:59.000Z":''
            let state = this.status.length!=0?this.status.join(','):''
            let orgName=""
            this.baseData.map(item=>{
                if(item.id == this.area){
                    orgName = item.name
                }
            })
            // orgId,executorId,executeDateStart,executeDateEnd,executeStatus,page,orgName
            getList(this.area,this.personId,begin,end,state,this.page,orgName).then(res=>{
                console.log(res)
                if(res.data.items){
                    this.tableData = res.data.items
                    this.total = res.data.total
                }
            })
        },
        changeArea(){
            this.getUserList()
        },
        getUserList(){
            getUsers(this.area).then(res=>{
                console.log(res)
                this.userList = res.data
            })
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
    },
    mounted() {
        this.height = document.body.clientHeight-130
        this.getOrg()
        this.start = this.getTime().split(',')[1]
         this.end = this.getTime().split(',')[0]
         this.startTime = this.getTime().split(',')[1]
         this.endTime = this.getTime().split(',')[1]
         this.getStatList()
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
                    vertical-align: top;
                    margin-left: 10px;
                    /deep/.ivu-tag{
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