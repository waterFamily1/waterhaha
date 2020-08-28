<template>
    <div class="sample-wrap" :style="{height: height+'px'}">
        <div class="sample-search" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>关键字：</label>
                    <Input v-model="keyword" placeholder="指标名称" style="width: 300px" />
                </div>
                <div class="form-item">
                    <label>区域位置：</label> 
                    <TreeSelect v-model="areaValue" multiple :data="areaData" v-width="300" />
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
                        <label>信号类型：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="singalType">
                                <TagSelectOption name="tag1">状态信号</TagSelectOption>
                                <TagSelectOption name="tag2">数值信号</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                    <div class="form-item">
                        <label>数据分类：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="dataClassify">
                                <TagSelectOption name="tag1">水位</TagSelectOption>
                                <TagSelectOption name="tag2">水质</TagSelectOption>
                                <TagSelectOption name="tag3">水能</TagSelectOption>
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
                    </div>
                </div>
            </div>
        </div>
        <div class="log-content">
            <div class="c-table-top-btns">
                <button type="button" @click="sampleModal = true">添加样本</button>
            </div>
            <div class="table-wrapper">
                <Table stripe size="small" :columns="tableList" :data="tableData">
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
        <!-- 添加样本 -->
        <Modal
            v-model="sampleModal"
            title="添加样本"
            @on-ok="ok"
            width="650"
            @on-cancel="cancel">
            <div class="model-box">
                <div class="model-search">
                    <div>
                        <div class="search-item">
                            <label>关键字：</label>
                            <Input v-model="modalKeyword" placeholder="用户名称/手机号" size="small" style="width: 150px" />
                        </div>
                        <div class="search-item">
                            <label>结构组织：</label>
                            <Select v-model="modalTissue" style="width:180px" size="small">
                                <Option v-for="item in tissueList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </div>
                        <div class="search-btn">
                            <Button size="small">搜索</Button>
                            <Button size="small" class="reset">重置</Button>
                        </div>
                    </div>
                    <div class="tabel-num">
                        已选择<strong>{{ selectedData.length }}</strong>个
                        <Button size="small" @click="handleClearSelect(false)">清空</Button>
                    </div>
                </div>
                <div class="model-table">
                    <Table size="small" ref="selection" :columns="modelColumns" :data="modelData"
                        @on-select="handleSelect"
                        @on-select-cancel="handleSelectCancel"
                        @on-select-all="handleSelectAll"
                        @on-select-all-cancel="handleSelectAllCancel">
                    </Table>
                    <Page :total="40" size="small" show-total show-elevator class="modalPage" />
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
    name: 'sampleDeploy',
    data() {
        return {
            height: '',
            keyword: '',
            areaValue: [],
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
            searchShow: false,
            singalType: [],
            dataClassify: [],
            tableList: [
                {
                    title: '测点名称',
                    key: 'name'
                },
                {
                    title: '区域位置',
                    key: 'location'
                },
                {
                    title: '信号类型',
                    key: 'singalType'
                },
                {
                    title: '数据分类',
                    key: 'dataType'
                },
                {
                    title: '推送周期',
                    key: 'pushCycle'
                },
                {
                    title: '所属设备',
                    key: 'belong'
                },
                {
                    title: '配置时间',
                    key: 'deployTime'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            tableData: [],
            sampleModal: false,
            modalKeyword: '',
            modalTissue: '',
            tissueList: [
                {
                    value: 'New York',
                    label: 'New York'
                }
            ],
            modelColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '用户名称',
                    key: 'name'
                },
                {
                    title: '部门',
                    key: 'department'
                },
                {
                    title: '所属组织',
                    key: 'tissue'
                }
            ],
            modelData: [
                {
                    name: '吴镕譞0',
                    department: '技术部0',
                    tissue: '易烊千玺老婆团'
                },
                {
                    name: '吴镕譞1',
                    department: '技术部1',
                    tissue: '易烊千玺老婆团'
                },
                {
                    name: '吴镕譞2',
                    department: '技术部2',
                    tissue: '易烊千玺老婆团'
                }
            ],
            list: [],
            selectedData: []
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
    methods: {
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        ok () {
            this.$Message.info('Clicked ok');
        },
        cancel () {
            this.$Message.info('Clicked cancel');
        },
        // 清空所有已选项
        handleClearSelect (status) {
            this.selectedData = [];
            this.$refs.selection.selectAll(status);
        },
        // 选中一项，将数据添加至已选项中
        handleSelect (selection, row) {
            this.selectedData.push(row);
        },
        // 取消选中一项，将取消的数据从已选项中删除
        handleSelectCancel (selection, row) {
            const index = this.selectedData.findIndex(item => item.name === row.name);
            this.selectedData.splice(index, 1);
        },
        // 当前页全选时，判断已选数据是否存在，不存在则添加
        handleSelectAll (selection) {
            selection.forEach(item => {
                if (this.selectedData.findIndex(i => i.name === item.name) < 0) {
                    this.selectedData.push(item);
                }
            });
        },
        // 取消当前页全选时，将当前页的数据（即 modelData）从已选项中删除
        handleSelectAllCancel () {
            const selection = this.modelData;
            selection.forEach(item => {
                const index = this.selectedData.findIndex(i => i.name === item.name);
                if (index >= 0) {
                    this.selectedData.splice(index, 1);
                }
            });
        }
    }
}
</script>
<style lang="less" scoped>
.sample-wrap {
    margin: 5px;
    background: #fff;
    .sample-search {
        padding: 5px;
        height: 43px;
        .search-main {
            height: 33px;
            .form-item {
                display: inline-block;
                min-height: 33px;
                label {
                    display: inline-block;
                    width: 100px;
                    line-height: 35px;
                    text-align: right;
                    color: #576374;
                }
            }
            .form-search-btn {
                float: right;
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
                .form-item {
                    display: inline-block;
                    height: 33px;
                    label {
                        display: inline-block;
                        width: 100px;
                        line-height: 35px;
                        text-align: right;
                        color: #576374;
                        float: left;
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
        }
    }
    .searchTrans {
        height: 140px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .searchPack {
        height: 43px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .log-content {
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
        .table-wrapper {
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
.model-box {
    .model-search {
        .search-item {
            display: inline-block;
            label {
                font-size: 13px;
                margin-left: 10px;
            }
            /deep/.ivu-input,
            /deep/.ivu-select {
                font-size: 13px;
            }
        }
        .search-btn {
            display: inline-block;
            float: right;
            /deep/.ivu-btn {
                height: auto;
                font-size: 12px;
                background: #838A95;
                color: #fff;
                margin-right: 10px;
                border-radius: 1px;
                padding: 4px 12px;
            }
            .reset {
                background: #aaafb8;
            }
        }
        .tabel-num {
            text-align: right;
            font-size: 13px;
            color: #999;
            line-height: 30px;
            margin-top: 10px;
            /deep/.ivu-btn {
                font-size: 12px;
                background: #57a3f3;
                color: #fff;
            }
        }
    }
    .model-table {
        margin-top: 10px;
    }
}
/deep/.ivu-modal-footer {
    /deep/.ivu-btn-text {
        border: 1px solid #dcdee2;
    }
}
.modalPage {
    text-align: right;
    margin: 10px 0 0;
}
</style>