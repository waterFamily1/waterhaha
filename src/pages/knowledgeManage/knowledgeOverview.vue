<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="view-content">
            <div class="view-content-search">
                <div>
                    <Button v-for="(item,index) in tabList" :key="item.id" :class="{active:num==index}" @click="swiperChange(index)">{{ item }}</Button>  
                </div> 
                <div  class="search-box">
                    <Input v-model="keyword" placeholder="文档名称或文档标签" size="small"/>  
                    <Icon type="ios-search-outline" @click="search()" />   
                </div>
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
                        <button @click="finish()">完成</button>
                    </div>
                </div>
            </div>
            <div class="view-list" >
                <!-- <div v-for='(itemCon,index) in tabContent' :key="index" v-show="index == num"> -->
                    <div>
                    <div class="view-content-list">
                        <div class="view-content-list-item" v-for="(item,index) in mainList" :key="index">
                            <div class="view-content-icon">
                                <span class="icon-file icon-file-excel" v-if="item.type=='xls'"> </span>
                                <span class="icon-file icon-file-pic" v-else></span>
                            </div>
                            <div class="view-content-text">
                                <span title="">{{ item.name }}.{{item.type}}</span>
                                <span style="font-size: 12px;color: #bfc6d0;"></span>
                                <div class="view-content-labels clearfix">
                                    <span>{{ item.labelName }}</span>
                                </div>
                            </div>
                            <div class="view-content-btns">
                                <span class="view-content-date">{{item.createUserName}} / {{item.createDate}}</span>
                                <div class="">
                                    <span class="view-btn-download" @click="exportFile(item.id)">
                                        下载 <em>{{item.downloadCount}}</em>
                                    </span>
                                    <span class="view-btn-collect" @click="cancelCollect(item.id,index)" v-if="item.collect">
                                        取消
                                        <em>{{item.collectionCount}}</em>
                                    </span>
                                    <span class="view-btn-collect" @click="collect(item.id,index)" v-else>
                                        收藏
                                        <em>{{item.collectionCount}}</em>
                                    </span>
                                    <span class="view-btn-recommend" @click="recommend(item.type,item.name,item.id,index)">
                                        推荐 <em>{{item.recommendCount}}</em>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="view-side">
            <div class="view-side-box">
                <h3>知识统计</h3>
                <div class="detail">
                    <span class="view-side-num">
                       <label for="">文档总数：</label>
                       <em>{{statObj.total}}</em>
                    </span>
                    <span class="view-side-num">
                       <label for="">当月新增数：</label>
                       <em style="color:#00ae27">{{statObj.monthAddTotal}}</em>
                    </span>
                    <ul class="view-side-sta">
                        <li>
                            <label for="">上传文档最多用户</label>
                            <em>{{statObj.uploadMostUserName}}</em>
                        </li>
                        <li>
                            <label for="">下载次数最多文档</label>
                            <em>{{statObj.downloadMostDocumentName}}</em>
                        </li>
                        <li>
                            <label for="">收藏次数最多文档</label>
                            <em>{{statObj.collectionMostDocumentName}}</em>
                        </li>
                        <li>
                            <label for="">推荐次数最多文档</label>
                            <em>{{statObj.recommendMostDocumentName}}</em>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="view-side-box">
                <h3>我的知识</h3>
                <div class="detail">
                    <ul class="view-side-mine">
                        <li @click="gotoMine('name2')">
                           <i class="upload"></i>
                            <span>
                                <em>{{myKnowObj.uploadCount}}</em>
                                <label for="">我的上传</label>
                            </span>
                        </li>
                        <li @click="gotoMine('name1')">
                            <i class="download"></i>
                            <span>
                                 <em>{{myKnowObj.downloadCount}}</em>
                                <label for="">我的下载</label>
                            </span>
                        </li>
                        <li @click="gotoMine('name3')">
                            <i class="collection"></i>
                            <span>
                                <em>{{myKnowObj.collectionCount}}</em>
                                <label for="">我的收藏</label>                               
                            </span>
                        </li>
                        <li @click="gotoMine('name4')">
                            <i class="appreciate"></i>
                            <span>
                                <em>{{myKnowObj.recommendCount}}</em>
                                <label for="">推荐我的</label>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="view-side-box">
                <h3>最新上传</h3>
                <ul class="view-side-new">
                    <li v-for="(item,index) in newList" :key="index" @click="exportFile(item.id)">
                        <span style="width:180px" :title="item.name">{{ item.name }}</span>
                        <span style="width:70px">{{ item.createUserName }}</span>
                        <span style="width:70px">{{ item.createDate }}</span>
                    </li>
                </ul>
            </div>
        </div>
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
                                <TreeSelect v-model="tissue" :data="orgList" v-width="150" @on-change="changeArea"  />
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
    </div>
</template>
<script>
import { mainCon,orgMethod,newUpload,myKnow,knowStat,labelTree,collect,roles,recommend,mainContent} from '@api/knowledgeManage/overview';
import createTree from '@/libs/public-util'
import {formatTime} from '@/libs/public'
import util from '@/libs/public_js'
export default {
    name:'knowledgeOverview',
    data (){
        return {
            height:'',
            tabList:['推荐','最热','全部'],
            tabContent:[
                1,2,3
            ],
            num:0,
            keyword:'',
            dropdownShow:false,
            typeBox:[],
            produceBox:[],
            manageBox:[],
            
            type:1,
            page:1,
            myKnowObj:{},
            statObj:{},
            newList:[],
            mainList:[],
            orgList:[],
            modal:false,
            tissue:'',
            personId:[],
            userList:[],
            documentId:"",
            remark:'',
            index:0,
            formValidate:{
                tissue:''
            },
            ruleValidate:{
                tissue:[
                    { required: true, type: 'number', message: '请选择组织', trigger: 'change' }
                ] 
            },
            name:'',
            docuType:'',
            cateList:[],
            collId:'1'
        }
    },
    methods:{
        search(){
          this.getContent()
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
                        treeItem.push(trees[i])
                    }
                    this.cateList = createTree(treeItem, 0)
                }
           })
        },
        getRole(){
            roles(this.tissue).then(res=>{
                console.log(res)
                if(res.data.items){
                    this.userList = res.data.items
                }
                
            })
        },
        changeArea(name){
            this.getRole()
        },
        recommend(type,name,id,index){
            this.modal = true
            this.documentId = id
            this.index = index
            this.name = name
            this.docuType = type
        },
        modalSure(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                        let data = {
                        documentId: this.documentId,
                        orgId:this.tissue,
                        postscript: this.remark,
                        roleId: this.personId.length!=0?this.personId.join(','):'',
                    }
                    recommend(data).then(res=>{
                        if(res.data.count){
                        //   recommendCount
                            this.mainList[this.index].recommendCount ++
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
        collect(id,index){
            collect(id,1).then(res=>{
                if(res.data.count){
                    this.mainList[index].collect = true
                    this.mainList[index].collectionCount ++
                }
            })
           
        },
        cancelCollect(id,index){
            collect(id,2).then(res=>{
                if(res.data.count){
                     this.mainList[index].collect = false
                     this.mainList[index].collectionCount --
                }
            })
           
        },
        exportFile(id){
            const defaultParams = {
                 ids:id
                };
            util.download('/knowledge/api/documents/download', defaultParams)
        },
        knowStatics(){
            knowStat().then(res=>{
                console.log(res)
                if(res.data){
                    this.statObj = res.data
                }
            })
        },
        myKnowledge(){
            myKnow().then(res=>{
                console.log(res)
                if(res.data){
                    this.myKnowObj = res.data
                }
            })
        },
        newUp(){
            newUpload(this.page).then(res=>{
                console.log(res)
                if(res.data.items){
                    res.data.items.map(ele=>{
                        ele.createDate= formatTime(ele.createDate, 'yyyy-MM-dd')
                    })
                    this.newList= res.data.items
                }
            })
        },
        getContent(){
            let name = this.typeBox.length!=0?this.typeBox.join(','):''
            mainContent(this.num+1,this.page,this.keyword,name).then(res=>{
               if(res.data.items){
                    res.data.items.map(ele=>{
                        ele.createDate= formatTime(ele.createDate, 'yyyy-MM-dd')
                    })
                    this.mainList = res.data.items
                }
            })
        },
        getCon(){
            mainCon(this.num+1,this.page).then(res=>{
                console.log(res)
                if(res.data.items){
                    res.data.items.map(ele=>{
                        ele.createDate= formatTime(ele.createDate, 'yyyy-MM-dd')
                    })
                    this.mainList = res.data.items
                }
            })
        },
        swiperChange(index){
            this.num = index;
            if(index==2){
                this.dropdownShow=!this.dropdownShow
            }else{
                this.getCon()
            }
            
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
        
        finish(){
            console.log(this.typeBox)
            this.dropdownShow=false
            this.getContent()
        },
        gotoMine(params){
            this.$router.push({
                path:'/knowledge/personal',
                query: {
                    name:params
                }
            })
        },
    },
    mounted() {
        this.height = document.body.clientHeight-46
        this.getCon()
        this.newUp()
        this.myKnowledge()
        this.knowStatics()
        this.getOrg()
        this.getTree()
    },
}
</script>
<style lang="less" scoped>
.index-box{
    border-top: 5px solid #f0f0f0;
    display: flex;
    .view-content{
        position: relative;
        flex-grow: 1;
        margin-right: 5px;
        border-radius: 2px;
        background-color: #fff;
        height: 100%;
        .view-content-search{
            height: 40px;
            padding: 5px 10px;
            border-bottom: 1px solid #ededed;
            display: flex;
            justify-content: space-between;
            button{
                height: 25px;
                margin-right: 5px;
                font-size: 12px;
                border: 0;
                color: #fff;
                background: #c8c8c8;
            }
            .active{
                background: #4b7efe;
            }
            .search-box{
                width: 200px;
                position: relative;
                .ivu-icon{
                    position: absolute;
                    right: 0;
                    font-size: 18px;
                    top: 3px;
                }
            }
            .dropdown{
                position: absolute;
                top: 30px;
                left: 1%;
                width: 98%;
                border: 1px solid #ededed;
                background: #fff;
                z-index: 9;
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
        }
        .view-content-list-item{
            display: flex;
            padding: 15px 10px;
            line-height: 25px;
            border-bottom: 1px solid #ededed;
            .view-content-icon{
                flex-grow: 0;
                flex-shrink: 0;
                width: 50px;
                height: 50px;
                .icon-file{
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }
                .icon-file-excel{
                    background-image: url('../../assets/images/excel.png');
                }
                .icon-file-pic{
                    background-image: url('../../assets/images/pic.png');
                }
            }
            .view-content-text{
                flex-grow: 1;
                flex-shrink: 1;
                width: 0;
                margin: 0 20px;
                span{
                    display: block;
                    font-size: 16px;
                    color: #576374;
                }
                .view-content-labels{
                    span{
                        position: relative;
                        z-index: 1;
                        float: left;
                        padding: 0 10px;
                        margin: 5px 10px 5px 0;
                        height: 24px;
                        line-height: 24px;
                        list-style: none;
                        color: #8190a5;
                        border-radius: 4px;
                        background-color: #eef1f7;
                        font-size: 10px;
                        cursor: pointer;
                    }
                }
            }
            .view-content-btns{
                flex-grow: 0;
                flex-shrink: 0;
                align-self: flex-end;
                width: 340px;
                text-align: right;
                .view-content-date{
                    display: inline-block;
                    height: 25px;
                    line-height: 25px;
                    margin-bottom: 7px;
                    color: #838a95;
                }
                div{
                    span{
                        display: inline-block;
                        height: 30px;
                        margin-left: 10px;
                        line-height: 30px;
                        color: #838a95;
                        font-size: 12px;
                        cursor: pointer;
                        em{
                            font-style: normal;
                            font-size: 14px;
                            margin-left: 3px;
                        }
                    }
                    span::before{
                        display: inline-block;
                        content: "";
                        width: 24px;
                        height: 24px;
                        margin-right: 3px;
                        vertical-align: top;
                    }
                    .view-btn-collect{
                        em{
                            color:#72c0a6
                        }
                    }
                    .view-btn-recommend{
                        em{
                            color: #93ade6;
                        }
                    }
                    .view-btn-download{
                        em{
                            color: #d9a653;
                        }
                    }
                    .view-btn-download::before{
                        background: url('../../assets/images/download.png') center no-repeat;
                    }
                    .view-btn-collect::before{
                        background: url('../../assets/images/collect.png') center no-repeat;
                    }
                    .view-btn-recommend::before{
                        background: url('../../assets/images/recommand.png') center no-repeat;
                    }
                }
            }
        }
    }
    .view-side{
        flex-grow: 0;
        flex-shrink: 0;
        width: 350px;
        position: relative;
        z-index: 1;
        .view-side-box{
            position: relative;
            width: 100%;
            height: 33%;
            padding-top: 40px;
            margin-bottom: 5px;
            border-radius: 2px;
            background-color: #fff;
            h3{
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                padding-left: 10px;
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid #ededed;
                color: #333;
            }
            .detail{
                display: flex;
                flex-wrap: wrap;
                padding: 0 10px 10px 10px;
                height: 100%;
                .view-side-num{
                    display: inline-block;
                    width: 49%;
                    height: 40px;
                    line-height: 40px;
                    label{
                        font-size: 12px;
                        color: #838A95;
                    }
                    em{
                        font-style: normal;
                        font-size: 16px;
                        font-weight: 700;
                        color: #4b7efe;
                    }

                }
                .view-side-sta{
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    li{
                        width: 50%;
                        margin-bottom: 10px;
                        list-style: none;
                        label{
                            display: block;
                            height: 20px;
                            line-height: 20px;
                            font-size: 12px;
                        }
                        em{
                            display: block;
                            height: 30px;
                            line-height: 30px;
                            font-style: normal;
                            font-size: 14px;
                            color: #787878;
                            font-weight: 700;
                        }
                    }
                }
                .view-side-mine{
                    display: flex;
                    flex-wrap: wrap;
                    width: 100%;
                    align-items: center;
                    li{
                        width: 50%;
                        margin-bottom: 5px;
                        margin-top: 5px;
                        text-align: center;
                        list-style: none;
                        cursor: pointer;
                        i{
                            display: inline-block;
                            width: 50px;
                            height: 50px;
                            margin-right: 10px;
                            font-size: 50px;
                            vertical-align: bottom;
                        }
                        .upload{
                            background: url('../../assets/images/upload.png') center no-repeat;
                        }
                        .download{
                            background: url('../../assets/images/download.png') center no-repeat;
                        }
                        .collection{
                            background: url('../../assets/images/collection.png') center no-repeat;
                        }
                        .appreciate{
                            background: url('../../assets/images/appreciate.png') center no-repeat;
                        }
                        span{
                            display: inline-block;
                             text-align: left;
                            label{
                                display: block;
                                height: 20px;
                                line-height: 20px;
                                font-size: 12px;
                                cursor: pointer;
                            }
                            em{
                                height: 30px;
                                line-height: 30px;
                                font-style: normal;
                                font-size: 16px;
                                font-weight: 700;
                                color: #4b7efe;
                            }
                        }
                    }
                }
            }
            .view-side-new{
                line-height: 30px;
                padding: 0 10px 10px 10px;
                li{
                    display: flex;
                    height: 30px;
                    font-size: 12px;
                    border-bottom: 1px dotted #e6e6e6;
                    span{
                        display: inline-block;
                    }
                }
            }
        }
    }
}
/deep/.ivu-collapse > .ivu-collapse-item > .ivu-collapse-header{
    color: #4b7efe;
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
</style>