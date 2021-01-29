<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="index-search" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>关键字：</label>
                    <Input v-model="keyword" placeholder="编号/名称/型号" style="width: 200px" />
                </div>
                <div class="form-item">
                    <label>区域位置：</label> 
                    <TreeSelect 
                        v-model="areaSite" 
                        :data="processList"
                        :multiple="true"
                        :max-tag-count="1"
                        v-width="240" 
                    />
                </div>
                <div class="form-item">
                    <label>设备类型：</label> 
                    <TreeSelect 
                        v-model="genre" 
                        multiple 
                        :data="genreList" 
                        show-checkbox 
                        :max-tag-count="2" 
                        v-width="240" 
                    />
                </div>
                <div class="form-search-btn">
                    <a href="javascript:;" @click="higherSearch()">
                        <Icon type="ios-arrow-up" v-if="searchShow"/>
                        <Icon type="ios-arrow-down" v-else />
                        高级搜索
                    </a>
                    <Button @click="getTable()">搜索</Button>
                    <Button class="reset" @click="resetHandle()">重置</Button>
                </div>
            </div>
            <div class="c-adv-search">
                 <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>运行状态：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="runType">
                                <TagSelectOption name="0">正常</TagSelectOption>
                                <TagSelectOption name="1">维修中</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                </div>
                <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>ABC类：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="abc">
                                <TagSelectOption name="1">A</TagSelectOption>
                                <TagSelectOption name="2">B</TagSelectOption>
                                <TagSelectOption name="3">C</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="index-content">
            <div class="c-table-top-btns">
                <div style="display:inline-block">
                    <Dropdown @on-click="importCode">
                        <Button style="margin-left:10px">
                            导出二维码<Icon type="md-arrow-dropdown" />
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem name="true">全部设备</DropdownItem>
                            <DropdownItem name="false">选中设备</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div class="table-wrapper" :style="{height: (height-45)+'px'}">
                <Table stripe :columns="tableList" :data="tableDate" @on-selection-change="getSelect">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" size="small" @click="detailHandle(row.id)">查看</Button>
                    </template>
                </Table>
                <Page :total="allTotal" @on-change="changePage" show-elevator show-total class="page" />
            </div>
        </div>
    </div>
</template>
<script>
import { tableMethod, regionalCon, typeMethod } from '@/api/deviceManage/device'
import createTree from '@/libs/public-util'
import { typeTreeMethod1 } from '@/libs/public'

export default {
    name: 'deviceState',
    data() {
        return {
            height: '',
            keyword: '',
            processList: [],
            areaSite: [],
            model1: '',
            searchShow: false,
            runType: [],
            abc: [],
            genreList: [],
            genre: [],
            tableList: [
                {
                    type: 'selection',
                    width: 55,
                    align: 'center'
                },
                {
                    title: '设备名称',
                    key: 'name',
                    ellipsis: true
                },
                {
                    title: '设备编号',
                    key: 'code',
                    ellipsis: true
                },
                {
                    title: '设备类型',
                    key: 'typeName',
                    ellipsis: true
                },
                {
                    title: '型号',
                    key: 'model',
                    ellipsis: true
                },
                {
                    title: '所属组织',
                    key: 'orgName',
                    ellipsis: true
                },
                {
                    title: 'ABC类',
                    key: 'abc'
                },
                 {
                    title: '区域位置',
                    key: 'processName',
                    ellipsis: true
                },
                {
                    title: '运行状态',
                    key: 'maintainState',
                    width: 100
                },
                {
                    title: '资产状态',
                    key: 'state',
                    width: 100
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 70,
                    align: 'center'
                }
            ],
            tableDate: [],
            allTotal: 0,
            pageNum: '1',
            selectList: [],
            showCodeProgress: false,//二维码生成进度
            codeProgressId: 0,//二维码生成进度 id
            codeProgress: 0,//二维码生成进度 值
            codeTimer: null,//二维码生成进度 定时器
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getTable()
        this.getRegional()
        this.getType()
    },
    methods: {
        getTable() {
            let typeIds = this.genre
            let queryName = this.keyword
            let processIds = this.areaSite
            let maintainState = this.runType
            let abcs = this.abc
            let currentPage = this.pageNum
            tableMethod({
                typeIds,
                queryName,
                processIds,
                maintainState,
                abcs,
                currentPage
            }).then(res=> {
                // console.log(res)
                let arr = res.data.items
                arr.map(item=> {
                    if(item.abc == 1) {
                        item.abc = 'A'
                    } else if(item.abc == 2) {
                        item.abc = 'B'
                    } else if(item.abc == 3) {
                        item.abc = 'C'
                    }

                    if(item.state == 1) {
                        item.state = '启用'
                    } else if(item.state == 2) {
                        item.state = '封存'
                    } else if(item.state == 3) {
                        item.state = '报废'
                    }
                    
                    if(item.maintainState == 0) {
                        item.maintainState = '正常'
                    } else if(item.maintainState == 1) {
                        item.maintainState = '维修中'
                    }
                })
                this.tableDate = arr
                this.allTotal = res.data.total
            }).catch(err=> {

            })
        },
        changePage(index) {
            this.pageNum = index
            this.getTable()
        },
        getRegional() {
            regionalCon().then(res => {
                // console.log(res)
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].checked = false
                    treeItem.push(trees[i])
                }
                this.processList = createTree(treeItem,0)
            }).catch(err => {
                // 异常情况
            })
        },
        getType() {
            typeMethod().then(res=> {
                // console.log(res)
                let treeItem = []
                let trees = res.data.items
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].checked = true
                    treeItem.push(trees[i])
                }
                this.genreList = typeTreeMethod1(treeItem, '0')
            }).catch(err=> {

            })
        },
        resetHandle() {
            this.keyword = ''
            this.areaSite = []
            this.genre = []
            this.runType = []
            this.abc = []
        },
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        getSelect(list){
            this.selectList = list
        },
        importCode(isAll){
            if( isAll != 'true' && this.selectList.length == 0) {
                this.$Message.warning('请选择导出设备！')
                return false
            }
            //清空
            this.showCodeProgress = true
            this.codeProgressId = 0
            this.codeProgress = 0
            clearInterval(this.codeTimer)
        },
        detailHandle(id) {
            this.$router.push({
                path: '/editStateDetail',
                query: {
                    id: id
                }
            })
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
        .c-adv-search {
            margin-top: 10px;
            padding-top: 5px;
            border-top: 1px solid #ececec;
            .c-adv-search-row {
                margin: 5px 0;
                .form-item {
                    display: flex;
                    height: 33px;
                    label {
                        width: 100px;
                        line-height: 35px;
                        text-align: right;
                        color: #576374;
                    }
                }
                .cmp-tab {
                    margin-left: 10px;
                    /deep/.ivu-tag-text {
                        font-size: 14px;
                    }
                }
            }
        }
    }
    .searchTrans {
        height: 140px;
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