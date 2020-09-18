<template>
    <div class="plan-wrap" :style="{height: height+'px'}">
        <div class="search-box" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>关键字：</label>
                    <Input v-model="planList.name" placeholder="计划名称" style="width: 200px;"></Input>
                </div>
                <div class="form-item">
                    <label>起止日期：</label>
                    <DatePicker v-model="planList.time" type="daterange" placement="bottom-end" placeholder="请选择起止日期" 
                        style="width: 200px">
                    </DatePicker>
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
                    <div class="form-item" style="display: flex;">
                        <label>状态：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="confirmWay">
                                <TagSelectOption name="tag1">未分配</TagSelectOption>
                                <TagSelectOption name="tag2">已分配</TagSelectOption>
                                <TagSelectOption name="tag3">已下达</TagSelectOption>
                                <TagSelectOption name="tag4">转派</TagSelectOption>
                                <TagSelectOption name="tag5">逾期</TagSelectOption>
                                <TagSelectOption name="tag6">终止</TagSelectOption>
                                <TagSelectOption name="tag7">完成</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="c-table-top">
            <div class="c-table-top-btns">
                <Button @click="addModal = true">新增</Button>
                <Button @click="deleteHandle()">删除</Button>
            </div>
            <Table ref="selection" :columns="columns" :data="data">
                <template slot-scope="{ row, index }" slot="action">
                    <Button class="action" size="small" style="margin-right: 5px;">查看</Button>
                    <Button class="action" size="small">复制</Button>
                </template>
            </Table>
            <Page :total="100" show-elevator show-total class="page" />
        </div>
        <!-- 新增弹出框 -->
        <Modal
            v-model="addModal"
            title="新增保养项目"
            width="500"
            @on-ok="ok"
            @on-cancel="cancel"
            ok-text="生成保养项目">
            <Form :model="addForm" :label-width="100">
                <FormItem label="区域位置： ">
                    <TreeSelect v-model="addForm.value" multiple :data="treeData" />
                </FormItem>
                <FormItem label="设备类型： " >
                    <Select v-model="addForm.type">
                        <Option value="0">站点设备</Option>
                        <Option value="1">泵站设备</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
export default {
    name: 'upkeerPlan',
    data() {
        return {
            height: '',
            searchShow: false,
            planList: {
                name: '',
                time: ''
            },
            confirmWay: [],
            columns: [
                {
                    type: 'selection',
                    width: 40,
                    align: 'center'
                }, {   
                    title: '序号',
                    type: 'index',
                    width: 80
                }, {
                    title: '开始日期',
                    key: 'name',
                    width: 100
                }, {
                    title: '结束日期',
                    key: 'name',
                    width: 100
                }, {
                    title: '计划名称',
                    key: 'name',
                    width: 440
                }, {
                    title: '状态',
                    key: 'name'
                }, {
                    title: '保养持续时间',
                    key: 'name',
                    width: 130
                }, {
                    title: '保养内容项',
                    key: 'name',
                    width: 120
                }, {
                    title: '创建时间',
                    key: 'name',
                    width: 100
                }, {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            data: [
                {
                    name: '1'
                }
            ],
            addModal: false,
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
            addForm: {
                value: [],
                type: ''
            }
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
    methods: {
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        ok() {
            this.$router.push({
                path: 'upkeep/planDetail'
            })
        },
        cancel() {
            this.$Message.info('Clicked cancel');
        }
    }
}
</script>
<style lang="less" scoped>
.plan-wrap {
    margin: 5px;
    background: #fff;
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
        label {
            display: inline-block;
            width: 100px;
            text-align: right;
            margin-right: 5px;
            line-height: 32px;
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
    .c-table-top {
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
/deep/.ivu-modal-footer {
    /deep/.ivu-btn-text {
        background-color: #cbcbcb;
        color: #FEFEFE;
    }
}
</style>