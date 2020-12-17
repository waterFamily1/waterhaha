<template>
    <div class="add-box" :style="{height: height+'px'}">
         <div class="index-search">
            <div class="search-main">
                <h3>巡检点</h3>
                <div class="form-search-btn">
                    <button  @click="save('formItem')">保存</button>
                    <button  class="reset" @click="reset()">取消</button>
                </div>
            </div>
        </div>
        <div class="c-main-border" >
             <Form ref="formItem" :model="formItem" :label-width="100" :rules="ruleValidate">
                <Row>
                    <Col span="12">
                        <FormItem label="名称："  prop="name">
                            <Input v-model="formItem.name" placeholder="请输入名称" style="width:300px"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                       <FormItem label="区域位置："  prop="location">
                           <TreeSelect v-model="formItem.location"  :data="processList"  v-width="200"  />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="描述："  prop="describe">
                            <Input v-model="formItem.describe" type="textarea" placeholder="请输入描述" style="width:300px"></Input>
                        </FormItem>
                    </Col>
                </Row>
             </Form>
        </div>
        <div class="table-define">
            <div class="info">
                <h3>巡检步骤</h3>
                <button @click="add()">新增</button>
            </div>
            <Table stripe :columns="columns7" :data="data6"></Table>
        </div>
         <Modal
            v-model="peoModal"
            title="选择人工录入测点"
            width="680"
            :footer-hide="true">
            <div class="que-search">
                <Input v-model="peoName" style="width: 200px" placeholder="测点编号/名称">
                    <Button slot="append" icon="ios-search"></Button>
                </Input>
            </div>
            <Table :columns="peoColumns" :data="peoData" style="margin-top:20px">
                 <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Icon type="ios-checkmark-circle-outline" style="color:#999;font-size:24px" @click="checkSite(row)" />
                </template>
            </Table>
            <Page :total="total" show-elevator show-total size="small" class="page" style="text-align:right;margin-top:20px" />
        </Modal>
    </div>
</template>
<script>
import {regionalCon,siteList,editPoint,pointDetail } from '@/api/pollingManage/manage'
import createTree from '@/libs/public-util'
export default {
    data () {
       return {
           height :'',
            formItem: {
                name: '',
                location: '',
                describe:''
            },
            ruleValidate:{
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                location: [
                    { required: true, message: '请选择位置', trigger: 'change',type:'number' }
                ],

            },
            columns7: [
                {
                    title: '序号',
                    type: 'index',
                    align: 'center',
                    width: 70
                },
                {
                    title: '步骤',
                    key: 'step',
                    width: 400,
                    render:(h,params) => {
                        let that = this;
                        return h('Input',{
                            props: {
                                value: that.data6[params.index].step,
                                size:'small',
                                placeholder:'步骤名称'
                            },
                            on: {
                                input: (val) => {
                                    that.data6[params.index].step = val
                                }
                        },
                        })
                    }
                },
                {
                    title: '结果类型',
                    key: 'resultType',
                    render: (h, params) => {
                        let that = this;
                        console.log(that.data6[params.index].resultType)
                        return h('Select',{
                            props:{
                                size: 'small',
                                transfer:true,
                                value:that.data6[params.index].resultType
                            },
                            on: {
                            'on-change':(event) => {
                                    that.data6[params.index].resultType = event;
                                }
                            },
                            style:{
                                width:'80px'
                            }
                        },
                            that.resultList.map((item) =>{
                                return h('Option', {
                                    props: {
                                        value: item.value,
                                        label: item.name
                                    }
                                })
                            })
                        )
                    }
                },
                {
                    title: '绑定测点',
                    key: 'mpointName',
                    width :400,
                    render: (h, params) => {
                        let  that = this;
                        let text = this.data6[params.index].mpointName?this.data6[params.index].mpointName:'未选择'
                        if(this.data6[params.index].resultType==1){
                            return h('div', {},'--');
                        }else{
                            return h('div', [
                                h('span', {
                                    style:{
                                        fontSize:'13px',
                                        marginRight:'10px'
                                    }
                                },text),
                                h('a', {
                                    style:{
                                        color:'#5c51fd',
                                        fontSize:'13px',
                                        marginRight:'10px'
                                    },
                                    on: {
                                        'click':(event) => {
                                            console.log(params.index)
                                            that.curIdx = params.index
                                            that.peoModal = true
                                        }
                                    },
                                }, '[选择测点]'),
                                h('a', {
                                    style:{
                                        color:'#5c51fd',
                                        fontSize:'13px'
                                    },
                                    on: {
                                        'click':(event) => {
                                            this.data6[params.index].mpointName=""
                                            this.data6[params.index].mpointId=""
                                        }
                                    },
                                }, '[清除]'),
                            ]);
                        }
                        
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'default',
                                    size: 'small'
                                },
                                style: {
                                    color:'rgb(75, 126, 254)',
                                    border:'0'
                                },
                                on: {
                                    click: () => {
                                       this.data6.splice(params.index,1)
                                    }
                                }
                            }, '删除')
                        ]);
                        
                    }
                }
            ],
            data6: [
                {
                    step: '',
                    resultType:'1',
                    mpointId: "",
                    mpointName: "",
                    patrolPointId: "",
                    state: "",
                    tempId: "",
                },
            ],
            resultList:[
                {
                    value:1,
                    name:'状态'
                },
                {
                    value:2,
                    name:'数据'
                }
            ],
            processList:[],
            peoData:[],
            peoName:'',
            page:1,
            total:0,
            peoColumns: [
                {
                    title: '测点编号',
                    key: 'mpointId'
                }, {
                    title: '区域位置',
                    key: 'siteName'
                }, {
                    title: '测点名称',
                    key: 'mpointName'
                },  {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            peoModal:false,
            mpointName:'',
            siteNode:'',
            curIdx:0,
            dataObj:{}
       }
    },
    mounted() {
        this.height = document.body.clientHeight-75
        this.id = this.$route.query.id
        this.getRegional()
        this.detail()
        this.pointList()
    },
    methods:{  
         detail(){
            pointDetail(this.id).then(res=>{
                console.log(res)
                if(res.data){
                    this.formItem= {
                        name: res.data.patrolPoint,
                        location: Number(res.data.relatedProcess),
                        describe:res.data.description
                    }
                    this.data6 = res.data.patrolSteps
                    this.dataObj = res.data
                }
            })
        },
        checkSite(row){
           console.log(row)
           this.data6[this.curIdx].mpointId= row.id
           this.data6[this.curIdx].mpointName= row.mpointName
           this.siteNode = row
           this.mpointName = row.mpointName
           this.peoModal = false
        },
        save(name){
            console.log("ddd")
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let bool = this.data6.every(ele=>{
                        return ele.step
                    })
                    console.log(bool)
                    if(!bool){
                      this.$Message.warning('请填写步骤');
                    }else{
                        this.dataObj.description = this.formItem.describe
                        this.dataObj.patrolPoint = this.formItem.name
                        this.dataObj.relatedProcess = this.formItem.location
                        this.dataObj.pointProcesses = this.formItem.location
                        this.dataObj.patrolSteps = this.data6
                        console.log(this.dataObj)
                        editPoint(this.dataObj).then(res=>{
                            if(res.data.count){
                                this.$Message.success('数据保存成功');
                                this.$router.go(-1)
                            }
                        })
                    }
                    
                } else {
                    // this.$Message.error('Fail!');
                }
            })
           
        },
        reset(){
           this.$router.go(-1)
        },
        pointList(){
            siteList(this.peoName,this.page,this.formItem.location).then(res=>{
                console.log(res)
                if(res.data.items){
                    this.peoData = res.data.items
                    this.total = res.data.total
                }
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
                this.baseData = trees
                console.log(trees)
                this.processList = createTree(treeItem)
            }).catch(err => {
                // 异常情况
            })
        },  
        add(){
            let obj= {
                step: '',
                resultType:'1',
                mpointId: "",
                mpointName: "",
                patrolPointId: "",
                state: "",
                tempId: "",
            };
            this.data6.push(obj)
        }
    }
}
</script>
<style lang="less" scoped>
.add-box{
    margin: 5px;
    background: #fff;
    overflow: auto;
    .index-search {
        padding: 5px;
        height: 43px;
        .search-main {
            height: 33px;
            h3{
                float: left;
            }
             .form-search-btn {
                float: right;
                margin-top: 4px;
                a {
                    margin: 0 10px 0 0;
                    color: #576374;
                    font-size: 12px;
                }
                button{
                    background: #4b7efe;
                    font-size: 12px;
                    padding: 4px 12px;
                    color: #fff;
                    border: 0;
                    border-radius: 3px;
                    margin: 0 5px;
                }
                .reset{
                    background: #495566;
                }
            }
        }
    }
    .c-main-border{
        border-top: 5px solid #f0f0f0;
        width: 100%;
        padding-top: 20px;
        
    }
    .table-define{
         border-top: 5px solid #f0f0f0;
         padding: 10px;
        .info{
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #f0f0f0;
            height: 50px;
            padding: 10px 0 10px 10px;
            button{
                background:#576374;
                font-size: 12px;
                padding: 4px 12px;
                color: #fff;
                border: 0;
                border-radius: 3px;
                margin: 0 5px;
            }
        }
    }
}    
</style>