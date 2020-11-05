<template>
    <div class="user-information" :style="{height: height+'px'}">
        <div class="user-title">
            <h3>人工数据采集</h3>
            <div v-if="!isCheck">
                <Button type="primary" size="small" style="background:#4b7efe" @click="save()">保存</Button>
                <Button type="primary" size="small" style="background:#c8c8c8" @click="cancel()">取消</Button>  
            </div>
            <div v-else>
                <Button type="primary" size="small" style="background:#c8c8c8" @click="back()">返回</Button>
            </div>
        </div>
        <div class="con-show">
            <div class="content">
                <Row style="height:43px">
                    <Col span="12">
                        <label for="" class="form-label">业务时间：</label>
                        <DatePicker type="date" format="yyyy-MM-dd" v-model="currentDate" 
                        placeholder="Select date" style="width: 200px"
                         size="small" @on-change="changeTime">
                        </DatePicker>
                    </Col>
                    <Col span="12">
                        <label for="" class="form-label">名称：</label>
                        <span style="font-size:13px">{{currentRecord.formName}}</span>
                    </Col>
                </Row>
                <div class="table-data">
                    <div class="" style="background:rgb(229, 232, 233)">
                        <Row style="width:320px;background:rgb(229, 232, 233)">
                            <Col span="3" style="width:100px" > 
                               <div style="height:70px;line-height:70px" class="inputHourHeader">采集时间</div>
                            </Col>
                            <Col span="8" :style="{width:autoWidth}" v-for="(item,index) in tableTitle" :key="index">
                               <div class="inputHourHeader" style="width:100%!important" >{{item }}</div>
                               <Row>
                                    <Col span="5" style="width:100px" v-for="(ele,idx) in tableCon[0]" :key="idx">
                                       <div class="inputHourHeader">{{ele.mpointName}}</div>
                                    </Col> 
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <div style="min-width: 100%;width: 320px;max-height: 347px;overflow-y: scroll;">
                        <Row v-for="(time,idx) in timeArr" :key="idx">
                            <Col span="3" style="width:100px">
                               <div class="inputHourCell">{{time.forTime }}</div>
                            </Col>
                            <Col span="8" style="width:100px" v-for="(item,index) in tableCon[0]" :key="index">
                                <Row>
                                    <Col span="5" >
                                       <div class="inputHourCell">
                                           <span v-if="isCheck">{{tableCon[0][index].datas[idx].value}}</span>
                                           <Input  v-else  style="width: 100%" size="small" class="input" v-model="tableCon[0][index].datas[idx].value" :value="tableCon[0][index].datas[idx].value" />
                                       </div>
                                    </Col> 
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            
        </div>
        
    </div>
</template>
<script>
// 
import { recordData,logSave } from '@/api/dataManage/labour'
import {formatTime} from '@/libs/public'
export default {
    name : 'labourLogData',
    data (){
        return {
            height:0,
            arr:[1],
            autoWidth:'',
            currentDate:'',
            cycleId:'',
            id:'',
            currentRecord:{},
            table:{},
            tableTitle:[],
            tableCon:[],
            timeArr:[],
            tempArr:[],
            isCheck:false
        }
    },
    mounted() {
        this.height = document.body.clientHeight-70
        this.id = this.$route.query.id
        this.cycleId = this.$route.query.cycleId
        this.isCheck = this.$route.query.check
        let date = this.$route.query.date
         if(date){
            this.currentDate  = date
            this.preDate = this.getYesterday(date)
         }else{
            let arr= this.getTime().split(",")
            this.currentDate = arr[1]
            this.preDate = arr[0]
         }
         this.getDetail()
    },
    methods:{
        getTime(){
            let now  = new Date()
            let year = now.getFullYear()
            let month = now.getMonth()+1
            month=month<10?'0'+month:month
            let day = now.getDate()
            let dayPre = now.getDate()-1
            day = day<10?'0'+day:day
             dayPre = dayPre<10?'0'+ dayPre:dayPre
            let pre = year+"-"+month+"-"+dayPre
            let today = year+"-"+month+"-"+day
            return  pre+","+today
        },
        getDetail(){
           recordData(this.id,this.preDate,this.cycleId).then(res=>{
               console.log(res)
                this.currentRecord = res.data.record
                this.table = res.data.items
                let obj = res.data.items.groups
                for(let key  in obj){
                   this.tableTitle.push(key.split(',')[1])
                   this.tableCon.push(obj[key])
                   console.log(this.tableCon)
                }
               this.autoWidth = 100* this.tableCon[0].length+"px"
               this.tableCon[0].forEach(ele => {
                   ele.datas.forEach(item=>{
                    //    console.log(item)
                       item.forTime = formatTime(item.time,'HH:mm')
                   })
               });
                console.log(this.tableCon[0])
                this.timeArr = this.tableCon[0][0].datas
           })
        },
        changeTime(date){
            this.preDate = this.getYesterday(date)
            this.tableTitle = []
            this.tableCon = []
            this.timeArr = []
            this.getDetail()
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
        save(){
            let mpoints=[]
            this.tableCon[0].forEach((ele,index)=>{
                ele.datas.forEach(item=>{
                    mpoints.push({
                        time: item.time,
                        value: item.value,
                        mpointId: ele.mpointId,
                        status: item.value?item.value:"delete",
                    })
                })
            })
             let data = {
                formId : this.id,
                recordDate:this.preDate +"T16:00:00.000Z",
                mpoints:mpoints
             }
             logSave(data).then(res=>{
                 console.log(res)
                 if(res.data.id){
                     this.$router.go(-1)
                 }
             })
        },
        back(){
            this.$router.go(-1)
        }
    }
   
}
</script>
<style lang="less" scoped>
.user-information{
    margin: 5px;
    .user-title{
        background: #fff;
        padding: 5px;
        h3{
            display: inline-block;
            line-height: 30px;
            text-indent: 10px;
        }
        div{
            float: right;
            button{
                min-width: 70px;
                margin: 0 5px;
                color: #fff;
                border: 0;
            }
        }
    }
    .con-show{
        margin-top: 5px;
        .content{
             background: #fff;
            padding: 20px;
            .form-label{
                display: inline-block;
                width: 200px;
                text-align: right;
                font-size: 13px;
            }
            .table-data{
                width: 100%;
                overflow-x: scroll;
                .inputHourHeader{
                    width: 100px!important;
                    text-align: center;
                    border-right: 1px solid #fff;
                    border-bottom: 1px solid #fff;
                    color: #000;
                    height: 35px;
                    line-height: 35px;
                }
                .inputHourCell {
                    width: 100px !important;
                    border-right: solid 1px #e5e8e9;
                    border-bottom: solid 1px #e5e8e9;
                    height: 35px;
                    line-height: 35px;
                    text-align: center;
                    .input{
                        width: 80px!important;
                    }
                 }
            }
        }
    }
}
</style>