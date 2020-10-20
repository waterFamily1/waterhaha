<template>
    <div class="site-box" :style="{height: height+'px'}">
       <div class="search-box">
          <div class="form-item">
              <span>时间：</span>
              <DatePicker type="date" :options="startDate" v-model="startTime" @on-change="startTimeChange"  format="yyyy-MM-dd"  placeholder="开始时间" style="width: 120px" size="small"></DatePicker> -
              <DatePicker type="date" :options="endDate"  v-model="endTime" @on-change="endTimeChange" format="yyyy-MM-dd" placeholder="结束时间" style="width: 120px" size="small"></DatePicker>
          </div>
          <div class="form-item">
              <span>状态：</span>
              <Select  style="width:auto;min-width:200px;max-width:450px" multiple placeholder="请选择" v-model="state" size="small">
                <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.name }}</Option>
              </Select>
          </div>
          <div class="form-search-btn">
              <button type="button" @click="search()">搜索</button>
              <button type="button" class="reset" @click="reset()">重置</button>
          </div>
       </div>
       <div class="site-content">
         <div class="c-table-top-btns">
            <!-- <button type="button" @click="fileUpload()"> </button> -->
            <Button >
                <Upload
                :before-upload="fileUpload"
                action="" 
                :format ="['xlsx','xls']"
                accept=".xlsx ,.xls"
                >
                    文件上传
                </Upload>
            </Button>
            <button type="button" style="margin-left:10px" @click="templateDownload()">模版下载</button>
         </div>
         <div class="table-wrapper" :style="{height: (height-45)+'px'}">
            <Table stripe size="small" :columns="siteTableList" :data="siteTableData">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <a :href="row.templeDownload"  :download="row.templeDownload">下载文件</a>
                </template>
            </Table>
                <Page :total="total" show-elevator show-total class="page" @on-change="changeSize" />
        </div>
       </div>
    </div>
</template>
<script>
import { getTable,searchTable,uploadFun } from '@/api/dataManage/import'
import {formatTime} from '@/libs/public'
export default {  
    name:'siteDataImport',  
    data(){
      return {
          height:'',
          stateList:[
            {
                name:'等待中',
                value:0
            },
            {
                name:'导入中',
                value:1
            },
             {
                name:'部成',
                value:2
            },
             {
                name:'成功',
                value:3
            },
             {
                name:'中止',
                value:4
            }, {
                name:'失败',
                value:5
            }
          ],
          siteTableList: [
                {
                    title: '状态',
                    key: 'statusName'
                },
                {
                    title: '时间',
                    key: 'createTime'
                },
                {
                    title: '时长',
                    key: 'importDuration'
                },
                {
                    title: '备注',
                    key: 'memo'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
        siteTableData: [],
        startTime:'',
        endTime:'',
        start:'',
        end:'',
        total:0,
        state:[],
        startDate: {
            disabledDate (date) {
                return date && date.valueOf() >= Date.now();
            }
        },
        endDate: {
            disabledDate (date) {
                return date && date.valueOf() < Date.now() - 8*86400000;
            }
        },
      }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.startTime=this.getBeforeDate(7)
        this.endTime = this.getBeforeDate(0)
        this.start = this.getBeforeDate(8)
        this.end = this.getBeforeDate(0)
        this.getData(1)
    },
   
    methods:{
        fileUpload(file){
            let formData = new FormData()
            formData.append('file', file)
            uploadFun(formData).then(res=> {
                console.log(res)
                if(res.data.id){
                     this.getData(1)
                }
                // this.areaList.imageUrl = res.data.fullPath
            }).catch(err => {
                // 异常情况
            })       
        },
        templateDownload(){

        },
        getBeforeDate(days){
            var now=new Date().getTime();
                var ago=now-86400000*days;//一天的毫秒数为86400000
                var agoData= new Date(ago);
                var year = agoData.getFullYear();
                var mon = agoData.getMonth() + 1;
                var day = agoData.getDate();
                mon=mon<10? '0'+mon:mon;
                day=day<10? '0'+day:day;
                var date=year+'-'+mon+'-'+day;
            return date;
        },
        getData(page){
            getTable(this.start,this.end,page).then(res=>{
                console.log(res)
                if(res.data){
                    let data = res.data.items
                     data.forEach(ele=>{
                        ele.createTime = formatTime(ele.createTime, 'HH:mm:ss yyyy-MM-dd')
                        this.stateList.forEach(item=>{
                            // console.log(item.value == ele.status)
                            if(item.value == ele.status){
                                ele.statusName = item.name
                            }
                        })
                    })
                    this.siteTableData = data
                    this.total = res.data.total
                }

            })
        },
        search(){
            if(this.state.length ==0 ){
                this.getData(1)
            }else{
                this.searchTable(1,this.state.join(','))
            }
        },
        searchTable(page,status){
            searchTable(this.start,this.end,page,status).then(res=>{
                console.log(res)
                if(res.data){
                    let data = res.data.items
                     data.forEach(ele=>{
                        ele.createTime = formatTime(ele.createTime, 'HH:mm:ss yyyy-MM-dd')
                        this.stateList.forEach(item=>{
                            // console.log(item.value == ele.status)
                            if(item.value == ele.status){
                                ele.statusName = item.name
                            }
                        })
                    })
                    this.siteTableData = data
                    this.total = res.data.total
                }
            })
        },
        changeSize(size){
            this.searchTable(size,this.state.join(','))
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

        endTimeChange(date){
            this.endTime = date
        },
        startTimeChange(date){
            this.startTime = date
            this.start = this.getYesterday(date)
            console.log(this.startTime)
        },
        reset(){
            this.startTime=this.getBeforeDate(7)
            this.endTime = this.getBeforeDate(0)
            this.start = this.getBeforeDate(8)
            this.end = this.getBeforeDate(0)
            this.state = []
        }

    }
}
</script>
<style lang="less" scoped>
.site-box{
    margin: 5px;
    background: #fff;
    /deep/.ivu-input{
      font-size: 13px;
    }
    .search-box{
      padding:5px;
      border-radius: 3px;
        .form-item{
            display: inline-block;
            span{
                display: inline-block;
                width: 100px;
                text-align: right;
            }
        }
        .form-search-btn {
            display: inline-block;
            float: right;
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
    .site-content{
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .c-table-top-btns {
            height: 36px;
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
/deep/.ivu-btn{
    height: 26px;
}
/deep/.ivu-btn > span{
    height: 13px;
}
</style>