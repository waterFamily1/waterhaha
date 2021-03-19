<template>
    <div class="home-box">
        <div class="home-top" :class="{homeTopExtend:templateA==true}">
            <TreeSelect v-model="orgId" :data="orgTree" v-width="200" />
            <div class="c-adv-search-btn">
                <Dropdown style="margin-left: 20px" @on-click="dropClick">
                    <Button>
                        首页模板
                        <Icon type="md-arrow-dropdown" />
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="0">选择模板</DropdownItem>
                        <DropdownItem name="1">保存模板</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Button @click="addModal = true">添加</Button>
                <Button type="primary">编辑</Button>
            </div>
            <div class="home-top-collapse">
                <a href="javascript:;" @click="showTempalte">
                    <span v-if="templateA">
                        <Icon type="ios-arrow-down" />
                        展开
                    </span>
                    <span v-if="!templateA">
                        <Icon type="ios-arrow-up" />
                        收起
                    </span>
                </a>
            </div>
        </div>
        <div class="home-content" style="background-color: #F0F0F0;margin-top: -5px;">
            <grid-layout
	            :layout="selectedItems"
	            :col-num="2"
	            :max-rows="3"
	            :row-height="240"
	            :is-draggable="isEdit ? true : false"
	            :is-resizable="false"
	            :is-mirrored="false"
	            :vertical-compact="true"
	            :use-css-transforms="true"
	            @layout-updated="layoutUpdated"
	        >
                <grid-item v-for="(item, index) in selectedItems" :key="index"
                        :x="item.x"
                        :y="item.y"
                        :w="item.w"
                        :h="item.h"
                        :i="item.i"
                        dragIgnoreFrom="#home-patrol-map">
                    <component v-bind:is="item.parent" :isEdit="isEdit" @on-replace="onReplace" @on-delete="onDelete" :itemData="item" :orgId="orgId"></component>
                </grid-item>
            </grid-layout>
        </div>
        <!-- 选择模板 -->
        <Modal
            v-model="dropModal1"
            title="选择首页模版">
            <div class="mg-single-select-table">
                <div class="mg-single-select-table-header">
                    <Input 
                        v-model="temName" 
                        style="width: 200px;" 
                        placeholder="模板名称"
                        @on-enter="temSearch"
                    >
                        <Button slot="append" icon="ios-search" @click="temSearch"></Button>
                    </Input>
                </div>
                <Table stripe :columns="temColumns" :data="temData"></Table>
                <Page 
                    :total="temTotal" 
                    size="small" 
                    show-total show-elevator 
                    @on-change="pageChange"
                    style="text-align:right;margin: 10px 0 0 0"
                />
            </div>
            <div slot="footer"></div>
        </Modal>
        <!-- 保存模板 -->
        <Modal
            v-model="dropModal2"
            width="300"
            title="添加首页模版">
            <Input v-model="temName2" style="width: 270px" />
            <div slot="footer">
                <Button type="primary" size="large" long :loading="modal_loading" @click="saveTem">保存为新模板</Button>
            </div>
        </Modal>
        <!-- 添加 -->
        <Modal
            v-model="addModal"
            title="添加首页模块"
            width="660"
            @on-ok="addOk"
            @on-cancel="addCancel">
            <Tabs :animated="false">
                <TabPane :label="typ.name" :name="typ.key" v-for="typ in types" :key="typ.id">
                    <div v-if="unselectedItemsByType[typ.id].length > 0" class="add-items">
                        <template v-for="(uitem,key) in unselectedItemsByType[typ.id]">
                            <div class="home-modal-item" :key="key" v-if="uitem.title != '组织'" 
                                :class="{'home-modal-item-hover': !uitem.choose&&uitem.multi == false}"
                                @click="addItemCheck(uitem)"
                            >
                                <div class="home-modal-item-name">
                                    {{ uitem.title }}
                                    <div class="home-modal-add-count" v-if="uitem.addNumShow">+{{ uitem.addNum }}</div>
                                </div>
                                <div v-if="uitem.choose == 1">
                                    <span class="home-item-checked-icon" v-if="uitem.multi == false"></span>
                                </div>
                                <div v-if="!uitem.choose">
                                    <div class="home-modal-checked-btn" v-if="uitem.multi == false">
                                        <Icon type="md-checkbox" :class="{'ivuColor': uitem.addCheck}" />
                                    </div>
                                    <div class="home-modal-item-multi" v-if="uitem.multi == true">
                                        <a href="javascript:;" @click="addItemNum(uitem)"><Icon type="md-arrow-dropup"/></a>
                                        <a href="javascript:;" @click="reduceItemNum(uitem)"><Icon type="md-arrow-dropdown" /></a>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <div class="clearfix"></div>
                        <template v-for="(uitem,key) in unselectedItemsByType[typ.id]">
                            <div class="home-modal-item" :key="key" v-if="uitem.title == '组织'" 
                                :class="{'home-modal-item-hover': !uitem.choose&&uitem.multi == false}"
                                @click="addItemCheck(uitem)"
                            >
                                <div class="home-modal-item-name">
                                    {{ uitem.title }}
                                    <div class="home-modal-add-count" v-if="addNumShow">+{{ addNum }}</div>
                                </div>
                                <div v-if="uitem.choose == 1">
                                    <span class="home-item-checked-icon" v-if="uitem.multi == false"></span>
                                </div>
                                <div v-if="!uitem.choose">
                                    <div class="home-modal-checked-btn" v-if="uitem.multi == false">
                                        <Icon type="md-checkbox" :class="{'ivuColor': uitem.addCheck}" />
                                    </div>
                                    <div class="home-modal-item-multi" v-if="uitem.multi == true">
                                        <a href="javascript:;" @click="addItemNum(uitem)"><Icon type="md-arrow-dropup"/></a>
                                        <a href="javascript:;" @click="reduceItemNum(uitem)"><Icon type="md-arrow-dropdown" /></a>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div style="text-align: center;color: #999;font-size: 13px;" v-else>当前类别无可选模块</div>
                </TabPane>
            </Tabs>
        </Modal>
    </div>
</template>

<script>
var types = [
    {name: "图形报表", id: "1", key:'chart'},
    {name: "地图展示", id: "2", key:'map'},
    {name: "视图展示", id: "3", key:'view'},
    {name: "工作管理", id: "4", key:'work'},
    {name: "安防监控", id: "5", key: 'security'},
    {name: "数据服务", id: "6", key: 'data'}
]

import { treeMethod, temNameMethod, temNameDelete, temChoose, temSaveMethod, addModule, getHomeMods } from '@/api/home/index'
import createTree from '@/libs/public-util'
import VueGridLayout from 'vue-grid-layout'

var GridLayout = VueGridLayout.GridLayout;
var GridItem = VueGridLayout.GridItem;

export default {
    name: 'dashboard-console',
    data() {
        return {
            orgId: '',
            orgTree: [],
            templateA: true,
            dropModal1: false,
            temName: '',
            temColumns: [
                {
                    title: '模板名称',
                    key: 'name'
                }, {
                    title: '操作',
                    slot: 'action',
                    width: 120,
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                style :{
                                    color:'rgb(75, 126, 254)',
                                    fontSize:'13px',
                                    margin: '0px 10px 0px 0px'
                                },
                                on: {
                                    click: () => { 
                                        temChoose({
                                            id: params.row.id
                                        }).then(res=> {
                                            if(res.data.count) {
                                                // 选择模板成功，重新加载首页
                                            }
                                        })
                                    }
                                }
                            }, '选择'),
                            h('a', {
                                style :{
                                    color:'rgb(75, 126, 254)',
                                    fontSize:'13px',
                                    margin: '0px 10px 0px 0px'
                                },
                                on: {
                                    click: () => { 
                                        temNameDelete(params.row.id).then(res=> {
                                            if(res.data.count) {
                                                this.temCurrentPage = 1
                                                this.temName = ''
                                                this.getTemName()
                                                this.$Notice.success({
                                                    title: '删除成功'
                                                })
                                            }
                                        })
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            temData: [],
            temTotal: 0,
            temCurrentPage: 1,
            dropModal2: false,
            temName2: '',
            modal_loading: false,
            addModal: false,
            types: types,
            selectedItems: [],
            selectedItemsAll: [],
            unselectedItems: [],
            unselectedItemsByType: {
                '1': [],
                '2': [],
                '3': [],
                '4': [],
                '5': [],
                '6': []
            },
            isEdit: false,
            selectedItemFromModal: {},
	        initItems: [],

            addModalSelectedItems: [],
	        addModalSelectedItemsIds: []
        }
    },
    components: {
        GridLayout,
        GridItem,
        //图形报表
        'equ': (resolve) => require(['./components/report/equ'], resolve),
        'avail': (resolve) => require(['./components/report/avail'], resolve),
        //地图展示
        'patrol': (resolve) => require(['./components/map/patrol'], resolve),
        //视图展示
        'kpi': (resolve) => require(['./components/view/kpi'], resolve),
        //工作管理
        'task': (resolve) => require(['./components/work/task'], resolve),
        'calendar-memory': (resolve) => require(['./components/work/calendar-memory'], resolve),
        //安防监控
        //数据服务
    },
    mounted() {
        this.getTree()
        this.init()
    },
    methods: {
        layoutUpdated (newLayout) {
            this.selectedItems = newLayout
        },
        onReplace(data) {
            this.selectedItemFromModal = {}
            this.selectedItemFromStage = JSON.parse(JSON.stringify(data))
            this.replaceModalShown = true
        },
        onDelete(data){
            var selectedItems = this.selectedItems
            if(selectedItems.length <= 1) {
                this.$Notice.warning({title: '首页需要至少要保留一个模块'})
                return
            }
            this.$Modal.confirm({
                title: '提示',
                content: '<p>您确定要删除吗？</p>',
                onOk: () => {
                    selectedItems.forEach((item,i)=> {
                        if(item.i == data.i) { 
                            selectedItems.splice(i, 1);
                        }
                    })
                    this.unselectedItems.push(data)
                    this.refreshModelItems()
                }
            });
        },
        refreshModelItems() {
            // 重新渲染弹框列表
            this.unselectedItemsByType = {
                "1": [],
                "2": [],
                "3": [],
                "4": [],
                "5": [],
                "6": []
            }
            this.unselectedItems.forEach((uitem)=> {
                this.unselectedItemsByType[uitem.typeId].push(uitem)
            })
        },
        getTree() {
            treeMethod().then(res=> {
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].expand = false
                    treeItem.push(trees[i])
                }
                this.orgTree = createTree(treeItem,0)  
                this.orgId = this.orgTree[0].id
            })
        },
        showTempalte() {
            this.templateA = !this.templateA
        },
        // 首页模板 star
        getTemName() {
            let queryName = this.temName
            let currentPage = this.temCurrentPage
            temNameMethod({
                queryName,
                currentPage
            }).then(res=> {
                this.temData = res.data.items
                this.temTotal = res.data.total
            })
        },
        temSearch() {
            this.temCurrentPage = 1
            this.getTemName()
        },
        pageChange(num) {
            this.temCurrentPage = num
            this.getTemName()
        },
        dropClick(name) {
            if(name == 0) {
                this.dropModal1 = true
                this.temName = ''
                this.temCurrentPage = 1
                this.getTemName()
            } else if(name == 1) {
                this.dropModal2 = true
            }
        },
        saveTem() {
            this.modal_loading = true
            temSaveMethod({
                name: this.temName2
            }).then(res=> {
                if(res.data.count) {
                    this.modal_loading = false
                    this.dropModal2 = false
                    this.$Notice.success({
                        title: '保存成功'
                    })
                }
            })
        },
        // 首页模板 end
        //添加
        init() {
            getHomeMods().then(res=> {
                let resData = []
                resData = res.data.filter(v =>v.name !== "monitor-screenshots");
                this.selectedItems = resData
                this.initItems = this.selectedItems
                // this.initItems = JSON.parse(JSON.stringify(this.selectedItem))
                const Res = new Map()
                this.selectedItemsAll = res.data.filter((item) => !Res.has(item.title) && Res.set(item.title, 1))
                var unselected = []
                addModule().then(res=> {
                    // console.log(res.data)
                    res.data.forEach((a)=> {
                        var exist = false
                        this.selectedItemsAll.forEach((r)=> {
                            if(a.name == r.name) {
                                exist = true
                            }
                            if(r.title == a.title && r.multi == false) {
                                a.choose = '1'
                            }
                        })
                        a.addNumShow = false
                        a.addNum = 0
                        a.addCheck = false
                        if(!exist)
                            unselected.push(a)
                    })
                    this.unselectedItems = unselected

                    unselected.forEach((uitem)=> {
                        this.unselectedItemsByType[uitem.typeId].push(uitem)
                    })
                })
            })
        },
        addHandle() {
            this.addModal = true
        },
        addItemNum(item) {
            item.addNumShow = true
            if(item.addNum <= 6) {
                item.addNum ++
            }
        },
        reduceItemNum(item) {
            if(item.addNum == 1){
                item.addNumShow = false
            }
            if(item.addNum >= 1) {
                item.addNum --
            }
        },
        addItemCheck(item) {
            if(!item.choose && item.multi == false) {
                item.addCheck = !item.addCheck
            }
        },
        addOk() {

        },
        addCancel() {

        }
    }
}
</script>

<style lang="less" scoped>
.home-box {
    height: 100%;
    overflow: hidden;
    position: relative;
    .home-top {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 44px;
        background-color: #FFFFFF;
        z-index: 99;
        border: 5px solid #F0F0F0;
        transition: top .3s;
        display: flex;
        justify-content: space-between;
        .c-adv-search-btn {
            .ivu-btn {
                margin: 5px 5px 0;
                padding: 4px 12px;
                font-size: 12px;
                height: auto;
                border: none;
            }
            .ivu-btn-default {
                background-color: #576374;
                color: #fff;
            }
        }
        .home-top-collapse {
            position: absolute;
            top: 38px;
            right: 5px;
            width: 52px;
            height: 20px;
            background: #f0f0f0;
            font-size: 12px;
            line-height: 20px;
            text-align: center;
        }
    }
    .homeTopExtend {
        top: -44px;
    }
    .home-content {
        width: 100%;
        min-height: 400px;
        background: rebeccapurple;
    }
}
.mg-single-select-table-header {
    min-height: 40px;
}
.ivu-btn-long {
    font-size: 13px;
    padding: 4px 12px;
    height: auto;
}
.home-modal-item {
	position: relative;
    display: inline-block;
    margin: 0 0 10px 10px;
    width: 144px;
    height: 60px;
    background-color: #f1f1f1;
}
.home-modal-item-name {
    text-align: center;
    line-height: 30px;
    color: #434343;
    font-size: 13px;
    margin-top: 10px;
}
.home-item-checked-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 35px;
    height: 15px;
    background: url('../../../images/add.png') no-repeat 0 0;
}
.home-modal-checked-btn {
	position: absolute;
    top: 1px;
    right: 0;
    width: 20px;
    height: 20px;
    line-height: 1;
    text-align: center;
    .ivu-icon {
        font-size: 18px;
        color: rgb(206, 206, 206);
    }
    .ivuColor {
        color: rgb(75, 126, 254);
    }
}
.home-modal-item-multi {
    width: 20px;
    height: 60px;
    position: absolute;
    top: 0;
    right: 0;
    border: 1px solid #FFFFFF;
    a {
        display: block;
        height: 30px;
        line-height: 30px;
        text-align: center;
    }
    a:first-child {
        border-bottom: 1px solid #FFFFFF;
    }
    .ivu-icon {
        color: rgb(204, 204, 204);
    }
}
.home-modal-add-count {
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 15px;
    background-color: #4b7efe;
    color: #FFF;
    text-align: center;
    line-height: 15px;
    font-size: 11px;
}
.home-modal-item-hover {
    cursor: pointer;
}
/deep/.home-item {
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    overflow: hidden;
    .item-title {
        display: flex;
        justify-content: space-between;
        h3 {
            font-size: 14px;
            line-height: 40px;
            height: 40px;
            text-indent: 10px;
            color: #2A384B;
        }
        .home-edit-btn {
            float: right;
            font-weight: 100;
            color: #666666;
            margin-right: 10px;
            font-size: 12px;
        }
        .home-del-btn {
            float: right;
            font-weight: 100;
            color: #666666;
            margin-right: 10px;
            font-size: 12px;
        }
    }
}
</style>