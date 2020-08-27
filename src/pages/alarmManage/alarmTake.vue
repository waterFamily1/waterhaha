<template>
    <div class="take-wrap" :style="{height: height+'px'}">
        <div class="take-search">
            <Form :model="takeList" label-position="right" :label-width="120">
                <div class="search-box" :class="{searchTrans:searchShow, searchPack:!searchShow}">
                    <div class="search-main">
                        <div class="form-item">
                            <FormItem label="关键字:">
                                <Input v-model="takeList.name" placeholder="报警名称" style="width: 200px;"></Input>
                            </FormItem>
                        </div>
                        <div class="form-item">
                            <FormItem label="区域位置:">
                                <TreeSelect v-model="takeList.area" multiple show-checkbox :data="treeData" v-width="200" />
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
                                <FormItem label="接收方式:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="acceptWay">
                                            <TagSelectOption name="tag1">在线消息</TagSelectOption>
                                            <TagSelectOption name="tag2">短信</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label="推送频率:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="pushFre">
                                            <TagSelectOption name="tag1">5分钟</TagSelectOption>
                                            <TagSelectOption name="tag2">10分钟</TagSelectOption>
                                            <TagSelectOption name="tag3">15分钟</TagSelectOption>
                                            <TagSelectOption name="tag4">30分钟</TagSelectOption>
                                            <TagSelectOption name="tag5">1小时</TagSelectOption>
                                            <TagSelectOption name="tag6">2小时</TagSelectOption>
                                            <TagSelectOption name="tag7">12小时</TagSelectOption>
                                            <TagSelectOption name="tag8">24小时</TagSelectOption>
                                            <TagSelectOption name="tag9">仅推送一次</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label="推迟推送时间:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="pushTime">
                                            <TagSelectOption name="tag1">5分钟</TagSelectOption>
                                            <TagSelectOption name="tag2">10分钟</TagSelectOption>
                                            <TagSelectOption name="tag3">15分钟</TagSelectOption>
                                            <TagSelectOption name="tag4">30分钟</TagSelectOption>
                                            <TagSelectOption name="tag5">1小时</TagSelectOption>
                                            <TagSelectOption name="tag6">2小时</TagSelectOption>
                                            <TagSelectOption name="tag7">12小时</TagSelectOption>
                                            <TagSelectOption name="tag8">24小时</TagSelectOption>
                                            <TagSelectOption name="tag9">立即推送</TagSelectOption>
                                            <TagSelectOption name="tag10">不推送</TagSelectOption>
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
                                        <!-- <DatePicker class="item-picker" type="daterange" :options="options2" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker> -->
                                    </div>
                                </FormItem>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
        <div class="c-top-border-gray">
            <div class="c-table-top-btns">
                <Button @click="addHandle()">新增</Button>
                <Button @click="selectHandle()">删除</Button>
            </div>
            <Table ref="selection" :columns="columns" :data="data"></Table>
            <Page :total="100" show-total show-elevator class="page" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'alarmTake',
    data() {
        return {
            height: '',
            searchShow: false,
            takeList: {
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
            acceptWay: [],
            pushFre: [],
            pushTime: [],
            happenTime: [],
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                    title: '区域位置',
                    key: 'name'
                }, {
                    title: '报警名称',
                    key: 'name'
                }, {
                    title: '接收对象',
                    key: 'name'
                }, {
                    title: '接收方式',
                    key: 'name'
                }, {
                    title: '推送频率',
                    key: 'name'
                }, {
                    title: '延迟推送时间',
                    key: 'name'
                }, {
                    title: '创建人',
                    key: 'name'
                }, {
                    title: '创建时间',
                    key: 'name'
                }, {
                    title: '操作',
                    key: 'handle',
                    width: 150,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => { 
                                        this.checkHandle()
                                    }
                                }
                            }, '查看'),
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => { 
                                        this.editHandle()
                                    }
                                }
                            }, '编辑')
                        ]);
                    }
                },
            ],
            data: [
                {
                    name: '1',
                    name: '1',
                    name: '1',
                    name: '1',
                    name: '1',
                    name: '1',
                    name: '1',
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
        addHandle() {
            this.$router.push({
                path:'/alarmManage/alarm/takeAdd'
            })
        },
        selectHandle() {

        },
        checkHandle() {
            //查看
            this.$router.push({
                path:'/alarmManage/alarm/takeCheck'
            })
        },
        editHandle() {
            //编辑
            this.$router.push({
                path:'/alarmManage/alarm/takeEdit'
            })
        }
    }
}
</script>
<style lang="less" scoped>
.take-wrap {
    margin: 5px;
    background: #fff;
    .take-search {
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
                height: 28px;
                font-size: 12px;
                padding: 4px 12px;
                color: #fff;
                margin-right: 10px;
            }
        }
    }
    .page {
        text-align: right;
        margin-top: 10px;
    }
}
</style>