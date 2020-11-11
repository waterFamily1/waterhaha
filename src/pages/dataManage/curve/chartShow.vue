<template>
    <div class="main-con">
        <div class="title">
            <!-- <h3>您还没有选择测点</h3> -->
            <div>
                <span>{{ siteTitle }}</span>
                <div class="tag" v-if="siteShow == '1'">
                    <Tag 
                        v-for="(item ,index) in siteGroupList" 
                        :key="index"
                        :name="item.name"
                        closable 
                        @on-close="removeSiteList"
                    >{{ item.name }}</Tag>
                </div>
                <div class="tag" v-if="siteShow == '2'">
                    <Tag 
                        v-for="(item ,index) in siteGroupList" 
                        :key="index"
                        :name="item.name"
                    >{{ item.name }}</Tag>
                </div>

                <Button type="primary" size="small" style="font-size:12px" v-if="siteShow == '1'">刷新</Button>
                <div style="float:right" v-if="siteShow == '1'">
                    <Button 
                        type="default" 
                        size="small" 
                        style="font-size:12px;background:#576374;color:#fff"
                        @click="emptyHandle()"
                    >清空</Button>
                    <Button 
                        type="default" 
                        size="small" 
                        style="font-size:12px;background:#576374;color:#fff"
                        @click="saveModalMethod"
                    >保存为组合</Button>
                </div>
            </div>
            <div class="curves-panel">
                <span>起始时间：</span>
                <DatePicker 
                    v-model="beginDate"
                    format="yyyy-MM-dd HH:mm:ss"
                    type="date" 
                    placeholder="选择时间" 
                    style="width: 200px"
                ></DatePicker>
                <div class="cmp-date-step-icon">
                    <a href="javascript:;" @click="dayBefore"> 
                        <Icon type="ios-play" style="transform:rotate(180deg);" />
                    </a>
                    <a href="javascript:;" @click="dayAfter"> 
                        <Icon type="ios-play" />
                    </a>
                    <a href="javascript:;" @click="dayReset">
                        <Icon type="ios-skip-forward" />
                    </a>
                </div>
                <span>时间跨度：</span>
                <Select 
                    v-model="timeValue"
                    style="width:70px;display:inline-block"
                >
                    <Option v-for="item in dateList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <div class="action-btn">
                    <div class="dropdown">
                        <a href="javascript:;">
                            <Icon type="ios-more" style="font-size:25px;color:rgb(75, 126, 254)" />
                        </a>
                    
                    </div>
                    <a href="javascript:;" class="c-icon-export"></a>
                    <a href="javascript:;">
                        <Icon type="ios-sync" />
                    </a>
                    <a href="javascript:;" class="c-icon-table"></a>
                    <a href="javascript:;" class="c-icon-dline"> </a>
                    <a href="javascript:;" style="color:#333">
                        <Icon type="ios-expand" />
                    </a>
                </div>
            </div>
        </div>
        <div class="curves-chart-container">
            <Spin fix v-if="chartLoading"></Spin>
            <div id="J_CHART" class="curves-chart-left"></div>
            <div id="J_TABLE" class="curves-table ivu-table ivu-table-stripe">
                    
            </div>    
        </div>
        <!-- 输入组合名称 -->
        <Modal v-model="saveModal" width="500">
            <p slot="header" style="color:#1c2438;font-size:14px;border-left:7px solid #4b7efe;background:#f8f9fb;height:39px;line-height:39px">
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <span class="rectangle"></span>
                <span style="margin-left:8px">输入组合名称</span>
            </p>
            <div style="text-align:center">
                <input v-model="combineName" type="text" style="width:100%">
            </div>
            <div slot="footer" >
                <Button type="primary" long  @click="saveGroup" style="font-size:12px">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import eventBus from '@/libs/eventBus.js' 
import{ saveGroupMethod, chartMethod } from '@/api/dataManage/curve'

export default {
    data(){
        return {
            saveModal: false,
            siteShow: '0',
            siteTitle: '您还没有选择测点',
            siteGroupList:[],
            startTime:'',
            dateList:[
                {
                    name:'天',
                    value:'day'
                },
                {
                    name:'周',
                    value:'week'
                },
                {
                    name:'月',
                    value:'month'
                },
                {
                    name:'年',
                    value:'year'
                }
            ],
            timeValue: 'day',
            beginDate: '',
            combineName: '',
            addSuccess: '',
            chartLoading: false,
            chartConHeight: '',
            chartConWidth: '',
        }
    },
    created() {
        //接收从singleData传过来的添加的单数据数组
        eventBus.$on('siteGroup',(message)=>{
            this.siteGroupList = message
            this.siteShow = '1'
            this.siteTitle = '您选择的测点：'
        })
        eventBus.$on('dataGroup',(message)=>{
            this.siteGroupList = message
            this.siteShow = '2'
            this.siteTitle = '您选择的组合测点：'
            this.getcharts(message[0].id)
        })
    },  
    mounted() {
        const myDate = new Date();
        const year = myDate.getFullYear(); // 获取当前年份
        const month = myDate.getMonth() + 1; // 获取当前月份(0-11,0代表1月所以要加1);
        const day = myDate.getDate(); // 获取当前日（1-31）
        this.beginDate = `${year}-${month}-${day} 00:00:00`;

        var h = document.querySelector('.lay').offsetHeight,
            C = document.querySelector('#J_CURVES_CHART'),
            B = document.querySelector('#J_CURVES_SIDEBAR'),
            A = document.querySelector('#J_CHART'),
            w = A.offsetWidth;
        this.chartConHeight = h - RTH;
        this.chartConWidth = w;
        B.style.height = h - 10 + 'px';
        C.style.height = h + 'px';
        A.style.height = this.chartConHeight + 'px';

        A.addEventListener('mousemove', function (e) {
            var chart,
                point,
                i,
                event;
            for (i = 0; i < chartCache.length; i++) {
                chart = chartCache[i];
                point = chart.series[0].searchPoint(e, true); 
                if (point) {
                    point.highlight(e);
                }
            }
        });
    },
    methods:{
        removeSiteList(event, name){
            this.siteGroupList = this.siteGroupList.filter(item=> item.name != name)
            //删除后,传给chartShow
            eventBus.$emit('siteGroup', this.siteGroupList)
        },
        emptyHandle() {
            this.siteTitle = '您还没有选择测点'
            this.siteShow = '0'
            this.siteGroupList = []
            eventBus.$emit('siteGroup', this.siteGroupList)
        },
        saveModalMethod() {
            if(this.siteGroupList.length <= 1) {
                this.$Notice.info({
                    title: '请选择至少两个测点进行组合'
                });
            } else {
                this.saveModal = true
            }
        },
        saveGroup() {
            let ids = []
            this.siteGroupList.map(item=> {
                ids.push(item.id)
            })
            saveGroupMethod({
                combineName: this.combineName,
                mpointIds: ids.toString()
            }).then(res=> {
                // console.log(res)
                if(res.status == 200) {
                    this.saveModal = false
                    this.combineName = ''
                    this.addSuccess = '1'
                    this.$emit('addSuccess', this.addSuccess)
                }
            }).catch(err=> {

            })
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
        dayBefore() {
            let time = this.getNextDate(this.beginDate,-1)+' '+'00:00:00'
            this.beginDate = time
        },
        dayAfter() {
            let time = this.getNextDate(this.beginDate,1)+' '+'00:00:00'
            this.beginDate = time
        },
        dayReset() {
            const myDate = new Date();
            const year = myDate.getFullYear(); // 获取当前年份
            const month = myDate.getMonth() + 1; // 获取当前月份(0-11,0代表1月所以要加1);
            const day = myDate.getDate(); // 获取当前日（1-31）
            this.beginDate = `${year}-${month}-${day} 00:00:00`;
        },
        getcharts(id) {
            console.log(id)
            let ids = id
            let beginDate = this.$moment(this.beginDate).utc().format()
            chartMethod({
                ids,
                beginDate
            }).then(res=> {
                console.log(JSON.stringify(res.data))
            }).catch(err=> {

            })
        }
    }
}
</script>
<style lang="less" scoped>
.main-con{
    .title{
        height: 50px;
        border-bottom: 1px solid #EEE;
        padding: 10px;
        font-size: 13px;
        line-height: 40px;
        .tag{
            display: inline-block;
            padding:0 3px;
            height: 27px;
            line-height: 27px;
            position: relative;
            .ivu-icon{
                position: absolute;
                right: -6px;
                top: -10px;
                font-size: 18px;
                background: #fff;
            }
        }
        .cmp-date-step-icon{
            display: inline-block;
            vertical-align: bottom;
            .ivu-icon{
                font-size: 20px;
                color: rgb(75, 126, 254);
            }
        }
        .action-btn{
            float: right;
            margin-top: 5px;
            .dropdown{
                display: inline-block;
            }
            a {
                display: inline-block;
                width: 25px;
                vertical-align: top;
                margin-right: 5px;
            }
            .ivu-icon{
                font-size: 25px;
                vertical-align: top;
            }
            .c-icon-export{     
                display: inline-block;
                background: url('../../../assets/images/split_icon.png') no-repeat -4px -42px;
                width: 25px;
                height: 25px;
            }
            .c-icon-dline{
                display: inline-block;
                background: url('../../../assets/images/split_icon.png') no-repeat -5px -7px;
                width: 25px;
                height: 25px;
            }
            .c-icon-table{
                display: inline-block;
                background: url('../../../assets/images/table.png') no-repeat 0 2px;
                width: 25px;
                height: 25px;
            }
        }
        .curves-panel {
            height: 30px;
            margin: 5px;
        }
    }
    .curves-chart-container {
        position: relative;
    }
}


</style>