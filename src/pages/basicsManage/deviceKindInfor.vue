<template>
    <div class="tissue-box" :style="{height: height+'px'}">
        <div class="tissue-tree">
            <div class="tissue-left">
                <div class="tissue-title">
                    <h3>设备类型</h3>
                    <Button class="btn" @click="importType">导入设备类型</Button>
                </div>
                <div class="search-input">
                    <Input v-model="kword" placeholder="输入设备类型以检索" @on-change="search" />
                    <ul class="search-list" v-if="isSeachdata">
                        <div style="color:#bbbec4;font-size:13px;text-align:center"  v-if="searchList.length==0">无匹配数据</div>
                        <li v-for="(item,index) in searchList" :key="index" @click="chooseEqu(index)" v-else>{{ item.name }}</li>
                    </ul>
                </div>
                <div class="title-main" :style="{height: (height-73)+'px'}">
                    <div class="org-tree">
                         <Tree :data="baseData" :render="renderContent" class="demo-tree-render" @on-select-change="selectNode"></Tree>
                    </div>
                    <div class="mg-drag-tree">
                        <div style="text-align:center;margin:30px auto" v-if="listshow">暂无数据</div>
                       <Tree :data="equList" :render="renderContentEqu" class="demo-tree-render" @on-select-change="selectEquNode" v-else></Tree>
                        
                    </div>
                </div>
            </div>
            <div class="tissue-right">
                <div class="tissue-title">
                    <h3>设备类型信息</h3> 
                    <span v-if="!appear">
                        <Button @click="cancel()" style="background:#c8c8c8">取消</Button>
                        <Button type="primary" style="background:#4b7efe" @click="save('tissueList')"> 保存</Button>
                    </span>
                </div>
                <div class="tissue-content">
                    <Form :model="tissueList" ref="tissueList" :rules="ruleValidate" label-position="right"  autocomplete="off">
                        <div class="form-li">
                            <h4>所属组织</h4>
                            <div style="min-height:40px">{{currentOrg.name}}</div>
                        </div>
                        <div class="form-li">
                            <div v-if="appear">
                                <h4>设备类型名称</h4>
                                <div style="min-height:40px">{{isCancel?tissueList.devicename:currentEqu.name}}</div>
                            </div>
                            <FormItem label="设备类型名称" label-position="top" prop="devicename" v-else>
                                <Input v-model="tissueList.devicename" ></Input>
                            </FormItem>
                        </div>
                        <div class="form-li">
                            <div v-if="appear">
                                <h4>备注</h4>
                                <div style="min-height:40px">{{isCancel?tissueList.remark:currentEqu.remarks}}</div>
                            </div>
                            <FormItem label="备注" label-position="top" v-else>
                                <Input v-model="tissueList.remark" ></Input>
                            </FormItem>
                        </div>
                        <div class="form-li" style="border:0">
                            <h4>默认图片</h4>
                            <div  >
                                <img src="../../assets/images/default.png" alt="" style="width:130px;height:150px" v-if="!imgPath">
                                <img :src="imgPath" alt="" style="max-width:400px" v-else>
                           </div>
                            <Upload   
                                action=""
                                :format="['jpg','jpeg','png']"
                                :before-upload="handleUploadicon"
                                :on-format-error="uploadError"
                                accept=".jpg , .png, .jpeg"
                                ref="upload">
                                <Button style="background:#576374;border:0;padding:4px 12px;color:#fff;outline:0;border-radius:3px" v-if="showUpload">上传图片</Button>
                            </Upload> 
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getOrg ,getEqu , saveEqu, deleteEqu,createEqu,searchEqu,uploadImg} from '@api/basic/equ';
import createTree from '@/libs/public-util'
import { typeTreeMethod1 } from '@/libs/public'
export default {
    name: 'tissueInfor',
    data () {
        return {
            currentOrg:{},
            currentEqu:{},
            baseData: [],
            buttonProps: {
                type: 'default',
                size: 'small'
            },
            tissueList: {
                devicename:'',
                remark:''
            },
            appear: true,
            listshow: true,
            equList:[],
            idx:0,
            height: 0,
            ruleValidate:{
                devicename: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ]
            },
            isChooseequ:false,
            kword:'',
            searchList:[],
            isSeachdata:false,
            orgBaseData:[],
            equBaseData:[],
            imgPath:'',
            isCancel:false,
            equNew:false,
            levelObj:{},
            showUpload: false
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getOrg()
    },
    methods: {
        importType() {
            this.$router.push({
                path:'/other/areaUpload',
                query: {
                    uploadName: '设备类型导入'
                }
            })
        },
        getOrg(){
           getOrg(3).then(res=>{ 
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].expand = true
                    treeItem.push(trees[i])
                }
                this.orgBaseData=treeItem
                this.baseData= createTree(treeItem,0)
           })
        },
        search(e){
            if(this.kword){
                this.isSeachdata=true
                searchEqu(this.kword).then(res=>{
                    if(res.data.total==0){
                        this.searchList = res.data.items   
                    }else{
                        this.searchList = res.data.items
                    }
                })
            }else{
                this.isSeachdata = false
            }
         
        },
        chooseEqu(index){
            this.currentEqu = this.searchList[index]
            this.isSeachdata = false
            getEqu(this.currentEqu.orgId).then(res=>{
                    if(res.data.total==0){
                        this.listshow = true
                    }else{
                        this.listshow = false
                        let treeItem = []
                        let trees = res.data.items
                        for(let i = 0; i < trees.length; i ++) {
                            trees[i].title = trees[i].name
                            if(trees[i].id == this.searchList[index].id){
                                trees[i].selected = true
                            }
                            trees[i].expand =true
                             treeItem.push(trees[i])
                        }
                       
                        this.equBaseData=treeItem
                        // this.equList=this.drawTree(treeItem)
                        this.equList = typeTreeMethod1(treeItem, 0)
                    }
                })
            this.orgBaseData.forEach(element => {
                if(element.id==this.currentEqu.orgId){
                    element.selected = true
                    this.currentOrg= element
                }
            });
        //     console.log(JSON.stringify(this.baseData))
        //    this.checkParent(this.currentEqu.orgId,this.orgBaseData)
        //    console.log(this.baseData)
        },
        checkParent(id,arr){
            for (let i = 0; i < arr.length; i++) {
                if(arr[i].id ==id) {
                    let parentId=arr[i].parentId
                    this.aaavs(parentId,arr)
                }
            }

            console.log(arr)
        },
        aaavs(parentId,arr){
            for (let i = 0; i < arr.length; i++) {
                if(arr[i].id ==parentId) {
                    console.log(arr[i])
                    arr[i].expand = true
                    if(arr[i].parentId!=0){
                        this.aaavs(arr[i].parentId,arr)
                    }
                }
            }
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
                            size: 'small'
                        }),
                        style: {
                            fontSize: '12px',
                            height: '18px',
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            click: (e) => {
                                e.stopPropagation()
                                this.newFun(root, node, data) 
                                this.showUpload = true
                            }
                        }
                    },'新建')
                ])
            ]);
        },
        renderContentEqu (h, { root, node, data }) {
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
                            size: 'small'
                        }),
                        style: {
                            marginRight:"5px",
                           fontSize: '12px',
                           height: '18px',
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            click: (e) => { 
                                e.stopPropagation()
                                this.edit(data) 
                                this.showUpload = true
                            }
                        }
                    },'编辑'),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size: 'small'
                        }),
                        style: {
                            marginRight:"5px",
                            fontSize: '12px',
                            height: '18px',
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            click: (e) => { 
                                e.stopPropagation()
                                this.remove(root, node, data) 
                            }
                        }
                    },'删除'),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size: 'small'
                        }),
                        style: {
                            fontSize: '12px',
                            height: '18px',
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            click: (e) => { 
                                // console.log("新建设备")
                                 e.stopPropagation()
                                this.create(root, node, data) 
                                this.showUpload = true
                            }
                        }
                    },'新建')
                ])
            ]);
        },
        // 获取设备
        getCurrentequ(id){
            getEqu(id).then(res=>{
                if(res.data.total==0){
                    this.listshow = true
                }else{
                    this.listshow = false
                    let treeItem = []
                    let trees = res.data.items
                    
                    for(let i = 0; i < trees.length; i ++) {
                        trees[i].title = trees[i].name
                        treeItem.push(trees[i])
                    }
                    this.equBaseData=treeItem
                    // this.equList=this.drawTree(treeItem)
                    this.equList = typeTreeMethod1(treeItem, 0)
                }
                
            })
        },
        drawTree(treeItem){
            let  parent=treeItem.filter(item => item.parentId == 0)
            treeItem.forEach(element => {
                 if (element.parentId == 0) return
                 this.draw(element,parent)
            });
            return parent;
        },
        draw(item,arr){
            for(var i=0;i<arr.length;i++) {
                if(item.parentId==arr[i].id){
                    arr[i].children = []
                    arr[i].children.push(item)
                }else if(arr[i].children && arr[i].children.length>0){
                    this.draw(item,arr[i].children)
                }
            }
        },
        selectNode(item){
            // console.log(item)
            this.currentOrg=item[0]
            this.getCurrentequ(item[0].id)
            this.currentEqu={}
            this.appear= true
            this.imgPath=""
            this.tissueList.devicename = ''
            this.tissueList.remark = ''
            this.equNew = false
        },
        selectEquNode(node){
           this.isChooseequ=true
           this.currentEqu = node[0]
           this.appear= true
           this.imgPath=""
           this.levelObj = node[0]
           this.equNew = true
           this.showUpload = false
        },
        append (data) {
            const children = data.children || [];
            children.push({
                title: 'appended node',
                expand: true
            });
            this.$set(data, 'children', children);
        },
        // 删除设备
        remove (root, node, data) {
            this.$Modal.confirm({
                title: '提示',
                content: '<p>你确定要删除吗？</p>',
                onOk: () => {
                    this.listshow = false
                    deleteEqu(Number(data.id)).then(res=>{
                        if(res.data.count){
                            this.$Message.success('删除成功');
                            this.getCurrentequ(this.currentOrg.id)
                            
                        }
                    })
                },
                onCancel: () => {
                    
                }
            });
            
        },
        newFun(oot, node, data) {
            console.log(data)
            let self = this
            self.appear = false
            this.currentOrg= data
            this.imgPath=""
        },
        cancel() {
            let self = this
            self.appear = true
            self.isCancel=true
            this.imgPath=""
            this.showUpload = false
        },
        edit(data){
            console.log(data)
            this.currentEqu = data
           this.appear= false
           this.tissueList.devicename = this.currentEqu.name
           this.tissueList.remark = this.currentEqu.remarks
           this.imgPath=""
        },
        create(data){
            this.equNew = true
            this.appear= false
            this.isChooeequ = false
            this.currentEqu={}
            this.imgPath=""
            this.tissueList.devicename = ''
            this.tissueList.remark = ''
        },
        save(name){
             this.$refs[name].validate((valid) => {
                if (valid) {
                    if(this.isChooseequ){
                        console.log("bianji")
                       this.saveEqu()
                       this.showUpload = false
                    } else {
                       this.createEquipment()
                    }  
                }
            })
        },
        saveEqu(){
            // this.currentEqu.name= this.tissueList.devicename 
            // this.currentEqu.title= this.tissueList.devicename 
            // this.currentEqu.remarks = this.tissueList.remark
            // this.currentEqu.imageUrl = this.imgPath
            console.log(this.currentEqu)
            let data = {
                children: [],
                equCount: null,
                id: this.currentEqu.id,
                imageUrl: this.imgPath,
                name: this.tissueList.devicename ,
                nodeKey: this.currentEqu.nodeKey,
                orgId: this.currentEqu.orgId,
                parentId: this.currentEqu.parentId,
                remarks: this.tissueList.remark,
                seqOrder: null,
                state: this.currentEqu.state,
                tenantId: this.currentEqu.tenantId,
                title: this.tissueList.devicename ,
                type: null,
                version: this.currentEqu.version
            }
            saveEqu(data).then(res=>{
                if(res.data.id){
                    this.$Message.success('编辑成功');
                    this.getCurrentequ(this.currentOrg.id)
                    this.appear= true
                    this.currentEqu.name = this.tissueList.devicename
                    this.currentEqu.remarks = this.tissueList.remark
                }
            })
        },
        createEquipment(){
            // console.log("新建新建======")
            // console.log(this.levelObj)
            
            let data={
                id: "",
                imageUrl: this.imageUrl,
                name: this.tissueList.devicename ,
                orgId: this.currentOrg.id,
                orgName: this.currentOrg.name,
                parentId: this.equNew?this.levelObj.id:0,
                remarks: this.tissueList.remark
            }
            console.log(data)
            createEqu(data).then(res=>{
                if(res.data.id){
                    this.$Message.success('编辑成功');
                    this.getCurrentequ(this.currentOrg.id)
                    this.appear= true
                    this.currentEqu.name = this.tissueList.devicename
                    this.currentEqu.remarks = this.tissueList.remark
                }
            })
        },
        uploadError(){
            // console.log(file)
        },
        handleUploadicon(file) {
            // console.log(file)
            let formData = new FormData()
            formData.append('file', file)
            uploadImg(formData).then(res=> {
                // console.log(res)
                this.imgPath = res.data.fullPath
            }).catch(err => {
                // 异常情况
            })
        },
    }
}
</script>
<style lang="less" scoped>
.tissue-box {
    margin-top: 5px;
    .tissue-tree {
        display: flex;
        min-height: 100%;
        height: 100%;
        .tissue-title {
            border-bottom: 1px solid #f0f0f0;
            padding: 10px 0;
            text-indent: 10px;
            color: #495060;
            h3 {
                display: inline;
                font-size: 14px;
            }
            span {
                display: inline;
                float: right;
            }
            .ivu-btn {
                height: auto;
                padding:3px 15px;
                background: #576374;
                border: 0;
                float:right;
                color: #fff;
                font-size: 12px;
                margin: 0 5px;
                border-radius: 3px;
            }
        }
        .search-input{  
            padding: 2px;
            border-bottom: 1px solid #f0f0f0;
            position: relative;
            z-index: 10;
            input{
                width: 100%;
                border: 1px solid #eaeaea;
                padding: 0 24px 0 8px;
                color: #495060;
                font-size: 13px;
                 height: 28px;
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
        .title-main{
            padding-left: 10px;
            position: relative;
            z-index: 1;
            .org-tree{
                height: 33%;
                border-bottom: 1px solid #f0f0f0;
                padding-right:20px;
                overflow-y: scroll;
                li{
                    margin: 8px 0;
                }
            }
            .mg-drag-tree{
                height: 67%;
                overflow: hidden;
                padding-right:20px;
                li{
                    display: flex;
                    justify-content: space-between;
                    .c-tree-btn{
                        display: inline-block;
                        text-align: right;
                        
                        .ivu-btn {
                            height: auto;
                            background: #6f98fe;
                            color: #fff;
                            font-size: 12px;
                            outline: 0;
                            border: 0;
                            padding:0 5px;
                        }
                    }
                }
               
            }
            /deep/.ivu-tree-title {
                    width: 100%;
            }
            // /deep/.ivu-tree-arrow{
            //     width: 0;
            //     display: none;
            // }
        }
        .tissue-left {
            width: 350px;
            background: #FFF;
            height: 100%;
            .tissue-list {
                width: 100%;
                padding: 0 10px;
                
            }
        }
        .tissue-right {
            flex: 1;
            min-height: 100%;
            height: 100%;
            width: 100%;
            background: #FFF;
            border-left: 5px solid #f5f7f9;
            border-right: 5px solid #f5f7f9;
            .tissue-content {
                padding: 20px 50px;
                /deep/.ivu-input {
                    width: 300px;
                }
                /deep/.ivu-form .ivu-form-item-label {
                    padding-right: 0;
                    font-size: 13px;
                    font-weight: bold;
                }
                .form-li {
                    border-bottom: 1px dashed #f0f0f0;
                    font-size: 13px;
                    h4 {
                        height: 40px;
                        margin-top: 20px;
                    }
                    /deep/.ivu-form-item {
                        margin-bottom: 14px;
                    }
                    
                }
                .form-box {
                    .form-title {
                        background-color: #f4f4f4;
                        height: 30px;
                        line-height: 30px;
                        text-indent: 20px;
                        font-weight: 100;
                        font-size: 13px;
                        margin: 10px 0px;
                    }
                }
                .form-other {
                    .other-li {
                        display: flex;
                        font-size: 13px;
                        line-height: 30px;
                        span:nth-of-type(1) {
                            width: 70px;
                            text-align: right;
                        }
                    }
                }
            }
        }
    }
    /deep/.ivu-row {
        margin: 0!important;
        /deep/.ivu-col{
            background: #fff;
            padding: 0!important;
        }
        /deep/.ivu-col-span-xl-6 {
            width: 24%;
            margin-right: 1%;
        }
    }
}
</style>