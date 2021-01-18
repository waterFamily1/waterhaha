<template>
    <div class="video-wrap" :style="{height: height+'px'}">
        <div class="video-main">
            <div class="video-left">
                <h3>区域位置</h3>
                <div class="tree-box">
                    <Tree :data="treeData" :render="renderContent"></Tree>
                </div>
            </div>
            <div class="video-right">
                <div class="c-plain-bg-h">
                    <h3>视频抓拍</h3> 
                </div>
                <div class="capture-event">
                    <Calendar v-model="nowData" hide-type @on-change="calendarChange">
                        <template slot-scope="{ date, data }" slot="month">
                            <div class="a" v-for="(item, index) in thumbList" :key="index">
                                <div v-if="item.timerCount">
                                    <span 
                                        class="calendar-span" 
                                        v-if="data.day === item.thumbdt"
                                        @click="getSnap(item)"
                                    >定时抓拍{{ item.timerCount }}</span>
                                </div>
                                <div v-if="item.alarmCount">
                                    <span  
                                        class="calendar-span1" 
                                        v-if="data.day === item.thumbdt"
                                        @click="getAlarm(item)"
                                    >报警抓拍{{ item.alarmCount }}</span>
                                </div>
                            </div>
                        </template>
                    </Calendar>
                    <Tabs :value="tabName" :animated="false" @on-click="tabChange">
                        <TabPane label="定时抓拍" name="timer">
                            <div class="noTab" v-if="timerList.length == 0">请选择日期</div>
                            <div class="tab-div" v-if="timerList.length != 0">
                                <div class="capture-img-item" v-for="(item, index) in timerList" :key="index">
                                    <img :src="item.url" alt style="cursor: pointer;">
                                </div>
                            </div>
                        </TabPane>
                        <TabPane label="报警抓拍" name="alarm">
                            <div class="noTab" v-if="alarmList.length == 0">该时间段暂无截图</div>
                            <div class="tab-div" v-if="alarmList.length != 0">
                                <div class="capture-img-item" v-for="(item, index) in alarmList" :key="index">
                                    <img :src="item.url" alt style="cursor: pointer;">
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                    <Page 
                        :total="allTotal" 
                        size="small" 
                        @on-change="pageChange"
                        v-if="allTotal != 0"
                        show-total 
                        show-elevator 
                        class="page" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { siteMethod, thumbsMethod, snapMethod, alarmMethod } from '@/api/videoM/capture'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'

export default {
    name: 'videoCapture',
    data() {
        return {
            height: '',
            treeData: [],
            activeTreeId: '',
            nowData: '',
            tabName: 'timer',
            thumbList: [],
            timerList: [],
            alarmList: [],
            thumbdt: '',
            allTotal: 0,
            snapPage: 1
        }
    },
    filters: {
        filterDate(v){
            return v.substr(11,8)
        }
    },
    mounted() {
        this.height = document.body.clientHeight+50
        var date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth()+1
        if(month < 10) {
            month = '0'+month
        }
        this.nowData = year+'-'+month
        this.getProcessTree()
    },
    methods: {
        getProcessTree() {
            siteMethod().then(res=> {
                var data = res.data.items
                var newdata = []
                for(var i = 0, len = data.length; i < len; i ++) {
                    if(data[i].type == 9) {
                        newdata.push(data[i])
                        pushData(data[i].parentId)
                    }
                }
                function pushData(id) {
                    var isExist = false
                    for(var i = 0, len = newdata.length; i < len; i ++) {
                        if(newdata[i].id == id) {
                            isExist = true
                            break
                        }
                    }
                    if(!isExist) 
                    for(var i = 0, len = data.length; i < len; i ++) {
                        if(data[i].id == id) {
                            newdata.push(data[i])
                            pushData(data[i].parentId)
                            break
                        }
                    }
                }
                this.treeData = res.data.items.length == 0 ? [] : util.transDataToTree(newdata.map(item=> { item.expand=true;return item; }))
            })
        },
        renderContent(h, { root, node, data }) {
            var Info
            if(data.type == 9) {
                Info = h('Icon', {style:{color:this.activeTreeId == data.id ? '#999' : '#0bb1df',fontSize:'22px'}, props: {type:'ios-camera'}}, [])
            }
            return h("div", { class: { "c-tree-row": true } }, [
                Info ? Info : '',
                h("span", {
                    class: {
                        'ivu-tree-title': data.type == "9" ? true : false,
                        'ivu-tree-title-selected': this.activeTreeId == data.id.replace('video_', '') ? true : false
                    },
                    attrs:{
                        title: data.name
                    },
                    on: {
                        click: () => {
                            if(data.type == 9) {
                                this.currentVideoName = data.name + ' (' + data.parentName + ')'
                                this.activeTreeId = data.id.replace('video_','')
                                this.thumbDT = util.formatDateTime(new Date(), "yyyy-MM-dd")
                                this.getThumbs()
                                this.timerList = []
                                this.alarmList = []
                                this.allTotal = 0
                            }
                        }
                    }
                }, [data.title])
            ])
        },
        calendarChange(date) {
            var time = new Date(date)
            let year = time.getFullYear()
            let month = time.getMonth()+1
            if(month < 10) {
                month = '0'+month
            }
            this.nowData = year+'-'+month
        },
        getThumbs() {
            let videoId = this.activeTreeId
            let month = this.nowData
            thumbsMethod({
                videoId,
                month
            }).then(res=> {
                // console.log(res)
                this.thumbList = res.data
            })
        },
        tabChange(name) {
            if(!this.activeTreeId) {
                this.$Notice.info({
                    title: '请先选择一个区域位置'
                });
            } else {
                this.allTotal = 0
                if(name == 'timer') {
                    this.getSnap()
                } else if(name == 'alarm') {
                    this.getAlarm()
                }
            }   
        },
        getSnap(item) {
            this.tabName = 'timer'
            this.timerList = []
            this.alarmList = []
            this.allTotal = 0
            this.snapPage = 1
            let date
            if(item) {
                date = item.thumbdt
                this.thumbdt = item.thumbdt
            } else {
                date = this.thumbdt
            }
            let videoId = this.activeTreeId
            let currentPage = this.snapPage
            snapMethod({
                videoId,
                date,
                currentPage
            }).then(res=> {
                // console.log(res)
                this.timerList = res.data.items
                this.allTotal = res.data.total
            })
        },
        getAlarm(item) {
            this.tabName = 'alarm'
            this.timerList = []
            this.alarmList = []
            this.allTotal = 0
            this.snapPage = 1
            let date
            if(item) {
                date = item.thumbdt
                this.thumbdt = item.thumbdt
            } else {
                date = this.thumbdt
            }
            let videoId = this.activeTreeId
            let currentPage = this.snapPage
            alarmMethod({
                videoId,
                date,
                currentPage
            }).then(res=> {
                // console.log(res)
                this.alarmList = res.data.items
                this.allTotal = res.data.total
            })
        },
        pageChange(num) {
            this.snapPage = num
            if(this.tabName == 'timer') {
                this.getSnap()
            } else if(this.tabName == 'alarm') {
                this.getAlarm()
            }
             
        }
    }
}
</script>
<style lang="less" scoped>
.video-wrap {
    margin: 5px;
    background: #fff;
    .video-main {
        width: 100%;
        height: 100%;
        display: flex;
        .video-left {
            width: 300px;
            height: 100%;
            h3 {
                border-bottom: 1px solid #f0f0f0;
                height: 40px;
                line-height: 40px;
                text-indent: 10px;
            }
            .tree-box {
                width: 100%;
                padding: 0 10px;
            }
        }
        .video-right {
            width: 100%;
            border-left: 5px solid #f0f0f0;
            .c-plain-bg-h {
                border-bottom: 1px solid #f0f0f0;
                height: 40px;
                padding: 10px 0 10px 10px;
                h3 {
                    display: inline-block;
                    font-size: 14px;
                    line-height: 20px;
                }
            }
            .capture-event {
                margin-top: 10px;
                padding: 0 10px;
                /deep/.ivu-calendar-header {
                    padding: 10px 0;
                    /deep/.ivu-calendar-header-title {
                        font-size: 16px;
                        color: #495060;
                        text-align: center;
                    }
                    /deep/.ivu-btn-group-default {
                        .ivu-btn:nth-of-type(2) {
                            display: none;
                        }
                    }
                }
                /deep/.ivu-calendar-table thead th {
                    padding: 0;
                    text-align: center;
                    background-color: #f7f7f7;
                }
                /deep/.ivu-calendar-table-day {
                    height: 40px;
                    padding: 0;
                }
                /deep/.ivu-calendar-table-day-title {
                    text-align: right;
                }
                .ivu-tabs {
                    margin-top: 10px;
                }
            }
        }
    }
}
/deep/.calendar-span {
    display: block;
    padding: 0 10px 0 4px;
    color: #56bcf7;
}
/deep/.calendar-span1 {
    display: block;
    padding: 0 10px 0 4px;
    color: #f5a623;
}
.tab-div {
    .capture-img-item {
        float: left;
        width: 19%;
        height: 130px;
        margin: 10px 1% 0 0;
        cursor: pointer;
        img {
            width: 100%;
            height: 130px;
        }
    }
}
.noTab {
    width: 100%;
    text-align: center;
}
.page {
    text-align: right;
    margin: 10px 0;
}
/deep/.ivu-calendar-table-day {
    position: relative;
    .ivu-calendar-table-day-title {
        position: absolute;
        top: 4px;
        right: 5px;
    }
}
</style>