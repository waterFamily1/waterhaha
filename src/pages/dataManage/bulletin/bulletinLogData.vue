<template>
     <div class="user-information" :style="{height: height+'px'}">
        <div class="user-title">
            <h3>简报数据采集</h3>
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
                        <label for="" class="form-label">简报名称：</label>
                        <span style="font-size:13px">{{currentRecord.formName}}</span>
                    </Col>
                </Row>
                <div v-for="(item,index) in tableTitle" :key="index"> 
                    <h3>{{item}}</h3>
                    <div v-for="(ele,idx) in tableCon[index]" :key="idx">
                        <Row  v-if="ele.textType=='single'">
                            <Col span="12">
                                <label for="">{{ele.mpointName}}</label>
                                <Input style="width:250px" size="small" v-model="ele.datas[0].value" />
                            </Col>
                        </Row>
                        <div v-else>
                            <label for="">{{ele.mpointName}}</label>
                            <Input type="textarea" style="width:925px" size="small" v-model="ele.datas[0].value" />
                        </div>
                    </div>
                   
                </div>
                 <!-- <div>
                    <h3>group2</h3>
                    
                            
                     
                </div> -->
            </div>
           
        </div>
        
    </div>
</template>
<script>
import { recordData,logSave } from '@/api/dataManage/bulletin'
// recordData
export default {
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
            console.log(arr)
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
            console.log(dayPre)
            day = day<10?'0'+day:day
            dayPre = dayPre<10?'0'+ dayPre:dayPre
            let pre = year+"-"+month+"-"+dayPre
            let today = year+"-"+month+"-"+day
            return  pre+","+today
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
        getDetail(){
            console.log(this.preDate)
            recordData(this.id,this.preDate,this.cycleId).then(res=>{
                console.log(res)
                this.currentRecord = res.data.record
                this.table = res.data.items
                let obj = res.data.items.groups
                for(let key in obj){
                    this.tableTitle.push(key.split(',')[1])
                    this.tableCon.push(obj[key])
                    console.log(this.tableCon)
                }
            })
        },
        changeTime(){

        },
         save(){
            let mpoints=[]
            console.log(this.tableCon)
            this.tableCon.map(item=>{
                console.log(item)
                item.map(ele=>{
                    console.log(ele)
                    ele.datas.map(aaa=>{
                        mpoints.push({
                            mpointId: ele.mpointId,
                            status: "",
                            textType: ele.textType,
                            time: aaa.time,
                            value: aaa.value
                        })
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
            .ivu-btn{
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
            h3{
                background: rgb(229, 232, 233);
                padding: 10px;
                margin-bottom: 10px;
            }
            label{
                display: inline-block;
                width: 250px;
                text-align: right;
                padding: 10px 12px 10px 0;
            }
        }
    }
   
}
</style>