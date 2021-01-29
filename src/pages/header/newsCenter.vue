<template>
    <div class="message-box" :style="{height: height+'px'}">
        <div class="c-sub-menu">
            <ul>
                <li :class="{active:cur==index}" @click="cur=index" v-for="(item,index) in taskList" :key="index">
                    <a href="javascript:void(null)">
                        <Badge dot :count='item.count'>{{item.label}}</Badge>  
                    </a>
                </li>
            </ul>
        </div>
        <div class="c-sub-main c-scrollbar">
            <div class="select-box">
                <Select v-model="msg" style="width:100px">
                    <Option v-for="item in msgList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="list">
                 <div class="list-item">
                    <Table  :show-header="false" :columns="columns1" :data="unreadList"></Table>
                </div>
                <div class="list-title">一周前</div>
                <div class="list-item">
                    <Table  :show-header="false" :columns="columns1" :data="weekAgo"></Table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getList,getListCat,getHasRead } from '@api/header/news';
import {formatTime} from '@/libs/public'
export default {
    name: 'newsCenter',
    data(){
        return {
            cur:0,
            taskList:[
                {
                    label:'任务消息',
                    count:0
                },
                {
                    label:'报警消息',
                    count:0
                },
                {
                    label:'系统消息',
                    count:0
                }
            ],
            height:'',
            msgList:[
                {
                    value: '0',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '未读消息'
                },
                {
                    value: '2',
                    label: '已读消息'
                },
            ],
            msg:'0',
            columns1: [
                {
                    title: 'title',
                    key: 'title',
                    width:200,
                    ellipsis:true
                },
                {
                    title: 'content',
                    key: 'content',
                    width:690,
                    
                    render:(h,params)=>{
                        return h('div', [
                                h('Icon', {
                                    style: {
                                        color:'#4b7efe',
                                        fontSize:'20px'
                                    },
                                    props: {
                                        type: 'md-mail'
                                    },
                                }),
                                h('span', {
                                    domProps:{
                                        innerHTML:`${params.row.content}`
                                    }
                                })
                            ])
                        // <Icon type="md-mail" />
                        // return h('div',{
                        //     domProps:{
                        //         innerHTML:`${params.row.content}`
                        //     }
                        // })
                    }
                },
                {
                    title: 'realSendTime',
                    key: 'realSendTime',
                    width:200,
                    render: (h, params) => {
                        let that = this
                        const text = params.row.realSendTime
                        return h('span', {}, formatTime(text, 'yyyy-MM-dd HH:mm'));
                    }
                }
            ],
            data1: [
                {
                    name: '20201224 测试区域1测试巡检1任务分派 ',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                }
            ],
            unreadList:[],
            weekAgo:[],
            obj:{},
            currentTime:''
        }
    },
    mounted() {
        let now  = new Date()
        let year = now.getFullYear()
        let month = now.getMonth()+1
        month=month<10?'0'+month:month
        let day = now.getDate()
        day = day<10?'0'+day:day
        let today = year+month+day
        this.currentTime = today
        this.height = document.body.clientHeight-46
        this.getAll()
        this.getFlag()
        
    },
    methods:{
        getFlag(){
            getHasRead().then(res=>{
                console.log(res)
                if(res.data){
                    this.obj = res.data
                    if(res.data.task){
                        this.taskList[0].count = "1"
                    }else if(res.data.alarm){
                         this.taskList[1].count = "1"
                    }else{
                         this.taskList[2].count = "1"
                    }
                }
            })
        },
        getAll(){
            getList().then(res=>{
                console.log(res)
                if(res.data){
                    let temp = res.data.items
                    let arr = [],weekArr = []
                    temp.map(ele=>{
                        if(!ele.readStatus){
                            arr.push(ele)
                        }
                        ele.date = ele.realSendTime.slice(0,10).split('-').join('')
                        if(ele.date<(this.currentTime-7)){
                            weekArr.push(ele)
                        }
                    })
                    console.log(arr)
                    this.unreadList = arr
                    this.weekAgo = weekArr.splice(0,1)
                }
            })
        },
        getFlagList(){
            let flag;
            if(this.cur == 1){
                flag = 'unread'
            }else if(this.cur == 2){
                flag = 'read'
            }
            getList(flag).then(res=>{
                console.log(res)
            })
        }
    }
}
</script>
<style lang="less" scoped>
.message-box{
    border-top: 5px solid #f0f0f0;
    background: #fff;
    .c-sub-menu{
        position: absolute;
        top: 0;
        left: 0;
        width: 120px;
        padding-top: 10px;
        li{
            text-align: center;
            height: 40px;
            line-height: 40px;
            list-style: none;
            a{
                color: #333;
            }
        }
        .active{
            a{
                font-weight: 700;
                color: #4b7efe;
            }
        }
    }
    .c-sub-main{
        height: 100%;
        overflow-y: auto;
        margin-left: 120px;
        border: 5px solid #f0f0f0;
        position: relative;
        .select-box{
            width: 100%;
            height: 50px;
            line-height: 30px;
            padding: 10px 20px;
            border-bottom: 1px solid #eee
        }
        .list{
            .list-title{
                height: 50px;
                line-height: 50px;
                padding-left: 20px;
                border-bottom: 1px solid #e8eaec;
            }
            .list-item{
                color: #495060;
                font-size: 13px;
            }
        }
    }
}
/deep/.ivu-table-cell{
    a{
        color: #333;
    }
}
</style>