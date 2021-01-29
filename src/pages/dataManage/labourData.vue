<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="index-search" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>关键字：</label>
                    <Input v-model="keyword" placeholder="录入名称" style="width: 150px" size="small" />
                </div>
                <div class="form-item">
                    <label>区域位置：</label> 
                   <TreeSelect v-model="areaLocation" size="small" multiple  :data="areaData" v-width="200" />
                </div>
                <div class="form-search-btn">
                    <a href="javascript:;" @click="higherSearch()">
                        <Icon type="ios-arrow-up" v-if="searchShow"/>
                        <Icon type="ios-arrow-down" v-else />
                        高级搜索
                    </a>
                    <Button @click="search()">搜索</Button>
                    <Button class="reset" @click="reset()">重置</Button>
                </div>
            </div>
            <div class="c-adv-search">
                <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>业务时间：</label>
                        <div class="cmp-tab">
                           <DatePicker type="date"  @on-change="startTimeChange" :options="startDate" format="yyyy-MM-dd"  v-model="startTime" placeholder="开始日期" style="width: 190px"></DatePicker> -
                           <DatePicker type="date"  @on-change="endTimeChange" :options="endDate" format="yyyy-MM-dd"  v-model="endTime" placeholder="结束日期" style="width: 190px"></DatePicker>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="index-content">
            <div class="c-table-top-btns">
                <Button @click="addNew()">新增</Button>
                 <Button @click="deleteNew()" style="margin-left:10px">删除</Button>
            </div>
            <div class="table-wrapper" :style="{height: (height-45)+'px'}">
                <Table stripe :columns="tableList" :data="tableData"
                        @on-select="handleSelect"
                        @on-select-cancel="handleSelectCancel"
                        @on-select-all="handleSelectAll"
                        @on-select-all-cancel="handleSelectAllCancel">>
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" size="small" style="margin-right: 5px;" @click="logData(row)">录入数据</Button>
                        <Button class="action" size="small" style="margin-right: 5px;" @click="checkRecord(row)">查看记录</Button>
                        <Button class="action" size="small" @click="checkForm(row.id)">查看表单</Button>
                    </template>
                </Table>
                 <Page :total="total" show-elevator show-total class="page" @on-change="changeSize" />
            </div>
        </div>
    </div>
</template>
<script>
import { regionalCon,getTable,deleteLabour} from '@api/dataManage/labour';
import createTree from '@/libs/public-util'
import {formatTime} from '@/libs/public'
export default {
    name: 'labourData',
    data() {
        return {
            height: '',
            keyword: '',
            areaLocation:[],
            searchShow: false,
            typeCheckedAll: false,
            typeBox: [],
            tableList: [
                {
                    type: 'selection',
                    width: 70,
                    align: 'center'
                },
                {
                    title: '区域位置',
                    key: 'siteName'
                },
                {
                    title: '录入名称',
                    key: 'formName'
                },
                {
                    title: '录入周期',
                    key: 'cycleName'
                },
                {
                    title: '最近业务时间',
                    key: 'formLatestdate',
                },
                {
                    title: '最近录入时间',
                    key: 'updateTime',
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center'
                }
            ],
            startTime:'',
            endTime:'',
            start:'',
            end:'',
            areaData:[],
            baseData:[],
            areaName:[],
            tableData:[],
            total:0,
            startDate: { },
            endDate: {},
            selectedData: [],
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getRegional()
        this.getData('','','','',1,'')
    },
    methods: {
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
        addNew() {
             this.$router.push({path:'/analyze/labourAdd'})
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
                this.baseData = treeItem
                this.areaData= createTree(treeItem, 0)
            }).catch(err => {
                // 异常情况
            })
        },
        getData(siteId,queryName,begin,end,page,siteName){
            let start = begin?begin+"T16:00:00.000Z":''
            let endS = end?end+"T15:59:59.000Z":""
            getTable(siteId,queryName,start,endS,page,siteName).then(res=>{
                console.log(res)
                let data= res.data.items
                data.forEach(ele=>{
                    ele.formLatestdate= formatTime(ele.formLatestdate, 'HH:mm:ss yyyy-MM-dd')
                    ele.updateTime = formatTime(ele.updateTime, 'HH:mm:ss yyyy-MM-dd')
                })
                this.tableData = data
                this.total = res.data.total
            })
        },
        search(){
            this.baseData.forEach(ele => {
                this.areaLocation.forEach(item=>{
                    if(item == ele.id){
                        this.areaName.push(ele.name)
                    }
                })
            });
            this.getData(this.areaLocation.join(','),this.keyword,this.start,this.end,1,this.areaName.join(','))
        },
        changeSize(size){
            this.getData(this.areaLocation.join(','),this.keyword,this.start,this.end,size,this.areaName.join(','))
        },
        startTimeChange(day){
           this.start = day
           this.endDate = {
                disabledDate (date) {
                    return date && date.valueOf() <new Date(day).getTime();
                }
           }
        },
        endTimeChange(day){
            this.end = day
            this.startDate = {
                disabledDate (date) {
                    return date && date.valueOf() >new Date(day).getTime();
                }
           }
        },
        // 清空所有已选项
        handleClearSelect (status) {
            this.selectedData = [];
            this.$refs.selection.selectAll(status);
        },
        // 选中一项，将数据添加至已选项中
        handleSelect (selection, row) {
            this.selectedData.push(row);
        },
        // 取消选中一项，将取消的数据从已选项中删除
        handleSelectCancel (selection, row) {
            const index = this.selectedData.findIndex(item => item.id === row.id);
            this.selectedData.splice(index, 1);
        },
        // 当前页全选时，判断已选数据是否存在，不存在则添加
        handleSelectAll (selection) {
            selection.forEach(item => {
                if (this.selectedData.findIndex(i => i.id === item.id) < 0) {
                    this.selectedData.push(item);
                }
            });
        },
        // 取消当前页全选时，将当前页的数据（即 modelData）从已选项中删除
        handleSelectAllCancel () {
            const selection = this.modelData;
            selection.forEach(item => {
                const index = this.selectedData.findIndex(i => i.id === item.id);
                if (index >= 0) {
                    this.selectedData.splice(index, 1);
                }
            });
        },
        deleteNew(){
            console.log(this.selectedData)
            if(this.selectedData.length == 0){
                this.$Message.warning('请选中后删除');
            }else{
                let arr = []
                this.selectedData.forEach(ele=>{
                    arr.push(ele.id)
                    console.log(arr)
               })
               deleteLabour(arr.join(',')).then(res=>{
                   console.log(res)
                   if(res.data.count){
                       this.$Message.success('数据删除成功');
                       this.getData('','','','',1,'')
                   }
               })
            }
           
        },
        checkForm(id){
            this.$router.push({
                 path:'/analyze/labourCheckForm',
                 query : {
                     id: id
                 }
            })
        },
        checkRecord(row){
            this.$router.push({
                 path:'/analyze/labourCheckRecord',
                 query : {
                     id: row.id,
                      cycleId: row.cycleId
                 }
            })
        },
        logData(row){
            console.log(row)
             this.$router.push({
                 path:'/analyze/labourLogData',
                 query : {
                     id: row.id,
                     cycleId: row.cycleId
                 }
            })
        },
        reset(){
            this.keyword = ""
            this.areaLocation = []
            this.startTime = ""
            this.endTime = ""
            this.start = ""
            this.end = ""
            this.endDate=""
            this.startDate=""
            this.getData('','','','',1,'')
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