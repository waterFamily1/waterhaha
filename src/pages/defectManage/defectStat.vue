<template>
    <div class="stat-wrap" :style="{height: height+'px'}">
        <div class="search-box" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>起止时间：</label>
                    <DatePicker type="date"  placement="bottom-end"  @on-change="startTimeChange" :options="startDate" format="yyyy-MM-dd"  v-model="startTime" placeholder="开始日期" style="width: 190px"></DatePicker> -
                    <DatePicker type="date"  placement="bottom-end"  @on-change="endTimeChange" :options="endDate" format="yyyy-MM-dd"  v-model="endTime" placeholder="结束日期" style="width: 190px"></DatePicker>
                </div>
                <div class="form-item">
                    <label>严重程度：</label>
                    <Select v-model="searchList.severity" style="width:200px">
                        <Option value="1">严重</Option>
                        <Option value="2">轻微</Option>
                        <Option value="3">一般</Option>
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
                        <div>
                            <label>区域位置：</label>
                            <TreeSelect v-model="searchList.area" multiple :data="areaData" v-width="200" />
                        </div>
                        <div>
                            <label>所属组织：</label>
                            <TreeSelect v-model="searchList.organize" multiple :data="orgData" v-width="200" />
                        </div>
                    </div>
                    <div class="form-item">
                        <label>状态：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="state">
                                <TagSelectOption name="0">待处理</TagSelectOption>
                                <TagSelectOption name="1">处理中</TagSelectOption>
                                <TagSelectOption name="2">挂起</TagSelectOption>
                                <TagSelectOption name="3">关闭</TagSelectOption>
                                <TagSelectOption name="4">完成</TagSelectOption>
                                <TagSelectOption name="5">未分配</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                    <div class="form-item">
                        <label>缺陷类型：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="defectType">
                                <TagSelectOption name="1">工艺缺陷</TagSelectOption>
                                <TagSelectOption name="2">设备缺陷</TagSelectOption>
                                <TagSelectOption name="3">管理缺陷</TagSelectOption>
                                <TagSelectOption name="4">其他缺陷</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="c-top-border-gray">
            <div class="c-table-top-btns">
                <!-- <button @click="exportHandle()"></button> -->
                  <Button  @click="exportTable()">导出表格</Button>  
            </div>
            <Table stripe :columns="columns" :data="data"></Table>
            <Page :total="total" show-elevator show-total class="page" @on-change="changeSize" />
        </div>
    </div>
</template>
<script>
import { getOrg,regionalCon,statList} from '@api/defect/stat';
import createTree from '@/libs/public-util'
import {formatTime} from '@/libs/public'
import util from '@/libs/public_js'
export default {
    name: 'defectStat',
    data() {
        return {
            height: '',
            searchShow: false,
            searchList: {
                time: '',
                severity: '',
                area: [],
                organize: []
            },
            areaData: [],
            columns: [
                {
                    type: 'index',
                    title: '序号',
                    width: 80
                }, {
                    title: '缺陷类型',
                    key: 'faultTypeName'
                }, {
                    title: '申报日期',
                    key: 'createDate',
                    render: (h, params) => {
                        let that = this
                        const text = params.row.createDate
                        return h('span', {}, formatTime(text, 'yyyy-MM-dd HH:mm '));
                    }
                }, {
                    title: '状态',
                    key: 'stateName'
                }, {
                    title: '区域位置',
                    key: 'processName'
                }, {
                    title: '当前处理人',
                    key: 'processingPersonName'
                }, {
                    title: '严重程度',
                    key: 'severityTypeName'
                }, {
                    title: '申报人',
                    key: 'createUser'
                }
            ],
            data: [],
            defectType:[],
            orgData:[],
            state:[],
            page:1,
            total:0,
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
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getTime()
        this.getOrganizations()
        this.getRegional()
        this.getTableData()
       
    },
    methods: {
        changeSize(size){
           this.page = size
           this.getTableData()
        }, 
        search(){
            this.getTableData()
        },
        getTime(){
            let now  = new Date()
            let year = now.getFullYear()
            let month = now.getMonth()+1
            month=month<10?'0'+month:month
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
        exportTable () {
             let begin = this.start?this.$moment(this.start).utc().format():''
            let end  = this.end?this.$moment(this.end).utc().format():''
            const defaultParams = {
                processIds: '',
                states:'',
                severityTypes: '',
                startDate: begin,
                endDate: end,
                orgIds: '',
                faultTypes:'',
                pageSize: 10,
                currentPage: this.page
            };
            util.download( '/equipment/api/faults/statistics-export', defaultParams)
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
        getOrganizations(){
            getOrg().then(res=>{
                console.log(res)
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    treeItem.push(trees[i])
                }
                this.orgData = createTree(treeItem)
             })
        },
        getRegional() {
            regionalCon().then(res => {
                // console.log(JOSN.stringify(res.data))
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].expand = true
                    trees[i].value = trees[i].id
                    treeItem.push(trees[i])
                }
                this.areaData = createTree(treeItem)
            }).catch(err => {
                // 异常情况
            })
        },
        getTableData(){
            let processIds = this.searchList.area.length!=0?this.searchList.area.join(','):''
            let orgIds = this.searchList.organize.length!=0?this.searchList.organize.join(','):''
            let state = this.state.length!=0?this.state.join(','):''
            let defectType = this.defectType.length!=0?this.defectType.join(','):''
            let begin = this.$moment(this.start).utc().format()
            let end  = this.$moment(this.end).utc().format()
            statList(this.searchList.severity,processIds,orgIds,defectType,state,begin,end,this.page).then(res=>{
                console.log(res)
                if(res.data.items){
                    this.data = res.data.items
                    this.total = res.data.total
                }
            })

        },
        
    }
}
</script>
<style lang="less" scoped>
.stat-wrap {
    margin: 5px;
    background: #fff;
    .search-box {
        padding: 5px;
        height: 43px;
        .search-main {
            height: 33px;
            overflow: hidden;
            .form-item {
                min-height: 33px;
                display: inline-block;
                label {
                    display: inline-block;
                    width: 100px;
                    text-align: right;
                    margin-right: 5px;
                }
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
                .form-item {
                    display: flex;
                    margin-bottom: 10px;
                    label {
                        display: inline-block;
                        width: 100px;
                        text-align: right;
                        margin-right: 5px;
                        line-height: 32px;
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
    }
    .searchTrans {
        height: 190px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .searchPack {
        height: 43px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .c-top-border-gray {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .c-table-top-btns {
            height: 36px;
            border-bottom: 1px solid #EEE;
            /deep/.ivu-btn-primary {
                min-width: 50px;
                background-color: #576374;
                border: none;
                color: #fff;
                font-size: 12px;
                height: auto;
                // padding: 4px 12px;
                border-radius: 3px;
            }
        }
        .check-btn {
            color: rgb(75, 126, 254);
            margin: 0px 10px 0px 0px;
        }
    }
    .page{
        text-align: right;
        margin-top: 10px;
    }
}
</style>