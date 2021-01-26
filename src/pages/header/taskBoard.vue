<template>
    <div class="concern-wrap c-sub-lay" :style="{minHeightheight: height+'px'}">
        <Row :gutter="24" :style="{height: height+'px'}">
            <Col :xl="4" :lg="4" :md="0" :sm="0" :xs="0" :style="{minHeight: height+'px'}">
                <Card shadow :padding="0">
                    <CellGroup @on-click="handleChangeCell" class="ivu-pt-8 ivu-pb-8">
                        <Cell title="巡检任务" name="name1" :selected="currentType === 'name1'" />
                        <Cell title="消缺任务" name="name2" :selected="currentType === 'name2'" />
                        <Cell title="维修工单" name="name3" :selected="currentType === 'name3'" />
                        <Cell title="保养任务" name="name4" :selected="currentType === 'name4'" />
                    </CellGroup>
                </Card>
            </Col>
            <Col :xl="20" :lg="20" :md="24" :sm="24" :xs="24" :style="{minHeight: height+'px'}">
                <div class="card-box">
                    <div class="c-left-border-blue">
                        <div class="index-search" :class="{searchTrans:searchShow, searchPack:!searchShow}">
                            <Form :model="formItem" :label-width="100">
                                <div class="search-main">
                                    <div>
                                        <FormItem label="关键字：">
                                            <Input v-model="formItem.queryName" placeholder="任务标题" style="width: 200px"></Input>
                                        </FormItem>
                                        <FormItem label="所属组织：">
                                            <TreeSelect 
                                                v-model="formItem.orgIds" 
                                                multiple 
                                                :data="orgList" 
                                                :max-tag-count="2"
                                                v-width="300" 
                                            />
                                        </FormItem>
                                    </div>
                                    <div class="form-search-btn">
                                        <a href="javascript:;" @click="higherSearch()">
                                            <Icon type="ios-arrow-down" v-if="searchShow" />
                                            <Icon type="ios-arrow-up" v-else />
                                            高级搜索
                                        </a>
                                        <Button @click="getName()">搜索</Button>
                                        <Button class="reset" @click="resetHandle()">重置</Button>
                                    </div>
                                </div>
                                <div class="c-adv-search">
                                    <FormItem label="时间：" style="display: block;">
                                        <div class="tag-box">
                                            <span 
                                                :class="formItem.time == item.value? 'timeActive': ''"
                                                v-for="(item, index) in timeList" 
                                                :key="index"
                                                @click="timeChange(item)">{{ item.label }}</span>
                                        </div>
                                    </FormItem>
                                    <FormItem label="任务状态：" style="display: block;">
                                        <div class="tag-box">
                                            <span 
                                                :class="formItem.status == item.value? 'timeActive': ''"
                                                v-for="(item, index) in timeList" 
                                                :key="index"
                                                @click="statusChange(item)">{{ item.label }}</span>
                                        </div>
                                    </FormItem>
                                    </FormItem>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div>
                        <div class="task-panel-list">
                            <Spin size="large" fix v-if="loading"></Spin>
                            <div v-for="(item, index) in listData" :key="index" class="c-right-list">
                                <Row type="flex" align="middle"  class="list-title">
                                    <Col>{{ item.time }}</Col>
                                </Row>
                                <Row type="flex" class="list-item" align="middle">
                                    <Col span="13">
                                        <a href="javascript:void(null)" @click="detailClick(item)" style="color: #333;">{{ item.name }}</a>
                                    </Col>
                                    <Col span="5">
                                        <span >{{ item.no }}</span>
                                    </Col>
                                    <Col span="2">
                                        <span>{{ item.statusName }}</span>
                                    </Col>
                                    <Col span="4" class="item-time">{{ formatDateTime(item) }}</Col>
                                </Row>
                            </div>
                            <div v-if="!listData.length" class="no-data">
                                <div>暂无数据</div>
                            </div>
                            <Page :total="total" class="page" show-total show-elevator @on-change="pageChange"></Page>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import { orgMethod, method1 } from '@/api/header/task'
import createTree from '@/libs/public-util'
import { formatTime } from '@/libs/public'
import util from '@/libs/public_js'

export default {
    name: 'taskBoard',
    data() {
        var _self = this
        return {
            height: '',
            currentType: 'name1',
            searchShow: false,
            formItem: {
                queryName: '',
                orgIds: [],
                time: '1',
                status: '1'
            },
            type: '1',
            timeList: [{
                value: '1',
                label: '按日'
            }, {
                value: '2',
                label: '按周'
            }, {
                value: '3',
                label: '按月'
            }],
            statusList: [{
                value: '1',
                label: '待执行'
            }, {
                value: '2',
                label: '执行中'
            }, {
                value: '3',
                label: '已结束'
            }],
            orgList: [],
            loading: false,
            listData: [],
            total: 0,
            pageNum: 1
        }
    },
    filters: {
        formatDateTime: util.transDateFromServer,
        formatDate: v => util.transDateFromServer(v, "yyyy-MM-DD")
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getOrg()
        this.getName()
    },
    methods: {
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        formatDateTime(v){
            if(this.type == '1') {
                return util.transDateFromServer(v.showTime, 'yyyy-MM-dd') + util.transDateFromServer(v.startTime, 'hh:mm')
            } else if(this.type == '3') {
                return util.transDateFromServer(v.showTime, 'yyyy-MM-dd')
            } else {
                return util.transDateFromServer(v.showTime, 'yyyy-MM-dd hh:mm')
            }
        },
        handleChangeCell(name) {
            this.currentType = name
            this.formItem = {
                queryName: '',
                orgIds: [],
                time: [],
                status: []
            }
            this.total = 0
            this.pageNum = 1
            if(name == 'name1') {
                this.type = '1'
                this.getName()
            } else if (name == 'name2') {
                this.type = '2'
                this.getName()
            } else if (name == 'name3') {
                this.type = '3'
                this.getName()
            } else if (name == 'name4') {
                this.type = '4'
                this.getName()
            }
        },
        timeChange(item) {
            console.log(item)
            this.formItem.time = item.value
        },
        statusChange(item) {
            this.formItem.status = item.value
        },
        getOrg() {
            orgMethod().then(res=> {
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    treeItem.push(trees[i])
                }
                this.orgList = createTree(treeItem, 0)
            }).catch(err=> {

            })
        },
        getName() {
            this.loading = true
            let queryName = this.formItem.queryName
            let orgIds = this.formItem.orgIds
            let type = this.type
            let status = this.formItem.status
            let currentPage = this.pageNum
            method1({
                queryName,
                orgIds,
                type,
                status,
                currentPage
            }).then(res=> {
                let arr = res.data.items
                arr.map(item=> {
                    let a = formatTime(item.startTime, 'yyyy-MM-dd').split('-')
                    item.time = a[0]+'年'+a[1]+'月'+a[2]+'日'
                })
                this.listData = res.data.items
                this.total = res.data.total
                this.loading = false
            }).catch(() => {
                this.listData = []
                this.total = 0
                this.loading = false
            })
        },
        pageChange(num) {
            this.pageNum = num
            this.getName()
        },
        resetHandle() {
            this.formItem = {
                queryName: '',
                orgIds: [],
                time: [],
                status: []
            }
        },
        detailClick(item) {
            this.$router.push({
                path:'/task/detail',
                query: {
                    id: item.id
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.c-sub-lay {
    position: relative;
    height: 100%;
    margin: 5px;
    background: #fff;
    .ivu-card-shadow {
        box-shadow: none;
    }
    .ivu-col-span-xl-20 {
        border-left: 5px solid #f7f7f7;
        padding: 0!important;
    }
    .card-box {
        .c-left-border-blue {
            border-radius: 3px;
            padding: 5px;
            border-bottom: 5px solid #f7f7f7;
            .search-main {
                height: 33px;
                display: flex;
                justify-content: space-between;
                .form-search-btn {
                    margin-top: 4px;
                    padding-right: 10px;
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
                /deep/.ivu-tag-text {
                    font-size: 14px;
                }
                .tag-box {
                    span {
                        font-size: 14px;
                        color: #515a6e;
                        margin: 0 15px;
                        cursor: pointer;
                    }
                    .timeActive {
                        color: #4B7EFE;
                    }
                }
            }
        }
        .c-plain-bg-h {
            border-bottom: 1px solid #f0f0f0;
            height: 50px;
            padding: 10px 0;
        }
        .padding-10 {
            padding: 10px;
        }
    }
    .searchTrans {
        height: 120px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .searchPack {
        height: 36px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .page {
        text-align: right;
        margin: 10px 0
    }
    .ivu-form-item {
        display: inline-block;
        margin: 0;
    }
    /deep/.ivu-select-multiple {
        .ivu-tag i {
            display: none;
        }
    }
    /deep/.ivu-select-multiple .ivu-tag span:not(.ivu-select-max-tag) {
        margin: 0;
    }
    .task-panel-list {
        padding: 10px;
        .c-right-list{
            margin-left: 0;
            border:none;
            .list-title {
                height: 40px;
                line-height: 40px;
                padding-left: 20px;
                background: #f4f4f4;
            }
            .list-item{
                height: 60px;
                padding-left: 20px;
                line-height: 60px;
                border-top: none;
                border-bottom: 1px solid #eee;
                &:hover{
                    background-color: #fff;
                }
            }
            .item-time{
                padding-right: 20px;
                text-align:right;
            }
        }
    }
    .no-data {
        margin: 20px;
        div {
            text-align: center;
        }
    }
    .ivu-col {
        height: 100%;
    }
}
</style>