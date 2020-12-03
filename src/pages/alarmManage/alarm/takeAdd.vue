<template>
    <div class="takeadd-wrap" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>报警订阅</h3> 
            <div class="c-btns-right">
                <Button type="primary" @click="saveHandle()">保存</Button>
                <Button type="primary" class="c-btn-back" @click="goBack()">取消</Button>
            </div>
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
            <div class="c-top-border-gray">
                <div class="c-form-row-1col">
                    <FormItem label="报警名称：">
                        <span v-if="selectedData.length==0">请选择</span>
                        <span v-else>{{alarmName}}</span>
                        <!-- <span>{{ formValidate.name }}</span> -->
                        <a href="javascript:;" @click="nameModal = true">[选择]</a>
                    </FormItem>
                </div>
                <div class="c-form-row-1col">
                    <FormItem label="区域位置：">
                        <span v-if="!areaName">请选择</span>
                        <span v-else>{{areaName}}</span>
                        
                        <!-- <Input v-model="formValidate.name" placeholder="Enter your name"></Input> -->
                    </FormItem>
                </div>
                <div class="c-form-row-2col">
                    <div class="c-form-item">
                        <FormItem label="推送频率：">
                            <Select v-model="formValidate.frequency" placeholder="请选择推送频率" style="width:250px">
                               <Option v-for="item in frequencyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </div>
                    <div class="c-form-item">
                        <FormItem label="延迟推送时间：">
                            <Select v-model="formValidate.delayTime" placeholder="请选择延迟推送时间" style="width:250px">
                               <Option v-for="item in delayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </div>
                </div>
                <div class="c-form-row-1col">
                    <FormItem label="推送方式：">
                        <Select v-model="formValidate.way" multiple style="width:250px">
                            <Option v-for="item in wayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </div>
            </div>
            <div class="c-top-border-gray">
                <div class="c-plain-bg-h">
                    <h3>新增接收对象</h3>
                    <Checkbox v-model="formValidate.single">同步接收报警确认消息</Checkbox>
                </div>
                <div class="c-form-row-2col" style="padding-top: 20px;">
                    <div class="c-form-item">
                        <FormItem label="所属组织：">
                            <TreeSelect v-model="formValidate.organize"   @on-change="chooseSite"  :data="organizeList" v-width="300" size="small" />
                        </FormItem>
                    </div>
                    <div class="c-form-item">
                        <FormItem label="用户：">
                            <Select v-model="formValidate.user" multiple placeholder="请选择用户" @on-select="selectUser" style="width:300px" size="small">
                               <Option v-for="item in userList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                    </div>
                </div>
                <div class="c-form-row-1col">
                    <FormItem label="已选接收对象：">
                        <div v-for="(item,index) in receiveObj" :key="index"  >
                            <div v-if="item.user.length!=0" >
                                <h3>{{item.org}}</h3>
                                <div>
                                    <div class="obj-label" v-for="(ele,idx) in item.user" :key="idx">
                                        <span>{{ele.label}}</span>
                                        <Icon type="ios-close" style="font-size:15px " @click="deleteUser(ele.id)" />
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                       
                    </FormItem>
                </div>
            </div>
        </Form>
        <!-- 选择报警名称modal -->
        <Modal
            v-model="nameModal"
            width="600"
            title="报警定义列表选择"
            @on-ok="ok"
            @on-cancel="cancel">
            <div class="mg-select-table">
                <div class="mg-select-table-header">
                    <div>
                        <label>关键字：</label>
                        <Input v-model="modalName" placeholder="编号/报警名称" style="width: 150px" size="small" />
                        <label style="margin-left: 5px">区域位置：</label>
                        <TreeSelect v-model="modalArea" multiple   :data="modalAreaData" v-width="150" size="small" />
                        <Button @click="searchHandle()">搜索</Button>
                        <Button class="reset" @click="resetHandle()">重置</Button>
                    </div>
                    <div class="mg-select-table-tip">
                        已选择<strong>{{selectedData.length}}</strong>个
                        <a href="javascript:;" @click="handleClearSelect(false)">[清空]</a>
                    </div>
                </div>
                <div class="model-table">
                    <Table size="small" ref="selection" :columns="modelColumns" :data="modelData"
                        @on-select="handleSelect"
                        @on-select-cancel="handleSelectCancel"
                        @on-select-all="handleSelectAll"
                        @on-select-all-cancel="handleSelectAllCancel">
                    </Table>
                    <Page :total="modalTotal" size="small" show-total show-elevator class="modalPage" @on-change="changeSize" />
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
// 
import { alarmList ,getOrg ,getTree,getUsers,addSub} from '@/api/alarm/subscribe'
import createTree from '@/libs/public-util'
export default {
    name: 'takeAdd',
    data() {
        return {
            height: '',
            nameModal: false,
            formValidate: {
                name: '',
                frequency: '9',
                delayTime: '9',
                way: 'SysMsg',
                single: true,
                organize: '',
                user: ''
            },
            ruleValidate: {
                organize:[
                    { required: true, message: '请选择组织', trigger: 'change' }
                ]
            },
            frequencyList: [
                {
                    value: '1',
                    label: '5分钟'
                }, {
                    value: '2',
                    label: '10分钟'
                }, {
                    value: '3',
                    label: '15分钟'
                }, {
                    value: '4',
                    label: '30分钟'
                }, {
                    value: '5',
                    label: '1小时'
                }, {
                    value: '6',
                    label: '2小时'
                }, {
                    value: '7',
                    label: '12小时'
                }, {
                    value: '8',
                    label: '24小时'
                }, {
                    value: '9',
                    label: '仅推送1次'
                }
            ],
            delayList: [
                {
                    value: '1',
                    label: '5分钟'
                }, {
                    value: '2',
                    label: '10分钟'
                }, {
                    value: '3',
                    label: '15分钟'
                }, {
                    value: '4',
                    label: '30分钟'
                }, {
                    value: '5',
                    label: '1小时'
                }, {
                    value: '6',
                    label: '2小时'
                }, {
                    value: '7',
                    label: '12小时'
                }, {
                    value: '8',
                    label: '24小时'
                }, {
                    value: '9',
                    label: '立即推送'
                }, {
                    value: '10',
                    label: '不推送'
                }
            ],
            wayList: [
                {
                    value: 'SysMsg',
                    label: '在线消息'
                }, {
                    value: 'SMS',
                    label: '短信'
                }
            ],
            organizeList: [],
            userList: [],
            modalName: '',
            modalArea: [],
            modalAreaData: [],
            modelColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                    title: '报警名称',
                    key: 'alarmName',
                    width: 150,
                }, {
                    title: '报警等级',
                    width: 90,
                    key: 'alarmLevel',
                    render: (h, params) => {
                        const text = params.row.alarmLevel
                        const color= text==1?'#F5423F':(text==2?'#F9A10F':'#739AFB')
                        return h('span', {
                            style:{
                                color:color
                            }
                        }, text+'级');
                    }
                }, {
                    title: '使用状态',
                    width: 90,
                    key: 'enabledStatus',
                    render: (h, params) => {
                        const text = params.row.enabledStatus == 'ON'?'启用':'停用'
                        return h('span', {
                        }, text);
                    }
                }, {
                    title: '区域位置',
                    key: 'siteName'
                }
            ],
            modelData: [],
            modalTotal:0,
            page:1,
            selectedData:[],
            alarmName:'',
            areaName :'',
            receiveObj:[],
            baseData:[],
            siteName:''
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getRegional()
        this.getList()
        this.getOrgination()
    },
    methods: {
        deleteUser(id){
          console.log(id)
          this.formValidate.user= this.formValidate.user.filter(ele=>{
              return id != ele
          })
          this.receiveObj.map((ele,idx)=>{
              console.log(ele)
              ele.user.map((item,index)=>{
                  if(id == item.id){
                    ele.user.splice(index,1)
                  }
              })
              if(ele.user.length==0){
                  this.receiveObj.splice(idx,1)
              }
          })
          console.log(this.receiveObj)
        },
        selectUser(user){
            console.log(user)
            this.receiveObj.map(ele=>{
                console.log
                if(ele.org == this.siteName){
                    ele.user.push({
                        id:user.value,
                        label:user.label
                    })
                }
            })
        },
        chooseSite(value){
            console.log(value)
             this.userList = []
             this.formValidate.user = []
             this.baseData.map(ele=>{
              if(ele.id == this.formValidate.organize){
                  this.siteName = ele.name
              }
              })
           this.receiveObj.push({
               org:this.siteName,
               user:[]
            })
            getUsers(value).then(res=>{
              console.log(res)
              this.userList = res.data.items
             
           })
          
        },
        getOrgination(){
            getOrg().then(res=>{
                console.log(res)
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].expand = true
                    treeItem.push(trees[i])
                }
                console.log(treeItem)
                this.baseData = treeItem
                this.organizeList = createTree(treeItem)
            })
        },
        getRegional() {
            getTree().then(res => {
                console.log(res)
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].expand = true
                    treeItem.push(trees[i])
                }
                console.log(treeItem)
                this.modalAreaData = createTree(treeItem)
            }).catch(err => {
                // 异常情况
            })
        },
        getList(){
            let siteId = this.modalArea.length!=0?this.modalArea.join(','):''
            // queryName,page,executeStatus,telantId,siteId
           alarmList(this.modalName,this.page,'','',siteId).then(res=>{
               console.log(res)
               this.modelData = res.data.items
               this.modalTotal = res.data.total
           })
        },
        ok () {
            console.log(this.selectedData)
            let arr1 = [],arr2=[]
            this.selectedData.map(ele=>{
               arr1.push(ele.alarmName)
               arr2.push(ele.siteName)
            })
            this.alarmName = arr1.join(",")
            console.log(this.alarmName)
            this.areaName = arr2.join(',')
            this.$Message.info('Clicked ok');
        },
        cancel () {
            this.$Message.info('Clicked cancel');  
        },
        searchHandle() {
           this.getList()
        },
        changeSize(size){
            this.page = size
            this.getList()
        },
        resetHandle() {
           this.modalName = ''
           this.modalArea = []
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
            const index = this.selectedData.findIndex(item => item.alarmName === row.alarmName);
            this.selectedData.splice(index, 1);
        },
        // 当前页全选时，判断已选数据是否存在，不存在则添加
        handleSelectAll (selection) {
            selection.forEach(item => {
                if (this.selectedData.findIndex(i => i.alarmName === item.alarmName) < 0) {
                    this.selectedData.push(item);
                }
            });
        },
        // 取消当前页全选时，将当前页的数据（即 modelData）从已选项中删除
        handleSelectAllCancel () {
            const selection = this.modelData;
            selection.forEach(item => {
                const index = this.selectedData.findIndex(i => i.alarmName === item.alarmName);
                if (index >= 0) {
                    this.selectedData.splice(index, 1);
                }
            });
        },
        saveHandle(){
            console.log(this.formValidate.user)
            let cur = this.selectedData[0]
            let data = {
                defineIds: cur.id,
                defineName: cur.alarmName,
                delayPushTime: this.formValidate.delayTime,
                id: "",
                pushFrequency: this.formValidate.frequency,
                pushReleaseMessage: this.formValidate.single?'Y':'N',
                siteIds: cur.siteId,
                siteName: cur.siteName,
                subscribeMode: this.formValidate.way.length!=0?this.formValidate.way.join(','):'',
                userIds: this.formValidate.user.length!=0?this.formValidate.user.join(','):''
            }
            console.log(data)
            addSub(data).then(res=>{
                this.$Message.success('数据保存成功');
                this.$router.go(-1)
            })
        }
    }
}
</script>
<style lang="less" scoped>
.takeadd-wrap {
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
            button {
                min-width: 70px;
                margin: 0 5px;
                border: none;
                height: 28px;
                background-color: #4b7efe;
            }
            .c-btn-back {
                background: #c8c8c8;
            }
        }
    }
    .c-top-border-gray {
        border-top: 5px solid #f0f0f0;
        padding: 20px 0;
        .c-form-item {
            width: 45%;
            display: inline-block;
        }
        .c-plain-bg-h {
            border-bottom: 1px solid #f0f0f0;
            height: 40px;
            padding-left: 10px;
            display: flex;
            justify-content: space-between;
            h3 {
                font-size: 14px;
                line-height: 30px;
            }
        }
        .c-form-row-1col {
            a {
                display: inline-block;
                margin-left: 10px;
            }
            .obj-label{
                display: inline-block;
                background:rgb(45, 140, 240);
                color:#fff;
                height: 22px;
                line-height: 22px;
                margin: 2px 4px 2px 0;
                padding: 0 8px;
                border-radius: 2px;
                font-size: 12px;
            }
        }
    }
}
.mg-select-table-header {
    button {
        background-color: #838A95;
        border: none;
        color: #fff;
        padding: 4px 12px;
        height: auto;
        border-radius: 2px;
        margin: 0 4px;
    }
    .reset {
        background: #aaafb8;
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
}
/deep/.ivu-modal-footer {
    /deep/.ivu-btn-text {
        border: 1px solid #dcdee2;
    }
}
.modalPage {
    text-align: right;
    margin: 10px 0 0;
}
</style>