<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="index-search" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>关键字：</label>
                    <Input v-model="keyword" placeholder="编号/名称/型号/供应商" style="width: 200px" />
                </div>
                <div class="form-item">
                    <label>区域位置：</label> 
                    <TreeSelect 
                        v-model="areaSite" 
                        :data="processList"
                        @on-change="treeChange"
                        :multiple="true"
                        :max-tag-count="1"
                        v-width="220" 
                    />
                </div>
                <div class="form-item">
                    <label>设备类型：</label> 
                    <Select v-model="equType" multiple :max-tag-count="3" style="width:300px">
                        <Option 
                            v-for="item in equTypeList" 
                            :value="item.id" 
                            :key="item.id"
                            :label-in-value="true"
                            @on-change="equChange"
                        >{{ item.name }}</Option>
                    </Select>
                </div>
                <div class="form-search-btn">
                    <a href="javascript:;" @click="higherSearch()">
                        <Icon type="ios-arrow-down" v-if="searchShow" />
                        <Icon type="ios-arrow-up" v-else />
                        高级搜索
                    </a>
                    <Button @click="getList()">搜索</Button>
                    <Button class="reset" @click="resetHandle()">重置</Button>
                </div>
            </div>
            <div class="c-adv-search">
                <div class="c-adv-search-row">
                    <div class="form-item" style="display: flex;">
                        <label>ABC类：</label>
                        <TagSelect v-model="ABCtype">
                            <TagSelectOption name="1">A</TagSelectOption>
                            <TagSelectOption name="2">B</TagSelectOption>
                            <TagSelectOption name="3">C</TagSelectOption>
                        </TagSelect>
                    </div>
                </div>
            </div>
        </div>
        <div class="index-content">
            <div class="c-table-top-btns">
                <Button @click="addDevice()">添加设备</Button>
                <Button @click="msgUpload()" style="margin-left:10px">信息导入</Button>
                <div style="display:inline-block">
                    <Dropdown @on-click="deleteDown">
                        <Button style="margin-left:10px">
                            批量删除<Icon type="md-arrow-dropdown" />
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem name='0'>选中设备</DropdownItem>
                            <DropdownItem name='1'>全部设备</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div> 
            <div class="table-wrapper" :style="{height: (height-45)+'px'}">
                <Table stripe :columns="tableList" :data="tableDate" @on-selection-change="getSelect">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" size="small" @click="checkHandle(row.id)">查看</Button>
                    </template>
                </Table>
                <Page :total="allTotal" @on-change="changePage" show-elevator show-total class="page" />
            </div>
        </div>
    </div>
</template>
<script>
import { regionalCon, equTypeMethod , listMethod, deleteMethod } from '@/api/deviceManage/equ'
import createTree from '@/libs/public-util'

export default {
    name: 'deviceBook',
    data() {
        return {
            height: '',
            keyword: '',
            processList: [],
            areaSite: [],
            searchShow: false, 
            typeBox: [],
            equTypeList: [],
            equType: [],
            ABCtype: [],
            tableList: [
                {
                    type: 'selection',
                    width: 55,
                    align: 'center'
                },
                {
                    title: '设备名称',
                    key: 'name'
                },
                {
                    title: '设备编号',
                    key: 'code'
                },
                {
                    title: '设备类型',
                    key: 'typeName'
                },
                {
                    title: '型号',
                    key: 'model'
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
                    title: '状态',
                    key: 'state',
                    width: 70
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 70,
                    align: 'center'
                }
            ],
            tableDate: [],
            selectList: [],
            allTotal: 0,
            pageNum: '1'
        }
    },
    mounted() {
        this.height = document.body.clientHeight - 130
        this.getList()
        this.getRegional()
        this.getEquType()
    },
    methods: {
        getList() {
            let queryName = this.keyword
            let currentPage = this.pageNum
            let processIds = this.areaSite.toString()
            let abcs = this.ABCtype.toString()
            listMethod({
                queryName,
                processIds,
                abcs,
                currentPage
            }).then(res=> {
                // console.log(JSON.stringify(res))
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
                })
                this.tableDate = arr
                this.allTotal = res.data.total
            }).catch(err=> {
                
            })
        },
        changePage(index) {
            this.pageNum = index
            this.getList()
        },
        getSelect(list) {
            this.selectList = list
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
                this.processList = createTree(treeItem)
            }).catch(err => {
                // 异常情况
            })
        },
        getEquType() {
            equTypeMethod().then(res=> {
                // console.log(res.data)
                this.equTypeList = res.data.items
            }).catch(err=> {

            })
        },
        equChange(val) {
            console.log(val)
        },
        resetHandle() {
            this.keyword = ''
            this.areaSite = []
            this.equType = []
            this.ABCtype = []
        },
        treeChange(value) {
            // this.areaSite = value
        },
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        deleteDown(all) {
            var selectNum = 0
            var ids = []
            let alls
            this.selectList.forEach((item)=>{
                ids.push(item.id)
            })
            if(all == 0) {
                selectNum = this.selectList.length
                if(selectNum == 0) {
                    this.$Notice.info({title: '请选择要删除的设备'})
                    return
                } else {
                    if(selectNum != this.allTotal) {
                        alls = false
                    }
                    this.$Modal.confirm({
                        title: '删除',
                        content: '您确定要删除 '+selectNum+' 个设备吗？',
                        onOk: () => {
                            let id = ids.toString()
                            deleteMethod({
                                id,
                                alls
                            }).then(res=> {
                                if(res.status == 200) {
                                    this.$Notice.success({
                                        title: '设备删除成功！'
                                    });
                                    this.getList()
                                }
                            }).catch(err=> {

                            })
                        }
                    });
                }
            } else if (all == 1) {
                selectNum = this.allTotal
                alls = true
                let id = ''
                this.$Modal.confirm({
                    title: '删除',
                    content: '您确定要删除 '+selectNum+' 个设备吗？',
                    onOk: () => {
                        deleteMethod({
                            id,
                            alls
                        }).then(res=> {
                            if(res.status == 200) {
                                this.$Notice.success({
                                    title: '设备删除成功！'
                                });
                                this.getList()
                            }
                        }).catch(err=> {
                            
                        })
                    }
                });
            }
        },
        checkHandle(id) {
            this.$router.push({
                path:'/checkBook',
                query: {
                    ids: id
                }
            })
            sessionStorage.setItem('isEdit', false)
        },
        addDevice() {
            this.$router.push({
                path:'/editDetail'
            })
        },
        msgUpload(){
             this.$router.push({
                path:'/other/areaUpload',
                query: {
                    uploadName: '信息导入'
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
                /deep/.ivu-btn {
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
                    display: inline-block;
                    height: 33px;
                    label {
                        display: inline-block;
                        width: 100px;
                        line-height: 35px;
                        text-align: right;
                        color: #576374;
                    }
                }
                .cmp-tab {
                    display: inline-block;
                    a {
                        margin-right: 20px;
                        color: #576374;
                    }
                    .checked {
                        color: #4B7EFE;
                    }
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
            /deep/.ivu-btn {
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
    /deep/.ivu-tag-select {
        margin-left: 0;
    }
    /deep/.ivu-tag-select-option {
         .ivu-tag {
            margin-right: 10px;
        }
        .ivu-tag-text {
            font-size: 14px;
        }
    }
}
</style>