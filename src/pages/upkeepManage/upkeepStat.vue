<template>
    <div class="plan-wrap" :style="{height: height+'px'}">
        <div class="search-box" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>起止日期：</label>
                    <DatePicker type="date"  placement="bottom-end"  @on-change="startTimeChange" :options="startDate" format="yyyy-MM-dd"  v-model="startTime" placeholder="开始日期" style="width: 110px"></DatePicker> -
                    <DatePicker type="date"  placement="bottom-end"  @on-change="endTimeChange" :options="endDate" format="yyyy-MM-dd"  v-model="endTime" placeholder="结束日期" style="width: 110px"></DatePicker>
                </div>
                  <div class="form-item">
                    <label>所属组织：</label>
                     <TreeSelect v-model="area" multiple :data="treeData" v-width="150" @on-change="changeArea"  />
                </div>
                <div class="form-item">
                    <label>执行人员：</label>
                    <Select v-model="personId" style="width:150px" placeholder="请选择人员" size="small">
                        <Option v-for="item in handlerList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
                    <div class="form-item" style="display: flex;">
                        <label>状态：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="confirmWay">
                                <TagSelectOption :name="index+1" v-for="(item,index) in stateList" :key="index">{{item}}</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="c-table-top">
            <div class="c-table-top-btns">
                <Button  @click="exportTable()">导出</Button>
            </div>
            <Table ref="selection" :columns="columns" :data="data">
                <template slot-scope="{ row, index }" slot="action">
                    <Button class="action" type="text" size="small" style="margin-right: 5px;color:rgb(75, 126, 254)" @click="check(row.id)">查看</Button>
                    <Button class="action" type="text" size="small" style="color:rgb(75, 126, 254)" @click="deleteItem(row.id)" v-if="row.state==1">删除</Button>
                </template>
            </Table>
            <Page :total="total" show-elevator show-total class="page" @on-change="changeSize" />
        </div>
       
    </div>
</template>
<script>
// planList
import { statList,getOrg,getUsers } from '@api/upkeep/stat';
import createTree from '@/libs/public-util'
import {formatTime} from '@/libs/public'
import util from '@/libs/public_js'
export default {
    name: 'upkeerPlan',
    data() {
        return {
            height: '',
            searchShow: false,
            planList: {
                name: '',
                time: ''
            },
            area:[],
            confirmWay: [],
            columns: [
                {   
                    title: '序号',
                      width: 70,
                    type: 'index',
                }, {
                    title: '保养任务名称',
                    key: 'taskName',
                    ellipsis: true
                }, {
                    title: '执行日期',
                    key: 'endDate',
                },  {
                    title: '状态',
                    key: 'state',
                    render: (h, params) => {
                        let a = Number(params.row.state)
                        let text = this.stateList[a-1]
                        return h('span', {
                        }, text);
                    }
                }, {
                    title: '执行人',
                    key: 'executeUserName',
                },
                {
                    title: '区域位置',
                    key: 'areaName',
                    ellipsis: true
                }, {
                    title: '保养内容项',
                    key: 'contentsItems',
                }, {
                    title: '缺陷申报',
                    key: 'faults',
                }, {
                    title: '保养耗时',
                    key: 'continuingTime',
                }
            ],
            data: [],
            addModal: false,
            treeData: [],
            addForm: {
                value: [],
                type: []
            },
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
            startTime:'',
            start:'',
            endTime:'',
            end:'',
            page:1,
            total:0,
            stateList:['待执行','执行中','已完成','转派中','逾期'],
            genreList:[],
            handlerList:[],
            personId:"",
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.start = this.getTime().split(',')[1]
         this.end = this.getTime().split(',')[0]
         this.startTime = this.getTime().split(',')[1]
         this.endTime = this.getTime().split(',')[1]
        this.getList()
        this.getRegional()
        this.userList()
        
    },
    methods: {
        changeArea(){
            this.userList()
        },
        userList(){
            let orgId = this.area.length!=0?this.area.join(','):''
            getUsers(orgId).then(res=>{
                this.handlerList = res.data
            })
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
         getRegional() {
            getOrg().then(res => {
                // console.log(res)
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].checked = false
                    treeItem.push(trees[i])
                }
                this.treeData = createTree(treeItem,0)
            }).catch(err => {
                // 异常情况
            })
        },
         
        search(){
           this.getList()
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
        changeSize(size){
            this.page = size
            this.getList()
        },
        getList(){
        // start,end,state,executeUserId,orgId,page
            let begin = this.start?this.$moment(this.start).utc().format():''
            let end  = this.end?this.$moment(this.end).utc().format():''
            let state = this.confirmWay.length!=0?this.confirmWay.join(','):''
            let orgId = this.area.length!=0?this.area.join(','):''
            statList(begin,end,state,this.personId,orgId,this.page).then(res=>{
              console.log(res)
              if(res.data.items){
                  let temp = res.data.items
                  temp.map(ele=>{
                      ele.startDate = formatTime(ele.startDate, 'yyyy-MM-dd')
                      ele.endDate = formatTime(ele.endDate, 'yyyy-MM-dd')
                      ele.createDate = formatTime(ele.createDate, 'HH:mm:ss yyyy-MM-dd')
                      if(ele.state == 3){
                          ele._disabled= true
                      }
                  })
                  this.data = temp
                  this.total = res.data.total

              }
            })
        },
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        exportTable () {
            let begin = this.start?this.$moment(this.start).utc().format():''
            let end  = this.end?this.$moment(this.end).utc().format():''
            let state = this.confirmWay.length!=0?this.confirmWay.join(','):''
            let orgId = this.area.length!=0?this.area.join(','):''
            const defaultParams = {
                executeUserId: this.personId,
                state: state,
                startDate: begin,
                endDate: end,
                orgId: orgId,
                 pageSize: 10,
                currentPage: this.page
            };
            util.download( '/equipment/api/maintains/statistics-excel-export', defaultParams)
        }
    }
}
</script>
<style lang="less" scoped>
.plan-wrap {
    margin: 5px;
    background: #fff;
    .search-box {
        padding: 5px;
        height: 43px;
        .search-main {
            // height: 33px;
            // overflow: hidden;
            .form-item {
                min-height: 33px;
                display: inline-block;
                /deep/.ivu-input {
                    height: 28px;
                    font-size: 13px;
                }
            }
            .form-search-btn {
                margin-top: 4px;
                float: right;
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
                /deep/.ivu-input-wrapper {
                    width: 150px;
                    /deep/.ivu-input {
                        height: 28px;
                        font-size: 13px;
                    }
                }
                .cmp-tab {
                    display: inline-block;
                    margin-left: 10px;
                    /deep/.ivu-tag-text {
                        font-size: 14px;
                    }
                }
                /deep/.ivu-form-item {
                    margin-bottom: 5px;
                }
            }
            /deep/.ivu-form-item-content {
                line-height: 6px;
            }
        }
        label {
            display: inline-block;
            width: 100px;
            text-align: right;
            margin-right: 5px;
            line-height: 32px;
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
    .c-table-top {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .c-table-top-btns {
            height: 36px;
            border-bottom: 1px solid #EEE;
            button {
                background-color: #576374;
                border: none;
                min-width: 50px;
                height: 26px;
                color: #fff;
                margin-right: 10px;
                font-size: 13px;
            }
        }
        .page{
            text-align: right;
            margin-top: 10px;
        }
    }
}
/deep/.ivu-modal-footer {
    /deep/.ivu-btn-text {
        background-color: #cbcbcb;
        color: #FEFEFE;
    }
}
</style>