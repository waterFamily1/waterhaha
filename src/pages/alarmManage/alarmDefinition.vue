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
                            <FormItem label="区域位置:">
                                <TreeSelect v-model="definList.area" multiple show-checkbox :data="treeData" v-width="200" />
                            </FormItem>
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
                                            <TagSelectOption name="tag1">自动</TagSelectOption>
                                            <TagSelectOption name="tag2">自动或者人工</TagSelectOption>
                                            <TagSelectOption name="tag3">人工</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label="报警等级:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="alarmLevel">
                                            <TagSelectOption name="tag1">1级</TagSelectOption>
                                            <TagSelectOption name="tag2">2级</TagSelectOption>
                                            <TagSelectOption name="tag3">3级</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label="使用状态:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="useState">
                                            <TagSelectOption name="tag1">启用</TagSelectOption>
                                            <TagSelectOption name="tag2">停用</TagSelectOption>
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
            <Table stripe :columns="tableList" :data="tableData">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button class="action" size="small" style="margin-right: 5px;">配置</Button>
                    <Button class="action" size="small">测试</Button>
                </template>
            </Table>
            <Page :total="100" show-elevator class="page" />
        </div>
    </div>
</template>
<script>
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
            treeData: [
                {
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
                        }
                    ]
                }
            ],
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
                    key: 'name'
                },
                {
                    title: '确认方法',
                    key: 'confirmWay'
                },
                {
                    title: '报警等级',
                    key: 'alarmLevel'
                },
                {
                    title: '使用状态',
                    key: 'useState'
                },
                {
                    title: '最近报警时间',
                    key: 'time'
                },
                {
                    title: '区域位置',
                    key: 'area'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            tableData: []
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
    methods: {
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        addHandle() {
            this.$router.push({
                path:'/alarmManage/alarm/definAdd'
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
                path:'/alarmManage/alarm/definEdit'
            })
        },
        checkHandle() {
            //查看
            this.$router.push({
                path:'/alarmManage/alarm/definCheck'
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