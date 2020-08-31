<template>
    <div class="sim-box" :style="{height: height+'px'}">
        <div class="sim-search">
            <Form :model="siteSearchList" label-position="right" :label-width="100">
                <div class="search-box" :class="{searchTrans:searchShow, searchPack:!searchShow}">
                    <div class="search-main">
                        <div>
                            <div class="form-item">
                                <FormItem label="关键字:">
                                    <Input v-model="siteSearchList.name" placeholder="任务名称/任务编号"></Input>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <label>区域位置：</label> 
                                <Select v-model="model1" style="width:200px">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </div>
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
                                <FormItem label="任务状态:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="operatorValue">
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
        <div class="sim-content">
            <div class="c-table-top-btns">
                <button type="button" @click="add()">新增
                    <Icon type="md-arrow-dropdown" />
                </button>
                <button type="button" style="margin-left:10px" @click="remove()">删除</button>
                <button type="button" style="margin-left:10px" @click="invoke()">启用</button>
                <button type="button" style="margin-left:10px" @click="blockup()">停用</button>
                <button type="button" style="margin-left:10px" @click="recount()">重新计算</button>
            </div>
            <div class="table-wrapper" :style="{height: (height-45)+'px'}">
                <Table stripe size="small" :columns="siteTableList" :data="siteTableData">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" size="small" style="margin-right: 5px;">配置</Button>
                        <Button class="action" size="small">测试</Button>
                    </template>
                </Table>
                 <Page :total="100" show-elevator show-total class="page" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SiteManage',
    data() {
        return {
            height: '',
            cityList: [
                {
                    value: 'New York',
                    label: 'New York'
                }
            ],
            model1: '',
            siteSearchList: {
                name: '',
                number1: '',
                number2: '',
                operator: ''
            },
            searchShow: false,
            addModal: false,
            loading: true,
            operatorValue: [],
            simValue: [],
            residueValue: [],
            siteTableList: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '任务编号',
                    key: 'number'
                },
                {
                    title: '任务名称',
                    key: 'name'
                },
                {
                    title: '任务状态',
                    key: 'state'
                },
                {
                    title: '数据时间(最早)',
                    key: 'dateTime'
                },
                {
                    title: '计算周期',
                    key: 'duration'
                },
                {
                    title: '单位',
                    key: 'unit'
                },
                {
                    title: '任务类型',
                    key: 'taskType'
                },
                {
                    title: '区域位置',
                    key: 'location'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            siteTableData: [],
            modalValidate: {
                name: '',
                ICCID: '',
                remark: ''
            },
            modalRule: {
                ICCID: [
                    {required: true, message: '请输入ICCID', trigger: 'blur' }
                ]
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
        remove() {
            // this.$router.push({
            //     path:'/other/areaUpload',
            //     query: {
            //         uploadName: '批量导入SIM卡'
            //     }
            // })
        },
        invoke(){

        },
        blockup(){

        },
        recount(){

        },
        asyncOK () {
            setTimeout(() => {
                this.addModal = false;
            }, 2000);
        }
    }
}
</script>
<style lang="less" scoped>
.sim-box {
    margin: 5px;
    background: #fff;
    .sim-search {
        .search-box {
            padding: 5px;
            height: 43px;
            .search-main {
                height: 33px;
                display: flex;
                justify-content: space-between;
                .form-item {
                    min-height: 33px;
                    display: inline-block;
                    /deep/.ivu-input {
                        height: 28px;
                        font-size: 13px;
                    }
                    label{
                        width: 100px;
                        display: inline-block;
                        text-align: right;
                    }
                }
                .form-search-btn {
                    margin-top: 4px;
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
                        width: 180px;
                        /deep/.ivu-input {
                            height: 28px;
                            font-size: 13px;
                        }
                    }
                    .cmp-tab {
                        display: inline-block;
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
            height: 100px;
            overflow: hidden;
            transition: 0.5s height;
        }
        .searchPack {
            height: 43px;
            overflow: hidden;
            transition: 0.5s height;
        }
    }
    .sim-content {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .c-table-top-btns {
            height: 36px;
            border-bottom: 1px solid #EEE;
            button{
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
                font-size:12px;
                background:transparent
            }
            .page{
                text-align: right;
                margin-top: 10px;
            }
        }
    }
}
.c-top-border-gray-sim {
    padding: 0 30px;
    /deep/.ivu-tooltip {
        position: absolute;
        top: 3px;
        right: -20px;
    }
}
/deep/.ivu-modal-footer {
    /deep/.ivu-btn-text {
        border: 1px solid #dcdee2;
    }
}
</style>