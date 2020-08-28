<template>
    <div class="history-wrap" :style="{height: height+'px'}">
        <div class="history-search">
            <Form :model="historyList" label-position="right" :label-width="100">
                <div class="search-box" :class="{searchTrans:searchShow, searchPack:!searchShow}">
                    <div class="search-main">
                        <div class="form-item">
                            <FormItem label="关键字:">
                                <Input v-model="historyList.name" placeholder="报警名称" style="width: 200px;"></Input>
                            </FormItem>
                        </div>
                        <div class="form-item">
                            <FormItem label="区域位置:">
                                <TreeSelect v-model="historyList.area" multiple show-checkbox :data="treeData" v-width="200" />
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
                                <FormItem label="确认状态:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="confirmState">
                                            <TagSelectOption name="tag1">未解除</TagSelectOption>
                                            <TagSelectOption name="tag2">已解除</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
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
                                <FormItem label="发生时间:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="happenTime">
                                            <TagSelectOption name="tag1">24小时</TagSelectOption>
                                            <TagSelectOption name="tag2">一周</TagSelectOption>
                                            <TagSelectOption name="tag3">一月</TagSelectOption>
                                        </TagSelect>
                                        <DatePicker class="item-picker" type="daterange" :options="options2" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
                                    </div>
                                </FormItem>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
        <div class="history-content">
            <Table stripe :columns="tableList" :data="tableData">
                <!-- <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template> -->
                <!-- <template slot-scope="{ row, index }" slot="action">
                    <Button class="action" size="small" style="margin-right: 5px;">配置</Button>
                    <Button class="action" size="small">测试</Button>
                </template> -->
            </Table>
            <Page :total="100" show-elevator show-total class="page" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'alarmHistory',
    data() {
        return {
            height: '',
            searchShow: false,
            historyList: {
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
            confirmState: [],
            confirmWay: [],
            alarmLevel: [],
            happenTime: [],
            tableList: [
                {
                    title: '区域位置',
                    key: 'area'
                },
                {
                    title: '报警名称',
                    key: 'name'
                },
                {
                    title: '等级',
                    key: 'level'
                },
                {
                    title: '确认方法',
                    key: 'confirmWay'
                },
                {
                    title: '确认状态',
                    key: 'confirmState'
                },
                {
                    title: '发生时间',
                    key: 'happenTime'
                },
                {
                    title: '确认时间',
                    key: 'confirmTime'
                },
                {
                    title: '持续时间',
                    key: 'continueTime'
                },
                {
                    title: '确认人',
                    key: 'confirmor'
                },
                {
                    title: '订阅',
                    key: 'take'
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
    }
}
</script>
<style lang="less" scoped>
.history-wrap {
    margin: 5px;
    background: #fff;
    .history-search {
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
                        width: 190px;
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
            height: 220px;
            overflow: hidden;
            transition: 0.5s height;
        }
        .searchPack {
            height: 43px;
            overflow: hidden;
            transition: 0.5s height;
        }
    }
    .history-content {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .page{
            text-align: right;
            margin-top: 10px;
        }
    }
    .item-picker {
        display: inline-block;
        position: relative;
        top: -30px;
        left: 300px;
    }
}
</style>