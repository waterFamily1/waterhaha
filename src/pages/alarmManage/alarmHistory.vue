<template>
    <div class="history-wrap" :style="{height: height+'px'}">
        <div class="history-search">
            <Form :model="historyList" label-position="right" :label-width="100">
                <div class="search-box" :class="{searchTrans:searchShow, searchPack:!searchShow}">
                    <div class="search-main">
                        <div class="form-item">
                            <FormItem label="关键字:">
                                <Input v-model="historyList.name" placeholder="报警名称" style="width: 200px;"></Input>
                            </FormItem>
                        </div>
                        <div class="form-item">
                             <label style="display:inline-block;width:120px;text-align:right">区域位置：</label> 
                             <TreeSelect size="small" v-model="historyList.area" multiple :data="treeData" v-width="200" />
                        </div>
                        <div class="form-search-btn">
                            <a href="javascript:;" @click="higherSearch()">
                                <Icon type="ios-arrow-down" v-if="searchShow" />
                                <Icon type="ios-arrow-up" v-else />
                                高级搜索
                            </a>
                            <Button type="primary" @click="search()">搜索</Button>
                            <Button type="primary" class="reset" @click="reset()">重置</Button>
                        </div>
                    </div>
                    <div class="c-adv-search">
                        <div class="c-adv-search-row">
                            <div class="form-item">
                                <FormItem label="确认状态:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="confirmState">
                                            <TagSelectOption name="Unremove">未解除</TagSelectOption>
                                            <TagSelectOption name="Remove">已解除</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label="确认方法:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="confirmWay">
                                            <TagSelectOption name="Auto">自动</TagSelectOption>
                                            <TagSelectOption name="AutoOrManual">自动或者人工</TagSelectOption>
                                            <TagSelectOption name="Manual">人工</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label="报警等级:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="alarmLevel">
                                            <TagSelectOption name="1">1级</TagSelectOption>
                                            <TagSelectOption name="2">2级</TagSelectOption>
                                            <TagSelectOption name="3">3级</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label="发生时间:">
                                    <div class="cmp-tab">
                                        <div class="tab-swiper">
                                            <span v-for="(tab,index) in tabs" :key="index" @click="toggle(index)" :class="{active:active==index}" style="padding-left:0">{{tab}}</span>
                                        </div>
                                        <!-- <TagSelect v-model="happenTime" @on-change="changeTime">
                                            <TagSelectOption name="hour">24小时</TagSelectOption>
                                            <TagSelectOption name="week">一周</TagSelectOption>
                                            <TagSelectOption name="month">一月</TagSelectOption>
                                        </TagSelect> -->
                                        <DatePicker class="item-picker" format="yyyy-MM-dd" @on-change="changeStart" :options="startDate" type="date" v-model="startTime"  placement="bottom-end" placeholder="开始日期" style="width: 200px"></DatePicker> -
                                        <DatePicker class="item-picker" format="yyyy-MM-dd" @on-change="changeEnd" :options="endDate" type="date" v-model="endTime"  placement="bottom-end" placeholder="结束日期" style="width: 200px"></DatePicker>
                                    </div>
                                </FormItem>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
        <div class="history-content">
            <Table stripe :columns="tableList" :data="tableData">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                   <Button type="text" size="small" style="margin-right: 5px;color:rgb(75, 126, 254);font-size:12px" @click="checkItem(row)">查看</Button>
                    <Button type="text" size="small" style="color:rgb(75, 126, 254);font-size:12px" @click="sureAlarm(row)" v-if="(row.alarmStatus=='Unremove')&&(row.alarmValue=='')">确认</Button>
                </template>
            </Table>
            <Page :total="tableTotal" show-elevator show-total class="page" @on-change="changeSize" />
        </div>
        <Modal v-model="modal" width="520" class="model-box"> 
            <p slot="header" style="color:#1c2438;font-size:14px;border-left:7px solid #4b7efe;background:#f8f9fb;height:39px;line-height:39px">
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <span class="rectangle"></span>
                <span style="margin-left:8px">历史报警详情</span>
            </p>
            <div>
               <div class="title">报警值信息</div>
               <div>
                   <div class="line-item">
                        <label for="">测点名称：</label><span>{{record.mpointName}}</span>
                   </div>
                   <div class="line-item">
                        <label for="">条件：</label><span>{{record.condition}}</span>
                   </div>
               </div>
                <div>
                   <div class="line-item">
                        <label for="">阈值：</label><span>{{record.threshold}}</span>
                   </div>
                   <div class="line-item">
                        <label for="">报警值：</label><span>{{record.alarmValue}}</span>
                   </div>
               </div>
               <div>
                   <div class="line-item">
                        <label for="">单位：</label><span>{{record.unit}}</span>
                   </div>
                   <div class="line-item">
                        <label for="">所属设备：</label><span>{{record.equipmentName}}</span>
                   </div>
               </div>
                <div class="title">处理预案</div>
                <div class="line-item" v-if="record.processingPlan"> {{record.processingPlan}}</div> <div class="line-item" v-else>无</div>
                <div class="title">备注</div>
                <div class="line-item" v-if="record.remarks"> {{record.remarks}}</div>
                <div class="line-item" v-else>无</div>
                <div class="title">联系方式</div>
                <div>
                   <div class="line-item">
                        <label for="">联系人：</label><span>{{record.contactPersonName}}</span>
                   </div>
                   <div class="line-item">
                        <label for="">联系方式：</label><span>{{record.contactPhone}}</span>
                   </div>
               </div>
            </div>
            <div slot="footer" >
            </div>
        </Modal>
        <Modal v-model="modal1" width="520" class="model-box" @on-ok="ok"
            @on-cancel="cancel"> 
            <p slot="header" style="color:#1c2438;font-size:14px;border-left:7px solid #4b7efe;background:#f8f9fb;height:39px;line-height:39px">
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <span class="rectangle"></span>
                <span style="margin-left:8px">确认报警</span>
            </p>
            <div>
                <Form ref="formInline" :model="formInline" :rules="ruleInline"  :label-width="80">
                    <FormItem prop="type" label="类型:">
                       <RadioGroup v-model="formInline.type">
                            <Radio label="2">误报</Radio>
                            <Radio label="3">测试</Radio>
                            <Radio label="1">确认报警</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="备注：">
                        <Input v-model="formInline.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                    </FormItem>
                </Form>
            </div>
        </Modal>
    </div>
</template>
<script>
import { getTree,getList,getDetail,confirmAlarm} from '@/api/alarm/history'
import createTree from '@/libs/public-util'
import {formatTime} from '@/libs/public'
export default {
    name: 'alarmHistory',
    data() {
        return {
            height: '',
            searchShow: false,
            historyList: {
                name: '',
                area: []
            },
            treeData: [],
            confirmState: [],
            confirmWay: [],
            alarmLevel: [],
            happenTime: [],
            tableList: [
                {
                    title: '区域位置',
                    key: 'siteName'
                },
                {
                    title: '报警名称',
                    key: 'alarmName'
                },
                {
                    title: '等级',
                    key: 'alarmLevel',
                     render: (h, params) => {
                        let a = params.row.alarmLevel
                        const color= a==1?'#F5423F':(a==2?'#F9A10F':'#739AFB')
                        return h('span', {
                            style:{
                                color:color
                            }
                        }, a+'级');
                        
                    }
                },
                {
                    title: '确认方法',
                    key: 'disarmMethod',
                    render: (h, params) => {
                        let that = this
                        const text = params.row.disarmMethod == 'AutoOrManual'?'自动或者人工':(params.row.disarmMethod == 'Auto'?'自动':'人工')
                        return h('span', {}, text);
                    }
                },
                {
                    title: '确认状态',
                    key: 'alarmStatus',
                    render: (h, params) => {
                        let that = this
                        const text = params.row.alarmStatus == 'Unremove'?'未解除':'已解除'
                        let color =params.row.alarmStatus == 'Unremove'?"#F9A10F":'#8190A5'
                        return h('span', {
                            style:{
                                color:color
                            }
                        }, text);
                    }
                },
                {
                    title: '发生时间',
                    key: 'alarmTriggerTime',
                     render: (h, params) => {
                        let that = this
                        const text = params.row.alarmTriggerTime
                        return h('span', {}, formatTime(text, 'HH:mm:ss yyyy-MM-dd'));
                    }
                },
                {
                    title: '确认时间',
                    key: 'alarmReleaseTime',
                     render: (h, params) => {
                        let that = this
                        const text = params.row.alarmReleaseTime
                        return h('span', {}, formatTime(text, 'HH:mm:ss yyyy-MM-dd'));
                    }
                },
                {
                    title: '持续时间',
                    key: 'duration'
                },
                {
                    title: '确认人',
                    key: 'releaseUserName'
                },
                {
                    title: '订阅',
                    key: 'subscribeAlarm',
                    render: (h, params) => {
                        let that = this
                        const text = params.row.subscribeAlarm == 1?'是':'否'
                        return h('span', {},text);
                    }
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            tableData: [],
            tableTotal:0,
            page:1,
            baseData:[],
            tabs:['全部','24小时','一周','一月'],
            active:'6',
            start:'',
            end:'',
            startDate:{},
            endDate:{},
            startTime:'',
            endTime:'',
            modal:false,
            record:{},
            modal1:false,
            formInline: {
                type: '2',
                remarks: ''
            },
            ruleInline: {
                
            },
            id:''
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getRegional()
        this.hisList()
    },
    methods: {
        changeSize(size){
          this.page = size
          this.hisList()
        },
        ok(){
             let data = {
                alarmReleaseType:this.formInline.type,
                ids:[this.id],
                remarks:this.formInline.remarks
            }
            console.log(data)
            confirmAlarm(data).then(res=>{
                console.log(res)
                if(res.data.count){
                    this.hisList()
                }
            })
        },
        cancel(){

        },
        search(){
            this.hisList()
        },
        sureAlarm(row){
            this.modal1 = true
            this.id = row.id
           
        },
        checkItem(row){
            console.log(row)
            
            getDetail(row.id).then(res=>{
                console.log(res)
                this.record = res.data.record
                //    let relationList:["=",'>',"<","≠","≥","≤","5分钟无数据"],
                let temp = res.data.record
                if(temp.threshold != '5分钟无数据'){
                    temp.condition = temp.threshold.substring(0,1)
                    temp.threshold = temp.threshold.slice(1,)
                    console.log(temp.threshold.substring(0,1))
                }else{
                    temp.condition = temp.threshold
                    temp.threshold = ''
                }
            })
            this.modal = true
        },
        changeEnd(e){
            this.end = e
            this.active = '6'
            this.start = ''
            this.end = ''
        },
        changeStart(e){
            this.start = e
            this.active = '6'
                this.start = ''
                this.end = ''
        },
        toggle(i){
            this.active=i;
            let now  = new Date()
            let year = now.getFullYear()
            let month = now.getMonth()+1
            month=month<10?'0'+month:month
            let day = now.getDate()
            day = day<10?'0'+day:day
            let today = year+"-"+month+"-"+day
            this.end = today
            this.endTime = today
            if(i==0){
                this.active = '6'
                this.start = ''
                this.end = ''
            }else if(i==1){
                let dayPre = now.getDate()-1
                dayPre = dayPre<10?'0'+ dayPre:dayPre
                let pre = year+"-"+month+"-"+dayPre
                this.startTime = pre
                this.start = pre
            }else if(i==2){
                this.start = this.getBeforeDate(7)
                 this.startTime = this.getBeforeDate(7)
            }else if(i==3){
                let preM=month-1
                preM = preM<10?'0'+preM:preM
                this.start =  year+"-"+preM+"-"+day
                this.startTime = year+"-"+preM+"-"+day
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
        reset(){
           this.historyList.name = ''
           this.historyList.area = []
           this.confirmWay = []
           this.confirmState = []
           this.alarmLevel =[]
           this.start = ''
           this.end = ''
           this.active = '6'
        },
        hisList(){
            let siteId = this.historyList.area.length!=0?this.historyList.area.join(','):''
            let alarmStatus = this.confirmState.length!=0?this.confirmState.join(','):''
            let methods = this.confirmWay.length!=0?this.confirmWay.join(','):''
            let level = this.alarmLevel.length!=0?this.alarmLevel.join(','):''
            let begin = this.start?this.$moment(this.start).utc().format():''
            let end = this.end?this.$moment(this.end).utc().format():''
           
            // siteId,queryName,begin,end,alarmStatus,methods,level,page,siteName
            let arr = []
            console.log(this.historyList.area)
            this.historyList.area.map(ele=>{
                this.baseData.map(item=>{
                   if(item.id == ele){
                       arr.push(ele.name)
                   }
                })
            })
            let siteName = this.historyList.area.length!=0?arr.join(','):''
            getList(siteId,this.historyList.name,begin,end,alarmStatus,methods,level,this.page,siteName).then(res=>{
                console.log(res)
                if(res.data.items){
                    this.tableData = res.data.items
                    this.tableTotal = res.data.total
                }
            })
        },
        changeTime(checkedNames, name){
           console.log(checkedNames, name)
        },
        getRegional() {
            getTree().then(res => {
                console.log(res)
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].expand = true
                    treeItem.push(trees[i])
                }
                console.log(treeItem)
                this.baseData = treeItem
                this.treeData = createTree(treeItem,0)
            }).catch(err => {
                // 异常情况
            })
        },
        higherSearch() {
            this.searchShow = !this.searchShow
        },
    }
}
</script>
<style lang="less" scoped>
.history-wrap {
    margin: 5px;
    background: #fff;
    .history-search {
        .search-box {
            padding: 5px;
            height: 43px;
            .search-main {
                height: 33px;
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
                        width: 190px;
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
                        .tab-swiper{
                            line-height: 35px;
                            span{
                                display: inline-block;
                                min-width: 50px;
                                margin-right: 24px;
                                // padding:0  8px;
                                 
                            }
                        }
                        .active{
                            // color: #4B7EFE;
                            background: #2D8cF0;
                            color: #fff;
                            height: 22px;
                            line-height: 22px;
                           text-align:  center;
                            border-radius: 3px;
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
            height: 220px;
            overflow: hidden;
            transition: 0.5s height;
        }
        .searchPack {
            height: 43px;
            overflow: hidden;
            transition: 0.5s height;
        }
    }
    .history-content {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .page{
            text-align: right;
            margin-top: 10px;
        }
    }
    .item-picker {
        display: inline-block;
        position: relative;
        top: -30px;
        left: 300px;
    }
}
.model-box {
    .title{
        font-weight: bold;
        color:#4b7efe;
        font-size: 13px;
        margin: 10px 0;
    }
    .line-item{
        display: inline-block;
        font-size: 12px;
        width: 45%;
            label{
                display: inline-block;
                width: 60px;
                line-height: 35px;
                text-align: right;
            }
    }
}
</style>