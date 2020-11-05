<template>
    <div class="user-information" :style="{height: height+'px'}">
        <div class="user-title">
            <h3>简报数据采集</h3>
            <div>
                <Button type="primary" size="small" style="background:#4b7efe" @click="save('formInline')">保存</Button>
                <Button type="primary" size="small" style="background:#c8c8c8" @click="cancel()">取消</Button>
            </div>
        </div>
        <div class="con-show" >
           <div class="search-con">
                <Form ref="formInline" label-position="right" :label-width="100" :model="formInline" :rules="ruleValidate">
                    <Row>
                        <Col span="12">
                            <FormItem label="区域位置：" prop="location">
                                 <TreeSelect v-model="formInline.location" size="small" :data="areaData" v-width="250" /> 
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="简报名称：" prop="name">
                                <Input v-model="formInline.name" placeholder="简报名称" size="small"  style="width:250px"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem label="录入周期：" prop="duration">
                        <Select v-model="formInline.duration" placeholder="请选择"  style="width:250px" size="small">
                             <Option v-for="item in dateList" :value="item.id" :key="item.id">{{ item.label }}</Option>
                        </Select>
                     </FormItem>
                </Form>
           </div>
           <div class="data-table" :style="{height: (height-80)+'px'}">
               <div class="action-btn" v-if="!ischannel">
                   <Button type="info" size="small"  @click="add()">新增</Button>
                   <Button type="info" size="small" @click="channel()">导入</Button>
               </div>
                <Table stripe :columns="columns1"  v-if="!ischannel" :data="selectedData" size="small">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" size="small" @click="remove(index)" style="color:rgb(75, 126, 254);font-size:13px;border:0;background:none">删除</Button>
                    </template>
                </Table>
                <div v-else>
                    <div class="upload-box" :style="{height: height+'px'}">
                        <div class="upload-tree">
                            <div class="upload-title">
                                <h3>导入</h3>
                                <Button @click="close()">关闭</Button>
                            </div>
                            <div class="upload-content">
                                <div class="import-mod-process import-mod-process-1"></div>
                                <div class="import-mod-upload">
                                    <Upload action="//jsonplaceholder.typicode.com/posts/"
                                        :format="['xls','xlsx']">
                                        <Button type="primary">文件上传</Button>
                                    </Upload>
                                </div>
                                <div class="import-mod-download">
                                    <a href="/uaa/api/excel/template?type=process" download="" style="color: rgb(75, 126, 254);">
                                        导入模版下载 
                                        <Icon type="ios-cloud-upload" size="20" style="color: #3399ff"></Icon>
                                    </a>
                                    <div style="margin-top: 20px; color: rgb(102, 102, 102);">(上传文件数量不超过500条)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        </div>
         <Modal v-model="modal" width="600" class="model-box"> 
            <p slot="header" style="color:#1c2438;font-size:14px;border-left:7px solid #4b7efe;background:#f8f9fb;height:39px;line-height:39px">
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <span class="rectangle"></span>
                <span style="margin-left:8px">测点列表选择</span>
            </p>
            <div>
                <div>
                    <input type="text" name="" id="" v-model="modelKey" placeholder="测点编号/名称" style="margin-right:8px;border:1px solid #eaeaea;outline:0;padding-left:10px">
                     <Button type="primary" size="small" @click="search()">搜索</Button>
                </div>
                     <div class="model-table">
                    <Table size="small" ref="selection" :columns="modelColumns" :data="modelData"
                        @on-select="handleSelect"
                        @on-select-cancel="handleSelectCancel"
                        @on-select-all="handleSelectAll"
                        @on-select-all-cancel="handleSelectAllCancel">
                    </Table>
                    <Page :total="modelTotal" show-elevator size="small" class="page" style="text-align:right;margin-top:20px" @on-change="changeSize"  />
                     <div class="btn-group">
                        <span @click="abolish()">取消</span>
                        <span style="background: #4b7efe;" @click="sure()">确定</span>
                     </div>
                </div>
            </div>
            <div slot="footer" >
            </div>
        </Modal>
    </div>
</template>
<script>
import { regionalCon,dialog,addBulletin} from '@api/dataManage/bulletin';
import createTree from '@/libs/public-util'
  export default {
      name:'bulletinAdd',
      data(){
        return {
            formInline: {
                location: '',
                name:'',
                duration:'W'
             },
            ruleValidate:{
                name: [
                    { required: true, message: '请选择区域位置', trigger: 'blur' }
                ],
                location: [
                    { required: true, message: '请输入名称', trigger: 'change' ,type:'number'}
                ],
                duration: [
                    { required: false }
                ],
            },
            height:0,
            columns1:[
                {
                    title: '测点名称',
                    key: 'mpointName'
                },
                {
                    title: '文本类型',
                    key: 'textType',
                    render: (h,params) => {
                        let that = this;
                        return h('Select',{
                            props:{
                                size:'small',
                                transfer:true,
                                value :'signle'
                            },
                            on:{
                                'on-change':(val)=>{
                                   that.mpointList[params.index].textType = val
                                }
                            }
                        },
                        this.textList.map(item=>{
                            return h('Option',{
                                props:{
                                    value: item.value,
                                    key: item.value
                                }
                            },item.name)
                        })
                        )
                    }
                },
                {
                    title: '自动填充上次数据',
                    key: 'textType',
                    render: (h,params) => {
                        let that = this;
                        return h('Select',{
                            props:{
                                size:'small',
                                transfer:true,
                                value:'0'
                            },
                            on:{
                                'on-change':(val)=>{
                                    that.mpointList[params.index].autoComplete = val
                                }
                            }
                        },
                        this.autoList.map(item=>{
                            return h('Option',{
                                props:{
                                    value: item.value,
                                    key: item.value
                                }
                            },item.name)
                        })
                        )
                    }
                },
                {
                    title: '名称分组',
                    key: 'formName',
                    render: (h, params) => {
                        let that = this
                        return h('div', [
                            h('Input', {
                                props: {
                                    size:'small', 
                                    value : '未命名分组'
                                },
                                style:{
                                    color:'blue',
                                    cursor: 'pointer',
                                    marginRight: '5px',
                                    fontSize:'18px'
                                },
                                on: {
                                    input: function (event) {
                                      console.log(that.mpointList)
                                      that.mpointList[params.index].groupName = event
                                    }
                                }
                            })
                        ]);
                    }
                },
                {
                    title: '组序号',
                    key: 'cycleName',
                    render: (h, params) => {
                        let that = this
                        return h('div', [
                            h('InputNumber', {
                                props: {
                                    size:'small',
                                    value : 1
                                },
                                style:{
                                    color:'blue',
                                    cursor: 'pointer',
                                    marginRight: '5px',
                                    fontSize:'12px'
                                },
                                on: {
                                    'on-change':(e) => {
                                        console.log(e)
                                        that.mpointList[params.index].groupOrder = e
                                    }
                                }
                            })
                        ]);
                    }
                },
                {
                    title: '组内序号',
                    key: 'formLatestdate',
                     render: (h, params) => {
                         let that = this
                        return h('div', [
                            h('InputNumber', {
                                props: {
                                    size:'small',
                                    value:1
                                },
                                style:{
                                    color:'blue',
                                    cursor: 'pointer',
                                    marginRight: '5px',
                                    fontSize:'12px'
                                },
                                on: {
                                    click: (e) => {
                                         that.mpointList[params.index].mpointOrder = e
                                    }
                                }
                            })
                        ]);
                    }
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center'
                }
            ],
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
                }
            ],
            modelTotal:0,
            modelKey:'',
            filterId:'',
            ischannel:false,
            selectedData: [],
            modal:false,
            dateList:[
                {label: '周',id: 'W'},
                {label: '月',id: 'M'},
                {label: '季度',id: 'Q'},
                {label: '年',id: 'Y'}
            ],
            areaData:[],
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
                }
            ],
            modelData:[],
            page:1,
            mpointList:[],
            textList:[
                {name:' 单行文本',value:'single'},
                {name:'多行文本',value:'multi'}
            ],
            autoList:[
                {name:' 否',value:'0'},
                {name:'是',value:'1'}
            ]
        }
      },
      mounted() {
        this.height = document.body.clientHeight-70
         this.getRegional()
    },
    methods: {
        add(){
            console.log(this.page)
            this.modal=true
            this.getModalData()
           
        },
        channel(){
            this.ischannel=true
        },
        close(){
            this.ischannel=false
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
            const index = this.selectedData.findIndex(item => item.name === row.name);
            this.selectedData.splice(index, 1);
        },
        // 当前页全选时，判断已选数据是否存在，不存在则添加
        handleSelectAll (selection) {
            selection.forEach(item => {
                if (this.selectedData.findIndex(i => i.name === item.name) < 0) {
                    this.selectedData.push(item);
                }
            });
        },
        // 取消当前页全选时，将当前页的数据（即 modelData）从已选项中删除
        handleSelectAllCancel () {
            const selection = this.modelData;
            selection.forEach(item => {
                const index = this.selectedData.findIndex(i => i.name === item.name);
                if (index >= 0) {
                    this.selectedData.splice(index, 1);
                }
            });
        },
         getRegional() {
            regionalCon().then(res => {
                // console.log(JOSN.stringify(res.data))
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].expand = true
                    trees[i].value = trees[i].id
                    treeItem.push(trees[i])
                }
                this.baseData = treeItem
                this.areaData= createTree(treeItem)
            }).catch(err => {
                // 异常情况
            })
        },
        getModalData(){
            console.log(this.page)
            if(this.selectedData.length!=0){
                let arr = []
                this.selectedData.forEach(ele=>{
                   arr.push(ele.id)
                })
                this.filterId = arr.join(",")
            }
            dialog(this.filterId ,this.modelKey,this.formInline.location,this.page).then(res=>{
                console.log(res)
                this.modelData = res.data.items
                this.modelTotal = res.data.total
            })
        },
        search(){
             this.getModalData()
        },
        changeSize(size){
            this.page = size
            this.getModalData()
        },
        save(name){
             console.log(this.mpointList)
            this.baseData.forEach(ele=>{
                if(ele.id == this.formInline.location){
                    this.locationName = ele.name
                }
            })
            let data = {
                cycleId: this.formInline.duration,
                id: 0,
                formName: this.formInline.name, //名称
                mpointList:this.mpointList,
                siteId: this.formInline.location,  //区域位置
                siteName: this.locationName //区域名称
            }
             this.$refs[name].validate((valid) => {
                 if(valid){
                    addBulletin(data).then(res=>{
                        if(res.data.id){
                            this.$Message.success('数据添加成功');
                            this.$router.go(-1)
                        }
                    })
                 }
                 
             })
        },
         sure(){
            console.log(this.selectedData)
            this.mpointList=[]
            this.selectedData.forEach(ele=>{
                this.mpointList.push({
                    autoComplete: 0,
                    formId: 0,
                    groupName: "未命名分组",
                    groupOrder: 1,
                    index: 0,
                    mpointId: ele.id,
                    mpointName: ele.mpointName,
                    mpointOrder: 1,
                    status: null,
                    textType: "single",
                    unit: "22"
                })
            })
            console.log(this.mpointList)
            this.modal = false
        },
        abolish(){
            this.modal = false
        },
    }
  }
</script>
<style lang="less" scoped>
/deep/.ivu-modal-header{
    padding: 0;
    border-bottom: 0;
}
.user-information{
    margin: 5px;
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
    .con-show{
        // background: #fff;
        margin-top: 5px;
        // padding: 10px;
        .search-con{
            background: #fff;
            padding-top: 10px;
        }
        .ivu-form-item{
            margin-bottom: 24px;
            display: inline-block;
            .ivu-input{
                width: 350px;
            }
        }
        .data-table{
            background: #fff;
            margin-top: 5px;
            padding:10px;
            .action-btn{
                 margin-bottom: 10px;
                button{
                    background: #576374;
                    font-size: 12px;
                    box-shadow: 0;
                    margin-right: 8px;
                }
            }
        }
    }
}
.model-table{
    margin-top: 20px;
    .btn-group{
        margin-top: 20px;
        text-align:center;
        span{
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
input::-webkit-input-placeholder{
    color:#999;
    font-size: 13px;
}
.upload-box {
    margin-top: 5px;
    .upload-tree {
        min-height: 100%;
        height: 100%;
        .upload-title {
            display: flex;
            width: 100%;
            background: #fff;
            justify-content: space-between;
            padding: 5px;
            h3 {
                height: 30px;
                line-height: 30px;
                text-indent: 10px;
            }
            /deep/.ivu-btn {
                min-width: 70px;
                margin: 0 5px;
                background-color: #c8c8c8;
                color: #fff;
                padding: 4px 12px;
                font-size: 12px;
                line-height: 12px;
                height: 26px;
            }
        }
        .upload-content {
            width: 100%;
            height: 100%;
            background: #fff;
            border-top: 5px solid #f0f0f0;
            padding: 10px;
            .import-mod-process-1 {
                background-position: 0 0 !important;
            }
            .import-mod-process {
                margin: 20px auto;
                width: 567px;
                height: 107px;
                background: url('../../../assets/images/upload1.png') no-repeat 0 0;
            }
            .import-mod-upload {
                height: 40px;
                margin: 40px auto;
                text-align: center;
                /deep/.ivu-btn-primary {
                    width: 120px;
                    height: 30px;
                    background: #4b7efe;
                }
            }
            .import-mod-download {
                margin: 20px auto;
                text-align: center;
            }
        }
    }
}
</style>
