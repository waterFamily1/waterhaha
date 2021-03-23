<template>
     <div class="user-information" :style="{height: height+'px'}">
        <div class="search-header">
            <div class="c-form-item">
                <label>关键词：</label>
                <Input placeholder="用户姓名/手机号/邮箱" style="width: 300px" v-model="kWord" />
            </div>
             <div class="c-form-item" style="position:relative">
                 <label>所属组织：</label>
                 <TreeSelect 
                    v-model="orgId" 
                    :data="data4"
                    :multiple="true"
                    v-width="350" 
                    :max-tag-count="2" 
                />
            </div>
            <div class="c-adv-search-btn">
                <Button @click="search()">搜索</Button>
                <Button class="reset" @click="reset()">重置</Button>
            </div>
        </div>  
        <div class="c-top-border-gray">
            <div class="c-table-top-btns">
                <Button @click="addUser()">新增用户</Button>
                <Button style="margin-left:10px" @click="upload()">批量导入</Button>
            </div>
            <div class="table-wrapper" :style="{height: (height-45)+'px'}">
                <Table stripe :columns="columns1" :data="data1">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" size="small" style="margin-right: 5px;" @click="checkUser(row.id)">查看</Button>
                        <Button class="action" size="small" @click="remove(row.id)">删除</Button>
                    </template>
                </Table>
                 <Page :total="total" show-elevator show-total class="page" @on-change="changeSize" />
            </div>
        </div>
        <Modal  v-model="modal" title="提示" @on-ok="asyncOK">
          <p>您确定要删除吗？</p>
        </Modal>
     </div>
</template>
<script>
import { getUser,deleteUser,searchUser,getOrganizations } from '@api/basic/user';
import createTree from '@/libs/public-util'
    export default {
        data () {
            return {
                model1: '',
                height: 0,
                columns1: [
                    {
                        type: 'index',
                        width: 80,
                        align: 'center',
                        title: '序号',
                    },
                    {
                        title: '用户姓名',
                        key: 'name'
                    },
                    {
                        title: '部门',
                        key: 'orgchain',
                        render: (h,params) => {
                            let that = this;
                            let arr = params.row.orgChain
                            let text = ''
                            arr.map(ele=>{
                               if(ele.type == 3){
                                   console.log(ele)
                                  text = ele.name
                               }
                            })
                            return h('span', {
                            }, text);
                        }
                    },
                    {
                        title: '所属组织',
                        key: 'orgName',
                    },
                    {
                        title: '手机号',
                        key: 'tel'
                    },
                    {
                        title: '邮箱地址',
                        key: 'email'
                    },
                    {
                        title: '权限角色',
                        key: 'roleMap',
                        ellipsis: true,
                        render: (h,params) => {
                            let that = this;
                            let arr = params.row.roleMap
                            let text = []
                            arr.map(ele=>{
                                text.push(ele.roleName)
                            })
                            return h('span', {
                            }, text.join(','));
                        }
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                data1: [],
                modal: false,
                total: 0,
                userId: '',
                kWord: '',
                orgId: '',
                orgName: '',
                data4: [],
                show: false
            }
        },
        mounted() {
            this.height = document.body.clientHeight-80
            
        },
        created(){
            this.getUserList(this.kWord,this.orgId,1)
            getOrganizations().then(res=>{
                // console.log(res)
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    treeItem.push(trees[i])
                }
                this.show = true
                this.data4 = createTree(treeItem,0)
             })
        },
        methods: {
            reset(){
               this.kWord = ''
               this.orgId = ''
               this.getUserList(this.kWord,this.orgId,1)
            },
            remove(id) {
               let that = this
               that.modal = true
               this.userId = id
            },
            asyncOK () {
                deleteUser(this.userId).then(res=> {
                    // console.log(res)
                    if(res.data.count==1) {
                        this.modal = false;
                        this.getUserList(this.kWord,this.orgId,1)
                    }
                })
            },
            getUserList(kword,orgid,size){
                searchUser(kword,orgid,size).then(res=> {
                    let result=res.data.items
                    for(var index in result) {
                        if(result[index].roleMap.length!=0) {
                            result[index].role = result[index].roleMap[0].roleName
                        } else {
                            result[index].role =''
                        }
                    }
                   this.data1 = result
                   this.total = res.data.total
                })
            },
            checkUser(id) {
                this.$router.push({path:'/user/checkUserInfor',query:{id:id}})
            },
            addUser(){
                this.$router.push({path:'/user/addUserInfor'})
            },
            upload(){
                this.$router.push({
                    path:'/other/areaUpload',
                    query: {
                        uploadName: '用户导入'
                    }
                })
            },
            search(){
                searchUser(this.kWord,this.orgId,1).then(res=> {
                    // console.log(res)
                    if(res.data) {
                        let result = res.data.items
                        for(var index in result) {
                            if(result[index].roleMap.length!=0) {
                                result[index].role = result[index].roleMap[0].roleName
                            } else {
                                result[index].role =''
                            }
                        }
                        this.data1 = result
                        this.total = res.data.total
                    }
                })
            },
            changeSize(size) {
                // console.log(size)
                this.getUserList(this.kWord,this.orgId,size)
            }
        }
    }
</script>
<style lang="less" scoped>
.user-information{
    margin: 5px;
    .search-header{
        background: #fff;
        padding: 5px;
        .c-form-item{
            display: inline-block;
            min-height: 33px;
            label{
                width: 100px;
                text-align: right;
                display: inline-block;
                line-height: 35px;
            }
            
        }
        .c-adv-search-btn{
            float: right;
            margin-top: 4px;
            .ivu-btn {
                height: auto;
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
        background: #fff;
        margin-top: 5px;
        padding: 10px;
        .c-table-top-btns {
            height: 36px;
            border-bottom: 1px solid #EEE;
            .ivu-btn {
                height: auto;
                min-width: 50px;
                background: #576374;
                font-size: 12px;
                padding: 4px 12px;
                color: #fff;
                border: 0;
                border-radius: 3px;
            }
        }
        .table-wrapper{
            .action{
                color:rgb(75, 126, 254);
                border:0;
                font-size:12px;
                background:transparent
            }
            .page{
                text-align: right;
                margin-top: 10px;
            }
        }
    }
}
</style>