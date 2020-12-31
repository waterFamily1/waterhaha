<template>
    <div>
        <div class="title">
            <div style="display:inline-block">
                <span>数据组合</span>
                <a href="javascript:;" @click="higherSearch()" >
                    <Icon type="ios-arrow-down" v-if="searchShow" />
                    <Icon type="ios-arrow-up" v-else />
                </a>
            </div>
            <Icon type="ios-add-circle" style="color:rgb(162, 162, 162);font-size:20px;float:right;margin-top:10px" @click="modalShow()" />
        </div>
        <div class="con">
            <List size="small" v-if="groupList.length != 0">
                <ListItem 
                    v-for="(item, index) in groupList" 
                    :key="index"
                    @mouseover="btnEnter(index)"
                    @mouseout="btnLeave()"
                >
                    <div class="mouse-div"
                        @mouseover="btnEnter(index)"
                        @mouseout="btnLeave()"
                        @click="groupPic(item)"
                    >
                        <div>
                            <img 
                                src="http://web.tjdeht.cn:8801/images/743362258938ee1aa3e1a802f22ed859.png" 
                                alt="图片"
                            >
                            <span>{{ item.combineName }}</span>
                        </div>
                        <div class="item-btn" v-show="btnShow&&index==current">
                            <Button size="small" type="primary" @click="editHandle(item)">编辑</Button>
                            <Button size="small" type="primary" @click="deleteHandle(item.id)">删除</Button>
                        </div>
                    </div>
                </ListItem>
            </List>
            <div v-if="groupList.length == 0" style="text-align:center;margin:30px auto">暂无数据</div>
        </div>
        <Modal v-model="modal" width="680" class="model-box"> 
            <p slot="header" style="color:#1c2438;font-size:14px;border-left:7px solid #4b7efe;background:#f8f9fb;height:39px;line-height:39px">
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <span class="rectangle"></span>
                <span style="margin-left:8px">添加数据组合</span>
            </p>
            <div>
                <div class="search-item">
                    <label>数据组合名称(必填)：</label>
                    <Input v-model="keyword" placeholder="数据组合名称" style="width: 150px" />
                </div>
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
                            multiple
                            :data="tissueList"
                            v-width="240" 
                            @on-change="treeChange"
                        />
                    </div>
                    <div class="search-btn">
                        <Button size="small" @click="addDataGroup()">搜索</Button>
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
                        @on-select-all-cancel="handleSelectAllCancel"
                    >
                    </Table>
                    <Page 
                        :total="allTotal" 
                        show-total 
                        show-elevator 
                        @on-change="changePage"
                        size="small" 
                        class="page" 
                        style="text-align:right;margin-top:20px" 
                    />
                    <div class="action-btn">
                        <span @click="cancleHandle()">取消</span>
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
import{ dataListMethod, regionalCon, addDataMethod, deleteDataMethod, editeDataMethod } from '@/api/dataManage/curve'
import createTree from '@/libs/public-util'

export default {
    name: 'datagroup',
    props: {
        groupList: Array
    },
    data(){
        return {
            height:0,
            searchShow:false,
            modal:false,
            tissue: [],
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
            keyword:'',
            allTotal: 0,
            pageNum: '1',
            queryName: '',
            mpointIds: [],
            addSuccess: '',
            deleteModal: true,
            alreadySelect: [],
            edit: '',
            btnShow: false,
            current: 0
        }
    },
    methods:{
        groupPic(item) {
            // console.log(JSON.stringify(item))
            let arr = {
                id: item.mpointIds,
                name: item.combineName
            }
            let items = []
            items.push(arr)
            this.$emit('child-group', items)
        },
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
                this.tissueList = createTree(treeItem, 0)
            }).catch(err => {
                // 异常情况
            })
        },
        addDataGroup() {
            let currentPage = this.pageNum
            let queryName = this.queryName
            let siteId = this.tissue.toString()
            dataListMethod({
                currentPage,
                queryName,
                siteId
            }).then(res=> {
                console.log(res)
                this.modelData = res.data.items
                this.allTotal = res.data.total
                // console.log(this.selectedData)
                if(this.edit == 1) {
                    this.selectedData.map((item)=> {
                        this.modelData.map((list)=> {
                            if(item.id == list.id) {
                                list._checked = true;
                            }
                        })
                    })
                }
            }).catch(err=> {

            })
        },
        changePage(index) {
            this.pageNum = index
            this.addDataGroup()
        },
        resetHandle() {
            this.tissue = []
            this.pageNum = ''
        },
        treeChange(value) {
            this.tissue = value
        },
        cancleHandle() {
            //取消
        },
        addHandle() {
            //确定添加
            this.selectedData.map(item=> {
                this.mpointIds.push(item.id)
            })
            if(this.edit == 1) {
                editeDataMethod({
                    combineName: this.keyword,
                    id: '',
                    mpointIds: this.mpointIds.toString()
                }).then(res=> {
                    // console.log(res)
                    if(res.status == 200) {
                        this.selectedData = []
                        this.tissue = []
                        this.pageNum = ''
                        this.keyword = ''
                        this.addSuccess = '1'
                        this.modal = false
                        this.edit = '0'
                        this.$emit('addSuccess', this.addSuccess)
                    }
                }).catch(err=> {

                })
            } else {
                addDataMethod({
                    combineName: this.keyword,
                    id: '',
                    mpointIds: this.mpointIds.toString()
                }).then(res=> {
                    // console.log(res)
                    if(res.status == 200) {
                        this.selectedData = []
                        this.tissue = []
                        this.pageNum = ''
                        this.keyword = ''
                        this.addSuccess = '1'
                        this.modal = false
                        this.edit = '0'
                        this.$emit('addSuccess', this.addSuccess)
                    }
                }).catch(err=> {

                })
            }
        },
        editHandle(item) {
            // console.log(JSON.stringify(item.list))
            this.keyword = item.combineName
            this.addDataGroup()
            this.getRegional()
            this.modal = true
            this.selectedData = item.list
            this.edit = '1'
        },
        deleteHandle(id) {
            this.$Modal.confirm({
                title: '您确定要删除吗?',
                width: '300',
                onOk: () => {
                    deleteDataMethod(id).then(res=> {
                        // console.log(res)
                        if(res.status == 200) {
                            this.addSuccess = '2'
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
        btnEnter(index) {
            this.btnShow = true
            this.current = index
        },
        btnLeave() {
            this.btnShow = false 
            this.current = null
        },
        higherSearch(){
            this.searchShow =! this.searchShow
        },
        modalShow(){
            this.modal = true
            this.getRegional()
            this.addDataGroup()
        },
         // 清空所有已选项
        handleClearSelect (status) {
            this.selectedData = []
            this.$refs.selection.selectAll(status)
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
.con{
    min-height: 20px;
    padding-left: 10px;
    /deep/.ivu-list-item {
        width: 100%;
        position: relative;
        .mouse-div {
            width: 100%;
        }
        img {
            display: inline-block;
            margin-right: 5px;
        }
        padding: 5px 0;
        font-size: 13px;
        cursor: pointer;
        div {
            display: inline-block;
        }
        .item-btn {
            position: absolute;
            right: 0;
            /deep/.ivu-btn {
                font-size: 12px;
                height: 20px;
                border-radius: 0;
            }
        }
    }
}
.search-item{
    font-size: 12px;
    height: 40px;
    input::-webkit-input-placeholder{
        color:#999;
        font-size: 13px;
    }
    label{
        font-size: 13px;
    }
}
.key-item{
    display: inline-block;
    margin-right: 10px;
    label{
        font-size: 13px;
    }
}
.search-btn{
    display: inline-block;
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