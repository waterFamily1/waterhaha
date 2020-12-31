<template>
    <div class="user-information" :style="{height: height+'px'}">
        <div class="user-title">
            <h3>终端详情</h3>
            <div>
                <Button type="info" size="small" style="background:#4b7efe" @click="save('formItem')">保存</Button>
                <Button type="info" size="small" style="background:#c8c8c8" @click="goBack('formItem')">返回</Button>
            </div>
        </div>
        <div class="user-table">
            <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="150">
                <div class="c-form-row">
                    <div class="c-form-item">
                        <FormItem label="终端名称：" prop="name">
                            <Input v-model="formItem.name"></Input>
                        </FormItem>
                    </div>
                </div>
                <div class="c-form-row">
                    <div class="c-form-item">
                        <FormItem label="终端类型：" prop="type">
                            <Select v-model="formItem.type" @on-change="typeChange" style="width:280px" >
                                <Option v-for="item in terminalList" :value="item.value" :key="item.value">
                                    {{ item.label }}
                                </Option>
                            </Select>
                        </FormItem>
                    </div>
                    <div class="c-form-item">
                        <FormItem label="型号：" prop="model">
                            <Input v-model="formItem.model"></Input>
                        </FormItem>
                    </div>
                </div>
                <div class="c-form-row">
                    <div class="c-form-item">
                        <FormItem label="协议解析方法：" prop="analysis">
                            <Select v-model="formItem.analysis" @on-change="analyChange" :label-in-value='true' style="width:280px">
                                <Option v-for="item in analysisList" :value="item.value" :key="item.value">
                                    {{ item.label }}
                                </Option>
                            </Select>
                        </FormItem>
                    </div>
                    <div class="c-form-item">
                        <FormItem label="设备编号：">
                            <Input v-model="formItem.number" :disabled="single"></Input>
                            <Checkbox v-model="single" @on-change="create()" :disabled="singleDis">自动生成</Checkbox>
                        </FormItem>
                    </div>
                </div>
                <div class="c-form-row">
                    <div class="c-form-item">
                        <FormItem label="区域位置：">
                            <TreeSelect 
                                v-model="formItem.area" 
                                :data="processList"
                                @on-change="treeChange"
                                v-width="280" 
                            />
                        </FormItem>
                    </div>
                    <div class="c-form-item">
                        <FormItem label="安装位置：" prop="loaction">
                            <Input v-model="formItem.loaction"></Input>
                        </FormItem>
                    </div>
                </div>
                <div class="c-form-row">
                    <div class="c-form-item">
                        <FormItem label="网络方式：" prop="network">
                            <Select v-model="formItem.network" @on-change="networkChange" style="width:280px">
                                <Option v-for="item in networkList" :value="item.value" :key="item.value">
                                    {{ item.label }}
                                </Option>
                            </Select>
                        </FormItem>
                    </div>
                    <div class="c-form-item">
                        <FormItem label="SIM卡号：">
                            <Select v-model="formItem.sim" @on-change="simChange" style="width:280px">
                                <Option v-for="item in simList" :value="item.iccid" :key="item.iccid">
                                    {{ item.iccid }}
                                </Option>
                            </Select>
                        </FormItem>
                    </div>
                </div>
                <div class="c-form-row">
                    <div class="c-form-item">
                        <FormItem label="监控设备型号：">
                            <Input v-model="formItem.deviceNum"></Input>
                        </FormItem>
                    </div>
                </div>
                <div class="c-plain-bg-h">
                    <h3>心跳测点</h3>
                </div>
                <div class="c-form-row">
                    <div class="c-form-item c-form-item-special">
                        <FormItem label="心跳周期：">
                            <Input v-model="formItem.heartbeat" style="width:80px;"></Input>秒
                        </FormItem>
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>
<script>
    import { regionalCon, analyMethod, simMethod, terminalSave, deployMethod, deploySaveMethod } from '@/api/system/terminal'
    import createTree from '@/libs/public-util'

    export default {
        data(){
            return {
                height:'',
                single: false,
                autoEquno: 'N',
                formItem: {
                    name: '',
                    type: '0',
                    model: '',
                    analysis: '',
                    number: '',
                    numberId: '',
                    area: '',
                    loaction: '',
                    network: '2',
                    sim: '',
                    deviceNum: '',
                    heartbeat: 30
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '请输入终端名称', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请选择终端类型', trigger: 'blur' }
                    ],
                    model: [
                        { required: true, message: '请输入型号', trigger: 'blur' }
                    ],
                    analysis: [
                        { required: true, message: '请选择解析方法', trigger: 'blur' }
                    ],
                    loaction: [
                        { required: true, message: '请输入安装位置', trigger: 'blur' }
                    ],
                    network: [
                        { required: true, message: '请选择网络方式', trigger: 'blur' }
                    ],
                    number: [
                        { required: true, message: '请输入设备编号', trigger: 'blur' }
                    ],
                    sim: [
                        { required: true, message: '请选择SIM卡号', trigger: 'blur' }
                    ]
                },
                analysisList: [],
                processList: [],
                simList: [],
                terminalList: [
                    {
                        label: '网关',
                        value: '0'
                    }, {
                        label: '独立式设备',
                        value: '1'
                    }
                ],
                networkList: [
                    {
                        label: '2G',
                        value: '2'
                    }, {
                        label: '3G',
                        value: '3'
                    }, {
                        label: '4G',
                        value: '4'
                    }, {
                        label: '5G',
                        value: '5'
                    }, {
                        label: '有线',
                        value: '1'
                    }
                ],
                heartbeatMpoint: 0,
                terminalNo: '',
                fatherType: '',
                singleDis: false,
                autoHeartbeat: '',
                createTime: '',
                createUserid: '',
                heartbeatMpointName: '',
                id: '',
                parseMethodName: '',
                processName: '',
                tenantId: '',
                updateTime: '',
                updateUserid: ''
            }
        },
        created() {
            console.log(this.$route.query)
            this.fatherType = this.$route.query.type
            if(this.fatherType == 0) {
                //配置
                this.getHistory()
            } else if(this.fatherType == 1) {
                //新增
            }  
        },
        mounted() {
            this.height = document.body.clientHeight - 75
            this.getRegional()
            this.analySelect()
            this.simSelect() 
        },
        methods: {
            getHistory() {
                let ids = this.$route.query.ids
                deployMethod(ids).then(res => {
                    // console.log(res.data.terminalName)
                    this.autoEquno = res.data.autoEquno
                    this.autoHeartbeat = res.data.autoHeartbeat
                    this.createTime = res.data.createTime
                    this.createUserid = res.data.createUserid
                    this.formItem.number = res.data.equNo
                    this.formItem.heartbeat = res.data.heartbeatCycle
                    this.heartbeatMpoint = res.data.heartbeatMpoint
                    this.heartbeatMpointName = res.data.heartbeatMpointName
                    this.formItem.sim = res.data.iccid
                    this.id = res.data.id
                    this.formItem.loaction = res.data.installSite
                    this.formItem.model = res.data.model
                    this.formItem.deviceNum = res.data.monitorModel
                    this.formItem.network = res.data.network
                    this.formItem.analysis = res.data.parseMethod
                    this.parseMethodName = res.data.parseMethodName
                    this.formItem.area = res.data.processId
                    this.processName = res.data.processName
                    this.tenantId = res.data.tenantId
                    this.formItem.name = res.data.terminalName
                    this.terminalNo = res.data.terminalNo
                    this.formItem.type = res.data.terminalType
                    this.updateTime = res.data.updateTime
                    this.updateUserid = res.data.updateUserid
                    this.singleDis = true
                    if(this.autoEquno == 'Y') {
                        this.single = true
                    } else {
                        this.single = false
                    }
                }).catch(err => {
                    // 异常情况
                })
            },
            getRegional() {
                regionalCon().then(res => {
                    let treeItem = []
                    let trees = res.data
                    for(let i = 0; i < trees.length; i ++) {
                        trees[i].title = trees[i].name
                        trees[i].value = trees[i].id
                        trees[i].checked = false
                        treeItem.push(trees[i])
                    }
                    this.processList = createTree(treeItem, 0)
                }).catch(err => {
                    // 异常情况
                })
            },
            analySelect() {
                analyMethod().then(res=> {
                    // console.log(JSON.stringify(res))
                    this.analysisList = res.data
                }).catch(err => {
                    // 异常情况
                })
            },
            simSelect() {
                simMethod().then(res=> {
                    // console.log(JSON.stringify(res))
                    this.simList = res.data
                }).catch(err => {
                    // 异常情况
                })
            },
            save(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(this.fatherType == 0) {
                            deploySaveMethod({
                                autoEquno: this.autoEquno,
                                autoHeartbeat: this.autoHeartbeat,
                                createTime: this.createTime,
                                createUserid: this.createUserid,
                                equNo: this.formItem.number,
                                heartbeatCycle: this.formItem.heartbeat,
                                heartbeatMpoint: this.heartbeatMpoint,
                                heartbeatMpointName: this.heartbeatMpointName,
                                iccid: this.formItem.sim,
                                id: this.id,
                                installSite: this.formItem.loaction,
                                model: this.formItem.model,
                                monitorModel: this.formItem.deviceNum,
                                network: this.formItem.network,
                                parseMethod: this.formItem.analysis,
                                parseMethodName: this.parseMethodName,
                                processId: this.formItem.area,
                                processName: this.processName,
                                tenantId: this.tenantId,
                                terminalName: this.formItem.name,
                                terminalNo: this.terminalNo,
                                terminalType: this.formItem.type,
                                updateTime: this.updateTime,
                                updateUserid: this.updateUserid
                            }).then(res=> {
                                if(res.statusText == 'OK') {
                                    this.$router.push({
                                        path: '/terminal-setting',
                                        query: {
                                            goBack: '1'
                                        }
                                    })
                                }
                            }).catch(err=> {

                            })
                        } else if(this.fatherType == 1) {
                            terminalSave({
                                autoEquno: this.autoEquno,
                                equNo: this.formItem.number,
                                heartbeatCycle: this.formItem.heartbeat,
                                heartbeatMpoint: '',
                                iccid: this.formItem.sim,
                                installSite: this.formItem.loaction,
                                model: this.formItem.model,
                                monitorModel: this.formItem.deviceNum,
                                network: this.formItem.network,
                                parseMethod: this.formItem.analysis,
                                processId: this.formItem.area,
                                terminalName: this.formItem.name,
                                terminalNo: '',
                                terminalType: this.formItem.type
                            }).then(res=> {
                                // console.log(res)
                                if(res.statusText == 'OK') {
                                    this.$router.push({
                                        path: '/terminal-setting',
                                        query: {
                                            goBack: '1'
                                        }
                                    })
                                }
                            }).catch(err => {

                            })
                        }
                    } else {
                        // this.$Message.error('Fail!');
                    }
                })
            },
            typeChange(value) {
                this.formItem.type = value
            },
            analyChange(value) {
                // console.log(value.label)
                this.formItem.analysis = value.value
                this.parseMethodName = value.label
            },
            networkChange(value) {
                this.formItem.network = value
            },
            simChange(value) {
                this.formItem.sim = value  
            },
            treeChange(value) {
                this.formItem.area = value
            },
            goBack(name) {
                this.$refs[name].resetFields()
                this.$router.go(-1)
            },
            create() {
                if(this.single == false) {
                    this.autoEquno = 'N'
                } else {
                    this.autoEquno = 'Y'
                }
            }
        }
    }
</script>
<style lang="less" scoped>
.user-information{
    margin: 5px;
    background: #fff;
    .user-title{
        background: #fff;
        padding: 5px;
        h3{
            display: inline-block;
            line-height: 30px;
            text-indent: 10px;
        }
        div{
            float: right;
            button{
                min-width: 70px;
                margin: 0 5px;
                color: #fff;
                border: 0;
            }
        }
    }
    .user-table {
        width: 100%;
        border-top: 5px solid #f0f0f0;
        padding: 30px 10px 10px;
        .c-form-row {
            .c-form-item {
                width: 45%;
                display: inline-block;
                min-height: 33px;
                /deep/.ivu-form-item-content {
                    /deep/.ivu-input-wrapper {
                        width: 280px;
                    }
                    .ivu-checkbox-wrapper {
                        margin-left: 20px;
                    }
                }
            }
            .c-form-item-special {
                margin-top: 20px;
                /deep/.ivu-input-wrapper {
                    width: 80px;
                    /deep/.ivu-input {
                        height: 30px;
                    }
                }
            }
        }
        .c-plain-bg-h {
            border-bottom: 1px solid #f0f0f0;
            height: 50px;
            padding: 10px 0 10px 10px;
        }
    }
}
</style>
