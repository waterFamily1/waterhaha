<template>
    <div class="index-box" :style="{height: height+'px'}">
        <Tabs :value="value" @on-click="changeName">
            <TabPane label="我的下载" name="name1">
                <div class="c-left-border-blue">
                   <div>
                       <Input v-model="downK" placeholder="文档名称或文档标签" style="width: 200px;margin-right:5px" size="small"  />
                       <Button type="primary" size="small" style="font-size:12px" @click="downSearch()">搜索</Button>
                   </div>
                </div>
                <div class="c-top-border-gray">
                    <Table stripe :columns="downloadList" :data="downData">
                        <template slot-scope="{ row }" slot="name">
                            <strong>{{ row.name }}</strong>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <Button class="action" type="text" size="small" style="margin-right: 5px;color:rgb(75, 126, 254);font-size:13px" @click="downLoadFile(row.id)">下载</Button>
                            <Button class="action" type="text" size="small" style="margin-right: 5px;color:rgb(75, 126, 254);font-size:13px" v-if="row.collect" @click="cancelCollect(row.id)">取消收藏</Button>
                            <Button class="action" type="text" size="small" style="margin-right: 5px;color:rgb(75, 126, 254);font-size:13px" v-else @click="collect(row.id)">收藏</Button>
                            <Button class="action" type="text" size="small" style="color:rgb(75, 126, 254);font-size:13px" @click="recommend(row)">推荐</Button>
                        </template>
                    </Table>
                    <Page :total="downTotal" show-elevator class="page" @on-change="downChangeSize" />
                </div>
            </TabPane>
            <TabPane label="我的上传" name="name2">
                <div class="c-left-border-blue">
                   <div>
                       <Input v-model="uploadK" placeholder="文档名称或文档标签" style="width: 200px;margin-right:5px" size="small"  />
                       <Button type="primary" size="small" style="font-size:12px" @click="uploadSearch()">搜索</Button>
                   </div>
                </div>
                <div class="c-top-border-gray">
                    <Table stripe :columns="uploadList" size="small" :data="uploadData">
                        <template slot-scope="{ row }" slot="name">
                            <strong>{{ row.name }}</strong>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <Button class="action" type="text" size="small" style="margin-right: 5px;color:rgb(75, 126, 254);font-size:13px" @click="docEdit(row)">编辑</Button>
                            <Button class="action" type="text" size="small" style="color:rgb(75, 126, 254);font-size:13px" @click="deleteUpload(row.id)">删除</Button>
                        </template>
                    </Table>
                    <Page :total="uploadTotal" show-elevator class="page" @on-change="uploadChangeSize" />
                </div>
            </TabPane>
            <TabPane label="我的收藏" name="name3">
                 <div class="c-left-border-blue">
                   <div>
                       <Input v-model="collectK" placeholder="文档名称或文档标签" style="width: 200px;margin-right:5px" size="small"  />
                       <Button type="primary" size="small" style="font-size:12px" @click="collectSearch()">搜索</Button>
                   </div>
                </div>
                <div class="c-top-border-gray">
                    <Table stripe :columns="collectList" size="small" :data="collectData">
                        <template slot-scope="{ row }" slot="name">
                            <strong>{{ row.name }}</strong>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                           <Button class="action" type="text" size="small" style="margin-right: 5px;color:rgb(75, 126, 254);font-size:13px" @click="downLoadFile(row.id)">下载</Button>
                            <Button class="action" type="text" size="small" style="margin-right: 5px;color:rgb(75, 126, 254);font-size:13px" v-if="row.collect" @click="cancelCollectC(row.id)">取消收藏</Button>
                            <Button class="action" type="text" size="small" style="margin-right: 5px;color:rgb(75, 126, 254);font-size:13px" v-else @click="collectC(row.id)">收藏</Button>
                            <Button class="action" type="text" size="small" style="color:rgb(75, 126, 254);font-size:13px" @click="recommend(row)">推荐</Button>
                        </template>
                    </Table>
                    <Page :total="collectToatl" show-elevator class="page" @on-change="collectChangeSize" />
                </div>
            </TabPane>
            <TabPane label="推荐我的" name="name4">
                <div class="c-left-border-blue">
                   <div>
                       <Input v-model="recommendK" placeholder="文档名称或文档标签" style="width: 200px;margin-right:5px" size="small"  />
                       <Button type="primary" size="small" style="font-size:12px" @click="recommendSearch()">搜索</Button>
                   </div>
                </div>
                <div class="c-top-border-gray">
                    <Table stripe :columns="recommendList" size="small" :data="recommendData">
                        <template slot-scope="{ row }" slot="name">
                            <strong>{{ row.name }}</strong>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <!-- <Button class="action" size="small" style="margin-right: 5px;">配置</Button> -->
                            <Button class="action" size="small">查看</Button>
                        </template>
                    </Table>
                    <Page :total="recommendTotal" show-elevator class="page" @on-change="recommendChangeSize" />
                </div>
            </TabPane>
            <TabPane label="我的标签" name="name5">
                <div class="my-label-content">
                    <div class="label-div">
                        <h3>已选标签</h3>
                        <ul>
                            <li v-for="(item,index) in userList" :key="index" @mouseenter="showClose(index)" @mouseleave="hideColse(index)">
                                <span>{{ item.labelName }}</span>
                                <!-- -->
                                <Icon type="ios-close-circle-outline"  class="icon-label" v-if="item.show" @click.stop="deleteHandle(item.labelName)" />
                            </li>
                            
                        </ul>
                    </div>
                    <div class="label-div">
                        <h3>更多标签</h3>
                        <div class="dropdown">
                           <Collapse simple accordion >
                                <Panel  v-for="(item,index) in cateList" :key="index">
                                    {{ item.name }}
                                    <div slot="content" class="cmp-tab">
                                        <a href="javascript:;" v-for="(ele, idx) in item.children" 
                                        :key="idx" @click="typeCheck(ele.name)" 
                                        :class="{checked:typeBox.includes(ele.name)}">{{ ele.name }}</a>
                                    </div>
                                </Panel> 
                            </Collapse>
                            <div class="finish-btn" >
                                <Button @click="finish()">完成</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </TabPane>
        </Tabs>
        <!-- 文档推荐 -->
        <Modal v-model="modal" width="520" class="model-box"> 
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
                            <Input type="textarea" v-model="remark" style="width:80%" />
                        </div>
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
         <!-- 文档编辑 -->
         <Modal v-model="modalE" width="520" class="model-box"> 
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
                                <Panel v-for="(item,index) in cateList" :key="index">
                                    {{ item.name }}
                                    <div slot="content" class="cmp-tab">
                                        <a href="javascript:;" v-for="(ele, idx) in item.children" 
                                        :key="idx" @click="typeCheck(ele.name)" 
                                        :class="{checked:typeBox.includes(ele.name)}">{{ ele.name }}</a>
                                    </div>
                                </Panel>
                            </Collapse>
                            <div class="finish-btn" >
                                <Button @click="finishE()">完成</Button>
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
                <span @click="modalE = false">取消</span>
                <span style="background: #4b7efe;" @click="modalSureE('formValidate')">确定</span>
                </div> 
                
            </div>
            <div slot="footer" >
                <!-- <Button type="primary"  long  @click="save" style="font-size:12px">保存为新模版</Button> -->
            </div>
        </Modal>
    </div>
</template>
<script>
import { orgMethod,labelTree,myDownload,myUpload,myCollect,recommendMe,userLabel,deleteLabel,addLabel,collectAction,roles,recommend,editDoc,deleteDoc} from '@api/knowledgeManage/myknowledge';
import createTree from '@/libs/public-util'
import {formatTime} from '@/libs/public'
import util from '@/libs/public_js'
export default {
    data() {
        return {
            height:'',
            downK:'',
            uploadK:'',
            collectK:'',
            recommendK:"",
            downloadList: [
                {
                    title: '文档名称',
                    key: 'name',
                    width:310
                },
                {
                    title: '文档标签',
                    key: 'labelName',
                    width:310
                },
                {
                    title: '文档大小',
                    key: 'size',
                    width:110,
                    // 
                    render: (h, params) => {
                        let that = this
                        const text = params.row.size
                        return h('span', {}, (text/1048576).toFixed(2)+'M');
                    }
                },
                {
                    title: '上传人员',
                    key: 'createUserName',
                    width:110
                },
                {
                    title: '下载时间',
                    key: 'createDate',
                    width:120
                },
                {
                    title: '操作',
                    slot: 'action',
                    // width: 230,
                    // align: 'center'
                }
            ],
            uploadList: [
               {
                    title: '文档名称',
                    key: 'name',
                    width:310
                },
                {
                    title: '文档标签',
                    key: 'labelName',
                    width:310
                },
                {
                    title: '文档大小',
                    key: 'size',
                    width:110,
                    // 
                    render: (h, params) => {
                        let that = this
                        const text = params.row.size
                        return h('span', {}, (text/1048576).toFixed(2)+'M');
                    }
                },
                {
                    title: '上传人员',
                    key: 'createUserName',
                    width:110
                },
                {
                    title: '下载时间',
                    key: 'createDateE',
                    width:120
                },
                {
                    title: '操作',
                    slot: 'action',
                    // width: 250,
                    // align: 'center'
                }
            ],
            collectList: [
                {
                    title: '文档名称',
                    key: 'name',
                    width:310
                },
                {
                    title: '文档标签',
                    key: 'labelName',
                    width:310
                },
                {
                    title: '文档大小',
                    key: 'size',
                    width:110,
                    // 
                    render: (h, params) => {
                        let that = this
                        const text = params.row.size
                        return h('span', {}, (text/1048576).toFixed(2)+'M');
                    }
                },
                {
                    title: '上传人员',
                    key: 'createUserName',
                    width:110
                },
                {
                    title: '下载时间',
                    key: 'createDate',
                    width:120
                },
                {
                    title: '操作',
                    slot: 'action',
                    // width: 250,
                    // align: 'center'
                }
            ],
            recommendList :[
                {
                    title: '文档名称',
                    key: 'name',
                    width:310
                },
                {
                    title: '文档标签',
                    key: 'labelName',
                    width:310
                },
                {
                    title: '文档大小',
                    key: 'size',
                    width:110,
                    // 
                    render: (h, params) => {
                        let that = this
                        const text = params.row.size
                        return h('span', {}, (text/1048576).toFixed(2)+'M');
                    }
                },
                {
                    title: '上传人员',
                    key: 'createUserName',
                    width:110
                },
                {
                    title: '下载时间',
                    key: 'createDate',
                    width:120
                },
                {
                    title: '操作',
                    slot: 'action',
                    // width: 250,
                    // align: 'center'
                }
            ],
            selectedList:[],
            typeBox:[],
            produceBox:[],
            manageBox:[],
            showList:[],
            tempList:[],
            downPage:1,
            downTotal:0,
            downData:[],
            uploadData:[],
            uploadPage:1,
            uploadTotal:0,
            collectData:[],
            collectToatl:0,
            collectPage:1,
            recommendData:[],
            recommendPage:1,
            recommendTotal:0,
            cateList:[],
            userList:[],
            modal:false,
             docuType:'',
            name:'',
            documentId:'',
             orgList:[],
            modal:false,
            tissue:'',
            personId:[],
            userList:[],
            remark:'',
            formValidate:{
                tissue:'',
                 name:'',
                label:'',
                remark:'',
            },
            ruleValidate:{
                tissue:[
                    { required: true, type: 'number', message: '请选择组织', trigger: 'change' }
                ] ,
                name:[
                    { required: true, message: '请填写名称', trigger: 'blur'}
                ],

                label:[
                   { required: true, message: '请选择标签', trigger: 'blur'}
                ],
            },
            modalE:false,
            editObj:{},
            dropdownShow:false
        }
    },
    mounted() {
        this.height = document.body.clientHeight-46
        this.getTree()
        this.getDownload()
        this.getUpload()
        this.getCollect()
        this.getRecommend()
        this.getLabel()
        this.getOrg()
    },
    created() {
        this.value=this.$route.query.name
    },
    methods: {
        deleteUpload(id){
            this.$Modal.confirm({
                title: '是否确定删除？',
                width: '300',
                onOk: () => {
                    deleteDoc(id).then(res=>{
                        if(res.data.count){
                            this.$Message.success('删除成功');
                            this.getUpload()
                        }
                    }).catch(err=> {

                    })
                },
                onCancel: () => {
                    // this.$Message.info('Clicked cancel');
                }
            });
            
        }, 
         finishE(){
            this.dropdownShow = false
            console.log(this.typeBox)
            this.formValidate.label = this.typeBox.join(',')
        },
        chooseLabel(){
            console.log("dd")
            this.dropdownShow = true
        },
        modalSureE(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.editObj.name = this.formValidate.name
                    this.editObj.labelName = this.typeBox.join(',')
                    this.editObj.summary = this.formValidate.remark
                    editDoc(this.editObj).then(res=>{
                        if(res.data.count){
                            this.modalE = false
                            this.$Message.success('编辑成功！');
                            this.getList()
                        }
                    })
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        docEdit(row){
            this.modalE = true
            console.log(row)
            this.editObj = row
            this.formValidate.name = row.name
            this.formValidate.label = row.labelName
            this.formValidate.remark = row.summary
            this.typeBox = row.labelName.split(',')
        },
        changeName(name){
           console.log(name)
            if(name == 'name1'){
                this.getDownload()
            }else if(name == 'name2'){
                this.getUpload()
            }else if(name == 'name3'){
                this.getCollect()
            }else if(name == 'name4'){
                this.getRecommend()
            }else{
                this.getLabel()
                this.getTree()
            }
        },
         modalSure(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                        let data = {
                        documentId: this.documentId,
                        orgId:this.formValidate.tissue,
                        postscript: this.remark,
                        roleId: this.personId.length!=0?this.personId.join(','):'',
                    }
                    recommend(data).then(res=>{
                        if(res.data.count){
                        //   recommendCount
                            this.modal = false
                        }
                    })
                } else {
                    this.$Message.error('Fail!');
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
            this.modal = true
            this.name = row.name
            this.docuType = row.type
            this.documentId = row.id
        },
        collect(id){
            collectAction(id,1).then(res=>{
                if(res.data.count){
                     this.$Message.success('收藏成功');
                     this.getDownload()
                }
            })
        },
        cancelCollect(id){
            console.log(id)
            collectAction(id,2).then(res=>{
                if(res.data.count){
                     this.$Message.success('取消收藏成功');
                     this.getDownload()
                }
            })
        },
        collectC(id){
            collectAction(id,1).then(res=>{
                if(res.data.count){
                     this.$Message.success('收藏成功');
                     this.getCollect()
                }
            })
        },
        cancelCollectC(id){
            console.log(id)
            collectAction(id,2).then(res=>{
                if(res.data.count){
                     this.$Message.success('取消收藏成功');
                     this.getCollect()
                }
            })
        },
        downLoadFile(id){
            const defaultParams = {
                 ids:id
                };
            util.download('/knowledge/api/documents/download', defaultParams)
        },
        deleteHandle(name){
            deleteLabel(name).then(res=>{
                console.log(res)
                if(res.data.count){
                    
                     this.$Message.success('删除成功！');
                    this.getLabel()
                    console.log(this.typeBox)
                    this.typeBox.map((ele,index)=>{
                        if(ele == name){
                          this.typeBox.splice(index,1)
                        }
                    })
                }
            })
        },
        getLabel(){
            userLabel().then(res=>{
               console.log(res)
               if(res.data){
                   res.data.map(ele=>{
                       ele.show = false
                       this.typeBox.push(ele.labelName)
                   })
                   this.userList = res.data
                   
               }
            })
        },
        downSearch(){
            this.getDownload()
        },
        downChangeSize(size){
           this.downPage = size
           this.getDownload()
        },
        uploadSearch(){
            this.getUpload()
        },
        uploadChangeSize(size){
           this.uploadPage = size
           this.getUpload()
        },
        collectSearch(){
            this.getCollect()
        },
        collectChangeSize(size){
           this.collectPage = size
           this.getCollect()
        },
        recommendSearch(){
            this.getRecommend()
        },
        recommendChangeSize(size){
           this.recommendPage = size
           this.getRecommend()
        },
        getTree(){
           labelTree().then(res=>{
            //    console.log(res)
                if(res.data){
                    let treeItem = []
                    let trees = res.data
                    for(let i = 0; i < trees.length; i ++) {
                        trees[i].title = trees[i].name
                        trees[i].value = trees[i].id
                        treeItem.push(trees[i])
                    }
                    this.cateList = createTree(treeItem, 0)
                    console.log(this.cateList)
                }
           })
        },
        getDownload(){
            myDownload(this.downPage,this.downK).then(res=>{
               if(res.data.items){
                   res.data.items.map(ele=>{
                       ele.createDate = formatTime(ele.createDate, 'HH:mm:ss yyyy-MM-dd')
                   })
                   this.downData = res.data.items
                   this.downTotal = res.data.total
               }
            })
        },
        getUpload(){
           myUpload(this.uploadPage,this.uploadK).then(res=>{
               if(res.data.items){
                   res.data.items.map(ele=>{
                       ele.createDateE = formatTime(ele.createDate, 'HH:mm:ss yyyy-MM-dd')
                   })
                   this.uploadData = res.data.items
                   this.uploadTotal = res.data.total
               }
           })
        },
        getCollect(){
            myCollect(this.collectPage,this.collectK).then(res=>{
                if(res.data.items){
                   res.data.items.map(ele=>{
                       ele.createDate = formatTime(ele.createDate, 'HH:mm:ss yyyy-MM-dd')
                   })
                   this.collectData = res.data.items
                   this.collectToatl = res.data.total
               }
            })
        },
        getRecommend(){
            recommendMe(this.recommendPage,this.recommendK).then(res=>{
                if(res.data.items){
                   res.data.items.map(ele=>{
                       ele.createDate = formatTime(ele.createDate, 'HH:mm:ss yyyy-MM-dd')
                   })
                   this.recommendData = res.data.items
                   this.recommendTotal = res.data.total
               }
            })
        },
        typeCheck(i,index) {
            if(this.typeBox.includes(i)) {
                this.typeBox = this.typeBox.filter((ele) => {
                    return ele != i
                });
            } else {
                this.typeBox.push(i);
            }
        },
        finish(){
            console.log(this.typeBox)
            console.log(this.userList)
            let arr = []
            this.userList.map(item=>{
                arr.push(item.labelName)    
            })
            let temp = arr.concat(this.typeBox)
            let a = temp.filter(function(v, i, arr) {
                return temp.indexOf(v) === arr.lastIndexOf(v);
            })
            console.log(a)
            addLabel(a).then(res=>{
               if(res.data.count){
                   this.$Message.success('编辑成功！');
                    this.getLabel()
               }
            })
        },
        showClose(index){
            this.userList[index].show=true
        },
        hideColse(index){
            this.userList[index].show=false
        }
    }
}
</script>
<style lang="less" scoped>
.index-box{
    border-top: 5px solid #f0f0f0;
    background: #fff;
    .c-left-border-blue{
        padding: 5px;
        border-radius: 3px;
        div{
            height: 33px;
            display: flex;
            align-items:  center;
            font-size: 13px;
            margin-left: 3px;
        }
    }
    .c-top-border-gray{
        padding: 10px;
        border-top: 5px solid #f0f0f0;
        .page{
            text-align: right;
            margin-top: 10px;
        }
    }
    .my-label-content{
        display: flex;
        padding: 5px 10px;
        .label-div{
            width: 50%;
            padding: 10px;
            h3{
                margin-bottom: 15px;
            }
            li{
                position: relative;
                z-index: 1;
                float: left;
                padding: 0 10px;
                margin: 5px;
                height: 26px;
                line-height: 26px;
                list-style: none;
                color: #8190a5;
                border-radius: 4px;
                background-color: #eef1f7;
                cursor: pointer;
                font-size: 13px;
                .icon-label{
                    position: absolute;
                    top: 0;
                    right: 0;
                    color: #8190a5;
                    font-size: 18px;
                    transform: translate(40%, -40%);
                }
            }
            .dropdown{
               width: 100%;
                // border: 1px solid #ededed;
                background: #fff;
                margin-top: 5px;
                padding: 5px 10px;
                border-radius: 4px;
                position: relative;
                top: 0;
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
                    }
                    .checked {
                        color: #184fd8;
                        background-color: #e8effd;
                    }
                }
                .finish-btn{
                    text-align: center;
                    margin: 20px 0;
                    .ivu-btn{
                        min-width: 130px;
                        margin: 0 15px;
                        color: #fff;
                        background-color: #4b7efe;
                        border: 0;
                    }
                }
            }
        }
        .label-div:first-child{
            border-right:2px solid #ededed
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
        .ivu-btn{
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
</style>