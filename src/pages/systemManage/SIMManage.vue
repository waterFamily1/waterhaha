<template>
    <div class="sim-box" :style="{height: height+'px'}">
        <div class="sim-search">
            <Form :model="simSearchList" label-position="right" :label-width="100">
                <div class="search-box" :class="{searchTrans:searchShow, searchPack:!searchShow}">
                    <div class="search-main">
                        <div class="form-item">
                            <FormItem label="关键字:">
                                <Input v-model="simSearchList.name" placeholder="租户名称/ICCID"></Input>
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
                                <FormItem label="ICCID号段:">
                                    <Input v-model="simSearchList.number1"></Input> -
                                    <Input v-model="simSearchList.number2"></Input>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label="运营商:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="operatorValue">
                                            <TagSelectOption name="tag1">电信</TagSelectOption>
                                            <TagSelectOption name="tag2">移动</TagSelectOption>
                                            <TagSelectOption name="tag3">联通</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label="SIM卡状态:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="simValue">
                                            <TagSelectOption name="tag1">在用</TagSelectOption>
                                            <TagSelectOption name="tag2">停机</TagSelectOption>
                                            <TagSelectOption name="tag3">待激活</TagSelectOption>
                                            <TagSelectOption name="tag4">销户</TagSelectOption>
                                            <TagSelectOption name="tag5">未知</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label="剩余百分比:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="residueValue">
                                            <TagSelectOption name="tag1">≤100%</TagSelectOption>
                                            <TagSelectOption name="tag2">≤80%</TagSelectOption>
                                            <TagSelectOption name="tag3">≤60%</TagSelectOption>
                                            <TagSelectOption name="tag4">≤40%</TagSelectOption>
                                            <TagSelectOption name="tag5">≤20%</TagSelectOption>
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
                <button type="button" @click="addModal = true">添加SIM卡</button>
                <button type="button" style="margin-left:10px" @click="uploadArea()">批量导入SIM卡</button>
                <button type="button" style="margin-left:10px">删除</button>
            </div>
            <div class="table-wrapper" :style="{height: (height-45)+'px'}">
                <Table stripe size="small" :columns="simTableList" :data="simTableData">
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
        <!-- 添加SIM卡 -->
        <Modal
            v-model="addModal"
            title="添加SIM卡"
            :loading="loading"
            width="400"
            @on-ok="asyncOK">
            <Form ref="modalValidate" :model="modalValidate" :rules="modalRule" :label-width="80">
                <div class="c-top-border-gray-sim">
                    <FormItem label="租户名称" prop="name">
                        <Select v-model="modalValidate.name" placeholder="请选择">
                            <Option value="beijing">deht</Option>
                            <Option value="shanghai">dww</Option>
                            <Option value="shenzhen">deht</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="ICCID" prop="ICCID">
                        <Input type="type" v-model="modalValidate.ICCID"></Input>
                        <Tooltip content="Top Center text" placement="top">
                            <Icon type="ios-help-circle" style="font-size:18px;color: rgb(0, 151, 207);vertical-align:middle;margin-left:6px" @click="disabled = true" />
                            <div slot="content">
                                <p>多个ICCID请用分号(;)隔开</p>
                            </div>
                        </Tooltip>
                    </FormItem>
                    <FormItem label="备注" prop="remark">
                        <Input v-model="modalValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" 
                        placeholder="请填写备注"></Input>
                    </FormItem>
                </div>
            </Form>
        </Modal>
    </div>
</template>
<script>
export default {
    name: 'SIMManage',
    data() {
        return {
            height: '',
            simSearchList: {
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
            simTableList: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '租户名称',
                    key: 'name'
                },
                {
                    title: 'ICCID',
                    key: 'ICCID'
                },
                {
                    title: 'SIM卡状态',
                    key: 'type'
                },
                {
                    title: '总流量(MB)',
                    key: 'allFlow'
                },
                {
                    title: '已用流量(MB)',
                    key: 'usedFlow'
                },
                {
                    title: '剩余流量',
                    key: 'residueFlow'
                },
                {
                    title: '运营商',
                    key: 'operator'
                },
                {
                    title: '数据更新时间',
                    key: 'newTime'
                },
                {
                    title: '备注',
                    key: 'remark'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            simTableData: [],
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
        uploadArea() {
            this.$router.push({
                path:'/other/areaUpload',
                query: {
                    uploadName: '批量导入SIM卡'
                }
            })
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
                    /deep/.ivu-input {
                        height: 28px;
                        font-size: 13px;
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
                        margin-left: 100px;
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
            height: 210px;
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