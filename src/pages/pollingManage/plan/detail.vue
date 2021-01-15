<template>
    <div class="detail-wrap" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <div>
                <h3>巡检计划</h3>
            </div>
            <div class="c-btns-right" v-if="faultDto.status=='Ing'">
                <Button type="primary" @click="terminationT()">终止</Button>
                <Button type="primary" style="background:#c8c8c8" @click="cancel()">返回</Button>
            </div>
            <div class="c-btns-right" v-if="faultDto.status=='New'">
                <Button type="primary" @click="assign()">下达</Button>
                <Button type="primary" @click="edit()">编辑</Button>
                <Button type="primary" style="background:#c8c8c8" @click="cancel()">返回</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
            <Row>
                <Col span="12">
                    <div class="item-form">
                        <label>巡检任务名称：</label>
                        <span>{{ faultDto.name }}</span>
                    </div>
                    <div class="item-form">
                        <label>所属组织：</label>
                        <span>{{ faultDto.org }}</span>
                    </div>
                    <div class="item-form">
                        <label>执行人员：</label>
                        <span>{{ faultDto.executor }}</span>
                    </div>
                    <div class="item-form">
                        <label>计划状态：</label>
                        <span>{{ faultDto.status=="New"?'新建':'' }}</span>
                    </div>
                    <div class="item-form">
                        <label>节假日设置：</label>
                        <span>{{ faultDto.holidayDisabled==1?'不执行':'执行' }}</span>
                    </div>
                </Col>
                <Col span="12">
                    <div class="item-form">
                        <label>提前通知时间：</label>
                        <span>{{ faultDto.remindAdvance }}分钟</span>
                    </div>
                    <div class="item-form">
                        <label>开始时间：</label>
                        <span>{{ faultDto.planStart }}  </span>
                    </div>
                    <div class="item-form">
                        <label>结束时间：</label>
                        <span>{{ faultDto.planEnd }}</span>
                    </div>
                    <div class="item-form"> 
                        <label>持续时间：</label>
                        <span>{{ faultDto.period}}</span>
                        <span>{{faultDto.periodUnit=='Hour'?'小时':(faultDto.periodUnit=='Day'?'天':'分钟')}}</span>
                    </div>
                    <div class="item-form"> 
                        <label>周期：</label>
                        <div style="display:inline-block;width:488px;vertical-align:top">
                            <span v-if="faultDto.periodType=='Hourly'">
                                每{{ faultDto.periodValue }}小时
                                <span v-if="faultDto.repeatCount">从({{faultDto.planStart}}开始重复{{faultDto.repeatCount}}次)</span>
                                <span v-else>({{faultDto.planStart}} 至 {{faultDto.planEnd}})</span>
                            </span>
                            <span v-if="faultDto.periodType=='Daily'">每{{ faultDto.periodValue }}天
                                <span v-if="faultDto.repeatCount">从({{faultDto.planStart}}开始重复{{faultDto.repeatCount}}次)</span>
                                <span v-else>({{faultDto.planStart}} 至 {{faultDto.planEnd}})</span>
                            </span>
                            <span v-if="faultDto.periodType=='Weekly'">每{{faultDto.periodValue}}周后的{{faultDto.weekText}}
                            <span v-if="faultDto.repeatCount">从({{faultDto.planStart}}开始重复{{faultDto.repeatCount}}次)</span>
                                <span v-else>({{faultDto.planStart}} 至 {{faultDto.planEnd}})</span>
                            </span>
                            <span v-if="faultDto.periodType=='Monthly'">
                                <span v-if="faultDto.periodRankValue">
                                    每{{faultDto.periodValue}}月的{{faultDto.order}}{{faultDto.day}}
                                </span>
                                <span v-else>每{{faultDto.periodValue}}月的第{{faultDto.periodRank}}天</span>
                                <span v-if="faultDto.repeatCount">从({{faultDto.planStart}}开始重复{{faultDto.repeatCount}}次)</span>
                                <span v-else>({{faultDto.planStart}} 至 {{faultDto.planEnd}})</span>
                            </span>
                            <span v-if="faultDto.periodType=='Yearly'">
                                    每{{faultDto.periodValue}}年后的
                                <span v-if="faultDto.periodRankValue">
                                    {{faultDto.periodMonth}}月{{faultDto.order}}{{faultDto.day}}
                                </span>
                                <span v-else>{{faultDto.periodMonth}}月{{faultDto.periodRank}}日</span>
                                <span v-if="faultDto.repeatCount">从({{faultDto.planStart}}开始重复{{faultDto.repeatCount}}次)</span>
                                <span v-else>({{faultDto.planStart}} 至 {{faultDto.planEnd}})</span>
                            </span>
                        </div>
                        
                    </div>
                </Col>
            </Row>
        </div>
        <div class="c-top-border-gray">
            <Tabs value="name1">
                <TabPane label="巡检点信息" name="name1">
                    <Table ref="selection" :columns="applyColumns" :data="tableData" >
                    </Table>
                </TabPane>
            </Tabs>
            
        </div>
        <!-- 任务分派 -->
        <Modal
            v-model="allocation"
            title="任务分派"
            width="330"
            :footer-hide="true">
            <div>选择相应的执行人员进行派发:</div>
            <div style="margin-top:20px">
                <Select v-model="personId" style="width:300px" placeholder="请选择人员" size="small">
                    <Option v-for="item in handlerList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="btn"> <span @click="alloacte()">分配</span></div>
        </Modal>
        <!-- 查看详情 -->
        <Modal
            v-model="detailModal"
            title="巡检点"
            width="580"
            :footer-hide="true">
            <div>
                <div class="item-form">
                    <label style="display:inline-block;width:100px;text-align:right">巡检点名称：</label>
                    <span>{{ detail.patrolPoint }}</span>
                </div>
            </div>
             <div style="margin-top:10px">
                <div class="item-form">
                    <label style="display:inline-block;width:100px;text-align:right">描述：</label>
                    <span>{{ detail.description }}</span>
                </div>
            </div>
             <div style="margin:10px 0">
                <div class="item-form">
                    <label style="display:inline-block;width:100px;text-align:right">区域位置：</label>
                    <span>{{ detail.relatedProcessNames }}</span>
                </div>
            </div>
             <Table ref="selection" :columns="detailColumns" :data="detailData" >
                <template slot-scope="{ row, index }" slot="action">
                    <Button class="action" type="text" size="small" style="margin-right: 5px;color:rgb(75, 126, 254)" @click="checkImg(row.stepImgList)">查看</Button>
                </template>
            </Table>
        </Modal>
        <!-- 查看照片 -->
        <Modal
            v-model="imgModal"
            title="照片"
            width="580"
            :footer-hide="true">
            <div>
                <img src="" alt="">
            </div>
             
        </Modal>
    </div>
</template>
<script>
import { planDetail,endPlan,releasePlan} from '@api/pollingManage/plan';
import createTree from '@/libs/public-util'
import {formatTime} from '@/libs/public'
export default {
    name: 'detail',
    data() {
        return {
            height: '',
            type: '111',
            number: '',
            tissue: '',
            area: '',
            status: '',
            handler: '',
            severity: '',
            polling: '',
            device: '',
            applyColumns: [
                {   
                    title: '序号',
                    width: 70,
                    type: 'index',
                },
                {
                    title: '巡检点名称',
                    key: 'patrolPoint',
                }, {
                    title: '描述',
                    key: 'description',
                }, {
                    title: '巡检步骤',
                    key: 'stepCount'
                },  {
                    title: '区域位置',
                    key: 'relatedProcessNames'
                }, {
                    title: '编号',
                    key: 'no'
                }, 
            ],
            applyData: [],
            id:'',
            attention:false,
            allocation:false,
            hangModal:false,
            closeModal:false,
            orgId:'',
            personId:'',
            handlerList:[],
            orgData:[],
            tableData:[],
            faultDto:{},
            page:1,
            total:0,
            durationList:['日度','月度','季度','年度'],
            detailModal:false,
            detailData:[],
            detailColumns:[
                {   
                    title: '序号',
                    width: 70,
                    type: 'index',
                },{
                    title: '步骤',
                    key: 'stepName',
                },{
                    title: '结果记录',
                    key: 'stepResult',
                },{
                    title: '备注',
                    key: 'stepComment',
                },{
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            detail:{},
            imgModal:false,
            attention:true
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.id = this.$route.query.id
        this.defectDetail()
        // this.getList()
        // this.getRegional()
        this.userList()
    },
    methods:{
        edit(){
            this.$router.push({
                path:'/plan/edit',
                query: {
                    id:this.id
                }
            })
        },
        terminationT(){
            this.$Modal.confirm({
                title: '是否要终止当前计划？',
                width: '300',
                onOk: () => {
                    endPlan(this.id).then(res=>{
                        if(res.data.count){
                            //  
                            this.$Message.success('终止成功!');
                            this.$router.go(-1)
                        }
                    })
                },
                onCancel: () => {
                    // this.$Message.info('Clicked cancel');
                }
            });
        },
        cancel(){
            this.$router.go(-1)
        },
        cancelAttention(){
            this.$Modal.confirm({
                title: '是否要取消关注此条数据?',
                width: '300',
                onOk: () => {
                    cancelCon(this.id).then(res=>{
                        if(res.data.count==0){
                            //  
                            this.$Message.success('取消关注成功!');
                            this.attention = false
                        }
                    })
                },
                onCancel: () => {
                    // this.$Message.info('Clicked cancel');
                }
            });
          
        },
        addAttention(){
            let data = {
                concernId: this.id,
                type: "patrol"
            }
            addCon(data).then(res=>{
                if(res.data.id){
                    this.$Message.success('关注成功!');
                    this.attention = true
                }
            })
        },
        checkImg(img){
            this.imgModal = true
        },
        check(index){
          this.detailModal = true
          let detail = this.tableData[index]
          this.detail = detail
          this.detailData = detail.patrolTaskPointSteps
        },
        userList(){
        //    getUsers(this.orgId).then(res=>{
        //        this.handlerList = res.data
        //    })
        },
        getRegional() {
            getOrg().then(res => {
                // console.log(res)
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].checked = false
                    treeItem.push(trees[i])
                }
                this.orgData = createTree(treeItem,0)
            }).catch(err => {
                // 异常情况
            })
        },
        changeSize(size){
            this.page = size
            this.getList()
        },
        getList(){
        //    detailList(this.id,this.page).then(res=>{
        //        if(res.data.items){
        //            this.tableData = res.data.items
        //            this.total = res.data.total
        //        }
        //    })
        },
        assign(){
            releasePlan(this.id).then(res=>{
                console.log(res)
                if(res.data.count){
                    this.$router.go(-1)
                    this.$Message.success({
                        render: h => {
                            return h('span', [
                                '计划下达成功!',
                                h('div', {},'已下达'+res.data.count+"个待执行巡检任务")
                            ])
                        }
                    });
                    
                }
            })
        },
        changeItem(name){
          console.log(name)
          if(name=='hang'){
              this.hangModal = true
          }else{
              this.closeModal = true
          }
        },
        changeOrg(id){
            this.orgId = id
           this.userList(id)
        },
        
        defectDetail(){
            planDetail(this.id).then(res=>{
                console.log(res)
                if(res.data){
                    let result = res.data
                    result.planStart = formatTime(result.planStart, 'yyyy-MM-dd HH:mm')
                    result.planEnd=formatTime(result.planEnd, 'yyyy-MM-dd HH:mm')
                   let text = result.periodType
                   text=='Hourly'?'小时':(text=='Daily'?'天':'分钟')
                    this.faultDto = result
                    this.tableData = result.pointsList
                    if(result.periodType == 'Weekly'){
                        let week = result.periodRank.split(',')
                        let weekText= [],matter="";
                        week.map(item=>{
                            console.log(item)
                            matter = item==1?'星期日':(item==2?'星期一':(item == 3?'星期二':(item==4?'星期三':(item=5?'星期四':(item==6?'星期五':(item==7?'星期六':''))))))
                            weekText.push(matter)
                            console.log(weekText)
                        })
                        result.weekText = weekText.join(',')
                    }else if((result.periodType == 'Monthly')||(result.periodType == 'Yearly')){
                        let order,day;
                        if(result.periodRankValue){
                            order = result.periodRank=='First'?'第一个':(result.periodRank=='Second'?'第二个':(result.periodRank=='Third'?'第三个':(result.periodRank=='Fourth'?'第四个':'最后一个')))
                            day = result.periodRankValue =='Day'?'日子':
                            (result.periodRankValue=='Weekday'?'工作日':
                            (result.periodRankValue=='Weekend Day'?'周末':
                            (result.periodRankValue=='Sunday'?'星期日':
                            (result.periodRankValue=='Monday'?'星期一':
                            (result.periodRankValue=='Tuesday'?'星期二':
                            (result.periodRankValue=='Wednesday'?'星期三':
                            (result.periodRankValue=='Thursday'?'星期四':
                            (result.periodRankValue=='Friday'?'星期五':'星期六'))))))))
                            result.order = order
                            result.day = day
                        }
                    }
                }
            })
        } ,       
    }
}
</script>
<style lang="less" scoped>
.detail-wrap {
    margin: 5px;
    background: #fff;
    .c-left-border-blue {
        border-radius: 3px;
        padding: 5px;
        display: flex;
        justify-content: space-between;
        div {
            a {
                display: inline;
                // color: #4b7efe;
                // font-weight: 700;
            }
            h3 {
                display: inline-block;
                height: 30px;
                line-height: 30px;
                text-indent: 10px;
                margin-right: 20px;
            }
        }
        .c-btns-right {
            float: right;
            margin-top: 2px;
            button {
                min-width: 70px;
                margin: 0 5px;
                border: none;
                height: 28px;
            }
            /deep/.ivu-dropdown {
                button {
                    background: #495566;
                }
            }
            .c-btn-back {
                background: #c8c8c8;
            }
        }
    }
    .c-top-border-gray {
        padding: 20px 10px;
        border-top: 5px solid #f0f0f0;
        /deep/.ivu-row {
            margin-left: 20px;
            .item-form {
                margin-bottom: 15px;
                height: 24px;
                line-height: 24px;
                label {
                    display: inline-block;
                    color: #495060;
                    font-weight: 700;
                    width: 100px;
                    text-align: right;
                }
            }
        }
        /deep/.ivu-tabs-content {
            padding: 10px;
            .tabs-tabpane {
                text-indent: 20px;
                margin-bottom: 20px;
            }
            .fault-detail {
                .c-gray-bg-h {
                    background-color: #f4f4f4;
                    height: 30px;
                    line-height: 30px;
                    text-indent: 20px;
                    font-weight: 100;
                    font-size: 13px;
                }
                .c-nodata-tip {
                    text-align: center;
                    line-height: 50px;
                }
            }
        }
    }
    /deep/.ivu-timeline-item-content {
        div {
            div {
                display: inline-block;
                // color: #4b7efe;
                // font-weight: 700;
                font-size: 13px;
                margin-right: 10px;
            }
            div:first {
                border-right: 2px solid #d8d8d8;
            }
        }
    }
    .active{
        color: #4b7efe;
        font-weight: 700;
    }
}
.btn{
    margin-top:20px;
    width:300px;
    color:#fff;
    span{
        background: #4b7efe;
        display:inline-block;
        width:100%;
        text-align:center;
        line-height:34px;
        border-radius:5px;
    }
}
.page{
    text-align: right;
    margin-top: 20px;
}
</style>