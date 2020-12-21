<template>
    <div class="service-box" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>维修工单详情</h3>
            <span v-if="concernLoading" class="c-btn-attention">正在处理...</span>
            <span v-else>
                <a href="javascript:;" class="c-btn-attention" v-if="!repairVo.concerned" @click="concern">添加关注</a>
                <a href="javascirpt:;" class="c-btn-attention" v-else @click="cancelConcern">取消关注</a>
            </span>
            <div class="c-btns-right">
                <template v-if="repairVo.state != 3 && repairVo.state != 4 ">
                    <Button @click="isShowAssignDialog = true">任务分派</Button>
                    <div style="display:inline-block">
                        <Dropdown @on-click="faultHandle" class="fault-handle" trigger="click">
                            <Button style="margin-right:10px;background:#495566">
                                处理<Icon type="md-arrow-dropdown" />
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem 
                                    :name='item.value' 
                                    v-for="(item, index) in handleState" 
                                    :key="index"
                                >{{item.label}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </template>
                <Button style="background:#c8c8c8" @click="back">返回</Button>
            </div>
        </div>
        <div class="form-data-show">
            <Row>
                <Col span="12">
                   <label for="">故障设备：</label>
                   <span>{{ repairVo.equName }}</span>
                </Col>
                <Col span="12">
                   <label for="">维修编号：</label>
                   <span>{{ repairVo.repairNumber }}</span>
                </Col>
            </Row>
             <Row>
                <Col span="12">
                   <label for="">所属组织：</label>
                   <span>{{ repairVo.orgName }}</span>
                </Col>
                <Col span="12">
                   <label for="">设备编号：</label>
                   <span>{{ repairVo.equCode }}</span>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                   <label for="">当前状态：</label>
                   <span>{{ repairVo.stateName }}</span>
                </Col>
                <Col span="12">
                   <label for="">当前处理人：</label>
                   <span>{{ repairVo.processingPersonName }}</span>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                   <label for="">区域位置：</label>
                   <span>{{ repairVo.processName }}</span>
                </Col>
                <Col span="12">
                   <label for="">紧急程度：</label>
                   <span>{{ repairVo.severityTypeName }}</span>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                   <label for="">故障原因：</label>
                   <span>{{ repairVo.faultReasonName }}</span>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                   <label for="">备注：</label>
                   <span>{{ repairVo.remark }}</span>
                </Col>
            </Row>
        </div>
        <div class="form-data-show">
            <Tabs value="name1" @on-click="tabClick" :animated="false">
                <TabPane label="缺陷详情" name="name1">
                   <Row>
                        <Col span="12">
                            <label for="">缺陷类型：</label>
                            <span>{{ faultDetailVo.faultTypeName }}</span>
                        </Col>
                        <Col span="12">
                            <label for="">缺陷编号：</label>
                            <span>{{ faultDetailVo.faultNumber }}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <label for="">严重程度：</label>
                            <span>{{ faultDetailVo.severityTypeName }}</span>
                        </Col>
                        <Col span="12">
                            <label for="">相关设备：</label>
                            <span>{{ faultDetailVo.equName }}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <label for="">相关巡检：</label>
                            <span>{{ faultDetailVo.patrolName }}</span>
                        </Col>
                        <Col span="12">
                            <label for="">申报人员：</label>
                            <span>{{ faultDetailVo.createUser }}</span>
                        </Col>
                    </Row>
                     <Row>
                        <Col span="12">
                            <label for="">申报时间：</label>
                            <span>{{ faultDetailVo.createDate }}</span>
                        </Col>
                        <Col span="12">
                            <label for="">缺陷备注：</label>
                            <span>{{ faultDetailVo.remark }}</span>
                        </Col>
                    </Row>
                    <div class="record">
                        <div class="title">现场缺陷记录</div>
                        <div class="img" v-if="faultDetailVo.pictureVideos && faultDetailVo.pictureVideos.length">
                            <div 
                                class="fault-live-img" 
                                v-for="(item, index) in faultDetailVo.pictureVideos"  
                                @click="playVideo(item)"
                                :key="index"
                            >
                                <div v-if="item.type == 1">
                                    <Icon type="social-youtube-outline"></Icon>
                                    <img :src="item.thumbnailUrl" alt="">
                                </div>
                                <img v-else :src="item.imgUrl" >
                            </div>
                        </div>           
                        <div class="c-nodata-tip" v-else>暂无记录</div>            
                    </div>
                </TabPane>
                <TabPane label="维修记录" name="name2">
                    <div v-if="repairRecordProgressList.length > 0">
                        <div class="fault-log">
                            <Timeline>
                                <TimelineItem 
                                    v-for="(item, index) in repairRecordProgressList" 
                                    :key="index"
                                    :class="selectedLog.repairContrailId == item.repairContrailId ? 'ivu-timeline-item-active':''"
                                >
                                    <div class="fault-log-item" @click="logClick(item)" >
                                        <span class="fault-log-date">{{item.time}}</span> 
                                        <span class="fault-log-operator">{{item.processingPersonName}} {{item.processingResult}} {{item.nextProcessingPersonName}}</span> 
                                        <span class="fault-log-handle" :class="'log-handle-'+item.repairResult">{{item.repairResultName}}</span> 
                                    </div>
                                </TimelineItem>
                            </Timeline>
                        </div>
                        <div 
                            v-if="selectedLog.repairResult==5||selectedLog.repairResult==0" 
                            class="fault-log-detail" 
                            style="text-align: center;"
                        >
                            <img src="../../assets/images/fault-emptydata.png"/>
                            <div style="padding:10px;">暂无记录</div>
                        </div>
                        <div 
                            v-if="selectedLog.repairResult!=5&&selectedLog.repairResult!=0" 
                            class="fault-log-detail"
                        >
                            <ul class="fault-log-info">
                                <li>
                                    <label>维修结果：</label>
                                    <span>{{ selectedLog.repairResultName }}</span>
                                </li>
                                <li>
                                    <label>维修措施：</label>
                                    <span>{{ selectedLog.repairAdoptname }}</span>
                                </li>
                                <li>
                                    <label>故障分析：</label>
                                    <span>{{ selectedLog.faultAnalysis }}</span>
                                </li>
                                <li>
                                    <label>备件申请：</label>
                                    <span style="color: rgb(75, 126, 254)">{{ selectedLog.applicationFlag == true? '是':'否' }}</span>
                                </li>
                                <li>
                                    <label>处理原因：</label>
                                    <span>{{ selectedLog.handleReason }}</span>
                                </li>
                                <li>
                                    <label>完成时间：</label>
                                    <span>{{ selectedLog.finishDate }}</span>
                                </li>
                            </ul>
                            <h3 class="fault-log-h3">处理后现场记录</h3>
                            
                            <div 
                                class="fault-live" 
                                v-if="selectedLog.pictureVideos && selectedLog.pictureVideos.length"
                            >
                                <div 
                                    class="fault-live-img" 
                                    v-for="(item, index) in selectedLog.pictureVideos"  
                                    :key="index"
                                    @click="playVideo(item)"
                                >
                                    <div v-if="item.type == 1">
                                        <Icon type="social-youtube-outline"></Icon>
                                        <img :src="item.thumbnailUrl" alt="">
                                    </div>
                                    <img v-else :src="item.imgUrl" alt="" v-img:liveImg(item)>
                                </div>
                            </div>
                            <div class="c-nodata-tip" v-else :style="{height: autoHeight,lineHeight:autoHeight}">暂无记录</div>
                        </div>
                    </div>
                </TabPane>
                <TabPane label="备件申请" name="name3">
                    <Table stripe :columns="tableList" :data="tableData"></Table>
                </TabPane>
            </Tabs>
        </div>
        <!--任务派发弹层-->
        <Modal
            v-model="isShowAssignDialog"
            width=330
            title="任务分派">
            <p style="height: 40px;font-size:13px;">选择相应的执行人员进行分派：</p>
            <div>
                <TreeSelect 
                    v-model="org" 
                    :data="orgData" 
                    v-width="300" 
                    placeholder="请选择组织"
                    @on-change="getUnderOrganizationUsers"
                />
                <Form ref="assignForm" :model="assignFormModel" style="margin-top: 10px">
                    <FormItem prop="assignTo" :rules="{required: true, message: '请选择人员', trigger:'change', type:'number'}">
                        <Select 
                            v-model="assignFormModel.assignTo" 
                            style="width:300px" 
                            placeholder="请选择人员"
                        >
                            <Option v-for="item in operators" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
            <div style="margin-top:30px;">
                <Button type="primary" size="large" long @click="assign" :loading="btnLoading">分派</Button>
            </div>
            <div slot="footer"></div>
        </Modal>
        <!--处理弹层-->
        <Modal
            v-model="isShowHandleDialog"
            width=300
            title="处理">
            <p style="height: 40px;font-size:13px;">请选择{{handleTypeText}}原因：</p>
            <div>
                <Form ref="handleForm" :model="handleFormModel">
                    <FormItem prop="reason" :rules="{type:'number', required: true, message: '请选择原因', trigger:'change'}">
                        <Select v-model="handleFormModel.reason" style="width:267px" placeholder="请选择原因"><Option v-for="item in reasons" :value="item.value" :key="item.value">{{ item.label }}</Option></Select>
                    </FormItem>
                </Form>
            </div>
            <div style="margin-top:30px;"><Button type="primary" shape="circle" size="large" long @click="handle" :loading="btnLoading">确定</Button></div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script src="http://lib.baomitu.com/chimee-player/1.1.9/chimee-player.browser.js"></script>
<script>
import { detailMethod, partMethod, attentionMethod, cancleAttenMethod, getOrganizations, personMethod, dispatchMethod, hangMethod } from '@/api/service/order'
import util from '@/libs/public_js'
import createTree from '@/libs/public-util'
import { formatTime } from '@/libs/public'
import { mapState } from 'vuex'

var cPlayer


export default {
    data () {
        return {
            autoHeight: '50px',
            height: 0,
            id: '',
            isShowPlayDialog: false,
            repairVo: {},
            faultDetailVo: {},
            tableList: [
                {
                    title: '物料编号',
                    key: 'materielNumber',
                    ellipsis: true
                }, {
                    title: '物料名称',
                    key: 'materielName',
                    ellipsis: true
                }, {
                    title: '品牌',
                    key: 'brand',
                    ellipsis: true
                }, {
                    title: '型号',
                    key: 'model',
                    ellipsis: true
                }, {
                    title: '规格',
                    key: 'standard',
                    ellipsis: true
                }, {
                    title: '计量单位',
                    key: 'measurementUnit',
                    ellipsis: true
                }, {
                    title: '申请数量',
                    key: 'outAmount',
                    ellipsis: true
                }, {
                    title: '申请人',
                    key: 'applicantName',
                    ellipsis: true
                }, {
                    title: '申请日期',
                    key: 'outPutDate',
                    render: (h, params) => {
                        let that = this
                        const text = params.row.outPutDate
                        return h('span', {}, formatTime(text, 'yyyy-MM-dd HH:mm:ss'));
                    },
                    ellipsis: true
                }, {
                    title: '审核人',
                    key: 'auditorName',
                    ellipsis: true
                }, {
                    title: '审核日期',
                    key: 'auditorDate',
                    render: (h, params) => {
                        let that = this
                        const text = params.row.auditorDate
                        if(text == null || text == undefined || text == '') {
                            return h('span', {}, text);
                        } else {
                            return h('span', {}, formatTime(text, 'yyyy-MM-dd HH:mm:ss'));
                        }
                    },
                    ellipsis: true
                }, {
                    title: '结果',
                    key: 'auditedFlag',
                    render: (h, params) => {
                        let that = this
                        const text = params.row.auditedFlag
                        if(text == 0) {
                            return h('span', {}, '未审核');
                        } else {
                            return h('span', {}, '已审核');
                        }
                    },
                    ellipsis: true
                }
            ],
            tableData: [],
            concernLoading: false,
            isShowAssignDialog: false,
            orgData: [],
            org: '',
            assignFormModel: {
                assignTo: ''
            },
            operators: [],
            btnLoading: false,
            isShowHandleDialog: false,
            handleFormModel: {
                reason: ''
            },
            reasons: [],
            handleType: '',
            handleTypeText: '',
            repairRecordProgressList: [],
            selectedLog: {
                processingResultName : '',
                faultReason : '',
                remark : '',
                faultCloseRenson : '',
                pictureVideos: []
            }
        }
    },
    computed : mapState({
        handleState : (state) => state.map.fault.handleState,
        handleStateText : (state) => state.map.fault.handleStateText,
        handleReason : (state) => state.map.maintain.handleReason,
        handleReasonText : (state) => state.map.maintain.handleReasonText
    }),
    mounted() {
        this.height = document.body.clientHeight-70
        this.id = this.$route.query.id
        this.getDetail()
        this.getOrg()
        var h = document.querySelector('#app').clientHeight - 800
        this.autoHeight = (h > 50 ? h : 50) + 'px';
        // cPlayer = new Chimee({
        //     wrapper: '#player',
        //     controls: true,
        //     autoplay: true,
        //     height: 400
        // });
    },
    methods :{
        getDetail() {
            let id = this.id
            detailMethod(id).then(res=> {
                // console.log(res)
                this.repairVo = Object.assign({}, this.repairVo, res.data.repairVo)
                this.faultDetailVo = Object.assign({}, this.faultDetailVo, res.data.faultDetailVo)
                this.faultDetailVo.createDate = formatTime(res.data.faultDetailVo.createDate, 'yyyy-MM-dd HH:mm:ss')
                if(res.data.repairRecordProgressList && res.data.repairRecordProgressList.length) {
                    res.data.repairRecordProgressList.forEach(function(item) {
                        item.time = util.F(item.time, 'yyyy-MM-dd hh:mm')
                    })
                    this.repairRecordProgressList = res.data.repairRecordProgressList;
                    this.selectedLog = Object.assign({}, this.selectedLog, res.data.repairRecordProgressList[0]);
                    if(res.data.repairRecordProgressList[0].finishDate == null || res.data.repairRecordProgressList[0].finishDate == undefined || res.data.repairRecordProgressList[0].finishDate == '') {

                    } else {
                        this.selectedLog.finishDate = formatTime(res.data.repairRecordProgressList[0].finishDate, 'yyyy-MM-dd')
                    }
                }
            }).catch(err=> {

            })
        },
        concern () {
            this.concernLoading = true
            attentionMethod({
                concernId: this.id,
                type: "repair"
            }).then(res=> {
                if(res) {
                    this.$Notice.success({
                        title: '关注成功！',
                    })
                    this.repairVo.concerned = true
                }
            }).catch(err=> {

            })
        },
        cancelConcern () {
            this.concernLoading = true
            cancleAttenMethod(this.id).then(res=> {
                if(res){
                    this.$Notice.success({
                        title: '取消关注成功！',
                    })
                    this.repairVo.concerned = false
                }
                this.concernLoading = false
            }).catch(err=> {

            })
        },
        getOrg() {
            getOrganizations().then(res=> {
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    treeItem.push(trees[i])
                }
                this.orgData = createTree(treeItem)
            }).catch(err=> {

            })
        },
        getUnderOrganizationUsers(selected) {
            personMethod(selected).then(res=> {
                if(res && res.data.length) {
                    this.operators = res.data
                }
            }).catch(err=> {

            })
        },
        assign() {
            this.$refs['assignForm'].validate((valid) => {
                if (valid) {
                    this.btnLoading = true
                    dispatchMethod({
                        processingPersonId: this.assignFormModel.assignTo,
                        repairId: this.$route.query.id,
                    }).then(res=> {
                        if(res.data.count) {
                            this.$Notice.success({
                                title: '指派人员成功！',
                            })
                            this.isShowAssignDialog = false
                            this.$router.back()                  
                        }
                        this.btnLoading = false
                    }).catch(err=> {

                    })
                }
            })
        },
        faultHandle(data) {
            this.$refs['handleForm'].resetFields()
            this.handleType = data
            this.handleTypeText = this.handleStateText[data]
            this.reasons = this.handleReason[data]
            this.isShowHandleDialog = true
        },
        handle() {
            this.$refs['handleForm'].validate((valid) => {
                if (valid) {
                    this.btnLoading = true
                    hangMethod({
                        id: this.$route.query.id,
                        [this.handleType == 2 ? 'repairHangupRenson':'repairCloseReason']: this.handleFormModel.reason,
                        state: this.handleType
                    }).then(res=> {
                        if(res.data.count) {
                            this.$Notice.success({
                                title: '处理成功！',
                            })
                            this.isShowHandleDialog = false
                            this.$router.back()
                        }
                        this.btnLoading = false
                    }).catch(err=> {

                    })
                }
            })
        },
        playVideo(item){
            if(item.type == 1){
                this.isShowPlayDialog = true
                this.isShowPlayDialog = true
                // cPlayer.load(item.videoUrl)

            }
        },
        tabClick(name) {
            if(name == 'name3') {
                let associationNo = this.repairVo.repairNumber
                let associationId = this.id
                partMethod({
                    associationId,
                    associationNo
                }).then(res=> {
                    // console.log(res)
                    this.tableData = res.data
                }).catch(err=> {

                })
            }
        },
        logClick(item) {
            console.log(item.finishDate)
            this.selectedLog = item
            if(item.finishDate == null || item.finishDate == undefined || item.finishDate == '') {

            } else {
                this.selectedLog.finishDate = formatTime(item.finishDate, 'yyyy-MM-dd')
            }
        },
        back () {
            this.$router.back()
        }
    }
}
</script>
<style lang="less" scoped>
.service-box{
    margin: 5px;
    background: #fff;
    overflow: auto;
    .c-left-border-blue{
        border-radius: 3px;
        padding: 5px;
        h3{
            display: inline-block;
            height: 30px;
            line-height: 30px;
            text-indent: 10px;
        }
        span{
            color: #4b7efe;
            margin-left: 20px;
            font-weight: 700;
        }
        .c-btns-right {
            float: right;
            margin-top: 2px;
            .ivu-btn {
                height: auto;
                background: #4b7efe;
                font-size: 12px;
                padding: 4px 12px;
                color: #fff;
                border: 0;
                border-radius: 3px;
                margin: 0 5px;
            }
        }
    }
    .form-data-show{
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        label{
            display: inline-block;
            width: 100px;
            text-align: right;
            line-height: 35px;
            font-weight: 700;
        }
        .record{
            margin-top: 10px;
            .title{
                background-color: #f4f4f4;
                height: 30px;
                line-height: 30px;
                text-indent: 20px;
                font-weight: 100;
                font-size: 13px;
            }
            .img{
                position: relative;
                display: inline-block;
                width: 130px;
                height: 130px;
                background: #EEE;
                margin: 20px 10px 10px 0;
                overflow: hidden;
                cursor: pointer;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .c-nodata-tip {
        text-align: center;
        line-height: 50px;
    }
    .fault-log {
        width: 500px;
        float: left;
        padding: 20px 0 0 35px;
    }
    .fault-log-detail {
        // width: 100%;
        margin-left: 520px;
        margin-right: 10px;
        background-color: #f4f4f4;
        padding: 20px;
    }
    .fault-log-item {
        cursor: pointer;
        .fault-log-date {
            display: inline-block;
            vertical-align: middle;
        }
        .fault-log-operator {
            margin-left: 10px;
            display: inline-block;
            width: 200px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            vertical-align: middle;
        }
        .fault-log-handle {
            margin-left: 30px;
            display: inline-block;
            width: 70px;
            text-align: right;
            vertical-align: middle;
        }
    }
    .fault-log-info {
        label {
            width: auto;
            font-weight: 500;
        }
    }
}
.fault-log-item:hover {
    background-color: #F9F9F9;
}
.log-handle-2:after {
    background-color: #e03e3e;
}
.fault-log-handle:after {
    display: inline-block;
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #CCC;
    margin-left: 10px;
}
/deep/.ivu-timeline-item-active {
    color: #4b7efe;
    font-weight: 700;
    .ivu-timeline-item-head {
        width: 18px;
        height: 18px;
        left: -3px;
        top: 0;
    }
}
/deep/.ivu-timeline-item-content {
    div {
        div {
            display: inline-block;
            color: #4b7efe;
            font-weight: 700;
            font-size: 13px;
            margin-right: 10px;
        }
        div:first {
            border-right: 2px solid #d8d8d8;
        }
    }
}
li{
    list-style: none;
}
</style>