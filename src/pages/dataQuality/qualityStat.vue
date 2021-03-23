<template>
    <div class="quality-box" :style="{height: height+'px'}">
        <div class="quality-search">
            <div class="search-main">
                <div class="form-item">
                    <label>区域位置：</label>
                    <TreeSelect v-model="areaLocation" :max-tag-count="2" multiple :data="areaData" v-width="200" />
                </div>
                <div class="date-step">
                    <label>起始时间：</label>
                    <DatePicker type="date" v-model="endTime" 
                          :readonly="false"
                        format="yyyy-MM-dd  HH:mm:ss" style="width:200px"  @on-change="getTime">
                    </DatePicker>
                    <div class="date-step-icon">
                        <Icon type="md-arrow-dropleft-circle" @click="dataMinus()" />
                        <Icon type="md-arrow-dropright-circle" @click="datePlus()" />
                    </div>
                    <label>时间跨度：</label>
                    <Select v-model="date" style="width:70px" @on-change="spacingChange">
                        <Option v-for="item in dateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="search-btn">
                    <Button size="small" type="primary" @click="search()">搜索</Button>
                    <Button size="small" class="reset">重置</Button>
                </div>
            </div>
        </div>
        <div class="quality-border">
            <div class="box">
                <div class="title">总体评价</div>
                <div class="content">
            
                </div>
            </div>
            <ul class="evaluate-list">
                <li>
                    <div class="content">
                        <span class="evaluate-result"></span>
                        <div class="right-content">
                            <span class="title">准确性</span>
                            <div title="%" class="evaluate-index ell">%</div>
                        </div>
                    </div>
                    <p>准确数据量/实际总数据量</p>
                </li>
                <li>
                    <div class="content">
                        <span class="evaluate-result"></span>
                        <div class="right-content">
                            <span class="title">完整性</span>
                            <div title="%" class="evaluate-index ell">%</div>
                        </div>
                    </div>
                    <p>实际数据量/理论数据量</p>
                </li>
                <li>
                    <div class="content">
                        <span class="evaluate-result"></span>
                        <div class="right-content">
                            <span class="title">及时性</span>
                            <div title="%" class="evaluate-index ell">%</div>
                        </div>
                    </div>
                    <p>平均采集延时</p>
                </li>
                <li>
                    <div class="content">
                        <span class="evaluate-result"></span>
                        <div class="right-content">
                            <span class="title">一致性</span>
                            <div title="%" class="evaluate-index ell">%</div>
                        </div>
                    </div>
                    <p>一致数据量/实际总数据量</p>
                </li>
            </ul>
            <div class="box">
                <div class="title">样本占比</div>
                <Circle :percent="80" dashboard style="width:60px;height:60px;position:absolute;top:18px;left:50px">
                    <span class="demo-circle-inner" style="font-size:12px">80%</span>
                </Circle>
                <div class="right-content-box">
                    <div class="first">
                        <i></i>
                        <span class="label">总数</span>
                        <span class="num" style="color:#4b7efe">{{statisticsData.totalSample}}</span>
                    </div>
                     <div class="first">
                        <i style="background:#f0a33f"></i>
                        <span class="label">样本数</span>
                        <span class="num" style="color:#f0a33f"> {{statisticsData.calcedSample}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="quality-border">
            <div class="c-table-top-btns">
                <Button>重新计算</Button>
                <Button @click="goRecount">重算日志</Button>
            </div>
            <Table ref="selection" :columns="columns" :data="data">
                <!-- <template slot-scope="{ row }" slot="name">
                    <i class="icon iconfont icon-shuju"></i>
                    <span class="ivu-ml-8">{{ row.name }}</span>
                </template> -->
            </Table>
        </div>
    </div>
</template>
<script>
import { regionalCon,getTable,getStat} from '@api/dataQuality/quality';
import createTree from '@/libs/public-util'
export default {
    name: 'qualityStat',
    data() {
        return {
            height: '',
            areaLocation: [],
            areaData: [],
            date: '0',
            dateList: [
                {
                    value: '0',
                    label: '天'
                },{
                    value: '1',
                    label: '周'
                },{
                    value: '2',
                    label: '月'
                },{
                    value: '3',
                    label: '年'
                }
            ],
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序号',
                    type: 'index'
                },
                {
                    title: '测点名称',
                    key: 'mpointName',
                    render: (h, params) => {
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type: 'icon iconfont icon-shuju'
                                },
                                style:{
                                    color:'blue',
                                    cursor: 'pointer',
                                    marginRight: '5px',
                                    fontSize:'18px'
                                },
                                on: {
                                    click: () => {
                                        this.stars(params.index, params)
                                    }
                                }
                            }),
                            h('span', params.row.mpointName)
                        ]);
                    }
                },
                {
                    title: '区域位置',
                    key: 'siteName'
                },
                {
                    title: '数据量',
                    key: 'mpointQuantity'
                },
                {
                    title: '准确性',
                    key: 'accuracy'
                },
                {
                    title: '完整性',
                    key: 'completeness'
                },
                {
                    title: '及时性',
                    key: 'timeliness'
                },
                {
                    title: '一致性',
                    key: 'consistency'
                },
                {
                    title: '所属设备',
                    key: 'equName'
                },
                {
                    title: '统计时间',
                    key: 'calcTime'
                }
            ],
            data: [
            ],
            startTime:'',
            start:'',
            endTime:'',
            end:'',
            statisticsData:{}
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getRegional()
        this.startTime=this.getBeforeDate(2)
        this.endTime = this.getBeforeDate(1)+"00:00:00"
        this.start = this.getBeforeDate(2)
        this.end = this.getBeforeDate(1)
        this.getData()
        this.getStat()
        
    },
    methods: {
        goRecount() {
            this.$router.push({path: '/stat/recountLog'})
        },
        // 按天获取默认时间
        getDate(nowDate,num) {
            num= Number(num)
            console.log(nowDate)
            const year = nowDate.getFullYear();
            const month = nowDate.getMonth() + 1;
            console.log(month)
            const d1 = nowDate.getDate();
            const d = nowDate.getDate()-1;
            let day1
            let day
            // if (month >= 1 && month <= 9) {
            //     month = "0" + month;
            // }
            if (d1 >= 0 && d1 <= 9) {
                day1 = "0" + d1
            } else {
                day1 = d1
            }
            if (d >= 0 && d <= 9) {
                day = "0" + d
            } else {
                day = d
            }
           
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
        // 获取指定日期得前几天
        getNextDate(date,day) {  
            var dd = new Date(date);
            dd.setDate(dd.getDate() + day);
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
            var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
            return y + "-" + m + "-" + d;
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
        getTime(e){
            let current = e.slice(0,10)
            console.log(current)
            this.start = this.getNextDate(current,-1)
            let year=current.slice(0,4)
            let month = current.slice(5,7)
            if(this.date == 0){
               this.end = current
            }else if(this.date == 1){
               this.end = this.getNextDate(this.start,7)
            }else if(this.date ==2){
                this.end = this.getNextDate(this.start,this.getDay(year,month+1))
            }else{
                let remain =this.start.slice(5,10)
                this.end = Number(year)+1 +"-" +remain
            }
        },
        search(){
            console.log(this.date)
            this.getData()
            this.getStat()
        },
        dataMinus(){
            if(this.date==0){
               this.start = this.getNextDate(this.start,-1)
               this.end = this.getNextDate(this.end,-1)
               this.endTime = this.getNextDate(this.end,0) +"00:00:00"
            }else if(this.date == 1){
                console.log(this.end)
                this.end = this.getNextDate(this.end,-7)
                this.start = this.getNextDate(this.start,-7)
                this.endTime = this.getNextDate(this.start,1) +"00:00:00"
            }else if(this.date == 2){
                var dd = new Date(this.end);
                dd.setDate(dd.getDate()-this.getDay(dd.getFullYear(),dd.getMonth()+1));
                let year = dd.getFullYear()
                let month = dd.getMonth()+ 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
                let date= dd.getDate()< 10 ? "0" + dd.getDate() : dd.getDate();
                this.end = year +"-"+month+"-"+date
                this.endTime = this.getNextDate(this.end,-this.getDay(year,month)+1) +"00:00:00"
                this.start = this.getNextDate(this.end,-this.getDay(year,month))
                console.log(this.end)
                console.log(this.start)
            }else{
              let year = this.end.slice(0,4)
              let preYear = year-1
              let remain = this.end.slice(4,)
              this.end = preYear+remain
              this.start = (preYear-1)+remain
              this.endTime =this.getNextDate((year-1) +remain,1)+"00:00:00"
              console.log(this.endTime)
            }
        },
        datePlus(){
            if(this.date==0){
               this.start = this.getNextDate(this.start,1)
               this.end = this.getNextDate(this.end,1)
               this.endTime = this.getNextDate(this.end,0) +"00:00:00"
            }else if(this.date == 1){
                 this.end = this.getNextDate(this.end,7)
                this.start = this.getNextDate(this.start,7)
                this.endTime = this.getNextDate(this.start,1) +"00:00:00"
            }else if(this.date == 2){
                var dd = new Date(this.end);
                let dMonth = dd.getMonth()+1+1
                if(dMonth>12){
                    dMonth = dMonth -12
                }
                dd.setDate(dd.getDate()+this.getDay(dd.getFullYear(),dMonth));
                let year = dd.getFullYear()
                let month = dd.getMonth()+ 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
                let date= dd.getDate()< 10 ? "0" + dd.getDate() : dd.getDate();
                this.end = year +"-"+month+"-"+date
                this.endTime = this.getNextDate(this.end,-this.getDay(year,month)+1) +"00:00:00"
                // this.start = this.getNextDate(this.end,-this.getDay(year,month))
                // console.log(this.start)
                console.log(this.end)
            }else{
                let year = this.end.slice(0,4)
                let nextYear = Number(year)+1
                let remain = this.end.slice(4,)
                this.end = nextYear+remain
                this.start =(nextYear-1)+remain
                this.endTime = this.getNextDate(this.start,1) +"00:00:00"
                console.log(this.start)
                console.log(this.end)
            }
        },
        getData(){
            getTable(this.start,this.end).then(res=>{
                // console.log(res)
                if(res.data){
                    this.data = res.data
                }
            })
        },
        getStat(){
            getStat(this.start,this.end).then(res=>{
               console.log(res)
               this.statisticsData =res.data
            })
        },
        spacingChange(){
            let nowDate = new Date()
            let year = nowDate.getFullYear();
            let month = nowDate.getMonth() + 1;
            let week = nowDate.getDay()
            if(this.date == 3){
               this.start = (year-1) +'-12-31'
               this.end = year +'-12-31'
               this.endTime = year +'-01-01 00:00:00'
            }else if(this.date ==2){
               let preMonth = month-1
               preMonth=preMonth <10 ?'0'+preMonth:preMonth
               this.start = year +'-'+preMonth +'-' +this.getDay(year,month-1)
               this.end = year +'-'+ month+'-'+ this.getDay(year,month)
               this.endTime =year +'-'+ month+'-01 00:00:00'
               
            }else if(this.date ==1){
               this.start = this.getBeforeDate(8)
               this.end =this.getBeforeDate(1)
               this.endTime = this.getBeforeDate(7)+"00:00:00"
            }else{
                this.endTime = this.getBeforeDate(1)+"00:00:00"
                this.start = this.getBeforeDate(2)
                this.end = this.getBeforeDate(1)
            }
        },
        getDay(year,month){
            let day ;
                if(month == 1 || month ==3 || month ==5 ||month ==7 ||month ==8 ||month==10||month==12){
                    day = 31
                }else if(month ==2){
                    if(year%4==0&&year%100!=0||year%400==0){
                        day =29
                    }else{
                        day = 28
                    }
                }else{
                    day =30
                }
            return day;
        }
    }
}
</script>
<style lang="less" scoped>
.quality-box {
    margin: 5px;
    background: #fff;
    .quality-search {
        padding: 5px;
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
                /deep/.ivu-select-selection {
                    height: 33px;
                }
            }
            .date-step {
                display: inline-block;
                margin-left: 40px;
                .date-step-icon {
                    display: inline-block;
                    vertical-align: middle;
                    margin: 0 5px;
                    /deep/.ivu-icon {
                        font-size: 22px;
                        color: rgb(75, 126, 254);
                        margin: 0 5px;
                    }
                }
            }
            .search-btn {
                float: right;
                margin-top: 4px;
                /deep/.ivu-btn {
                    font-size: 13px;
                    margin: 0 5px;
                    height: auto;
                    padding: 2px 12px;
                }
                .reset {
                    color: #fff;
                    background: #5a6779;
                }
            }
        }
    }
    .quality-border {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .box {
            width: 20%;
            color: #576374;
            background-color: #f1f3f8;
            display: inline-block;
            vertical-align: top;
            position: relative;
            .title {
                height: 80px;
                width: 40px;
                word-break: break-all;
                line-height: 20px;
                padding-left: 15px;
                padding-right: 10px;
                margin-top: 8px;
                margin-bottom: 8px;
                font-size: 12px;
                color: #333E4E;
                border-right: 1px solid #e4e9f1;
            }
            .content {
                position: absolute;
                height: 96px;
                display: inline-block;
                left: 50px;
                right: 0;
                top: 0;
            }
        }
        .evaluate-list {
            display: inline-block;
            width: 58%;
            margin: 0 0.5%;
            background-color: #f1f3f8;
            overflow: hidden;
            height: 96px;
            vertical-align: top;
            li {
                list-style: none;
                float: left;
                width: 25%;
                position: relative;
                text-align: center;
                .content {
                    min-width: 120px;
                    height: 57px;
                    margin: 8px auto 0;
                    .evaluate-result {
                        display: inline-block;
                        width: 36px;
                        height: 36px;
                        border-radius: 18px;
                        text-align: center;
                        line-height: 36px;
                        font-size: 16px;
                        margin: 10px 10px 10px 0px;
                    }
                    .right-content {
                        display: inline-block;
                        vertical-align: top;
                        margin-top: 10px;
                        text-align: left;
                        .title {
                            color: #333E4E;
                        }
                        .evaluate-index {
                            font-size: 16px;
                            font-weight: bold;
                            height: 22px;
                            line-height: 22px;
                            width: 95px;
                            color: #333E4E;
                        }
                    }
                }
                p {
                    font-size: 10px;
                    color: #686F7B;
                }
            }
            li:before {
                content: "";
                position: absolute;
                left: 0;
                top: 18px;
                height: 60px;
                width: 1px;
                background-color: #e4e9f1;
            }
        }
        .c-table-top-btns {
            height: 36px;
            border-bottom: 1px solid #EEE;
            /deep/.ivu-btn {
                background-color: #576374;
                height: auto;
                color: #fff;
                padding: 4px 12px;
                font-size: 13px;
                margin-right: 5px;
            }
        }
    }
    .ell {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .right-content-box{
        position: absolute;
        right: 50px;
        top: 26px;
        .first{
            i{
                display: inline-block;
                width:10px;
                height: 10px;
                border-radius: 50%;
                background: #4b7efe;
            }
            .label{
                display: inline-block;
                width: 40px;
                margin: 0 5px;
                font-size: 12px;
            }
        }
    }
}
</style>