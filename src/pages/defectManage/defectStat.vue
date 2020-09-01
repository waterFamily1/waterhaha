<template>
    <div class="stat-wrap" :style="{height: height+'px'}">
        <div class="search-box" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>起止时间：</label>
                    <DatePicker type="daterange" v-model="searchList.time" 
                        placement="bottom-end" placeholder="请选择起止时间" style="width: 300px">
                    </DatePicker>
                </div>
                <div class="form-item">
                    <label>严重程度：</label>
                    <Select v-model="searchList.severity" style="width:200px">
                        <Option value="0">严重</Option>
                        <Option value="1">轻微</Option>
                        <Option value="2">一般</Option>
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
                        <div>
                            <label>区域位置：</label>
                            <TreeSelect v-model="searchList.area" multiple :data="areaData" v-width="200" />
                        </div>
                        <div>
                            <label>所属组织：</label>
                            <Select v-model="searchList.organize" style="width:200px">
                                <Option value="0">联泰潮英智慧水务</Option>
                            </Select>
                        </div>
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
                </div>
            </div>
        </div>
        <div class="c-top-border-gray">
            <div class="c-table-top-btns">
                <button @click="exportHandle()">导出表格</button>
            </div>
            <Table stripe :columns="columns" :data="data"></Table>
            <Page :total="100" show-elevator show-total class="page" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'defectStat',
    data() {
        return {
            height: '',
            searchShow: false,
            searchList: {
                time: '',
                severity: '',
                area: [],
                organize: ''
            },
            areaData: [
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
            columns: [
                {
                    type: 'index',
                    title: '序号',
                    width: 80
                }, {
                    title: '缺陷类型',
                    key: 'name'
                }, {
                    title: '申报日期',
                    key: 'name'
                }, {
                    title: '状态',
                    key: 'name'
                }, {
                    title: '区域位置',
                    key: 'name'
                }, {
                    title: '当前处理人',
                    key: 'name'
                }, {
                    title: '严重程度',
                    key: 'name'
                }, {
                    title: '申报人',
                    key: 'name'
                }
            ],
            data: []
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
    methods: {
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        exportHandle() {

        }
    }
}
</script>
<style lang="less" scoped>
.stat-wrap {
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
        height: 190px;
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