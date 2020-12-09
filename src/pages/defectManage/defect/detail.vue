<template>
    <div class="detail-wrap" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <div>
                <h3>缺陷详情</h3>
                <a href="javascript:;" v-if="attention" @click="cancelAttention()">取消关注</a>
                 <a href="javascript:;" v-else @click="addAttention()">添加关注</a>
            </div>
            <div class="c-btns-right">
                <Button type="primary" @click="allocation=true">任务分派</Button>
                <Dropdown trigger="click" style="margin-left: 10px" @on-click="changeItem">
                    <Button type="primary">
                        处理
                        <Icon type="ios-arrow-down"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="hang">挂起</DropdownItem>
                        <DropdownItem name="close">关闭</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Button type="primary" style="background:#c8c8c8">返回</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
            <Row>
                <Col span="12">
                    <div class="item-form">
                        <label>缺陷类型：</label>
                        <span>{{ faultDto.faultTypeName }}</span>
                    </div>
                    <div class="item-form">
                        <label>所属组织：</label>
                        <span>{{ faultDto.orgName }}</span>
                    </div>
                    <div class="item-form">
                        <label>当前状态：</label>
                        <span>{{ faultDto.stateName }}</span>
                    </div>
                    <div class="item-form">
                        <label>严重程度：</label>
                        <span>{{ faultDto.severityTypeName }}</span>
                    </div>
                    <div class="item-form">
                        <label>相关巡检：</label>
                        <span>{{ polling }}</span>
                    </div>
                </Col>
                <Col span="12">
                    <div class="item-form">
                        <label>缺陷编号：</label>
                        <span>{{ faultDto.faultNumber }}</span>
                    </div>
                    <div class="item-form">
                        <label>区域位置：</label>
                        <span>{{ faultDto.processName }}</span>
                    </div>
                    <div class="item-form">
                        <label>当前处理人：</label>
                        <span>{{ faultDto.createUser }}</span>
                    </div>
                    <div class="item-form">
                        <label>相关设备：</label>
                        <span>{{ faultDto.equName }}</span>
                    </div>
                </Col>
            </Row>
        </div>
        <div class="c-top-border-gray">
            <Tabs value="name1" :animated="false">
                <TabPane label="缺陷详情" name="name1">
                    <div class="tabs-tabpane">
                        <label>缺陷备注：</label>
                        <span>{{faultDto.remark}}</span>
                    </div>
                    <div class="fault-detail">
                        <h3 class="c-gray-bg-h">现场缺陷记录</h3>
                        <div class="c-nodata-tip">暂无记录</div>
                    </div>
                </TabPane>
                <TabPane label="消缺记录" name="name2">
                    <Timeline>
                        <TimelineItem v-for="(item,index) in faultContrailVos" :key="index" @click="clickLine(index)" :class="{active:item.show}">
                            <div>
                                <div>{{item.timeDate}}  |</div>
                                <div>{{item.processingPersonName}} {{item.processResultName}} {{item.nextProcessPersonName}}</div>
                                <div>
                                    {{item.stateName}}
                                    <span></span>
                                </div>
                            </div>
                        </TimelineItem>
                    </Timeline>
                </TabPane>
                <TabPane label="备件申请" name="name3">
                    <Table stripe :columns="applyColumns" :data="applyData"></Table>
                </TabPane>
            </Tabs>
        </div>
        <!-- 任务分派 -->
         <Modal
            v-model="allocation"
            title="任务分派"
            width="330"
            :footer-hide="true">
            <div>选择相应的执行人员进行分派：</div>
            <div style="margin-top:20px">
                <TreeSelect v-model="orgId" placeholder="请选择组织"  :data="orgData" v-width="300" @on-change="changeOrg" size="small" />              
            </div>
            <div style="margin-top:20px">
                <Select v-model="personId" style="width:300px" placeholder="请选择人员" size="small">
                    <Option v-for="item in handlerList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="btn"> <span @click="alloacte()">分配</span></div>
        </Modal>
        <!-- 挂起 -->
        <Modal
            v-model="hangModal"
            title="处理"
            width="330"
            :footer-hide="true">
            <div>请选择挂起原因：</div>
            <div style="margin-top:20px">
                <Select v-model="hangId" style="width:300px" placeholder="请选择原因" size="small">
                    <Option v-for="item in hangList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="btn"> <span @click="sureHang()">确定</span></div>
        </Modal>
        <!-- 关闭 -->
        <Modal
            v-model="closeModal"
            title="处理"
            width="330"
            :footer-hide="true">
            <div>请选择关闭原因：</div>
            <div style="margin-top:20px">
                <Select v-model="closeId" style="width:300px" placeholder="请选择原因" size="small">
                    <Option v-for="item in closeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="btn"> <span @click="sureClose()">确定</span></div>
        </Modal>
    </div>
</template>
<script>
import { getOrg,getDetail,addCon,cancelCon,getUsers,assign,hangUp} from '@api/defect/task';
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
                    title: '物料编号',
                    key: 'name'
                }, {
                    title: '物料名称',
                    key: 'name'
                }, {
                    title: '品牌',
                    key: 'name'
                }, {
                    title: '型号',
                    key: 'name'
                }, {
                    title: '规格',
                    key: 'name'
                }, {
                    title: '计量单位',
                    key: 'name'
                }, {
                    title: '申请数量',
                    key: 'name'
                }, {
                    title: '申请人',
                    key: 'name'
                }, {
                    title: '申请日期',
                    key: 'name'
                }, {
                    title: '审核人',
                    key: 'name'
                }, {
                    title: '审核日期',
                    key: 'name'
                }, {
                    title: '结果',
                    key: 'name'
                }
            ],
            applyData: [],
            id:'',
            faultDto:{},
            faultContrailVos:[],
            attention:false,
            allocation:false,
            hangModal:false,
            closeModal:false,
            orgId:'',
            personId:'',
            handlerList:[],
            hangList:[
                {
                    label:'缺少备品',
                    value:1
                },
                {
                    label:'等待整改',
                    value:2
                },
                {
                    label:'统一规划',
                    value:3
                },
                {
                    label:'其他原因',
                    value:4
                },
            ],
            closeList:[
                {
                    label:'重复填报',
                    value:1
                },
                {
                    label:'误报',
                    value:2
                },
                {
                    label:'其他原因',
                    value:3
                }
            ],
            closeId:'',
            hangId:'',
            orgData:[]
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.id = this.$route.query.id
        this.defectDetail()
        this.getOrganizations()
    },
    methods:{
        sureHang(){
            let data = {
                faultHangupRenson: this.hangId,
                    id: this.id,
                    state: 2
            }
            hangUp(data).then(res=>{
                console.log(res)
                if(res.data.count){
                   this.$Message.success('处理成功!');
                    this.$router.go(-1)
              }
            })
        },
        sureClose(){
            let data = {
                faultHangupRenson: this.closeId,
                id: this.id,
                state: 3
            }
            hangUp(data).then(res=>{
                console.log(res)
                if(res.data.count){
                   this.$Message.success('处理成功!');
                    this.$router.go(-1)
              }
            })
        },
        alloacte(){
            let data={
                faultId: this.id,
                processingPersonId: this.personId
            }
          assign(data).then(res=>{
              console.log(res)
              if(res.data.count){
                   this.$Message.success('指派人员成功!');
                    this.$router.go(-1)
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
        getOrganizations(){
            getOrg().then(res=>{
                console.log(res)
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    treeItem.push(trees[i])
                }
                this.orgData = createTree(treeItem)
             })
        },
        userList(id){
          getUsers(id).then(res=>{
              console.log(res)
              if(res.data){
                  this.handlerList = res.data
              }
          })
        },
        clickLine(index){
            console.log(index)
            this.faultContrailVos.map((ele,idx)=>{
                if(index == idx){
                    ele.show = true
                }else{
                    ele.show = false
                }
            })
        },
        cancelAttention(){
          cancelCon(this.id).then(res=>{
             if(res.data.count){
                //  
                this.$Message.success('取消关注成功!');
                this.attention = false
             }
          })
        },
        addAttention(){
            let data = {
                concernId: this.id,
                type: "fault"
            }
            addCon(data).then(res=>{
                if(res.data.id){
                    this.$Message.success('关注成功!');
                    this.attention = true
                }
            })
        },
        defectDetail(){
            getDetail(this.id).then(res=>{
                console.log(res)
                if(res.data){
                    res.data.faultContrailVos.map(ele=>{
                        ele.timeDate = formatTime(ele.time, 'yyyy-MM-dd HH:mm ')

                        ele.show = false
                    })
                    res.data.faultContrailVos[0].show = true
                    this.faultContrailVos = res.data.faultContrailVos
                    this.faultDto = res.data.faultDto
                    this.attention = res.data.faultDto.concerned
                    
                }
            })
        }
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
</style>