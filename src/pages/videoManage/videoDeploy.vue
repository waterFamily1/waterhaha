<template>
    <div class="deploy-wrap" :style="{height: height+'px'}">
        <div class="search-header">
            <div class="c-form-item">
                <label>关键词：</label>
                <Input v-model="searchParams.queryName" placeholder="视频名称" style="width: 200px" />
            </div>
             <div class="c-form-item">
                <label>区域位置：</label>
                <TreeSelect 
                    v-model="searchParams.siteId" 
                    multiple 
                    :data="siteList" 
                    :max-tag-count="2"
                    v-width="300" 
                />
            </div>
            <div class="c-adv-search-btn">
                <Button @click="refresh">搜索</Button>
                <Button class="reset" @click="searchParamsClean">重置</Button>
            </div>
        </div>  
        <div class="c-top-border-gray">
            <div class="c-table-top-btns">
                <Button @click="addVideo">新建</Button>
                <Button style="margin-left:10px" @click="deleteVideo">删除</Button>
            </div>
            <div class="table-wrapper" :style="{height: (height-45)+'px'}">
                <Table 
                    stripe 
                    :columns="terminalList" 
                    :data="terminalData" 
                    :loading="videoLoading" 
                    @on-selection-change="handleSelect"
                >
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" size="small" style="margin-right: 5px;" @click="checkHandle(row)">查看</Button>
                        <Button class="action" size="small" @click="editHandle(row)">编辑</Button>
                    </template>
                </Table>
                <Page 
                    :total="total" 
                    :page-size="searchParams.pageSize" 
                    show-elevator show-total 
                    @on-change="pageChange" 
                    class="page" 
                />
            </div>
        </div>
    </div>
</template>
<script>
import { orgMethod, tableMethod, deleteMethod } from '@/api/videoM/deploy'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'

export default {
    name: 'videoDeploy',
    data() {
        return {
            height: '',
            searchParams: {
                siteId: [],
                queryName: '',
                pageSize: 10,
                currentPage: 1
            },
            siteList: [],
            value: [],
                data: [{
                    title: 'parent1',
                    expand: true,
                    value: 'parent1',
                    selected: false,
                    checked: false,
                    children: [
                        {
                            title: 'parent 1-1',
                            expand: true,
                            value: 'parent1-1',
                            selected: false,
                            checked: false,
                            children: [
                                {
                                    title: 'leaf 1-1-1',
                                    value: 'leaf1',
                                    selected: false,
                                    checked: false,
                                }
                            ]
                        },
                        {
                            title: 'parent 1-2',
                            expand: true,
                            value: 'parent1-2',
                            selected: false,
                            checked: false
                        }
                    ]
                }
            ],
            terminalList: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                    title: '区域位置',
                    key: 'processName',
                    ellipsis: true
                }, {
                    title: '视频名称',
                    key: 'name',
                    ellipsis: true
                }, {
                    title: 'URL地址',
                    key: 'url',
                    ellipsis: true
                }, {
                    title: '定时抓拍',
                    key: 'takeThumb',
                    render: (h, data) => {
                        return h("span", data.row.takeThumb == 'Y' ? '是' : '否' );
                    }
                }, {
                    title: '定时抓拍周期/分',
                    key: 'takeThumbCycle'
                }, {
                    title: '触发报警名称',
                    key: 'alarmName',
                    ellipsis: true
                }, {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            terminalData: [],
            selectData: [],
            total: 0,
            videoLoading: false
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getTable()
        this.getOrg()
    },
    methods: {
        getTable() {
            this.videoLoading = true
            let siteId = this.searchParams.siteId
            let queryName = this.searchParams.queryName
            let currentPage = this.searchParams.currentPage
            tableMethod({
                siteId,
                queryName,
                currentPage
            }).then(res=> {
                if(res.data.items) {
                    this.videoLoading = false
                    this.terminalData = res.data.items
                    this.total = res.data.total
                }
            })
        },
        pageChange(index) {
            this.searchParams.currentPage = index
            this.getTable()
        },
        refresh() {
            this.searchParams.currentPage = 1
            this.getTable()
        },
        // 勾选项获取
        handleSelect(data) {
            this.selectData = data;
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
                this.siteList = createTree(treeItem, 0)
            }).catch(err=> {

            })
        },
        // 重置
        searchParamsClean() {
            this.searchParams.queryName = ''
            this.searchParams.siteId = []
        },
        checkHandle(row) {
            this.$router.push({
                path:'/videoD/checkVideo',
                query: {
                    id: row.id
                }
            })
        },
        editHandle(row) {
            this.$router.push({
                path:'/videoD/editVideo',
                query: {
                    id: row.id
                }
            })
        },
        addVideo() {
            this.$router.push({
                path:'/videoD/addVideo'
            })
        },
        deleteVideo() {
            if (this.selectData && this.selectData.length > 0) {
                let videoIds = this.selectData.map(item => item.id).join();
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确定要删除？</p>',
                    onOk: () => {
                        deleteMethod(videoIds).then(res=> {
                            if (res.data.count) {
                                this.$Notice.success({
                                    title: '成功',
                                    desc: '删除成功！',
                                    duration: 3
                                });
                                this.selectData = []
                                this.refresh()
                            }
                        })
                    },
                    onCancel: () => {
                        
                    }
                });
            } else {
                this.$Notice.warning({
                    title: "警告",
                    desc: "请选中后删除",
                    duration: 3
                });
            }
        }
    }
}
</script>
<style lang="less" scoped>
.deploy-wrap {
    margin: 5px;
    background: #fff;
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
        border-top: 5px solid #f7f7f7;
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
                font-size:13px;
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