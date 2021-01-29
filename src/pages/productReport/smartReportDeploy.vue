<template>
    <div class="smart-box" :style="{height: height+'px'}">
        <div class="smart-main">
            <div class="smart-left">
                <div class="left-box">
                    <AutoComplete
                        v-model="formName"
                        :data="formData"
                        :clearable="true"
                        @on-search="handleSearch"
                        placeholder="输入智能报表名称以检索"
                        size="small">
                    </AutoComplete>
                    <div class="tree-box">
                        <Tree :data="treeData" :render="renderContent" @on-select-change="selectNode"></Tree>
                    </div>
                </div>
            </div>
            <div class="smart-right">
                <div v-if="catalog">
                    <div class="right-title">
                        <h3>智能报表目录</h3>
                        <div class="btns-right">
                            <Button type="primary" size="small" @click="catSave('form1')">保存</Button>
                        </div>
                    </div>
                    <div class="right-form">
                        <Form ref="form1" :model="form1" :rules="rule1" :label-width="120">
                            <FormItem label="目录名称：" prop="name">
                                <Input v-model="form1.name" placeholder="目录名称" style="width: 200px"></Input>
                            </FormItem>
                        </Form>
                    </div>
                </div>
                <div v-if="template">
                    <div class="right-title">
                        <h3>智能报表模板</h3>
                        <div class="btns-right">
                            <Button type="primary" size="small" @click="tempSave('form2')">保存</Button>
                            <Button type="primary" size="small" @click="preview()" v-if="!newFun">预览</Button>
                        </div>
                    </div>
                    <div class="right-form">
                        <div>
                            
                        </div>
                        <Form ref="form2" :model="form2" :rules="rule2" :label-width="130">
                            <FormItem label="报表模板名称：" prop="name">
                                <Input v-model="form2.name" style="width: 400px"></Input>
                            </FormItem>
                            <FormItem label="报表路径：" prop="url">
                                <Input v-model="form2.url" style="width: 400px"></Input>
                            </FormItem>
                            <FormItem label="备注：">
                                <Input v-model="form2.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" style="width: 400px"></Input>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getTree,deleteTemp,newCata,newTemp,editTemp,getTempDetail} from '@api/productReport/smart';
export default {
    name: 'smartReportDeploy',
    data() {
        return {
            height: '',
            formName: '',
            formData: [],
            treeData: [],
            form1: {
                name: ''
            },
            rule1: {
                name: [
                    { required: true, message: '请输入目录名称', trigger: 'blur' }
                ]
            },
            form2: {
                name: '',
                url: '',
                remark: ''
            },
            rule2: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                url: [
                    { required: true, message: '请输入路径', trigger: 'blur' }
                ]
            },
            catalog:false,
            template:false,
            curSiteId:'',
            parentId:'',
            newFun:false,
            catEdit:false
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getOrg()
    },
    methods: {
        handleSearch (value) {
            this.formData = !value ? [] : [
                value,
                value + value,
                value + value + value
            ];
        },
        getOrg(){
            getTree().then(res=>{
                console.log(res)
                let trees = res.data
                let tree=[]
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].expand = true
                    tree.push(trees[i])
                }
                this.treeData=this.drawTree(tree)
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
                    h('Icon', {
                        props: {
                            // type: 'ios-folder-outline',
                            type: data.id.includes('folder')?'ios-folder-outline':'ios-paper-outline',
                            color:"#2d8cf0",
                        },
                        style: {
                            marginRight: '8px',
                            display : data.id.indexOf('_')!=-1? 'inline-block':'none'
                        }
                    }),
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
                            marginRight: '4px',
                            display: (data.id.indexOf('_')!=-1)?'none':(data.is_show ? 'inline-block' : 'none'),
                            fontSize:'12px'
                        },
                        on: {
                            click: (e) => { 
                                e.stopPropagation()
                                this.createCat(data) 
                            }
                        }
                    },'新增目录'),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size: 'small'
                        }),
                        style: {
                            marginRight: '4px',
                            display: ((data.type == 1)||(data.id.indexOf('template')!=-1))?'none':(data.is_show ? 'inline-block' : 'none'),
                            fontSize:'12px'
                        },
                        on: {
                            click: (e) => { 
                                e.stopPropagation() 
                                this.createTemp(data)
                            }
                        }
                    },'新增模板'),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size: 'small'
                        }),
                        style: {
                            marginRight: '4px',
                            display: (data.id.indexOf('_')==-1)?'none':(data.is_show ? 'inline-block' : 'none'),
                            fontSize:'12px'
                        },
                        on: {
                            click: (e) => {
                               e.stopPropagation()
                               this.deleteItem(data) 
                            }
                        }
                    },'删除')
                    
                ])
            ]);
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
                    if( !(arr[i].children &&  arr[i].children.length>0)){
                        arr[i].children = []
                    }
                    arr[i].children.push(item)

                }else if(arr[i].children && arr[i].children.length>0){
                    this.draw(item,arr[i].children)
                }
            }
        },
        selectNode(node){
            console.log(node)
            this.curSiteId = node[0].id
            this.parentId = node[0].parentId
            if(node[0].id.includes('folder')){
                this.template = false
                this.catalog = true
                this.form1.name = node[0].name
            }else if(node[0].id.includes('template')){
                this.template = true
                this.catalog = false
                this.getTemplateDetail()
            }
        },
        createCat(data){
            this.template = false
            this.catalog = true
            this.catEdit = true
        },
        catSave(name){
            this.$refs[name].validate((valid) => {
                if(valid){
                    if(this.catEdit){
                        let data= {
                            fname: this.form1.name ,
                            siteid: this.curSiteId,
                        }
                        console.log(data)
                        newCata(data).then(res=>{
                            console.log(res)
                            if(res.data.id){
                                 this.getOrg()
                                    this.$Message.success('数据保存成功');
                                this.catEdit = false
                            }
                        })
                    }else{

                    }
                    
                }
            })
           
        },
        getTemplateDetail(){
           getTempDetail(this.curSiteId.split('_')[1]).then(res=>{
               console.log(res)
               if(res.data){
                    this.form2= {
                       name: res.data.rname,
                        url: res.data.rpath,
                        remark: res.data.remark
                    }
               }
           })
        },
        tempSave(name){
            // 编辑
            
             this.$refs[name].validate((valid) => {
                 if(valid){
                    if(this.newFun){
                        let data = {
                            remark: this.form2.remark,
                            rname: this.form2.name,
                            rpath: this.form2.url,
                            rtype: "Smart",
                            siteid: this.curSiteId
                        }
                        newTemp(data).then(res=>{
                            console.log(res)
                            if(res.data.id){
                                this.$Message.success('数据保存成功');
                                this.getOrg()
                            }
                        })  
                    }else{
                        let data= {
                            folderid: null,
                            id: this.curSiteId.split('_')[1],
                            mpoints: [],
                            remark: this.form2.remark,
                            rname: this.form2.name,
                            rpath: this.form2.url,
                            rtype: "Smart",
                            siteid: Number(this.parentId),
                            temptype: null,
                        }
                        editTemp(data).then(res=>{
                            if(res.data){
                                this.$Message.success('保存成功');
                                this.getOrg()
                            }
                        })
                    }
                    
                }
            })
        },
        createTemp(data){
            this.template = true
            this.catalog = false
            this.newFun = true
            this.form2= {
                name: '',
                url: '',
                remark: ''
            }
        },
        deleteItem(data){
            this.$Modal.confirm({
                title: '提示',
                content: '<p>你确定要删除吗？</p>',
                onOk: () => {
                    if(data.id.includes('folder')){
                        deleteCate(data.id).then(res=>{
                            console.log(res)
                            if(res.data.count){
                                this.$Message.success('删除成功');
                                this.getOrg()
                            }
                        })
                    }else{
                        deleteTemp(data.id).then(res=>{
                            console.log(res)
                            if(res.data.count){
                                this.$Message.success('删除成功');
                                this.getOrg()
                            }
                        })
                    }
                   
                },
                onCancel: () => {
                    this.$Message.info('Clicked cancel');
                }
            });
        },
         preview(){
            this.$router.push({
                path:'/report',
                query: {
                    siteId: this.curSiteId
                }
            })
        },
    }
}
</script>
<style lang="less" scoped>
.smart-box {
    margin: 5px;
    background: #fff;
    .smart-main {
        width: 100%;
        height: 100%;
        display: flex;
        .smart-left {
            width: 500px;
            height: 100%;
            .left-box {
                width: 100%;
                padding-right:20px;
                /deep/.ivu-select {
                    padding: 3px;
                }
                .tree-box {
                    border-top: 1px solid rgb(230, 230, 230);
                    width: 100%;
                }
                /deep/.ivu-tree-title {
                    width: 100%;
                }
            }
        }
        .smart-right {
            width: 100%;
            border-left: 5px solid #f0f0f0;
            .right-title {
                border-bottom: 1px solid #f0f0f0;
                height: 50px;
                padding: 10px 0 10px 10px;
                h3 {
                    display: inline-block;
                    font-size: 14px;
                    line-height: 30px;
                }
                .btns-right {
                    float: right;
                    margin-top: 2px;
                    /deep/.ivu-btn-small {
                        font-size: 13px;
                        margin-right: 10px;
                        padding: 1px 20px;
                    }
                }
            }
            .right-form {
                margin: 20px;
            }
        }
    }
}
</style>