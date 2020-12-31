<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="index-search" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>关键字：</label>
                    <Input v-model="keyword" placeholder="指标名称" style="width: 220px" />
                </div>
                <div class="form-item tree-item">
                    <label>区域位置：</label> 
                    <TreeSelect 
                        v-model="model1" 
                        :data="cityList"
                        @on-change="treeChange"
                        v-width="200" 
                    />
                </div>
                <div class="form-search-btn">
                    <a href="javascript:;" @click="higherSearch()">
                        <Icon type="ios-arrow-down" v-if="searchShow" />
                        <Icon type="ios-arrow-up" v-else />
                        高级搜索
                    </a>
                    <button type="button" @click="getList()">搜索</button>
                    <button type="button" class="reset" @click="resetHandle()">重置</button>
                </div>
            </div>
            <div class="c-adv-search">
                <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>指标类型：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="typeValue" @on-change="typeChange">
                                <TagSelectOption name="1">数据KPI</TagSelectOption>
                                <TagSelectOption name="2">设备KPI</TagSelectOption>
                                <TagSelectOption name="3">关键指标</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="index-content">
            <div class="c-table-top-btns">
                <button type="button" @click="addHandle()">新增</button>
            </div>
            <div class="table-wrapper" :style="{height: (height-45)+'px'}">
                <Table stripe :columns="tableList" :data="tableData">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" size="small" style="margin-right: 5px;" @click="checkHandle(row.id)">查看</Button>
                        <Button class="action" size="small" @click="handleDelete(row.id)">删除</Button>
                    </template>
                </Table>
                <Page 
                    :total="allTotal" show-total show-elevator @on-change="changePage" 
                    style="text-align: right;margin-top: 10px;" 
                />
            </div>
        </div>
        <!-- 删除 -->
        <Modal
            class="delete-modal"
            v-model="deleteModal"
            title="确认"
            :closable="false"
            @on-ok="deleteOk"
            width="300">
            <Icon type="md-help-circle" />
            <p>确定要删除这个指标？</p>
        </Modal>
    </div>
</template>
<script>
import { getListMethod, deleteMethod,areaMethod } from '@/api/system/indicator'
import createTree from '@/libs/public-util'

export default {
    name: 'indexManage',
    data() {
        return {
            height: '',
            keyword: '',
            cityList: [],
            model1: '',
            searchShow: false,
            typeValue: [],
            tableList: [
                {
                    title: '指标名称',
                    key: 'indexName'
                },
                {
                    title: '指标类型',
                    key: 'indexType'
                },
                {
                    title: '区域位置',
                    key: 'processName'
                },
                {
                    title: '测点名称',
                    key: 'mpointName'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            tableData: [],
            allTotal: 0,
            pageNum: '1',
            deleteModal: false
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getList()
        this.getArea()
    },
    methods: {
        getList() {
            let queryName = this.keyword
            let processId = this.model1
            let indexType = this.typeValue
            let pageNum = this.pageNum
            getListMethod({
                queryName,
                processId,
                indexType,
                pageNum
            }).then(res=> {
                // console.log(JSON.stringify(res.data))
                let arr = res.data.items
                let list = arr.map(item=> {
                    if(item.indexType == 1) {
                        item.indexType = '数据KPI'
                    } else if(item.indexType == 2) {
                        item.indexType = '设备KPI'
                    } else if(item.indexType == 3) {
                        item.indexType = '关键指标'
                    }
                    return item
                })
                this.tableData = list
                this.allTotal = res.data.total
            }).catch(err=> {

            })
        },
        resetHandle() {
            this.keyword = ''
            this.model1 = ''
            this.typeValue = []
            this.pageNum = '1'
            this.getList()
        },
        typeChange(checkedNames, name) {
            if(name == '' || name == undefined || name == null) {
                this.typeValue = []
            }
        },
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        handleDelete(id) {
            this.ids = id
            this.deleteModal = true
        },
        deleteOk() {
            let ids = this.ids
            deleteMethod(ids).then(res=> {
                // console.log(res)
                if(res.data.count == 1) {
                    this.deleteModal = false
                    this.getList()
                }
            }).catch(err=> {
                
            })
        },
        changePage(index) {
            this.pageNum = index
            this.getList()
        },
        checkHandle(id) {
            this.$router.push({
                path:'/index/indexAdd',
                query: {
                    type: 1,
                    ids: id
                }
            })
        },
        addHandle() {
            this.$router.push({
                path:'/index/indexAdd',
                query: {
                    type: 0
                }
            })
        },
        getArea() {
            areaMethod().then(res=> {
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].label = trees[i].name
                    trees[i].checked = false
                    treeItem.push(trees[i])
                }
                this.cityList = createTree(treeItem, 0)
            }).catch(err=> {

            })
        },
        treeChange(value) {
            // console.log(value)
            this.model1 = value
        }
    }
}
</script>
<style lang="less" scoped>
.index-box {
    margin: 5px;
    background: #fff;
    .index-search {
        padding: 5px;
        height: 43px;
        .search-main {
            height: 33px;
            .form-item {
                display: inline-block;
                min-height: 33px;
                label {
                    display: inline-block;
                    width: 100px;
                    line-height: 35px;
                    text-align: right;
                    color: #576374;
                }
            }
            .form-search-btn {
                float: right;
                margin-top: 4px;
                a {
                    margin: 0 10px 0 0;
                    color: #576374;
                    font-size: 12px;
                }
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
        .c-adv-search {
            margin-top: 10px;
            padding-top: 5px;
            border-top: 1px solid #ececec;
            .c-adv-search-row {
                margin: 5px 0;
                .form-item {
                    display: inline-block;
                    height: 33px;
                    label {
                        display: inline-block;
                        width: 100px;
                        line-height: 35px;
                        text-align: right;
                        color: #576374;
                        float: left;
                    }
                }
                .cmp-tab {
                    display: inline-block;
                    /deep/.ivu-tag-text {
                        font-size: 14px;
                    }
                }
                /deep/.ivu-form-item {
                    margin-bottom: 5px;
                }
            }
        }
    }
    .searchTrans {
        height: 100px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .searchPack {
        height: 43px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .index-content {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .c-table-top-btns {
            height: 36px;
            border-bottom: 1px solid #EEE;
            button{
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
    .tree-item {
        /deep/.ivu-select-dropdown {
            min-width: 300px!important;
        }
    }
}
.delete-modal {
    /deep/.ivu-icon {
        color: #f90;
        font-size: 30px;
    }
    p {
        display: inline-block;
        font-size: 14px;
        line-height: 30px;
        margin-left: 10px;
    }
}
/deep/.ivu-modal-footer {
    .ivu-btn-text {
        border: 1px solid #e8eaec;
    }
}
</style>