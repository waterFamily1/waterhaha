<template>
    <div class="absent-wrap" :style="{height: height+'px'}">
        <div class="search-box" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>关键字：</label>
                    <Input v-model="searchList.name" placeholder="缺陷类型/编号" style="width: 300px;"></Input>
                </div>
                <div class="form-item">
                    <label>所属组织：</label>
                    <TreeSelect v-model="searchList.organize" multiple :data="orgData" v-width="200" />
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
                        <label>创建时间：</label>
                        <DatePicker type="date"  placement="bottom-end"  @on-change="startTimeChange" :options="startDate" format="yyyy-MM-dd"  v-model="startTime" placeholder="开始日期" style="width: 190px"></DatePicker> -
                        <DatePicker type="date"  placement="bottom-end"  @on-change="endTimeChange" :options="endDate" format="yyyy-MM-dd"  v-model="endTime" placeholder="结束日期" style="width: 190px"></DatePicker>
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
                    <div class="form-item">
                        <label>级别：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="level">
                                <TagSelectOption name="1">严重</TagSelectOption>
                                <TagSelectOption name="2">一般</TagSelectOption>
                                <TagSelectOption name="3">轻微</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="c-top-border-gray">
            <div class="c-table-top-btns">
                <button @click="declareHandle()">缺陷申报</button>
            </div>
            <Table stripe :columns="columns" :data="data">
                <template slot-scope="{ row, index }" slot="action">
                    <a class="check-btn" src="javascript:;" @click="checkHandle(row)">查看</a>
                </template>
            </Table>
            <Page :total="total" show-elevator show-total class="page" @on-change="changeSize" />
        </div>
    </div>
</template>
<script>
import { getOrg,defectList} from '@api/defect/task';
import createTree from '@/libs/public-util'
import {formatTime} from '@/libs/public'
export default {
    name: 'absentTask',
    data() {
        return {
            height: '',
            searchShow: false,
            searchList: {
                name: '',
                organize: []
            },
            organizeList: [
                {
                    value: '0',
                    label: '联泰潮英智慧水务'
                }
            ],
            state: [],
            defectType: [],
            level: [],
            columns: [
                {
                    title: '缺陷类型',
                    key: 'faultTypeName'
                }, {
                    title: '缺陷编号',
                    key: 'faultNumber'
                }, {
                    title: '相关设备',
                    key: 'equName'
                }, {
                    title: '级别',
                    key: 'severityTypeName'
                }, {
                    title: '创建人',
                    key: 'createUser'
                }, {
                    title: '创建时间',
                    key: 'createDate',
                     render: (h, params) => {
                        let that = this
                        const text = params.row.createDate
                        return h('span', {}, formatTime(text, 'HH:mm:ss yyyy-MM-dd '));
                    }
                }, {
                    title: '关闭时间',
                    key: 'name'
                }, {
                    title: '所属组织',
                    key: 'orgName'
                }, {
                    title: '当前状态',
                    key: 'stateName'
                }, {
                    title: '处理人',
                    key: 'processingPersonName'
                }, {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            data: [],
            total:0,
            orgData:[],
            startDate: {
                // disabledDate (date) {
                //     return date && date.valueOf() >= Date.now();
                // }
            },
            endDate: {
                // disabledDate (date) {
                //     return date && date.valueOf() <= Date.now()- 86400000
                // }
            },
            startTime:'',
            start:'',
            endTime:'',
            end:'',
            page:1
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getOrganizations()
        this.getList()
    },
    methods: {
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
        getList(){
            let ids = this.searchList.organize.length!=0?this.searchList.organize.join(','):''
            let states = this.state.length!=0?this.state.join(','):''
            let faultTypes = this.defectType.length!=0?this.defectType.join(','):''
            let types = this.level.length!=0?this.level.join(','):''
            let begin =this.start?this.$moment(this.start).utc().format():''
            let end  = this.end?this.$moment(this.end).utc().format():''
            // queryName,orgIds,faultTypes,states,start,end,severityTypes,page
           defectList(this.searchList.name,ids,faultTypes,states,begin,end,types,this.page).then(res=>{
               console.log(res)
               this.data = res.data.items
               this.total = res.data.total
           })
        },
        reset(){
            this.searchList.name = ""
            this.searchList.organize = []
            this.state = []
            this.defectType=[]
            this.level = []
            this.start =""
            this.end = ""
            this.startTime = ""
            this.endTime = ""
            this.page = 1
        },
        search(){
            this.getList()
        },
        changeSize(size){
            this.page = size
            this.getList()
        },
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        declareHandle() {
            this.$router.push({
                path:'defect/declare'
            })
        },
        checkHandle(row) {
            this.$router.push({
                path:'defect/detail',
                query:{
                    id:row.id
                }
            })
        },
        endTimeChange(day){
          this.end = day
        },
        startTimeChange(day){
            this.start = day
            this.endDate = {
                disabledDate (date) {
                    return date && date.valueOf() <=new Date(day).getTime()- 86400000;
                }
            }
        },
    }
}
</script>
<style lang="less" scoped>
.absent-wrap {
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
        height: 230px;
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
            button {
                min-width: 50px;
                background-color: #576374;
                border: none;
                color: #fff;
                font-size: 12px;
                height: auto;
                padding: 4px 12px;
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