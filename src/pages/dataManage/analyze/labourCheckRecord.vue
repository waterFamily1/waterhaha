<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="index-search" :class="{searchTrans:searchShow, searchPack:!searchShow}">
           <div class="user-title">
                <h3>查看记录</h3>
                <div>
                    <Button type="primary" size="small" style="background:#c8c8c8" @click="cancel()">返回</Button>
                </div>
            </div>
        </div>
        <div class="index-content">
            <div class="c-table-top-btns">
                <div>
                    <button type="button" @click="addNew()">新增</button>
                    <button type="button" @click="deleteNew()" style="margin-left:10px">删除</button>
                </div>
                <div class="time">
                    <span>业务时间：</span>
                    <DatePicker type="date"  @on-change="startTimeChange" :options="startDate" format="yyyy-MM-dd"  v-model="startTime" placeholder="开始日期" style="width: 186px" size="small"></DatePicker> -
                    <DatePicker type="date"  @on-change="endTimeChange" :options="endDate" format="yyyy-MM-dd"  v-model="endTime" placeholder="结束日期" style="width: 186px" size="small"></DatePicker>
                </div>
            </div>
            <div class="table-wrapper" :style="{height: (height-45)+'px'}">
                <Table stripe :columns="tableList" :data="tableData" size="small" 
                        @on-select="handleSelect"
                        @on-select-cancel="handleSelectCancel"
                        @on-select-all="handleSelectAll"
                        @on-select-all-cancel="handleSelectAllCancel">>
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" size="small" style="margin-right: 5px;" @click="check(row)">查看</Button>
                        <Button class="action" size="small" @click="edit(row)">编辑</Button>
                    </template>
                </Table>
                 <Page :total="total" show-elevator show-total class="page" @on-change="changeSize" />
            </div>
        </div>
    </div>
</template>
<script>
import { checkRecord,deleteRecord,recordByTime} from '@api/dataManage/labour';
import createTree from '@/libs/public-util'
import {formatTime} from '@/libs/public'
export default {
    name: 'labourCheckRecord',
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
                    title: '业务时间',
                    key: 'recordDate'
                },
                {
                    title: '最近录入人',
                    key: 'updateUserName'
                },
                {
                    title: '最近录入时间',
                    key: 'updateTime'
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
            tableData:[],
            total:0,
            startDate: { },
            endDate: {},
            selectedData: [],
            id:'',
            cycleId:''
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.id = this.$route.query.id
        this.cycleId = this.$route.query.cycleId
        this.getRecord()
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
            this.$router.push({
                 path:'/analyze/labourLogData',
                 query : {
                     id: this.id,
                     cycleId: this.cycleId
                 }
            })
        },
       
        startTimeChange(day){
            this.start = day
          
            this.endDate = {
                disabledDate (date) {
                    return date && date.valueOf() <new Date(day).getTime();
                }
            }
            this.getRecordByTime()
        },
        endTimeChange(day){
            this.end = day
            this.startDate = {
                disabledDate (date) {
                    return date && date.valueOf() >new Date(day).getTime();
                }
            }
            this.getRecordByTime()
        },
        getRecordByTime(){
            let start = this.start?this.getYesterday(this.start)+'T16:00:00.000Z':''
            let end = this.end?this.end+'T15:59:59.000Z':''
           recordByTime(this.id,'',1,start,end).then(res=>{
              console.log(res)
              this.tableData = res.data.items
              let arr = res.data.items
              arr.forEach(ele=>{
                  ele.recordDate = formatTime(ele.recordDate, 'yyyy-MM-dd HH:mm')
                  ele.updateTime = formatTime(ele.updateTime,'yyyy-MM-dd')
              })
              this.total = res.data.total
           })
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
               deleteRecord(arr.join(',')).then(res=>{
                   console.log(res)
                   if(res.data.count){
                       this.$Message.success('数据删除成功');
                       this.getRecord()
                   }
               })
            }
           
        },
        changeSize(){

        },
        getRecord(){
           checkRecord(this.id,'',1).then(res=>{
              console.log(res)
              this.tableData = res.data.items
              let arr = res.data.items
              arr.forEach(ele=>{
                  ele.recordDate = formatTime(ele.recordDate, 'yyyy-MM-dd HH:mm')
                  ele.updateTime = formatTime(ele.updateTime,'yyyy-MM-dd')
              })
              this.total = res.data.total
           })
        },
        check(row){
            this.$router.push({
                 path:'/analyze/labourLogData',
                 query : {
                     id: this.id,
                     cycleId: this.cycleId,
                     date : row.recordDate.slice(0,10),
                     check:true
                 }
            })
        },
        edit(row){
            this.$router.push({
                 path:'/analyze/labourLogData',
                 query : {
                     id: this.id,
                     cycleId: this.cycleId,
                     date : row.recordDate.slice(0,10),
                     check:false
                 }
            })
        },
        cancel(){
            this.$router.go(-1)
        },
         // 获取前一天
        getYesterday(date) {
            var date = date.split('-'),
            today = new Date().setFullYear(+date[0], +date[1]-1, +date[2]), 
            yesterday = new Date(today - 24 * 60 * 60 * 1000);
            var y = yesterday.getFullYear();
            var m = yesterday.getMonth() + 1;
            var d = yesterday.getDate();
            if(m<10){
            m = '0'+m;   
            }
            if(d<10){
                d = '0'+d; 
            }
        
            return y+'-'+m+'-'+d;  
        },
    }
}
</script>
<style lang="less" scoped>
.index-box {
    margin: 5px;
    background: #fff;
    .user-title{
        background: #fff;
        padding: 5px;
        h3{
            display: inline-block;
            line-height: 30px;
            text-indent: 10px;
        }
        div{
            margin-top: 2px;
            float: right;
            button{
                min-width: 70px;
                margin: 0 5px;
                color: #fff;
                border: 0;
                font-size: 12px;
            }
        }
    }
    .index-content {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .c-table-top-btns {
            height: 36px;
            border-bottom: 1px solid #EEE;
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            border-bottom: 1px solid #EEE;
            button{
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
            margin-top: 8px;
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