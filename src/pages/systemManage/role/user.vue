<template>
    <div class="user-main">
        <div class="main-box">
            <div class="main-title">
                <h3>角色用户</h3>
                <Button @click="addUser()">添加用户</Button>
            </div>
            <div class="main-table">
                <Table :columns="columns" :data="data" size="small">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button size="small" @click="remove(index)">删除</Button>
                    </template>
                </Table>
                
            </div>
        </div>
        <!-- 添加用户 -->
        <Modal
            v-model="userModal"
            title="添加角色用户"
            @on-ok="ok"
            width="650"
            @on-cancel="cancel">
            <div class="model-box">
                <div class="model-search">
                    <div>
                        <div class="search-item">
                            <label>关键字：</label>
                            <Input v-model="keyword" placeholder="用户名称/手机号" size="small" style="width: 150px" />
                        </div>
                        <div class="search-item">
                            <label>结构组织：</label>
                            <!-- <Select v-model="tissue" style="width:180px" size="small">
                                <Option v-for="item in tissueList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select> -->
                             <TreeSelect v-model="orgId" :data="data4" :multiple="true" v-width="180" />
                        </div>
                        <div class="search-btn">
                            <Button size="small">搜索</Button>
                            <Button size="small" class="reset">重置</Button>
                        </div>
                    </div>
                    <div class="tabel-num">
                        已选择<strong>{{ selectedData.length }}</strong>个
                        <Button size="small" @click="handleClearSelect(false)">清空</Button>
                    </div>
                </div>
                <div class="model-table">
                    <Table size="small" ref="selection" :columns="modelColumns" :data="modelData"
                        @on-select="handleSelect"
                        @on-select-cancel="handleSelectCancel"
                        @on-select-all="handleSelectAll"
                        @on-select-all-cancel="handleSelectAllCancel">
                    </Table>
                     <Page :total="total" show-elevator show-total class="page" size="small" @on-change="changeSize" />
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
import { getUser,getRole,getOrg} from '@api/system/role';
import createTree from '@/libs/public-util'
export default {
    name: 'roleUser',
    data() {
        return {
            userModal: false,
            columns: [
                {
                    title: '用户名称',
                    slot: 'name'
                },
                {
                    title: '部门',
                    key: 'department',
                    ellipsis: true
                },
                {
                    title: '所属组织',
                    key: 'orgName',
                    ellipsis: true
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 80,
                    align: 'center'
                }
            ],
            data: [],
            keyword: '',
            tissue: '',
            tissueList: [
                {
                    value: 'New York',
                    label: 'New York'
                }
            ],
            modelColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: '用户名称',
                    key: 'name'
                },
                {
                    title: '部门',
                    key: 'orgName'
                },
                {
                    title: '所属组织',
                    key: 'orgName'
                }
            ],
            modelData: [],
            list: [],
            selectedData: [],
            total:0,
            havedData:[],
            data4:[],
            orgId:''
        }
    },
    props:['roleId'],
    methods: {
        remove(i) {
           this.data.splice(i,1)
            let arr=[]
           this.data.forEach(ele=>{
             arr.push(ele.id)
           })
           sessionStorage.setItem('userIds',arr.join(','))
        },
        ok () {
        //    console.log(this.selectedData)
           this.data=this.data.concat(this.selectedData)
           let arr=[]
           this.data.forEach(ele=>{
             arr.push(ele.id)
           })
           sessionStorage.setItem('userIds',arr.join(','))
        },
        cancel () {
            this.$Message.info('Clicked cancel');
        },
        // 清空所有已选项
        handleClearSelect (status) {
            this.selectedData = [];
            this.$refs.selection.selectAll(status);
        },
        // 选中一项，将数据添加至已选项中
        handleSelect (selection, row) {
            console.log(selection)
            console.log(row)
            this.selectedData.push(row);
        },
        // 取消选中一项，将取消的数据从已选项中删除
        handleSelectCancel (selection, row) {
            const index = this.selectedData.findIndex(item => item.name === row.name);
            this.selectedData.splice(index, 1);
        },
        // 当前页全选时，判断已选数据是否存在，不存在则添加
        handleSelectAll (selection) {
            // selection.forEach(item => {
            //     if (this.selectedData.findIndex(i => i.name === item.name) < 0) {
            //         this.selectedData.push(item);
            //     }
            // });
            this.selectedData=selection
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
        getUser(queryName,page,orgId){
            getUser(queryName,page,orgId).then(res=>{
                console.log(res)
                if(res.data){
                    this.modelData = res.data.items
                    this.total = res.data.total
                    
                }
            })
        },
        changeSize(size){
            console.log(size)
            // this.getUser(this.kWord,size,this.orgId)
        },
        addUser(){
            this.userModal = true
            this.modelData.forEach(item=>{
                this.data.forEach(ele=>{
                    if(item.id == ele.id){
                        item._checked = true
                    }
                })
            })
            console.log(this.modelData)
        },
        async getHavedRole(){
            getRole(this.roleId).then(res=>{
                this.data = res.data.items
                let arr=[]
                this.data.forEach(ele=>{
                    arr.push(ele.id)
                })
                sessionStorage.setItem('userIds',arr.join(','))
            })
        },
          getAllorg(){
            getOrg().then(res=>{
                console.log(res)
                if(res.data){
                    this.allOrg = res.data
                     let treeItem = []
                    let trees = res.data
                    for(let i = 0; i < trees.length; i ++) {
                        trees[i].title = trees[i].name
                        trees[i].value = trees[i].id
                        treeItem.push(trees[i])
                    }
                    this.show=true
                    this.data4 = createTree(treeItem)
                }
            })
        },
    },
    mounted(){
         this.getUser('',1,'')
         this.getAllorg()
    },
    watch: {
         roleId () {
            this.getHavedRole()
        }
    }
}
</script>
<style lang="less" scoped>
.user-main {
    width: 100%;
    .main-title {
        border-bottom: 1px solid #f0f0f0;
        height: 50px;
        padding: 10px 0 10px 10px;
        h3 {
            display: inline-block;
            font-size: 14px;
            line-height: 30px;
        }
        /deep/.ivu-btn {
            float: right;
            height: 28px;
            background: #576374;
            min-width: 70px;
            color: #fff;
            font-size: 12px;
        }
    }
    .main-table {
        /deep/.ivu-btn {
            float: right;
            height: 28px;
            background: #576374;
            color: #fff;
            font-size: 12px;
        }
    }
}
.model-box {
    .model-search {
        .search-item {
            display: inline-block;
            label {
                font-size: 13px;
                margin-left: 10px;
            }
            /deep/.ivu-input,
            /deep/.ivu-select {
                font-size: 13px;
            }
        }
        .search-btn {
            display: inline-block;
            float: right;
            /deep/.ivu-btn {
                height: auto;
                font-size: 12px;
                background: #838A95;
                color: #fff;
                margin-right: 10px;
                border-radius: 1px;
                padding: 4px 12px;
            }
            .reset {
                background: #aaafb8;
            }
        }
        .tabel-num {
            text-align: right;
            font-size: 13px;
            color: #999;
            line-height: 30px;
            margin-top: 10px;
            /deep/.ivu-btn {
                font-size: 12px;
                background: #57a3f3;
                color: #fff;
            }
        }
    }
    .model-table {
        margin-top: 10px;
        .page{
            text-align: right;
            margin: 10px 0;
        }
    }
}
/deep/.ivu-modal-footer {
    /deep/.ivu-btn-text {
        border: 1px solid #dcdee2;
    }
}
</style>