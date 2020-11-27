<template>
    <div class="defin-wrap" :style="{height: height+'px'}">
        <div class="defin-search">
            <Form :model="definList" label-position="right" :label-width="100">
                <div class="search-box" :class="{searchTrans:searchShow, searchPack:!searchShow}">
                    <div class="search-main">
                        <div class="form-item">
                            <FormItem label="关键字:">
                                <Input v-model="definList.name" placeholder="编号/报警名称" style="width: 200px;"></Input>
                            </FormItem>
                        </div>
                        <div class="form-item">
                             <label style="display:inline-block;width:120px;text-align:right">区域位置：</label> 
                             <TreeSelect size="small" v-model="definList.area" multiple :data="treeData" v-width="200" />
                        </div>
                        <div class="form-search-btn">
                            <a href="javascript:;" @click="higherSearch()">
                                <Icon type="ios-arrow-down" v-if="searchShow" />
                                <Icon type="ios-arrow-up" v-else />
                                高级搜索
                            </a>
                            <button type="button">搜索</button>
                            <button type="button" class="reset">重置</button>
                        </div>
                    </div>
                    <div class="c-adv-search">
                        <div class="c-adv-search-row">
                            <div class="form-item">
                                <FormItem label="确认方法:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="confirmWay">
                                            <TagSelectOption name="Auto">自动</TagSelectOption>
                                            <TagSelectOption name="AutoOrManual">自动或者人工</TagSelectOption>
                                            <TagSelectOption name="Manual">人工</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label="报警等级:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="alarmLevel">
                                            <TagSelectOption name="1">1级</TagSelectOption>
                                            <TagSelectOption name="2">2级</TagSelectOption>
                                            <TagSelectOption name="3">3级</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label="使用状态:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="useState">
                                            <TagSelectOption name="ON">启用</TagSelectOption>
                                            <TagSelectOption name="OFF">停用</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
        <div class="defin-content">
            <div class="c-table-top-btns">
                <Button @click="addHandle()">新增</Button>
                <Button @click="deleteHandle()">删除</Button>
                <Button @click="startHandle()">启用</Button>
                <Button @click="disableHandle()">停用</Button>
                <Button @click="leadHandle()">导入</Button>
            </div>
            <Table stripe :columns="tableList" :data="tableData" size="small">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="text" size="small" style="margin-right: 5px;color:rgb(75, 126, 254);font-size:12px" @click="checkHandle()">查看</Button>
                    <Button type="text" size="small" style="color:rgb(75, 126, 254);font-size:12px" @click="editHandle()">编辑</Button>
                </template>
            </Table>
            <Page :total="100" show-elevator show-total class="page" />
        </div>
    </div>
</template>
<script>
import { getTree,getList} from '@/api/alarm/definition'
import createTree from '@/libs/public-util'
export default {
    name: 'alarmDefinition',
    data() {
        return {
            height: '',
            searchShow: false,
            definList: {
                name: '',
                area: []
            },
            treeData: [],
            confirmWay: [],
            alarmLevel: [],
            useState: [],
            tableList: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '报警名称',
                    key: 'alarmName'
                },
                {
                    title: '确认方法',
                    key: 'disarmMethod',
                    render: (h, params) => {
                        let a = params.row.disarmMethod
                        const text = a == 'Auto'?'自动':(a=='AutoOrManual'?'自动或者人工':'人工')
                        return h('span', {
                        }, text);
                    }
                },
                {
                    title: '报警等级',
                    key: 'alarmLevel',
                     render: (h, params) => {
                        let a = params.row.alarmLevel
                       
                        return h('span', {
                        }, a+'级');
                    }
                },
                {
                    title: '使用状态',
                    key: 'enabledStatus',
                    render: (h, params) => {
                        let a = params.row.enabledStatus
                        const text = a == 'ON'?'启用':'停用'
                        return h('span', {
                        }, text);
                    }
                },
                {
                    title: '最近报警时间',
                    key: 'time'
                },
                {
                    title: '区域位置',
                    key: 'siteName'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            tableData: [],
            page:1
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getRegional()
        this.getdefList()
    },
    methods: {
         getRegional() {
            getTree().then(res => {
                console.log(res)
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].expand = true
                    treeItem.push(trees[i])
                }
                console.log(treeItem)
                this.treeData = createTree(treeItem)
            }).catch(err => {
                // 异常情况
            })
        },
        getdefList(){
            console.log('getList')
            let way = this.confirmWay.length!=0?this.confirmWay.join(','):''
            let level = this.alarmLevel.length!=0?this.alarmLevel.join(','):''
            let state = this.useState.length!=0?this.useState.join(','):''
            let siteId = this.definList.area.length!=0?this.definList.area.join(','):''
            getList(siteId,this.definList.name,state,way,level,this.page).then(res=>{
                console.log(res)
                this.tableData = res.data.items
            })
        },
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        addHandle() {
            this.$router.push({
                path:'alarm/definAdd'
            })
        },
        deleteHandle() {

        },
        startHandle() {

        },
        disableHandle() {

        },
        leadHandle() {
            this.$router.push({
                path:'/other/areaUpload',
                query: {
                    uploadName: '用户导入'
                }
            })
        },
        editHandle() {
            //编辑
            this.$router.push({
                path:'alarm/definEdit'
            })
        },
        checkHandle() {
            //查看
            this.$router.push({
                path:'alarm/definCheck'
            })
        }
    }
}
</script>
<style lang="less" scoped>
.defin-wrap {
    margin: 5px;
    background: #fff;
    .defin-search {
        .search-box {
            padding: 5px;
            height: 43px;
            .search-main {
                height: 33px;
                overflow: hidden;
                .form-item {
                    min-height: 33px;
                    display: inline-block;
                    /deep/.ivu-input {
                        height: 28px;
                        font-size: 13px;
                    }
                }
                .form-search-btn {
                    margin-top: 4px;
                    float: right;
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
                    /deep/.ivu-input-wrapper {
                        width: 150px;
                        /deep/.ivu-input {
                            height: 28px;
                            font-size: 13px;
                        }
                    }
                    .cmp-tab {
                        display: inline-block;
                        margin-left: 10px;
                        /deep/.ivu-tag-text {
                            font-size: 14px;
                        }
                    }
                    /deep/.ivu-form-item {
                        margin-bottom: 5px;
                    }
                }
                /deep/.ivu-form-item-content {
                    line-height: 6px;
                }
            }
        }
        .searchTrans {
            height: 180px;
            overflow: hidden;
            transition: 0.5s height;
        }
        .searchPack {
            height: 43px;
            overflow: hidden;
            transition: 0.5s height;
        }
    }
    .defin-content {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .c-table-top-btns {
            height: 36px;
            border-bottom: 1px solid #EEE;
            button {
                background-color: #576374;
                border: none;
                min-width: 50px;
                height: 26px;
                color: #fff;
                margin-right: 10px;
                font-size: 13px;
            }
        }
        .page{
            text-align: right;
            margin-top: 10px;
        }
    }
}
</style>