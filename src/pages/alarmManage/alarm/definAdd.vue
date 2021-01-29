<template>
    <div class="defin-wrap" :style="{height: height+'px'}">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <div class="c-left-border-blue">
                <h3>报警定义</h3> 
                <div class="c-btns-right">
                    <Button type="primary" @click="saveHandle('formValidate')">保存</Button>
                    <Button type="primary" class="c-btn-back" @click="goBack()">取消</Button>
                </div>
            </div>
            <div class="c-top-border-gray">
                <Row>
                    <Col span="12">
                        <FormItem label="区域位置：" prop="area">
                            <TreeSelect v-model="formValidate.area" :data="areadData" v-width="250" />
                        </FormItem>
                        <FormItem label="确认方法：">
                            <Select v-model="formValidate.confirmWay" style="width:250px">
                                <Option v-for="item in wayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="触发时间：">
                            <Select v-model="formValidate.time" style="width:250px">
                                <Option v-for="item in timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="报警条件：">
                            <Select v-model="formValidate.condition" style="width:250px">
                                <Option v-for="item in conditionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="报警名称：" prop="name">
                            <Input v-model="formValidate.name" style="width: 250px;"></Input>
                        </FormItem>
                        <FormItem label="报警等级：">
                            <Select v-model="formValidate.alarmLevel" style="width:250px">
                                <Option v-for="item in levelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="使用状态：">
                            <RadioGroup v-model="formValidate.state">
                                <Radio label="ON">启用</Radio>
                                <Radio label='OFF'>停用</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>
                </Row>
            </div>
            <div style="padding: 0 20px;">
                <Tabs :animated="false">
                    <TabPane label="报警条件">
                        <div class="c-table-top-btns">
                            <Button @click="addModal()">新增</Button>
                        </div>
                        <Table :columns="columns1" :data="data1">
                             <template slot-scope="{ row }" slot="name">
                                <strong>{{ row.name }}</strong>
                            </template>
                            <template slot-scope="{ row, index }" slot="action">
                                <Button type="text" size="small" style="margin-right: 5px;color:rgb(75, 126, 254);font-size:12px" @click="deleteIdx(index)">删除</Button>
                            </template>
                        </Table>
                    </TabPane>
                    <TabPane label="报警订阅">
                        <div class="c-table-top-btns">
                            <Button @click="addDefine()">新增</Button>
                            <Checkbox v-model="formValidate.single">同步接收报警确认消息</Checkbox>
                        </div>
                        <Table :columns="columns2" :data="data2">
                            <template slot-scope="{ row }" slot="name">
                                <strong>{{ row.name }}</strong>
                            </template>
                            <template slot-scope="{ row, index }" slot="action">
                                <Button type="text" size="small" style="margin-right: 5px;color:rgb(75, 126, 254);font-size:12px" @click="deleteDef(index)">删除</Button>
                            </template>
                        </Table>
                    </TabPane>
                    <TabPane label="处理预案">
                        <Table :columns="columns3" :data="data3"></Table>
                    </TabPane>
                </Tabs>
            </div>
        </Form>
         <Modal v-model="modal" width="600" class="model-box"> 
            <p slot="header" style="color:#1c2438;font-size:14px;border-left:7px solid #4b7efe;background:#f8f9fb;height:39px;line-height:39px">
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <span class="rectangle"></span>
                <span style="margin-left:8px">测点选择</span>
            </p>
            <div>
                <div>
                    <input  type="text" name=""  v-model="modelKey" placeholder="测点编号/名称" style="margin-right:8px;border:1px solid #eaeaea;outline:0;padding-left:10px">
                     <Button type="primary" size="small" @click="search()">搜索</Button>
                </div>
                <div class="mg-select-table-tip">
                        已选择<strong>{{selectedData.length}}</strong>个
                        <a href="javascript:;" @click="handleClearSelect(false)">[清空]</a>
                    </div>
                     <div class="model-table">
                    <Table size="small" ref="selection" :columns="modelColumns" :data="modelData"
                        @on-select="handleSelect"
                        @on-select-cancel="handleSelectCancel"
                        @on-select-all="handleSelectAll"
                        @on-select-all-cancel="handleSelectAllCancel">
                          
                    </Table>
                    <Page :total="modelTotal" show-elevator size="small" class="page" style="text-align:right;margin-top:20px" @on-change="changeModalSize"  />
                     <div class="btn-group">
                        <span @click="modal = false">取消</span>
                        <Button style="background: #4b7efe;min-width:130px;color:#fff;line-height:26px" @click="sure()">确定</Button>
                     </div>
                </div>
            </div>
            <div slot="footer" >
            </div>
        </Modal>
         <Modal v-model="modal1" width="600" class="model-box"> 
            <p slot="header" style="color:#1c2438;font-size:14px;border-left:7px solid #4b7efe;background:#f8f9fb;height:39px;line-height:39px">
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <span class="rectangle"></span>
                <span style="margin-left:8px">测点选择</span>
            </p>
            <div>
                <div>
                    <input type="text" name=""  v-model="modelKey" placeholder="测点编号/名称" style="margin-right:8px;border:1px solid #eaeaea;outline:0;padding-left:10px">
                     <Button type="primary" size="small" @click="search()">搜索</Button>
                </div>
                     <div class="model-table">
                    <Table size="small" ref="selection" :columns="modelColumns1" :data="modelData">
                         <template slot-scope="{ row }" slot="name">
                                <strong>{{ row.name }}</strong>
                            </template>
                            <template slot-scope="{ row, index }" slot="action">
                               <Icon type="ios-checkmark-circle-outline"  style="font-size:22px;color:#999" @click="checkThis(row)" />
                            </template>
                    </Table>
                    <Page :total="modelTotal" show-elevator size="small" class="page" style="text-align:right;margin-top:20px" @on-change="changeModalSize"  />
                </div>
            </div>
            <div slot="footer" >
            </div>
        </Modal>
    </div>
</template>
<script>
import {getUsers,getTree,getModalList,addDefinition} from '@/api/alarm/definition'
import createTree from '@/libs/public-util'
export default {
    name: 'definAdd',
    data() {
        return {
            height: '',
            formValidate: {
                area: '',
                name: '',
                confirmWay: 'AutoOrManual',
                time: '0',
                alarmLevel: '1',
                condition: '1',
                state: 'ON',
                single: true
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                area :[
                    { required: true, message: '请选择区域位置', trigger: 'change' ,type:'number'}
                ]
            },
            areadData: [],
            wayList: [
                {
                    value: 'Auto',
                    label: '自动'
                }, {
                    value: 'AutoOrManual',
                    label: '自动或者人工'
                }, {
                    value: 'Manual',
                    label: '人工'
                }
            ],
            levelList: [
                {
                    value: '1',
                    label: '1级'
                }, {
                    value: '2',
                    label: '2级'
                }, {
                    value: '3',
                    label: '3级'
                }
            ],
            timeList: [
                {
                    value: '0',
                    label: '立即触发'
                }, {
                    value: '1',
                    label: '延迟1分钟触发'
                }, {
                    value: '5',
                    label: '延迟5分钟触发'
                }, {
                    value: '10',
                    label: '延迟10分钟触发'
                }
            ],
            conditionList: [
                {
                    value: '1',
                    label: '满足其中一条触发规则'
                }, {
                    value: '2',
                    label: '满足所有规则后触发'
                }
            ],
            columns1: [
                {
                    title: '测点名称',
                    key: 'mpointName',
                    render: (h, params) => {
                        let that = this
                        return h('div',{
                            style:{
                                position:'relative'
                            }
                        }, [
                            h('span', that.data1[params.index].mpointName),
                            h('span',{
                                style:{
                                    color:'#4b7efe',
                                    position:'absolute',
                                    right:'0'
                                },
                                on:{
                                    'click':()=>{
                                        this.curIndex = params.index
                                        this.modal1 = true
                                        this.modelKey = ''
                                        this.getModal()
                                    }
                                }
                                
                            }, '[更换]')
                        ]);
                    }
                }, {
                    title: '条件',
                    key: 'symbol',
                    render: (h,params) => {
                        let that = this;
                        return h('Select',{
                            props:{
                                size:'small',
                                transfer:true,
                                value :that.data1[params.index].symbol
                            },
                            on:{
                                'on-change':(val)=>{
                                   that.data1[params.index].symbol = val
                                }
                            }
                        },
                        this.relationList.map(item=>{
                            return h('Option',{
                                props:{
                                    value: item,
                                    key: item
                                }
                            },item)
                        })
                        )
                    }
                }, {
                    title: '阈值',
                    key: 'threshold',
                    render: (h, params) => {
                        let that = this
                        console.log(params)
                        if(this.data1[params.index].symbol =='5分钟无数据'){
                            return ""
                        }else{
                            return h('Input',{
                            props:{
                                size:'small',
                            },
                            on:{
                                    input(val){
                                    that.data1[params.index].threshold = val
                                    }
                                }
                            });
                        }
                       
                    }
                }, {
                    title: '单位',
                    key: 'unit'
                }, {
                    title: '所属设备',
                    key: 'equipmentName'
                }, {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            data1: [],
            columns2: [
                {
                    title: '接收对象',
                    key: 'userName',
                    render: (h,params) => {
                        let that = this;
                        return h('Select',{
                            props:{
                                size:'small',
                                transfer:true,
                                value :''
                            },
                            on:{
                                'on-change':(val)=>{
                                   that.data2[params.index].userId = val
                                   that.receiveObj.map(ele=>{
                                       if(ele.value == val){
                                           that.data2[params.index].userName = ele.label
                                       }
                                   })
                                }
                            }
                        },
                        this.receiveObj.map(item=>{
                            return h('Option',{
                                props:{
                                    value: item.value,
                                    key: item.value
                                }
                            },item.label)
                        })
                        )
                    }
                }, {
                    title: '接收方式',
                    key: 'subscribeMode',
                    render: (h,params) => {
                        let that = this;
                        return h('Select',{
                            props:{
                                size:'small',
                                transfer:true,
                                value :'SysMsg',
                                multiple:true
                            },
                            on:{
                                'on-change':(val)=>{
                                   that.data2[params.index].subscribeMode = val.join('')
                                   that.data2[params.index].subscribeModeArr=val
                                }
                            }
                        },
                        this.msgList.map(item=>{
                            return h('Option',{
                                props:{
                                    value: item.value,
                                    key: item.value
                                }
                            },item.label)
                        })
                        )
                    }
                }, {
                    title: '推送频率',
                    key: 'pushFrequency',
                     render: (h,params) => {
                        let that = this;
                        return h('Select',{
                            props:{
                                size:'small',
                                transfer:true,
                                value :that.data2[params.index].pushFrequency,
                            },
                            on:{
                                'on-change':(val)=>{
                                   that.data2[params.index].pushFrequency = val
                                }
                            }
                        },
                        this.freList.map(item=>{
                            return h('Option',{
                                props:{
                                    value: item.value,
                                    key: item.value
                                }
                            },item.label)
                        })
                        )
                    }
                }, {
                    title: '延迟推送时间',
                    key: 'delayPushTime',
                     render: (h,params) => {
                        let that = this;
                        return h('Select',{
                            props:{
                                size:'small',
                                transfer:true,
                                value :that.data2[params.index].delayPushTime,
                            },
                            on:{
                                'on-change':(val)=>{
                                    console.log(val)
                                   that.data2[params.index].delayPushTime = val
                                }
                            }
                        },
                        this.delayList.map(item=>{
                            
                            return h('Option',{
                                props:{
                                    value: item.value,
                                    key: item.value
                                }
                            },item.label)
                        })
                        )
                    }
                }, {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            data2: [],
            columns3: [
                {
                    title: '预案内容',
                    key: 'processingPlan',
                    width: 800,
                    render: (h, params) => {
                        let that = this
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'textarea',
                                },
                                 on:{
                                input(val){
                                   that.data3.processingPlan = val
                                }
                            }
                            })
                        ]);
                    }
                }, {
                    title: '联系人',
                    key: 'contactPersonName',
                   render: (h,params) => {
                        let that = this;
                        return h('Select',{
                            props:{
                                size:'small',
                                transfer:true,
                                value :''
                            },
                            on:{
                                'on-change':(val)=>{
                                   console.log(val)
                                   this.receiveObj.map(ele=>{
                                       if(ele.value == val){
                                           that.data3.contactPersonName = ele.label
                                       }
                                   })
                                   
                                   this.data3.contactPersonId= val
                                }
                            }
                        },
                        this.receiveObj.map(item=>{
                            return h('Option',{
                                props:{
                                    value: item.value,
                                    key: item.value
                                }
                            },item.label)
                        })
                        )
                    }
                }
            ],
            data3: [{
                processingPlan:'',
                contactPersonName:'',
                contactPersonId:''
            }],
            modal:false,
            modelKey:'',
            selectedData:[],
            modelColumns:[
                {
                    type: 'selection',
                    width: 70,
                    align: 'center'
                },
                {
                    title: '测点编号',
                    key: 'mpointId'
                },
                {
                    title: '区域位置',
                    key: 'siteName'
                },
                {
                    title: '测点名称',
                    key: 'mpointName'
                },
            ],
            modelColumns1:[
                {
                    title: '测点编号',
                    key: 'mpointId'
                },
                {
                    title: '区域位置',
                    key: 'siteName'
                },
                {
                    title: '测点名称',
                    key: 'mpointName'
                },
                {
                     title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            modelData:[],
            modelTotal:0,
            modalPage:1,
            relationList:["=",'>',"<","≠","≥","≤","5分钟无数据"],
            modal1:false,
            curIndex:0,
            receiveObj:[],
            freList:[
                {
                    value:'1',
                    label:'5分钟'
                },
                {
                    value:'2',
                    label:'10分钟'
                },
                {
                    value:'3',
                    label:'15分钟'
                },
                {
                    value:'4',
                    label:'30分钟'
                },
                {
                    value:'5',
                    label:'1小时'
                },
                {
                    value:'6',
                    label:'2小时'
                },
                {
                    value:'7',
                    label:'12小时'
                },
                {
                    value:'8',
                    label:'24小时'
                },
                {
                    value:'9',
                    label:'仅推送1次'
                },
               ],
            delayList :[
                  {
                    value:'1',
                    label:'5分钟'
                },
                {
                    value:'2',
                    label:'10分钟'
                },
                {
                    value:'3',
                    label:'15分钟'
                },
                {
                    value:'4',
                    label:'30分钟'
                },
                {
                    value:'5',
                    label:'1小时'
                },
                {
                    value:'6',
                    label:'2小时'
                },
                {
                    value:'7',
                    label:'12小时'
                },
                {
                    value:'8',
                    label:'24小时'
                },
                {
                    value:'9',
                    label:'仅推送1次'
                },
                {
                    value:'10',
                    label:'不推送'
                },
            ],
            msgList: [
                {
                    value: 'SysMsg',
                    label: '在线消息'
                }, {
                    value: 'SMS',
                    label: '短信'
                }
            ],
            tempArr:[]
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getRegional()
        this.getModal()
        this.getUserList()
    },
    methods: {
        getUserList(){
           getUsers().then(res=>{
               console.log(res)
               this.receiveObj = res.data
           })
        },
        getModal() {
            getModalList(this.modelKey,this.modalPage,this.formValidate.area).then(res=>{
                console.log(res)
                this.modelData = res.data.items
                this.modelTotal = res.data.total
              
            })
        },
        getRegional() {
            getTree().then(res => {
                // console.log(res)
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].expand = true
                    treeItem.push(trees[i])
                }
                // console.log(treeItem)
                this.areadData = createTree(treeItem,0)
            }).catch(err => {
                // 异常情况
            })
        },
        goBack() {
            this.$router.go(-1)
        },
        saveHandle(name) {
             this.$refs[name].validate((valid) => {
                if (valid) {
                    if(this.tempArr.length==0){
                        this.$Message.warning('请新增报警条件');
                        return
                    }
                    this.tempArr.filter((item,index)=>{
                        if(item.threshold){
                            this.$Message.warning('请填写测点报警阈值');
                            return
                        }
                        item.symbol = this.data1[index].symbol
                        item.threshold = this.data1[index].threshold
                    })
                    
                    let data = {
                        alarmCondition:this.formValidate.condition,
                        alarmLevel: this.formValidate.alarmLevel,
                        alarmName: this.formValidate.name,
                        alarmWaitTime: this.formValidate.time,
                        contactPersonId: this.data3.contactPersonId,
                        disarmMethod: this.formValidate.confirmWay,
                        enabledStatus: this.formValidate.state,
                        id: "",
                        processingPlan: this.data3.processingPlan,
                        siteId: this.formValidate.area,
                        conditions:this.tempArr,
                        //         tempId: "BdlZ8b9w",//
                        subscribeList:this.data2
                    }
                    addDefinition(data).then(res=>{
                        console.log(res)
                        if(res.data.id){
                            this.$Message.success('数据保存成功');
                             this.$router.go(-1)
                        }
                    })  
                } else {
                    // this.$Message.error('Fail!');
                }
            })
        },
              // 清空所有已选项
        handleClearSelect (status) {
            this.selectedData = [];
            this.$refs.selection.selectAll(status);
        },
        // 选中一项，将数据添加至已选项中
        handleSelect (selection, row) {
            this.selectedData.push(row);
        },
        // 取消选中一项，将取消的数据从已选项中删除
        handleSelectCancel (selection, row) {
            const index = this.selectedData.findIndex(item => item.mpointId === row.mpointId);
            this.selectedData.splice(index, 1);
        },
        // 当前页全选时，判断已选数据是否存在，不存在则添加
        handleSelectAll (selection) {
            // selection.forEach(item => {
            //     if (this.selectedData.findIndex(i => i.mpointId === item.mpointId) < 0) {
            //         this.selectedData.push(item);
            //     }
            // });
            this.selectedData=selection
        },
        // 取消当前页全选时，将当前页的数据（即 modelData）从已选项中删除
        handleSelectAllCancel () {
            console.log("取消全选")
            const selection = this.modelData;
            selection.forEach(item => {
                const index = this.selectedData.findIndex(i => i.mpointId === item.mpointId);
                if (index >= 0) {
                    this.selectedData.splice(index, 1);
                }
            });
        },
        changeModalSize(size){
            this.modalPage = size
            this.getModal()
        },
        sure(){
            console.log(this.selectedData)
            this.tempArr=this.tempArr.concat(this.selectedData)
            this.modal = false
            this.selectedData.map(ele=>{
                this.data1.push({
                    mpointName:ele.mpointName,
                    symbol:'=',
                    threshold:'',
                    unit:ele.unit,
                    equipmentName:ele.equipmentName
                })
            })
            
        },
        addModal(){
            this.modal = true
           this.handleSelectAllCancel()
         
        },
        checkThis(row){
          this.modal1 = false
          this.data1[this.curIndex].mpointName = row.mpointName
          this.data1[this.curIndex]= row
          this.tempArr[this.curIndex] = row
        },
        search(){
            this.selectedData = []
            this.getModal()
        },
        deleteIdx(index){
            this.data1.splice(index,1)
            this.tempArr.splice(index,1)
        },
        addDefine(){
            this.data2.push({
               userName:'',
               subscribeMode:'',
               pushFrequency:'9',
               delayPushTime:'9',
               subscribeModeArr:[],
               id:'',
               userId:'',
               tempId:'',
               pushReleaseMessage:this.formValidate.single?'Y':'N'
            })
        },
        deleteDef(index){
            this.data2.splice(index,1)
        }
    }
}
</script>
<style lang="less" scoped>
.defin-wrap {
    margin: 5px;
    background: #fff;
    .c-left-border-blue {
        border-radius: 3px;
        padding: 5px;
        h3 {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            text-indent: 10px;
        }
        .c-btns-right {
            float: right;
            margin-top: 2px;
            .ivu-btn {
                min-width: 70px;
                margin: 0 5px;
                border: none;
                height: 28px;
                background-color: #576374;
            }
            .c-btn-back {
                background: #c8c8c8;
            }
        }
    }
    .c-top-border-gray {
        padding: 20px 0;
        border-top: 5px solid #f0f0f0;
        /deep/.ivu-row {
            padding-left: 20px;
        }
    }
    .c-table-top-btns {
        height: 36px;
        border-bottom: 1px solid #EEE;
        display: flex;
        justify-content: space-between;
        .ivu-btn {
            min-width: 50px;
            background-color: #576374;
            border: none;
            color: #fff;
            height: auto;
            font-size: 12px;
            padding: 4px 12px;
        }
    }
}
.model-table{
    margin-top: 20px;
    .btn-group{
        margin-top: 20px;
        text-align:center;
        Button,span{
            display: inline-block;
            min-width: 130px;
            margin: 0 15px;
            padding: 4px 12px;
            font-size: 12px;
            background: #c8c8c8;
            color: #fff;
            border-radius: 3px;
        }
    }
}
  .mg-select-table-tip {
        text-align: right;
        margin: 5px;
        font-size: 13px;
        a {
            display: inline-block;
            margin-left: 10px;
        }
    }
</style>