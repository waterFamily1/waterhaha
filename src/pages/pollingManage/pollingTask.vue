<template>
    <div class="plan-box" :style="{height: height+'px'}">
        <div class="index-search" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>关键字：</label>
                    <Input v-model="keyword" placeholder="名称/执行人" style="width: 200px"  />
                </div>
                <div class="form-item">
                    <label>所属组织：</label> 
                    <TreeSelect v-model="area"  :data="processList"  v-width="200"  />
                </div>
                <div class="form-search-btn">
                    <a href="javascript:;" @click="higherSearch()">
                        <Icon type="ios-arrow-down" v-if="searchShow" />
                        <Icon type="ios-arrow-up" v-else />
                        高级搜索
                    </a>
                    <Button @click="search()">搜索</Button>
                    <Button class="reset" @click="reset()">重置</Button>
                </div>
            </div>
            <div class="c-adv-search">
                 <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>执行日期：</label>
                        <div class="cmp-tab">
                            <DatePicker type="date" placement="bottom-end" @on-change="startTimeChange" :options="startDate" format="yyyy-MM-dd" v-model="startTime" placeholder="开始日期" style="width: 180px"></DatePicker> -
                            <DatePicker type="date" placement="bottom-end" @on-change="endTimeChange" :options="endDate" format="yyyy-MM-dd" v-model="endTime" placeholder="结束日期" style="width: 180px"></DatePicker>
                        </div>
                    </div>
                </div>
                <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>状态：</label>
                        <div class="cmp-tab">
                             <TagSelect v-model="status" >
                                <TagSelectOption :name="item.id" v-for="(item, index) in stateList"  :key="index">{{ item.label }}</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                </div>
                <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>类型：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="type" >
                                <TagSelectOption :name="item.id" v-for="(item, index) in typeList"  :key="index">{{ item.label }}</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="task-content">
             <Table stripe :columns="tableList" :data = "tableData">
                <template slot-scope="{ row, index }" slot="action">
                    <Button class="action" size="small" type="text" style="color:rgb(75, 126, 254);font-size:13px" @click="check(row.id)">查看</Button>
                    <Button class="action" size="small" type="text" style="color:rgb(75, 126, 254);font-size:13px" @click="cancelT(row.id)" v-if="row.executeStatus=='unallocated'||row.executeStatus=='toBeExecuted'">删除</Button>
                </template>
            </Table>
            <Page :total="total" show-elevator size="small" class="page" style="text-align:right;margin-top:20px" @on-change="changeSize" />
        </div>
    </div>
</template>
<script>
import { getOrganizations,getList,getUsers,deleteTask } from '@api/pollingManage/task';
import createTree from '@/libs/public-util'
import {formatTime} from '@/libs/public'
export default {
    name:"pollingTask",
    data(){
        return {
            searchShow: false,
            height: '',
            stateList: [
                {label: '未分配',id: 'unallocated'},
                {label: '待执行',id: 'toBeExecuted'},
                {label: '执行中',id: 'executing'},
                {label: '已完成',id: 'finished'},
                {label: '异常',id: 'abnormal'},
                {label: '已终止',id: 'interrupt'}
            ],
            typeList: [
                {label:'普通巡检',id:'inside'},
                {label:'地图巡检',id:'outside'}
            ],
            typeCheckedAll: false,
            typeBox: [],
            tissue: '',
            modal: false,
            keyword: '',
            tableList: [
                {
                    title: '编号',
                    key: 'no'
                }, {
                    title: '巡检名称',
                    key: 'name',
                    ellipsis: true
                }, {
                    title: '状态',
                    key: 'executeStatus',
                    render: (h, params) => {
                        let text = params.row.executeStatus
                        text=text=='unallocated'?'未分配':(text=='toBeExecuted'?'待执行':(text=='executing'?'执行中':(text=='finished'?'已完成':(text=='abnormal'?'异常':'已终止'))))
                        return h('span', {
                        }, text);
                    }
                }, {
                    title: '执行人',
                    key: 'executorName'
                }, {
                    title: '开始时间',
                    key: 'startTime',
                    width:110,
                    render: (h, params) => {
                        return h('span', {
                        }, formatTime(params.row.startTime, 'yyyy-MM-dd HH:mm:ss'));
                    }
                }, {
                    title: '结束时间',
                    key: 'endTime',
                    width:110,
                     render: (h, params) => {
                        return h('span', {
                        }, formatTime(params.row.endTime, 'yyyy-MM-dd HH:mm:ss'));
                    }
                }, {
                    title: '巡检点',
                    key: 'point',
                    render:(h,params)=>{
                        let text = params.row.inspectedCount+"/"+ params.row.patrolPointCount
                        return h('span',{},text)
                    }
                }, {
                    title: '发现缺陷',
                    key: 'abnormalCount'
                }, {
                    title: '操作',
                    slot: 'action',
                    width: 150
                }
            ],
            processList: [],
            area: '',
            status: [],
            type: [],
            startTime: '',
            start: '',
            endTime: '',
            end: '',
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
        cancelT(id){
            deleteTask(id).then(res=>{
                if(res.data.count){
                    this.$Message.success('数据删除成功！');
                    this.taskList()
                }
            })
        },
        taskList(){
            let begin = this.start?this.$moment(this.start).utc().format():''
            let end  = this.end?this.start+"T15:59:59.000Z":''
            let state = this.status.length!=0?this.status.join(','):''
            let type = this.type.length!=0?this.type.join(','):''
            // queryName,orgId,start,end,status,type,page
           getList(this.keyword,this.area,begin,end,state,type,this.page).then(res=>{
               if(res.data.items){
                   this.tableData = res.data.items
                   this.total = res.data.total
               }
           })
        },
        getOrg(){
            getOrganizations().then(res=>{
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
        search(){
            this.taskList()
        },
        reset(){
            this.status= []
            this.type = []
            this.area = ''
            this.keyword= ''
            this.page = 1
            this.start = this.getTime().split(',')[1]
            this.end = this.getTime().split(',')[0]
            this.startTime = this.getTime().split(',')[1]
            this.endTime = this.getTime().split(',')[1]
            this.taskList()
        },
        changeSize(size){
           this.page = size
           this.taskList()
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
        higherSearch() {
            this.searchShow = !this.searchShow
        },
         higherSearch() {
            this.searchShow = !this.searchShow
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
        check(id){
            this.$router.push({
                path:'/task/detail',
                query: {
                    id: id
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
        this.taskList()
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
                    vertical-align: top;
                    /deep/.ivu-tag{
                        font-size: 14px;
                    }
                }
            }
        }
    }
    .searchTrans {
        height: 180px;
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
   }
}
</style>