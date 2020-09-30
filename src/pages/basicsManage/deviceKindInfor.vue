<template>
    <div class="tissue-box" :style="{height: height+'px'}">
        <div class="tissue-tree">
            <div class="tissue-left">
                <div class="tissue-title">
                    <h3>设备类型</h3>
                    <button class="btn">导入设备类型</button>
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
                        <button @click="cancel()" style="background:#c8c8c8">取消</button>
                        <button type="primary" style="background:#4b7efe" @click="save('tissueList')"> 保存</button>
                    </span>
                </div>
                <div class="tissue-content">
                    <Form :model="tissueList" ref="tissueList" :rules="ruleValidate" label-position="right"  autocomplete="off">
                        <div class="form-li">
                            <h4>所属组织</h4>
                            <div style="min-height:40px">{{currentOrg.name}}</div>
                        </div>
                        <div class="form-li">
                            <div  v-if="appear">
                                <h4>设备类型名称</h4>
                                <div  style="min-height:40px">{{currentEqu.name}}</div>
                            </div>
                            <FormItem label="设备类型名称" label-position="top" prop="devicename" v-else>
                                <Input v-model="tissueList.devicename" ></Input>
                            </FormItem>
                        </div>
                        <div class="form-li">
                            <div  v-if="appear">
                                <h4>备注</h4>
                                <div style="min-height:40px">{{currentEqu.remarks}}</div>
                            </div>
                            <FormItem label="备注" label-position="top" v-else>
                                <Input v-model="tissueList.remark" ></Input>
                            </FormItem>
                        </div>
                        <div class="form-li" style="border:0">
                            <h4>默认图片</h4>
                            <div v-if="!appear" >
                                <img src="../../assets/images/default.png" alt="" style="max-width:400px">
                           </div>
                            <Upload   action=""
                                :format="['jpg','jpeg','png']"
                                :before-upload="handleUploadicon"
                                :on-format-error="uploadError"
                                accept=".jpg , .png, .jpeg"
                                ref="upload">
                                <button style="background:#576374;border:0;padding:4px 12px;color:#fff;outline:0;border-radius:3px" >上传图片</button>
                            </Upload> 
                         
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getOrg ,getEqu , saveEqu, deleteEqu,createEqu,searchEqu} from '@api/basic/equ';
import createTree from '@/libs/public-util'
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
            appearOther: false,
            listshow: true,
            equList:[],
            idx:0,
            height: 0,
            ruleValidate:{
                devicename: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ], 
            },
            isChooseequ:false,
            kword:'',
            searchList:[],
            isSeachdata:false,
            orgBaseData:[],
            equBaseData:[]
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getOrg()
    },
    methods: {
        getOrg(){
           getOrg(3).then(res=>{ 
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    treeItem.push(trees[i])
                }
                this.orgBaseData=treeItem
                this.baseData= createTree(treeItem)
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
                            treeItem.push(trees[i])
                            if(trees[i].id == this.searchList[index].id){
                                trees[i].selected = true
                            }
                        }
                        this.equBaseData=treeItem
                        this.equList=this.drawTree(treeItem)
                    }
                    
                })
            this.orgBaseData.forEach(element => {
                if(element.id==this.currentEqu.orgId){
                    element.selected = true
                    this.currentOrg= element
                }
            });
            console.log(JSON.stringify(this.baseData))
           this.checkParent(this.currentEqu.orgId,this.baseData)
           console.log(this.baseData)
        },
        // checkParent(id,arr){
        //    arr.forEach(element => {
        //        console.log(element)
        //        if(element.id ==id) {
                  
        //        }else{
        //            this.checkParent(id,element.children)
        //        }
        //    });
        //    console.log(arr)
        // },
        aaav(a,da,array,id){
            for (let i = 0; i < array.length; i++) {
                if(array[i].id==id){
                    console.log(a)
                    console.log(da)
                    da.expand=true
                }else{
                    if(array[i].children && array[i].children.length>0){
                        this.aaav(a,array[i],array[i].children,id)
                    }
                }
            }

        },


        checkParent(id,treeItem){
            console.log(treeItem)
            for(var i=0;i<treeItem.length;i++) {
                if(treeItem[i].id==35){
                    console.log(treeItem[i])
                }else if(treeItem[i].children && treeItem[i].children.length>0){
                   this.aaav(treeItem[i],treeItem[i].children,treeItem[i].children,id)

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
                    'mouseenter': () => {
                        // console.log(data)
                        data.is_show = true;
                    },
                    //鼠标离开
                    'mouseleave': () => {
                        // console.log('33')
                        data.is_show = false;
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
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            click: (e) => {
                                e.stopPropagation()
                                this.newFun(root, node, data) 
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
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            click: (e) => { 
                                e.stopPropagation()
                                this.edit(data) 
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
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            click: (e) => { 
                                 e.stopPropagation()
                                this.create(root, node, data) 
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
                    this.equList=this.drawTree(treeItem)
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
            console.log(item)
            this.currentOrg=item[0]
            this.getCurrentequ(item[0].id)
            this.currentEqu={}
            this.appear= true
        },
        selectEquNode(node){
           this.isChooseequ=true
           this.currentEqu = node[0]
           this.appear= true
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
        newFun() {
            let self = this
            self.appear = false
            
            this.currentEqu={}
        },
        cancel() {
            let self = this
            self.appear = false
            self.appearOther = true  
        },
        edit(data){
           this.appear= false
           this.tissueList.devicename = this.currentEqu.name
           this.tissueList.remark = this.currentEqu.remarks
        },
        create(data){
            this.appear= false
            this.isChooseequ = false
            this.currentEqu={}
        },
        save(name){
             this.$refs[name].validate((valid) => {
                if (valid) {
                    
                    if(this.isChooseequ){
                       this.saveEqu()
                    }else{
                       this.createEqu()
                    }
                  
                } else {
                    
                }
            })
        },
        saveEqu(){
            this.currentEqu.name= this.tissueList.devicename 
            this.currentEqu.title= this.tissueList.devicename 
            this.currentEqu.remarks = this.tissueList.remark
            saveEqu(this.currentEqu).then(res=>{
                if(res.data.id){
                    this.$Message.success('编辑成功');
                    this.getCurrentequ(this.currentOrg.id)
                    this.appear= true
                    this.currentEqu.name = this.tissueList.devicename
                    this.currentEqu.remarks = this.tissueList.remark
                }
            })
        },
        createEqu(){
            let data={
                id: "",
                imageUrl: "",
                name: this.tissueList.devicename ,
                orgId: this.currentOrg.id,
                orgName: this.currentOrg.name,
                parentId: 0,
                remarks: this.tissueList.remark
            }
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
        uploadError(file){
            console.log(file)
        },
        handleUploadicon(file) {
            let formData = new FormData()
            formData.append('file', file)
            uploadFun(formData).then(res=> {
                // console.log(res)
                this.areaList.imageUrl = res.data.fullPath
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
            button{
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
                        
                        button{
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