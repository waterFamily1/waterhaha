<template>
    <div class="absent-wrap" :style="{height: height+'px'}">
        <div class="search-box" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>关键字：</label>
                    <Input v-model="searchList.name" placeholder="缺陷类型/编号" style="width: 300px;"></Input>
                </div>
                <div class="form-item">
                    <label>所属组织：</label>
                    <Select v-model="searchList.organize" style="width:200px">
                        <Option v-for="item in organizeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
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
                        <label>创建时间：</label>
                        <DatePicker type="daterange" split-panels placeholder="请选择时间范围" style="width: 300px">
                        </DatePicker>
                    </div>
                    <div class="form-item">
                        <label>状态：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="state">
                                <TagSelectOption name="tag1">待处理</TagSelectOption>
                                <TagSelectOption name="tag2">处理中</TagSelectOption>
                                <TagSelectOption name="tag3">挂起</TagSelectOption>
                                <TagSelectOption name="tag4">关闭</TagSelectOption>
                                <TagSelectOption name="tag5">完成</TagSelectOption>
                                <TagSelectOption name="tag6">未分配</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                    <div class="form-item">
                        <label>缺陷类型：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="defectType">
                                <TagSelectOption name="tag1">工艺缺陷</TagSelectOption>
                                <TagSelectOption name="tag2">设备缺陷</TagSelectOption>
                                <TagSelectOption name="tag3">管理缺陷</TagSelectOption>
                                <TagSelectOption name="tag4">其他缺陷</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                    <div class="form-item">
                        <label>级别：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="level">
                                <TagSelectOption name="tag1">严重</TagSelectOption>
                                <TagSelectOption name="tag2">一般</TagSelectOption>
                                <TagSelectOption name="tag3">轻微</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="c-top-border-gray">
            <div class="c-table-top-btns">
                <button @click="declareHandle()">缺陷申报</button>
            </div>
            <Table stripe :columns="columns" :data="data">
                <template slot-scope="{ row, index }" slot="action">
                    <a class="check-btn" src="javascript:;" @click="checkHandle(index)">查看</a>
                </template>
            </Table>
            <Page :total="100" show-elevator show-total class="page" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'absentTask',
    data() {
        return {
            height: '',
            searchShow: false,
            searchList: {
                name: '',
                organize: ''
            },
            organizeList: [
                {
                    value: '0',
                    label: '联泰潮英智慧水务'
                }
            ],
            state: [],
            defectType: [],
            level: [],
            columns: [
                {
                    title: '缺陷类型',
                    key: 'name'
                }, {
                    title: '缺陷编号',
                    key: 'name'
                }, {
                    title: '相关设备',
                    key: 'name'
                }, {
                    title: '级别',
                    key: 'name'
                }, {
                    title: '创建人',
                    key: 'name'
                }, {
                    title: '创建时间',
                    key: 'name'
                }, {
                    title: '关闭时间',
                    key: 'name'
                }, {
                    title: '所属组织',
                    key: 'name'
                }, {
                    title: '当前状态',
                    key: 'name'
                }, {
                    title: '处理人',
                    key: 'name'
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
            ]
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
    methods: {
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        declareHandle() {
            this.$router.push({
                path:'defect/declare'
            })
        },
        checkHandle() {
            this.$router.push({
                path:'defect/detail'
            })
        }
    }
}
</script>
<style lang="less" scoped>
.absent-wrap {
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
                label {
                    display: inline-block;
                    width: 100px;
                    text-align: right;
                    margin-right: 5px;
                }
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
                .form-item {
                    display: flex;
                    margin-bottom: 10px;
                    label {
                        display: inline-block;
                        width: 100px;
                        text-align: right;
                        margin-right: 5px;
                        line-height: 32px;
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
        height: 230px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .searchPack {
        height: 43px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .c-top-border-gray {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .c-table-top-btns {
            height: 36px;
            border-bottom: 1px solid #EEE;
            button {
                min-width: 50px;
                background-color: #576374;
                border: none;
                color: #fff;
                font-size: 12px;
                height: auto;
                padding: 4px 12px;
                border-radius: 3px;
            }
        }
        .check-btn {
            color: rgb(75, 126, 254);
            margin: 0px 10px 0px 0px;
        }
    }
    .page{
        text-align: right;
        margin-top: 10px;
    }
}
</style>