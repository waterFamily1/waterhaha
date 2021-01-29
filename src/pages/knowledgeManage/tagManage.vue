<template>
    <div class="document-box" :style="{height: height+'px'}">
        <div class="c-tree-left">
            <div class="c-plain-bg-h">
                <h3>标签中心</h3>  
            </div>
            <div class="serach-box">
                <Input v-model="value" placeholder="输入标签名称以检索" style="width: 100%" @on-change="search" />
                 <ul class="search-list" v-if="isSeachdata">
                        <div style="color:#bbbec4;font-size:13px;text-align:center"  v-if="searchList.length==0">无匹配数据</div>
                        <li v-for="(item,index) in searchList" :key="index" @click="chooseLabel(index)" v-else>{{ item.name }}</li>
                    </ul>
            </div>
            <div class="z-tree">
                <Tree :data="data1" :render="renderContent" @on-select-change="selectNode"></Tree>
            </div>
        </div>
        <div class="c-tree-right">
            <div class="c-main-border">
                <div class="c-left-border-blue">
                    <div class="c-plain-bg-h">
                        <h3>标签信息</h3>  
                    </div>
                    <div class="action-btn" v-if="appear">
                        <Button @click="save()">保存</Button>
                        <Button class="reset">取消</Button>
                    </div>
                </div>
                <div class="base-org-detail" >
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
                        <div class="form-line" v-if="tagAppear">
                            <h4>当前标签</h4>
                            <FormItem label="" label-position="top" prop="tag" v-if="isEdit">
                                <Input v-model="formValidate.tag" style="width:300px"></Input>
                            </FormItem>
                            <div class="base-org-border" v-else> 
                               <span>{{formValidate.tag}}</span>
                            </div>
                        </div>
                        <div class="form-line" v-if="cateAppear">
                            <h4>当前类别</h4>
                            <FormItem label="" label-position="top" prop="category"  v-if="disAppear">
                                <Input v-model="formValidate.category" style="width:300px"></Input>
                            </FormItem>
                            <div class="base-org-border" v-else> 
                                <Input v-model="formValidate.category"  style="width: 300px" disabled v-if="show" />
                                <span v-else>{{ formValidate.category }}</span>
                            </div>
                        </div>
                    </Form>
               </div>
            </div>
        </div>
    </div>
</template>
<script>
// labelTree
import { labelTree,createLabel,deleteLabel,editLabel,searchWord} from '@api/knowledgeManage/tag';
import createTree from '@/libs/public-util'
import {formatTime} from '@/libs/public'
export default {
    name:'tagManage',
    data (){
        return {
            formValidate: {
                category:'',
                tag:''
            },
            ruleValidate:{
                category: [
                    { required: true, message: '请选择类型', trigger: 'blur' }
                ],
                tag: [
                    {required: true, message: '请输入名称', trigger: 'blur'}
                ]
            },
            height:'',
            value:'',
            tableList: [
                {
                    type: 'selection',
                    width: 50,
                    align: 'center'
                },
                {
                    title: '文档名称',
                    key: 'name'
                },
                {
                    title: '文档路径',
                    key: 'path'
                },
                {
                    title: '文档标签',
                    key: 'tags'
                },
                {
                    title: '文档大小',
                    key: 'small'
                },
                {
                    title: '上传人员',
                    key: 'person'
                },
                {
                    title: '上传时间',
                    key: 'time'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            data1: [{
                title: '全部',
                expand: true,
                render: (h, { root, node, data }) => {
                    return h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%'
                        },
                        on: {
                            'mouseenter': () => {
                                data.is_show = true
                            },
                            'mouseleave': () => {
                                data.is_show = false
                            }
                        }
                    }, [
                        h('span', [
                            h('span', data.title),
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
                                    display: data.is_show ? 'block' : 'none',
                                    fontSize:'12px'
                                },
                                on: {
                                    click: (e) => { 
                                        e.stopPropagation()
                                        this.newCate(data)
                                    }
                                }
                            },'新增')
                        ])
                    ]);
                },
                children:[]
            }],
            appear:false,
            tagAppear:false,
            cateAppear:false,
            currentNode:{},
            disAppear:false,
            isEdit:true,
            editStatus:false,
            editCate:true,
            searchList:[],
            treeItem:[],
            isSeachdata:false,
            show:false
        }
    },

    methods:{
        chooseLabel(index){
            let current = this.searchList[index]
            this.isSeachdata = false
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
                     treeItem.map(ele=>{
                        if(ele.id == current.id){
                            console.log(ele)
                            ele.selected = true
                        }else{
                            ele.selected = false
                        }
                    })
                    this.data1[0].children = createTree(treeItem, 0)
                    this.tagAppear = true
                    this.isEdit = false
                    this.cateAppear = true
                    this.disAppear= false
                    this.show = false
                    this.formValidate.tag = current.name
                    this.formValidate.category = current.parentName
                }
           })
        },
        search(e){
            if(this.value){
                this.isSeachdata=true
                searchWord(this.value).then(res=>{
                    console.log(res)
                    if(res.data){
                        this.searchList = res.data
                    }
                   
                })
            }else{
                this.isSeachdata = false
            }
          
        },
        selectNode(node){
            console.log(node)
            if(node[0].title != '全部'){
                if(node[0].parentId==0){
                    this.cateAppear = true
                    this.disAppear = false
                    this.show = false
                    this.formValidate.category = node[0].title
                }else{
                    this.cateAppear = true
                    this.tagAppear = true
                    this.disAppear = false
                    this.show = false
                    this.isEdit = false
                    this.formValidate.tag = node[0].title
                    this.formValidate.category = node[0].parentName
                }
            }
            
        },
        newCate(node){
           console.log(node)
           this.currentNode = node
           this.cateAppear = true
           this.disAppear = true
           this.appear = true
           this.tagAppear = false
           this.formValidate.tag=""
           this.formValidate.category = ""
           this.show = true
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
                    this.data1[0].children = createTree(treeItem, 0)
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
                    h('span', data.title)
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
                            display:data.parentId!=0?'none':( data.is_show ? 'inline-block' : 'none'),
                             fontSize:'12px'
                        },
                        on: {
                            click: (e) => { 
                                 e.stopPropagation()
                                this.append(data) 
                            }
                        }
                    },'新建'),
                    h('Button', {
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
                             }
                        }
                    },'编辑'),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size:'small'
                        }),
                        style: {
                            display: data.is_show ? 'inline-block' : 'none',
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
        append (data) {
           console.log(data)
           this.currentNode = data
           this.tagAppear = true
           this.cateAppear = true
            this.disAppear = false
           this.formValidate.category = data.title
           this.appear = true
           this.formValidate.tag=""
           this.show = true
        },
        remove (data) {
           console.log(data)
           this.$Modal.confirm({
                title: '提示',
                content: '<p>你确定要删除吗？</p>',
                onOk: () => {
                    deleteLabel(Number(data.id)).then(res=>{
                        if(res.data.count){
                            this.$Message.success('删除成功');
                            this.getTree()
                            
                        }
                    })
                },
                onCancel: () => {
                    
                }
            });
        },
        editFun(data) {
            console.log(data)
            this.currentNode = data
            if(data.parentId==0){
                this.editCate = true
                this.formValidate.category = data.title
                this.cateAppear = true
                this.disAppear = true
                this.tagAppear = false
            }else{
                this.editCate = false
                this.formValidate.category = data.parentName
                this.formValidate.tag = data.title
                this.cateAppear = true
                this.isEdit = true
                this.disAppear = false
                this.tagAppear = true
                this.show = true
            }
            let self = this
            self.appear = true
            this.editStatus = true
        },
        save(){
            if(!this.editStatus){
                if(this.currentNode.title == '全部'){
                    // 新建类别
                    let data = {
                        name: this.formValidate.category,
                        parentId: 0,
                        parentName: "",
                        tenantId: 11,
                        type: 1,
                    }
                    createLabel(data).then(res=>{
                        console.log(res)
                        if(res.data.id){
                            this.$Message.success('新建成功！');
                            this.getTree()
                            this.appear = false
                        }
                    })
                }else{
                    console.log(this.currentNode)
                    // 新建标签
                    let data={
                        name: this.formValidate.tag,
                        parentId: this.currentNode.id,
                        parentName: this.currentNode.name,
                        tenantId: this.currentNode.tenantId,
                        type: 2,
                    }
                    createLabel(data).then(res=>{
                        console.log(res)
                        if(res.data.id){
                            this.$Message.success('新建成功！');
                            this.getTree()
                            this.appear = false
                            this.isEdit = false
                        }
                    })
                }
            }else{
                // 编辑类别
                if(this.editCate){
                    
                    let data = {
                        id: this.currentNode.id,
                        name: this.formValidate.category,
                        parentId: this.currentNode.parentId,
                        parentName: "",
                        tenantId: this.currentNode.tenantId,
                        type: 1
                    }
                    editLabel(data).then(res=>{
                        if(res.data.count){
                            this.$Message.success('编辑成功！');
                            this.getTree()
                            this.appear = false
                        }
                    })
                }
                // 编辑标签
                else{
                    console.log(this.currentNode)
                    let data = {
                        id: this.currentNode.id,
                        name: this.formValidate.tag,
                        parentId: this.currentNode.parentId,
                        parentName: this.currentNode.parentName,
                        tenantId: this.currentNode.tenantId,
                        type: 2,
                    }
                    editLabel(data).then(res=>{
                        if(res.data.count){
                            this.$Message.success('编辑成功！');
                            this.getTree()
                            this.appear = false
                             this.isEdit = false
                        }
                    })
                }
                
            }
           
            
            
        }
    },
     mounted() {
        this.height = document.body.clientHeight-46
        this.getTree()
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
        .z-tree{
            padding-left: 10px;
            /deep/.ivu-icon{
                color: #4b7efe;
            }
            /deep/.ivu-tree-title{
                width: 93%;
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
            .c-left-border-blue{
                border-radius: 3px;
                height: 50px;
                font-size: 13px;
                border-bottom: 1px solid #f0f0f0;
                display: flex;
                justify-content: space-between;
                align-items:  center;
               .c-plain-bg-h{
                    
                    height: 50px;
                    padding: 10px 0 10px 10px;
                    display: inline-block;
                    h3{
                        font-size: 14px;
                    } 
                }
                .action-btn{
                    .ivu-btn {
                        height: auto;
                        background: #4b7efe;
                        font-size: 12px;
                        padding: 4px 12px;
                        color: #fff;
                        border: 0;
                        border-radius: 3px;
                        margin: 0 5px;
                        min-width: 70px;
                    }
                    .reset{
                        background: #c8c8c8;
                    }
                }
            }
            .base-org-detail{
                padding: 20px 50px;
                .form-line{
                    margin-bottom: 20px;
                    h4{
                        height: 30px;
                        margin-top: 10px;
                        font-size: 13px;
                    }
                    .base-org-border{
                        border-bottom: 1px dashed #f0f0f0;
                        padding-bottom: 10px;
                    }
                }
            }
        }
    }
}
</style>