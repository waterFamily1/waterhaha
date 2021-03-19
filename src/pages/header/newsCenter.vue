<template>
    <div class="message-box" :style="{height: height+'px'}">
        <div class="c-sub-menu">
            <ul>
                <li :class="{active:cur == index}" @click="tabCheck(index)" v-for="(item,index) in taskList" :key="index">
                    <a href="javascript:void(null)">
                        <Badge dot :count="item.count">{{ item.label }}</Badge>  
                    </a>
                </li>
            </ul>
        </div>
        <div class="c-sub-main c-scrollbar">
            <div class="select-box" style="display: flex;justify-content: space-between;">
                <Select v-model="msg" style="width:100px" @on-change="msgChange">
                    <Option v-for="item in msgList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <div @click="read" style="color:#4b7efe;font-size:13px">
                    <Icon type="md-checkbox-outline" style="font-size: 20px"/>
                    全部已读
                </div>
            </div>
            <div class="list">
                <Spin size="large" fix v-if="loading"></Spin>
                <div v-show="weekList.length>0">
                    <div class="list-title">一周前</div>
                    <div class="list-item">
                        <Table :show-header="false" :columns="columns" :data="weekList" :loading="loading" @on-row-click="getDetail"></Table>
                    </div>
                </div>
                <div v-show="oneMonthList.length>0">
                    <div class="list-title">一个月前</div>
                    <div class="list-item">
                        <Table :show-header="false" :columns="columns" :data="oneMonthList" :loading="loading" @on-row-click="getDetail"></Table>
                    </div>
                </div>
                <div v-show="threeMonthList.length>0">
                    <div class="list-title">三个月前</div>
                    <div class="list-item">
                        <Table :show-header="false" :columns="columns" :data="threeMonthList" :loading="loading" @on-row-click="getDetail"></Table>
                    </div>
                </div>
                <div v-show="weekList.length==0 && oneMonthList.length==0 && threeMonthList.length==0" style="text-align:center;margin: 20px 0">
                    暂无数据
                </div>
                <Page 
                    :total="total" 
                    class="table-page" 
                    show-total 
                    show-elevator 
                    @on-change="pageChange"
                ></Page>
            </div>
        </div>
    </div>
</template>
<script>
import { getList, getListCat, getHasRead, readMethod } from '@api/header/news'
import util from '@/libs/public_js'

export default {
    name: 'newsCenter',
    data(){
        return {
            cur: 0,
            taskList:[
                {
                    label: "任务消息",
                    count: 0
                }, {
                    label: "报警消息",
                    count: 0
                }, {
                    label: "系统消息",
                    count: 0
                }
            ],
            height:'',
            msgList:[
                {
                    value: '0',
                    label: '全部'
                }, {
                    value: '1',
                    label: '未读消息'
                }, {
                    value: '2',
                    label: '已读消息'
                }
            ],
            msg:'0',
            columns: [
                {
                    title: '标题',
                    key: 'title',
                    width:200,
                    ellipsis:true,
                    render:(h, params)=> {
                        if(params.row.readStatus) {
                            return h('span', {
                                style: {
                                    color:'#9c9999'
                                }
                            }, params.row.title)
                        } else {
                            return h('span', params.row.title)
                        }
                    }
                }, {
                    title: '发件人',
                    key: 'content',
                    width:690,
                    render:(h, params)=> {
                        if(params.row.readStatus) {
                            return h('div', [
                                h('Icon', {
                                    style: {
                                        color:'#9c9999',
                                        fontSize:'20px',
                                        marginRight: '10px'
                                    },
                                    props: {
                                        type: 'md-mail-open'
                                    },
                                }),
                                h('span', {
                                    style: {
                                        color:'#9c9999'
                                    },
                                    domProps: {
                                        innerHTML:`${params.row.content}`
                                    }
                                })
                            ])
                        } else {
                            return h('div', [
                                h('Icon', {
                                    style: {
                                        color:'#4b7efe',
                                        fontSize:'20px',
                                        marginRight: '10px'
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
                        }
                    }
                }, {
                    title: '时间',
                    key: 'realSendTime',
                    width:200,
                    width: 200,
                    render:(h, params)=> {
                        if(params.row.readStatus) {
                            return h('span', {
                                style: {
                                    color:'#9c9999'
                                }
                            }, util.transDateFromServer(params.row.realSendTime, 'yyyy-MM-dd hh:mm'))
                        } else {
                            return h('span', util.transDateFromServer(params.row.realSendTime, 'yyyy-MM-dd hh:mm'))
                        }
                    }
                }
            ],
            unreadList:[],
            weekAgo:[],
            weekList: [],
            oneMonthList: [],
            threeMonthList: [],
            obj:{},
            currentTime:'',
            category: 1,
            today: '',
            total: 0,
            currentPage: '1',
            loading: false,
            readFlag: ''
        }
    },
    mounted() {
        let now  = new Date()
        let year = now.getFullYear()
        let month = now.getMonth()+1
        month=month<10?'0'+month:month
        let day = now.getDate()
        day = day<10?'0'+day:day

        this.currentTime = year+'-'+month+'-'+day
        this.height = document.body.clientHeight-46
        this.getAll()
        this.getFlag()
    },
    methods:{
        getFlag(){
            getHasRead().then(res=>{
                if(res.data) {
                    this.obj = res.data
                    if(res.data.task) {
                        this.taskList[0].count = 1
                    }
                    if(res.data.alarm) {
                        this.taskList[1].count = 1
                    }
                    if(res.data.system) {
                        this.taskList[2].count = 1
                    }
                }
            })
        },
        getAll(){
            this.loading = true
            let currentPage = this.currentPage
            let category = this.category
            getList({
                category,
                currentPage
            }).then(res=>{
                // console.log(res.data)
                this.weekList = []
                this.oneMonthList = []
                this.threeMonthList = []
                if(res.data) {
                    this.loading = false
                    let temp = res.data.items
                    temp.map(ele=>{
                        let date = new Date(util.formatDateTime(ele.realSendTime, "yyyy-MM-dd"))
                        let now = new Date(this.currentTime)
                        let cha = (now - date) / (1000 * 60 * 60 * 24)
                        if(cha <= 7) {
                            this.weekList.push(ele)
                        }
                        if(cha > 7 && cha <= 31) {
                            this.oneMonthList.push(ele)
                        }
                        if(cha > 31) {
                            this.threeMonthList.push(ele)
                        }
                    })
                    this.total = res.data.total
                }
            }).catch(err=> {
                this.loading = false
            })
        },
        pageChange(num) {
            this.currentPage = num 
            this.getAll()
        },
        tabCheck(index) {
            this.cur = index
            this.category = index+1
            this.currentPage = '1'
            this.getAll()
        },
        msgChange(val) {
            if(val == 0) {
                this.currentPage = '1'
                this.readFlag = ''
                this.getAll()
            } else if(val == 1) {
                this.readFlag = 'unread'
                this.currentPage = '1'
                this.getFlagList()
            } else if(val == 2) {
                this.readFlag = 'read'
                this.currentPage = '1'
                this.getFlagList()
            }
        },
        getFlagList() {
            this.loading = true
            let currentPage = this.currentPage
            let category = this.category
            let readFlag = this.readFlag
            getListCat({
                category,
                currentPage,
                readFlag
            }).then(res=>{
                this.weekList = []
                this.oneMonthList = []
                this.threeMonthList = []
                if(res.data) {
                    this.loading = false
                    let temp = res.data.items
                    temp.map(ele=>{
                        let date = new Date(util.formatDateTime(ele.realSendTime, "yyyy-MM-dd"))
                        let now = new Date(this.currentTime)
                        let cha = (now - date) / (1000 * 60 * 60 * 24)
                        if(cha <= 7) {
                            this.weekList.push(ele)
                        }
                        if(cha > 7 && cha <= 31) {
                            this.oneMonthList.push(ele)
                        }
                        if(cha > 31) {
                            this.threeMonthList.push(ele)
                        }
                    })
                    this.total = res.data.total
                }
            }).catch(err=> {
                this.loading = false
            })
        },
        read() {
            readMethod({
                category: this.category
            }).then(res=> {
                if(res) {
                    this.$Notice.success({
                        title: '成功',
                        desc: '操作成功'
                    })
                    this.currentPage = '1'
                    if(this.readFlag == '') {
                        this.getAll()
                    } else {
                        this.getFlagList()
                    }
                }
            })
        },
        getDetail(row, index) {
            // console.log(row)
            this.$router.push({
                path: '/newsDetail',
                query: {
                    id: row.id
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.message-box {
    border-top: 5px solid #f0f0f0;
    background: #fff;
    .c-sub-menu {
        position: absolute;
        top: 0;
        left: 0;
        width: 120px;
        padding-top: 10px;
        li {
            text-align: center;
            height: 40px;
            line-height: 40px;
            list-style: none;
            a {
                color: #333;
            }
        }
        .active {
            a {
                font-weight: 700;
                color: #4b7efe;
            }
        }
    }
    .c-sub-main {
        height: 100%;
        overflow-y: auto;
        margin-left: 120px;
        border: 5px solid #f0f0f0;
        position: relative;
        .select-box {
            width: 100%;
            height: 50px;
            line-height: 30px;
            padding: 10px 20px;
            border-bottom: 1px solid #eee
        }
        .list {
            .list-title {
                height: 50px;
                line-height: 50px;
                padding-left: 20px;
                border-bottom: 1px solid #e8eaec;
            }
            .list-item {
                color: #495060;
                font-size: 13px;
            }
        }
    }
}
/deep/.ivu-table-cell {
    a {
        color: #333;
    }
}
/deep/.ivu-badge-dot {
    top: 8px;
    right: -12px;
}
/deep/table {
    width: 100%!important;
}
.table-page {
    text-align: right;
    margin: 10px 0;
}
</style>