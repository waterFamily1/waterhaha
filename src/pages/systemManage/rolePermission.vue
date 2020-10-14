<template>
    <div class="role-box" :style="{height: height+'px'}">
        <div class="role-main">
            <div class="role-left">
                <h3>角色</h3>
                <div class="left-tree ">
                    <Tree :data="baseData" :render="renderContent" class="demo-tree-render" @on-select-change="selectNode"></Tree>
                </div>
            </div>
            <div class="role-right">
                <div class="right-title">
                    <h3>权限设置</h3>
                    <Button type="primary" @click="submit()">提交</Button>
                </div>
                <div class="right-box">
                    <div class="user-box">
                        <role-user :roleId="roleId"></role-user>
                    </div>
                    <div class="tab-box">
                        <tab-user ref="tab"  :showData="showData"></tab-user>
                    </div>
                </div>
            </div>
        </div>
        <!-- 修改名称 -->
        <Modal 
            v-model="showModel" 
            @on-ok="ok"
            width="450"
            @on-cancel="cancelModal">
            <h4 style="margin-bottom:20px">角色名称</h4>
            <Input v-model="roleName" placeholder="Enter something..." style="width:300px" />
        </Modal>
        <!-- 新建名称 -->
        <Modal 
            v-model="createModal" 
            @on-ok="createOK"
            width="450"
            @on-cancel="createCancel">
            <h4 style="margin-bottom:20px">角色名称</h4>
            <Input v-model="newName" placeholder="Enter something..." style="width:300px" />
        </Modal>
    </div>
</template>
<script>
import roleUser from './role/user'
import tabUser from './role/tab'
import { getTree,modifyName,createyName,deleteName,submitRole} from '@api/system/role';
export default {
    name: 'rolePermission',
    data() {
        return {
            height: '',
            baseData: [],
            buttonProps: {
                type: 'default',
                size: 'small'
            },
            tableData:{},
            roleId:'',
            showData:'',
            roleName:'',
            showModel:false,
            allOrg:[],
            currentNode:{},
            newName:'',
            createModal:false
        }
    },
    components: {
        roleUser,
        tabUser
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getRoleTree()
    },
    methods: {
        renderContent (h, { root, node, data }) {
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
                            marginRight: '4px',
                            display: data.type =='role'?'none':(data.is_show ? 'inline-block' : 'none'),
                            fontSize:'12px'
                        },
                        on: {
                            click: (e) => { 
                                e.stopPropagation()
                                this.create(data) 
                            }
                        }
                    },'新建'),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size: 'small'
                        }),
                        style: {
                            marginRight: '4px',
                            display: data.type =='org'?'none':(data.is_show ? 'inline-block' : 'none'),
                            fontSize:'12px'
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
                            marginRight: '4px',
                            display: data.type =='org'?'none':(data.is_show ? 'inline-block' : 'none'),
                            fontSize:'12px'
                        },
                        on: {
                            click: (e) => {
                               e.stopPropagation()
                               this.cancel(data) 
                            }
                        }
                    },'删除')
                    
                ])
            ]);
        },  
        getRoleTree(){
            getTree().then(res=>{
                
                let trees = res.data
                let tree=[]
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].expand = true
                    tree.push(trees[i])
                }
                this.baseData=this.drawTree(tree)
            })
        } ,
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
           this.roleId = node[0].busId
           sessionStorage.setItem('roleId',this.roleId)
           if(node[0].type=='org')return
           this.$refs.tab.dataRole();
        },
        create(data){
           this.createModal = true
           this.currentNode = data
        },
        edit(data){
           this.showModel = true
           this.roleName = data.name
           this.currentNode = data
        },
        cancel(data){
            this.$Modal.confirm({
                title: '提示',
                content: '<p>你确定要删除吗？</p>',
                onOk: () => {
                    this.deleteName(data.busId)
                },
                onCancel: () => {
                    this.$Message.info('Clicked cancel');
                }
            });
        },
        cancelModal(){

        },
        ok(){
           this.modifyName(this.currentNode)
        },
        createOK(){
           this.createyName(this.currentNode)
        },
        createCancel(){

        },
        modifyName(node){
            let data = {
                id: node.busId,
                name: this.roleName,
                orgId: node.parentId,
                version: "0"
            }
           modifyName(data).then(res=>{
               console.log(res)
               if(res.data.count){
                   this.getRoleTree()
               }
           })
        },
        createyName(node){
            let data= {
                id: "",
                name: this.newName,
                orgId: node.id,
                version: "0"
            }
           createyName(data).then(res=>{
               console.log(res)
               if(res.data.id){
                this.getRoleTree()
               }

           })
        },
        deleteName(data){
           deleteName(data).then(res=>{
               console.log(res)
               if(res.data.count){
                this.getRoleTree()
               }

           })
        },
      
        submit(){
             if(!this.roleId){
                this.$Message.warning(' 请选择一个角色');
                return
             }
             this.$Modal.confirm({
                title: '确认操作',
                content: '<p>修改角色权限后，相关用户会强制退出，重新登录后才能使用。是否确定提交？</p>',
                width:'350px',
                onOk: () => {
                    this.submitRole()
                },
                onCancel: () => {
                    this.$Message.info('Clicked cancel');
                }
            });
        },
        submitRole(){
            let data= {
                appMenuOperDTO:{
                    menuIds:sessionStorage.getItem('appmenuIds'),
                    operIds:'',
                    roleId:this.roleId
                },
                processDTO:{
                    roleId:this.roleId,
                    value:sessionStorage.getItem('processDTOValue')
                },
                roleUserDTO:{
                    roleId:this.roleId,
                    userIds:sessionStorage.getItem('userIds')
                },
                templateDTO:{
                    roleId:this.roleId,
                    curveId:sessionStorage.getItem('templateInformation'),
                    homepageId:sessionStorage.getItem('templateIndex')
                },
                warehouseDTO:{
                    roleId:this.roleId,
                    value:sessionStorage.getItem('warehouseDTOValue')
                },
                webMenuOperDTO:{
                    menuIds:sessionStorage.getItem('webmenuIds'),
                    operIds:sessionStorage.getItem('weboperIds'),
                    roleId:this.roleId
                }
            }
            submitRole(data).then(res=>{
                console.log(res)
                if(res.data.id){

                }
            })
        }
    },
    destroyed(){
        console.log("摧毁")
        sessionStorage.clear()
    },
    
}
</script>
<style lang="less" scoped>
.role-box {
    margin: 5px;
    background: #fff;
    .role-main {
        width: 100%;
        height: 100%;
        display: flex;
        .role-left {
            width: 350px;
            h3 {
                border-bottom: 1px solid #f0f0f0;
                height: 40px;
                line-height: 40px;
                text-indent: 10px;
            }
            .left-tree {
                padding-right: 20px;
                /deep/.ivu-tree-title {
                    width: 100%;
                }
            }
        }
        .role-right {
            flex: 1;
            border-left: 5px solid #f0f0f0;
            min-height: 100%;
            width: 100%;
            .right-title {
                padding: 5px;
                h3 {
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                    text-indent: 10px;
                }
                /deep/.ivu-btn {
                    float: right;
                    min-width: 70px;
                    margin: 0 5px;
                    height: 28px;
                }
            }
            .right-box {
                border-top: 5px solid #f0f0f0;
                display: flex;
                height: 100%;
                box-sizing: border-box;
                
                .user-box {
                    width: 49%;
                }
                .tab-box {
                    width: 50%;
                    float: right;
                    border-left: 5px solid #f0f0f0;
                    overflow: scroll;

                }
            }
        }
    }
}
</style>