<template>
  <div>
       <div class="title">
            <div style="display:inline-block">
                <span>单数据</span>
                <a href="javascript:;" @click="higherSearch()"  >
                    <Icon type="ios-arrow-down" v-if="searchShow" />
                    <Icon type="ios-arrow-up" v-else />
                </a>
            </div>
            <Icon type="ios-add-circle" style="color:rgb(162, 162, 162);font-size:20px;float:right;margin-top:10px" @click="addSingle()" />
        </div>
        <div class="con">
            <Tree 
                :data="singleList" 
                :render="renderContent" 
                :load-data="loadData"
                class="demo-tree-render" 
                v-if="searchShow"
            ></Tree>
        </div>
        <Modal v-model="modal" width="660" class="model-box"> 
            <p slot="header" style="color:#1c2438;font-size:14px;border-left:7px solid #4b7efe;background:#f8f9fb;height:39px;line-height:39px">
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <span class="rectangle"></span>
                <span style="margin-left:8px">添加数据组合</span>
            </p>
            <div>
                <div>
                    <div class="key-item">
                        <label>关键字：</label>
                        <Input v-model="queryName" placeholder="用户名称/手机号" style="width: 150px" />
                    </div>
                    <div class="key-item">
                        <label>区域位置：</label>
                        <TreeSelect 
                            v-model="tissue" 
                            :max-tag-count="2"
                            :data="tissueList"
                            v-width="200" 
                        />
                    </div>
                    <div class="search-btn">
                        <Button size="small" @click="getlist()">搜索</Button>
                        <Button size="small" class="reset" @click="resetHandle()">重置</Button>
                    </div>
                    
                </div>
                <div class="tabel-num">
                        已选择<strong>{{ selectedData.length }}</strong>个
                        <a href="javaScript:;" @click="handleClearSelect(false)">[清空]</a>
                    </div>
                     <div class="model-table">
                    <Table ref="selection" :columns="modelColumns" :data="modelData"
                        @on-select="handleSelect"
                        @on-select-cancel="handleSelectCancel"
                        @on-select-all="handleSelectAll"
                        @on-select-all-cancel="handleSelectAllCancel">
                    </Table>
                    <Page 
                        :total="allTotal" 
                        show-total 
                        show-elevator 
                        size="small" 
                        class="page" 
                        @on-change="changePage"
                        style="text-align:right;margin-top:20px"  
                    />
                     <div class="action-btn">
                        <span>取消</span>
                        <span style="background: #4b7efe;" @click="addHandle()">确定</span>
                     </div>
                </div>
            </div>
            <div slot="footer" >
                <!-- <Button type="primary"  long  @click="save" style="font-size:12px">保存为新模版</Button> -->
            </div>
        </Modal> 
  </div>
</template>    
<script>
import{ addSingleChildMethod, regionalCon, singleListMethod, addSingleDataMethod, deleteSingleMethod } from '@/api/dataManage/curve'
import createNameTree from '@/libs/log-util'
import createTree from '@/libs/public-util'

export default {
    name: 'singleData',
    props: {
        singleList: Array,
        siteGroupList: Array
    },
    data(){
        return{
            searchShow:true, 
            modal:false,
            tissueList: [],
            modelColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '测点编号',
                    key: 'mpointId'
                },
                {
                    title: '区域位置',
                    key: 'siteName'
                },
                {
                    title: '测点名称',
                    key: 'mpointName'
                }
            ],
            modelData: [],
            selectedData: [],
            buttonProps: {
                type: 'default',
                size: 'small'
            },
            tissue:'',
            allTotal: 0,
            pageNum: '1',
            queryName: '',
            mpointIds: [],
            addSuccess: '',
            actionList: []
        }
    },
    // created() {
    //     //接收从chartShow传过来的删除后的数据
    //     // eventBus.$on('siteGroup',(message)=>{
    //     //     this.actionList = message
    //     // })
    // },
    methods:{
        higherSearch(){
            this.searchShow=!this.searchShow
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
                    },
                    click: () => { this.addSiteGroup(root, node, data) }
                }
            }, [
                h('span', [
                    (data.datasource == 'ANALYSIS') && h('Icon', {
                        props: {
                            type: 'ios-podium'
                        },
                        style: {
                            marginRight: '4px',
                            fontSize: '16px',
                            color: 'rgb(75, 126, 254)'
                        }
                    }),
                    (data.datasource == 'AUTO') && h('Icon', {
                        props: {
                            type: 'ios-desktop'
                        },
                        style: {
                            marginRight: '4px',
                            fontSize: '16px',
                            color: 'rgb(75, 126, 254)'
                        }
                    }),
                    (data.datasource == 'INPUT') && h('Icon', {
                        props: {
                            type: 'md-person'
                        },
                        style: {
                            marginRight: '4px',
                            fontSize: '16px',
                            color: 'rgb(75, 126, 254)'
                        }
                    }),(data.datasource == 'CALC') && h('Icon', {
                        props: {
                            type: 'ios-keypad'
                        },
                        style: {
                            marginRight: '4px',
                            fontSize: '16px',
                            color: 'rgb(75, 126, 254)'
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
                    (data.type == 9) && h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary'
                        }),
                        style: {
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            click: () => { this.remove(root, node, data) }
                        }
                    },'删除')
                ])
            ]);
        },
        addSiteGroup(root, node, data) {
            if(data.type == 9) {
                let arr = {
                    id: data.id.split('_')[1],
                    name: data.name
                }
                this.actionList.push(arr)
                this.$emit('child-site', this.actionList)
                //添加后,传给父组件
            }
        },
        loadData (item, callback) {
            let siteId = item.id
            addSingleChildMethod(siteId).then(res=> {
                console.log(res.data)
                let treeItem = []
                let trees = res.data.items
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].expand = true
                    if(trees[i].parentId != 0 && trees[i].type != 9) {
                        trees[i].children = []
                        trees[i].loading = false
                    }
                    treeItem.push(trees[i])
                }
                callback(treeItem)
            }).catch(err=> {

            })
        },
         // 清空所有已选项
        addSingle(){
            this.modal=true
            this.getRegional()
            this.getlist()
        },
        getRegional() {
            console.log(222222)
            regionalCon().then(res => {
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].checked = false
                    treeItem.push(trees[i])
                }
                this.tissueList = createTree(treeItem, 0)
            }).catch(err => {
                // 异常情况
            })
        },
        getlist() {
            let currentPage = this.pageNum
            let queryName = this.queryName
            let siteId = this.tissue
            singleListMethod({
                currentPage,
                queryName,
                siteId
            }).then(res=> {
                this.modelData = res.data.items
                this.allTotal = res.data.total
            }).catch(err=> {

            })
        },
        changePage(index) {
            this.pageNum = index
            this.getlist()
        },
        resetHandle() {
            this.tissue = ''
            this.queryName = ''
        },
        addHandle() {
            this.selectedData.map(item=> {
                this.mpointIds.push(item.id)
            })
            addSingleDataMethod({
                mpointIds: this.mpointIds.toString()
            }).then(res=> {
                // console.log(res)
                if(res.status == 200) {
                    this.selectedData = []
                    this.tissue = ''
                    this.pageNum = ''
                    this.queryName = ''
                    this.addSuccess = '3'
                    this.modal = false
                    this.$emit('addSuccess', this.addSuccess)
                }
            }).catch(err=> {

            })
        },
        remove(root, node, data) {
            let id = data.id.split('_')[1]
            this.$Modal.confirm({
                title: '您确定要删除吗?',
                width: '300',
                onOk: () => {
                    deleteSingleMethod(id).then(res=> {
                        if(res.status == 200) {
                            this.addSuccess = '4'
                            this.$emit('addSuccess', this.addSuccess)
                        }
                    }).catch(err=> {

                    })
                },
                onCancel: () => {
                    // this.$Message.info('Clicked cancel');
                }
            });
        },
        handleClearSelect (status) {
            this.selectedData = [];
            this.$refs.selection.selectAll(status);
        },
        // 选中一项，将数据添加至已选项中
        handleSelect (selection, row) {
            this.selectedData.push(row);
        },
        // 取消选中一项，将取消的数据从已选项中删除
        handleSelectCancel (selection, row) {
            const index = this.selectedData.findIndex(item => item.id === row.id);
            this.selectedData.splice(index, 1);
        },
        // 当前页全选时，判断已选数据是否存在，不存在则添加
        handleSelectAll (selection) {
            selection.forEach(item => {
                if (this.selectedData.findIndex(i => i.id === item.id) < 0) {
                    this.selectedData.push(item);
                }
            });
        },
        // 取消当前页全选时，将当前页的数据（即 modelData）从已选项中删除
        handleSelectAllCancel () {
            const selection = this.modelData;
            selection.forEach(item => {
                const index = this.selectedData.findIndex(i => i.id === item.id);
                if (index >= 0) {
                    this.selectedData.splice(index, 1);
                }
            });
        }
    }
}

</script>
<style lang="less" scoped>
/deep/.ivu-modal-header{
    padding: 0;
    border-bottom: 0;
}
.title{
    height: 40px;
    line-height: 40px;
    background: #F4F4F4;
    padding: 0 10px;
    a{
         color:#333;
    }
}
.demo-tree-render {
    .ivu-tree-title{
        width: 100%;
    }   
    /deep/.ivu-btn {
        height: 20px;
        font-size: 13px;
    }
}
/deep/.ivu-tree-title {
    width: 93%;
}
.search-item{
    font-size: 12px;
    height: 40px;
    input::-webkit-input-placeholder{
        color:#999;
        font-size: 13px;
    }
    label{
        font-size: 12px;
    }
}
.key-item{
    display: inline-block;
    label{
        font-size: 13px;
    }
}
.search-btn{
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
    font-size: 12px;
    color: #999;
    line-height: 30px;
    margin-top: 10px;
    /deep/.ivu-btn {
        font-size: 12px;
        background: #57a3f3;
        color: #fff;
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