<template>
    <div class="document-box" :style="{height: height+'px'}">
        <div class="c-tree-left">
            <div class="c-plain-bg-h">
                <h3>文档中心</h3>  
            </div>
            <div class="serach-box">
                <Input v-model="value" placeholder="输入文档目录以检索" style="width: 100%" @on-change="searchDoc" />
                 <ul class="search-list" v-if="isSeachdata">
                        <div style="color:#bbbec4;font-size:13px;text-align:center"  v-if="searchList.length==0">无匹配数据</div>
                        <li v-for="(item,index) in searchList" :key="index" @click="chooseLabelS(index)" v-else>{{ item.name }}</li>
                    </ul>
            </div>
            <div class="z-tree">
                <Tree :data="docList" :render="renderContent" @on-select-change="selectNode"></Tree>
            </div>
        </div>
        <div class="c-tree-right">
            <div class="c-main-border">
               <div class="doc-crumbs">{{choosedName}}</div>
               <div class="c-left-border-blue">
                    <Form  label-position="right" :label-width="100" inline style="display:inline-block">
                        <FormItem label="关键字：">
                            <Input placeholder="文档名称/文档标签" style="width:200px" size="small" v-model="kword"></Input>
                        </FormItem>
                        <FormItem label="上传时间：">
                            <DatePicker type="date" :options="startDate" v-model="startTime" @on-change="startTimeChange"  format="yyyy-MM-dd"  placeholder="开始时间" style="width: 120px" size="small"></DatePicker> -
                            <DatePicker type="date" :options="endDate"  v-model="endTime" @on-change="endTimeChange" format="yyyy-MM-dd" placeholder="结束时间" style="width: 120px" size="small"></DatePicker>
                        </FormItem>
                    </Form>
                    <div class="action-btn">
                        <button @click="search()">搜索</button>
                        <button class="reset" @click="reset()">重置</button>
                    </div>
               </div>
               <div class="c-top-border-gray">
                   <div class="c-table-top-btns">
                        <button @click="downloadFile()">下载</button>
                        <button @click="uploadFile()">上传</button>
                        <button @click="move()">移动</button>
                        <button @click="deleteHandle()">删除</button>
                    </div>
                    <Table stripe :columns="tableList" size="small" :data="tableData"
                        @on-select="handleSelect"
                        @on-select-cancel="handleSelectCancel"
                        @on-select-all="handleSelectAll"
                        @on-select-all-cancel="handleSelectAllCancel">
                        <template slot-scope="{ row }" slot="name">
                            <strong>{{ row.name }}</strong>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <Button class="action" type="text" size="small" style="margin-right: 5px;font-size:13px;color:rgb(75, 126, 254)" @click="docEdit(row)">编辑</Button>
                            <Button class="action" type="text" size="small" style="margin-right: 5px;font-size:13px;color:rgb(75, 126, 254)" v-if="row.collect" @click="cancelCollect(row.id)">取消收藏</Button>
                            <Button class="action" type="text" size="small" style="margin-right: 5px;font-size:13px;color:rgb(75, 126, 254)" v-else @click="collect(row.id)">收藏</Button>
                            <Button class="action" type="text" size="small" style="color:rgb(75, 126, 254);font-size:13px" @click="recommend(row)">推荐</Button>
                        </template>
                    </Table>
                    <Page :total="total" show-elevator class="page" size="small" />
               </div>
            </div>
        </div>
        <!-- 文档编辑 -->
         <Modal v-model="modal" width="520" class="model-box"> 
            <p slot="header" style="color:#1c2438;font-size:14px;border-left:7px solid #4b7efe;background:#f8f9fb;height:39px;line-height:39px">
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <span class="rectangle"></span>
                <span style="margin-left:8px">文档编辑</span>
            </p>
            <div>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top">
                    <div>
                        <FormItem label="文档名称：" prop="name">
                            <Input  v-model="formValidate.name"  />
                        </FormItem>
                        <FormItem label="文档标签：" prop="label" >
                            <Input  v-model="formValidate.label" readonly @on-focus="chooseLabel" />
                       </FormItem>
                        <div class="dropdown" v-if="dropdownShow">
                            <Collapse simple accordion >
                                <Panel v-for="(item,index) in data1" :key="index">
                                    {{ item.name }}
                                    <div slot="content" class="cmp-tab">
                                        <a href="javascript:;" v-for="(ele, idx) in item.children" 
                                        :key="idx" @click="typeCheck(ele.name)" 
                                        :class="{checked:typeBox.includes(ele.name)}">{{ ele.name }}</a>
                                    </div>
                                </Panel>
                            </Collapse>
                            <div class="finish-btn" >
                                <button @click="finish()">完成</button>
                            </div>
                        </div>
                        <FormItem label="文档摘要：" prop="remark">
                            <Input type="textarea" v-model="formValidate.remark"  />
                       </FormItem>
                    </div>
                </Form>
            </div>
                
            <div class="model-table">
                <div class="action-btn">
                <span @click="modal = false">取消</span>
                <span style="background: #4b7efe;" @click="modalSure('formValidate')">确定</span>
                </div> 
                
            </div>
            <div slot="footer" >
                <!-- <Button type="primary"  long  @click="save" style="font-size:12px">保存为新模版</Button> -->
            </div>
        </Modal>
        <!-- 文档推荐 -->
        <Modal v-model="modalR" width="520" class="model-box"> 
            <p slot="header" style="color:#1c2438;font-size:14px;border-left:7px solid #4b7efe;background:#f8f9fb;height:39px;line-height:39px">
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <span class="rectangle"></span>
                <span style="margin-left:8px">文档推荐</span>
            </p>
            <div>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
                    <div>
                        <div class="key-item">
                            <label>文档名称：</label>
                            <span>{{name}}.{{docuType}}</span>
                        </div>
                        <FormItem label="推荐给：" prop="tissue">
                           <!-- <div class="key-item"> -->
                                <TreeSelect v-model="formValidate.tissue" :data="orgList" v-width="150" @on-change="changeArea"  />
                            <!-- </div>  -->
                        </FormItem>
                        
                        <div class="key-item">
                            <label ></label>
                            <Select v-model="personId" multiple  placeholder="请选择用户" style="width:80%">
                                <Option v-for="item in userList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                            </Select>
                        </div> 
                        <div class="key-item">
                            <label >附言：</label>
                            <Input type="textarea" v-model="prediction" style="width:80%" />
                        </div>
                    </div>
                </Form>
            </div>
                
            <div class="model-table">
                <div class="action-btn">
                <span @click="modalR = false">取消</span>
                <span style="background: #4b7efe;" @click="modalRSure('formValidate')">确定</span>
                </div> 
                
            </div>
            <div slot="footer" >
                <!-- <Button type="primary"  long  @click="save" style="font-size:12px">保存为新模版</Button> -->
            </div>
        </Modal>
        <!-- 文件上传 -->
        <Modal v-model="modalU" width="520" class="model-box"> 
            <p slot="header" style="color:#1c2438;font-size:14px;border-left:7px solid #4b7efe;background:#f8f9fb;height:39px;line-height:39px">
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <span class="rectangle"></span>
                <span style="margin-left:8px">文档上传</span>
            </p>
            <div>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
                    <div>
                        <FormItem label="文档上传：" prop="file">
                           <Upload 
                                action=""
                                :before-upload="handleUploadicon"
                                :on-format-error="uploadError"
                                accept="audio/*,video/*,image/*,.doc,.docx,.wps,.xls,.xlsx,.et,.ppt,.pptx,.pps,.pot,.txt,.pdf,.zip,.rar,.dwg"
                                ref="upload">
                                <div class="img-box" v-if="imgObj.name">
                                    {{imgObj.name}}
                                </div>
                                <Button style="background:#576374;color:#fff;font-size:13px">点击上传,文件小于200M</Button>
                            </Upload>
                        </FormItem>
                        <FormItem label="文档名称：" prop="name">
                           <Input v-model="formValidate.name"></Input>
                        </FormItem>
                        <FormItem label="文档标签：" prop="label">
                           <Input v-model="formValidate.label" readonly @on-focus="chooseLabel"></Input>
                        </FormItem>
                         <div class="dropdown" v-if="dropdownShow">
                            <Collapse simple accordion >
                                <Panel v-for="(item,index) in data1" :key="index">
                                    {{ item.name }}
                                    <div slot="content" class="cmp-tab">
                                        <a href="javascript:;" v-for="(ele, idx) in item.children" 
                                        :key="idx" @click="typeCheck(ele.name)" 
                                        :class="{checked:typeBox.includes(ele.name)}">{{ ele.name }}</a>
                                    </div>
                                </Panel>
                            </Collapse>
                            <div class="finish-btn" >
                                <button @click="finish()">完成</button>
                            </div>
                        </div>
                        <FormItem label="文档摘要：" prop="digest">
                           <Input type="textarea" v-model="formValidate.digest"></Input>
                        </FormItem>
                    </div>
                </Form>
            </div>
                
            <div class="model-table">
                <div class="action-btn">
                <span @click="modalU = false">取消</span>
                <span style="background: #4b7efe;" @click="modalUSure('formValidate')">确定</span>
                </div> 
                
            </div>
            <div slot="footer" >
                <!-- <Button type="primary"  long  @click="save" style="font-size:12px">保存为新模版</Button> -->
            </div>
        </Modal>
        <!-- 文档移动 -->
        <Modal v-model="modalM" width="850" class="model-box"> 
            <p slot="header" style="color:#1c2438;font-size:14px;border-left:7px solid #4b7efe;background:#f8f9fb;height:39px;line-height:39px">
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <span class="rectangle"></span>
                <span style="margin-left:8px">文档移动</span>
            </p>
            <div style="display:flex">
                <div class="move-left">
                    <div class="z-tree">
                        <Tree :data="docList" :render="renderContentM" @on-select-change="selectMoveNode"></Tree>
                    </div>
                </div>
                <div class="move-right">
                    <div>
                        <Icon type="ios-information-circle" style="font-size:20px;margin-right:5px" />
                        在左侧树点击需要移动的目标路径
                    </div>
                    <div>
                        <label for="">目标文档路径：</label>
                        <span>{{moveName}}</span>
                    </div>
                </div>
            </div>
                
            <div class="model-table">
                <div class="action-btn">
                <span @click="modalM = false">取消</span>
                <span style="background: #4b7efe;" @click="modalMSure()">确定</span>
                </div> 
                
            </div>
            <div slot="footer" >
                <!-- <Button type="primary"  long  @click="save" style="font-size:12px">保存为新模版</Button> -->
            </div>
        </Modal>
    </div>
</template>
<script>
import { labelTree,orgMethod,documentTree,tableList,deleteDoc,moveDoc,collectAction,editDoc,roles,recommend,createCate,deleteCate,editCate,uploadFun,areaUpload,docSearch} from '@api/knowledgeManage/document';
import createTree from '@/libs/public-util'
import {formatTime,findFather} from '@/libs/public'
import util from '@/libs/public_js'
export default {
    name:'documentManage',
    data (){
        return {
            height:'',
            value:'',
            tableList: [
                {
                    type: 'selection',
                    width: 70,
                    align: 'center'
                },
                {
                    title: '文档名称',
                    key: 'name',
                    width:120,
                    ellipsis: true,
                    render: (h, params) => {
                        let text = params.row.name+"."+params.row.type
                        return h('div',{},text);
                    }
                },
                {
                    title: '文档路径',
                    key: 'idPathName',
                    ellipsis: true,
                },
                {
                    title: '文档标签',
                    key: 'labelName',
                    width:120,
                    ellipsis: true,
                },
                {
                    title: '文档大小',
                    key: 'size',
                    render: (h, params) => {
                        let that = this
                        const text = params.row.size
                        return h('span', {}, (text/1048576).toFixed(2)+'M');
                    }
                },
                {
                    title: '上传人员',
                    key: 'createUserName'
                },
                {
                    title: '上传时间',
                    key: 'createDate',
                    // 
                     render: (h, params) => {
                        let that = this
                        const text = params.row.createDate
                        return h('span', {}, formatTime(text, 'HH:mm:ss yyyy-MM-dd'));
                    }

                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 200,
                    // align: 'center'
                }
            ],
            docList:[],
            orgList:[],
            data1:[],
            currentNode:null,
            page:1,
            processId:'',
            directoryId:'',
            startTime:'',
            endTime:'',
            start:'',
            end:'',
            startDate: {
                disabledDate (date) {
                    return date && date.valueOf() >= Date.now();
                }
            },
            endDate: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 8*86400000;
                }
            },
            tableData:[],
            total:0,
            kword:'',
            selectedData:[],
            modal:false,
            formValidate:{
                name:'',
                label:'',
                remark:'',
                tissue:'',
                digest:'',
                file:''
            },
            ruleValidate:{
                name:[
                    { required: true, message: '请填写名称', trigger: 'blur'}
                ],

                label:[
                   { required: true, message: '请选择标签', trigger: 'blur'}
                ],
                 tissue:[
                    { required: true, type: 'number', message: '请选择组织', trigger: 'change' }
                ],
                file:[
                    { required: true,  message: '请上传文档', trigger: 'change' }
                ]
            },
            cateList:[],
            dropdownShow:false,
            typeBox:[],
            editObj:{},
            modalR:false,
            prediction:'',
            userList:[],
            personId:'',
            tissue:'',
            docuType:'',
            name:'',
            cateName:'',
            baseList:[],
            choosedName:'',
            chooseArr:[],
            modalU:false,
            imgObj:{},
            modalM:false,
            moveObj:{},
            num:0,
            isSeachdata:false,
            searchList:[],
            tree:[],
            moveName:'',
            moveArr:[]
        }
    },
    methods:{
        searchDoc(){
            if(this.value){
                this.isSeachdata=true
                docSearch(this.value).then(res=>{
                    console.log(res)
                    if(res.data){
                        this.searchList = res.data
                    }
                })
            }else{
                this.isSeachdata = false
            }
            
        },
        handleUploadicon(file) {
            let formData = new FormData()
            formData.append('file', file)
            uploadFun(formData).then(res=> {
                console.log(res)
                this.imgObj = res.data
                this.formValidate.name = res.data.name.split('.')[0]
                this.formValidate.file = res.data.path
            }).catch(err => {
                // 异常情况
            })
        },
        uploadError(file) { 
            //上传失败
            this.$Notice.error({
                title: '上传失败，请重新上传。',
                desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
            });
        },
        uploadFile(){
            if(!this.currentNode){
                this.$Message.warning('请选择区域或目录');
                return
            }
            console.log(this.currentNode)
            this.modalU = true
        },
        modalUSure(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let data
                    if(this.currentNode.type==0){
                         this.processId = this.currentNode.processId
                        data = {
                            directoryId:-1,
                            labelName:this.typeBox.join(','),
                            name: this.imgObj.name.split('.')[0],
                            processId: Math.abs(this.currentNode.id),
                            size: this.imgObj.size,
                            srcName: this.formValidate.name,
                            summary: this.formValidate.digest,
                            type: this.imgObj.name.split('.')[1],
                            url: this.formValidate.file,
                        }
                    }else{
                        this.directoryId = Math.abs(this.currentNode.id)
                        data = {
                            directoryId:Math.abs(this.currentNode.id),
                            labelName:this.typeBox.join(','),
                            name: this.imgObj.name.split('.')[0],
                            size: this.imgObj.size,
                            srcName: this.formValidate.name,
                            summary: this.formValidate.digest,
                            type: this.imgObj.name.split('.')[1],
                            url: this.formValidate.file,
                        }
                    }
                    areaUpload(data).then(res=>{
                        if(res.data.id){
                            this.$Message.success('上传成功');
                            this.getList()
                            this.modalU = false
                        }
                    })
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        modalRSure(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let data = {
                        documentId: this.documentId,
                        orgId:this.formValidate.tissue,
                        postscript: this.prediction,
                        roleId: this.personId.length!=0?this.personId.join(','):'',
                    }
                    recommend(data).then(res=>{
                        if(res.data.count){
                        //   recommendCount
                            this.modalR = false
                        }
                    })
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        changeArea(name){
            this.getRole()
        },
        getRole(){
            roles(this.tissue).then(res=>{
                console.log(res)
                if(res.data.items){
                    this.userList = res.data.items
                }
                
            })
        },
        recommend(row){
            console.log(row)
            this.modalR = true
            this.name = row.name
            this.docuType = row.type
            this.documentId = row.id
        },
        modalSure(name){
             this.$refs[name].validate((valid) => {
                if (valid) {
                    this.editObj.name = this.formValidate.name
                    this.editObj.labelName = this.typeBox.join(',')
                    this.editObj.summary = this.formValidate.remark
                    editDoc(this.editObj).then(res=>{
                        if(res.data.count){
                            this.modal = false
                            this.$Message.success('编辑成功！');
                            this.getList()
                        }
                    })
                } else {
                    this.$Message.error('Fail!');
                }
            })
            
        },
        finish(){
            this.dropdownShow = false
            console.log(this.typeBox)
            this.formValidate.label = this.typeBox.join(',')
        },
        chooseLabel(){
            console.log("dd")
            this.dropdownShow = true
        },
        docEdit(row){
            this.modal = true
            console.log(row)
            this.editObj = row
            this.formValidate.name = row.name
            this.formValidate.label = row.labelName
            this.formValidate.remark = row.summary
            this.typeBox = row.labelName.split(',')
        },
        collect(id){
            collectAction(id,1).then(res=>{
                if(res.data.count){
                     this.$Message.success('收藏成功');
                     this.getList()
                }
            })
        },
        cancelCollect(id){
            collectAction(id,2).then(res=>{
                if(res.data.count){
                     this.$Message.success('取消收藏成功');
                     this.getList()
                }
            })
        },
          typeCheck(i) {
            if(this.typeBox.includes(i)) {
                this.typeBox = this.typeBox.filter((ele) => {
                    return ele != i
                });
            } else {
                this.typeBox.push(i);
            }
        },
        move(){
            if(this.selectedData.length==0){
                // 
                this.$Message.warning('请选择移动的文档');
                return
            }
            
            this.modalM = true
           
        },
        deleteHandle(){
            if(this.selectedData.length==0){
                // 
                this.$Message.warning('请选择要删除的文档');
                return
            }
            let arr = []
            this.selectedData.map(ele=>{
                arr.push(ele.id)
            })
            deleteDoc(arr.join(',')).then(res=>{
                console.log(res)
                if(res.data.count){
                    this.$Message.success('删除成功！');
                    this.getList()
                }
            })
        },
        downloadFile(){
            console.log(this.selectedData)
            if(this.selectedData.length==0){
                // 
                this.$Message.warning('请选择下载的文档');
                return
            }
            let arr = []
            this.selectedData.map(ele=>{
                arr.push(ele.id)
            })
            const defaultParams = {
                 ids:arr.join(',')
                };
            util.download('/knowledge/api/documents/download', defaultParams)
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
            const index = this.selectedData.findIndex(item => item.id === row.id);
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
                const index = this.selectedData.findIndex(i => i.id === item.id);
                if (index >= 0) {
                    this.selectedData.splice(index, 1);
                }
            });
        },
        endTimeChange(date){
            this.endTime = date
            this.end = date
        },
        startTimeChange(date){
            this.startTime = date
            this.start = this.getYesterday(date)
            console.log(this.startTime)
        },
          // 获取前一天
        getYesterday(date) {
            var date = date.split('-'),
            today = new Date().setFullYear(+date[0], +date[1]-1, +date[2]), 
            yesterday = new Date(today - 24 * 60 * 60 * 1000);
            var y = yesterday.getFullYear();
            var m = yesterday.getMonth() + 1;
            var d = yesterday.getDate();
            if(m<10){
            m = '0'+m;   
            }
            if(d<10){
                d = '0'+d; 
            }
        
            return y+'-'+m+'-'+d;  
        },
        search(){
            this.getList()
        },
        reset(){
            this.kword = ""
            this.startTime = ""
            this.start = ""
            this.end = ""
            this.endTime = ""
        },
        selectMoveNode(node){
            this.moveObj = node[0]
            let temp = []
            let parentId = node[0].parentId
            this.moveArr  = this.findFather(this.baseList,parentId)
            console.log(this.moveArr)
            this.moveArr.unshift(this.moveObj)
            this.moveArr.reverse().map(ele=>{
                temp.push(ele.title)
            })
            this.moveName = temp.join('>')
        },
        modalMSure(){
            if(!this.moveObj){
                this.$Message.warning('请选择目标路径');
                return
            }
            let arr = [],data={}
            this.selectedData.map(ele=>{
                arr.push(ele.id)
            })
            if(this.moveObj.type==0){
                this.processId = this.moveObj.processId
                data = {
                    directoryId: -1,
                    ids: arr.join(','),
                    processId: Math.abs(this.moveObj.id),
                }
            }else{
                 this.directoryId = Math.abs(this.moveObj.id)
                data = {
                    directoryId: Math.abs(this.moveObj.id),
                    ids: arr.join(','),
                    processId:'',
                }
            }
            moveDoc(data).then(res=>{
                if(res.data.count){
                     this.$Message.success('移动成功');
                     this.getList()
                     this.modalM = false
                     this.moveArr = []
                     this.moveArr = []
                }
            })
        },
        selectNode(node){
            
            
            this.currentNode = node[0]
            if(this.currentNode.type == 0){
                this.processId = node[0].processId
            }else{
                this.directoryId = Math.abs(node[0].id)
            }
            let temp = []
            let parentId = node[0].parentId
            this.chooseArr  = this.findFather(this.baseList,parentId)
            console.log(this.chooseArr)
            this.chooseArr.unshift(this.currentNode)
            this.chooseArr.reverse().map(ele=>{
                temp.push(ele.title)
            })
            this.choosedName = temp.join('>')
            this.getList()
        }, 
        find(tree,data, parentId) {
           console.log(parentId)
            data.forEach((item, i) => {
                if (item.id== parentId) {
                    tree.push(item)
                    const copy = data.slice()
                    copy.splice(i, 1)
                    this.find(tree,copy, item.parentId)
                }
            })
            return tree
        },
        findFather(data, parentId){
            let tree = []
            tree = this.find(tree,data, parentId);
            console.log(tree)
            return tree
        },
        getList(){
            let start = this.start?this.$moment(this.start).utc().format():''
            let end = this.end?this.$moment(this.end).utc().format():''
            // page,queryName,processId,directoryId,start,end
            tableList(this.page,this.kword,this.processId,this.directoryId,start,end).then(res=>{
                if(res.data.items){
                    this.tableData = res.data.items
                    this.total = res.data.total
                    this.processId = ""
                    this.directoryId = ""
                }
            })
        },
        renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                },
                on: {
                    //鼠标进入
                    mouseover: () => {
                        this.$set(data,'is_show', true)
                    },
                    //鼠标离开
                    mouseout: () => {
                        this.$set(data,'is_show', false)
                    }
                }
            }, [
                h('span', [
                    h('span', data.title),
                    h('span',{
                        style:{
                            color:'rgb(75, 126, 254)',
                            fontSize: '12px',
                            display:data.count==0?'none':'inline-block'
                        }
                    }, "("+data.count+")")
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right'
                    }
                }, [
                     h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size:'small'
                        }),
                        style: {
                            marginRight: '4px',
                            display:data.is_show ? 'inline-block' : 'none',
                             fontSize:'12px'
                        },
                        on: {
                            click: (e) => { 
                                 e.stopPropagation()
                                this.append(data) 
                            }
                        }
                    },'新建'),
                    (data.type!=0&&data.name != '公共文档')&& h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size:'small'
                        }),
                        style: {
                            marginRight: '4px',
                            display: data.is_show ? 'inline-block' : 'none',
                             fontSize:'12px'
                        },
                        on: {
                            click: (e) => { 
                                 e.stopPropagation()
                                this.editFun(data)
                                this.cateName = data.name
                             }
                        }
                    },'编辑'),
                   (data.type!=0&&data.name != '公共文档')&& h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size:'small'
                        }),
                        style: {
                            display:data.is_show ? 'inline-block' : 'none' ,
                             fontSize:'12px'
                        },
                        on: {
                            click: (e) => { 
                                 e.stopPropagation()
                                 this.remove(data) 
                            }
                        }
                    },'删除')
                ])
            ]);
        },
        renderContentM (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                },
                on: {
                    //鼠标进入
                    'mouseenter': () => {
                        data.is_show = true;
                    },
                    //鼠标离开
                    'mouseleave': () => {
                        data.is_show = false;
                    }
                }
            }, [
                h('span', [
                    h('span', data.title),
                    
                ])
            ]);
        },
        editFun(data){
             this.$Modal.confirm({
                title: '新目录名称',
                render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.cateName,
                                autofocus: true,
                            },
                            on: {
                                input: (val) => {
                                    this.cateName = val;
                                }
                            }
                        })
                    },
                okText: '保存',
                cancelText: '取消',
                onOk: () => {
                    if(!this.cateName){
                        this.$Message.warning('目录名称不能为空');
                        return
                    }
                    let setData ={
                        name:  this.cateName, 
                        processId: data.processId, 
                        tenantId: data.tenantId, 
                        id: Math.abs(data.id)
                    }
                    editCate(setData).then(res=>{
                        if(res.data.count){
                            this.$Message.success('编辑成功！');
                            this.getDocTree()
                            this.cateName = ""
                        }
                    })
                },
                onCancel: () => {
                    
                }
            });
        },
        remove(data){
            this.$Modal.confirm({
                title: '提示',
                content: '<p>你确定要删除吗？</p>',
                onOk: () => {
                    deleteCate(Math.abs(data.id)).then(res=>{
                        if(res.data.count){
                                this.$Message.success('删除成功！');
                                this.getDocTree()
                        }
                    })
                },
                onCancel: () => {
                    
                }
            });
          
        },
         chooseLabelS(index){
            let current = this.searchList[index]
            console.log(current)
            this.directoryId = Math.abs(current.id)
            this.getList()
            this.isSeachdata = false
            documentTree().then(res=>{
                if(res.data){
                    let treeItem = []
                    let trees = res.data
                    for(let i = 0; i < trees.length; i ++) {
                        trees[i].title = trees[i].name
                        trees[i].value = trees[i].id
                        trees[i].expand = true
                        treeItem.push(trees[i])
                    }
                    
                     treeItem.map(ele=>{
                        if(ele.id == current.id){
                            console.log(ele)
                            ele.selected = true
                        }else{
                            ele.selected = false
                        }
                    })
                    this.docList = createTree(treeItem, 0)
                }
           })
        },
        getTree(){
           labelTree().then(res=>{
               console.log(res)
                if(res.data){
                    let treeItem = []
                    let trees = res.data
                    for(let i = 0; i < trees.length; i ++) {
                        trees[i].title = trees[i].name
                        trees[i].value = trees[i].id
                        // trees[i].expand = true
                        treeItem.push(trees[i])
                    }
                    this.baseData = treeItem
                    this.data1 = createTree(treeItem, 0)
                }
           })
        },
        getOrg() {
            orgMethod().then(res=> {
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    treeItem.push(trees[i])
                }
                this.orgList = createTree(treeItem, 0)
            }).catch(err=> {

            })
        },
        getDocTree(){
            documentTree().then(res=>{
                console.log(res)
                if(res.data){
                    let treeItem = []
                    let trees = res.data
                    for(let i = 0; i < trees.length; i ++) {
                        trees[i].title = trees[i].name
                        trees[i].value = trees[i].id
                        treeItem.push(trees[i])
                    }
                    // console.log(JSON.stringify(treeItem))
                    this.baseList = treeItem
                    this.docList = createTree(treeItem, 0)
                    console.log(this.docList)
                }
            })
        },
        append(data){
            this.$Modal.confirm({
                title: '新目录名称',
                // content: '<Input v-model="cateName"  style="width: 300px" />',
                render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.cateName,
                                autofocus: true,
                            },
                            on: {
                                input: (val) => {
                                    this.cateName = val;
                                }
                            }
                        })
                    },
                okText: '保存',
                cancelText: '取消',
                onOk: () => {
                     if(!this.cateName){
                        this.$Message.warning('目录名称不能为空');
                        return
                    }
                     let setData ={
                        name:this.cateName,
                        parentId: Math.abs(data.id),
                        processId: data.processId,
                        tenantId: 11,
                        type: data.type==0?2:1
                    }
                    createCate(setData).then(res=>{
                        if(res.data.id){
                            this.$Message.success('新增成功！');
                            this.getDocTree()
                            this.cateName = ""
                        }
                    })
                },
                onCancel: () => {
                    
                }
            });
           
            // let data1={name: "目录123", processId: 1, tenantId: 11, id: 23}
        }
    },
     mounted() {
        this.height = document.body.clientHeight-46
        this.getOrg()
        this.getTree()
        this.getDocTree()
        this.chooseArr=[]
        this.choosedName = ""
    },
    
}
</script>
<style lang="less" scoped>
.document-box{
    display: flex;
    min-height: 100%;
    .c-tree-left{
        width: 350px;
        background-color: #FFF;
        border-top: 3px solid #f0f0f0;
        .c-plain-bg-h{
            border-bottom: 1px solid #f0f0f0;
            height: 50px;
            padding: 10px 0 10px 10px;
            h3{
                font-size: 14px;
            } 
           
        }
        .z-tree{
            padding-left: 10px;
            /deep/.ivu-icon{
                color: #4b7efe;
            }
            /deep/.ivu-tree-title{
                width: 93%;
            }
        }
        .serach-box{
                padding: 2px;
            position: relative;
            z-index: 10;
            /deep/.ivu-input{
                height: 28px;
                line-height: 28px;
                padding: 0 24px 0 8px;
                font-size: 13px;
                outline: none;
                box-sizing: border-box;
                color: #495060;
                background-color: transparent;
                position: relative;
                cursor: pointer;
            }
            .search-list{
                position: absolute;
                top: 38px;
                left: 0;
                width:100%;
                background: #fff;
                padding: 5px 0 ;

                li{
                    padding:7px 16px;
                }
            }
        }
    }
    .c-tree-right{
        flex: 1;
        .c-main-border{
            border: 5px solid #f0f0f0;
            min-height: 100%;
            width: 100%;
            background: #fff;
            .doc-crumbs{
                padding-left: 20px;
                height: 35px;
                line-height: 35px;
                border-bottom: 1px solid #ededed;
            }
            .c-left-border-blue{
                border-radius: 3px;
                padding: 5px;
                font-size: 13px;
                height: 43px;
                /deep/.ivu-form .ivu-form-item-label{
                    font-size: 13px;
                }
                .action-btn{
                    float: right;
                    margin-top: 4px;
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
            .c-top-border-gray{
                border-top: 5px solid #f0f0f0;
                padding: 10px;
                .c-table-top-btns{
                    height: 36px;
                    border-bottom: 1px solid #EEE;
                    button{
                        background: #576374;
                        font-size: 12px;
                        padding: 4px 12px;
                        color: #fff;
                        border: 0;
                        border-radius: 3px;
                        margin: 0 5px;
                    }
                }
                .page{
                    text-align: right;
                    margin-top: 20px;
                }
            }
        }
    }
}
.action-btn{
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
.model-box{
    position: relative;
    z-index: 100;
    .move-left{
        width: 350px;
        height: 400px;
        overflow: auto;
    }
    .move-right{
        flex-grow:2
    }
}
.dropdown{
    position: absolute;
    top: 220px;
    left: 0;
    width: 100%;
    // border: 1px solid #ededed;
    background: #fff;
    z-index: 999;
    margin-top: 5px;
    padding: 5px 10px;
    border-radius: 4px;
    .cmp-tab {
        display: inline-block;
        a {
            margin-right: 20px;
            color: #8190a5;
            background: #eef1f7;
            padding: 0 10px;
            height: 26px;
            line-height: 26px;
            font-size: 10px;
            display: inline-block;
            border-radius: 4px;
            margin-bottom: 10px;
        }
        .checked {
            color: #184fd8;
            background-color: #e8effd;
        }
    }
    .finish-btn{
        text-align: center;
        margin: 20px 0;
        button{
            min-width: 130px;
            margin: 0 15px;
            color: #fff;
            background-color: #4b7efe;
        }
    }
}
/deep/.ivu-collapse-content > .ivu-collapse-content-box{
    margin-bottom: 0;
}
.key-item{
    display: block;
    margin-bottom: 10px;
    label{
        font-size: 13px;
        color: #495060;
        display: inline-block;
        width: 70px;
    }
}
/deep/.ivu-upload{
    display: inline-block;
}
</style>