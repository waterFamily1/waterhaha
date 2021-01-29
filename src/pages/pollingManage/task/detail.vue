<template>
    <div class="detail-wrap" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <div>
                <h3>巡检任务</h3>
                <a href="javascript:;" v-if="attention" @click="cancelAttention()">取消关注</a>
                 <a href="javascript:;" v-else @click="addAttention()">添加关注</a>
            </div>
            <div class="c-btns-right">
                <Button type="primary" @click="allocation=true">任务分派</Button>
                 <Button type="primary" style="background:#8790ff" @click="terminationT()">终止任务</Button>
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
                        <span>{{ faultDto.orgName }}</span>
                    </div>
                    <div class="item-form">
                        <label>执行人员：</label>
                        <span>{{ faultDto.executorName }}</span>
                    </div>
                    <div class="item-form">
                        <label>保养持续时间：</label>
                        <span>{{ faultDto.period }}小时</span>
                    </div>
                </Col>
                <Col span="12">
                    <div class="item-form">
                        <label>任务状态：</label>
                        <span>{{ faultDto.executeStatus }}</span>
                    </div>
                    <div class="item-form">
                        <label>执行开始日期：</label>
                        <span>{{ faultDto.startTime }} - {{ faultDto.endTime }}</span>
                    </div>
                    <div class="item-form">
                        <label>实际耗时：</label>
                        <span></span>
                    </div>

                </Col>
            </Row>
        </div>
        <div class="c-top-border-gray">
            <Tabs value="name1">
                <TabPane label="巡检点信息" name="name1">
                    <Table ref="selection" :columns="applyColumns" :data="tableData" >
                        <template slot-scope="{ row, index }" slot="action">
                            <Button class="action" type="text" size="small" style="margin-right: 5px;color:rgb(75, 126, 254)" @click="check(index)">查看</Button>
                        </template>
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
import { taskDetail,addCon,cancelCon,getUsers,assign,suspend} from '@api/pollingManage/task';
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
                    key: 'stepCount',
                    render: (h,params) => {
                        let that = this;
                        let text = params.row.recordCount+"/"+params.row.stepCount
                        return h('span', {
                        }, text);
                    }
                }, {
                    title: '发现缺陷',
                    key: 'faultCount'
                }, {
                    title: '区域位置',
                    key: 'relatedProcessNames'
                },  {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
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
        terminationT(){
            this.$Modal.confirm({
                title: '是否要终止当前任务？',
                width: '300',
                onOk: () => {
                    let data = {
                        isInterupted: "1",
                        taskId: this.id
                    }
                    suspend(data).then(res=>{
                        if(res.data.count){
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
            this.$router.back()
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
           getUsers(this.orgId).then(res=>{
               this.handlerList = res.data
           })
        },
        getRegional() {
            getOrg().then(res => {
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
        alloacte(){
            let data = {
                executorId:this.personId,taskId:this.id
            }
          assign(data).then(res=>{
            //   console.log(res)
              if(res.data.count){
                   this.$Message.success('数据保存成功!');
                    this.defectDetail()
                    this.allocation = false
              }
          })
        },
        changeItem(name){
        //   console.log(name)
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
            taskDetail(this.id).then(res=>{
                // console.log(res)
                if(res.data){
                    res.data.startTime = formatTime(res.data.startTime, 'yyyy-MM-dd HH:mm:ss')
                    res.data.endTime=formatTime(res.data.endTime, 'yyyy-MM-dd HH:mm:ss')
                    let text = res.data.executeStatus 
                    let a =text=='unallocated'?'未分配':(text=='toBeExecuted'?'待执行':(text=='executing'?'执行中':(text=='finished'?'已完成':(text=='abnormal'?'异常':'已终止'))))
                    res.data.executeStatus = a
                    this.faultDto = res.data
                    this.tableData = res.data.patrolPointDetailDTOs
                    this.attention = res.data.concerned
                    this.personId = res.data.executorId
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
            .ivu-btn {
                min-width: 70px;
                margin: 0 5px;
                border: none;
                height: 28px;
            }
            /deep/.ivu-dropdown {
                .ivu-btn {
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