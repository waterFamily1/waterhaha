<template>
    <div class="sim-box" :style="{height: height+'px'}">
        <div class="sim-search">
            <Form :model="siteSearchList" label-position="right" :label-width="100">
                <div class="search-box" :class="{searchTrans:searchShow, searchPack:!searchShow}">
                    <div class="search-main">
                        <div>
                            <div class="form-item">
                                <FormItem label="关键字:">
                                    <Input v-model="siteSearchList.name" placeholder="测点名称/测点编号/点位"></Input>
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
                                <FormItem label="信号类型:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="operatorValue">
                                            <TagSelectOption name="tag1">状态信号</TagSelectOption>
                                            <TagSelectOption name="tag2">数值信号</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label="数据来源:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="simValue">
                                            <TagSelectOption name="tag1">自动采集</TagSelectOption>
                                            <TagSelectOption name="tag2">人工录入</TagSelectOption>
                                            <TagSelectOption name="tag3">数据计算</TagSelectOption>
                                            <TagSelectOption name="tag4">数据分析</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label="数据分类:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="residueValue">
                                            <TagSelectOption name="tag1">水位</TagSelectOption>
                                            <TagSelectOption name="tag2">水质</TagSelectOption>
                                            <TagSelectOption name="tag3">水量</TagSelectOption>
                                            <TagSelectOption name="tag4">能耗</TagSelectOption>
                                            <TagSelectOption name="tag5">物耗</TagSelectOption>
                                            <TagSelectOption name="tag6">药耗</TagSelectOption>
                                            <TagSelectOption name="tag7">压力</TagSelectOption>
                                            <TagSelectOption name="tag8">消防</TagSelectOption>
                                            <TagSelectOption name="tag9">电流</TagSelectOption>
                                            <TagSelectOption name="tag10">电压</TagSelectOption>
                                            <TagSelectOption name="tag11">温度</TagSelectOption>
                                            <TagSelectOption name="tag12">震动</TagSelectOption>
                                            <TagSelectOption name="tag13">状态</TagSelectOption>
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
                <div class="btn-block">
                    <Dropdown trigger="click"  @on-click="addItem">
                        <button type="button" style="margin-left:10px" @click="add()">
                            新增<Icon type="md-arrow-dropdown" />
                        </button>
                        <DropdownMenu slot="list" >
                            <DropdownItem name="auto">自动采集型测点</DropdownItem>
                            <DropdownItem name="manual">人工录入型测点</DropdownItem>
                            <Dropdown placement="right-start" >
                                <DropdownItem name="calculation" @on-click="calculationAction">
                                    数据计算
                                    <Icon type="ios-arrow-forward"></Icon>
                                </DropdownItem>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="single">单测点计算任务</DropdownItem>
                                    <DropdownItem name="more">多测点计算任务</DropdownItem>
                                    <DropdownItem name="custom">自定义型计算任务</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div class="btn-block">
                    <Dropdown>
                        <button type="button" style="margin-left:10px" @click="batchsetting()">
                            批量配置<Icon type="md-arrow-dropdown" />
                        </button>
                        <DropdownMenu slot="list">
                            <DropdownItem>选中测点</DropdownItem>
                            <DropdownItem>全部测点</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div class="btn-block">
                    <Dropdown>
                       <button type="button" style="margin-left:10px" @click="batchdelete()">
                            批量删除<Icon type="md-arrow-dropdown" />
                        </button>
                        <DropdownMenu slot="list">
                            <DropdownItem>选中测点</DropdownItem>
                            <DropdownItem>全部测点</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div class="btn-block">
                    <Dropdown>
                       <button type="button" style="margin-left:10px">导出测点
                            <Icon type="md-arrow-dropdown" />
                        </button>
                        <DropdownMenu slot="list">
                            <DropdownItem>选中测点</DropdownItem>
                            <DropdownItem>全部测点</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                
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
                        <Input type="text" v-model="modalValidate.ICCID"></Input>
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
                    title: '测点编号',
                    key: 'number'
                },
                {
                    title: '区域位置',
                    key: 'location'
                },
                {
                    title: '测点名称',
                    key: 'name'
                },
                {
                    title: '当前值',
                    key: 'currentValue'
                },
                {
                    title: '业务时间',
                    key: 'serviceTime'
                },
                {
                    title: '信号类型',
                    key: 'signalType'
                },
                {
                    title: '数据来源',
                    key: 'dataSources'
                },
                {
                    title: '数据分类',
                    key: 'dataClassification'
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
        batchsetting() {
            // this.$router.push({
            //     path:'/other/areaUpload',
            //     query: {
            //         uploadName: '批量导入SIM卡'
            //     }
            // })
        },
        batchdelete(){

        },
        asyncOK () {
            setTimeout(() => {
                this.addModal = false;
            }, 2000);
        },
        addItem(name){
            console.log(name)
            if(name=="auto"){
                this.$router.push({path:'/dataManage/analyze/addAutomatic'})
            }
        },
        calculationAction(name){
            console.log(name)
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
    .sim-content {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .c-table-top-btns {
            height: 36px;
            border-bottom: 1px solid #EEE;
            .btn-block{
                display: inline-block;
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