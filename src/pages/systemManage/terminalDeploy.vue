<template>
     <div class="user-information" :style="{height: height+'px'}">
        <div class="search-header">
            <div class="c-form-item">
                <label>关键词：</label>
                <Input placeholder="编号/名称/终端号" v-model="queryName" style="width: 200px" />
            </div>
             <div class="c-form-item">
                <label>所属组织：</label>
                <TreeSelect 
                    v-model="process" 
                    :data="processList"
                    @on-change="treeChange"
                    :multiple="true"
                    v-width="200" 
                />
            </div>
            <div class="c-adv-search-btn">
                <Button @click="handleSearch()">搜索</Button>
                <Button class="reset" @click="handleReset()">重置</Button>
            </div>
        </div>  
        <div class="c-top-border-gray">
            <div class="c-table-top-btns">
                <Button @click="addUser">新建</Button>
                <Button style="margin-left:10px" @click="modal = true">删除</Button>
            </div>
            <div class="table-wrapper" :style="{height: (height-45)+'px'}">
                <Table 
                    stripe 
                    :columns="terminalList" 
                    :data="terminalData"
                    @on-selection-change="handleSelectRow"
                >
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" size="small" style="margin-right: 5px;" @click="deploy(row.id)">配置</Button>
                        <Button class="action" size="small" @click="test(index)">测试</Button>
                    </template>
                </Table>
                <Page 
                    :total="allTotal" show-total show-elevator @on-change="changePage" 
                    style="text-align: right;margin-top: 10px;" 
                />
            </div>
        </div>
        <Modal v-model="modal" title="删除" width="300" :closable="false" @on-ok="asyncOK">
            <Icon type="md-help-circle" />
            <p>您确定要删除吗？</p>
        </Modal>
     </div>
</template>
<script>
    import { getList, regionalCon, deleteList } from '@/api/system/terminal'
    import createTree from '@/libs/public-util'

    export default {
        data () {
            return {
                queryName: '',
                processList: [],
                process: [],
                processModel: '',
                height: '',
                terminalList: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '终端名称',
                        key: 'terminalName'
                    },
                    {
                        title: '设备编号',
                        key: 'equNo'
                    },
                    {
                        title: '型号',
                        key: 'model'
                    },
                    {
                        title: '区域位置',
                        key: 'processName'
                    },
                    {
                        title: '协议解析方法',
                        key: 'parseMethodName'
                    },
                    {
                        title: '网络方式',
                        key: 'network'
                    },
                    {
                        title: 'SIM卡剩余流量',
                        key: 'left_flow'
                    },
                    {
                        title: '在线状态',
                        key: 'online_state'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                terminalData: [],
                modal: false,
                allTotal: 0,
                pageNum: '1',
                ids: '',
                goBack: '0'
            }
        },
        created() {
            this.goBack = this.$route.query.goBack
        },
        mounted() {
            this.height = document.body.clientHeight-80
            this.getRegional()
            this.getTable()
            if(this.goBack == '1') {
                this.$Notice.success({
                    title: '保存成功'
                });
            }
        },
        methods: {
            getRegional() {
                regionalCon().then(res => {
                    let treeItem = []
                    let trees = res.data
                    for(let i = 0; i < trees.length; i ++) {
                        trees[i].title = trees[i].name
                        trees[i].value = trees[i].id
                        trees[i].checked = false
                        treeItem.push(trees[i])
                    }
                    this.processList = createTree(treeItem)
                }).catch(err => {
                    // 异常情况
                })
            },
            getTable() {
                let queryName = this.queryName
                let processModel = this.processModel
                let pageNum = this.pageNum
                getList({
                    queryName,
                    processModel,
                    pageNum
                }).then(res=> {
                    // console.log(JSON.stringify(res.data.items))
                    let arr = res.data.items
                    let list = arr.map((item) => {
                        if(item.network == 1) {
                            item.network = '有线'
                        } else if(item.network == 2) {
                            item.network = '2G'
                        } else if(item.network == 3) {
                            item.network = '3G'
                        } else if(item.network == 4) {
                            item.network = '4G'
                        } else if(item.network == 5) {
                            item.network = '5G'
                        }

                        if(item.left_flow == '' || item.left_flow == undefined || item.left_flow == null) {

                        } else {
                            item.left_flow = item.left_flow+'%'
                        }

                        if(item.online_state == 'ONLINE') {
                            item.online_state = '在线'
                        } else if(item.online_state == 'OFFLINE') {
                            item.online_state = '离线'
                        } else if(item.online_state == 'NOT_CONFIG') {
                            item.online_state = '未配置'
                        }
                        return item
                    })
                    this.terminalData = list
                    this.allTotal = res.data.total
                }).catch(err => {
                    // 异常情况
                })
            },
            changePage(index) {
                this.pageNum = index
                this.getTable()
            },
            treeChange(value) {
                let val = JSON.stringify(value)
                let value1 = val.replace("[","")
                let value2 = value1.replace("]","")
                this.processModel = value2
            },
            handleSearch() {
                this.getTable()
            },
            handleReset() {
                this.queryName = ''
                this.processModel = ''
                this.pageNum = '1'
                this.getTable()
            },
            handleSelectRow(selection) {
                // console.log(selection)
                let arr = selection
                let idArr = []
                arr.forEach(item => {
                    idArr.push(item.id)
                    return
                })
                let ids1 = JSON.stringify(idArr).replace("[","").replace("]","")
                this.ids = ids1
            },
            asyncOK() {
                let ids = this.ids
                deleteList(ids).then(res => {
                    if(res.data.count == '1') {
                        this.success()
                    }
                }).catch(err => {
                    // 异常情况
                })
            },
            success() {
                this.$Notice.success({
                    title: '删除成功'
                });
                this.getTable()
            },
            deploy(id) {
                // console.log(id)
                this.$router.push({
                    path:'/teminal/terminalDetail',
                    query: {
                        type: '0',
                        ids: id
                    }
                })
            },
            test(index) {
                this.$router.push({path:'/teminal/terminalTest'})
            },
            addUser() {
                this.$router.push({
                    path:'/teminal/addUser',
                    query: {
                        type: '1'
                    }
                })
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
        background: #fff;
        margin-top: 5px;
        padding: 10px;
        .c-table-top-btns {
            height: 36px;
            border-bottom: 1px solid #EEE;
            /deep/.ivu-btn {
                min-width: 50px;
                background: #576374;
                font-size: 12px;
                padding: 4px 12px;
                color: #fff;
                border: 0;
                border-radius: 3px;
                height: auto;
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
/deep/.ivu-modal-body {
    /deep/.ivu-icon {
        font-size: 30px;
        color: #f90;
        display: inline-block;
    }
    p {
        display: inline-block;
        font-size: 14px;
        line-height: 30px;
        margin: 0 15px;
    }
}
/deep/.ivu-modal-footer {
    .ivu-btn-text {
        border: 1px solid #e8eaec;
    }
}
</style>